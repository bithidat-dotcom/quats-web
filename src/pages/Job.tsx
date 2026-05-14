import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Zap, Loader2, Plus, MapPin, DollarSign, Users, ExternalLink, ShieldAlert, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import SoundButton from '../components/SoundButton';

// Helper to construct WhatsApp URL
const getWhatsAppLink = (phoneNumber: string, companyName: string, jobTitle: string) => {
  const message = `Hello, I am interested in the ${jobTitle} position at ${companyName}.`;
  return `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
};

export default function JobPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [showPostModal, setShowPostModal] = useState(false);
  const [dbError, setDbError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all'|'safe'|'popular'|'new'>('all');
  const [isSupabaseConfigured, setIsSupabaseConfigured] = useState(true);
  const [formData, setFormData] = useState({
    company_name: '', job_title: '', contact_number: '', salary: '', 
    location: '', employee_number: '', description: '', image_url: ''
  });

  useEffect(() => {
    const url = import.meta.env.VITE_SUPABASE_URL;
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
    if (!url || !key || url.includes('placeholder') || key.includes('placeholder')) {
      setIsSupabaseConfigured(false);
    }
  }, []);

  const handlePostJob = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('jobs').insert([formData]);
    if (error) {
      if (error.code === 'PGRST205') {
        setDbError("System link to Supabase is inactive. Table 'jobs' missing.");
        setShowPostModal(false);
      } else {
        alert('Transmission error: ' + error.message);
      }
    } else {
      setShowPostModal(false);
      setFormData({ company_name: '', job_title: '', contact_number: '', salary: '', location: '', employee_number: '', description: '', image_url: '' });
      fetchJobs();
    }
  };

  useEffect(() => {
    fetchJobs();
    
    // Subscribe to realtime changes
    const channel = supabase
      .channel('public:jobs')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'jobs' }, () => {
        fetchJobs();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    setDbError(null);
    
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {                
        if (error.code === 'PGRST205') {
          setDbError("System link to Supabase is inactive. Table 'jobs' missing.");
        } else {
          console.error('Error fetching jobs:', error);
        }
      }
      else {
        // Enhance supabase jobs with our mock AI algorithm tags
        const tags = ['new', 'safe', 'popular'];
        const enhancedJobs = (data || []).map((job, idx) => ({
           ...job,
           ai_tag: tags[idx % tags.length]
        }));
        setJobs(enhancedJobs); 
      }
    } catch (err) {
      console.error("Fetch failed", err);
    }
    setLoading(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const filteredJobs = jobs.filter(job => {
    const title = job.job_title || '';
    const company = job.company_name || '';
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || job.ai_tag === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <main className="pt-48 pb-32 min-h-screen relative">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-black tracking-tighter mb-8 uppercase italic text-white"
          >
            Job Board
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/80 text-sm md:text-base max-w-2xl mx-auto font-mono uppercase tracking-[0.2em] font-bold"
          >
            Operational opportunities within the Quats network. Deploy your skills to full-scale digital infrastructures.
          </motion.p>
        </div>

        {/* Search & Actions */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <form onSubmit={handleSearchSubmit} className="flex-1 p-2 flex items-center rounded-3xl glass shadow-xl border border-white/10">
              <Search className="ml-6 text-white" size={20} />
              <input 
                type="text" 
                placeholder="PROBE OPPORTUNITIES..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none outline-none font-mono text-xs uppercase tracking-widest text-white placeholder:text-zinc-400 px-6 h-12 font-bold"
              />
            </form>
            <SoundButton 
              onClick={() => setShowPostModal(true)}
              variant="secondary"
              className="px-10 h-16 rounded-3xl"
            >
              <Plus size={20} className="mr-2" />
              Post Mission
            </SoundButton>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {[
              { id: 'all', label: 'All Protocols' },
              { id: 'safe', label: 'Verified Safe' },
              { id: 'popular', label: 'High Traffic' },
              { id: 'new', label: 'Fresh Deployment' }
            ].map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id as any)}
                className={`px-6 py-2 rounded-3xl font-mono text-[10px] uppercase font-bold tracking-widest transition-all border ${
                  activeFilter === filter.id 
                  ? 'bg-blue-600 text-white shadow-lg border-blue-500' 
                  : 'bg-white/5 text-white hover:bg-white/10 border-white/10'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Database Error State */}
        {!isSupabaseConfigured && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto mb-20 p-10 glass border-amber-500/30 rounded-none text-center shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-600" />
            <ShieldAlert size={48} className="text-amber-500 mx-auto mb-6" />
            <h3 className="text-2xl font-black uppercase text-white mb-4 tracking-tighter italic">Supabase Not Linked</h3>
            <p className="text-white/80 text-sm mb-8 font-mono leading-relaxed px-4 font-bold">
              The neural link to Supabase is missing. You need to configure environment variables in Vercel or your .env file to enable the Job Board.
            </p>
            <div className="flex flex-col gap-3 max-w-sm mx-auto">
              <div className="p-4 bg-white/5 rounded-none border border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-mono text-white font-black uppercase">VITE_SUPABASE_URL</span>
                <span className="text-[10px] font-mono text-red-500 font-black uppercase">Missing</span>
              </div>
              <div className="p-4 bg-white/5 rounded-none border border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-mono text-white font-black uppercase">VITE_SUPABASE_ANON_KEY</span>
                <span className="text-[10px] font-mono text-red-500 font-black uppercase">Missing</span>
              </div>
            </div>
          </motion.div>
        )}

        {dbError && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto mb-20 p-8 glass border-red-500/30 rounded-none text-center"
          >
            <ShieldAlert size={48} className="text-red-500 mx-auto mb-6" />
            <h3 className="text-xl font-black uppercase text-white mb-4 tracking-tight">Supabase Sync Failed</h3>
            <p className="text-white/80 text-sm mb-8 font-mono leading-relaxed font-bold">
              We couldn't reach the jobs registry. Ensure your Supabase instance is provisioned with a "jobs" table.
            </p>
            <div className="bg-white/5 p-6 rounded-none border border-white/10 text-left font-mono text-[10px] text-blue-400 overflow-x-auto ring-1 ring-red-500/20">
              <pre>
{`CREATE TABLE public.jobs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name text NOT NULL,
  job_title text NOT NULL,
  contact_number text NOT NULL,
  salary text NOT NULL,
  location text NOT NULL,
  employee_number text NOT NULL,
  description text NOT NULL,
  image_url text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);`}
              </pre>
            </div>
          </motion.div>
        )}

        {/* Job Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {loading && jobs.length === 0 && !dbError ? (
            <div className="col-span-full py-32 text-center">
              <Loader2 className="animate-spin text-blue-500 mx-auto" size={48} />
              <p className="text-black font-mono text-[10px] uppercase tracking-widest mt-6 font-bold">Scanning Network...</p>
            </div>
          ) : filteredJobs.length > 0 ? (
            filteredJobs.map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="glass backdrop-blur-3xl p-8 rounded-3xl flex flex-col group hover:border-blue-500/30 transition-all border border-white/10"
              >
                <div className="flex items-start justify-between mb-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-black text-white uppercase tracking-tight group-hover:text-blue-500 transition-colors">
                        {job.job_title}
                      </h3>
                      {job.ai_tag === 'popular' && <Zap size={14} className="text-amber-500" />}
                      {job.ai_tag === 'safe' && <Zap size={14} className="text-emerald-500" />}
                      {job.ai_tag === 'new' && <Zap size={14} className="text-blue-500" />}
                    </div>
                    <p className="font-mono text-[10px] text-white/70 uppercase font-bold tracking-widest">
                      {job.company_name}
                    </p>
                  </div>
                  {job.image_url && (
                    <img src={job.image_url} alt={job.company_name} className="w-16 h-16 rounded-2xl object-cover glass border border-white/10" />
                  )}
                </div>

                <div className="grid grid-cols-3 gap-2 mb-8">
                  <div className="bg-white/10 rounded-2xl p-3 border border-white/10 text-center">
                    <p className="text-[7px] text-zinc-400 font-bold uppercase mb-1">Sector</p>
                    <p className="text-[9px] font-black text-white uppercase truncate">{job.location}</p>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-3 border border-white/10 text-center">
                    <p className="text-[7px] text-zinc-400 font-bold uppercase mb-1">Credits</p>
                    <p className="text-[9px] font-black text-white uppercase truncate">{job.salary}</p>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-3 border border-white/10 text-center">
                    <p className="text-[7px] text-zinc-400 font-bold uppercase mb-1">Nodes</p>
                    <p className="text-[9px] font-black text-white uppercase truncate">{job.employee_number}</p>
                  </div>
                </div>

                <p className="text-white/90 text-[11px] mb-10 leading-relaxed line-clamp-3 font-bold">
                  {job.description}
                </p>

                <div className="mt-auto">
                  <SoundButton 
                    onClick={() => window.open(getWhatsAppLink(job.contact_number, job.company_name, job.job_title), '_blank')}
                    variant="glass"
                    className="w-full py-4 text-[10px]"
                  >
                    Deploy Application
                    <ExternalLink size={14} className="ml-2" />
                  </SoundButton>
                </div>
              </motion.div>
            ))
          ) : !loading && (
            <div className="col-span-full py-32 text-center glass rounded-none">
              <p className="text-black font-mono text-[10px] uppercase tracking-widest font-bold">Zero active opportunities found in current sector.</p>
            </div>
          )}
        </div>
      </div>

      {/* Post Modal */}
      <AnimatePresence>
        {showPostModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 glass backdrop-blur-3xl overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl glass border border-white/10 rounded-3xl p-10 shadow-2xl"
            >
              <button 
                onClick={() => setShowPostModal(false)}
                className="absolute top-8 right-8 text-zinc-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              <h2 className="text-3xl font-black uppercase tracking-tighter mb-2 text-white">New Mission</h2>
              <p className="text-white/80 font-mono text-[9px] uppercase tracking-[3px] mb-10 font-bold">Broadcast your operational requirements.</p>

              <form onSubmit={handlePostJob} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input required placeholder="COMPANY NAME" className="bg-white/5 p-4 rounded-3xl text-white font-mono text-[10px] uppercase tracking-widest placeholder:text-zinc-500 outline-none border border-white/10 focus:border-blue-500/50" onChange={e => setFormData({...formData, company_name: e.target.value})} />
                  <input required placeholder="JOB TITLE" className="bg-white/5 p-4 rounded-3xl text-white font-mono text-[10px] uppercase tracking-widest placeholder:text-zinc-500 outline-none border border-white/10 focus:border-blue-500/50" onChange={e => setFormData({...formData, job_title: e.target.value})} />
                </div>
                <input required placeholder="WHATSAPP CONTACT" className="bg-white/5 p-4 rounded-3xl w-full text-white font-mono text-[10px] uppercase tracking-widest placeholder:text-zinc-500 outline-none border border-white/10 focus:border-blue-500/50" onChange={e => setFormData({...formData, contact_number: e.target.value})} />
                <div className="grid grid-cols-2 gap-4">
                  <input required placeholder="SALARY / CREDITS" className="bg-white/5 p-4 rounded-3xl text-white font-mono text-[10px] uppercase tracking-widest placeholder:text-zinc-500 outline-none border border-white/10 focus:border-blue-500/50" onChange={e => setFormData({...formData, salary: e.target.value})} />
                  <input required placeholder="SECTOR / LOCATION" className="bg-white/5 p-4 rounded-3xl text-white font-mono text-[10px] uppercase tracking-widest placeholder:text-zinc-500 outline-none border border-white/10 focus:border-blue-500/50" onChange={e => setFormData({...formData, location: e.target.value})} />
                </div>
                <input required placeholder="EMPLOYEE COUNT" className="bg-white/5 p-4 rounded-3xl w-full text-white font-mono text-[10px] uppercase tracking-widest placeholder:text-zinc-500 outline-none border border-white/10 focus:border-blue-500/50" onChange={e => setFormData({...formData, employee_number: e.target.value})} />
                <textarea required placeholder="MISSION DESCRIPTION" className="bg-white/5 p-4 rounded-3xl w-full h-32 text-white font-mono text-[10px] uppercase tracking-widest placeholder:text-zinc-500 outline-none border border-white/10 focus:border-blue-500/50 resize-none font-bold" onChange={e => setFormData({...formData, description: e.target.value})} />
                
                <SoundButton type="submit" variant="secondary" className="w-full py-5 rounded-3xl mt-6">
                  Broadcast Opportunity
                </SoundButton>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
