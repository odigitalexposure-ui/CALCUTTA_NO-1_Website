import { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { ScrollTrigger, pageTransitionVariants } from './motion/motionConfig';
import Navbar from './pages/Navbar';
import Home from './pages/Home';
import Footer from './pages/Footer';

const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Contact = lazy(() => import('./pages/Contact'));
const MicCursor = lazy(() => import('./components/MicCursor'));

function ScrollAndTriggerSync() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    let rafId = 0;
    const timer = window.setTimeout(() => {
      rafId = window.requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, 180);

    return () => {
      window.clearTimeout(timer);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [pathname]);

  return null;
}

function PageFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-[#050507]">
      <div className="flex items-end gap-1.5">
        <span className="eq-bar h-5 w-1 bg-[#ecc56d]" style={{ animationDelay: '0ms' }} />
        <span className="eq-bar h-8 w-1 bg-[#fff6d6]" style={{ animationDelay: '180ms' }} />
        <span className="eq-bar h-6 w-1 bg-[#ecc56d]" style={{ animationDelay: '320ms' }} />
      </div>
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <Suspense fallback={<PageFallback />}>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          variants={pageTransitionVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </Suspense>
  );
}

function App() {
  const [enableDesktopCursor] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(pointer: fine) and (hover: hover)').matches;
  });

  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        {enableDesktopCursor && (
          <Suspense fallback={null}>
            <MicCursor />
          </Suspense>
        )}
        <ScrollAndTriggerSync />
        <div className="film-grain relative flex min-h-screen flex-col overflow-x-hidden bg-[#050507] text-[#f5f3ee] antialiased selection:bg-[#ecc56d] selection:text-[#050507]">
          <Navbar />
          <main className="flex-1 pt-20 sm:pt-22">
            <AnimatedRoutes />
          </main>
          <Footer />

          {/* Floating WhatsApp Quick Action */}
          <motion.a
            href="https://wa.me/918910905150?text=Hello%20Calcutta%20No-1%2C%20I%20would%20like%20to%20enquire%20about%20an%20event%20booking."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, type: 'spring', stiffness: 280, damping: 20 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className="fixed right-4 bottom-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-[#04140d] shadow-xl shadow-emerald-500/30 ring-2 ring-emerald-300/40 transition-colors hover:bg-emerald-400 sm:right-6 sm:bottom-6 sm:h-14 sm:w-14"
          >
            <svg className="h-6 w-6 fill-current sm:h-7 sm:w-7" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12.031 2c-5.516 0-9.969 4.453-9.969 9.969 0 1.766.469 3.484 1.344 5l-1.406 5.156 5.281-1.375c1.469.797 3.109 1.219 4.75 1.219 5.516 0 9.969-4.453 9.969-9.969S17.547 2 12.031 2zm5.813 14.125c-.25.703-1.438 1.344-2 1.422-.516.078-1.172.109-1.891-.125-.438-.141-.984-.328-1.703-.641-2.984-1.281-4.938-4.297-5.078-4.484-.141-.203-1.219-1.625-1.219-3.094 0-1.469.766-2.188 1.031-2.484.266-.297.578-.375.781-.375.203 0 .391.016.563.016.172 0 .406-.063.641.484.234.563.797 1.953.875 2.094.078.141.125.313.031.5-.094.203-.156.313-.297.484-.156.172-.313.391-.453.516-.156.141-.313.297-.141.594.172.297.781 1.281 1.672 2.078 1.156 1.031 2.125 1.344 2.422 1.5.297.141.469.125.641-.078.172-.203.75-.875.953-1.172.203-.297.406-.25.672-.156.266.094 1.719.813 2.016.953.297.156.484.219.563.344.078.125.078.734-.172 1.438z" />
            </svg>
          </motion.a>
        </div>
      </BrowserRouter>
    </MotionConfig>
  );
}

export default App;
