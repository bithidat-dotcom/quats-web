import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Mail, MapPin, Phone, Instagram, Layers, Code2, Database, Cpu, Zap, LayoutTemplate, X, ExternalLink } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface Project {
  title: string;
  category: string;
  img: string;
  desc: string;
}

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

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
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

      {/* Portfolio Showcase Section */}
      <section className="py-32 border-t border-white/10 relative overflow-hidden bg-black/30">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-[11px] uppercase tracking-[3px] text-[#888888] mb-4 font-semibold"
              >
                Live Deployments
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-5xl font-semibold tracking-tight uppercase tracking-[-1px]"
              >
                 Featured Projects
              </motion.h2>
            </div>
            <motion.div
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
            >
              <Link to="/services" className="text-white border-b border-white hover:text-[#888888] hover:border-[#888888] pb-1 transition-all flex items-center gap-2 text-sm font-semibold uppercase tracking-widest">
                View All Systems <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { 
                title: 'Hola Media Solutions', 
                category: 'Corporate Platform', 
                img: 'https://www.holamediasolutions.com/wp-content/uploads/2020/09/web-design-29.jpg',
                desc: 'A comprehensive corporate architecture designed for rapid content delivery and global brand consistency.'
              },
              { 
                title: 'Logon UX Evolution', 
                category: 'Mobile App Interface', 
                img: 'https://logondesign.com/assets/fornew/assets/images/portfolio/ux/4.png',
                desc: 'Redining the mobile experience with motion-driven navigation and high-density information display.'
              },
              { 
                title: 'Enterprise Dashboard', 
                category: 'SaaS Platform', 
                img: 'https://file.mockplus.com/image/2019/11/e2c96dfa-05b1-4d84-b56c-5fc6d756a33e.jpg',
                desc: 'Real-time telemetry and supply chain visualization for logistics conglomerates.'
              },
              { 
                title: 'AND Academy Portal', 
                category: 'EdTech Web App', 
                img: 'https://www.andacademy.com/resources/wp-content/uploads/2024/02/32.webp',
                desc: 'Digital learning ecosystem architected to handle thousands of concurrent live streaming sessions.'
              },
              { 
                title: 'Data Flow Component', 
                category: 'Widget Design', 
                img: 'https://cdn.dribbble.com/userupload/22251852/file/original-85d899df6234ff33a65f5bc75bf309b2.jpg?format=webp&resize=400x300&vertical=center',
                desc: 'Low-latency data visualization library optimized for high-frequency trading assets.'
              }
            ].map((project, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="group cursor-pointer"
              >
                <div className="relative rounded-[2rem] overflow-hidden mb-6 aspect-[4/3] border border-white/5">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img src={project.img} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)]" />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-semibold mb-2 text-white group-hover:text-gray-300 transition-colors">{project.title}</h3>
                    <p className="text-[#888888] text-xs uppercase tracking-widest font-semibold">{project.category}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 bg-white/5 backdrop-blur-md">
                    <ArrowRight size={20} className="-rotate-45" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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
              <div className="text-[11px] uppercase tracking-[3px] text-green-400 mb-6 font-semibold flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> System Engineers Available
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-[56px] font-semibold tracking-[-2px] mb-8 leading-[1.1]">
                Initialize <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Architecture</span>
              </h2>
              
              <p className="text-lg md:text-xl text-[#888888] mb-12 leading-relaxed max-w-lg">
                Establish a secure connection with our implementation teams. We are ready to engineer, scale, and deploy your next major system. Start your deployment directly with Prangon today.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a href="https://wa.me/8801716807465" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-white/80 hover:text-white transition-all duration-300 group p-4 border border-white/5 bg-white/[0.02] rounded-2xl backdrop-blur-md hover:bg-white/10 hover:border-white/10 w-full">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform bg-[#25D366]/20">
                    <Phone size={20} className="text-[#25D366]"/>
                  </div>
                  <div>
                    <p className="text-[10px] text-white/50 mb-1 uppercase tracking-widest font-semibold">WhatsApp Direct</p>
                    <p className="font-mono text-sm font-medium">+880 1716-807465</p>
                  </div>
                </a>
                
                <a href="https://www.instagram.com/prangon_45" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-white/80 hover:text-white transition-all duration-300 group p-4 border border-white/5 bg-white/[0.02] rounded-2xl backdrop-blur-md hover:bg-white/10 hover:border-white/10 w-full">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform bg-[#E1306C]/20">
                    <Instagram size={20} className="text-[#E1306C]"/> 
                  </div>
                  <div>
                    <p className="text-[10px] text-white/50 mb-1 uppercase tracking-widest font-semibold">Instagram</p>
                    <p className="font-mono text-sm font-medium">@prangon_45</p>
                  </div>
                </a>

                <a href="mailto:contact@quats.com" className="flex items-center gap-4 text-white/80 hover:text-white transition-all duration-300 group p-4 border border-white/5 bg-white/[0.02] rounded-2xl backdrop-blur-md hover:bg-white/10 hover:border-white/10 w-full">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform bg-blue-500/20">
                    <Mail size={20} className="text-blue-400"/> 
                  </div>
                  <div>
                    <p className="text-[10px] text-white/50 mb-1 uppercase tracking-widest font-semibold">Email</p>
                    <p className="font-mono text-[13px] font-medium">contact@quats.com</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 text-white/80 group p-4 border border-white/5 bg-white/[0.02] rounded-2xl backdrop-blur-md w-full">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/5">
                    <MapPin size={20} className="text-white/60"/> 
                  </div>
                  <div>
                    <p className="text-[10px] text-white/50 mb-1 uppercase tracking-widest font-semibold">Location</p>
                    <p className="font-mono text-[13px] font-medium">Global / Remote</p>
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
                
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight mb-4 sm:mb-5">Ready to Build?</h3>
                <p className="text-[#888888] text-base sm:text-lg mb-8 sm:mb-10 max-w-sm leading-relaxed">
                  Deploy robust websites, mobile apps, and enterprise platforms configured perfectly to your exact constraints.
                </p>
                
                <Link to="/get-started" className="w-full relative overflow-hidden group/btn rounded-xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                  <div className="relative bg-white text-black px-6 py-4 sm:px-8 sm:py-5 flex items-center justify-center gap-2 sm:gap-3 font-semibold text-base sm:text-lg hover:bg-neutral-200 group-hover/btn:bg-transparent group-hover/btn:text-white transition-all duration-300">
                    Start the Process <ArrowRight className="w-[18px] h-[18px] sm:w-5 sm:h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </div>
                </Link>
                
                <p className="text-[#555555] text-[10px] sm:text-xs font-mono mt-5 sm:mt-6 uppercase tracking-widest text-center">Estimated response time: 2-4 hours</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
