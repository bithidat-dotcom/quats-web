import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { ReactLenis } from 'lenis/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import GetStarted from './pages/GetStarted';

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
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
    </div>
  );
}

export default function App() {
  return (
    <ReactLenis root>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black relative">
          <BackgroundAnimatedBlobs />
          
          {/* Decor line matched from theme */}
          <div className="fixed top-0 right-1/4 h-full w-[1px] bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none z-0" />
          
          <div className="relative z-10">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/get-started" element={<GetStarted />} />
            </Routes>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </ReactLenis>
  );
}
