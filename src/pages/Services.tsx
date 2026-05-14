import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Star, Quote, Code2, Smartphone, Monitor } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import SoundButton from '../components/SoundButton';

export default function Services() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [hash]);

  return (
    <main className="pt-32 md:pt-48 pb-32 relative min-h-screen">
      <div className="container mx-auto px-6 max-w-7xl relative z-20">
        
        {/* The Story Section */}
        <section id="story" className="mb-48">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="order-2 lg:order-1 relative"
            >
              <div className="absolute inset-[-40px] bg-custom-image blur-[40px] rounded-[3rem] opacity-60 pointer-events-none" />
              <div className="relative w-full aspect-[4/5] max-w-md mx-auto rounded-[3rem] overflow-hidden border border-black/5 shadow-[-20px_20px_40px_rgba(0,0,0,0.5)] group">
                <img 
                  src="https://res.cloudinary.com/df7jfonrv/image/upload/f_auto,q_auto/WhatsApp_Image_2026-04-18_at_10.46.42_PM_atc2qo" 
                  alt="Prangon - Founder of Quats" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 brightness-110 contrast-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-10 left-10 right-10">
                   <div className="text-white font-black text-3xl tracking-tighter mb-2 uppercase drop-shadow-md">Prangon</div>
                   <div className="text-blue-400 text-xs tracking-[0.2em] uppercase font-bold font-mono drop-shadow-sm">Founder & Visionary</div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="order-1 lg:order-2"
            >
              <span className="text-[10px] uppercase tracking-[0.4em] text-blue-500 mb-6 block font-bold font-mono">
                [ ORIGIN_PROTOCOL ]
              </span>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-10 leading-[1.1] uppercase text-white">
                Built by visionary youth. <br className="hidden lg:block"/> Scaled for global needs.
              </h1>
              <div className="space-y-8 text-white/90 font-black text-lg leading-relaxed font-sans opacity-90">
                <p>
                  Quats was founded by <strong className="text-blue-400 font-black">Prangon</strong>, a 9th-grade student with an extraordinary understanding of digital ecosystems. 
                </p>
                <p>
                  Observing how businesses were suffering from a lack of proper digital representation, Prangon decided to bridge the gap using modern engineering practices and a relentless focus on performance.
                </p>
                <div className="pt-6">
                  <SoundButton to="/get-started" variant="secondary" className="w-fit px-12 py-6 shadow-2xl shadow-blue-500/30">
                    Start Collaboration <ArrowRight size={18} className="ml-2" />
                  </SoundButton>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="mb-48">
          <div className="mb-20 text-center">
            <h2 className="text-[40px] md:text-[64px] font-black tracking-tighter uppercase italic text-white">Our Services</h2>
            <p className="text-white/80 font-mono uppercase tracking-[0.2em] text-sm font-bold">Advanced Engineering Protocols</p>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
              hidden: {}
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            {[
              {
                icon: <Monitor />,
                tag: 'Web Architecture',
                title: 'High-Performance Sites',
                desc: 'Custom-engineered websites and scalable web platforms built for optimal performance, speed, and immersive experiences.'
              },
              {
                icon: <Smartphone />,
                tag: 'App Development',
                title: 'Native Mobile Solutions',
                desc: 'Native and cross-platform mobile applications that deliver intuitive, high-fidelity interactions across all modern devices.'
              },
              {
                icon: <Code2 />,
                tag: 'Interface Engineering',
                title: 'Precision crafted UI',
                desc: 'Precision-crafted UI/UX systems that prioritize cognitive load reduction, accessibility, and fluid motion.',
                details: [
                  'Motion Studies',
                  'a11y Architecture',
                  'Data Viz',
                  'Rapid Loops'
                ]
              }
            ].map((service, i) => (
              <motion.div 
                key={i} 
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
                }}
                className="glass backdrop-blur-3xl p-10 rounded-3xl group hover:glass hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-black/5 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-blue-400 mb-8 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 border border-white/10 relative z-10 shadow-sm">
                  {service.icon}
                </div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-blue-400 mb-4 block font-black font-mono">
                  {service.tag}
                </span>
                <h3 className="text-2xl font-black mb-6 text-white uppercase tracking-tight leading-tight">{service.title}</h3>
                <p className="text-[15px] text-white/80 font-bold leading-relaxed transition-colors mb-8">
                  {service.desc}
                </p>
                {service.details && (
                  <div className="flex flex-wrap gap-2 justify-center">
                    {service.details.map((detail, idx) => (
                      <span key={idx} className="text-[9px] px-4 py-1.5 rounded-full bg-white border border-black/5 text-zinc-500 uppercase font-black tracking-widest font-mono shadow-sm">
                        {detail}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* User Reviews Section */}
        <section id="reviews" className="mb-48 relative">
          <div className="relative z-10">
            <h2 className="text-center text-[40px] md:text-[64px] font-black tracking-tighter uppercase italic mb-20 text-white">User Reviews</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  name: "Sarah Jenkins", 
                  role: "Startup Founder", 
                  review: "What Prangon has built is truly remarkable. Quats delivered our native application in half the time of standard agencies." 
                },
                { 
                  name: "Michael Chen", 
                  role: "E-commerce Director", 
                  review: "We were struggling with an outdated platform. The new website architecture skyrocketed our sales and improved our latency instantly." 
                },
                { 
                  name: "David O.", 
                  role: "Local Business Owner", 
                  review: "I didn't know how to get online. The platform made it so incredibly easy to get a professional website running. Highly recommended!" 
                }
              ].map((testimonial, i) => (
                <div key={i} className="glass backdrop-blur-3xl p-10 rounded-3xl flex flex-col justify-between hover:glass hover:-translate-y-1 transition-all duration-500 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/10 group relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-8 h-8 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10">
                    <Quote className="text-blue-500/10 mb-8" size={40} />
                    <p className="text-white font-bold text-lg leading-relaxed mb-10 italic">"{testimonial.review}"</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={14} className="fill-blue-400 text-blue-400" />
                      ))}
                    </div>
                    <p className="font-black text-white text-xl uppercase tracking-tight">{testimonial.name}</p>
                    <p className="text-[10px] text-blue-400 font-mono uppercase tracking-[0.2em] font-black">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
