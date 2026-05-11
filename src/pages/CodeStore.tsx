import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Copy, 
  Download, 
  Code2, 
  Check, 
  ExternalLink, 
  Terminal, 
  Github, 
  Star, 
  Loader2, 
  Shield, 
  Zap, 
  Cpu, 
  Key,
  X,
  Layers
} from 'lucide-react';

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

// Adject Logo Component
const AdjectLogo = ({ className = "w-6 h-6" }: { className?: string }) => (
  <div className={`${className} bg-blue-600 rounded-lg flex items-center justify-center p-1 shadow-lg shadow-blue-500/30`}>
    <div className="w-full h-full border-2 border-white rounded-sm flex items-center justify-center">
      <div className="w-1 h-1 bg-white rounded-full" />
    </div>
  </div>
);

export default function CodeStore() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<ModelResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<ModelResult | null>(null);

  const performGlobalSearch = useCallback(async (query: string) => {
    if (!query || query.length < 2) return;
    setIsLoading(true);
    
    try {
      // Parallel fetch from Hugging Face and GitHub
      const [hfResponse, ghResponse] = await Promise.all([
        fetch(`https://huggingface.co/api/models?search=${encodeURIComponent(query)}&limit=8&sort=downloads&direction=-1`),
        fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=8`)
      ]);

      const hfData = await hfResponse.json();
      const ghData = await ghResponse.json();

      const hfModels: ModelResult[] = Array.isArray(hfData) ? hfData.map((m: any) => ({
        id: `hf-${m._id}`,
        name: m.id,
        description: `Adject-integrated neural path. High-performance AI model by ${m.author || 'OpenSource'}. Optimized for secure token processing.`,
        author: m.author || 'HF User',
        downloads: m.downloads || 0,
        likes: m.likes || 0,
        tags: m.tags || [],
        type: 'model',
        url: `https://huggingface.co/${m.id}`
      })) : [];

      const ghRepos: ModelResult[] = (ghData.items || []).map((r: any) => ({
        id: `gh-${r.id}`,
        name: r.full_name,
        description: r.description || 'Global code intelligence repository.',
        author: r.owner.login,
        downloads: r.stargazers_count,
        likes: r.forks_count,
        tags: [r.language || 'Intelligence'],
        type: 'repo',
        url: r.html_url,
        language: r.language
      }));

      setResults([...hfModels, ...ghRepos]);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fast search de-bounce
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) performGlobalSearch(searchQuery);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery, performGlobalSearch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performGlobalSearch(searchQuery);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 overflow-x-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20">
              <Zap size={14} className="text-blue-400" />
              <span className="text-[10px] font-game uppercase tracking-[2px] text-blue-400">Adject AI Infrastructure</span>
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter uppercase mb-6 font-game"
          >
            THE <span className="text-blue-600">ADJECT</span> HUB
          </motion.h1>
          
          <p className="text-zinc-400 max-w-2xl mx-auto uppercase text-[10px] tracking-widest leading-loose mb-12">
            Integrated Hugging Face & GitHub search. Discover weights, collect API keys, and deploy intelligence through Adject's global gateway.
          </p>
        </div>

        {/* Unified Search Engine */}
        <div className="max-w-3xl mx-auto mb-20 relative group">
          <div className="absolute inset-0 bg-blue-500/10 blur-3xl group-focus-within:bg-blue-500/20 transition-all rounded-full" />
          <form onSubmit={handleSearch} className="relative flex items-center bg-zinc-900/90 border border-white/10 rounded-3xl p-2 h-20 shadow-2xl backdrop-blur-xl">
            <Search className="ml-6 text-zinc-500" size={24} />
            <input 
              type="text" 
              placeholder="SEARCH MODELS & CODEBASES..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none px-6 font-game text-sm uppercase tracking-wider placeholder:text-zinc-700"
            />
            <button 
              type="submit"
              disabled={isLoading}
              className="mr-2 px-10 h-full bg-blue-600 hover:bg-blue-500 text-white font-game text-[12px] tracking-widest rounded-2xl transition-all shadow-lg shadow-blue-500/20 active:scale-95 flex items-center gap-3 disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Zap size={18} fill="currentColor" />}
              {isLoading ? 'SYNCING...' : 'CAPTURE'}
            </button>
          </form>
          <div className="mt-6 flex flex-wrap justify-center gap-6 text-zinc-600 font-game text-[9px] uppercase tracking-widest">
            <span className="flex items-center gap-2 hover:text-blue-400 cursor-pointer" onClick={() => performGlobalSearch('Llama-3')}>Llama-3</span>
            <span className="text-zinc-800">•</span>
            <span className="flex items-center gap-2 hover:text-blue-400 cursor-pointer" onClick={() => performGlobalSearch('Stable Diffusion')}>Stable Diffusion</span>
            <span className="text-zinc-800">•</span>
            <span className="flex items-center gap-2 hover:text-blue-400 cursor-pointer" onClick={() => performGlobalSearch('Transformers')}>Transformers</span>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {results.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative bg-zinc-900/40 border border-white/5 rounded-[2.5rem] p-8 hover:border-blue-500/30 transition-all backdrop-blur-md flex flex-col h-full"
              >
                {/* Branding */}
                <div className="absolute top-8 right-8">
                  <AdjectLogo className="w-8 h-8" />
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all ${item.type === 'model' ? 'bg-purple-500/10 border-purple-500/20' : 'bg-blue-500/10 border-blue-500/20'}`}>
                    {item.type === 'model' ? <Cpu size={22} className="text-purple-400" /> : <Github size={22} className="text-blue-400" />}
                  </div>
                  <div className="min-w-0 pr-10">
                    <h3 className="font-game text-[11px] text-white group-hover:text-blue-400 transition-colors uppercase truncate mb-1">
                      {item.name.split('/').pop()}
                    </h3>
                    <span className="text-[8px] text-zinc-500 font-game uppercase tracking-[2px]">By {item.author}</span>
                  </div>
                </div>

                <p className="text-[#888888] text-[9px] font-game uppercase tracking-tight leading-relaxed mb-8 flex-1 line-clamp-3">
                  {item.description}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-6 mb-8 py-4 border-y border-white/5">
                  <div className="flex flex-col gap-1">
                    <span className="text-[7px] text-zinc-600 font-game uppercase tracking-widest">Active Tokens</span>
                    <span className="text-[10px] font-game text-zinc-300">{(item.downloads / 1000).toFixed(1)}M</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[7px] text-zinc-600 font-game uppercase tracking-widest">Architecture</span>
                    <span className="text-[10px] font-game text-zinc-300 uppercase">{item.tags[0] || 'Neural'}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[7px] text-zinc-600 font-game uppercase tracking-widest">Safety Hash</span>
                    <span className="text-[10px] font-game text-zinc-300 uppercase">SHA-256</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button 
                    onClick={() => setSelectedItem(item)}
                    className="flex-1 py-4 bg-white text-black font-game text-[9px] font-black uppercase tracking-widest rounded-2xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-2"
                  >
                    DEPLOY WITH ADJECT <Zap size={12} fill="currentColor" />
                  </button>
                  <button 
                    onClick={() => window.open(item.url, '_blank')}
                    className="w-14 py-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all"
                  >
                    <ExternalLink size={16} />
                  </button>
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

      {/* Deployment Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-zinc-900 border border-white/10 rounded-[3rem] p-10 overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600" />
              
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-8 right-8 p-3 bg-white/5 rounded-full hover:bg-white/10 transition-all"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-6 mb-10">
                <AdjectLogo className="w-12 h-12" />
                <div>
                  <h2 className="text-2xl font-game font-black uppercase tracking-tighter">Adject Deployment Agent</h2>
                  <p className="text-blue-400 font-game text-[8px] uppercase tracking-widest mt-1">Configuring Instance for {selectedItem.name.split('/').pop()}</p>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-game uppercase tracking-widest text-[#888888] flex items-center gap-2">
                      <Key size={14} /> ADJECT API KEY
                    </span>
                    <span className="text-[8px] font-game text-green-500 uppercase tracking-widest">Status: Active (Shared)</span>
                  </div>
                  <div className="flex items-center gap-3 p-5 bg-black border border-white/5 rounded-2xl">
                    <code className="flex-1 font-mono text-zinc-400 text-xs truncate">adj_live_384a82b9dc904a11f8e2110c7937...</code>
                    <button 
                      onClick={() => copyToClipboard('adj_live_384a82b9dc904a11f8e2110c7937d2f9', 'api-key')}
                      className="p-3 bg-blue-600 rounded-xl hover:bg-blue-500 transition-all"
                    >
                      {copiedId === 'api-key' ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-game uppercase tracking-widest text-[#888888] mb-4 block flex items-center gap-2">
                    <Terminal size={14} /> INITIALIZATION SCRIPT
                  </span>
                  <div className="bg-black p-6 rounded-2xl border border-white/5 font-mono text-xs text-blue-300 relative group">
                    <button 
                      onClick={() => copyToClipboard(`import adject\n\nagent = adject.init("${selectedItem.id}")\nagent.load_weights()\n\nprint("Intelligence Hub Ready")`, 'script')}
                      className="absolute top-4 right-4 p-2 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                    >
                       {copiedId === 'script' ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                    </button>
                    <pre className="whitespace-pre-wrap leading-relaxed">
                      {`import adject\n\n# Secure tunnel to ${selectedItem.type}\nagent = adject.init("${selectedItem.id}")\nagent.load_weights()\n\nprint("Intelligence Hub Ready")`}
                    </pre>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => window.open('https://adject.ai/docs', '_blank')}
                    className="flex-1 py-5 bg-blue-600 rounded-2xl font-game text-[10px] font-black uppercase tracking-[2px] shadow-xl shadow-blue-500/20 hover:scale-[1.02] transition-all"
                  >
                    COLLECT FULL API KEY
                  </button>
                  <button className="flex-1 py-5 bg-white/5 rounded-2xl font-game text-[10px] font-black uppercase tracking-[2px] border border-white/10 hover:bg-white/10 transition-all">
                    TEST CONNECTION
                  </button>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-center gap-6">
                <div className="flex items-center gap-2 text-zinc-600 font-game text-[8px] uppercase tracking-widest">
                  <Shield size={10} /> Full-Private Protocol
                </div>
                <div className="flex items-center gap-2 text-zinc-600 font-game text-[8px] uppercase tracking-widest">
                  <Layers size={10} /> Neural Bridge V4
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
