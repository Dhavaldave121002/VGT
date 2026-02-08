import React from 'react';
import { motion } from 'framer-motion';

const ProcessTimeline = ({ customSteps }) => {
  const defaultSteps = [
    {
      num: '01',
      title: 'Discovery & Strategy',
      desc: 'We start by understanding your business goals, target audience, and specific requirements to build a solid roadmap.',
      icon: 'bi-search'
    },
    {
      num: '02',
      title: 'UX/UI Design',
      desc: 'Our designers create intuitive, high-fidelity wireframes and prototypes that align with your brand identity.',
      icon: 'bi-palette'
    },
    {
      num: '03',
      title: 'Agile Development',
      desc: 'We build your solution using modern tech stacks with regular sprints, ensuring code quality and scalability.',
      icon: 'bi-code-slash'
    },
    {
      num: '04',
      title: 'Testing & Launch',
      desc: 'Rigorous QA testing ensures a bug-free launch. We deploy your application and provide ongoing support.',
      icon: 'bi-rocket-takeoff'
    }
  ];

  const steps = customSteps && customSteps.length > 0 ? customSteps : defaultSteps;

  return (
    <section className="py-24 bg-[#020617] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Our <span className="text-blue-500">Process</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">A streamlined workflow designed to deliver excellence from concept to completion.</p>
        </div>

        <div className="relative">
          {/* Vertical Line for Tablet/Desktop */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-gradient-to-b from-blue-500/20 via-blue-500 to-blue-500/20"></div>

          <div className="space-y-12 md:space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Content Side */}
                <div className="flex-1 text-center md:text-left">
                  <div className={`flex flex-col ${index % 2 === 0 ? 'md:items-start' : 'md:items-end'} relative`}>
                    {/* Connector Line (Horizontal) - Optional visual flair */}
                    <div className={`hidden md:block absolute top-8 ${index % 2 === 0 ? '-right-8 w-8' : '-left-8 w-8'} h-[2px] bg-blue-600`}></div>

                    <div className="bg-[#0f172a] p-8 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all shadow-lg hover:shadow-blue-900/20 group w-full md:max-w-md">
                      <div className="w-16 h-16 rounded-2xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-3xl text-blue-400 mb-6 mx-auto md:mx-0 group-hover:scale-110 transition-transform">
                        <i className={`bi ${step.icon}`}></i>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">{step.title}</h3>
                      <p className="text-gray-400 leading-relaxed text-sm md:text-base">{step.desc}</p>
                    </div>
                  </div>
                </div>

                {/* Center Node */}
                <div className="relative z-10 mx-auto">
                  <div className="w-12 h-12 bg-[#020617] border-4 border-blue-600 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.5)]">
                    <span className="text-white font-bold text-xs">{step.num}</span>
                  </div>
                </div>

                {/* Empty Side for Balance */}
                <div className="flex-1 hidden md:block"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;
