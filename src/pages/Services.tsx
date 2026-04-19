import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Star, Quote } from 'lucide-react';
import { useLocation } from 'react-router-dom';

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
    <main className="pt-32 pb-16">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* The Story Section */}
        <section id="story" className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1 relative"
            >
              {/* Image Container with Glow */}
              <div className="absolute inset-0 bg-blue-500/20 blur-[50px] rounded-full" />
              <div className="relative w-full aspect-[4/5] max-w-md mx-auto rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                {/* Replace this src with your actual image uploaded to the AI Studio! */}
                <img 
                  src="https://picsum.photos/seed/founder/800/1000" 
                  alt="Prangon - Founder of Quats" 
                  className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-8 left-8 right-8">
                   <div className="text-white font-semibold text-2xl tracking-tight mb-1">Prangon</div>
                   <div className="text-blue-400 text-sm tracking-wider uppercase font-semibold">Founder & Visionary</div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <span className="text-[11px] uppercase tracking-[2px] text-blue-400 mb-4 block font-semibold">
                Origin Story
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-8">
                Built by visionary youth. <br className="hidden lg:block"/> Scaled for global needs.
              </h1>
              <div className="space-y-6 text-[#888888] text-lg leading-relaxed">
                <p>
                  Quats was founded by <strong className="text-white">Prangon</strong>, a 9th-grade student with an extraordinary understanding of digital ecosystems. 
                </p>
                <p>
                  Observing how many individuals and small businesses were suffering from a lack of proper digital representation—struggling with complex tools, expensive agencies, and outdated websites—Prangon decided to bridge the gap.
                </p>
                <p>
                  He architected the Quats platform from the ground up: a system designed to effortlessly deliver enterprise-grade websites and high-performance native applications to users who need them most, without the traditional friction.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="mb-32">
          <div className="mb-12">
            <h2 className="text-[32px] font-semibold tracking-tight">Our Services</h2>
            <p className="text-[#888888] mt-2">What we engineer for our clients.</p>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
              hidden: {}
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-[30px]"
          >
            {[
              {
                tag: '01 / Web',
                title: 'Website Architecture',
                desc: 'Custom-engineered websites and scalable web platforms built for optimal performance, speed, and immersive user experiences.'
              },
              {
                tag: '02 / Mobile',
                title: 'App Development',
                desc: 'Native and cross-platform mobile applications that deliver intuitive, high-fidelity interactions across all modern devices.'
              },
              {
                tag: '03 / Design',
                title: 'Interface Engineering',
                desc: 'Precision-crafted UI/UX that seamlessly bridges the gap between complex backend systems and front-end simplicity.'
              }
            ].map((service, i) => (
              <motion.div 
                key={i} 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
                }}
                className="p-[30px] rounded-[8px] border border-white/5 bg-[#111111] relative overflow-hidden group"
              >
                <span className="text-[11px] uppercase tracking-[2px] text-[#888888] mb-3 block">
                  {service.tag}
                </span>
                <h3 className="text-[18px] font-semibold mb-[12px]">{service.title}</h3>
                <p className="text-[14px] text-[#888888] leading-[1.5]">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* User Reviews Section */}
        <section id="reviews" className="mb-32 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="text-[32px] font-semibold tracking-tight mb-12 text-center">User Reviews</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { 
                  name: "Sarah Jenkins", 
                  role: "Startup Founder", 
                  review: "What Prangon has built is truly remarkable. Quats delivered our native application in half the time of standard agencies, with impeccable code quality." 
                },
                { 
                  name: "Michael Chen", 
                  role: "E-commerce Director", 
                  review: "We were struggling with an outdated platform. The new website architecture provided by Quats skyrocketed our sales and improved our latency instantly." 
                },
                { 
                  name: "David O.", 
                  role: "Local Business Owner", 
                  review: "I didn't know how to get online. The platform made it so incredibly easy to get a professional website running. Highly recommended!" 
                }
              ].map((testimonial, i) => (
                <div key={i} className="bg-white/[0.03] border border-white/10 p-8 rounded-2xl flex flex-col justify-between">
                  <div>
                    <Quote className="text-white/20 mb-6" size={32} />
                    <p className="text-[#cccccc] leading-relaxed mb-8">"{testimonial.review}"</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={14} className="fill-white text-white" />
                      ))}
                    </div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-[12px] text-[#888888]">{testimonial.role}</p>
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
