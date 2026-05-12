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
  MessageSquare,
  Send,
  MessageCircle,
  Database,
  ArrowDownToLine,
  Layers,
  Sparkles,
  Command as CommandIcon,
  Search as SearchIcon,
  Settings
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

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

// Official Logos
const HuggingFaceLogo = ({ className = "w-6 h-6" }: { className?: string }) => (
  <img src="https://huggingface.co/front/assets/huggingface_logo-noborder.svg" alt="Hugging Face" className={className} />
);

const SupabaseLogo = ({ className = "w-6 h-6" }: { className?: string }) => (
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSibJKkb3zuWNXb3h-Zdu6lNYQYN59aim1x0w&s" alt="Supabase" className={className} />
);

const PrismaLogo = ({ className = "w-6 h-6" }: { className?: string }) => (
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6jOZdGIBFG5JdX1vIIihAhbeJ3ugyYtBegQ&s" alt="Prisma" className={className} />
);

const FigmaLogo = ({ className = "w-6 h-6" }: { className?: string }) => (
  <img src="https://www.vectorlogo.zone/logos/figma/figma-icon.svg" alt="Figma" className={className} />
);

const OpenRouterLogo = ({ className = "w-6 h-6" }: { className?: string }) => (
  <img src="https://openrouter.ai/favicon.ico" alt="OpenRouter" className={`${className} bg-white rounded p-0.5`} />
);

const AdjectLogo = ({ className = "w-6 h-6" }: { className?: string }) => (
  <div className={`${className} bg-blue-600 rounded-lg flex items-center justify-center p-1 shadow-lg shadow-blue-500/30 overflow-hidden relative`}>
    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
    <div className="w-full h-full border border-white/50 rounded-sm flex items-center justify-center relative z-10">
      <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
    </div>
  </div>
);

const BoltLogo = ({ className = "w-6 h-6" }: { className?: string }) => (
  <img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/bolt-ai-builder-icon.png" alt="Bolt" className={className} />
);

const ReplitLogo = ({ className = "w-6 h-6" }: { className?: string }) => (
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIML4Si6wtiuFjg4AElfP1A9MZGUDfEG1R9A&s" alt="Replit" className={className} />
);

const LovableLogo = ({ className = "w-6 h-6" }: { className?: string }) => (
  <img src="https://lovable.dev/img/logo/lovable-icon-bg-light.png" alt="Lovable" className={className} />
);

const ArenaLogo = ({ className = "w-6 h-6" }: { className?: string }) => (
  <img src="https://yt3.googleusercontent.com/ZXvxog8BCpdyAcaEK50zi2t8-vAvRPMcKtOy2AnTFssNmiYrpo2FDns2TjMdbXEeh7fh6yQ9GA=s900-c-k-c0x00ffffff-no-rj" alt="Arena.ai" className={className} />
);

interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
}

const SPECIAL_ADJECT_DATA: ModelResult[] = [
  {
    id: 'adject-bolt',
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
    id: 'adject-lovable',
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
    id: 'adject-replit',
    name: 'Replit Agent / Cloud Dev',
    description: 'Build software from scratch using natural language. Integrated hosting and collaborative environments.',
    author: 'Replit',
    downloads: 5000000,
    likes: 120000,
    tags: ['Hosting', 'Software-Agent'],
    type: 'repo',
    url: 'https://replit.com'
  },
  {
    id: 'adject-arena',
    name: 'Arena.ai / Enterprise Logic',
    description: 'Foundational models for the physical world. Optimizing supply chains and enterprise workflows.',
    author: 'Arena.ai',
    downloads: 150000,
    likes: 12000,
    tags: ['Enterprise', 'Supply-Chain'],
    type: 'model',
    url: 'https://arena.ai'
  },
  {
    id: 'adject-openrouter',
    name: 'OpenRouter / Models Gateway',
    description: 'Unified interface for 100+ LLMs. Access Llama 3, Claude 3.5, and GPT-4 through one protocol.',
    author: 'OpenRouter',
    downloads: 2500000,
    likes: 95000,
    tags: ['Gateway', 'LLM-API'],
    type: 'model',
    url: 'https://openrouter.ai'
  }
];

