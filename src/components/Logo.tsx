import React from 'react';

export function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`${className} relative group/logo`}>
      {/* Background Glow */}
      <div className="absolute inset-0 bg-blue-500/10 blur-xl rounded-full opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500" />
      
      <div className="relative w-full h-full bg-black rounded-[1.5rem] flex items-center justify-center overflow-hidden transition-all duration-500 group-hover/logo:scale-105 shadow-2xl border border-white/10 group-hover/logo:border-blue-500/50">
        {/* Animated Gradient Shine */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-[100%] group-hover/logo:translate-x-[100%] transition-transform duration-1000 z-10" />
        
        <img 
          src="https://res-console.cloudinary.com/df7jfonrv/thumbnails/transform/v1/image/upload/Y19maWxsLGhfMjAwLHdfMjAw/v1/RG1pdHJpX2RtaWlpaXRyaV9vbl9YXzFfbDJyNGIy/template_primary" 
          alt="Quats Logo" 
          className="w-full h-full object-contain relative z-0 opacity-90 group-hover/logo:opacity-100 transition-opacity p-2"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
}
