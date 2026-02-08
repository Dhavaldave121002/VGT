import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaRocket, FaEye, FaLinkedinIn, FaGithub, FaTwitter, FaHandshake, FaGlobe, FaLightbulb, FaCogs, FaCheckCircle, FaChartLine, FaShieldAlt, FaUsers, FaFingerprint, FaBolt } from 'react-icons/fa';
import Counter from '../components/UI/Counter';
import PageHero from '../components/UI/PageHero';
import SEO from '../components/SEO';
import { api } from '../utils/api';

// --- SUB-COMPONENTS ---

const Timeline = () => {
  const [events, setEvents] = React.useState([]);

  React.useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await api.fetchAll('timeline');
        if (data && data.length > 0) {
          setEvents(data);
        } else {
          const defaultEvents = [
            { id: 1, year: "2025", title: "The Genesis", description: "Vertex Global Tech launches its next-gen digital ecosystem platform." },
            { id: 2, year: "2026", title: "Global Scale", description: "Expanding operations to key international markets in Europe and Asia." },
            { id: 3, year: "2027", title: "AI Integration", description: "Full-scale deployment of proprietary AI models across all client services." }
          ];
          setEvents(defaultEvents);
        }
      } catch (e) {
        console.error("Failed to load timeline", e);
      }
    };
    loadEvents();
  }, []);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-blue-500 font-black tracking-[0.3em] uppercase text-[10px] mb-4 block">Our Journey</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">Decade of Excellence</h2>
        </div>

        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-[1px] bg-gradient-to-b from-transparent via-blue-500/50 to-transparent hidden md:block"></div>

          <div className="space-y-12 md:space-y-24">
            {events.map((event, index) => (
              <motion.div
                key={event.id || index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex flex-col md:flex-row items-center gap-8 md:gap-0 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
              >
                <div className={`w-full md:w-1/2 px-8 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} text-center`}>
                  <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-2">{event.year}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed max-w-sm mx-auto md:mx-0 inline-block">{event.description}</p>
                </div>

                <div className="relative z-10">
                  <div className="w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,1)] border-4 border-[#030712]"></div>
                </div>

                <div className="w-full md:w-1/2 px-8 hidden md:block"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Values = () => {
  const values = [
    { icon: FaLightbulb, title: "Innovation", desc: "We constantly push boundaries to discover what's next." },
    { icon: FaHandshake, title: "Integrity", desc: "Trust is our currency. We build transparent relationships." },
    { icon: FaCheckCircle, title: "Excellence", desc: "Good isn't enough. We strive for perfection in every pixel." },
    { icon: FaGlobe, title: "Impact", desc: "We build solutions that make a tangible difference globally." }
  ];

  return (
    <section className="py-24 bg-[#050b14]">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((val, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-[#0f172a]/40 p-8 rounded-3xl border border-white/5 hover:border-blue-500/30 transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 text-2xl mb-6 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500">
                <val.icon />
              </div>
              <h3 className="text-xl font-black text-white mb-4 uppercase tracking-tight">{val.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  const steps = [
    { num: "01", icon: FaLightbulb, title: "Discovery", desc: "We dive deep into your business goals to understand the core challenge." },
    { num: "02", icon: FaGlobe, title: "Strategy", desc: "Developing a comprehensive roadmap and technical architecture." },
    { num: "03", icon: FaCogs, title: "Execution", desc: "Agile development with rigorous testing and precision engineering." },
    { num: "04", icon: FaRocket, title: "Launch", desc: "Seamless deployment and scaling to reach your global audience." }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Flow Line */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent -translate-y-1/2 hidden md:block" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <span className="text-purple-500 font-black tracking-[0.3em] uppercase text-[10px] mb-4 block">How We Work</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">The Vertex Method</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">A proven methodology that transforms abstract ideas into concrete digital reality.</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative group"
            >
              {/* Card */}
              <div className="bg-[#0f172a]/60 backdrop-blur-md border border-white/5 p-8 rounded-3xl hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-2 h-full">
                {/* Icon Circle */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-white/5 flex items-center justify-center text-blue-400 text-2xl mb-6 group-hover:scale-110 group-hover:from-blue-600 group-hover:to-purple-600 group-hover:text-white transition-all duration-500 shadow-lg">
                  <step.icon />
                </div>

                <div className="absolute top-6 right-8 text-4xl font-black text-white/5 select-none">{step.num}</div>

                <h3 className="text-xl font-black text-white mb-4 uppercase tracking-tight group-hover:text-blue-400 transition-colors">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>

                {/* Bottom Gradient Line */}
                <div className="absolute bottom-0 left-8 right-8 h-[1px] bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const GlobalReach = () => {
  return (
    <section className="py-32 relative overflow-hidden bg-[#030712]">
      {/* Background World Map SVG - Interactive Feel */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg"
          alt="World Map"
          className="w-full h-full object-cover filter invert opacity-50"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="z-20"
          >
            <span className="text-blue-500 font-black tracking-[0.3em] uppercase text-[10px] mb-4 block">Global Footprint</span>
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 uppercase tracking-tight leading-none">
              Boundless <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 animate-gradient-x">Innovation</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-lg">
              From Silicon Valley to Singapore, Vertex Global Tech delivers excellence without borders. Our remote-first culture allows us to tap into the world's best talent and serve clients across every continent.
            </p>

            <div className="grid grid-cols-2 gap-y-6 gap-x-8">
              {['USA', 'UK', 'Germany', 'UAE', 'Singapore', 'Australia'].map((country, i) => (
                <div key={i} className="flex items-center gap-3 group cursor-default">
                  <div className="w-2 h-2 rounded-full bg-blue-500 group-hover:bg-purple-500 group-hover:scale-150 transition-all duration-300"></div>
                  <span className="text-gray-300 font-bold uppercase text-xs tracking-widest group-hover:text-white transition-colors">{country}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] flex items-center justify-center"
          >
            {/* Abstract Holographic Globe Representation */}
            <div className="relative w-[400px] h-[400px]">
              {/* Rotating Rings */}
              <div className="absolute inset-0 rounded-full border border-blue-500/20 animate-[spin_20s_linear_infinite]"></div>
              <div className="absolute inset-4 rounded-full border border-purple-500/20 animate-[spin_15s_linear_infinite_reverse]"></div>
              <div className="absolute inset-8 rounded-full border border-indigo-500/20 animate-[spin_25s_linear_infinite]"></div>

              {/* Central Glowing Core */}
              <div className="absolute inset-0 m-auto w-48 h-48 bg-blue-900/10 backdrop-blur-xl rounded-full border border-white/5 flex items-center justify-center shadow-[0_0_100px_rgba(59,130,246,0.2)]">
                <div className="text-center">
                  <div className="text-6xl font-black text-white mb-1">12+</div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-blue-400">Timezones</div>
                </div>
              </div>

              {/* Orbiting Satellites */}
              <div className="absolute w-full h-full animate-[spin_10s_linear_infinite]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_20px_rgba(59,130,246,1)]"></div>
              </div>
              <div className="absolute w-3/4 h-3/4 inset-0 m-auto animate-[spin_8s_linear_infinite_reverse]">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-purple-500 rounded-full shadow-[0_0_20px_rgba(168,85,247,1)]"></div>
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// --- MAIN COMPONENT ---

const About = () => {
  const [team, setTeam] = React.useState([]);

  const stats = [
    { label: "Years Experience", value: 8, suffix: "+" },
    { label: "Projects Completed", value: 150, suffix: "+" },
    { label: "Happy Clients", value: 98, suffix: "%" },
    { label: "Team Members", value: 25, suffix: "+" }
  ];

  React.useEffect(() => {
    const loadTeam = async () => {
      try {
        const data = await api.fetchAll('teams');
        if (data && data.length > 0) {
          const processed = data.map(m => {
            let socials = {};
            try { socials = typeof m.social_links === 'string' ? JSON.parse(m.social_links) : (m.social_links || {}); } catch (e) { }
            return { ...m, ...socials };
          });
          setTeam(processed);
        } else {
          const defaultTeam = [
            { id: 1, name: "James Anderson", role: "CEO & Founder", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400", bio: "Visionary leader with 15+ years driving digital transformation.", linkedin: "#", github: "#", twitter: "#" },
            { id: 2, name: "Sarah Lin", role: "CTO", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400", bio: "Cloud architecture expert passionate about AI innovation.", linkedin: "#", github: "#", twitter: "#" },
            { id: 3, name: "Michael Chen", role: "Lead Developer", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400", bio: "Full-stack wizard specializing in scalable enterprise solutions.", linkedin: "#", github: "#", twitter: "#" },
            { id: 4, name: "Emily Davis", role: "Head of Design", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400", bio: "Award-winning designer creating intuitive user experiences.", linkedin: "#", github: "#", twitter: "#" }
          ];
          setTeam(defaultTeam);
        }
      } catch (e) {
        console.error("Failed to load team", e);
      }
    };

    loadTeam();
  }, []);

  return (
    <div className="min-h-screen bg-[#030712] relative overflow-hidden font-sans">
      <SEO
        title="About Us"
        description="Learn about Vertex Global Tech's mission to innovate and transform the digital landscape. Meet our expert team and explore our journey."
        keywords="about vertex global tech, company story, digital agency values"
      />

      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10">
        <PageHero
          title="Building Your Digital Future"
          highlight="Digital Future"
          subtitle="We are a collective of thinkers and makers. We turn complex business challenges into simple, effective digital solutions."
          badge="About Us"
        />

        <div className="container mx-auto px-6">
          {/* Stats Section */}
          <section className="py-16 border-y border-white/5 bg-[#050b14]/50 backdrop-blur-md rounded-2xl mb-24">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 font-['Montserrat']">
                    <Counter from={0} to={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-[10px] text-blue-400 uppercase tracking-widest font-black">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Mission & Vision Section */}
          <section className="pb-32">
            <div className="grid md:grid-cols-2 gap-12 mb-24">
              {/* Mission Card */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative bg-[#0f172a]/60 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-blue-500/20 hover:border-blue-500/50 transition-all duration-500 group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Iconic Detail: Animated Mesh Background (CSS simulated) */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -mr-32 -mt-32 group-hover:bg-blue-500/20 transition-all duration-700"></div>

                <div className="relative z-10">
                  <div className="w-20 h-20 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 mb-8 border border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.1)] group-hover:shadow-[0_0_50px_rgba(59,130,246,0.3)] group-hover:scale-110 transition-all duration-500">
                    <FaRocket size={36} />
                  </div>

                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-[2px] w-12 bg-blue-500"></div>
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter group-hover:text-blue-400 transition-colors">Our Mission</h2>
                  </div>

                  <p className="text-gray-400 leading-relaxed font-medium text-lg">
                    To empower businesses through digital transformation, providing cutting-edge solutions that drive growth and innovation in an ever-evolving technological landscape.
                  </p>
                </div>
              </motion.div>

              {/* Vision Card */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="relative bg-[#0f172a]/60 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-purple-500/20 hover:border-purple-500/50 transition-all duration-500 group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-bl from-purple-600/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Iconic Detail: Animated Mesh Background */}
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] -ml-32 -mb-32 group-hover:bg-purple-500/20 transition-all duration-700"></div>

                <div className="relative z-10">
                  <div className="w-20 h-20 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-500 mb-8 border border-purple-500/20 shadow-[0_0_30px_rgba(168,85,247,0.1)] group-hover:shadow-[0_0_50px_rgba(168,85,247,0.3)] group-hover:scale-110 transition-all duration-500">
                    <FaEye size={36} />
                  </div>

                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-[2px] w-12 bg-purple-500"></div>
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter group-hover:text-purple-400 transition-colors">Our Vision</h2>
                  </div>

                  <p className="text-gray-400 leading-relaxed font-medium text-lg">
                    To be the global catalyst for digital excellence, creating a ecosystem where technology serves as the bridge between ambitious dreams and tangible reality.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>
        </div>

        {/* --- NEW CONTENT SECTIONS --- */}
        <Values />
        <Timeline />
        <GlobalReach />
        <Process />

        <div className="container mx-auto px-6">
          {/* Leadership Section */}
          <section className="pb-32 relative">
            {/* Decorative Background Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent opacity-50 blur-3xl pointer-events-none"></div>

            <div className="text-center mb-24 relative z-10">
              <span className="text-blue-500 font-black tracking-[0.3em] uppercase text-[10px] mb-4 block">Leadership</span>
              <h2 className="text-5xl md:text-6xl font-black text-white mb-8 uppercase tracking-tight font-['Montserrat']">
                Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Visionaries</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)]"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-10 lg:gap-14">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
                  className="group relative"
                >
                  {/* Premium ID Card Container */}
                  <div className="relative aspect-[3/4] overflow-hidden rounded-[2.5rem] bg-[#0f172a] border border-white/10 hover:border-blue-500/50 transition-all duration-700 shadow-2xl group-hover:shadow-[0_0_50px_rgba(59,130,246,0.2)] group-hover:-translate-y-2">

                    {/* Image with seamless transitions */}
                    <img
                      src={member.image}
                      alt={member.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    />

                    {/* Gradient Overlay - Always visible but intensifies on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>

                    {/* Tech Pattern Overlay (Subtle) */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none"></div>

                    {/* Content Area */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end h-full">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        {/* Visionary Badge */}
                        <div className="flex items-center gap-2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-y-4 group-hover:translate-y-0">
                          <div className="bg-blue-600/20 backdrop-blur-sm border border-blue-500/30 px-3 py-1 rounded-full flex items-center gap-2">
                            <FaBolt className="text-blue-400 text-[10px]" />
                            <span className="text-[10px] font-bold text-blue-300 uppercase tracking-widest">Visionary</span>
                          </div>
                        </div>

                        <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-2 group-hover:text-blue-400 transition-colors">{member.name}</h3>

                        <div className="flex items-center gap-3 mb-6">
                          <div className="h-[2px] w-8 bg-blue-500 transition-all duration-500 group-hover:w-16"></div>
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{member.role}</p>
                        </div>

                        {/* Social Hub - Always Visible */}
                        <div className="flex gap-4 mt-4">
                          {[
                            { icon: FaLinkedinIn, link: member.linkedin, color: 'text-[#0077b5]' },
                            { icon: FaGithub, link: member.github, color: 'text-white' },
                            { icon: FaTwitter, link: member.twitter, color: 'text-[#1da1f2]' }
                          ].map((social, i) => (
                            <motion.a
                              key={i}
                              href={social.link || "#"}
                              whileHover={{ scale: 1.2, y: -2 }}
                              className={`text-xl ${social.color} hover:brightness-125 transition-all`}
                            >
                              <social.icon />
                            </motion.a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
export default About;
