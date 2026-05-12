import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Mail, MapPin, Phone, Instagram, Layers, Code2, Database, Cpu, Zap, LayoutTemplate, X, ExternalLink } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from '../components/Logo';

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
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-transparent">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <Logo className="w-20 h-20 mb-8" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-2xl md:text-[42px] font-black leading-[1.3] mb-8 font-game uppercase"
            >
              Full-Scale <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-blue-400/50">App Building.</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-[10px] md:text-[12px] text-zinc-400 max-w-[600px] mb-[40px] leading-[1.8] font-game uppercase tracking-tight"
            >
              The advanced platform for building high-performance websites and applications, architected for rapid digital orchestration.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/services"
                className="bg-white text-black px-6 py-4 md:px-[36px] md:py-[16px] rounded text-sm md:text-[16px] font-semibold hover:bg-neutral-200 transition-all flex items-center justify-center gap-2"
              >
                Discover Our Services
              </Link>
              <Link
                to="/pricing"
                className="bg-white/10 border border-white/20 backdrop-blur-md text-white px-6 py-4 md:px-[36px] md:py-[16px] rounded text-sm md:text-[16px] font-semibold hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2"
              >
                Dolfin Agent Pricing
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
            >
              <Logo className="w-48 h-48 md:w-64 md:h-64 shrink-0" />
            </motion.div>
            
            <div className="flex-1 text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-5 text-white">
                  Get the official <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Quats App</span>
                </h2>
                <p className="text-[#888888] text-lg mb-8 max-w-xl leading-relaxed mx-auto md:mx-0">
                  Join our social platform to scroll and post your opinion.
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
      <section className="py-24 border-y border-white/10 relative overflow-hidden bg-black/50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16 px-4">
            <motion.h2 
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl md:text-5xl font-semibold tracking-tight mb-4"
            >
               Architecting with precision. 
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-[#888888] text-lg md:text-xl max-w-2xl mx-auto"
            >
               We utilize industry-leading technology to ensure your platform is scalable, exceptionally fast, and completely secure.
            </motion.p>
          </div>

          {/* Featured Section Video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-w-5xl mx-auto mb-24 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.6)] bg-black/40 group"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 z-10 pointer-events-none" />
            <video
              src="https://res.cloudinary.com/df7jfonrv/video/upload/Man_creating_apps_video_202605081112_vvkqqh.mp4?_s=vp-3.7.2"
              className="w-full aspect-video object-cover scale-110 transform group-hover:scale-[1.15] transition-transform duration-[2s] ease-[cubic-bezier(0.22,1,0.36,1)]"
              autoPlay
              loop
              muted
              playsInline
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
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

          {/* New Image Showcase Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-5xl mx-auto rounded-[2.5rem] overflow-hidden border border-white/10 bg-black/40 shadow-2xl mb-24"
          >
            <img 
              src="https://i.postimg.cc/kG6VHZfH/make-a-video-where-a-202605081208.jpg" 
              alt="System Architecture Visualization" 
              className="w-full h-auto object-cover"
            />
          </motion.div>

          {/* Code Store Access Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-br from-blue-900/20 via-zinc-900/50 to-purple-900/20 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-12 mb-24 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
            <div className="relative z-10 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-[8px] font-game text-[#888888] tracking-widest uppercase">Open Source Core</span>
              </div>
              <h2 className="text-2xl md:text-4xl font-game font-black tracking-tighter uppercase mb-4">
                QUATS CODE <span className="text-blue-500">STORE</span>
              </h2>
              <p className="text-[#888888] text-[10px] font-game uppercase tracking-[1px] leading-relaxed max-w-md">
                Browse our internal engineering modules with live GitHub integration. Search 100M+ global repositories, copy patterns, and deploy pre-optimized code blocks for your next digital expansion.
              </p>
            </div>
            
            <Link 
              to="/code-store" 
              className="relative group/code-btn w-full md:w-auto"
            >
              <div className="absolute inset-0 bg-blue-600 rounded translate-y-1" />
              <div className="relative bg-white text-black px-10 py-5 rounded text-[12px] font-game font-black hover:bg-neutral-200 active:translate-y-1 transition-all flex items-center justify-center gap-3 uppercase border-b-4 border-zinc-400 active:border-b-0 shadow-[0_0_30px_rgba(37,99,235,0.2)]">
                ENTER CODE VAULT <Code2 size={18} className="group-hover/code-btn:rotate-12 transition-transform" />
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[11px] uppercase tracking-[3px] text-[#888888] mb-4 font-semibold"
            >
              Development Protocol
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-semibold tracking-tight mb-4"
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
              className="hidden md:block absolute top-[45px] left-[10%] h-[1px] bg-gradient-to-r from-green-500 via-emerald-400 to-cyan-500 shadow-[0_0_10px_rgba(34,197,94,0.5)] z-0"
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
                <div className="w-24 h-24 rounded-[2rem] bg-black border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.05)] flex items-center justify-center text-2xl font-sans font-semibold text-white mb-6 relative z-10">
                  {step.num}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{step.title}</h3>
                <p className="text-[#888888] text-sm leading-relaxed max-w-[250px] md:max-w-full">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Showcase Section */}
      <section className="py-24 border-b border-white/10 relative overflow-hidden bg-black/30">
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
            <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full mb-8" />
          </motion.div>
        </div>

        {/* Marquee Ticker */}
        <div className="relative flex overflow-x-hidden border-y border-white/5 py-16 bg-white/[0.02] before:absolute before:left-0 before:top-0 before:z-20 before:h-full before:w-64 before:bg-gradient-to-r before:from-black before:to-transparent after:absolute after:right-0 after:top-0 after:z-20 after:h-full after:w-64 after:bg-gradient-to-l after:from-black after:to-transparent">
          {[1, 2].map((groupIndex) => {
            const companies = [
              { name: "Hugging Face", icon: "huggingface", customIcon: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg" },
              { name: "Supabase", icon: "supabase", customIcon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSibJKkb3zuWNXb3h-Zdu6lNYQYN59aim1x0w&s" },
              { name: "Bolt", icon: "bolt", customIcon: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/bolt-ai-builder-icon.png" },
              { name: "Lovable", icon: "lovable", customIcon: "https://lovable.dev/img/logo/lovable-icon-bg-light.png" },
              { name: "Replit", icon: "replit", customIcon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIML4Si6wtiuFjg4AElfP1A9MZGUDfEG1R9A&s" },
              { name: "Arena.ai", icon: "arena", customIcon: "https://yt3.googleusercontent.com/ZXvxog8BCpdyAcaEK50zi2t8-vAvRPMcKtOy2AnTFssNmiYrpo2FDns2TjMdbXEeh7fh6yQ9GA=s900-c-k-c0x00ffffff-no-rj" },
              { name: "OpenRouter", icon: "openrouter", customIcon: "https://openrouter.ai/favicon.ico" },
              { name: "GitHub", icon: "github" },
              { name: "Vercel", icon: "vercel" },
              { name: "Netlify", icon: "netlify" },
              { name: "Figma", icon: "figma" },
              { name: "Prisma", icon: "prisma", customIcon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6jOZdGIBFG5JdX1vIIihAhbeJ3ugyYtBegQ&s" },
              { name: "VS Code", icon: "visualstudiocode", customIcon: "https://www.svgrepo.com/show/342347/visual-studio-code.svg" },
            ];

            return (
              <motion.div
                key={groupIndex}
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className={`flex whitespace-nowrap gap-10 items-center ${groupIndex === 2 ? 'absolute top-16 left-0 pl-10' : ''}`}
              >
                {companies.map((company, i) => (
                  <div
                    key={`${groupIndex}-${i}`}
                    className="inline-flex items-center gap-3 md:gap-5 px-6 md:px-10 py-4 md:py-6 bg-white rounded-2xl shadow-[0_10px_40px_rgba(255,255,255,0.1)] border-2 border-white group hover:-translate-y-2 transition-all duration-500 cursor-default min-w-[220px] md:min-w-[280px] justify-center"
                  >
                    <div className="w-8 h-8 flex items-center justify-center shrink-0">
                      <img 
                        src={company.customIcon || `https://cdn.simpleicons.org/${company.icon}/000000`} 
                        alt={company.name}
                        className="w-full h-full grayscale-0 group-hover:scale-125 transition-transform duration-500 object-contain"
                      />
                    </div>
                    <span className="text-black font-game text-[14px] font-black uppercase tracking-tight">
                      {company.name}
                    </span>
                  </div>
                ))}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA Contact Section */}
      <section id="contact" className="py-32 relative overflow-hidden bg-black/50 border-t border-white/5">
        {/* Background glow effects */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="text-[11px] uppercase tracking-[3px] text-green-400 mb-6 font-semibold flex items-center gap-2 font-game">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> [ONLINE]
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-[44px] font-black tracking-tighter mb-8 leading-[1.1] font-game">
                SELECT <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">MISSION</span>
              </h2>
              
              <p className="text-sm md:text-base text-[#888888] mb-12 leading-relaxed max-w-lg font-mono">
                &gt; Initialize communication sequence... <br/>
                &gt; Protocol: Direct Deployment <br/>
                &gt; Target: Founder Prangon <br/>
                &gt; Status: Ready for extraction
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a href="https://wa.me/8801716807465" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-white/80 hover:text-white transition-all duration-300 group p-4 border-2 border-white/10 bg-black rounded-lg hover:border-green-400 hover:shadow-[4px_4px_0_rgba(34,197,94,1)] w-full">
                  <div className="w-12 h-12 rounded-lg border-2 border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform bg-[#25D366]/20">
                    <Phone size={20} className="text-[#25D366]"/>
                  </div>
                  <div>
                    <p className="text-[8px] text-white/50 mb-1 uppercase tracking-widest font-game">WHATSAPP</p>
                    <p className="font-mono text-[10px] font-medium">+880 1716-807465</p>
                  </div>
                </a>
                
                <a href="https://www.instagram.com/prangon_45" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-white/80 hover:text-white transition-all duration-300 group p-4 border-2 border-white/10 bg-black rounded-lg hover:border-pink-500 hover:shadow-[4px_4px_0_rgba(225,48,108,1)] w-full">
                  <div className="w-12 h-12 rounded-lg border-2 border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform bg-[#E1306C]/20">
                    <Instagram size={20} className="text-[#E1306C]"/> 
                  </div>
                  <div>
                    <p className="text-[8px] text-white/50 mb-1 uppercase tracking-widest font-game">INSTA</p>
                    <p className="font-mono text-[10px] font-medium">@prangon_45</p>
                  </div>
                </a>

                <a href="mailto:contact@quats.com" className="flex items-center gap-4 text-white/80 hover:text-white transition-all duration-300 group p-4 border-2 border-white/10 bg-black rounded-lg hover:border-blue-500 hover:shadow-[4px_4px_0_rgba(59,130,246,1)] w-full">
                  <div className="w-12 h-12 rounded-lg border-2 border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform bg-blue-500/20">
                    <Mail size={20} className="text-blue-400"/> 
                  </div>
                  <div>
                    <p className="text-[8px] text-white/50 mb-1 uppercase tracking-widest font-game">EMAIL</p>
                    <p className="font-mono text-[10px] font-medium">contact@quats.com</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 text-white/80 group p-4 border-2 border-white/10 bg-black rounded-lg w-full">
                  <div className="w-12 h-12 rounded-lg border-2 border-white/10 flex items-center justify-center bg-white/5">
                    <MapPin size={20} className="text-zinc-500"/> 
                  </div>
                  <div>
                    <p className="text-[8px] text-white/50 mb-1 uppercase tracking-widest font-game">LOC</p>
                    <p className="font-mono text-[10px] font-medium">Remote Core</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative p-[1px] rounded-[2rem] overflow-hidden group"
            >
              {/* Animated gradient border */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/30 via-transparent to-blue-500/30 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative bg-black/80 border border-white/10 p-8 sm:p-10 md:p-14 rounded-[2rem] backdrop-blur-2xl flex flex-col items-center text-center justify-center min-h-[350px] sm:min-h-[450px]">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-full flex items-center justify-center mb-6 sm:mb-8 border border-white/10 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                   <ArrowRight className="text-white w-8 h-8 sm:w-9 sm:h-9" />
                </div>
                
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black mb-4 sm:mb-5 font-game tracking-tighter">Level Clear?</h3>
                <p className="text-[#888888] text-[10px] sm:text-xs mb-8 sm:mb-10 max-w-sm leading-relaxed font-game uppercase tracking-tight">
                   Press Start <br/> to deploy new <br/> world architecture
                </p>
                
                <Link to="/get-started" className="w-full relative overflow-hidden group/btn rounded">
                  <div className="absolute inset-0 bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.5)] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                  <div className="relative bg-white text-black px-6 py-4 sm:px-8 sm:py-5 flex items-center justify-center gap-2 sm:gap-3 font-game text-[10px] sm:text-xs hover:bg-neutral-200 group-hover/btn:bg-transparent group-hover/btn:text-white transition-all duration-300 border-b-4 border-zinc-400 active:border-b-0 active:translate-y-1">
                    START MISSION <ArrowRight className="w-[14px] h-[14px] sm:w-4 sm:h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </div>
                </Link>
                
                <p className="text-[#555555] text-[8px] sm:text-[9px] font-game mt-5 sm:mt-6 uppercase tracking-widest text-center">Sync Speed: 2-4 Hours</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
