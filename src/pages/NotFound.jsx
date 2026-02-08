import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaHome, FaTools, FaTerminal } from 'react-icons/fa';
import SEO from '../components/SEO';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center p-6 relative overflow-hidden font-mono">
      <SEO
        title="404 - System Fault"
        description="The requested node was not found within the Vertex Global Tech directory."
        noindex={true}
      />

      {/* Background Decor */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-404" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#2563eb" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-404)" />
        </svg>
      </div>

      {/* Glitch Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-[120px] animate-pulse-slow"></div>

      <div className="text-center relative z-10 max-w-2xl w-full">

        {/* Error HUD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8 p-1 inline-block"
        >
          <div className="px-4 py-1.5 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] uppercase font-black tracking-[0.3em] mb-4 inline-block">
            <FaExclamationTriangle className="inline mr-2" /> Critical Error: Node_Not_Found
          </div>

          <div className="relative">
            <h1 className="text-[120px] md:text-[200px] leading-none font-black text-white mix-blend-difference selection:bg-blue-500">
              404
            </h1>

            {/* Horizontal Line Scan */}
            <motion.div
              className="absolute inset-x-0 h-[2px] bg-red-500/50 shadow-[0_0_15px_#ef4444] z-20"
              animate={{ top: ['10%', '90%', '10%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />

            {/* Ghost Effect */}
            <motion.h1
              className="absolute inset-0 text-[120px] md:text-[200px] leading-none font-black text-blue-500/20 -z-10 translate-x-1"
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 0.1, repeat: Infinity }}
            >
              404
            </motion.h1>
          </div>
        </motion.div>

        <div className="space-y-4 mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight uppercase">Segment Not Loaded</h2>
          <p className="text-gray-500 text-sm md:text-base max-w-md mx-auto leading-relaxed">
            The resource you're attempting to access is either encrypted or doesn't exist in our global registry. Returning to safety is recommended.
          </p>
        </div>

        {/* Console Log Simulation */}
        <div className="bg-black/40 border border-white/5 rounded-xl p-4 mb-10 text-left font-mono hidden md:block">
          <div className="flex gap-2 mb-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/40"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/40"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500/40"></div>
          </div>
          <p className="text-[10px] text-gray-600 tracking-tighter">
            <span className="text-blue-400">$</span> fetch_route --target: "{window.location.pathname}" <br />
            <span className="text-gray-500">[SYSTEM]</span> Searching registry... <br />
            <span className="text-red-500">[ERROR]</span> 404: NullReferenceException at index_map.bin
          </p>
        </div>

        {/* Actions */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-blue-900/40 hover:shadow-blue-600/60 active:scale-95 uppercase tracking-widest"
          >
            <FaHome /> Reconnect to Main Node
          </Link>
          <Link
            to="/contact"
            className="flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white text-xs font-bold rounded-xl hover:bg-white/10 transition-all backdrop-blur-sm active:scale-95 uppercase tracking-widest"
          >
            <FaTools size={12} /> Contact SysAdmin
          </Link>
        </motion.div>

      </div>

      {/* HUD Corners */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-white/10 rounded-tl-3xl"></div>
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-white/10 rounded-br-3xl"></div>
      <div className="absolute top-8 right-8 text-[9px] text-gray-700 font-bold uppercase tracking-[0.5em] vertical-text hidden lg:block">Error_Log_V9</div>

    </div>
  );
};

export default NotFound;