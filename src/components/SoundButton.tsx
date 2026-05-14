import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

interface SoundButtonProps {
  children: React.ReactNode;
  to?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'glass' | 'glow';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export default function SoundButton({ 
  children, 
  to, 
  onClick, 
  className = '', 
  variant = 'primary',
  disabled = false,
  type = 'button'
}: SoundButtonProps) {
  const playHoverSound = () => {
    if (disabled) return;
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3');
    audio.volume = 0.15;
    audio.play().catch(() => {});
  };

  const playClickSound = () => {
    if (disabled) return;
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
    audio.volume = 0.3;
    audio.play().catch(() => {});
  };

  const baseStyles = "px-6 py-3 rounded-full font-bold uppercase tracking-wider text-[10px] sm:text-xs transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden";
  
  const variants = {
    primary: "bg-white text-black hover:bg-neutral-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-black/5",
    secondary: "bg-blue-600 text-white hover:bg-blue-500 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-blue-500/20",
    glass: "glass text-white hover:bg-white/10 hover:scale-105 active:scale-95 border border-white/10 disabled:opacity-30 disabled:cursor-not-allowed",
    glow: "bg-blue-600 text-white hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl",
    'glass-light': "bg-white/40 backdrop-blur-md text-black border border-black/5 hover:bg-white/60 hover:scale-105 active:scale-95 shadow-lg shadow-black/5"
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`;

  if (to && !disabled) {
    return (
      <Link 
        to={to} 
        className={combinedClassName}
        onMouseEnter={playHoverSound}
        onClick={playClickSound}
      >
        {children}
      </Link>
    );
  }

  return (
    <motion.button
      type={type}
      disabled={disabled}
      className={combinedClassName}
      onMouseEnter={playHoverSound}
      onClick={() => {
        playClickSound();
        onClick?.();
      }}
      whileHover={disabled ? {} : { y: -2 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
}
