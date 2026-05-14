import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ReactLenis } from 'lenis/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import GetStarted from './pages/GetStarted';
import Pricing from './pages/Pricing';
import CodeStore from './pages/CodeStore';
import AIAssistant from './components/AIAssistant';
import ScrollToTopButton from './components/ScrollToTopButton';
import Job from './pages/Job';
import BackgroundDots from './components/BackgroundDots';

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  useEffect(() => {
    try {
      (window as any).adsbygoogle?.push({});
    } catch (e: any) {
      if (e?.message && e.message.includes("already have ads in them")) {
        console.log("AdSense: Ad already initialized.");
      } else {
        console.error("AdSense error:", e);
      }
    }
  }, []);

  return (
    <ReactLenis root>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-transparent text-black font-sans selection:bg-blue-500 selection:text-white relative flex flex-col">
          <BackgroundDots />
          <Navbar />
          <div className="ads-container">
            <ins className="adsbygoogle"
                 style={{display: 'block'}}
                 data-ad-client="ca-pub-6889176306076912"
                 data-ad-slot="REPLACE_WITH_YOUR_SLOT_ID"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
          </div>
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/get-started" element={<GetStarted />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/code-store" element={<CodeStore />} />
              <Route path="/job" element={<Job />} />
            </Routes>
          </div>
          <Footer />
          <AIAssistant />
          <ScrollToTopButton />
        </div>
      </BrowserRouter>
    </ReactLenis>
  );
}

