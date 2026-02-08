import React from 'react';
import { api } from '../../utils/api';
import { motion } from 'framer-motion';
import ProcessTimeline from '../../components/Services/ProcessTimeline';
import TechStack from '../../components/Services/TechStack';
import ServiceFAQ from '../../components/Services/ServiceFAQ';
import ServiceHero3D from '../../components/UI/ServiceHero3D';
import SEO from '../../components/SEO';

export default function UIUX() {
  const [features, setFeatures] = React.useState([
    { title: 'User Research', icon: 'bi-people', desc: 'We study your audience to know exactly what they want.' },
    { title: 'Blueprints', icon: 'bi-grid-1x2', desc: 'Simple sketches to test ideas before building.' },
    { title: 'Visual Design', icon: 'bi-palette', desc: 'Stunning, on-brand looks that wow your customers.' },
    { title: 'Design Library', icon: 'bi-collection', desc: 'A set of reusable elements to keep everything consistent.' },
    { title: 'Interactions', icon: 'bi-cursor', desc: 'Fun animations and feedback that make the app feel alive.' },
    { title: 'User Testing', icon: 'bi-clipboard-check', desc: 'Real people test the design to ensure it is easy to use.' },
  ]);
  const [techStack, setTechStack] = React.useState([]);
  const [faqs, setFaqs] = React.useState([]);
  const [process, setProcess] = React.useState([]);

  React.useEffect(() => {
    const loadData = async () => {
      const data = await api.fetchConfig('service_config_uiux');
      if (data) {
        if (data.features) setFeatures(data.features);
        if (data.techStack) setTechStack(data.techStack);
        if (data.faqs) setFaqs(data.faqs);
        if (data.process) setProcess(data.process);
      }
    };
    loadData();
  }, []);

  return (
    <>
      <SEO
        title="UI / UX Design"
        description="Crafting intuitive, user-centric interfaces with Vertex Global Tech. World-class design services."
        keywords="ui design, ux design, user interface, user experience, web design"
      />

      <div className="min-h-screen bg-[#030712]">

        {/* HERO */}
        <ServiceHero3D
          title="UI / UX Design"
          highlight="Design"
          badge="Services"
          subtitle="Crafting intuitive, user-centric interfaces that delight users and drive engagement."
          laptopImage="https://images.unsplash.com/photo-1586717791821-3f44a5638d4f?auto=format&fit=crop&q=80&w=1000"
          phoneImage="https://images.unsplash.com/photo-1581291518655-9523bb99d9f6?auto=format&fit=crop&q=80&w=500"
        />

        {/* INTRODUCTION */}
        <section className="py-20 bg-[#0f172a]/30">
          <div className="container mx-auto px-6 max-w-6xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
                Design that <span className="text-pink-500">Inspires</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Great design is invisible. We create fluid, intuitive experiences that users love, blending aesthetics with functionality to achieve your business goals.
              </p>
            </motion.div>
          </div>
        </section>

        {/* FEATURES GRID */}
        <section className="py-24 bg-[#030712] relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-0 left-10 w-[500px] h-[500px] bg-pink-900/10 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="container mx-auto px-6 max-w-7xl relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Design <span className="text-pink-500">Process</span></h2>
              <p className="text-gray-400">From concept to pixel-perfect reality.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-[#0f172a] p-8 rounded-2xl border border-white/5 hover:border-pink-500/50 hover:bg-[#1e293b] transition-all group"
                >
                  <div className="w-14 h-14 bg-pink-600/10 rounded-xl flex items-center justify-center text-pink-400 text-2xl mb-6 group-hover:bg-pink-600 group-hover:text-white transition-colors">
                    <i className={`bi ${item.icon}`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS TIMELINE */}
        <ProcessTimeline customSteps={process} />

        {/* TECH STACK */}
        <TechStack customStack={techStack} />

        {/* FAQ */}
        <ServiceFAQ category="UI/UX" customFaqs={faqs} />

        {/* CTA */}
        <section className="py-24 text-center bg-gradient-to-b from-[#020617] to-[#0f172a]">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto bg-[#1e293b]/50 p-12 rounded-3xl border border-white/10 backdrop-blur-lg"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Need a redesign?</h2>
              <p className="text-xl text-gray-400 mb-8">Elevate your brand with world-class design.</p>
              <a href="/contact?tab=schedule" className="inline-flex items-center gap-3 px-8 py-4 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-full transition-all shadow-lg shadow-pink-900/40 transform hover:scale-105">
                <span>Start Design Project</span>
                <i className="bi bi-arrow-right"></i>
              </a>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
