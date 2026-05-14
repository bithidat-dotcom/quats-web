import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Send, AlertCircle, Server, Code, Layers, Globe, ShieldCheck } from 'lucide-react';
import SoundButton from '../components/SoundButton';

export default function GetStarted() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    websiteType: '',
    description: '',
    hosting: 'Vercel',
    budget: 'No Budget',
    timeline: 'Flexible',
    services: [] as string[]
  });
  const [error, setError] = useState('');

  // Service Options
  const serviceOptions = [
    { label: 'Web Architecture', icon: <Globe size={14} /> },
    { label: 'Intelligence Layer', icon: <Code size={14} /> },
    { label: 'Interface Design', icon: <Layers size={14} /> },
    { label: 'API Infrastructure', icon: <Server size={14} /> },
    { label: 'Security Audit', icon: <ShieldCheck size={14} /> },
    { label: 'Full Deployment', icon: <Globe size={14} /> }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleServiceToggle = (label: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(label) 
        ? prev.services.filter(s => s !== label)
        : [...prev.services, label]
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim() || !formData.phone.trim()) {
      setError('Identity authentication failed. Name and Contact are required.');
      return;
    }

    // Construct WhatsApp message
    const msg = `*Operational Briefing - Quats*\n\n*Operator Identity:* ${formData.name}\n*Contact:* ${formData.phone}\n\n*Architecture Details:*\n- Category: ${formData.websiteType || 'General Architecture'}\n- Protocols: ${formData.services.length > 0 ? formData.services.join(', ') : 'Default'}\n- Deployment: ${formData.hosting}\n\n*Mission Logistics:*\n- Allocation: ${formData.budget}\n- Window: ${formData.timeline}\n\n*Strategic Requirements:*\n${formData.description || 'Standard implementation'}`;
    
    const encodedMsg = encodeURIComponent(msg);
    // Open WhatsApp
    window.open(`https://wa.me/8801716807465?text=${encodedMsg}`, '_blank');
  };

  return (
    <main className="pt-48 pb-32 min-h-screen">
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center font-black text-black text-3xl mx-auto mb-10 shadow-2xl"
          >
            Q
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-black tracking-tighter mb-8 uppercase italic text-white"
          >
            Mission Start
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/70 text-sm md:text-base max-w-2xl mx-auto font-mono uppercase tracking-[0.2em] font-bold"
          >
            Configure your technical requirements to initiate deployment.
          </motion.p>
        </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-premium p-8 md:p-16 rounded-3xl border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 opacity-50" />
            
            <form onSubmit={handleSubmit} className="space-y-12 relative z-10">
            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-500/10 border border-red-500/20 text-red-500 px-6 py-4 rounded-2xl flex items-center gap-4 font-mono text-[10px] uppercase tracking-widest"
              >
                <AlertCircle size={18} />
                <span>{error}</span>
              </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-black p-4 rounded-3xl">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Identity Identifier</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full glass bg-black px-6 py-5 rounded-2xl text-white font-mono text-sm outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-zinc-600 border border-white/10" 
                  placeholder="SPECIFY NAME..." 
                />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Communication Node</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full glass bg-black px-6 py-5 rounded-2xl text-white font-mono text-sm outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-zinc-600 border border-white/10" 
                  placeholder="+CONTACT..." 
                />
              </div>
            </div>

              <div className="space-y-4 bg-black p-4 rounded-3xl">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Architecture Type</label>
                <input 
                  type="text" 
                  name="websiteType"
                  value={formData.websiteType}
                  onChange={handleChange}
                  className="w-full glass bg-black px-6 py-5 rounded-2xl text-white font-mono text-sm outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-zinc-600 border border-white/10" 
                  placeholder="E.G., SAAS NODES, E-COMMERCE HUB, PORTFOLIO ARCHIVE..." 
                />
              </div>

            <div className="space-y-4 bg-[#070303] p-4 rounded-3xl">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Core Protocols</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {serviceOptions.map(service => (
                  <button
                    key={service.label}
                    type="button"
                    onClick={() => handleServiceToggle(service.label)}
                    className={`flex items-center gap-3 p-4 rounded-2xl border transition-all text-[10px] font-black uppercase tracking-widest h-14 ${
                      formData.services.includes(service.label) 
                        ? 'bg-white border-white text-black shadow-[0_0_20px_rgba(255,255,255,0.15)]' 
                        : 'bg-black border-white/10 text-white/70 hover:bg-zinc-900 hover:text-white'
                    }`}
                  >
                    {service.icon}
                    {service.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-[#090404] p-6 rounded-3xl">
               <div className="space-y-6">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Resource Allocation</label>
                <div className="grid grid-cols-2 gap-3">
                  {['Under $1k', '$1k - $3k', '$3k - $10k', '$10k+', 'Flexible'].map((budget) => (
                    <button
                      key={budget}
                      type="button"
                      onClick={() => setFormData({...formData, budget})}
                      className={`p-4 rounded-2xl border transition-all text-[10px] font-black uppercase tracking-widest ${
                        formData.budget === budget 
                          ? 'bg-white text-black shadow-[0_10px_20px_rgba(255,255,255,0.1)]' 
                          : 'bg-black border-white/10 text-white/70 hover:bg-zinc-900 hover:text-white'
                      }`}
                    >
                      {budget}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Temporal Window</label>
                 <div className="grid grid-cols-2 gap-3">
                  {['Rush (< 1mo)', '1 - 3 months', '3 - 6 months', 'Continuous'].map(timeline => (
                    <button
                      key={timeline}
                      type="button"
                      onClick={() => setFormData({...formData, timeline})}
                      className={`p-4 rounded-2xl border transition-all text-[10px] font-black uppercase tracking-widest ${
                        formData.timeline === timeline 
                          ? 'bg-white text-black shadow-[0_10px_20px_rgba(255,255,255,0.1)]' 
                          : 'bg-black border-white/10 text-white/70 hover:bg-zinc-900 hover:text-white'
                      }`}
                    >
                      {timeline}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6 bg-[#070303] p-6 rounded-3xl">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Deployment Infrastructure</label>
              <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: 'Vercel', desc: 'Edge Protocol Optimization' },
                    { id: 'Netlify', desc: 'Symmetric Continuous Sync' }
                  ].map(host => (
                    <button
                      key={host.id}
                      type="button"
                      onClick={() => setFormData({...formData, hosting: host.id})}
                      className={`flex flex-col text-left p-6 rounded-2xl border transition-all ${
                        formData.hosting === host.id 
                          ? 'bg-white/20 border-white/30 ring-1 ring-white/20 shadow-[0_0_30px_rgba(255,255,255,0.05)]' 
                          : 'bg-black border-white/10 hover:bg-zinc-900'
                      }`}
                    >
                      <span className={`text-[10px] font-black uppercase tracking-widest mb-1 ${formData.hosting === host.id ? 'text-white' : 'text-white/70'}`}>{host.id}</span>
                      <span className="text-[8px] font-mono text-white/50 font-bold uppercase tracking-wider">{host.desc}</span>
                    </button>
                  ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Mission Description</label>
              <textarea 
                name="description"
                rows={5} 
                value={formData.description}
                onChange={handleChange}
                className="w-full glass bg-black p-6 rounded-2xl text-white font-mono text-sm outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all resize-none placeholder:text-zinc-600 border border-white/10 shadow-inner" 
                placeholder="DESCRIBE OPERATIONAL REQUIREMENTS, SPECIFIC MODULES, OR VISUAL TARGETS..."
              />
            </div>

            <div className="pt-8">
              <SoundButton 
                type="submit" 
                variant="secondary"
                className="w-full py-6 rounded-2xl text-sm h-16 flex items-center justify-center font-black bg-white hover:bg-zinc-200 text-black shadow-[0_20px_40px_-10px_rgba(255,255,255,0.1)] border-none transition-all active:scale-[0.98]"
              >
                Initialize Mission Protocol
                <Send size={18} className="ml-3" />
              </SoundButton>
            </div>
          </form>
        </motion.div>
      </div>
    </main>
  );
}
