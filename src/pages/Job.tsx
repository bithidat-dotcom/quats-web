import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Zap, Loader2, Plus, MapPin, DollarSign, Users, ExternalLink } from 'lucide-react';
import { supabase } from '../lib/supabase';

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
  const [formData, setFormData] = useState({
    company_name: '', job_title: '', contact_number: '', salary: '', 
    location: '', employee_number: '', description: '', image_url: ''
  });

  const handlePostJob = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('jobs').insert([formData]);
    if (error) {
      if (error.code === 'PGRST205') {
        setDbError("The 'jobs' table is missing. Setup required.");
        setShowPostModal(false);
      } else {
        alert('Error posting job: ' + error.message);
      }
    } else {
      alert('Job posted! Awaiting network sync...');
      setShowPostModal(false);
      setFormData({ company_name: '', job_title: '', contact_number: '', salary: '', location: '', employee_number: '', description: '', image_url: '' });
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
    setJobs([]);
    
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {                
        if (error.code === 'PGRST205') {
          setDbError("The 'jobs' table is missing. Setup required.");
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
    <main className="min-h-screen pt-32 pb-24 relative overflow-hidden bg-transparent">
        {/* Background glow effects */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
        
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="text-[11px] uppercase tracking-[3px] text-blue-400 mb-6 font-semibold flex items-center justify-center gap-2 font-game">
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" /> [LIVE OPPORTUNITIES]
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase mb-4 text-center font-game tracking-tighter">
            TALENTO <span className="text-blue-500">JOBS</span>
          </h1>
          <p className="text-center text-[#888888] mb-12 max-w-xl mx-auto font-game text-[10px] uppercase tracking-widest leading-relaxed">
            Discover and recruit top talent across global digital architectures.
          </p>
        </motion.div>

        {/* Search Engine & Post Button */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
           className="mb-16 relative z-20"
        >
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <form className="flex-1 flex items-center bg-white/[0.02] border border-white/10 rounded-2xl p-2 shadow-[0_0_30px_rgba(0,0,0,0.5)] backdrop-blur-xl" onSubmit={handleSearchSubmit}>
              <Search className="ml-4 text-zinc-500" size={20} />
              <input 
                type="text" 
                placeholder="SEARCH PROTOCOLS..."
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none px-4 font-game text-[10px] md:text-xs uppercase tracking-widest placeholder:text-zinc-600 h-12 text-white"
              />
              <button type="submit" className="bg-white text-black px-6 py-3 rounded-xl font-game text-[10px] md:text-xs font-black hover:bg-neutral-200 transition-all uppercase tracking-wider">SEARCH</button>
            </form>
            <button 
              className="w-full sm:w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:bg-blue-500 hover:scale-105 transition-all shrink-0 border border-blue-400/30 text-white"
              onClick={() => setShowPostModal(true)}
            >
              <Plus size={24} />
            </button>
          </div>
          
          {/* AI Algorithmic Filters */}
          <div className="flex gap-2 max-w-full overflow-x-auto pb-2 scrollbar-hide">
            <div className="text-[10px] uppercase font-game text-zinc-500 flex items-center mr-2"><Zap size={14} className="mr-1"/> AI Filter</div>
            <button 
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-lg text-xs uppercase tracking-wider font-game border transition-all ${activeFilter === 'all' ? 'bg-white text-black border-white' : 'bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10'}`}
            >
              All
            </button>
            <button 
              onClick={() => setActiveFilter('safe')}
              className={`px-4 py-2 rounded-lg text-xs uppercase tracking-wider font-game border transition-all flex items-center gap-1 ${activeFilter === 'safe' ? 'bg-green-500/20 text-green-400 border-green-500/50' : 'bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10'}`}
            >
              Safe
            </button>
            <button 
              onClick={() => setActiveFilter('popular')}
              className={`px-4 py-2 rounded-lg text-xs uppercase tracking-wider font-game border transition-all flex items-center gap-1 ${activeFilter === 'popular' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50' : 'bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10'}`}
            >
              Popular
            </button>
            <button 
              onClick={() => setActiveFilter('new')}
              className={`px-4 py-2 rounded-lg text-xs uppercase tracking-wider font-game border transition-all flex items-center gap-1 ${activeFilter === 'new' ? 'bg-blue-500/20 text-blue-400 border-blue-500/50' : 'bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10'}`}
            >
              New
            </button>
          </div>
        </motion.div>

        {/* Post Job Modal */}
        <AnimatePresence>
        {showPostModal && (
          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 bg-black/80 backdrop-blur z-50 flex items-center justify-center p-4"
          >
            <motion.form 
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.9, opacity: 0 }}
               transition={{ type: "spring", stiffness: 300, damping: 25 }}
               onSubmit={handlePostJob} 
               className="bg-zinc-900/80 border border-white/10 p-8 rounded-[2rem] w-full max-w-lg space-y-4 shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-xl"
            >
              <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 font-game">Deploy <span className="text-blue-500">New Mission</span></h2>
              
              <div className="space-y-3 font-mono text-sm">
                <input required placeholder="Company Name // Protocol" className="w-full bg-black/50 border border-white/10 p-4 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 transition-colors" onChange={e => setFormData({...formData, company_name: e.target.value})} />
                <input required placeholder="Job Title // Role" className="w-full bg-black/50 border border-white/10 p-4 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 transition-colors" onChange={e => setFormData({...formData, job_title: e.target.value})} />
                <input required placeholder="Contact Number // WhatsApp" className="w-full bg-black/50 border border-white/10 p-4 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 transition-colors" onChange={e => setFormData({...formData, contact_number: e.target.value})} />
                
                <div className="grid grid-cols-2 gap-3">
                  <input required placeholder="Salary // Credits" className="w-full bg-black/50 border border-white/10 p-4 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 transition-colors" onChange={e => setFormData({...formData, salary: e.target.value})} />
                  <input required placeholder="Location // Sector" className="w-full bg-black/50 border border-white/10 p-4 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 transition-colors" onChange={e => setFormData({...formData, location: e.target.value})} />
                </div>
                
                <input required placeholder="Employee Target // Count" className="w-full bg-black/50 border border-white/10 p-4 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 transition-colors" onChange={e => setFormData({...formData, employee_number: e.target.value})} />
                <textarea required placeholder="Mission Briefing // Description" className="w-full bg-black/50 border border-white/10 p-4 rounded-xl h-32 text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 transition-colors resize-none" onChange={e => setFormData({...formData, description: e.target.value})} />
                <input placeholder="Image URL (optional) // Visual Asset" className="w-full bg-black/50 border border-white/10 p-4 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 transition-colors" onChange={e => setFormData({...formData, image_url: e.target.value})} />
              </div>

              <div className="flex gap-3 pt-4">
                <button type="button" className="flex-1 bg-white/5 border border-white/10 hover:bg-white/10 py-4 rounded-xl font-game text-[10px] uppercase tracking-wider font-bold transition-colors" onClick={() => setShowPostModal(false)}>Abort sequence</button>
                <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-500 py-4 rounded-xl font-game text-[10px] uppercase tracking-wider font-bold transition-colors shadow-[0_0_20px_rgba(37,99,235,0.4)]">Initialize Post</button>
              </div>
            </motion.form>
          </motion.div>
        )}
        </AnimatePresence>

        {/* Job Grid */}
        <div className="grid md:grid-cols-2 gap-6 relative z-10">
          {dbError && (
            <div className="col-span-1 md:col-span-2 p-6 border border-red-500/30 rounded-2xl bg-red-500/10 mb-6">
              <h3 className="text-red-400 font-bold mb-2 font-game uppercase tracking-wider flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> DATABASE SETUP REQUIRED
              </h3>
              <p className="text-red-300 text-sm mb-4">{dbError} Please run this SQL in your Supabase dashboard:</p>
              <div className="bg-black/50 p-4 rounded-xl border border-red-500/20 overflow-x-auto">
                <pre className="text-xs text-red-200 font-mono">
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
            </div>
          )}
          {loading && jobs.length === 0 && !dbError && (
            <div className="col-span-1 md:col-span-2 py-20 text-center flex flex-col items-center justify-center">
              <Loader2 className="animate-spin text-blue-500 mb-4" size={32} />
              <p className="text-[#888888] font-game text-xs uppercase tracking-widest">Scanning network...</p>
            </div>
          )}
          {!loading && jobs.length === 0 && !dbError && (
            <div className="col-span-1 md:col-span-2 py-20 text-center border border-white/5 rounded-2xl bg-white/[0.02]">
              <p className="text-[#888888] font-game text-xs uppercase tracking-widest">No active missions available.</p>
              <p className="text-zinc-500 font-mono text-xs mt-2">Initialize a new post to populate the network.</p>
            </div>
          )}
          {filteredJobs.map((job, i) => (
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: i * 0.1 }}
               key={job.id} 
               className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all group flex flex-col justify-between"
            >
              <div className="flex items-start justify-between mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl md:text-2xl font-semibold text-white">{job.job_title}</h3>
                    {job.ai_tag === 'popular' && <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-[9px] uppercase font-game rounded tracking-wider border border-yellow-500/30 flex items-center gap-1"><Zap size={10} /> Popular</span>}
                    {job.ai_tag === 'safe' && <span className="px-2 py-1 bg-green-500/20 text-green-400 text-[9px] uppercase font-game rounded tracking-wider border border-green-500/30 flex items-center gap-1"><Zap size={10} /> Safe</span>}
                    {job.ai_tag === 'new' && <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-[9px] uppercase font-game rounded tracking-wider border border-blue-500/30 flex items-center gap-1"><Zap size={10} /> New</span>}
                  </div>
                  <p className="text-[#888888] font-game text-[10px] uppercase tracking-wider">{job.company_name}</p>
                </div>
                {job.image_url && <img src={job.image_url} alt={job.company_name} className="w-16 h-16 rounded-xl object-cover border border-white/10 group-hover:scale-105 transition-transform" />}
              </div>
              
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 border border-white/5 text-[10px] sm:text-xs text-zinc-300 font-game uppercase">
                    <MapPin size={14}/> {job.location}
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 border border-white/5 text-[10px] sm:text-xs text-zinc-300 font-game uppercase">
                    <DollarSign size={14}/> {job.salary}
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 border border-white/5 text-[10px] sm:text-xs text-zinc-300 font-game uppercase">
                    <Users size={14}/> {job.employee_number}
                </div>
              </div>
              
              <p className="text-[#888888] text-sm leading-relaxed mb-8">{job.description}</p>
              
              <a 
                href={getWhatsAppLink(job.contact_number, job.company_name, job.job_title)}
                target="_blank" 
                rel="noreferrer"
                className="w-full bg-transparent border border-blue-500/30 text-blue-400 py-4 rounded-xl font-game text-[10px] md:text-xs uppercase tracking-wider font-black flex items-center justify-center gap-3 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-[0_0_15px_rgba(37,99,235,0)] hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]"
              >
                APPLY DIRECT <ExternalLink size={14}/>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
