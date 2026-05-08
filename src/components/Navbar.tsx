import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Our Story & Services', href: '/services' },
    { name: 'Pricing', href: '/pricing' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10 h-[80px] flex items-center' : 'bg-transparent h-[80px] border-b border-white/10 flex items-center'}`}>
        <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 relative z-10 group">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/10 transition-transform group-hover:scale-110 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
               <img src="https://i.ibb.co.com/d0LcTMfR/Dmitri-dmiiiitri-on-X.jpg" alt="Dolfin Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-[22px] font-bold tracking-[-1px] lowercase text-white">
              quats.
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-[32px] relative z-10">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.href} 
                className={`text-[14px] font-medium transition-colors ${location.pathname === link.href ? 'text-white' : 'text-[#888888] hover:text-white'}`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/get-started" className="bg-white/10 border border-white/20 backdrop-blur-md text-white px-[20px] py-[10px] rounded text-[13px] font-semibold hover:bg-white hover:text-black transition-all flex items-center gap-2 ml-[12px] shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              Get Started
            </Link>
          </div>

          <button className="md:hidden text-white relative z-10" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed inset-0 z-40 bg-black/90 backdrop-blur-2xl pt-24 px-6 md:hidden">
            <div className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <Link key={link.name} to={link.href} onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-sans font-medium tracking-tight border-b border-white/10 pb-4 text-white">
                  {link.name}
                </Link>
              ))}
              <Link to="/get-started" onClick={() => setIsMobileMenuOpen(false)} className="bg-white/10 border border-white/20 backdrop-blur-md text-white px-6 py-4 rounded-full text-lg font-medium hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 mt-4 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                Get Started <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
