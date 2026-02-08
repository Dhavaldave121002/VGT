import React from 'react';
import { api } from '../../utils/api';
import { motion } from 'framer-motion';
import ProcessTimeline from '../../components/Services/ProcessTimeline';
import TechStack from '../../components/Services/TechStack';
import ServiceFAQ from '../../components/Services/ServiceFAQ';
import ServiceHero3D from '../../components/UI/ServiceHero3D';
import SEO from '../../components/SEO';

export default function Ecommerce() {
  const [features, setFeatures] = React.useState([
    { title: 'Secure Checkouts', icon: 'bi-shield-lock', desc: 'PCI-DSS compliant payment processing for peace of mind.' },
    { title: 'Inventory Management', icon: 'bi-box-seam', desc: 'Real-time stock tracking and automated alerts.' },
    { title: 'Sales Analytics', icon: 'bi-graph-up-arrow', desc: 'Detailed dashboards for revenue, conversion, and traffic.' },
    { title: 'Mobile First', icon: 'bi-phone', desc: 'Optimized shopping experience for mobile users.' },
    { title: 'SEO Rankings', icon: 'bi-search', desc: 'Product schema markup to help you rank on Google Shopping.' },
    { title: 'Global Selling', icon: 'bi-globe', desc: 'Multi-currency and multi-language support built-in.' },
  ]);
  const [techStack, setTechStack] = React.useState([]);
  const [faqs, setFaqs] = React.useState([]);
  const [process, setProcess] = React.useState([]);

  React.useEffect(() => {
    const loadData = async () => {
      const data = await api.fetchConfig('service_config_ecommerce');
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
        title="E-Commerce Solutions"
        description="Launch a powerful online store with Vertex Global Tech. Secure, scalable e-commerce platforms designed to sell."
        keywords="ecommerce website, online store, shopify, woocommerce, custom ecommerce"
      />

      <div className="min-h-screen bg-[#030712]">

        {/* HERO */}
        <ServiceHero3D
          title="E-Commerce Excellence"
          highlight="Excellence"
          badge="Services"
          subtitle="Convert visitors into customers with a seamless, secure, and beautiful online store."
          laptopImage="https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=1000"
          phoneImage="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=500"
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
                Sell <span className="text-green-500">Everywhere</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                We build e-commerce platforms that don't just display products—they drive sales. From intuitive navigation to frictionless checkout, every pixel is optimized for conversion.
              </p>
            </motion.div>
          </div>
        </section>

        {/* FEATURES GRID */}
        <section className="py-24 bg-[#030712] relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-center w-[500px] h-[500px] bg-green-900/10 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="container mx-auto px-6 max-w-7xl relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Store <span className="text-green-500">Features</span></h2>
              <p className="text-gray-400">Everything you need to run a successful online business.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-[#0f172a] p-8 rounded-2xl border border-white/5 hover:border-green-500/50 hover:bg-[#1e293b] transition-all group"
                >
                  <div className="w-14 h-14 bg-green-600/10 rounded-xl flex items-center justify-center text-green-400 text-2xl mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors">
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
        <ServiceFAQ category="E-Commerce" customFaqs={faqs} />

        {/* CTA */}
        <section className="py-24 text-center bg-gradient-to-b from-[#020617] to-[#0f172a]">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto bg-[#1e293b]/50 p-12 rounded-3xl border border-white/10 backdrop-blur-lg"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to scale your business?</h2>
              <p className="text-xl text-gray-400 mb-8">Join the digital retail revolution.</p>
              <a href="/contact?tab=schedule" className="inline-flex items-center gap-3 px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full transition-all shadow-lg shadow-green-900/40 transform hover:scale-105">
                <span>Launch Your Store</span>
                <i className="bi bi-arrow-right"></i>
              </a>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
