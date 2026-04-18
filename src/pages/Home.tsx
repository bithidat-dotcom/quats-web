import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Mail, MapPin, Phone, Instagram, Layers, Code2, Database, Cpu, Zap, LayoutTemplate } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [hash]);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.03] rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-[11px] uppercase tracking-[2px] text-[#888888] mb-3 block truncate"
            >
              System Status: Active
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-[72px] font-semibold tracking-[-2px] leading-[1.05] mb-6"
            >
              Create your own app/website from here now.
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-[18px] text-[#888888] max-w-[480px] mb-[32px] leading-[1.6]"
            >
              Quats engineers high-performance web platforms and native mobile applications, providing the robust foundation required for your digital expansion.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row"
            >
              <Link
                to="/services"
                className="bg-white text-black px-[36px] py-[16px] rounded text-[16px] font-semibold hover:bg-neutral-200 transition-all flex items-center justify-center gap-2"
              >
                Discover Our Services
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quats App Advertisement Section */}
      <section className="py-20 relative overflow-hidden bg-transparent border-y border-white/10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-purple-900/10 opacity-50 blur-3xl pointer-events-none" />
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="bg-white/[0.02] border border-white/5 rounded-[32px] p-8 md:p-14 flex flex-col md:flex-row items-center gap-12 backdrop-blur-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-48 h-48 md:w-64 md:h-64 shrink-0 rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.05)] relative group"
            >
               {/* 1024x1024 Logo Image */}
               <img 
                  src="https://iili.io/Bg7nW8v.jpg" 
                  alt="Quats App Background" 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src === 'https://iili.io/Bg7nW8v.jpg') {
                      target.src = 'https://iili.io/Bg7nW8v.png'; // Try png format as fallback
                    } else if (target.src === 'https://iili.io/Bg7nW8v.png') {
                      target.src = 'https://iili.io/Bg7nW8v.md.jpg'; // Try medium size fallback
                    } else {
                      target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1024&h=1024&q=80'; // Unsplash Fallback
                    }
                  }}
               />
            </motion.div>
            
            <div className="flex-1 text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <div className="text-[11px] uppercase tracking-[3px] text-white/50 mb-4 font-semibold flex items-center justify-center md:justify-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" /> New Platform Release
                </div>
                <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-5 text-white">
                  Get the official <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Quats App</span>
                </h2>
                <p className="text-[#888888] text-lg mb-8 max-w-xl leading-relaxed mx-auto md:mx-0">
                  Manage your development architecture, track project timelines, and communicate directly with our engineering team from your pocket. 
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                  <button onClick={() => window.open('https://quats-app.netlify.app', '_blank')} className="bg-white text-black px-8 py-4 rounded-xl font-semibold hover:bg-neutral-200 transition-all flex items-center gap-3 w-full sm:w-auto justify-center shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                    Download Access <ArrowRight size={18} />
                  </button>
                  <Link to="/get-started" className="bg-transparent border border-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/5 transition-all flex items-center gap-2 w-full sm:w-auto justify-center">
                    Learn More
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack / Features Section */}
      <section className="py-24 border-b border-white/10 relative overflow-hidden bg-black/50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-3xl md:text-4xl font-semibold tracking-tight mb-4"
            >
               Architecting with precision. 
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1 }}
              className="text-[#888888] max-w-2xl mx-auto"
            >
               We utilize industry-leading technology to ensure your platform is scalable, exceptionally fast, and completely secure.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <LayoutTemplate size={24} />, title: 'Modern Frontend', desc: 'React, Next.js, and immersive animations creating fluid user interfaces.' },
              { icon: <Layers size={24} />, title: 'Architecture Planning', desc: 'System level design that allows your platform to scale without bottlenecks.' },
              { icon: <Database size={24} />, title: 'Robust Backend', desc: 'Node.js, serverless edge functions, and secure database integrations.' },
              { icon: <Cpu size={24} />, title: 'Native Mobile', desc: 'Swift, Kotlin, and React Native applications for high-performance mobile UX.' },
              { icon: <Zap size={24} />, title: 'Cloud Infrastructure', desc: 'Deploying across Vercel, Netlify, and AWS for global low-latency access.' },
              { icon: <Code2 size={24} />, title: 'Clean Codebase', desc: 'Strict TypeScript typing and highly modular code ensure long-term maintainability.' }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors group"
              >
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-[#888888] text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Contact Section */}
      <section id="contact" className="py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-[32px] font-semibold tracking-tight mb-8">
                Initialize <br />
                <span className="text-[#888888]">Architecture</span>
              </h2>
              <p className="text-[18px] text-[#888888] mb-12 leading-[1.6] max-w-md">
                Establish a secure connection with our implementation teams. Start your system deployment directly with Prangon today.
              </p>
              
              <div className="space-y-6">
                <a href="https://wa.me/8801716807465" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-white/80 hover:text-white transition-colors group p-4 border border-white/5 bg-white/[0.02] rounded-2xl backdrop-blur-md hover:bg-white/10 w-fit">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform bg-[#25D366]/20">
                    <Phone size={20} className="text-[#25D366]"/>
                  </div>
                  <div>
                    <p className="text-xs text-white/50 mb-1 uppercase tracking-wider">WhatsApp Direct</p>
                    <p className="font-mono text-sm">+880 1716-807465</p>
                  </div>
                </a>
                
                <a href="https://www.instagram.com/prangon_45?utm_source=qr&igsh=MTZhcXVkODV0Y3lpdg==" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-white/80 hover:text-white transition-colors group p-4 border border-white/5 bg-white/[0.02] rounded-2xl backdrop-blur-md hover:bg-white/10 w-fit">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform bg-[#E1306C]/20">
                    <Instagram size={20} className="text-[#E1306C]"/> 
                  </div>
                  <div>
                    <p className="text-xs text-white/50 mb-1 uppercase tracking-wider">Instagram</p>
                    <p className="font-mono text-sm">@prangon_45</p>
                  </div>
                </a>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white/[0.03] border border-white/10 p-8 md:p-12 rounded-3xl backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] flex flex-col items-center text-center justify-center min-h-[400px]"
            >
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-6">
                 <ArrowRight size={32} />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Ready to Build?</h3>
              <p className="text-[#888888] mb-8">Deploy robust websites and platforms configured perfectly to your constraints.</p>
              
              <Link to="/get-started" className="w-full bg-white text-black py-[16px] px-[36px] rounded-[12px] font-semibold text-[16px] hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                Start the Process <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
