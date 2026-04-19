import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ReactLenis } from 'lenis/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import GetStarted from './pages/GetStarted';
import AiGenerator from './pages/AiGenerator';

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function SplashAnimation({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500); // Display for 2.5 seconds
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center font-sans tracking-tight"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      <div className="flex flex-col items-center gap-8">
        <div className="flex gap-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.8)]"
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
        <motion.div
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl md:text-6xl font-semibold lowercase text-white tracking-tighter"
        >
          quats
        </motion.div>
      </div>
    </motion.div>
  );
}

function BackgroundAnimatedBlobs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        animate={{
          x: [0, 200, -100, 0],
          y: [0, -200, 100, 0],
          scale: [1, 1.4, 0.8, 1]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] left-[15%] w-[400px] h-[400px] bg-green-500/20 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{
          x: [0, -250, 150, 0],
          y: [0, 200, -150, 0],
          scale: [1, 0.7, 1.3, 1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[150px]"
      />
      <motion.div
        animate={{
          x: [0, 100, -250, 0],
          y: [0, 250, 100, 0],
          scale: [1, 1.5, 0.8, 1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-[40%] w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[150px]"
      />
      <motion.div
        animate={{
          x: [0, -150, 200, 0],
          y: [0, -100, 250, 0],
          scale: [1, 1.2, 0.9, 1]
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[30%] left-[60%] w-[450px] h-[450px] bg-blue-500/20 rounded-full blur-[150px]"
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
          <BackgroundAnimatedBlobs />
          
          {/* Decor line matched from theme */}
          <div className="fixed top-0 right-1/4 h-full w-[1px] bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none z-0" />
          
          <div className="relative z-10 flex flex-col flex-1">
            <Navbar />
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/get-started" element={<GetStarted />} />
                <Route path="/ai-generator" element={<AiGenerator />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </ReactLenis>
  );
}

