import React from 'react';

export function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`${className} relative group/logo flex-shrink-0`}>
      {/* Background Glow */}
      <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500" />
      
      <div className="relative w-full h-full bg-black rounded-xl border border-white/10 flex items-center justify-center overflow-hidden transition-all duration-500 group-hover/logo:scale-105 shadow-lg group-hover/logo:border-blue-500/50">
        {/* Animated Gradient Shine */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-[100%] group-hover/logo:translate-x-[100%] transition-transform duration-1000 z-10 pointer-events-none" />
        
        {/* SVG Q logo */}
        <svg viewBox="0 0 100 100" className="w-[60%] h-[60%] relative z-0" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 8 C73.196 8 92 26.804 92 50 C92 73.196 73.196 92 50 92 C26.804 92 8 73.196 8 50 C8 26.804 26.804 8 50 8 Z" stroke="url(#paint0_linear)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M60 60 L80 80" stroke="white" strokeWidth="14" strokeLinecap="round"/>
          <circle cx="50" cy="50" r="12" fill="url(#paint0_linear)"/>
          <defs>
            <linearGradient id="paint0_linear" x1="8" y1="8" x2="92" y2="92" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3B82F6" />
              <stop offset="1" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
