import React, { useEffect, useState } from 'react';
import { api } from '../utils/api';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

const DEFAULT_SECTIONS = [
  { id: 1, title: 'Interpretation and Definitions', content: 'The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.' },
  { id: 2, title: 'The Use of the Cookies', content: 'We use Cookies to track the activity on Our Service and store certain information. Tracking technologies used are beacons, tags, and scripts to collect and track information and to improve and analyze Our Service.' }
];

export default function Cookies() {
  const [data, setData] = useState({ sections: DEFAULT_SECTIONS, lastUpdated: 'December 28, 2025' });

  useEffect(() => {
    const loadCookies = async () => {
      try {
        const saved = await api.fetchConfig('legal_cookies');
        if (saved) {
          setData(saved);
        }
      } catch (e) {
        console.error("Failed to load cookie policy", e);
      }
    };
    loadCookies();
  }, []);

  return (
    <div className="min-h-screen bg-[#030712] pt-32 pb-20 px-6 font-sans selection:bg-cyan-500/30 text-gray-300">
      <SEO
        title="Cookie Policy"
        description="Vertex Global Tech Cookie Policy - Transparent data tracking practices."
        type="article"
      />

      <div className="max-w-4xl mx-auto relative">
        {/* Animated Background Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[120px] pointer-events-none"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <header className="mb-16 text-center">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-cyan-500 font-black tracking-[0.4em] uppercase text-xs mb-4 block"
            >
              Data Tracking
            </motion.span>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase">
              Cookie <span className="text-cyan-500 italic">Policy</span>
            </h1>
            <div className="flex items-center justify-center gap-4">
              <div className="h-[1px] w-12 bg-white/10"></div>
              <p className="text-gray-500 font-mono text-xs uppercase tracking-widest whitespace-nowrap">
                Last Update: <span className="text-cyan-400">{data.lastUpdated}</span>
              </p>
              <div className="h-[1px] w-12 bg-white/10"></div>
            </div>
          </header>

          <div className="space-y-10 relative z-10">
            {data.sections.map((section, index) => (
              <motion.section
                key={section.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-[#0f172a]/20 border border-white/5 rounded-[2.5rem] p-10 hover:bg-[#0f172a]/40 hover:border-cyan-500/20 transition-all duration-700 backdrop-blur-md"
              >
                <div className="absolute top-6 left-6 w-2 h-2 rounded-full bg-cyan-500/40 animate-pulse"></div>

                <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-4 uppercase tracking-tight group-hover:text-cyan-400 transition-colors">
                  <span className="text-cyan-500/30 font-mono text-sm tracking-tighter">BIT_{index + 1}</span>
                  {section.title}
                </h2>

                <div className="text-gray-400 leading-relaxed text-lg font-medium tracking-tight">
                  {section.content.split('\n').map((para, i) => (
                    <p key={i} className={i > 0 ? 'mt-4' : ''}>{para}</p>
                  ))}
                </div>

                <div className="mt-8 flex gap-2 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="h-1 w-8 bg-cyan-500/10 rounded-full"></div>
                  ))}
                </div>
              </motion.section>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-20 pt-10 text-center"
          >
            <div className="inline-block px-6 py-2 rounded-full bg-white/5 border border-white/10 text-gray-500 text-[10px] font-black uppercase tracking-[0.3em]">
              Secure Governance & Transparency
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
