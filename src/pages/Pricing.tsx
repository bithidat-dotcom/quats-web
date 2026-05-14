import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, X, User, Phone, Mail, MessageSquare } from 'lucide-react';
import SoundButton from '../components/SoundButton';

interface Plan {
  tier: string;
  name: string;
  price?: string;
  originalPrice?: string;
  desc: string;
  features: string[];
  gradient: string;
  border: string;
  popular?: boolean;
  isComingSoon?: boolean;
}

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    whatsapp: '',
    email: ''
  });

  const plans: Plan[] = [
    {
      tier: 'v1.0',
      name: 'Basic Protocol',
      price: '25',
      desc: 'Essential PC automation and smart orchestration.',
      features: [
        'Computer Task Handling',
        'Quats Core Interface',
        'Browser Application Control',
        'System App Navigation',
        'Unified Commands'
      ],
      gradient: 'from-zinc-500 to-zinc-800',
      border: 'border-white/5'
    },
    {
      tier: 'v1.5',
      name: 'Standard Protocol',
      price: '31',
      desc: 'Advanced system telemetry and performance logic.',
      features: [
        'Everything in Basic',
        'CPU / RAM Optimization',
        'Thermal Monitoring',
        'Enhanced Work Commands',
        'Performance Metrics',
        'Multi-Process Logic'
      ],
      gradient: 'from-blue-500 to-emerald-500',
      popular: true,
      border: 'border-blue-500/30'
    },
    {
      tier: 'v2.5b',
      name: 'Developer Pro',
      price: '49',
      originalPrice: '50',
      desc: 'Total autonomous brain with safety overrides.',
      features: [
        'Full PC Authority',
        'Autonomous Brain Logic',
        'Custom UX Flow',
        'Problem Solving Logic',
        'Emergency Protocol',
        'Global App Authority'
      ],
      gradient: 'from-purple-500 to-pink-500',
      border: 'border-purple-500/30'
    },
    {
      tier: 'QS-1',
      name: 'Quantum Browser',
      price: '0',
      desc: 'Safe, full-private browsing infrastructure. Zero-tracking.',
      features: [
        'Quantum Privacy Shield',
        'Strategic Advisor (ASA)',
        'Zero-Tracker Policy',
        'Identity Isolation',
        'Secure Vault'
      ],
      gradient: 'from-blue-600 to-purple-600',
      border: 'border-blue-400/30'
    },
    {
      tier: 'v2.7',
      name: 'Market Master',
      isComingSoon: true,
      desc: 'High-power autonomous marketing orchestration.',
      features: [
        'Social Automation',
        'Client Messaging Logic',
        'Market Trend Analysis',
        'Brand Identity Synthesis',
        'Autonomous Lead Gen',
        'Omnichannel Sync'
      ],
      gradient: 'from-amber-400 to-orange-600',
      border: 'border-amber-400/30'
    }
  ];

  const handleAcquire = (plan: Plan) => {
    if (plan.isComingSoon) return;
    setSelectedPlan(plan);
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    setShowForm(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `*Quats License Request*%0A%0A*Plan:* ${selectedPlan?.name} (${selectedPlan?.tier})%0A*Price:* $${selectedPlan?.price}%0A%0A*Client Details:*%0A- Name: ${formData.name}%0A- Mobile: ${formData.mobile}%0A- WhatsApp: ${formData.whatsapp}%0A- Email: ${formData.email}%0A%0A- Please provide the license details.`;
    window.open(`https://wa.me/8801716807465?text=${message}`, '_blank');
    setShowForm(false);
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
            Intelligence Layers
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/80 text-sm md:text-base max-w-2xl mx-auto font-mono uppercase tracking-[0.2em] font-bold"
          >
            Select your tier for full system orchestration. Every license includes recursive expansion logic and kernel-level integration.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-8 mb-32">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="glass backdrop-blur-3xl p-8 rounded-3xl flex flex-col hover:border-blue-500/50 transition-all duration-500 group shadow-lg border border-white/10"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-white font-mono text-xs font-bold">
                  {plan.tier}
                </div>
                {plan.popular && (
                  <span className="text-[8px] font-bold uppercase tracking-[0.2em] bg-blue-600 text-white px-3 py-1 rounded-none">
                    Priority
                  </span>
                )}
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-black mb-2 text-white uppercase tracking-tight">{plan.name}</h3>
                {plan.price ? (
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-white">${plan.price}</span>
                    <span className="text-[10px] text-white/70 font-mono font-black uppercase">/ license</span>
                  </div>
                ) : (
                  <div className="text-amber-600 font-black uppercase tracking-widest text-xs italic">Coming Soon</div>
                )}
              </div>

              <p className="text-white/80 text-[12px] mb-8 leading-relaxed h-12 font-bold">
                {plan.desc}
              </p>

              <div className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-none bg-blue-500 flex-shrink-0" />
                    <span className="text-[10px] text-white group-hover:text-blue-500 transition-colors uppercase font-black tracking-wider">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <SoundButton 
                onClick={() => handleAcquire(plan)}
                variant={plan.popular ? 'secondary' : 'glass'}
                className="w-full py-4 text-[10px]"
                disabled={plan.isComingSoon}
              >
                {plan.isComingSoon ? 'In Sandbox' : 'Initialize'}
              </SoundButton>
            </motion.div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-12 rounded-3xl glass backdrop-blur-3xl border border-black/5 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Zap size={160} className="text-amber-500" />
            </div>
            
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-black mb-10 flex items-center gap-4 uppercase tracking-tighter italic text-white">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                  <Zap size={24} className="text-amber-500" />
                </div>
                Safety Notice
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-mono text-[10px] uppercase tracking-widest leading-loose text-white">
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-1 h-1 bg-amber-500 rounded-none mt-2" />
                    <p className="font-bold">Licenses are permanently bound to your Quats ID and hardware fingerprint.</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-1 h-1 bg-amber-500 rounded-none mt-2" />
                    <p className="font-bold">Standard protocols include 24/7 technical heartbeat monitoring and support.</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-1 h-1 bg-amber-500 rounded-none mt-2" />
                    <p className="font-bold">One-time credit allocation per protocol version. No recurring fees.</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-1 h-1 bg-amber-500 rounded-none mt-2" />
                    <p className="font-bold">Dolfin is an AI agent. Operational results depend on LLM logic accuracy.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {showConfirm && selectedPlan && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-3xl">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass p-12 rounded-none max-w-lg w-full text-center shadow-2xl"
            >
              <h2 className="text-3xl font-black uppercase italic mb-4 tracking-tighter text-white">Initialize Protocol?</h2>
              <p className="text-white font-mono text-[10px] uppercase tracking-widest mb-10 leading-relaxed text-center mx-auto font-bold">
                Initiating <span className="text-white font-bold">{selectedPlan.name}</span> deployment. Total credits: <span className="text-blue-500 font-bold">${selectedPlan.price}</span>.
              </p>
              <div className="flex flex-col gap-3">
                <SoundButton onClick={handleConfirm} variant="secondary" className="w-full py-5 rounded-2xl">
                  Accept & Deploy
                </SoundButton>
                <button 
                  onClick={() => setShowConfirm(false)}
                  className="text-[10px] font-mono uppercase tracking-[4px] text-zinc-400 hover:text-white transition-colors py-4"
                >
                  Abort Mission
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {showForm && selectedPlan && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 glass backdrop-blur-3xl overflow-y-auto">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="glass border border-white/10 p-12 rounded-3xl max-w-xl w-full relative shadow-2xl"
            >
              <button 
                onClick={() => setShowForm(false)}
                className="absolute top-10 right-10 text-zinc-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              <div className="flex items-center gap-4 mb-10">
                <div>
                  <h2 className="text-2xl font-black uppercase italic text-white tracking-tighter">Acquire License</h2>
                  <p className="text-[8px] font-mono uppercase tracking-widest text-zinc-400">Establishing secure channel...</p>
                </div>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Identity Name</label>
                  <input 
                    required 
                    placeholder="ENTER FULL NAME..." 
                    className="w-full bg-white/5 border border-white/10 p-5 rounded-3xl text-white font-mono text-[10px] uppercase outline-none focus:border-blue-500/50 transition-all placeholder:text-zinc-600 font-bold"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Mobile Node</label>
                    <input 
                      required 
                      placeholder="CONTACT ID..." 
                      className="w-full bg-white/5 border border-white/10 p-5 rounded-3xl text-white font-mono text-[10px] uppercase outline-none focus:border-blue-500/50 transition-all placeholder:text-zinc-600 font-bold"
                      value={formData.mobile}
                      onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white">WhatsApp Link</label>
                    <input 
                      required 
                      placeholder="SYNC CODE..." 
                      className="w-full bg-white/5 border border-white/10 p-5 rounded-3xl text-white font-mono text-[10px] uppercase outline-none focus:border-blue-500/50 transition-all placeholder:text-zinc-600 font-bold"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Email Architecture</label>
                  <input 
                    required 
                    type="email" 
                    placeholder="IDENTITY@DOMAIN.COM" 
                    className="w-full bg-white/5 border border-white/10 p-5 rounded-3xl text-white font-mono text-[10px] uppercase outline-none focus:border-blue-500/50 transition-all placeholder:text-zinc-600 font-bold"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <SoundButton type="submit" variant="secondary" className="w-full py-6 rounded-3xl mt-4 font-black">
                  Finalize Acquisition
                </SoundButton>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
