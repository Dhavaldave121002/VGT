import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import HomeHero from '../components/UI/HomeHero';
import HomeAbout from '../components/UI/HomeAbout';

// Redesigned with HomeHero for unique look
const HeroSection = () => null;

const FeatureCard = ({ icon, title, desc, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="p-8 rounded-3xl bg-[#0f172a]/40 border border-white/5 hover:border-blue-500/30 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 group relative overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative z-10">
      <div className="w-16 h-16 rounded-2xl bg-blue-500/5 flex items-center justify-center text-blue-400 text-3xl mb-8 group-hover:scale-110 group-hover:bg-blue-500/10 transition-all duration-500 ring-1 ring-white/5">
        <i className={`bi bi-${icon}`}></i>
      </div>
      <h3 className="text-2xl font-black text-white mb-4 tracking-tight">{title}</h3>
      <p className="text-gray-400 leading-relaxed font-medium">{desc}</p>
    </div>
  </motion.div>
);



const FeaturesSection = () => (
  <section className="py-24 bg-[#030712] relative">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Our Core Expertise</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          We combine cutting-edge technology with industry best practices to deliver superior results.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard
          icon="speedometer2"
          title="Fast & Efficient"
          desc="We build websites that load instantly and run smoothly on any device."
          delay={0.1}
        />
        <FeatureCard
          icon="shield-check"
          title="Top-Tier Security"
          desc="Your data is safe with us. We use the latest security standards to protect your business."
          delay={0.2}
        />
        <FeatureCard
          icon="layers"
          title="Built for Growth"
          desc="Start small and grow big. Our solutions scale effortlessly as your business expands."
          delay={0.3}
        />
        <FeatureCard
          icon="palette"
          title="Modern Design"
          desc="Beautiful, award-winning designs that capture attention and drive engagement."
          delay={0.4}
        />
        <FeatureCard
          icon="phone"
          title="Mobile First"
          desc="Perfectly responsive layouts that look great on phones, tablets, and desktops."
          delay={0.5}
        />
        <FeatureCard
          icon="cloud"
          title="Cloud Ready"
          desc="Reliable and accessible from anywhere in the world using modern cloud technology."
          delay={0.6}
        />
      </div>
    </div>
  </section>
);

import Counter from '../components/UI/Counter';

const StatsSection = () => (
  <section className="py-24 bg-[#030712] relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05)_0%,transparent_70%)]" />
    <div className="container mx-auto px-6 relative z-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
        {[
          { to: 500, suffix: "+", label: "Projects Completed", icon: "briefcase" },
          { to: 98, suffix: "%", label: "Client Satisfaction", icon: "heart" },
          { to: 10, suffix: "+", label: "Years Experience", icon: "clock" },
          { to: 24, suffix: "/7", label: "Expert Support", icon: "headset" }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="p-8 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-sm text-center group hover:bg-white/10 transition-all duration-500"
          >
            <div className="text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 mb-4 tracking-tighter">
              <Counter from={0} to={stat.to} suffix={stat.suffix} />
            </div>
            <div className="text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px]">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const CTASection = () => (
  <section className="py-24 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 z-0"></div>
    <div className="container mx-auto px-6 relative z-10 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto bg-[#0f172a]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-12 shadow-2xl"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Digital Presence?</h2>
        <p className="text-gray-300 mb-8 leading-relaxed">
          Join hundreds of successful businesses that have partnered with Vertex Global Tech. Let's build something extraordinary together.
        </p>
        <Link
          to="/contact"
          className="inline-block px-10 py-4 rounded-full bg-white text-blue-900 font-bold text-lg hover:bg-gray-100 transition-all shadow-lg transform hover:-translate-y-1"
        >
          Get Free Consultation
        </Link>
      </motion.div>
    </div>
  </section>
);

import TestimonialCarousel from '../components/UI/TestimonialCarousel';
import Typewriter from '../components/UI/Typewriter';
import BrandCarousel from '../components/UI/BrandCarousel';

const TestimonialsSection = () => (
  <section className="py-24 bg-[#030712] relative overflow-hidden">
    <div className="container mx-auto px-6 relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Client Success Stories</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Don't just take our word for it. Here's what our partners have to say.
        </p>
      </div>
      <TestimonialCarousel />
    </div>
  </section>
);

export default function Home() {
  return (
    <>
      <SEO
        title="Home"
        description="Vertex Global Tech - Premium Digital Solutions, Web Development, and Corporate Branding services. We build the future of digital experience."
        keywords="web development, app development, digital agency, vertex global tech, software solutions"
      />
      <div className="bg-[#030712] min-h-screen overflow-x-hidden pt-0">
        <HomeHero />
        <StatsSection />
        <BrandCarousel />
        <HomeAbout />
        <FeaturesSection />
        <TestimonialsSection />
        <CTASection />
      </div>
    </>
  );
}

