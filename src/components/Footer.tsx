import React from 'react';
import { Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="h-[80px] px-6 max-w-7xl mx-auto border-t border-white/10 flex items-center justify-between text-[12px] text-[#444444] mt-10 relative z-10 w-full mb-8">
      <div>&copy; {new Date().getFullYear()} Quats Intelligence Systems. Built by Prangon. All rights reserved.</div>
      
      <div className="flex items-center gap-6">
        <a href="https://www.instagram.com/prangon_45?utm_source=qr&igsh=MTZhcXVkODV0Y3lpdg==" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
          <Instagram size={16} /> @prangon_45
        </a>
        <div className="hidden sm:block">Latency: 12ms &nbsp; | &nbsp; Server: US-EAST-1</div>
      </div>
    </footer>
  );
}
