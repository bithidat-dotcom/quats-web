import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Mail, MapPin, Phone, Instagram, Layers, Code2, Database, Cpu, Zap, LayoutTemplate, X, ExternalLink } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import SoundButton from '../components/SoundButton';

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
    <main className="relative min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden"
      >
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="max-w-4xl mr-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-left flex flex-col items-start"
            >
              <div className="mb-6 inline-flex items-center gap-3 px-3 py-1 bg-white/10 border border-black/5 rounded-none shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                <div className="w-1.5 h-1.5 bg-white animate-pulse" />
                <span className="text-[9px] font-mono font-black uppercase text-black tracking-[0.2em]">Deployment System v2.0 Ready</span>
              </div>

              <h1 className="text-4xl md:text-7xl font-black leading-[1.1] mb-8 font-sans tracking-tight uppercase text-white">
                <span className="block drop-shadow-lg text-white">Full-Scale <br/>App Building.</span>
              </h1>
              
              <p className="text-sm md:text-base text-white/90 font-black max-w-2xl mb-12 leading-relaxed font-mono uppercase tracking-[0.2em] drop-shadow-md">
                The advanced platform for building high-performance websites and applications, architected for rapid digital orchestration.
              </p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-6 mt-4 justify-start"
              >
                <SoundButton 
                  to="/services" 
                  variant="secondary" 
                  className="px-10 py-6 text-sm flex-1 sm:flex-none relative group/hire overflow-hidden shadow-2xl shadow-blue-500/30 transition-all duration-500"
                >
                  <motion.div 
                    animate={{ x: ['-200%', '200%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-y-0 w-20 bg-white/20 skew-x-12 blur-sm"
                  />
                  <span className="relative z-10 flex items-center gap-2 font-black">
                    create website <ArrowRight className="group-hover/hire:translate-x-1 transition-transform" />
                  </span>
                </SoundButton>
                
                <SoundButton 
                  to="/job" 
                  variant="glass-light" 
                  className="px-10 py-6 text-sm flex-1 sm:flex-none border border-black/5 hover:bg-white transition-all group/job relative overflow-hidden shadow-xl"
                >
                  <span className="relative z-10 font-black">I am a Job Seeker</span>
                </SoundButton>
              </motion.div>

              <div className="mt-12 flex items-center justify-start gap-8 opacity-70 group-hover:opacity-100 transition-all text-white">
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-black uppercase font-mono tracking-tighter drop-shadow-md">Infrastructure</span>
                  <span className="text-[8px] font-mono drop-shadow-md">TIER-1 CORE</span>
                </div>
                <div className="w-[1px] h-6 bg-white/50" />
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-black uppercase font-mono tracking-tighter drop-shadow-md">Latency</span>
                  <span className="text-[8px] font-mono drop-shadow-md">&lt;40MS EDGE</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quats App Advertisement Section */}
      <section className="py-24 relative overflow-hidden bg-black">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="bg-zinc-900/50 backdrop-blur-3xl rounded-[2.5rem] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 sm:gap-16 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] border border-white/10">
            <div className="flex-1 text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 mb-6">
                  <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">New Release</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6 text-white uppercase italic leading-tight">
                  Official <span className="text-blue-500">Quats App</span>
                </h2>
                <p className="text-white/70 font-black text-sm sm:text-base mb-10 max-w-xl leading-relaxed mx-auto md:mx-0 font-mono uppercase tracking-tight">
                  &gt; Join our social platform to scroll and post your opinion. <br/>
                  &gt; Architected for rapid digital orchestration.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                  <SoundButton onClick={() => window.open('https://quats-app.netlify.app', '_blank')} variant="secondary" className="w-full sm:w-auto px-10 py-5 shadow-2xl shadow-blue-500/20 bg-white text-black hover:bg-zinc-200 font-black">
                    Download Access <ArrowRight size={18} className="ml-2" />
                  </SoundButton>
                  <SoundButton to="/get-started" variant="glass-light" className="w-full sm:w-auto px-10 py-5 border-white/10 text-white hover:bg-white hover:text-black font-black">
                    Learn More
                  </SoundButton>
                </div>
              </motion.div>
            </div>
            <div className="flex-1 w-full md:w-auto">
               <motion.div
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10"
               >
                 <img 
                   src="https://i.pinimg.com/1200x/ed/b0/1a/edb01ac6bff32feebdd5b1d43b25c373.jpg"
                   alt="App Preview"
                   className="w-full h-full object-cover filter grayscale brightness-0"
                 />
                 <div className="absolute inset-0 bg-blue-600/10 mix-blend-overlay" />
               </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack / Features Section */}
      <section className="py-24 relative overflow-hidden bg-black">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16 px-4">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl md:text-5xl font-black tracking-tighter mb-4 text-white uppercase italic"
            >
               Architecting with precision. 
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto font-mono uppercase tracking-tight font-black"
            >
               Industry-leading technology for scalability, performance, and security.
            </motion.p>
          </div>

          {/* Featured Section Video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-w-5xl mx-auto mb-24 rounded-3xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.4)] bg-zinc-900 group border border-white/10"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 z-10 pointer-events-none" />
            <video
              src="https://res.cloudinary.com/df7jfonrv/video/upload/Man_creating_apps_video_202605081112_vvkqqh.mp4?_s=vp-3.7.2"
              className="w-full aspect-video object-cover transition-transform duration-[3s] ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100 transition-opacity"
              autoPlay
              loop
              muted
              playsInline
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
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
                className="p-10 rounded-3xl bg-white/5 backdrop-blur-3xl border border-white/10 hover:bg-white/10 hover:-translate-y-1 transition-all duration-500 group shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
              >
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white mb-8 group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all duration-500 border border-white/10 shadow-sm leading-none">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-black mb-4 text-white uppercase tracking-tight italic leading-tight">{feature.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed font-mono uppercase tracking-tight font-black">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* New Image Showcase Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-5xl mx-auto rounded-3xl overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl mb-24"
          >
            <img 
              src="https://i.postimg.cc/kG6VHZfH/make-a-video-where-a-202605081208.jpg" 
              alt="System Architecture Visualization" 
              className="w-full h-auto object-cover opacity-80"
            />
          </motion.div>

          {/* Code Store Access Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto p-8 md:p-12 rounded-3xl bg-black/40 backdrop-blur-3xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-12 mb-24 relative overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.4)]"
          >
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
            <div className="relative z-10 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 mb-4">
                <div className="w-1.5 h-1.5 rounded-none bg-blue-400 animate-pulse" />
                <span className="text-[9px] font-mono text-blue-400 tracking-widest uppercase font-black">Open Source Core</span>
              </div>
              <h2 className="text-2xl md:text-4xl font-black tracking-tighter uppercase italic mb-4 text-white">
                QUATS CODE <span className="text-blue-500">STORE</span>
              </h2>
              <p className="text-white/60 text-[11px] font-mono uppercase tracking-[1px] leading-relaxed max-w-md font-black">
                Browse our internal engineering modules with live GitHub integration. Search 100M+ global repositories, copy patterns, and deploy pre-optimized code blocks for your next digital expansion.
              </p>
            </div>
            
            <SoundButton 
              to="/code-store" 
              variant="secondary"
              className="w-full md:w-auto px-10 py-5 group/code-btn text-sm shadow-2xl shadow-blue-500/20 bg-white text-black hover:bg-zinc-200"
            >
              ENTER CODE VAULT <Code2 size={18} className="ml-2 group-hover/code-btn:rotate-12 transition-transform" />
            </SoundButton>
          </motion.div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-24 relative overflow-hidden bg-black">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[11px] uppercase tracking-[3px] text-white mb-4 font-bold"
            >
              Development Protocol
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-semibold tracking-tight mb-4 text-white"
            >
               The Quats Framework
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 relative">
            {/* Background Base Line */}
            <div className="hidden md:block absolute top-[45px] left-[10%] right-[10%] h-[1px] bg-white/10 z-0" />
            
            {/* Animated Progress Line */}
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: '80%' }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
              className="hidden md:block absolute top-[45px] left-[10%] h-[1px] bg-gradient-to-r from-green-600 via-emerald-500 to-cyan-600 shadow-[0_0_10px_rgba(22,163,74,0.3)] z-0"
            />
            
            {[
              { num: '01', title: 'Discovery', desc: 'Analyzing requirements and conceptualizing the core architecture.' },
              { num: '02', title: 'Blueprint', desc: 'Drafting UI/UX wireframes and designing database schemas.' },
              { num: '03', title: 'Build', desc: 'Agile development phases using cutting-edge tech stacks.' },
              { num: '04', title: 'Deploy', desc: 'Rigorous testing and seamless deployment to global CDNs.' }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative text-center md:text-left flex flex-col items-center md:items-start"
              >
                <div className="w-24 h-24 rounded-none bg-white/10 border border-white/10 shadow-xl flex items-center justify-center text-2xl font-sans font-semibold text-white mb-6 relative z-10 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                  {step.num}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{step.title}</h3>
                <p className="text-white/80 text-sm leading-relaxed max-w-[250px] md:max-w-full font-bold">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Showcase Section */}
      <section className="py-24 border-b border-white/10 relative overflow-hidden bg-black">
        <div className="container mx-auto px-6 max-w-7xl mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-xl md:text-2xl font-black tracking-tighter uppercase font-game text-white mb-4">
              Integrated with Industry Leaders
            </h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full mb-8" />
          </motion.div>
        </div>

        {/* Marquee Ticker */}
        <div className="relative flex overflow-x-hidden border-y border-white/10 py-16 bg-black/20 before:absolute before:left-0 before:top-0 before:z-20 before:h-full before:w-64 before:bg-gradient-to-r before:from-black before:to-transparent after:absolute after:right-0 after:top-0 after:z-20 after:h-full after:w-64 after:bg-gradient-to-l after:from-black after:to-transparent">
          {(() => {
            const companies = [
              { name: "Hugging Face", icon: "huggingface", customIcon: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg" },
              { name: "Supabase", icon: "supabase", customIcon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSibJKkb3zuWNXb3h-Zdu6lNYQYN59aim1x0w&s" },
              { name: "Bolt", icon: "bolt", customIcon: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/bolt-ai-builder-icon.png" },
              { name: "Lovable", icon: "lovable", customIcon: "https://lovable.dev/img/logo/lovable-icon-bg-light.png" },
              { name: "Replit", icon: "replit", customIcon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIML4Si6wtiuFjg4AElfP1A9MZGUDfEG1R9A&s" },
              { name: "Arena.ai", icon: "arena", customIcon: "https://yt3.googleusercontent.com/ZXvxog8BCpdyAcaEK50zi2t8-vAvRPMcKtOy2AnTFssNmiYrpo2FDns2TjMdbXEeh7fh6yQ9GA=s900-c-k-c0x00ffffff-no-rj" },
              { name: "OpenRouter", icon: "openrouter", customIcon: "https://openrouter.ai/favicon.ico" },
              { name: "GitHub", icon: "github", customIcon: "https://cdn.simpleicons.org/github/ffffff" },
              { name: "Vercel", icon: "vercel", customIcon: "https://cdn.simpleicons.org/vercel/ffffff" },
              { name: "Netlify", icon: "netlify", customIcon: "https://cdn.simpleicons.org/netlify/ffffff" },
              { name: "Figma", icon: "figma", customIcon: "https://cdn.simpleicons.org/figma/ffffff" },
              { name: "Prisma", icon: "prisma", customIcon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6jOZdGIBFG5JdX1vIIihAhbeJ3ugyYtBegQ&s" },
              { name: "VS Code", icon: "visualstudiocode", customIcon: "https://www.svgrepo.com/show/342347/visual-studio-code.svg" },
            ];
            
            return (
              <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="flex whitespace-nowrap gap-10 items-center"
              >
                {companies.map((company, i) => (
                  <div
                    key={i}
                    className="inline-flex items-center gap-3 md:gap-5 px-6 md:px-10 py-4 md:py-6 bg-white/5 rounded-none shadow-2xl border border-white/10 group hover:-translate-y-2 transition-all duration-500 cursor-default min-w-[220px] md:min-w-[280px] justify-center"
                  >
                    <div className="w-8 h-8 flex items-center justify-center shrink-0">
                      <img 
                        src={company.customIcon || `https://cdn.simpleicons.org/${company.icon}/ffffff`} 
                        alt={company.name}
                        className="w-full h-full grayscale-0 group-hover:scale-125 transition-transform duration-500 object-contain"
                      />
                    </div>
                    <span className="text-white font-game text-[14px] font-black uppercase tracking-tight">
                      {company.name}
                    </span>
                  </div>
                ))}
              </motion.div>
            );
          })()}
        </div>
      </section>

      {/* CTA Contact Section */}
      <section id="contact" className="py-32 relative overflow-hidden bg-black border-t border-white/10">
        {/* Background glow effects */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] bg-green-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="text-[11px] uppercase tracking-[3px] text-green-600 mb-6 font-semibold flex items-center gap-2 font-game">
                <div className="w-2 h-2 rounded-none bg-green-500 animate-pulse" /> [ONLINE]
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-[44px] font-black tracking-tighter mb-8 leading-[1.1] font-game text-white">
                SELECT <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600">MISSION</span>
              </h2>
              
              <p className="text-sm md:text-base text-white/90 font-bold mb-12 leading-relaxed max-w-lg font-mono">
                &gt; Initialize communication sequence... <br/>
                &gt; Protocol: Direct Deployment <br/>
                &gt; Target: Founder Prangon <br/>
                &gt; Status: Ready for extraction
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a href="https://wa.me/8801716807465" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-white hover:text-white transition-all duration-300 group p-4 border-2 border-white/10 bg-white/5 rounded-lg hover:border-green-400 hover:shadow-[4px_4px_0_rgba(34,197,94,1)] w-full shadow-sm">
                  <div className="w-12 h-12 rounded-lg border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform bg-[#25D366]/10">
                    <Phone size={20} className="text-[#25D366]"/>
                  </div>
                  <div>
                    <p className="text-[8px] text-white/40 mb-1 uppercase tracking-widest font-game">WHATSAPP</p>
                    <p className="font-mono text-[10px] font-medium text-white">+880 1716-807465</p>
                  </div>
                </a>
                
                <a href="https://www.instagram.com/prangon_45" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-white hover:text-white transition-all duration-300 group p-4 border-2 border-white/10 bg-white/5 rounded-lg hover:border-pink-500 hover:shadow-[4px_4px_0_rgba(225,48,108,1)] w-full shadow-sm">
                  <div className="w-12 h-12 rounded-lg border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform bg-[#E1306C]/10">
                    <Instagram size={20} className="text-[#E1306C]"/> 
                  </div>
                  <div>
                    <p className="text-[8px] text-white/40 mb-1 uppercase tracking-widest font-game">INSTA</p>
                    <p className="font-mono text-[10px] font-medium text-white">@prangon_45</p>
                  </div>
                </a>

                <a href="mailto:contact@quats.com" className="flex items-center gap-4 text-white hover:text-white transition-all duration-300 group p-4 border-2 border-white/10 bg-white/5 rounded-lg hover:border-blue-500 hover:shadow-[4px_4px_0_rgba(59,130,246,1)] w-full shadow-sm">
                  <div className="w-12 h-12 rounded-lg border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform bg-blue-500/10">
                    <Mail size={20} className="text-blue-400"/> 
                  </div>
                  <div>
                    <p className="text-[8px] text-white/40 mb-1 uppercase tracking-widest font-game">EMAIL</p>
                    <p className="font-mono text-[10px] font-medium text-white">contact@quats.com</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 text-white group p-4 border-2 border-white/10 bg-white/5 rounded-lg w-full shadow-sm">
                  <div className="w-12 h-12 rounded-lg border border-white/10 flex items-center justify-center bg-white/5">
                    <MapPin size={20} className="text-zinc-400"/> 
                  </div>
                  <div>
                    <p className="text-[8px] text-white/40 mb-1 uppercase tracking-widest font-game">LOC</p>
                    <p className="font-mono text-[10px] font-medium text-white">Remote Core</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative p-[1px] rounded-[2rem] overflow-hidden group shadow-2xl"
            >
              {/* Animated gradient border */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/30 via-transparent to-blue-500/30 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative bg-black/80 border border-white/10 p-8 sm:p-10 md:p-14 rounded-[2.5rem] backdrop-blur-2xl flex flex-col items-center text-center justify-center min-h-[350px] sm:min-h-[450px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-3xl flex items-center justify-center mb-6 sm:mb-8 border border-white/10 shadow-lg">
                   <ArrowRight className="text-white w-8 h-8 sm:w-9 sm:h-9" />
                </div>
                
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black mb-4 sm:mb-5 font-game tracking-tighter text-white">Level Clear?</h3>
                <p className="text-white font-bold text-[10px] sm:text-xs mb-8 sm:mb-10 max-w-sm leading-relaxed font-game uppercase tracking-tight">
                   Press Start <br/> to deploy new <br/> world architecture
                </p>
                
                <SoundButton to="/get-started" variant="secondary" className="w-full py-5 text-sm group/btn bg-white text-black hover:bg-zinc-200">
                  START MISSION <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </SoundButton>
                
                <p className="text-white/50 font-bold text-[8px] sm:text-[9px] font-game mt-5 sm:mt-6 uppercase tracking-widest text-center opacity-70">Sync Speed: 2-4 Hours</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
