import React from 'react';

export function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`${className} relative group/logo flex-shrink-0`}>
      {/* Background Glow */}
      <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500" />
      
      <div className="relative w-full h-full bg-black rounded-xl border border-white/10 flex items-center justify-center overflow-hidden transition-all duration-500 group-hover/logo:scale-105 shadow-lg group-hover/logo:border-blue-500/50">
        {/* Animated Gradient Shine */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-[100%] group-hover/logo:translate-x-[100%] transition-transform duration-1000 z-10 pointer-events-none" />
        
        <img 
          src="https://i.ibb.co.com/7tPVv5mb/Dmitri-dmiiiitri-on-X-1.jpg" 
          alt="Quats Logo" 
          className="w-full h-full object-cover relative z-0 opacity-90 group-hover/logo:opacity-100 transition-opacity"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
}
