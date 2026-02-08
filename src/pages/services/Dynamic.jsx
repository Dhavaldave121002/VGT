import React from 'react';
import { api } from '../../utils/api';
import { motion } from 'framer-motion';
import ProcessTimeline from '../../components/Services/ProcessTimeline';
import TechStack from '../../components/Services/TechStack';
import ServiceFAQ from '../../components/Services/ServiceFAQ';
import ServiceHero3D from '../../components/UI/ServiceHero3D';
import SEO from '../../components/SEO';

export default function Dynamic() {
  const [features, setFeatures] = React.useState([
    { title: 'Engaging Interfaces', icon: 'bi-cursor-fill', desc: 'Smooth, animated elements that keep users interested.' },
    { title: 'Connect Everything', icon: 'bi-hdd-network', desc: 'Link your website to other tools and data systems easily.' },
    { title: 'Live Updates', icon: 'bi-activity', desc: 'See stock prices, notifications, or chats happen instantly.' },
    { title: 'User Dashboards', icon: 'bi-person-badge', desc: 'Private areas for users to manage their profile and data.' },
    { title: 'Smart Workflows', icon: 'bi-diagram-3', desc: 'Automate complex business tasks to save time.' },
    { title: 'Cloud Powered', icon: 'bi-cloud-fill', desc: 'Hosted on powerful servers that grow with your traffic.' },
  ]);
  const [techStack, setTechStack] = React.useState([]);
  const [faqs, setFaqs] = React.useState([]);
  const [process, setProcess] = React.useState([]);

  React.useEffect(() => {
    const loadData = async () => {
      const data = await api.fetchConfig('service_config_dynamic');
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
        title="Dynamic Web Solutions"
        description="Build interactive, data-driven web applications with Vertex Global Tech. Scalable solutions for complex needs."
        keywords="dynamic website, web application, react development, interactive web design"
      />

      <div className="min-h-screen bg-[#030712]">

        {/* HERO */}
        <ServiceHero3D
          title="Dynamic Web Solutions"
          highlight="Solutions"
          badge="Services"
          subtitle="Interactive, data-driven experiences that adapt to your users in real-time."
          laptopImage="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000"
          phoneImage="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000"
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
                Beyond Static <span className="text-purple-500">Pages</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Modern businesses need more than just a brochure. We build dynamic web solutions that process data, handle user interactions, and automate workflows, transforming your website into a powerful business tool.
              </p>
            </motion.div>
          </div>
        </section>

        {/* FEATURES GRID */}
        <section className="py-24 bg-[#030712] relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="container mx-auto px-6 max-w-7xl relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Core <span className="text-purple-500">Capabilities</span></h2>
              <p className="text-gray-400">Advanced functionality for demanding projects.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-[#0f172a] p-8 rounded-2xl border border-white/5 hover:border-purple-500/50 hover:bg-[#1e293b] transition-all group"
                >
                  <div className="w-14 h-14 bg-purple-600/10 rounded-xl flex items-center justify-center text-purple-400 text-2xl mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors">
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
        <ServiceFAQ category="Dynamic" customFaqs={faqs} />

        {/* CTA */}
        <section className="py-24 text-center bg-gradient-to-b from-[#020617] to-[#0f172a]">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto bg-[#1e293b]/50 p-12 rounded-3xl border border-white/10 backdrop-blur-lg"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Need a custom solution?</h2>
              <p className="text-xl text-gray-400 mb-8">Let's engineer a platform that scales with your ambition.</p>
              <a href="/contact?tab=schedule" className="inline-flex items-center gap-3 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-full transition-all shadow-lg shadow-purple-900/40 transform hover:scale-105">
                <span>Start Building</span>
                <i className="bi bi-arrow-right"></i>
              </a>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
