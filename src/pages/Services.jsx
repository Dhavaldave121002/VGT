import React from 'react';
import { api } from '../utils/api';
import { motion } from 'framer-motion';
import { FaGlobe, FaCogs, FaShoppingCart, FaMobileAlt, FaPalette, FaTools, FaArrowRight } from 'react-icons/fa';
import PageHero from '../components/UI/PageHero';
import SEO from '../components/SEO';

const ServiceCard = ({ icon: Icon, title, description, delay, features }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="group relative p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all duration-500 overflow-hidden"
  >
    {/* Background Glow */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[60px] group-hover:bg-blue-500/10 transition-colors"></div>

    <div className="relative z-10">
      <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 text-3xl mb-8 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-500">
        <Icon />
      </div>
      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">{title}</h3>
      <p className="text-gray-400 mb-8 leading-relaxed">{description}</p>

      <ul className="space-y-3 mb-8">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-3 text-sm text-gray-500 group-hover:text-gray-300 transition-colors">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500/40"></div>
            {feature}
          </li>
        ))}
      </ul>

      <button className="flex items-center gap-2 text-sm font-bold text-blue-500 uppercase tracking-widest group/btn">
        Learn More
        <FaArrowRight className="group-hover/btn:translate-x-2 transition-transform" />
      </button>
    </div>
  </motion.div>
);

export default function Services() {
  const [services, setServices] = React.useState([
    {
      icon: FaGlobe,
      title: "Informative Website",
      description: "Establish a powerful online presence with high-performance, SEO-optimized business websites.",
      features: ["Responsive Design", "SEO Optimized", "Content Strategy", "Fast Loading"],
      delay: 0.1,
      slug: 'informative'
    },
    {
      icon: FaCogs,
      title: "Dynamic Website",
      description: "Scale your operations with CMS-driven portals and feature-rich interactive web platforms.",
      features: ["Custom Dashboards", "User Auth", "Real-time Data", "Scalable Architecture"],
      delay: 0.2,
      slug: 'dynamic'
    },
    {
      icon: FaShoppingCart,
      title: "E-Commerce Solution",
      description: "Drive sales with secure, high-converting online stores tailored to your business needs.",
      features: ["Payment Integration", "Inventory Management", "Secure Checkout", "Analytics"],
      delay: 0.3,
      slug: 'ecommerce'
    },
    {
      icon: FaMobileAlt,
      title: "Application Development",
      description: "Reach your users anywhere with native and cross-platform mobile app solutions.",
      features: ["iOS & Android", "Cloud Sync", "Push Notifications", "App Store Support"],
      delay: 0.4,
      slug: 'application'
    },
    {
      icon: FaPalette,
      title: "UI/UX Design",
      description: "Crafting beautiful, intuitive interfaces that prioritize user experience and brand identity.",
      features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
      delay: 0.5,
      slug: 'uiux'
    },
    {
      icon: FaTools,
      title: "Maintenance",
      description: "Ensure your systems remain secure, up-to-date, and peak-performing with our care plans.",
      features: ["Security Patches", "Performance Tuning", "Regular Backups", "Technical Support"],
      delay: 0.6,
      slug: 'maintenance'
    },
    {
      icon: FaCogs,
      title: "Website Redesign",
      description: "Breath new life into your digital presence with cutting-edge design and performance.",
      features: ["Performance Boost", "Mobile Revamp", "SEO Recovery", "Modern Stack"],
      delay: 0.7,
      slug: 'redesign'
    }
  ]);

  React.useEffect(() => {
    const loadServices = async () => {
      // Create an array of promises to fetch config for each service
      const promises = services.map(async (service) => {
        const key = `service_config_${service.slug}`;
        const data = await api.fetchConfig(key);
        if (data) {
          return {
            ...service,
            title: data.name || service.title, // Note: Manager saves 'name', public uses 'title'
            description: data.desc || service.description, // Manager might use 'desc' or similar? 
            features: data.features ? data.features.map(f => f.title) : service.features
          };
        }
        return service;
      });

      const updatedServices = await Promise.all(promises);
      setServices(updatedServices);
    };

    loadServices();
  }, []);

  return (
    <div className="min-h-screen bg-[#030712] relative overflow-hidden">
      <SEO
        title="Our Services"
        description="Comprehensive digital solutions from web development to mobile apps and UI/UX design."
        keywords="web development, mobile apps, ui/ux design, ecommerce solutions"
      />

      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10">
        <PageHero
          title="Innovative Solutions for the Digital Age"
          highlight="Solutions"
          subtitle="We blend creativity with technical excellence to deliver products that drive meaningful business growth."
          badge="Expertise"
        />

        <div className="container mx-auto px-6 pb-32">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
