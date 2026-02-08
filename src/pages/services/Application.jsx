import React from 'react';
import { api } from '../../utils/api';
import { motion } from 'framer-motion';
import ProcessTimeline from '../../components/Services/ProcessTimeline';
import TechStack from '../../components/Services/TechStack';
import ServiceFAQ from '../../components/Services/ServiceFAQ';
import ServiceHero3D from '../../components/UI/ServiceHero3D';
import SEO from '../../components/SEO';

export default function Application() {
  const [features, setFeatures] = React.useState([
    { title: 'Scalable Platforms', icon: 'bi-cloud', desc: 'Growth-ready systems that handle thousands of users effortlessly.' },
    { title: 'Seamless Connections', icon: 'bi-code-square', desc: 'We connect your apps to other services for smooth data flow.' },
    { title: 'Instant Updates', icon: 'bi-arrow-repeat', desc: 'See changes immediately without refreshing the page.' },
    { title: 'Bank-Grade Security', icon: 'bi-shield-lock', desc: 'Top-tier encryption and protections to keep data safe.' },
    { title: 'Modular Design', icon: 'bi-diagram-2', desc: 'Built in blocks, so we can upgrade parts without breaking the whole.' },
    { title: 'Automated Releases', icon: 'bi-infinity', desc: 'We deploy updates faster and with fewer errors.' },
  ]);
  const [techStack, setTechStack] = React.useState([]);
  const [faqs, setFaqs] = React.useState([]);
  const [process, setProcess] = React.useState([]);

  React.useEffect(() => {
    const loadData = async () => {
      const data = await api.fetchConfig('service_config_application');
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
        title="Mobile Application Development"
        description="Build enterprise-grade SaaS platforms with Vertex Global Tech. Scalable, secure, and high-performance mobile applications."
        keywords="mobile application, saas development, cloud software, vertex global tech"
      />

      <div className="min-h-screen bg-[#030712]">

        {/* HERO */}
        <ServiceHero3D
          title="Mobile Applications"
          highlight="Applications"
          badge="Services"
          subtitle="Scalable, enterprise-grade SaaS platforms built for performance and growth."
          laptopImage="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1000"
          phoneImage="https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&q=80&w=500"
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
                Software that <span className="text-red-500">Works</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                We transform complex business requirements into elegant, high-performance mobile applications. Whether you're building a new SaaS product or digitizing internal tools, we deliver code that scales.
              </p>
            </motion.div>
          </div>
        </section>

        {/* FEATURES GRID */}
        <section className="py-24 bg-[#030712] relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-red-900/10 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="container mx-auto px-6 max-w-7xl relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Enterprise <span className="text-red-500">Features</span></h2>
              <p className="text-gray-400">Built for mission-critical operations.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-[#0f172a] p-8 rounded-2xl border border-white/5 hover:border-red-500/50 hover:bg-[#1e293b] transition-all group"
                >
                  <div className="w-14 h-14 bg-red-600/10 rounded-xl flex items-center justify-center text-red-500 text-2xl mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors">
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
        <ServiceFAQ category="Application" customFaqs={faqs} />

        {/* CTA */}
        <section className="py-24 text-center bg-gradient-to-b from-[#020617] to-[#0f172a]">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto bg-[#1e293b]/50 p-12 rounded-3xl border border-white/10 backdrop-blur-lg"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Have an idea?</h2>
              <p className="text-xl text-gray-400 mb-8">Let's turn it into a reality.</p>
              <a href="/contact?tab=schedule" className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-all shadow-lg shadow-red-900/40 transform hover:scale-105">
                <span>Start Development</span>
                <i className="bi bi-arrow-right"></i>
              </a>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
