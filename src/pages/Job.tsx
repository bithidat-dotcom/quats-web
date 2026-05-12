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
  const [source, setSource] = useState<'supabase' | 'linkedin'>('supabase');
  const [externalError, setExternalError] = useState<string | null>(null);
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
    
    // Subscribe to realtime changes only for postgres
    let channel: any;
    if (source === 'supabase') {
      channel = supabase
        .channel('public:jobs')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'jobs' }, () => {
          fetchJobs();
        })
        .subscribe();
    }

    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, [source]); // Re-fetch when source changes

  const fetchJobs = async (customQuery?: string) => {
    setLoading(true);
    setDbError(null);
    setExternalError(null);
    setJobs([]);
    
    if (source === 'linkedin') {
      try {
        const q = customQuery || searchQuery || "developer";
        const res = await fetch(`/api/jobs/external?q=${encodeURIComponent(q)}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to fetch external jobs');
        setJobs(data.jobs || []);
      } catch (err: any) {
        console.error("External fetch failed", err);
        setExternalError(err.message);
      }
    } else {
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
          setJobs(data || []); 
        }
      } catch (err) {
        console.error("Fetch failed", err);
      }
    }
    setLoading(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (source === 'linkedin') {
      fetchJobs(searchQuery);
    }
  };

  const filteredJobs = jobs.filter(job => 
    job.job_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        
        {/* Source Toggle */}
        <div className="flex justify-center mb-10 relative z-20">
          <div className="bg-white/5 border border-white/10 p-1 rounded-2xl flex backdrop-blur-md relative overflow-hidden">
             {/* Simple active background marker using layout transition */}
             <div 
               className={`absolute inset-y-1 w-1/2 bg-blue-500 rounded-xl transition-all duration-300 ease-out z-0 ${source === 'supabase' ? 'left-1' : 'left-[calc(50%-4px)]'}`}
             />
             <button
                className={`flex-1 px-8 py-3 text-xs font-black uppercase tracking-wider font-game relative z-10 transition-colors ${source === 'supabase' ? 'text-white' : 'text-zinc-400 hover:text-white'}`}
                onClick={() => setSource('supabase')}
             >
                Internal Network
             </button>
             <button
                className={`flex-1 px-8 py-3 text-xs font-black uppercase tracking-wider font-game relative z-10 transition-colors ${source === 'linkedin' ? 'text-white' : 'text-zinc-400 hover:text-white'}`}
                onClick={() => setSource('linkedin')}
             >
                External (LinkedIn)
             </button>
          </div>
        </div>

        {/* Search Engine & Post Button */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
           className="flex flex-col sm:flex-row gap-4 mb-16 relative z-20"
        >
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
          {source === 'supabase' && (
            <button 
              className="w-full sm:w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:bg-blue-500 hover:scale-105 transition-all shrink-0 border border-blue-400/30 text-white"
              onClick={() => setShowPostModal(true)}
            >
              <Plus size={24} />
            </button>
          )}
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
          {dbError && source === 'supabase' && (
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
          {externalError && source === 'linkedin' && (
            <div className="col-span-1 md:col-span-2 p-6 border border-red-500/30 rounded-2xl bg-red-500/10 mb-6 flex flex-col items-center text-center">
              <h3 className="text-red-400 font-bold mb-2 font-game uppercase tracking-wider">
                External API Error
              </h3>
              <p className="text-red-300 text-sm mb-4">{externalError}</p>
              <p className="text-zinc-400 text-xs mt-2">
                Note: Configure the `LINKEDIN_API_KEY` in your environment to fetch real data from external APIs like RapidAPI's LinkedIn job scraper.
              </p>
            </div>
          )}
          {loading && jobs.length === 0 && !dbError && !externalError && (
            <div className="col-span-1 md:col-span-2 py-20 text-center flex flex-col items-center justify-center">
              <Loader2 className="animate-spin text-blue-500 mb-4" size={32} />
              <p className="text-[#888888] font-game text-xs uppercase tracking-widest">Scanning network...</p>
            </div>
          )}
          {!loading && jobs.length === 0 && !dbError && !externalError && (
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
                  <h3 className="text-xl md:text-2xl font-semibold mb-2 text-white">{job.job_title}</h3>
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
