import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import SoundButton from './SoundButton';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: '𝙃𝙤𝙢𝙚', href: '/' },
    { name: '𝙊𝙪𝙧 𝙎𝙩𝙤𝙧𝙮 & 𝙎𝙚𝙧𝙫𝙞𝙘𝙚𝙨', href: '/services' },
    { name: '𝙋𝙧𝙞𝙘𝙞𝙣𝙜', href: '/pricing' },
    { name: '𝘾𝙤𝙙𝙚 𝙎𝙩𝙤𝙧𝙚', href: '/code-store' },
    { name: '𝙅𝙤𝙗', href: '/job' },
  ];

  const playHoverSound = () => {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3');
    audio.volume = 0.2;
    audio.play().catch(() => {}); // Catch prevents issues if browser blocks autoplay
  };

  return (
    <>
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[95%] sm:w-[96%] max-w-[1600px] mt-[-6px] sm:mt-0">
        <nav className="relative overflow-hidden group rounded-2xl">
          <div className="absolute inset-0 bg-white/5 backdrop-blur-md border border-white/10 sm:border-white/20 overflow-hidden" />
          
          <div className="relative px-4 sm:px-8 py-3 flex items-center justify-between">
            <Link 
              to="/" 
              onMouseEnter={playHoverSound}
              className="flex items-center gap-2 group/logo shrink-0"
            >
              <span className="font-black text-xl tracking-widest group-hover/logo:opacity-80 transition-colors uppercase mt-0 text-white">Quats</span>
            </Link>
            
            <div className="hidden lg:flex items-center space-x-8 shrink-0">
              {navLinks.map((link, index) => {
                const isActive = location.pathname === link.href;
                
                return (
                  <Link 
                    key={link.name} 
                    to={link.href} 
                    onMouseEnter={playHoverSound}
                    className="relative group/link py-2"
                  >
                    <span 
                      className={`text-sm tracking-[0.1em] transition-all drop-shadow-md ${isActive ? 'font-bold' : 'opacity-70 hover:opacity-100'} text-white`}
                    >
                      {link.name}
                    </span>
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-3 sm:gap-6">
              <SoundButton 
                to="/get-started" 
                variant="secondary" 
                className="hidden lg:flex px-6 py-2.5 !rounded-xl shadow-lg shadow-blue-500/10 group/btn overflow-hidden border border-white/20 bg-white/5 hover:bg-white/10 text-white"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                <span className="relative z-10 text-xs font-black uppercase tracking-widest text-white">Get Started</span>
              </SoundButton>

              <button 
                className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors border border-transparent hover:border-white/20 text-white" 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }} 
            className="fixed inset-0 z-40 backdrop-blur-3xl flex items-center justify-center pt-24 px-6 md:hidden bg-black/80"
          >
            <div className="flex flex-col space-y-8 text-center items-center">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <Link 
                    key={link.name} 
                    to={link.href} 
                    onClick={() => setIsMobileMenuOpen(false)} 
                    onMouseEnter={playHoverSound}
                    className={`text-4xl transition-colors ${isActive ? 'text-white' : 'text-white/70 hover:text-white'} font-bold`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
