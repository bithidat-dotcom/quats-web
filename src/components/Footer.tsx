import React from 'react';
import { Instagram, MapPin, Mail, Phone, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/80 backdrop-blur-md pt-20 pb-8 mt-10 relative z-10 w-full">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="flex flex-col">
            <Link to="/" className="text-[24px] font-bold tracking-[-1px] lowercase text-white mb-6">
              quats.
            </Link>
            <p className="text-[#888888] text-sm leading-relaxed mb-6 max-w-xs">
              Architecting high-performance web platforms and native mobile applications to provide the robust foundation required for your digital expansion.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-green-400 font-mono uppercase tracking-wider bg-green-400/10 w-fit px-3 py-1.5 rounded-full border border-green-400/20">
              <Activity size={14} className="animate-pulse" /> All Systems Operational
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="text-white font-semibold mb-6">Engineering</h4>
            <ul className="space-y-4 text-sm text-[#888888]">
              <li><Link to="/services" className="hover:text-white transition-colors">Web Applications</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Native Mobile Apps</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">System Architecture</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">UI/UX Prototyping</Link></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-[#888888]">
              <li><Link to="/services" className="hover:text-white transition-colors">Our Approach</Link></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact Support</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><Link to="/get-started" className="hover:text-white transition-colors">Client Portal</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-white font-semibold mb-6">Direct Connect</h4>
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
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#555555] gap-4">
          <div>&copy; 2026 Quats Intelligence Systems. Built by Prangon. All rights reserved.</div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 font-mono">
            <a href="https://www.instagram.com/prangon_45" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-[#E1306C] transition-colors uppercase tracking-wider font-sans font-semibold">
              <Instagram size={14} /> @prangon_45
            </a>
            <div className="hidden sm:block w-[1px] h-3 bg-white/10" />
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span>Latency: 12ms</span>
            </div>
            <div className="hidden sm:block w-[1px] h-3 bg-white/10" />
            <span>Server: US-EAST-1</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
