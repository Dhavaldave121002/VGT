import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCookieBite, FaTimes, FaShieldAlt } from 'react-icons/fa';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('vgt_cookie_consent');
    if (!consent) {
      // Show much sooner for better interaction
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('vgt_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 50, opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-6 left-6 right-6 md:left-8 md:right-auto md:max-w-lg z-[9999]"
        >
          <div className="relative group">
            {/* Animated Border Glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

            <div className="relative bg-[#0b1120]/90 backdrop-blur-2xl p-6 md:p-8 rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
              {/* Tech Mesh Background Effect */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#3b82f6 0.5px, transparent 0.5px)', backgroundSize: '20px 20px' }}></div>
              </div>

              <div className="flex flex-col gap-6 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400 border border-blue-500/30">
                      <FaShieldAlt className="text-lg" />
                    </div>
                    <h4 className="text-white font-black uppercase tracking-widest text-xs">Privacy & Data</h4>
                  </div>
                  <button
                    onClick={handleDecline}
                    className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-500 hover:text-white transition-colors border border-white/5"
                  >
                    <FaTimes size={12} />
                  </button>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-tight">
                    We use cookies to <span className="text-blue-500">optimize</span> your experience.
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Vertex Global Tech uses essential cookies to ensure site functionality and analytics to improve our services. By continuing, you agree to our digital policies.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={handleAccept}
                    className="w-full px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl shadow-xl shadow-blue-900/40 transition-all active:scale-95"
                  >
                    Accept Optimization
                  </button>
                  <Link
                    to="/cookies"
                    className="w-full sm:w-auto px-6 py-4 text-center text-gray-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors"
                  >
                    Manage Preferences
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
