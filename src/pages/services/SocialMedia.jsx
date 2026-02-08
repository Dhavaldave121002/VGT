import React from 'react';
import { api } from '../../utils/api';
import { motion } from 'framer-motion';
import { FaHashtag, FaBullhorn, FaChartLine, FaUsers, FaMagic, FaRocket, FaInstagram, FaLinkedin, FaTiktok, FaFacebook, FaYoutube, FaTwitter } from 'react-icons/fa';
import ProcessTimeline from '../../components/Services/ProcessTimeline';
import TechStack from '../../components/Services/TechStack';
import ServiceFAQ from '../../components/Services/ServiceFAQ';
import ServiceHero3D from '../../components/UI/ServiceHero3D';
import SEO from '../../components/SEO';

export default function SocialMedia() {
  const [features, setFeatures] = React.useState([
    { title: 'Viral Strategy', icon: <FaRocket />, desc: 'Data-driven content calendars designed to capture attention and ignite growth.' },
    { title: 'Community Growth', icon: <FaUsers />, desc: 'Organic engagement strategies that turn followers into loyal brand advocates.' },
    { title: 'Creative Direction', icon: <FaMagic />, desc: 'Stunning visuals and copy that stop the scroll and tell your story.' },
    { title: 'Performance Ads', icon: <FaBullhorn />, desc: 'High-ROI paid campaigns that target your ideal customer with laser precision.' },
    { title: 'Trend Jacking', icon: <FaHashtag />, desc: 'Real-time content adaptation to ride the waves of viral cultural moments.' },
    { title: 'Deep Analytics', icon: <FaChartLine />, desc: 'Comprehensive reporting on reach, engagement, and conversion metrics.' },
  ]);
  const [techStack, setTechStack] = React.useState([
    { name: 'Instagram', icon: <FaInstagram className="text-pink-500" /> },
    { name: 'LinkedIn', icon: <FaLinkedin className="text-blue-600" /> },
    { name: 'TikTok', icon: <FaTiktok className="text-black bg-white rounded-full p-0.5" /> }, // Visually distinct
    { name: 'Facebook', icon: <FaFacebook className="text-blue-600" /> },
    { name: 'YouTube', icon: <FaYoutube className="text-red-500" /> },
    { name: 'X / Twitter', icon: <FaTwitter className="text-white" /> },
  ]);
  const [faqs, setFaqs] = React.useState([
    { q: "Which platforms should I be on?", a: "We analyze your target audience to recommend the platforms where they are most active. B2B often thrives on LinkedIn, while lifestyle brands shine on Instagram and TikTok." },
    { q: "Do you create the content?", a: "Yes! Our team handles everything from graphic design and video editing to copywriting and scheduling." },
    { q: "How do you measure success?", a: "We focus on KPIs that matter to your business: engagement rate, click-through rate, lead generation, and overall community growth." },
  ]);
  const [process, setProcess] = React.useState([
    { step: '01', title: 'Audit & Strategy', desc: 'We deep dive into your current presence and competitors to build a winning roadmap.' },
    { step: '02', title: 'Content Creation', desc: 'Our creative team produces high-quality visuals, videos, and copy.' },
    { step: '03', title: 'Deployment', desc: 'Strategic scheduling for maximum visibility and engagement.' },
    { step: '04', title: 'Engagement', desc: 'Active community management to foster relationships.' },
    { step: '05', title: 'Optimization', desc: 'Monthly reports and data-backed adjustments to improve performance.' },
  ]);

  React.useEffect(() => {
    const loadData = async () => {
      const data = await api.fetchConfig('service_config_social');
      if (data) {
        if (data.features) setFeatures(data.features);
        // Tech stack usually static for social platforms, but can be dynamic if needed
        if (data.faqs) setFaqs(data.faqs);
        if (data.process) setProcess(data.process);
      }
    };
    loadData();
  }, []);

  return (
    <>
      <SEO
        title="Social Media Marketing"
        description="Explode your brand presence with Vertex Global Tech. Viral strategies, content creation, and community management for the modern web."
        keywords="social media marketing, smm agency, content creation, brand growth, instagram marketing, linkedin strategy"
      />

      <div className="min-h-screen bg-[#030712] font-sans selection:bg-pink-500 selection:text-white">

        {/* HERO */}
        {/* Using a custom variant of ServiceHero3D or passing specific props for the social vibe */}
        {/* Since ServiceHero3D takes specific props, we'll try to use it with social-themed images */}
        <ServiceHero3D
          title="Social Media"
          highlight="Dominance"
          badge="Marketing"
          subtitle="Stop the scroll. Build a cult-like following with data-driven social strategies."
          laptopImage="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2874&auto=format&fit=crop" // Social Media Dashboard look
          phoneImage="https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=2774&auto=format&fit=crop" // Phone showing social app
        />

        {/* INTRODUCTION */}
        <section className="py-24 bg-gradient-to-b from-[#030712] to-[#0f172a] relative overflow-hidden">
          {/* Background Gradients & Floating Elements */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-pink-500/50 to-transparent"></div>
          <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow delay-1000"></div>

          {/* Floating Social Icons Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[FaInstagram, FaTiktok, FaTwitter, FaYoutube, FaLinkedin].map((Icon, i) => (
              <motion.div
                key={i}
                className="absolute text-white/5"
                initial={{ y: 100, x: Math.random() * 1000, opacity: 0 }}
                animate={{
                  y: [100, -100],
                  x: [Math.random() * 1000, Math.random() * 1000],
                  opacity: [0, 0.2, 0],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 10 + Math.random() * 10,
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 5
                }}
                style={{ left: `${Math.random() * 80}%`, fontSize: `${Math.random() * 4 + 2}rem` }}
              >
                <Icon />
              </motion.div>
            ))}
          </div>

          <div className="container mx-auto px-6 max-w-6xl text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter">
                Ignite Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 animate-gradient-x">Brand Voice</span>
              </h2>
              <p className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed font-medium">
                In a noisy digital world, attention is the new currency. We craft thumb-stopping content and viral strategies that don't just reach audiences—they resonate, convert, and build lasting communities.
              </p>
            </motion.div>
          </div>
        </section>

        {/* FEATURES GRID */}
        <section className="py-24 bg-[#0f172a] relative overflow-hidden">
          <div className="container mx-auto px-6 max-w-7xl relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase tracking-tight">The <span className="text-pink-500">Vertex</span> Edge</h2>
              <p className="text-gray-400 text-sm font-bold uppercase tracking-[0.3em]">Modern SMM Architecture</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-[#030712]/50 p-10 rounded-[2.5rem] border border-white/5 hover:border-pink-500/50 hover:bg-[#030712] transition-all group relative overflow-hidden hover:shadow-2xl hover:shadow-pink-900/10 cursor-default"
                  whileHover={{ y: -10 }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-500/10 to-transparent rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500/20 to-orange-500/20 rounded-2xl flex items-center justify-center text-pink-500 text-3xl mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg shadow-pink-900/20">
                    {/* Render icon directly if it's a component, or use class if string (legacy support) */}
                    {typeof item.icon === 'string' ? <i className={`bi ${item.icon}`}></i> : item.icon}
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors text-sm font-medium">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS TIMELINE - REDESIGNED */}
        <section className="py-24 bg-[#030712] relative">
          <div className="container mx-auto px-6">
            <div className="text-center mb-24">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase tracking-tight">Deployment <span className="text-orange-500">Protocol</span></h2>
              <p className="text-gray-400 text-sm font-bold uppercase tracking-[0.3em]">From Concept to Viral Status</p>
            </div>

            <div className="relative max-w-5xl mx-auto">
              {/* Center Line (Hidden on mobile) */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-500 via-orange-500 to-purple-500 opacity-20 hidden md:block"></div>

              <div className="space-y-16">
                {process.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 relative ${i % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
                  >
                    {/* Step Number Bubble (Center) */}
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#030712] border-2 border-pink-500 z-10 hidden md:flex items-center justify-center shadow-[0_0_20px_rgba(236,72,153,0.5)]">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    </div>

                    {/* Content Side */}
                    <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'} pl-12 md:pl-0 relative`}>
                      {/* Mobile Line connection */}
                      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-white/10 md:hidden"></div>
                      <div className="absolute left-2.5 top-0 w-3.5 h-3.5 rounded-full bg-pink-500 md:hidden shadow-[0_0_15px_rgba(236,72,153,0.8)]"></div>

                      <div className="text-6xl md:text-8xl font-black text-white/5 select-none absolute -top-10 md:-top-16 w-full">{step.step}</div>
                      <h3 className="text-2xl md:text-3xl font-black text-white mb-3 uppercase tracking-tight relative z-10 group-hover:text-pink-500 transition-colors">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                          {step.title}
                        </span>
                      </h3>
                      <p className="text-gray-400 font-medium text-lg relative z-10">{step.desc}</p>
                    </div>

                    {/* Empty Side for layout balance */}
                    <div className="w-full md:w-1/2 hidden md:block"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TECH STACK (AS PLATFORMS) */}
        <section className="py-24 bg-[#0f172a]/50">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-16 uppercase tracking-tight">Platforms We <span className="text-pink-500">Dominate</span></h2>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              {techStack.map((tech, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group flex flex-col items-center gap-4"
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-[#030712] rounded-3xl border border-white/5 flex items-center justify-center text-4xl shadow-xl group-hover:-translate-y-2 transition-transform duration-300">
                    {tech.icon}
                  </div>
                  <span className="text-gray-500 font-bold uppercase tracking-wider text-xs group-hover:text-white transition-colors">{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <ServiceFAQ category="Social Media" customFaqs={faqs} />

        {/* CTA */}
        <section className="py-32 text-center bg-gradient-to-t from-pink-900/20 to-[#030712] relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter">Ready to Go <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500">Viral?</span></h2>
              <p className="text-xl text-gray-400 mb-12 font-medium max-w-2xl mx-auto">Don't let your brand vanish in the feed. Let's create something unforgettable.</p>
              <a href="/pricing/social-media" className="inline-flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-pink-600 to-orange-600 hover:from-pink-500 hover:to-orange-500 text-white font-black text-sm uppercase tracking-[0.2em] rounded-full transition-all shadow-2xl shadow-pink-900/40 transform hover:scale-105">
                <span>View Packages</span>
                <FaRocket />
              </a>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
