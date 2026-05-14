import React, { useState } from 'react';
import { Instagram, MapPin, Mail, Phone, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

interface FooterSectionProps {
  title: string;
  children: React.ReactNode;
}

function FooterSection({ title, children }: FooterSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between text-black font-semibold mb-2 group w-full md:cursor-default"
      >
        <span className="uppercase tracking-[2px] text-[12px]">{title}</span>
        <ChevronDown 
          size={16} 
          className={`transition-transform duration-300 md:hidden ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      
      {/* List - Always show on md+ screens, hidden on mobile unless toggled */}
      <div className="hidden md:block mt-4">
        {children}
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden md:hidden"
          >
            <div className="py-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-black/5 bg-white pt-20 pb-8 mt-10 relative z-10 w-full">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="flex flex-col">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-10 h-10 bg-black flex items-center justify-center font-black text-white text-xl rounded-lg group-hover:scale-110 transition-transform">Q</div>
              <span className="font-game text-[12px] tracking-tighter text-black uppercase">QUATS</span>
            </Link>
            <p className="text-black font-black text-xs leading-relaxed mb-6 max-w-xs uppercase tracking-tight">
              Architecting high-performance web platforms and native mobile applications to provide the robust foundation required for your digital expansion.
            </p>
          </div>

          {/* Links Column 1 */}
          <FooterSection title="Engineering">
            <ul className="space-y-4 text-sm text-black font-bold">
              <li><Link to="/services" className="hover:text-blue-600 transition-colors uppercase tracking-tight">Web Applications</Link></li>
              <li><Link to="/services" className="hover:text-blue-600 transition-colors uppercase tracking-tight">Native Mobile Apps</Link></li>
              <li><Link to="/services" className="hover:text-blue-600 transition-colors uppercase tracking-tight">System Architecture</Link></li>
              <li><Link to="/services" className="hover:text-blue-600 transition-colors uppercase tracking-tight">UI/UX Prototyping</Link></li>
            </ul>
          </FooterSection>

          {/* Links Column 2 */}
          <FooterSection title="Company">
            <ul className="space-y-4 text-sm text-black font-bold">
              <li><Link to="/services" className="hover:text-blue-600 transition-colors uppercase tracking-tight">Our Approach</Link></li>
              <li><a href="#contact" className="hover:text-blue-600 transition-colors uppercase tracking-tight">Contact Support</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors uppercase tracking-tight">Careers</a></li>
              <li><Link to="/get-started" className="hover:text-blue-600 transition-colors uppercase tracking-tight">Client Portal</Link></li>
            </ul>
          </FooterSection>

          {/* Contact Column */}
          <FooterSection title="Direct Connect">
            <ul className="space-y-4 text-sm text-black font-bold">
              <li>
                <a href="mailto:contact@quats.com" className="flex items-center gap-3 hover:text-blue-600 transition-colors">
                  <Mail size={16} className="text-blue-600" /> contact@quats.com
                </a>
              </li>
              <li>
                <a href="https://wa.me/8801716807465" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-blue-600 transition-colors">
                  <Phone size={16} className="text-[#25D366]" /> +880 1716-807465
                </a>
              </li>
              <li>
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-black" /> Global / Remote
                </div>
              </li>
            </ul>
          </FooterSection>
        </div>

        {/* Bottom Status Bar with Animations */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-t border-black/5 pt-12 flex flex-col items-center justify-center text-center gap-8"
        >
          <div className="flex flex-col items-center gap-4 group/footer">
            <div className="text-[10px] uppercase tracking-[4px] text-zinc-400 font-game group-hover/footer:text-blue-600 transition-colors">
              [ QUATS_INTELLIGENCE_CORE ]
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between w-full text-[10px] text-black font-game uppercase tracking-widest gap-6 font-bold">
            <div className="opacity-80 hover:opacity-100 transition-opacity">
              &copy; 2026 Quats Intelligence Systems. Built by Prangon. All rights reserved.
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 overflow-hidden">
              <a href="https://www.instagram.com/prangon_45" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-[#E1306C] transition-colors group">
                <Instagram size={14} className="group-hover:rotate-12 transition-transform" /> @prangon_45
              </a>
              <div className="hidden sm:block w-[1px] h-3 bg-black/10" />
              <div className="flex items-center space-x-2 bg-black/5 px-3 py-1 rounded-full border border-black/5">
                <div className="w-1.5 h-1.5 rounded-none bg-blue-600 animate-[pulse_1.5s_infinite]" />
                <span className="text-[8px]">System Status: Optimal</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
