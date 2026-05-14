import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export default function BackgroundDots() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-[0] overflow-hidden pointer-events-none bg-transparent">
      {/* Background blobs / balls */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        style={{
          translateX: mousePosition.x * -0.5,
          translateY: mousePosition.y * -0.5,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-400/05 rounded-full blur-[120px]"
      />
      
      <motion.div
        animate={{
          x: [0, -120, 0],
          y: [0, 100, 0],
        }}
        style={{
          translateX: mousePosition.x * 0.8,
          translateY: mousePosition.y * 0.8,
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/05 rounded-full blur-[150px]"
      />

      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, -50, 0],
        }}
        style={{
          translateX: mousePosition.x * 0.3,
          translateY: mousePosition.y * 0.3,
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-blue-300/10 rounded-full blur-[100px]"
      />

      {/* Subtle Dot Pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `radial-gradient(#000 1px, transparent 0)`,
          backgroundSize: '40px 40px',
          transform: `translate(${mousePosition.x * 0.15}px, ${mousePosition.y * 0.15}px)`
        }}
      />
    </div>
  );
}
