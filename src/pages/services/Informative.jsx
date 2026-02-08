import React from 'react';
import { api } from '../../utils/api';
import { motion } from 'framer-motion';
import ProcessTimeline from '../../components/Services/ProcessTimeline';
import TechStack from '../../components/Services/TechStack';
import ServiceFAQ from '../../components/Services/ServiceFAQ';
import ServiceHero3D from '../../components/UI/ServiceHero3D';
import SEO from '../../components/SEO';

export default function Informative() {
  const [features, setFeatures] = React.useState([
    { title: 'Responsive Design', icon: 'bi-phone', desc: 'Looks stunning on every device, from mobile to 4K desktops.' },
    { title: 'Search Engine Ready', icon: 'bi-graph-up', desc: 'Built to rank higher on Google so customers can find you.' },
    { title: 'Easy Management', icon: 'bi-window-sidebar', desc: 'Update text and images yourself with no coding needed.' },
    { title: 'Fast Performance', icon: 'bi-lightning-charge', desc: 'Loads instantly to keep visitors happy.' },
    { title: 'Secure & Reliable', icon: 'bi-shield-check', desc: 'Protected against threats with industry-best security.' },
    { title: 'Visitor Insights', icon: 'bi-bar-chart', desc: 'See who visits your site and what they do.' },
  ]);
  const [techStack, setTechStack] = React.useState([]);
  const [faqs, setFaqs] = React.useState([]);
  const [process, setProcess] = React.useState([]);

  React.useEffect(() => {
    const loadData = async () => {
      const data = await api.fetchConfig('service_config_informative');
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
        title="Informative Websites"
        description="Build a powerful digital presence with Vertex Global Tech. Custom informative websites designed for impact."
        keywords="web design, informative website, corporate site, vertex global tech"
      />

      <div className="min-h-screen bg-[#030712]">

        {/* HERO */}
        <ServiceHero3D
          title="Informative Websites"
          highlight="Websites"
          badge="Services"
          subtitle="Establish a powerful digital presence with elegant, content-focused design."
          laptopImage="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000"
          phoneImage="https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=500"
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
                Why Choose an <span className="text-blue-500">Informative Website?</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                In the digital age, your website is your 24/7 ambassador. An informative website doesn't just display information—it builds trust, educates your audience, and converts visitors into loyal clients through compelling storytelling and intuitive design.
              </p>
            </motion.div>
          </div>
        </section>

        {/* FEATURES GRID */}
        <section className="py-24 bg-[#030712] relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="container mx-auto px-6 max-w-7xl relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Key <span className="text-blue-500">Features</span></h2>
              <p className="text-gray-400">Everything you need to succeed online.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-[#0f172a] p-8 rounded-2xl border border-white/5 hover:border-blue-500/50 hover:bg-[#1e293b] transition-all group"
                >
                  <div className="w-14 h-14 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-400 text-2xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <i className={`bi ${item.icon}`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS TIMELINE (Now stylized) */}
        <ProcessTimeline customSteps={process} />

        {/* TECH STACK */}
        <TechStack customStack={techStack} />

        {/* FAQ */}
        <ServiceFAQ category="Informative" customFaqs={faqs} />

        {/* CTA */}
        <section className="py-24 text-center bg-gradient-to-b from-[#020617] to-[#0f172a]">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto bg-[#1e293b]/50 p-12 rounded-3xl border border-white/10 backdrop-blur-lg"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to start your project?</h2>
              <p className="text-xl text-gray-400 mb-8">Let's build something extraordinary together.</p>
              <a href="/contact?tab=schedule" className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all shadow-lg shadow-blue-900/40 transform hover:scale-105">
                <span>Get a Free Quote</span>
                <i className="bi bi-arrow-right"></i>
              </a>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
