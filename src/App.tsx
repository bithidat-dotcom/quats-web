import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ReactLenis } from 'lenis/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Logo } from './components/Logo';
import Home from './pages/Home';
import Services from './pages/Services';
import GetStarted from './pages/GetStarted';
import Pricing from './pages/Pricing';

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function SplashAnimation({ onComplete }: { onComplete: () => void; key?: string }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000); // Increased slightly to show logo
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center font-sans tracking-tight"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      <div className="flex flex-col items-center gap-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Logo className="w-32 h-32" />
        </motion.div>

        <div className="flex gap-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.8)]"
              animate={{
                y: ["0%", "-150%", "0%"]
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.15
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function GlobalBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-black">
      {/* Space Background Image */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0" 
          alt="Space Background" 
          className="w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black" />
      </div>

      {/* Shooting Stars Animation Layer */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: "-10%", y: "-10%", opacity: 0 }}
            animate={{ 
              x: "110%", 
              y: "110%", 
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 15,
              ease: "linear"
            }}
            className="absolute w-[2px] h-[100px] bg-gradient-to-b from-white to-transparent rotate-45"
            style={{
              left: `${Math.random() * 120 - 10}%`,
              top: `-${Math.random() * 30}%`
            }}
          />
        ))}
      </div>

      <motion.div
        animate={{
          x: [0, 200, -100, 0],
          y: [0, -200, 100, 0],
          scale: [1, 1.4, 0.8, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] left-[15%] w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{
          x: [0, -250, 150, 0],
          y: [0, 200, -150, 0],
          scale: [1, 0.7, 1.3, 1]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[150px]"
      />
      <motion.div
        animate={{
          x: [0, 100, -250, 0],
          y: [0, 250, 100, 0],
          scale: [1, 1.5, 0.8, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-[40%] w-[600px] h-[600px] bg-blue-400/5 rounded-full blur-[150px]"
      />
    </div>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <ReactLenis root>
      <BrowserRouter>
        <ScrollToTop />
        
        <AnimatePresence>
          {showSplash && <SplashAnimation key="splash-screen" onComplete={() => setShowSplash(false)} />}
        </AnimatePresence>

        <div className={`min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black relative flex flex-col transition-opacity duration-1000 ${showSplash ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'}`}>
          <GlobalBackground />
          
          {/* Decor line matched from theme */}
          <div className="fixed top-0 right-1/4 h-full w-[1px] bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none z-0" />
          
          <div className="relative z-10 flex flex-col flex-1">
            <Navbar />
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/get-started" element={<GetStarted />} />
                <Route path="/pricing" element={<Pricing />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </ReactLenis>
  );
}

