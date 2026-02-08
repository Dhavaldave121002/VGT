import React, { useState, useEffect } from 'react';
import { api } from '../../utils/api';
import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';
import PricingModal from '../../components/Pricing/PricingModal';
import ServiceHero3D from '../../components/UI/ServiceHero3D';
import SEO from '../../components/SEO';
import PricingComparisonTable from '../../components/Pricing/PricingComparisonTable';
import ServiceFAQ from '../../components/Services/ServiceFAQ';

export default function SocialPricing() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');

  // DEFAULT DATA
  const DEFAULT_PLANS = [
    { name: 'Ignition', price: '$1,200', desc: 'Essential presence for growing brands.', features: ['1 Platform Managed', '3 Posts / Week', 'Community Management', 'Monthly Analytics', 'Content Creation'], isPopular: false },
    { name: 'Growth', price: '$2,500', desc: 'Aggressive growth and engagement strategy.', features: ['3 Platforms Managed', '5 Posts / Week', 'Reels / TikToks Production', 'Influencer Outreach', 'Paid Ad Management (Setup)'], isPopular: true },
    { name: 'Viral Corp', price: 'Custom', desc: 'Full-scale domination and brand authority.', features: ['5+ Platforms Managed', 'Daily Content & Stories', 'Dedicated AC', 'Crisis Management', 'advanced Ad Scaling', '24/7 Monitoring'], isPopular: false }
  ];

  const DEFAULT_COMP = [
    { category: 'Content', items: [{ name: 'Posts per Week', values: ['3', '5', 'Daily'] }, { name: 'Video/Reels', values: [false, 'Weekly', 'Daily'] }] },
    { category: 'Growth', items: [{ name: 'Community Man.', values: ['Basic', 'Active', '24/7'] }, { name: 'Ad Management', values: [false, 'Setup Only', 'Full Scale'] }] }
  ];

  const DEFAULT_FAQS = [
    { q: 'Is ad spend included?', a: 'No, ad spend is paid directly to the platform (Meta/LinkedIn/TikTok). Our fee covers strategy, creation, and management.' },
    { q: 'What is the contract length?', a: 'We recommend a minimum of 3 months to see significant results, as social algorithms take time to optimize.' }
  ];

  const [plans, setPlans] = useState(DEFAULT_PLANS);
  const [tableFeatures, setTableFeatures] = useState(DEFAULT_COMP);
  const [customFaqs, setCustomFaqs] = useState(DEFAULT_FAQS);

  // Load Data
  // Load Data
  useEffect(() => {
    const loadData = async () => {
      try {
        // 1. Fetch Plans
        const allPlans = await api.fetchAll('pricing');
        if (allPlans && Array.isArray(allPlans)) {
          const myPlans = allPlans
            .filter(p => p.type === 'social')
            .map(p => ({
              ...p,
              features: typeof p.features === 'string' ? JSON.parse(p.features) : p.features
            }));
          if (myPlans.length > 0) setPlans(myPlans.sort((a, b) => a.id - b.id));
        }

        // 2. Fetch Comparison
        const comp = await api.fetchConfig('pricing_comparison_social');
        if (comp) setTableFeatures(comp);

        // 3. Fetch FAQs
        const allFaqs = await api.fetchAll('pricing_faqs');
        if (allFaqs && Array.isArray(allFaqs)) {
          const myFaqs = allFaqs.filter(f => f.type === 'social');
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
        title="Social Media Pricing"
        description="Transparent pricing for Vertex Global Tech's social media marketing services. Choose the plan that fits your growth goals."
        keywords="smm pricing, social media packages, marketing agency rates"
      />

      <div className="min-h-screen bg-[#030712]">

        <ServiceHero3D
          title="Social Media"
          highlight="Pricing"
          badge="Social Domination"
          subtitle="Choose a protocol that aligns with your brand's velocity. No hidden fees, just results."
          laptopImage="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1200"
          phoneImage="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&q=80&w=600"
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
                  className={`bg-[#0f172a] p-8 rounded-2xl border ${plan.isPopular ? 'border-pink-500 shadow-[0_0_30px_rgba(236,72,153,0.2)]' : 'border-white/5'} hover:border-pink-500/30 transition-all flex flex-col group relative overflow-hidden`}
                >
                  {plan.isPopular && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="absolute top-0 right-0 bg-pink-600 text-white text-xs font-black px-3 py-1 rounded-bl-xl uppercase tracking-wider shadow-lg"
                    >
                      Most Popular
                    </motion.div>
                  )}

                  <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter">{plan.name}</h3>
                  <p className="text-gray-400 text-sm mb-6 h-10 font-medium">{plan.desc}</p>
                  <div className="text-4xl font-black text-pink-500 mb-8 tracking-tight">{plan.price}</div>

                  <ul className="space-y-4 mb-8 flex-grow">
                    {plan.features.map((feat, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + (idx * 0.1) }}
                        className="flex items-center text-gray-300 font-medium text-sm"
                      >
                        <span className="text-pink-500 mr-3 text-lg"><i className="bi bi-check2"></i></span>
                        {feat}
                      </motion.li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleSelectPlan(plan.name)}
                    className={`w-full block text-center py-4 rounded-xl font-black uppercase text-xs tracking-[0.2em] transition-all transform group-hover:scale-105 ${plan.isPopular ? 'bg-pink-600 text-white hover:bg-pink-700 shadow-lg shadow-pink-900/40' : 'bg-white/5 text-white hover:bg-white/10 hover:border-white/20 border border-transparent'}`}
                  >
                    Select Plan
                  </button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Comparison Table */}
        <PricingComparisonTable plans={plans} features={tableFeatures} />

        {/* FAQ */}
        <ServiceFAQ category="Social Media" customFaqs={customFaqs} />

      </div>

      <PricingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedPlan={selectedPlan}
        planType="Social Media"
      />
    </>
  );
}
