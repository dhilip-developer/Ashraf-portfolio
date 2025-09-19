import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import NavBar from './components/NavBar';
import Home from './components/sections/Home';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import ParticleBackground from './components/effects/ParticleBackground';
import MatrixRain from './components/effects/MatrixRain';
import { scrollToTop } from './utils/helpers';

// Import the new loading screen component
import CompleteLoadingScreen from './components/CompleteLoadingScreen';

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  // The onComplete function will be passed to the loading screen
  const handleLoadingComplete = () => {
    setLoading(false);
  };

  useEffect(() => {
    scrollToTop();
  }, [location.pathname]);

  if (loading) {
    return (
      // Use the new loading screen component here
      <CompleteLoadingScreen onComplete={handleLoadingComplete} />
    );
  }

  return (
    <div className="relative min-h-screen">
      <MatrixRain />
      <ParticleBackground />
      <NavBar />
      
      <main className="container mx-auto px-4 overflow-x-hidden">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={
              <>
                <section id="home"><Home /></section>
                <section id="about"><About /></section>
                <section id="skills"><Skills /></section>
                {/* <section id="experience"><Experience /></section> */}
                <section id="projects"><Projects /></section>
                <section id="contact"><Contact /></section>
              </>
            } />
          </Routes>
        </AnimatePresence>
      </main>

      <footer className="py-6 mt-12 border-t border-gray-800">
        <div className="container mx-auto px-4 text-center text-gray-500 font-mono text-sm">
          <p className="mb-2">© {new Date().getFullYear()} | Code. Create. Conquer.</p>
          <p>Built with React, Three.js and Framer Motion</p>
        </div>
      </footer>
    </div>
  );
}

export default App;