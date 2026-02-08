import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaArrowUp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * BackToTop Component (Creative & Animated)
 * Features:
 * - Smart Scroll Detection (Window + Admin Container)
 * - Premium Glassmorphism Design
 * - Circular Progress Indicator
 */
const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  useEffect(() => {
    const handleScroll = () => {
      const adminContainer = document.getElementById('admin-scroll-container');

      let scrollTop, scrollHeight, clientHeight;

      if (location.pathname.includes('/admin') && adminContainer) {
        scrollTop = adminContainer.scrollTop;
        scrollHeight = adminContainer.scrollHeight;
        clientHeight = adminContainer.clientHeight;
      } else {
        // More robust scroll detection for window
        scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        scrollHeight = Math.max(
          document.body.scrollHeight, document.documentElement.scrollHeight,
          document.body.offsetHeight, document.documentElement.offsetHeight,
          document.body.clientHeight, document.documentElement.clientHeight
        );
        clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      }

      const totalHeight = scrollHeight - clientHeight;
      const progress = totalHeight > 0 ? (scrollTop / totalHeight) * 100 : 0;

      setScrollProgress(progress);
      setIsVisible(scrollTop > 200); // Increased threshold slightly for better UX
    };

    // Listen on both window and admin container if it exists
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Check if we are in admin and attach to that container specifically
    const adminContainer = document.getElementById('admin-scroll-container');
    if (adminContainer) {
      adminContainer.addEventListener('scroll', handleScroll, { passive: true });
    }

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (adminContainer) {
        adminContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [location.pathname]);

  const scrollToTop = () => {
    // Scroll both just in case
    const adminContainer = document.getElementById('admin-scroll-container');
    if (adminContainer) {
      adminContainer.scrollTo({ top: 0, behavior: 'smooth' });
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    // Fallback for older browsers
    if (typeof window.scrollTo !== 'function') {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  };

  // SVG Circle properties
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  const bottomPos = isAdmin ? 'bottom-8' : 'bottom-32';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`fixed right-6 ${bottomPos} z-[99999]`}
          initial={{ opacity: 0, y: 50, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.5 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <button
            onClick={scrollToTop}
            className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-black/60 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] transition-all duration-500 overflow-hidden"
            title="Back to top"
          >
            {/* Animated Gradient Background on Hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Progress Circle */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-1">
              <circle
                cx="50%"
                cy="50%"
                r={radius}
                stroke="currentColor"
                strokeWidth="2"
                fill="transparent"
                className="text-white/10"
              />
              <circle
                cx="50%"
                cy="50%"
                r={radius}
                stroke="currentColor"
                strokeWidth="2"
                fill="transparent"
                strokeDasharray={circumference}
                style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.1s linear' }}
                className="text-blue-500 group-hover:text-white"
              />
            </svg>

            {/* Icon & Progress Text */}
            <div className="relative z-10 flex flex-col items-center justify-center">
              <FaArrowUp className="text-sm text-white group-hover:-translate-y-1 transition-transform duration-300" />
              <span className="absolute opacity-0 group-hover:opacity-100 group-hover:translate-y-4 transition-all duration-300 text-[8px] font-black text-white/70 uppercase tracking-tighter">
                {Math.round(scrollProgress)}%
              </span>
            </div>

            {/* Ripple Effect */}
            <div className="absolute inset-0 rounded-full border border-white/5 group-hover:scale-110 transition-transform duration-700" />

            {/* Tooltip */}
            <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              <span className="text-[10px] font-black text-white uppercase tracking-widest">Transmit To Top</span>
            </div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
