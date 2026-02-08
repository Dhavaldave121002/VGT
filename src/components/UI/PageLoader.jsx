import React from 'react';
import { motion } from 'framer-motion';

const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#030712] overflow-hidden">
      <div className="relative flex flex-col items-center justify-center">
        {/* Abstract Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] animate-pulse"></div>

        {/* Animated Rings */}
        <div className="relative mb-8">
          <div className="w-32 h-32 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-purple-500 border-l-transparent animate-spin"></div>
          <div className="absolute top-0 left-0 w-32 h-32 rounded-full border-4 border-t-transparent border-r-cyan-500 border-b-transparent border-l-purple-500 animate-spin opacity-50" style={{ animationDirection: 'reverse', animationDuration: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full backdrop-blur-md border border-white/5 flex items-center justify-center">
            <span className="text-2xl">⚡</span>
          </div>
        </div>

        {/* Brand Text */}
        <div className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-500"
          >
            VERTEX GLOBAL TECH
          </motion.div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent mt-4 mx-auto"
          ></motion.div>
          <p className="mt-4 text-gray-400 text-sm tracking-widest uppercase">Innovating the Future</p>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
