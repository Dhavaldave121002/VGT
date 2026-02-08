import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/vglogo.jpg';

const LogoPreloader = () => {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);

  const statuses = [
    "Establishing Connection",
    "Initializing Core",
    "Syncing Assets",
    "Ready"
  ];

  useEffect(() => {
    let timer;
    let statusTimer;

    timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          if (timer) clearInterval(timer);
          return 100;
        }
        // Smooth logarithmic progress for a premium feel
        const increment = prev < 80 ? 0.8 : 0.3;
        return Math.min(100, prev + increment);
      });
    }, 20);

    statusTimer = setInterval(() => {
      setStatusIndex(prev => (prev < statuses.length - 1 ? prev + 1 : prev));
    }, 600);

    return () => {
      if (timer) clearInterval(timer);
      if (statusTimer) clearInterval(statusTimer);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] bg-[#030712] flex flex-col items-center justify-center overflow-hidden font-mono"
    >
      {/* Absolute Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1e1b4b_0%,_transparent_70%)] opacity-20"></div>
        {/* Subtle Rhythmic Pulse */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-blue-500 rounded-full blur-[150px]"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-[90vw]">

        {/* Creative Central Core */}
        <div className="relative mb-12 group">
          {/* Orbital Rings */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ rotate: 360 }}
              transition={{
                duration: 8 + i * 4,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-[-20px] rounded-full border border-blue-500/10"
              style={{ padding: i * 10 }}
            >
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full blur-[2px]"></div>
            </motion.div>
          ))}

          {/* Core Logo Container */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-24 h-24 md:w-32 md:h-32"
          >
            <div className="absolute inset-0 bg-blue-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/5 bg-black/40 backdrop-blur-xl p-0.5">
              <img src={logo} alt="Vertex" className="w-full h-full object-cover rounded-[1.4rem]" />
            </div>

            {/* Progress Ring */}
            <svg className="absolute inset-[-10px] w-[calc(100%+20px)] h-[calc(100%+20px)] -rotate-90">
              <motion.circle
                cx="50%"
                cy="50%"
                r="48%"
                fill="none"
                stroke="rgba(59, 130, 246, 0.2)"
                strokeWidth="2"
              />
              <motion.circle
                cx="50%"
                cy="50%"
                r="48%"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
                strokeDasharray="100 100"
                initial={{ strokeDashoffset: 100 }}
                animate={{ strokeDashoffset: 100 - progress }}
                transition={{ duration: 0.1 }}
              />
            </svg>
          </motion.div>
        </div>

        {/* Branding & Typography */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-2xl md:text-4xl font-black text-white tracking-[0.2em] uppercase">
              Vertex <span className="text-blue-500">Global</span> Tech
            </h1>
          </motion.div>

          {/* Minimalist Progress Indicators */}
          <div className="flex flex-col items-center gap-3">
            <motion.p
              key={statusIndex}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 0.5, y: 0 }}
              className="text-[9px] md:text-[11px] font-bold text-blue-400 uppercase tracking-[0.4em]"
            >
              {statuses[statusIndex]}
            </motion.p>

            <div className="w-32 h-[1px] bg-white/5 relative overflow-hidden">
              <motion.div
                initial={{ left: "-100%" }}
                animate={{ left: "100%" }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
              />
            </div>

            <p className="text-[10px] font-black text-gray-600 tracking-tighter">
              {Math.floor(progress)}%
            </p>
          </div>
        </div>
      </div>

      {/* Atmospheric Footer Elements */}
      <div className="absolute bottom-10 left-10 flex gap-4 opacity-10">
        <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-[8px] text-white">01</div>
        <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-[8px] text-white">02</div>
      </div>

      <div className="absolute bottom-10 right-10 flex items-center gap-3 opacity-10">
        <div className="text-[8px] text-white font-black tracking-widest uppercase text-right">
          System_Stable<br />Node_Active
        </div>
        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
      </div>

    </motion.div>
  );
};

export default LogoPreloader;
