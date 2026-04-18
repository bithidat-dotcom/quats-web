import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Send, AlertCircle, Server } from 'lucide-react';

export default function GetStarted() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    websiteType: '',
    description: '',
    hosting: 'Netlify',
    budget: 'No Budget',
    timeline: 'Flexible',
    services: [] as string[]
  });
  const [error, setError] = useState('');

  // Service Options
  const serviceOptions = ['Web Development', 'Mobile App (iOS/Android)', 'UI/UX Design', 'E-Commerce Setup', 'Custom Backend/API', 'SEO Optimization'];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service) 
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
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
      setError('Name and Phone Number are required to proceed.');
      return;
    }

    // Construct WhatsApp message
    const msg = `*New Project Request - Quats*\n\n*Client:* ${formData.name}\n*Phone:* ${formData.phone}\n\n*Platform Details:*\n- Type: ${formData.websiteType || 'Not specified'}\n- Services: ${formData.services.length > 0 ? formData.services.join(', ') : 'None selected'}\n- Hosting: ${formData.hosting}\n\n*Project Scope:*\n- Budget: ${formData.budget}\n- Timeline: ${formData.timeline}\n\n*Requirements:*\n${formData.description || 'Not specified'}`;
    
    const encodedMsg = encodeURIComponent(msg);
    // Open WhatsApp
    window.open(`https://wa.me/8801716807465?text=${encodedMsg}`, '_blank');
  };

  return (
    <main className="pt-32 pb-16 min-h-screen relative overflow-hidden">
      {/* Heavy Glassmorphism Background Orbs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-blue-500/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-3xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">Initialize Project</h1>
          <p className="text-[#888888] text-[18px]">Configure your architectural requirements below.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-8 md:p-12 rounded-[24px]"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg flex items-center gap-3 backdrop-blur-md">
                <AlertCircle size={20} />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-white/50">Full Name *</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white/[0.02] border border-white/10 focus:border-white/40 focus:bg-white/[0.05] rounded-xl px-4 py-3 text-white outline-none transition-all backdrop-blur-sm" 
                  placeholder="John Doe" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-white/50">Phone Number *</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-white/[0.02] border border-white/10 focus:border-white/40 focus:bg-white/[0.05] rounded-xl px-4 py-3 text-white outline-none transition-all backdrop-blur-sm" 
                  placeholder="+1 (555) 000-0000" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-widest text-white/50">Website / App Type</label>
              <input 
                type="text" 
                name="websiteType"
                value={formData.websiteType}
                onChange={handleChange}
                className="w-full bg-white/[0.02] border border-white/10 focus:border-white/40 focus:bg-white/[0.05] rounded-xl px-4 py-3 text-white outline-none transition-all backdrop-blur-sm" 
                placeholder="e.g., E-commerce, Portfolio, SaaS Platform" 
              />
            </div>

            <div className="space-y-4">
              <label className="text-xs font-semibold uppercase tracking-widest text-white/50">Core Services Required</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {serviceOptions.map(service => (
                  <label key={service} className={`cursor-pointer flex items-center gap-3 p-3 rounded-xl border transition-all text-sm backdrop-blur-sm ${formData.services.includes(service) ? 'bg-white/10 border-white/40 text-white' : 'bg-white/[0.02] border-white/10 text-white/70 hover:border-white/20'}`}>
                    <div className={`w-4 h-4 rounded-[4px] border flex items-center justify-center ${formData.services.includes(service) ? 'bg-white border-white' : 'border-white/30'}`}>
                      {formData.services.includes(service) && <div className="w-2 h-2 bg-black rounded-[2px]"/>}
                    </div>
                    {service}
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-4">
                <label className="text-xs font-semibold uppercase tracking-widest text-white/50">Estimated Budget</label>
                <div className="grid grid-cols-2 gap-3">
                  {['Under $1k', '$1k - $3k', '$3k - $10k', '$10k+', 'No Budget'].map((budget, idx) => (
                    <label key={budget} className={`cursor-pointer flex items-center justify-center text-center p-3 rounded-xl border transition-all text-sm backdrop-blur-sm ${formData.budget === budget ? 'bg-white/10 border-white/40 text-white shadow-[0_0_15px_rgba(255,255,255,0.05)]' : 'bg-white/[0.02] border-white/10 text-white/70 hover:border-white/20 hover:text-white'} ${budget === 'No Budget' ? 'col-span-2' : ''}`}>
                      <input 
                        type="radio" 
                        name="budget" 
                        value={budget} 
                        checked={formData.budget === budget} 
                        onChange={handleChange} 
                        className="sr-only" 
                      />
                      {budget}
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-xs font-semibold uppercase tracking-widest text-white/50">Timeline Setup</label>
                 <div className="grid grid-cols-2 gap-3">
                  {['Rush (< 1mo)', '1 - 3 months', '3 - 6 months', 'Flexible'].map(timeline => (
                    <label key={timeline} className={`cursor-pointer flex items-center justify-center text-center p-3 rounded-xl border transition-all text-sm backdrop-blur-sm ${formData.timeline === timeline ? 'bg-white/10 border-white/40 text-white shadow-[0_0_15px_rgba(255,255,255,0.05)]' : 'bg-white/[0.02] border-white/10 text-white/70 hover:border-white/20 hover:text-white'}`}>
                      <input 
                        type="radio" 
                        name="timeline" 
                        value={timeline} 
                        checked={formData.timeline === timeline} 
                        onChange={handleChange} 
                        className="sr-only" 
                      />
                      {timeline}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-widest text-white/50 flex items-center gap-2">
                <Server size={14}/> Preferred Hosting Infrastructure
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className={`cursor-pointer rounded-xl border p-4 transition-all backdrop-blur-sm ${formData.hosting === 'Netlify' ? 'bg-white/10 border-white/40' : 'bg-white/[0.02] border-white/10 hover:border-white/20'}`}>
                  <input type="radio" name="hosting" value="Netlify" checked={formData.hosting === 'Netlify'} onChange={handleChange} className="sr-only" />
                  <div className="font-medium text-white">Netlify Hosting</div>
                  <div className="text-xs text-[#888888] mt-1">Optimized for React/Frontend</div>
                </label>
                <label className={`cursor-pointer rounded-xl border p-4 transition-all backdrop-blur-sm ${formData.hosting === 'Vercel' ? 'bg-white/10 border-white/40' : 'bg-white/[0.02] border-white/10 hover:border-white/20'}`}>
                  <input type="radio" name="hosting" value="Vercel" checked={formData.hosting === 'Vercel'} onChange={handleChange} className="sr-only" />
                  <div className="font-medium text-white">Vercel Hosting</div>
                  <div className="text-xs text-[#888888] mt-1">High-performance edge network</div>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-widest text-white/50">Customization Requirements</label>
              <textarea 
                name="description"
                rows={5} 
                value={formData.description}
                onChange={handleChange}
                className="w-full bg-white/[0.02] border border-white/10 focus:border-white/40 focus:bg-white/[0.05] rounded-xl px-4 py-3 text-white outline-none transition-all resize-none backdrop-blur-sm" 
                placeholder="Describe what kind of website you want, specific features, pages, or design preferences..."
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="w-full bg-white text-black py-4 px-8 rounded-xl font-semibold text-[16px] hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 mt-4 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              Send to WhatsApp <Send size={18} />
            </button>
          </form>
        </motion.div>
      </div>
    </main>
  );
}
