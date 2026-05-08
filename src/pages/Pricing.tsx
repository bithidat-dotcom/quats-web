import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, ArrowRight, X, User, Phone, Mail, MessageSquare } from 'lucide-react';

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
      tier: '1.0',
      name: 'Basic Protocol',
      price: '25',
      desc: 'Essential PC automation and voice orchestration.',
      features: [
        'Computer Task Handling',
        'Jarvis Voice Interface',
        'Browser Application Control',
        'System App Navigation',
        'Unified Voice Commands'
      ],
      gradient: 'from-zinc-500 to-zinc-800',
      border: 'border-white/5'
    },
    {
      tier: '1.5',
      name: 'Standard Protocol',
      price: '31',
      desc: 'Advanced system telemetry and performance logic.',
      features: [
        'Everything in Basic',
        'CPU / RAM Optimization',
        'Thermal Monitoring Interface',
        'Enhanced Work Commands',
        'System Performance Metrics',
        'Multi-Process Logic'
      ],
      gradient: 'from-blue-500 to-emerald-500',
      popular: true,
      border: 'border-blue-500/30'
    },
    {
      tier: '2.5b',
      name: 'Developer Pro',
      price: '49',
      originalPrice: '50',
      desc: 'Total autonomous brain with safety overrides.',
      features: [
        'Full PC Control Authority',
        'Autonomous Self-Brain Logic',
        'Human-Grade Problem Solving',
        'Overheat Auto-Shutdown',
        'Emergency Email Protocol',
        'Global App Authority',
        'Emergency Self-Off State'
      ],
      gradient: 'from-purple-500 to-pink-500',
      border: 'border-purple-500/30'
    },
    {
      tier: '2.7b',
      name: 'Market Master',
      isComingSoon: true,
      desc: 'High-power autonomous marketing & social orchestration.',
      features: [
        'Facebook Post Automation',
        'Client Messaging Logic',
        'Market Trend Analysis',
        'Brand Voice Synthesis',
        'Autonomous Lead Gen',
        'Omnichannel Sync',
        '24/7 Market Sentry'
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
    const message = `*Dolfin AI License Request*%0A%0A*Plan:* ${selectedPlan?.name} (${selectedPlan?.tier})%0A*Price:* $${selectedPlan?.price}%0A%0A*Client Details:*%0A- Name: ${formData.name}%0A- Mobile: ${formData.mobile}%0A- WhatsApp: ${formData.whatsapp}%0A- Email: ${formData.email}%0A%0A- Please provide the license details.`;
    window.open(`https://wa.me/8801716807465?text=${message}`, '_blank');
    setShowForm(false);
  };

  return (
    <main className="pt-24 min-h-screen bg-black">
      {/* Pricing Header */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/[0.03] rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-24 h-24 mx-auto mb-8 rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
            >
              <img src="https://i.ibb.co.com/d0LcTMfR/Dmitri-dmiiiitri-on-X.jpg" alt="Dolfin Logo" className="w-full h-full object-cover" />
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-semibold tracking-tight mb-6"
            >
              Dolfin 1.5 AI Agent
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[#888888] text-lg max-w-2xl mx-auto"
            >
              Select your intelligence tier for full PC orchestration and autonomous workflow enablement. Every package includes full technical support and system integration.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className={`relative group p-8 rounded-[2.5rem] bg-white/[0.03] backdrop-blur-xl border ${plan.border} hover:bg-white/[0.06] transition-all duration-500 shadow-2xl flex flex-col`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[10px] uppercase tracking-widest font-bold px-4 py-1.5 rounded-full z-20 shadow-lg shadow-blue-500/20">
                    Most Popular
                  </div>
                )}

                {plan.isComingSoon && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-black text-[10px] uppercase tracking-widest font-bold px-4 py-1.5 rounded-full z-20 shadow-lg shadow-amber-500/20">
                    Coming Soon
                  </div>
                )}
                
                <div className={`mb-8 w-14 h-14 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center text-white font-bold text-xl shadow-lg relative overflow-hidden group-hover:scale-110 transition-transform duration-500`}>
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  {plan.tier}
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-semibold mb-1 text-white">{plan.name}</h3>
                  {plan.price ? (
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-3xl font-bold text-white">${plan.price}</span>
                      {plan.originalPrice && (
                        <span className="text-sm text-[#555555] line-through">${plan.originalPrice}</span>
                      )}
                      <span className="text-xs text-[#888888] font-medium">/ license</span>
                    </div>
                  ) : (
                    <div className="text-xl font-bold text-amber-500 mt-2">Launching V2.7b</div>
                  )}
                </div>

                <p className="text-[#888888] text-sm mb-8 leading-relaxed h-12">
                  {plan.desc}
                </p>

                <div className="space-y-4 mb-10 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="mt-1 w-4 h-4 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                        <Zap size={10} className="text-blue-400" />
                      </div>
                      <span className="text-xs text-white/60 group-hover:text-white/80 transition-colors uppercase tracking-tight">{feature}</span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => handleAcquire(plan)}
                  className={`w-full py-4 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group/btn ${
                    plan.popular 
                    ? 'bg-white text-black hover:bg-neutral-200 shadow-[0_0_20px_rgba(255,255,255,0.1)]' 
                    : plan.isComingSoon
                    ? 'bg-amber-500/10 border border-amber-500/20 text-amber-500 hover:bg-amber-500/20'
                    : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                  }`}
                >
                  <span className="relative z-10">{plan.isComingSoon ? 'Notify Me' : 'Acquire License'}</span>
                  {!plan.isComingSoon && <ArrowRight size={16} className="relative z-10 group-hover/btn:translate-x-1 transition-transform" />}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* License and Privacy Section */}
      <section className="py-20 border-t border-white/5 bg-white/[0.01]">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-12 rounded-[2.5rem] bg-zinc-900/50 border border-white/10 backdrop-blur-md relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Zap size={160} className="text-amber-500" />
            </div>
            
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <Zap size={20} className="text-amber-500" />
                </div>
                Protocol & Safety Notice
              </h2>
              
              <div className="space-y-6 text-[#888888] leading-relaxed">
                <p className="text-white/80 font-medium">
                  Please review the following operational constraints before deploying the Dolfin Intelligence Layer:
                </p>
                
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                    <p><strong className="text-white">Autonomous Agent Notice:</strong> Dolfin is an AI agent, not a human operator. Its actions are derived from LLM logic. By deploying this agent, you acknowledge that the developers are not responsible for any system conflicts, unintended commands, or data outcomes.</p>
                  </li>
                  <li className="flex gap-4">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                    <p><strong className="text-white">System Isolation Advice:</strong> For maximum security and stability, we strongly recommend deploying Dolfin on a dedicated secondary device rather than your primary personal workstation.</p>
                  </li>
                  <li className="flex gap-4">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                    <p><strong className="text-white">Legacy Support:</strong> The protocol is highly optimized and can be successfully provisioned on older smartphone hardware or secondary PCs to act as a standalone control hub.</p>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modals */}
      <AnimatePresence>
        {showConfirm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowConfirm(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-zinc-900 border border-white/10 p-8 rounded-[2rem] max-w-sm w-full shadow-2xl"
            >
              <h2 className="text-2xl font-semibold mb-4">Initialize Purchase?</h2>
              <p className="text-[#888888] mb-8 leading-relaxed">
                You are about to acquire the <strong>{selectedPlan?.name}</strong> license for <strong>${selectedPlan?.price}</strong>. Do you wish to proceed to deployment setup?
              </p>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={handleConfirm}
                  className="w-full py-4 bg-white text-black rounded-xl font-bold hover:bg-neutral-200 transition-all"
                >
                  Yes, Proceed
                </button>
                <button 
                  onClick={() => setShowConfirm(false)}
                  className="w-full py-4 bg-white/5 border border-white/10 text-white rounded-xl font-bold hover:bg-white/10 transition-all"
                >
                  No, Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {showForm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowForm(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-zinc-900 border border-white/10 p-8 rounded-[2rem] max-w-md w-full shadow-2xl"
            >
              <button 
                onClick={() => setShowForm(false)}
                className="absolute top-6 right-6 text-white/40 hover:text-white"
              >
                <X size={24} />
              </button>
              
              <h2 className="text-3xl font-semibold mb-2">License Details</h2>
              <p className="text-[#888888] mb-8 mb-8">Fill in your information to generate the deployment request.</p>
              
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-[#555555] font-bold">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                    <input 
                      required
                      type="text" 
                      placeholder="Enter your name" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-white/20 transition-all"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-[#555555] font-bold">Mobile Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                      <input 
                        required
                        type="tel" 
                        placeholder="+880..." 
                        value={formData.mobile}
                        onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-white/20 transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-[#555555] font-bold">WhatsApp</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                      <input 
                        required
                        type="tel" 
                        placeholder="+880..." 
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-white/20 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-[#555555] font-bold">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                    <input 
                      required
                      type="email" 
                      placeholder="your@email.com" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-white/20 transition-all"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-5 bg-white text-black rounded-2xl font-bold hover:bg-neutral-200 transition-all shadow-[0_10px_30px_rgba(255,255,255,0.1)] mt-4"
                >
                  Generate License & WhatsApp Redirect
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
