import React from 'react';
import { api } from '../../utils/api';

import { motion } from 'framer-motion';
import ProcessTimeline from '../../components/Services/ProcessTimeline';
import TechStack from '../../components/Services/TechStack';
import ServiceFAQ from '../../components/Services/ServiceFAQ';
import ServiceHero3D from '../../components/UI/ServiceHero3D';
import SEO from '../../components/SEO';

export default function Odoo() {
  const [features, setFeatures] = React.useState([
    { title: 'ERP Setup & Config', icon: 'bi-gear-wide-connected', desc: 'Seamless Odoo ERP installation tailored to your unique business architecture.' },
    { title: 'Module Development', icon: 'bi-puzzle', desc: 'Creating custom Odoo modules and enhancing existing features for better utility.' },
    { title: 'Workflow Automation', icon: 'bi-robot', desc: 'Optimizing business processes with intelligent, automated Odoo workflows.' },
    { title: 'ERP Integration', icon: 'bi-link-45deg', desc: 'Connecting your website and external platforms directly with your Odoo ecosystem.' },
    { title: 'Data Migration', icon: 'bi-database-up', desc: 'Securely moving your business data into Odoo with zero loss and full integrity.' },
    { title: 'Training & Support', icon: 'bi-headset', desc: 'Comprehensive user training and ongoing Odoo maintenance for peak performance.' },
  ]);
  const [techStack, setTechStack] = React.useState([
    { name: 'Python', icon: 'bi-filetype-py', color: 'text-yellow-400' },
    { name: 'Odoo Framework', icon: 'bi-box-seam', color: 'text-purple-500' },
    { name: 'PostgreSQL', icon: 'bi-database', color: 'text-blue-400' },
    { name: 'XML/QWeb', icon: 'bi-file-earmark-code', color: 'text-orange-400' },
    { name: 'JavaScript', icon: 'bi-filetype-js', color: 'text-yellow-300' },
    { name: 'Docker', icon: 'bi-box-seam', color: 'text-blue-500' }
  ]);
  const [faqs, setFaqs] = React.useState([
    { q: "What is Odoo?", a: "Odoo is an all-in-one business software that includes CRM, website/e-commerce, billing, accounting, manufacturing, warehouse - and project management, and inventory." },
    { q: "Can Odoo be customized for my industry?", a: "Absolutely. Odoo's modular structure allows us to customize everything from workflows to reports specifically for your industry's needs." },
    { q: "Odoo Online vs Odoo.sh?", a: "Odoo Online is SaaS-based and doesn't allow custom code. Odoo.sh is a cloud platform that allows full customization and Git integration." }
  ]);
  const [process, setProcess] = React.useState([
    { num: '01', title: 'Consultation', desc: 'Analyze your business workflows to map out Odoo requirements.', icon: 'bi-chat-dots' },
    { num: '02', title: 'Configuration', desc: 'Setting up the core Odoo environment and standard modules.', icon: 'bi-sliders' },
    { num: '03', title: 'Customization', desc: 'Developing bespoke modules and automating your specific business logic.', icon: 'bi-tools' },
    { num: '04', title: 'Quality Check', desc: 'Testing data integrity and workflow accuracy across the system.', icon: 'bi-patch-check' },
    { num: '05', title: 'Deployment', desc: 'Go-live and staff training for a smooth transition to your new ERP.', icon: 'bi-rocket' }
  ]);

  React.useEffect(() => {
    const loadData = async () => {
      const data = await api.fetchConfig('service_config_odoo');
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
        title="Odoo Customization & Implementation"
        description="Expert Odoo ERP customization and implementation services. Scale your business with tailored Odoo solutions from Vertex Global Tech."
        keywords="odoo customization, odoo implementation, odoo erp, erp setup, custom odoo modules, vertex global tech"
      />

      <div className="min-h-screen bg-[#030712]">

        <ServiceHero3D
          title="Odoo ERP Solutions"
          highlight="Solutions"
          badge="Enterprise Logic"
          subtitle="Revolutionize your business workflows with tailored Odoo implementation."
          laptopImage="https://images.unsplash.com/photo-1551288049-bbbda546697a?auto=format&fit=crop&q=80&w=1200"
          phoneImage="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=600"
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
                Master Your Business with <span className="text-blue-500">Odoo ERP</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
                Whether you are a startup or an established business, we deliver Odoo solutions that are efficient, scalable, and tailored to your workflow. Our expert team ensures every module is perfectly aligned with your operational goals.
              </p>
            </motion.div>
          </div>
        </section>

        {/* FEATURES GRID */}
        <section className="py-24 bg-[#030712] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="container mx-auto px-6 max-w-7xl relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Odoo <span className="text-blue-500">Services</span></h2>
              <p className="text-gray-400">Comprehensive ERP management for the modern enterprise.</p>
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

        <ProcessTimeline customSteps={process} />
        <TechStack customStack={techStack} />
        <ServiceFAQ category="Odoo" customFaqs={faqs} />

        {/* CTA */}
        <section className="py-24 text-center bg-gradient-to-b from-[#020617] to-[#0f172a]">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto bg-[#1e293b]/50 p-12 rounded-3xl border border-white/10 backdrop-blur-lg"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Scale Your Operations with Odoo</h2>
              <p className="text-xl text-gray-400 mb-8">Let's build an ERP system that works as hard as you do.</p>
              <a href="/contact?service=odoo" className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all shadow-lg shadow-blue-900/40 transform hover:scale-105">
                <span>Request Odoo Demo</span>
                <i className="bi bi-arrow-right"></i>
              </a>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
