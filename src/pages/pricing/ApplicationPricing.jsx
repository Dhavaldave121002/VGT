import React, { useState } from 'react';
import { api } from '../../utils/api';
import { motion } from 'framer-motion';
import PricingModal from '../../components/Pricing/PricingModal';
import ServiceHero3D from '../../components/UI/ServiceHero3D';
import SEO from '../../components/SEO';
import PricingComparisonTable from '../../components/Pricing/PricingComparisonTable';
import ServiceFAQ from '../../components/Services/ServiceFAQ';

export default function ApplicationPricing() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');

  // DEFAULT DATA
  const DEFAULT_PLANS = [
    { name: 'MVP Launch', price: '$10,000', desc: 'Validate your idea with a core product built for speed.', features: ['Core Feature Set', 'Mobile Responsive', 'Admin Dashboard', '3 Months Support', 'Basic Analytics'] },
    { name: 'Scale & Grow', price: '$25,000', desc: 'Secure, high-performance platform for growing user bases.', features: ['Advanced Features', 'API Integration', 'Real-time Datasets', 'Role-Based Access', 'Automated Testing Suite'] },
    { name: 'Enterprise Platform', price: 'Custom', desc: 'Mission-critical infrastructure for large organizations.', features: ['Microservices Architecture', '99.9% SLA', 'On-premise / Hybrid', 'Full Security Audit', '24/7 Dedicated Support'] }
  ];

  const DEFAULT_TABLE = [
    {
      category: 'Architecture',
      items: [
        { name: 'Tech Stack', values: ['React/Node', 'MERN/Next.js', 'Custom Stack'] },
        { name: 'Database', values: ['Shared MongoDB', 'Dedicated Cluster', 'Multi-Region'] },
        { name: 'Cloud Provider', values: ['DigitalOcean', 'AWS / Google Cloud', 'Custom / Hybrid'] },
      ]
    },
    {
      category: 'Functionality',
      items: [
        { name: 'User Authentication', values: ['Email/Pass', 'Social Login', 'SSO/MFA'] },
        { name: 'Payment Integration', values: ['Stripe Basic', 'Stripe Connect', 'Multi-Gateway'] },
        { name: 'Real-time Features', values: [false, 'Socket.io', 'Advanced Pub/Sub'] },
        { name: 'Admin Dashboard', values: ['Basic', 'Advanced', 'Custom Analytics'] },
      ]
    },
    {
      category: 'Delivery',
      items: [
        { name: 'Timeline', values: ['4-6 Weeks', '8-12 Weeks', 'Custom'] },
        { name: 'QA Testing', values: ['Manual', 'Automated Unit', 'Full E2E Suite'] },
        { name: 'Warranty', values: ['1 Month', '3 Months', '1 Year'] },
      ]
    }
  ];

  const DEFAULT_FAQS = [
    { q: "What is an MVP?", a: "MVP stands for Minimum Viable Product. It includes the essential features needed to launch your idea and gather user feedback without over-investing initially." },
    { q: "Do I own the code?", a: "Yes, once the project is fully paid for, you own 100% of the source code and intellectual property." },
    { q: "How do you handle hosting?", a: "We can set up hosting on your preferred cloud provider (AWS, Google Cloud, etc.) and hand over the credentials, or manage it for you." },
  ];

  const [plans, setPlans] = useState(DEFAULT_PLANS);
  const [tableFeatures, setTableFeatures] = useState(DEFAULT_TABLE);
  const [customFaqs, setCustomFaqs] = useState(DEFAULT_FAQS);

  // Load Data
  // Load Data
  React.useEffect(() => {
    const loadData = async () => {
      try {
        // 1. Fetch Plans
        const allPlans = await api.fetchAll('pricing');
        if (allPlans && Array.isArray(allPlans)) {
          const myPlans = allPlans
            .filter(p => p.type === 'application')
            .map(p => ({
              ...p,
              features: typeof p.features === 'string' ? JSON.parse(p.features) : p.features
            }));
          if (myPlans.length > 0) setPlans(myPlans.sort((a, b) => a.id - b.id));
        }

        // 2. Fetch Comparison
        const comp = await api.fetchConfig('pricing_comparison_application');
        if (comp) setTableFeatures(comp);

        // 3. Fetch FAQs
        const allFaqs = await api.fetchAll('pricing_faqs');
        if (allFaqs && Array.isArray(allFaqs)) {
          const myFaqs = allFaqs.filter(f => f.type === 'application');
          if (myFaqs.length > 0) setCustomFaqs(myFaqs);
        }
      } catch (error) {
        console.error("Failed to load pricing data:", error);
      }
    };

    loadData();
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
  };

  const handleSelectPlan = (planName) => {
    setSelectedPlan(planName);
    setModalOpen(true);
  };

  return (
    <>
      <SEO
        title="Mobile Application Cost"
        description="Scalable pricing plans for mobile application development. From MVPs to Enterprise SaaS platforms."
        keywords="mobile application cost, saas pricing, software development rates, mvp cost"
      />

      <div className="min-h-screen bg-[#030712]">

        <ServiceHero3D
          title="Mobile Application"
          highlight="Pricing"
          badge="Investment"
          subtitle="Invest in scalable software that grows with your business."
          laptopImage="https://images.unsplash.com/photo-1504868584819-f8e906b35795?auto=format&fit=crop&q=80&w=1200"
          phoneImage="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600"
        />

        {/* Pricing Cards */}
        <section className="py-20 bg-[#0f172a]/30">
          <div className="container mx-auto px-6 max-w-7xl">
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8"
            >
              {plans.map((plan, i) => (
                <motion.div
                  key={i}
                  variants={item}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className={`bg-[#0f172a] p-8 rounded-2xl border ${i === 1 ? 'border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.2)]' : 'border-white/5'} hover:border-red-500/30 transition-all flex flex-col group relative overflow-hidden`}
                >
                  {i === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="absolute top-0 right-0 bg-red-600 text-white text-xs font-black px-3 py-1 rounded-bl-xl uppercase tracking-wider shadow-lg"
                    >
                      Best Value
                    </motion.div>
                  )}

                  <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter">{plan.name}</h3>
                  <p className="text-gray-400 text-sm mb-6 h-10 font-medium">{plan.desc}</p>
                  <div className="text-4xl font-black text-red-500 mb-8 tracking-tight">{plan.price}</div>

                  <ul className="space-y-4 mb-8 flex-grow">
                    {plan.features.map((feat, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + (idx * 0.1) }}
                        className="flex items-center text-gray-300 font-medium text-sm"
                      >
                        <span className="text-red-500 mr-3 text-lg"><i className="bi bi-check2"></i></span>
                        {feat}
                      </motion.li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleSelectPlan(plan.name)}
                    className={`w-full block text-center py-4 rounded-xl font-black uppercase text-xs tracking-[0.2em] transition-all transform group-hover:scale-105 ${i === 1 ? 'bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-900/40' : 'bg-white/5 text-white hover:bg-white/10 hover:border-white/20 border border-transparent'}`}
                  >
                    Start Project
                  </button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Comparison Table */}
        <PricingComparisonTable plans={plans} features={tableFeatures} />

        {/* FAQ */}
        <ServiceFAQ category="Application Pricing" customFaqs={customFaqs} />

      </div>

      <PricingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedPlan={selectedPlan}
        planType="Application"
      />
    </>
  );
}
