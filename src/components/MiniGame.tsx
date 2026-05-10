import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function MiniGame() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('quats_highscore');
    return saved ? parseInt(saved, 10) : 0;
  });
  
  const [isJumping, setIsJumping] = useState(false);
  const [obstacles, setObstacles] = useState<number[]>([]);
  const gameRef = useRef<HTMLDivElement>(null);
  
  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    setObstacles([]);
  };

  const jump = () => {
    if (!isJumping && isPlaying) {
      setIsJumping(true);
      setTimeout(() => setIsJumping(false), 500);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        if (!isPlaying) startGame();
        else jump();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, isJumping]);

  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const interval = setInterval(() => {
      setObstacles(prev => {
        const next = prev.map(o => o - 5).filter(o => o > -50);
        if (Math.random() < 0.02) {
          next.push(100);
        }
        return next;
      });
      setScore(s => s + 1);
    }, 20);

    return () => clearInterval(interval);
  }, [isPlaying, gameOver]);

  // Collision detection
  useEffect(() => {
    if (isJumping) return;
    
    const collision = obstacles.some(o => o > 10 && o < 40);
    if (collision) {
      setGameOver(true);
      setIsPlaying(false);
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem('quats_highscore', score.toString());
      }
    }
  }, [obstacles, isJumping]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div 
        ref={gameRef}
        onClick={!isPlaying ? startGame : jump}
        className="relative h-64 bg-zinc-950 border-4 border-white/10 rounded-xl overflow-hidden cursor-pointer shadow-[0_0_50px_rgba(0,0,0,0.5)] group"
      >
        {/* Sky / Grid Background */}
        <div className="absolute inset-0 opacity-20" 
             style={{ 
               backgroundImage: 'linear-gradient(#ffffff11 1px, transparent 1px), linear-gradient(90deg, #ffffff11 1px, transparent 1px)',
               backgroundSize: '20px 20px' 
             }} 
        />
        
        {/* Score Board */}
        <div className="absolute top-4 right-4 text-white font-game text-[10px] space-y-1 z-20">
          <div>HI: {highScore.toString().padStart(5, '0')}</div>
          <div className="text-blue-400">SC: {score.toString().padStart(5, '0')}</div>
        </div>

        {/* The Floor */}
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-zinc-900 border-t-2 border-white/20" />

        {/* Character */}
        <motion.div
          animate={{ 
            y: isJumping ? -80 : 0,
            rotate: isJumping ? [0, 90, 180, 270, 360] : 0
          }}
          transition={{ 
            duration: isJumping ? 0.5 : 0.2, 
            ease: isJumping ? "easeOut" : "easeIn" 
          }}
          className="absolute bottom-4 left-10 w-8 h-8 bg-blue-500 border-2 border-white flex items-center justify-center font-game text-[8px] overflow-hidden"
        >
          <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-white" />
          <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-white" />
          <div className="absolute bottom-1 left-2 right-2 h-1 bg-black/40" />
        </motion.div>

        {/* Obstacles */}
        {obstacles.map((pos, i) => (
          <div 
            key={i}
            className="absolute bottom-4 h-6 w-6 bg-red-500 border-2 border-white"
            style={{ left: `${pos}%` }}
          >
            <div className="absolute inset-1 border border-white/50 animate-pulse" />
          </div>
        ))}

        {/* UI Overlays */}
        <AnimatePresence>
          {!isPlaying && !gameOver && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-30"
            >
              <h3 className="text-white font-game text-xl mb-4 animate-bounce">INSERT COIN</h3>
              <p className="text-zinc-400 font-game text-[8px] uppercase tracking-widest">[ SPACE ] OR CLICK TO START</p>
            </motion.div>
          )}

          {gameOver && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-40"
            >
              <h3 className="text-red-500 font-game text-2xl mb-2 italic">WASTED</h3>
              <p className="text-white font-game text-[10px] mb-6">FINAL SCORE: {score}</p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button 
                  onClick={(e) => { e.stopPropagation(); startGame(); }}
                  className="px-6 py-2 bg-blue-600 border-b-4 border-blue-800 text-white font-game text-[10px] hover:bg-blue-500 active:border-b-0 active:translate-y-1 transition-all"
                >
                  RETRY MISSION
                </button>
              </div>
              
              <div className="text-zinc-500 font-game text-[8px] animate-pulse">
                &gt; SYSTEM_REBOOTING...
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}

function ArrowRight({ size, className }: { size: number, className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="square" 
      strokeLinejoin="miter" 
      className={className}
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}
