import React, { useState } from 'react';
import { Instagram, MapPin, Mail, Phone, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';

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
        className="flex items-center justify-between text-white font-semibold mb-2 group w-full md:cursor-default"
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
    <footer className="border-t border-white/10 bg-black/80 backdrop-blur-md pt-20 pb-8 mt-10 relative z-10 w-full">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="flex flex-col">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <Logo />
              <span className="text-[22px] font-bold tracking-[-1px] uppercase text-white">
                quats.
              </span>
            </Link>
            <p className="text-[#888888] text-sm leading-relaxed mb-6 max-w-xs">
              Architecting high-performance web platforms and native mobile applications to provide the robust foundation required for your digital expansion.
            </p>
          </div>

          {/* Links Column 1 */}
          <FooterSection title="Engineering">
            <ul className="space-y-4 text-sm text-[#888888]">
              <li><Link to="/services" className="hover:text-white transition-colors">Web Applications</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Native Mobile Apps</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">System Architecture</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">UI/UX Prototyping</Link></li>
            </ul>
          </FooterSection>

          {/* Links Column 2 */}
          <FooterSection title="Company">
            <ul className="space-y-4 text-sm text-[#888888]">
              <li><Link to="/services" className="hover:text-white transition-colors">Our Approach</Link></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact Support</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><Link to="/get-started" className="hover:text-white transition-colors">Client Portal</Link></li>
            </ul>
          </FooterSection>

          {/* Contact Column */}
          <FooterSection title="Direct Connect">
            <ul className="space-y-4 text-sm text-[#888888]">
              <li>
                <a href="mailto:contact@quats.com" className="flex items-center gap-3 hover:text-white transition-colors">
                  <Mail size={16} className="text-blue-400" /> contact@quats.com
                </a>
              </li>
              <li>
                <a href="https://wa.me/8801716807465" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-white transition-colors">
                  <Phone size={16} className="text-[#25D366]" /> +880 1716-807465
                </a>
              </li>
              <li>
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-white/60" /> Global / Remote
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
          className="border-t border-white/10 pt-12 flex flex-col items-center justify-center text-center gap-8"
        >
          <div className="flex flex-col items-center gap-4 group/footer">
            <Logo className="w-12 h-12 grayscale group-hover/footer:grayscale-0 transition-all duration-500" />
            <div className="text-[10px] uppercase tracking-[4px] text-zinc-500 font-game group-hover/footer:text-blue-400 transition-colors">
              [ QUATS_INTELLIGENCE_CORE ]
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between w-full text-[10px] text-[#555555] font-game uppercase tracking-widest gap-6">
            <div className="opacity-60 hover:opacity-100 transition-opacity">
              &copy; 2026 Quats Intelligence Systems. Built by Prangon. All rights reserved.
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 overflow-hidden">
              <a href="https://www.instagram.com/prangon_45" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-[#E1306C] transition-colors group">
                <Instagram size={14} className="group-hover:rotate-12 transition-transform" /> @prangon_45
              </a>
              <div className="hidden sm:block w-[1px] h-3 bg-white/10" />
              <div className="flex items-center space-x-2 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-[pulse_1.5s_infinite]" />
                <span className="text-[8px]">System Status: Optimal</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
