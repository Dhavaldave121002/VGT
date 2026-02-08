import React from 'react';
import { motion } from 'framer-motion';

export default function PageHero({ title, subtitle, badge, highlight }) {
  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 text-center z-10 px-6 overflow-hidden">
      {/* Subtle Background Glow for Hero */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-blue-500/5 blur-[120px] pointer-events-none"
      />

      <div className="container mx-auto relative">
        {badge && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-block mb-8 px-5 py-2 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 font-bold text-[10px] md:text-xs tracking-[0.3em] uppercase backdrop-blur-md"
          >
            {badge}
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 tracking-tighter break-words"
        >
          {title.split(highlight).map((part, i, arr) => (
            <React.Fragment key={i}>
              <span className="inline-block">
                {part.split(" ").map((word, wI) => (
                  <span key={wI} className="inline-block whitespace-nowrap">
                    {word.split("").map((char, cI) => (
                      <motion.span
                        key={cI}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + (i * 0.1) + (wI * 0.05) + (cI * 0.02), duration: 0.4 }}
                        className="inline-block"
                      >
                        {char}
                      </motion.span>
                    ))}
                    <span className="inline-block">&nbsp;</span>
                  </span>
                ))}
              </span>
              {i < arr.length - 1 && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 inline-block"
                >
                  {highlight}
                </motion.span>
              )}
            </React.Fragment>
          ))}
          {!highlight && title.split(" ").map((word, wI) => (
            <span key={wI} className="inline-block whitespace-nowrap">
              {word.split("").map((char, cI) => (
                <motion.span
                  key={cI}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + (wI * 0.05) + (cI * 0.02), duration: 0.4 }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
              <span className="inline-block">&nbsp;</span>
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-medium"
        >
          {subtitle}
        </motion.p>
      </div>
    </div>
  );
}
