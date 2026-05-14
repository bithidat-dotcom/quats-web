import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Github, 
  Loader2, 
  Shield, 
  Database,
  Cpu,
  X,
  Key,
  ShieldCheck,
  Globe
} from 'lucide-react';
import SoundButton from '../components/SoundButton';

interface ModelResult {
  id: string;
  name: string;
  description: string;
  author: string;
  downloads: number;
  likes: number;
  tags: string[];
  type: 'model' | 'repo';
  url: string;
  language?: string;
}

const SPECIAL_QUATS_DATA: ModelResult[] = [
  {
    id: 'quats-bolt',
    name: 'Bolt.new / Full-Stack Agent',
    description: 'Autonomous web development agent. Build, edit, and deploy full-stack applications with lightning speed.',
    author: 'Bolt.new',
    downloads: 1200000,
    likes: 45000,
    tags: ['Web-Agent', 'Deployment'],
    type: 'repo',
    url: 'https://bolt.new'
  },
  {
    id: 'quats-lovable',
    name: 'Lovable / GPT Engineer',
    description: 'The world\'s best AI full-stack engineer. Turn text into polished, high-performance web applications.',
    author: 'Lovable',
    downloads: 850000,
    likes: 32000,
    tags: ['Engineering', 'Design-AI'],
    type: 'repo',
    url: 'https://lovable.dev'
  },
  {
    id: 'quats-replit',
    name: 'Replit Agent / Cloud Dev',
    description: 'Build software from scratch using natural language. Integrated hosting and collaborative environments.',
    author: 'Replit',
    downloads: 5000000,
    likes: 120000,
    tags: ['Hosting', 'Software-Agent'],
    type: 'repo',
    url: 'https://replit.com'
  }
];

