// src/components/About/Timeline.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TimelineItem = ({ year, title, desc, index, isLast }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="relative pl-12 pb-12 group last:pb-0"
    >
      {/* Vertical Line */}
      {!isLast && (
        <div className="absolute left-[7px] top-8 bottom-0 w-[2px] bg-white/5 group-hover:bg-blue-500/30 transition-colors"></div>
      )}

      {/* Node Dot */}
      <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-[#030712] border-2 border-white/20 group-hover:border-blue-500 group-hover:scale-125 transition-all duration-500 z-10 shadow-[0_0_15px_rgba(59,130,246,0)] group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>

      <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
        <span className="text-blue-500 font-black text-xs uppercase tracking-[0.2em] font-mono">{year}</span>
        <div className="hidden md:block w-4 h-[1px] bg-white/10"></div>
        <h4 className="text-white font-black text-lg uppercase tracking-tight group-hover:text-blue-400 transition-colors">{title}</h4>
      </div>

      <p className="text-gray-500 text-sm leading-relaxed max-w-2xl group-hover:text-gray-400 transition-colors font-medium">
        {desc}
      </p>

      {/* Decorative Gradient Background on Hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none"></div>
    </motion.div>
  );
};

export default function Timeline() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadTimeline = () => {
      const saved = localStorage.getItem('vgtw_timeline');
      if (saved) {
        setEvents(JSON.parse(saved));
      } else {
        // Fallback defaults
        const defaultEvents = [
          { id: 1, year: "2025", title: "The Genesis", desc: "Vertex Global Tech launches its next-gen digital ecosystem platform." },
          { id: 2, year: "2026", title: "Global Scale", desc: "Expanding operations to key international markets in Europe and Asia." },
          { id: 3, year: "2027", title: "AI Integration", desc: "Full-scale deployment of proprietary AI models across all client services." }
        ];
        setEvents(defaultEvents);
        localStorage.setItem('vgtw_timeline', JSON.stringify(defaultEvents));
      }
    };

    loadTimeline();
    window.addEventListener('storage', loadTimeline);
    return () => window.removeEventListener('storage', loadTimeline);
  }, []);

  return (
    <div className="py-20 border-t border-white/5 mt-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 px-4">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
            <span className="text-blue-500 font-black text-[10px] uppercase tracking-[0.4em]">Corporate_Lifecycle</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
            Our Journey <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">So Far</span>
          </h2>
        </div>
        <p className="text-gray-500 text-sm max-w-sm mb-2 font-medium">
          A lineage of innovation, transforming complex business challenges into simple digital realities since inception.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6">
        <div className="relative">
          {events.length > 0 ? events.map((event, index) => (
            <TimelineItem
              key={event.id}
              year={event.year}
              title={event.title}
              desc={event.desc}
              index={index}
              isLast={index === events.length - 1}
            />
          )) : (
            <p className="text-gray-600 text-center uppercase tracking-widest text-[10px] py-20 font-black">Waiting for timeline data stream...</p>
          )}
        </div>
      </div>
    </div>
  );
}