export default function CodeStore() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<ModelResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<ModelResult | null>(null);
  
  // AI Chat & Vault State
  const [userHfKey, setUserHfKey] = useState('');
  const [openRouterKey, setOpenRouterKey] = useState('');
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const [showORProfile, setShowORProfile] = useState(false);
  const [isCreatingKey, setIsCreatingKey] = useState(false);
  const [createdKey, setCreatedKey] = useState<string | null>(null);
  const [selectedVersion, setSelectedVersion] = useState('v4.2.0-stable');
  const [activeTab, setActiveTab] = useState<'deploy' | 'terminal' | 'config'>('deploy');
  
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

      // Filter special adject data based on query
      const localResults = SPECIAL_ADJECT_DATA.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase()) || 
        item.author.toLowerCase().includes(query.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );

      setResults([...localResults, ...hfModels, ...ghRepos]);
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
            {/* Adject AI Infrastructure hidden per user request */}
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

          {/* Industry Leaders Scrolling Marquee */}
          <div className="relative w-full overflow-hidden py-10 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-64 before:bg-gradient-to-r before:from-black before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-64 after:bg-gradient-to-l after:from-black after:to-transparent">
            <style>{`
              @keyframes marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .animate-marquee {
                display: flex;
                width: max-content;
                animation: marquee 30s linear infinite;
              }
              .animate-marquee:hover {
                animation-play-state: paused;
              }
            `}</style>
            <div className="animate-marquee flex items-center gap-16 px-8">
              {[...Array(2)].map((_, i) => (
                <React.Fragment key={i}>
                  <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.open('https://huggingface.co', '_blank')}>
                    <HuggingFaceLogo className="w-6 h-6 transition-all scale-110" />
                    <span className="text-[10px] font-game uppercase tracking-[3px] text-zinc-500 group-hover:text-white transition-colors">HuggingFace</span>
                  </div>
                  <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.open('https://supabase.com', '_blank')}>
                    <SupabaseLogo className="w-6 h-6 transition-all scale-110" />
                    <span className="text-[10px] font-game uppercase tracking-[3px] text-zinc-500 group-hover:text-white transition-colors">Supabase</span>
                  </div>
                  <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.open('https://bolt.new', '_blank')}>
                    <BoltLogo className="w-6 h-6 transition-all scale-110" />
                    <span className="text-[10px] font-game uppercase tracking-[3px] text-zinc-500 group-hover:text-white transition-colors">Bolt</span>
                  </div>
                  <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.open('https://lovable.dev', '_blank')}>
                    <LovableLogo className="w-6 h-6 transition-all scale-110" />
                    <span className="text-[10px] font-game uppercase tracking-[3px] text-zinc-500 group-hover:text-white transition-colors">Lovable</span>
                  </div>
                  <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.open('https://replit.com', '_blank')}>
                    <ReplitLogo className="w-6 h-6 transition-all scale-110" />
                    <span className="text-[10px] font-game uppercase tracking-[3px] text-zinc-500 group-hover:text-white transition-colors">Replit</span>
                  </div>
                  <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.open('https://arena.ai', '_blank')}>
                    <ArenaLogo className="w-6 h-6 transition-all scale-110" />
                    <span className="text-[10px] font-game uppercase tracking-[3px] text-zinc-500 group-hover:text-white transition-colors">Arena.ai</span>
                  </div>
                  <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.open('https://prisma.io', '_blank')}>
                    <PrismaLogo className="w-6 h-6 transition-all scale-110" />
                    <span className="text-[10px] font-game uppercase tracking-[3px] text-zinc-500 group-hover:text-white transition-colors">Prisma</span>
                  </div>
                  <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.open('https://figma.com', '_blank')}>
                    <FigmaLogo className="w-6 h-6 transition-all scale-110" />
                    <span className="text-[10px] font-game uppercase tracking-[3px] text-zinc-500 group-hover:text-white transition-colors">Figma</span>
                  </div>
                  <div className="flex items-center gap-3 group cursor-pointer" onClick={() => setIsVaultOpen(true)}>
                    <OpenRouterLogo className="w-6 h-6 transition-all scale-110" />
                    <span className="text-[10px] font-game uppercase tracking-[3px] text-zinc-500 group-hover:text-white transition-colors">OpenRouter</span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Unified Search Engine */}
        <div className="max-w-3xl mx-auto mb-20 relative group">
          <div className="absolute inset-0 bg-blue-500/10 blur-3xl group-focus-within:bg-blue-500/20 transition-all rounded-full" />
          <form onSubmit={handleSearch} className="relative flex flex-col md:flex-row items-center bg-zinc-900/90 border border-white/10 rounded-2xl md:rounded-[2rem] p-2 md:min-h-[5rem] shadow-2xl backdrop-blur-xl gap-2 md:gap-0">
            <div className="flex w-full md:w-auto items-center flex-1 pr-0">
              <Search className="ml-4 md:ml-6 text-zinc-500 shrink-0" size={20} />
              <input 
                type="text" 
                placeholder="SEARCH MODELS & CODEBASES..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none px-4 md:px-6 font-game text-[10px] md:text-sm uppercase tracking-wider placeholder:text-zinc-700 w-full min-h-[44px]"
              />
            </div>
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full md:w-auto md:mr-2 px-8 md:px-14 h-12 md:h-16 lg:h-20 bg-blue-600 hover:bg-blue-500 text-white font-game text-[12px] md:text-[14px] tracking-widest rounded-xl md:rounded-[2.5rem] transition-all shadow-xl shadow-blue-500/30 hover:scale-105 active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50 shrink-0 border border-white/10"
            >
              {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Zap size={20} fill="currentColor" />}
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
                onClick={() => setSelectedItem(item)}
                className="group relative bg-zinc-900/40 border border-white/5 rounded-[2.5rem] p-8 hover:border-blue-500/30 transition-all backdrop-blur-md flex flex-col h-full cursor-pointer"
              >
                {/* Branding */}
                <div className="absolute top-8 right-8">
                  {item.type === 'model' ? <HuggingFaceLogo className="w-8 h-8 opacity-80" /> : <AdjectLogo className="w-8 h-8" />}
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all shadow-lg ${item.type === 'model' ? 'bg-yellow-500/10 border-yellow-500/20 shadow-yellow-500/10' : 'bg-blue-500/10 border-blue-500/20 shadow-blue-500/10'}`}>
                    {item.type === 'model' ? <Database size={22} className="text-yellow-400" /> : <Github size={22} className="text-blue-400" />}
                  </div>
                  <div className="min-w-0 pr-10">
                    <h3 className="font-game text-[11px] text-white group-hover:text-blue-400 transition-colors uppercase truncate mb-1">
                      {item.name ? item.name.split('/').pop() : 'Unknown Material'}
                    </h3>
                    <span className="text-[8px] text-zinc-500 font-game uppercase tracking-[2px]">By {item.author || 'Anonymous'}</span>
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
                <div className="flex flex-col sm:flex-row gap-2 mt-auto" onClick={(e) => e.stopPropagation()}>
                  <button 
                    onClick={() => window.open('https://adject.ai/deploy', '_blank')}
                    className="flex-1 min-h-[44px] py-3.5 bg-white text-black font-game text-[8px] sm:text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-2"
                  >
                    DEPLOY ONLINE <Zap size={12} fill="currentColor" />
                  </button>
                  <button 
                    onClick={() => window.open(`${item.url}/tree/main`, '_blank')}
                    className="flex-1 min-h-[44px] py-3.5 bg-zinc-800 border border-white/10 rounded-2xl font-game text-[8px] sm:text-[10px] font-black uppercase tracking-widest hover:bg-zinc-700 transition-all flex items-center justify-center gap-2"
                  >
                    OFFLINE <ArrowDownToLine size={12} />
                  </button>
                  <button 
                    onClick={() => window.open(item.url, '_blank')}
                    className="w-full sm:w-14 min-h-[44px] py-3.5 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all"
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
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
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
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-zinc-900 border border-white/10 rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 shadow-2xl"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600" />
              
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-8 right-8 p-3 bg-white/5 rounded-full hover:bg-white/10 transition-all text-zinc-500 hover:text-white"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-10">
                {selectedItem.type === 'model' ? <HuggingFaceLogo className="w-10 h-10 md:w-12 md:h-12 shrink-0" /> : <AdjectLogo className="w-10 h-10 md:w-12 md:h-12 shrink-0" />}
                <div className="flex-1">
                  <h2 className="text-xl md:text-2xl font-game font-black uppercase tracking-tighter">{selectedItem.name ? selectedItem.name.split('/').pop() : 'Neural Material'}</h2>
                  <p className="text-blue-400 font-game text-[8px] uppercase tracking-widest mt-1">Status: Active Interface</p>
                </div>
                <div className="hidden md:block">
                  <div className="p-3 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-3">
                    <div className="flex flex-col">
                      <span className="text-[7px] text-zinc-500 font-game uppercase">Version</span>
                      <select 
                        value={selectedVersion}
                        onChange={(e) => setSelectedVersion(e.target.value)}
                        className="bg-transparent text-[10px] font-game text-white outline-none cursor-pointer"
                      >
                        <option value="v4.2.0-stable" className="bg-zinc-900 text-white">v4.2.0 Stable</option>
                        <option value="v4.1.9-beta" className="bg-zinc-900 text-white">v4.1.9 Beta</option>
                        <option value="v3.8.5-LTS" className="bg-zinc-900 text-white">v3.8.5 LTS</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Tabs */}
              <div className="flex items-center gap-1 mb-8 p-1 bg-black rounded-2xl border border-white/5">
                {[
                  { id: 'deploy', icon: Zap, label: 'DEPLOY' },
                  { id: 'terminal', icon: Terminal, label: 'TERMINAL' },
                  { id: 'config', icon: Settings, label: 'VAULT' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-game text-[9px] uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-zinc-500 hover:text-zinc-300'}`}
                  >
                    <tab.icon size={12} /> {tab.label}
                  </button>
                ))}
              </div>

              <div className="space-y-6 md:space-y-8">
                {activeTab === 'deploy' && (
                  <>
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-game uppercase tracking-widest text-[#888888] flex items-center gap-2">
                           {selectedItem.type === 'model' ? <Key size={14} /> : <Terminal size={14} />} {selectedItem.type === 'model' ? 'HUGGING FACE TOKEN (READ)' : 'ADJECT API KEY'}
                        </span>
                        <span className="text-[8px] font-game text-green-500 uppercase tracking-widest">Status: Ready</span>
                      </div>
                      <div className="flex items-center gap-3 p-5 bg-black border border-white/5 rounded-2xl group focus-within:border-blue-500/50 transition-all">
                        <input 
                          type="password"
                          placeholder={selectedItem.type === 'model' ? "Enter Hugging Face Token (hf_...)" : "Enter Adject Key"}
                          value={userHfKey}
                          onChange={(e) => setUserHfKey(e.target.value)}
                          className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-white placeholder:text-zinc-600"
                        />
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-game uppercase tracking-widest text-[#888888] mb-4 block flex items-center gap-2">
                        <Code2 size={14} /> INTEGRATION SNIPPET
                      </span>
                      <div className="bg-black p-6 rounded-2xl border border-white/5 font-mono text-xs text-blue-300 relative group">
                        <button 
                          onClick={() => copyToClipboard(`from transformers import pipeline\n\npipe = pipeline("text-generation", model="${selectedItem.name}")`, 'script')}
                          className="absolute top-4 right-4 p-2 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                        >
                           {copiedId === 'script' ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                        </button>
                        <pre className="whitespace-pre-wrap leading-relaxed">
                          {selectedItem.type === 'model' 
                            ? `# Initialize Model Interface\nfrom transformers import pipeline\nimport os\n\nos.environ["HF_TOKEN"] = "${userHfKey || 'YOUR_TOKEN'}"\n\n# Version: ${selectedVersion}\npipe = pipeline("text-generation", model="${selectedItem.name}")`
                            : `import adject\n\n# Bridge Version: ${selectedVersion}\nagent = adject.init("${selectedItem.id}", type="repo")\nagent.load_weights()\n\nprint("Intelligence Hub Ready")`}
                        </pre>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-3 md:gap-4">
                      <button 
                        onClick={() => window.open('https://adject.ai/deploy', '_blank')}
                        className="flex-1 py-4 md:py-5 min-h-[44px] bg-blue-600 rounded-2xl font-game text-[10px] font-black uppercase tracking-widest md:tracking-[2px] shadow-xl shadow-blue-500/20 hover:scale-[1.02] transition-all text-center"
                      >
                        DEPLOY ONLINE <ExternalLink size={12} className="inline ml-2" />
                      </button>
                      <button className="flex-1 py-4 md:py-5 min-h-[44px] bg-white text-black rounded-2xl font-game text-[10px] font-black uppercase tracking-widest md:tracking-[2px] border border-white/10 hover:bg-zinc-200 transition-all text-center">
                        TEST CONNECTION
                      </button>
                    </div>
                  </>
                )}

                {activeTab === 'terminal' && (
                  <div className="bg-black p-8 rounded-3xl border border-white/5 font-mono text-xs text-zinc-400 space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                      <Terminal size={16} className="text-blue-500" />
                      <span className="font-game text-[10px] uppercase tracking-widest text-zinc-500">Terminal Download Protocol</span>
                    </div>
                    
                    <div>
                      <p className="mb-3 text-zinc-500 uppercase text-[9px] font-game">Option 1: Direct Download</p>
                      <div className="relative group p-4 bg-zinc-950 rounded-xl border border-white/5">
                        <code className="text-blue-400">adject download {selectedItem.id} --version {selectedVersion}</code>
                        <button 
                          onClick={() => copyToClipboard(`adject download ${selectedItem.id} --version ${selectedVersion}`, 'terminal-1')}
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                        >
                          {copiedId === 'terminal-1' ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <p className="mb-3 text-zinc-500 uppercase text-[9px] font-game">Option 2: Git Clone</p>
                      <div className="relative group p-4 bg-zinc-950 rounded-xl border border-white/5">
                        <code className="text-blue-400 cursor-copy">git clone {selectedItem.url}</code>
                        <button 
                          onClick={() => copyToClipboard(`git clone ${selectedItem.url}`, 'terminal-2')}
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                        >
                          {copiedId === 'terminal-2' ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
                        </button>
                      </div>
                    </div>

                    <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-xl">
                      <p className="text-[9px] font-game uppercase tracking-widest text-blue-400 leading-relaxed">
                        Note: Terminal operations require the Adject CLI installed via <span className="text-white">npm i -g @adject/cli</span>
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'config' && (
                  <div className="space-y-6">
                    <div className="p-6 bg-blue-600/10 border border-blue-500/20 rounded-3xl flex items-center gap-6">
                      <OpenRouterLogo className="w-12 h-12 grayscale-0" />
                      <div className="flex-1 flex items-center justify-between">
                        <h4 className="font-game text-xs uppercase tracking-widest text-white">OpenRouter Vault</h4>
                        <button 
                          onClick={() => window.open('https://openrouter.ai/keys', '_blank')}
                          className="text-[8px] font-game text-blue-500 uppercase flex items-center gap-1 hover:text-blue-400 transition-colors"
                        >
                          <Settings size={10} /> Get API Key
                        </button>
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-game uppercase tracking-widest text-zinc-500 mb-4 block">Store API Key</span>
                      <div className="flex items-center gap-3 p-5 bg-black border border-white/5 rounded-2xl group focus-within:border-blue-500/40 transition-all shadow-inner">
                        <Key size={16} className="text-zinc-700" />
                        <input 
                          type="password"
                          placeholder="sk-or-v1-..."
                          value={openRouterKey}
                          onChange={(e) => setOpenRouterKey(e.target.value)}
                          className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-white placeholder:text-zinc-800"
                        />
                        <button className="px-4 py-1.5 bg-blue-600 text-white font-game text-[8px] uppercase tracking-widest rounded-lg hover:bg-blue-500 transition-colors">Save</button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div 
                        className="p-5 bg-zinc-900 border border-white/5 rounded-2xl hover:border-blue-500/30 transition-all cursor-pointer group"
                        onClick={() => window.open('https://openrouter.ai/keys', '_blank')}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <Check size={14} className="text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                          <ExternalLink size={12} className="text-zinc-600" />
                        </div>
                        <p className="font-game text-[9px] uppercase tracking-[2px] text-zinc-400">Generate New Key</p>
                      </div>
                      <div className="p-5 bg-zinc-900 border border-white/5 rounded-2xl hover:border-blue-500/30 transition-all cursor-pointer group">
                        <div className="flex items-center justify-between mb-2">
                          <Check size={14} className="text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                          <Layers size={14} className="text-blue-500" />
                        </div>
                        <p className="font-game text-[9px] uppercase tracking-[2px] text-zinc-400">Select Models</p>
                      </div>
                    </div>
                  </div>
                )}
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

      {/* Global Vault Modal */}
      <AnimatePresence>
        {isVaultOpen && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsVaultOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl bg-zinc-900 border border-white/10 rounded-[3rem] p-10 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-600" />
              
              <button 
                onClick={() => setIsVaultOpen(false)}
                className="absolute top-8 right-8 p-3 text-zinc-500 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              <div className="flex items-center gap-6 mb-12">
                <div className="w-16 h-16 rounded-3xl bg-blue-600/10 flex items-center justify-center border border-blue-500/20 shadow-lg shadow-blue-500/10">
                  <Key size={32} className="text-blue-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-game font-black uppercase tracking-tighter">AI VAULT</h2>
                  <p className="text-zinc-500 font-game text-[9px] uppercase tracking-[3px] mt-2">Centralized Neural Key Management</p>
                </div>
              </div>

              <div className="space-y-8">
                {/* OpenRouter */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <OpenRouterLogo className="w-6 h-6" />
                      <span className="font-game text-[11px] uppercase tracking-widest text-zinc-300">OpenRouter SDK</span>
                    </div>
                    {!showORProfile && !createdKey && (
                      <button 
                        onClick={() => setShowORProfile(true)}
                        className="text-[8px] font-game bg-blue-600/20 text-blue-400 px-3 py-1 rounded-lg border border-blue-500/30 uppercase flex items-center gap-1 hover:bg-blue-600 hover:text-white transition-all shadow-lg shadow-blue-500/10"
                      >
                        Create API Key
                      </button>
                    )}
                  </div>

                  {!showORProfile && !createdKey ? (
                    <div className="flex items-center gap-3 p-5 bg-black border border-white/5 rounded-2xl group focus-within:border-blue-500/50 transition-all">
                      <input 
                        type="password"
                        placeholder="sk-or-v1-..."
                        value={openRouterKey}
                        onChange={(e) => setOpenRouterKey(e.target.value)}
                        className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-white placeholder:text-zinc-800"
                      />
                      <button className="px-4 py-1.5 bg-blue-600 text-white font-game text-[8px] uppercase tracking-widest rounded-xl hover:bg-blue-500 transition-all">Save</button>
                    </div>
                  ) : showORProfile && !createdKey ? (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-6 bg-zinc-950 border border-blue-500/20 rounded-2xl space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-[7px] text-zinc-500 font-game uppercase">User Name</p>
                          <p className="text-[10px] text-white font-game uppercase tracking-widest">Adject_Admin_01</p>
                        </div>
                        <div className="text-right space-y-1">
                          <p className="text-[7px] text-zinc-500 font-game uppercase">Credits</p>
                          <p className="text-[10px] text-blue-400 font-game uppercase tracking-widest">$50.00 FREE</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => {
                          setIsCreatingKey(true);
                          window.open('https://openrouter.ai/keys', '_blank');
                          setTimeout(() => {
                            setCreatedKey(`sk-or-v1-${Math.random().toString(36).substring(2, 15)}`);
                            setIsCreatingKey(false);
                          }, 1500);
                        }}
                        disabled={isCreatingKey}
                        className="w-full py-3 bg-blue-600 text-white font-game text-[9px] uppercase tracking-[3px] rounded-xl hover:bg-blue-500 transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-500/20"
                      >
                        {isCreatingKey ? <Loader2 className="animate-spin" size={12} /> : <Zap size={12} fill="currentColor" />}
                        {isCreatingKey ? 'GENERATING PROTOCOL...' : 'CREATE'}
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center gap-3 p-5 bg-blue-500/5 border border-blue-500/20 rounded-2xl">
                        <code className="flex-1 font-mono text-[10px] text-blue-400 truncate">{createdKey}</code>
                        <button 
                          onClick={() => copyToClipboard(createdKey!, 'created-key')}
                          className="p-2 hover:bg-white/5 rounded-lg transition-colors text-zinc-500 hover:text-white"
                        >
                          {copiedId === 'created-key' ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                        </button>
                      </div>
                      <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex items-start gap-3">
                        <Shield size={14} className="text-yellow-500 shrink-0 mt-0.5" />
                        <p className="text-[10px] font-game text-yellow-400 uppercase tracking-widest leading-loose">
                          please dont show the api key to users and not shere to any platfrom
                        </p>
                      </div>
                      <button 
                        onClick={() => {
                          setCreatedKey(null);
                          setShowORProfile(false);
                        }}
                        className="w-full py-2 bg-zinc-800 text-zinc-500 font-game text-[8px] uppercase tracking-widest rounded-lg hover:bg-zinc-700 transition-colors"
                      >
                        Exit Secure Session
                      </button>
                    </motion.div>
                  )}
                </div>

                {/* Hugging Face */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <HuggingFaceLogo className="w-6 h-6" />
                      <span className="font-game text-[11px] uppercase tracking-widest text-zinc-300">HuggingFace Hub</span>
                    </div>
                    <span className="text-[8px] font-game text-yellow-500 uppercase tracking-widest">Model Weights</span>
                  </div>
                  <div className="flex items-center gap-3 p-5 bg-black border border-white/5 rounded-2xl group focus-within:border-yellow-500/50 transition-all">
                    <input 
                      type="password"
                      placeholder="hf_..."
                      value={userHfKey}
                      onChange={(e) => setUserHfKey(e.target.value)}
                      className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-white placeholder:text-zinc-800"
                    />
                    <button className="px-4 py-1.5 bg-yellow-600 text-white font-game text-[8px] uppercase tracking-widest rounded-xl hover:bg-yellow-500 transition-all">Store</button>
                  </div>
                </div>

                {/* Arena.ai / General Key */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <ArenaLogo className="w-6 h-6" />
                      <span className="font-game text-[11px] uppercase tracking-widest text-zinc-300">ADJECT API KEY IS</span>
                    </div>
                    <span className="text-[8px] font-game text-purple-500 uppercase tracking-widest">Master Protocol</span>
                  </div>
                  <div className="flex items-center gap-3 p-5 bg-black border border-white/5 rounded-2xl group focus-within:border-purple-500/50 transition-all">
                    <input 
                      type="password"
                      placeholder="KEY_..."
                      className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-white placeholder:text-zinc-800"
                    />
                    <button className="px-4 py-1.5 bg-purple-600 text-white font-game text-[8px] uppercase tracking-widest rounded-xl hover:bg-purple-500 transition-all">Enable</button>
                  </div>
                </div>

                {/* Model Selector Card */}
                <div className="p-6 bg-zinc-950 border border-white/5 rounded-3xl space-y-4">
                    <p className="text-[10px] font-game uppercase tracking-[2px] text-zinc-500 mb-2 flex items-center gap-2">
                        <Cpu size={14} /> Intelligence Routing
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                        {['Liquid Llama 3 70B', 'GPT-4o Omniscience', 'Claude 3.5 Sonnet'].map((model) => (
                            <div key={model} className="flex items-center justify-between p-3 bg-zinc-900 rounded-xl hover:bg-blue-500/10 transition-colors cursor-pointer group border border-white/5">
                                <span className="text-[10px] font-game uppercase tracking-widest text-zinc-400 group-hover:text-blue-400">{model}</span>
                                <div className="w-2 h-2 rounded-full bg-zinc-800 group-hover:bg-blue-500 transition-colors" />
                            </div>
                        ))}
                    </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-white/5 text-center flex flex-col items-center gap-4">
                <p className="text-[8px] font-game text-zinc-700 uppercase tracking-[4px]">Keys are stored locally in the Neural Buffer</p>
                <div className="w-1 h-1 bg-zinc-800 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.2)]" />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>    </div>
  );
}