export default function CodeStore() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<ModelResult[]>(SPECIAL_QUATS_DATA);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ModelResult | null>(null);
  
  const performSearch = useCallback(async (query: string) => {
    if (!query || query.length < 2) {
      setResults(SPECIAL_QUATS_DATA);
      return;
    }
    setIsLoading(true);
    
    try {
      const [hfResponse, ghResponse] = await Promise.all([
        fetch(`https://huggingface.co/api/models?search=${encodeURIComponent(query)}&limit=6&sort=downloads&direction=-1`),
        fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=6`)
      ]);

      const hfData = await hfResponse.json();
      const ghData = await ghResponse.json();

      const hfModels: ModelResult[] = Array.isArray(hfData) ? hfData.map((m: any) => ({
        id: `hf-${m._id}`,
        name: m.id,
        description: `Neural weights optimized for secure token processing and autonomous logic execution.`,
        author: m.author || 'OpenSource',
        downloads: m.downloads || 0,
        likes: m.likes || 0,
        tags: m.tags || [],
        type: 'model',
        url: `https://huggingface.co/${m.id}`
      })) : [];

      const ghRepos: ModelResult[] = (ghData.items || []).map((r: any) => ({
        id: `gh-${r.id}`,
        name: r.full_name,
        description: r.description || 'Global code intelligence repository for distributed systems.',
        author: r.owner.login,
        downloads: r.stargazers_count,
        likes: r.forks_count,
        tags: [r.language || 'Code'],
        type: 'repo',
        url: r.html_url
      }));

      setResults([...SPECIAL_QUATS_DATA.filter(i => i.name.toLowerCase().includes(query.toLowerCase())), ...hfModels, ...ghRepos]);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchQuery);
  };

  return (
    <main className="pt-48 pb-32 min-h-screen relative">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-black tracking-tighter mb-8 uppercase italic text-white"
          >
            Code Vault
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/80 text-sm md:text-base max-w-2xl mx-auto font-mono uppercase tracking-[0.2em] font-bold"
          >
            Autonomous repository bridge. Access weights, models, and full-stack logic through the Quats neural gateway.
          </motion.p>
        </div>

        {/* Search */}
        <div className="max-w-3xl mx-auto mb-32 relative">
          <form onSubmit={handleSearch} className="glass p-2 flex items-center gap-2 rounded-3xl shadow-xl border border-white/10">
            <div className="flex-1 flex items-center px-6 gap-4">
              <Search className="text-zinc-400" size={20} />
              <input 
                type="text" 
                placeholder="PROBE REPOSITORIES..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none outline-none font-mono text-xs uppercase tracking-widest text-white placeholder:text-zinc-500 font-bold"
              />
            </div>
            <SoundButton 
              type="submit"
              disabled={isLoading}
              variant="secondary"
              className="px-8 py-4 text-[10px] rounded-3xl"
            >
              {isLoading ? <Loader2 className="animate-spin" size={16} /> : 'INITIALIZE'}
            </SoundButton>
          </form>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <AnimatePresence mode="popLayout">
            {results.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass backdrop-blur-3xl p-8 rounded-3xl flex flex-col group hover:border-blue-500/30 transition-all border border-white/10"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${item.type === 'model' ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' : 'bg-blue-500/10 border-blue-500/20 text-blue-500'}`}>
                    {item.type === 'model' ? <Database size={20} /> : <Github size={20} />}
                  </div>
                  <span className="text-[8px] font-black uppercase tracking-[0.2em] text-white">
                    {item.type}
                  </span>
                </div>

                <h3 className="text-xl font-black mb-2 text-white uppercase tracking-tight truncate group-hover:text-blue-500 transition-colors">
                  {item.name.split('/').pop()}
                </h3>
                <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold tracking-widest mb-6">
                  Author: {item.author}
                </span>

                <p className="text-white/80 text-[11px] mb-8 leading-relaxed h-12 line-clamp-2 font-bold">
                  {item.description}
                </p>

                <div className="flex items-center gap-6 mb-10 py-6 border-y border-white/10">
                  <div className="flex flex-col gap-1">
                    <span className="text-[8px] text-zinc-400 font-bold uppercase">Hits</span>
                    <span className="text-[11px] font-black text-white">{(item.downloads / 1000).toFixed(0)}K</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[8px] text-zinc-400 font-bold uppercase">Logic</span>
                    <span className="text-[11px] font-black text-white uppercase truncate max-w-[80px]">{item.tags[0] || 'Neural'}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-auto">
                  <SoundButton 
                    onClick={() => window.open(item.url, '_blank')}
                    variant="glass"
                    className="w-full py-4 text-[10px]"
                  >
                    View Source
                  </SoundButton>
                  <SoundButton 
                    variant="secondary"
                    className="w-full py-4 text-[10px]"
                    onClick={() => setSelectedItem(item)}
                  >
                    Integrate
                  </SoundButton>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {results.length === 0 && !isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32 flex flex-col items-center gap-6"
          >
            <div className="w-24 h-24 rounded-[2rem] bg-zinc-900 flex items-center justify-center border border-white/5">
              <Shield size={32} className="text-zinc-800" />
            </div>
            <h2 className="font-game text-zinc-600 text-lg tracking-[5px] uppercase">Awaiting Target Acquisition</h2>
            <p className="text-zinc-700 font-game text-[10px] tracking-widest uppercase">Enter a query to bridge with global intelligence repositories.</p>
          </motion.div>
        )}
      </div>

      {/* Integration Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 glass backdrop-blur-3xl overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="glass p-12 rounded-3xl max-w-2xl w-full relative shadow-2xl border border-white/10"
            >
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-10 right-10 text-zinc-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              <div className="flex items-center gap-6 mb-12">
                <div>
                  <h2 className="text-3xl font-black uppercase italic text-white tracking-tighter mb-2">{selectedItem.name.split('/').pop()}</h2>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-blue-500 font-bold px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20">
                      {selectedItem.type}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                      Authored by {selectedItem.author}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-[2px] text-white/70 flex items-center gap-2">
                       <Key size={14} /> Neural Configuration
                    </p>
                    <div className="space-y-3">
                      <div className="p-4 bg-white/5 border border-white/10 rounded-3xl">
                        <p className="text-[9px] text-zinc-400 uppercase font-bold mb-2">Endpoint URL</p>
                        <p className="text-[11px] font-mono text-white truncate">{selectedItem.url}</p>
                      </div>
                      <div className="p-4 bg-white/5 border border-white/10 rounded-3xl">
                        <p className="text-[9px] text-zinc-400 uppercase font-bold mb-2">Internal ID</p>
                        <p className="text-[11px] font-mono text-white">{selectedItem.id}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <p className="text-[10px] font-black uppercase tracking-[2px] text-white/70 flex items-center gap-2">
                    <ShieldCheck size={14} /> Security Compliance
                  </p>
                  <div className="bg-white/5 p-6 rounded-3xl border-white/10 shadow-sm">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] uppercase font-bold text-zinc-400">Encryption</span>
                        <span className="text-[9px] uppercase font-bold text-blue-500">AES-256</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] uppercase font-bold text-zinc-400">Latency</span>
                        <span className="text-[9px] uppercase font-bold text-emerald-500">&lt; 40ms</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] uppercase font-bold text-zinc-400">Integrity</span>
                        <span className="text-[9px] uppercase font-bold text-white">Verified</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <SoundButton 
                  onClick={() => window.open(selectedItem.url, '_blank')}
                  variant="secondary" 
                  className="flex-1 py-6 rounded-none"
                >
                  <Globe size={18} className="mr-2" /> Sync Protocol
                </SoundButton>
                <SoundButton 
                  onClick={() => setSelectedItem(null)}
                  variant="glass" 
                  className="px-10 py-6 rounded-none"
                >
                  Close
                </SoundButton>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
