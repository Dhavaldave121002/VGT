import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-white/10 rounded-2xl bg-[#0f172a] overflow-hidden mb-4 hover:border-blue-500/30 transition-colors">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
      >
        <span className="text-lg md:text-xl font-semibold text-white">{question}</span>
        <span className={`text-2xl text-blue-500 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <i className="bi bi-chevron-down"></i>
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ServiceFAQ = ({ category = "General", customFaqs }) => {
  const defaultFaqs = [
    { q: "How long does a typical project take?", a: "Timelines vary by complexity. A standard website takes 2-4 weeks, while custom SaaS applications can take 8-12 weeks. We provide a detailed Gantt chart during the discovery phase." },
    { q: "Do you provide post-launch support?", a: "Yes, we offer complimentary 30-day support after launch. We also have dedicated monthly maintenance packages to keep your software secure and up-to-date." },
    { q: "What technologies do you use?", a: "We specialize in the MERN stack (MongoDB, Express, React, Node.js) for web apps, and React Native/Flutter for mobile. We choose the best tool for your specific scalability needs." },
    { q: "Can you help with legacy code?", a: "Absolutely. We can audit, refactor, and modernize your existing codebase to improve performance and security without interrupting your business operations." },
  ];

  const faqs = (customFaqs && customFaqs.length > 0) ? customFaqs : defaultFaqs;

  return (
    <section className="py-20 bg-[#020617]">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-12">
          Frequently Asked <span className="text-blue-500">Questions</span>
        </h2>

        <div>
          {faqs.map((item, i) => (
            <FAQItem key={i} question={item.q} answer={item.a} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceFAQ;
