import React, { useState, useEffect } from 'react';
import { api } from '../../utils/api';
import { motion } from 'framer-motion';
import PricingModal from '../../components/Pricing/PricingModal';
import ServiceHero3D from '../../components/UI/ServiceHero3D';
import SEO from '../../components/SEO';
import PricingComparisonTable from '../../components/Pricing/PricingComparisonTable';
import ServiceFAQ from '../../components/Services/ServiceFAQ';

const DEFAULT_PLANS = [
  { name: 'Starter', price: '$2,500', desc: 'Perfect for small businesses establishing a digital presence.', features: ['Unique 5-Page Design', 'Mobile-Responsive', 'Google Search Setup', 'Contact Form Integration', 'Fast Loading Speed'], isPopular: false },
  { name: 'Business', price: '$5,000', desc: 'Comprehensive solution for growing companies.', features: ['Easy-to-Edit Dashboard', '15 Pages', 'Rank Higher Package', 'Blog / News Section', 'Visitor Analytics', 'Social Media Sync'], isPopular: true },
  { name: 'Enterprise', price: 'Custom', desc: 'Full-scale digital platforms with custom functionality.', features: ['Fully Custom Functionality', 'Unlimited Pages', 'Priority VIP Support', 'Guaranteed Uptime', 'Advanced Security Suite', 'Dedicated Manager'], isPopular: false }
];

const DEFAULT_COMP = [
  {
    category: 'Development',
    items: [
      { name: 'Number of Pages', values: ['5', '15', 'Unlimited'] },
      { name: 'Responsive Design', values: [true, true, true] },
      { name: 'CMS Integration', values: [false, 'WordPress/Strapi', 'Custom/Headless'] },
      { name: 'Custom Animations', values: ['Basic', 'Advanced', 'Premium 3D'] },
    ]
  },
  {
    category: 'Marketing & SEO',
    items: [
      { name: 'SEO Setup', values: ['Basic', 'Advanced', 'Enterprise'] },
      { name: 'Google Analytics', values: [true, true, true] },
      { name: 'Social Media Integration', values: [true, true, true] },
      { name: 'Conversion Optimization', values: [false, true, true] },
    ]
  },
  {
    category: 'Support',
    items: [
      { name: 'Post-Launch Support', values: ['2 Weeks', '1 Month', '3 Months'] },
      { name: 'Training Session', values: [false, '1 Hour', 'Unlimited'] },
      { name: 'Dedicated Manager', values: [false, true, true] },
    ]
  }
];

const DEFAULT_FAQS = [
  { id: 1, q: "What is included in the Starter plan?", a: "The Starter plan includes a custom-designed 5-page website, mobile responsiveness, basic SEO setup, and a contact form. It's ideal for brochures or portfolio sites." },
  { id: 2, q: "Can I upgrade later?", a: "Yes, you can upgrade your plan at any time. We'll simply charge the difference and implement the additional features." },
  { id: 3, q: "Do you use templates?", a: "No, all our websites are custom-designed to match your brand identity. We do not use generic templates." },
  { id: 4, q: "What are the payment terms?", a: "We typically require a 50% deposit to start, with the remaining 50% due upon launch." }
];

export default function WebsitePricing() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');

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
            .filter(p => p.type === 'website')
            .map(p => ({
              ...p,
              features: typeof p.features === 'string' ? JSON.parse(p.features) : p.features
            }));
          if (myPlans.length > 0) setPlans(myPlans.sort((a, b) => a.id - b.id)); // Ensure stable order
        }

        // 2. Fetch Comparison
        const comp = await api.fetchConfig('pricing_comparison_website');
        if (comp) setTableFeatures(comp);

        // 3. Fetch FAQs
        const allFaqs = await api.fetchAll('pricing_faqs');
        if (allFaqs && Array.isArray(allFaqs)) {
          const myFaqs = allFaqs.filter(f => f.type === 'website');
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
        title="Website Design Pricing"
        description="Clear, transparent pricing for custom website design. Packages for startups, growing businesses, and enterprise."
        keywords="website cost, web design pricing, web development packages, startup website price"
      />

      <div className="min-h-screen bg-[#030712]">

        <ServiceHero3D
          title="Website Packages"
          highlight="Pricing"
          badge="Invest in Quality"
          subtitle="Transparent investments for high-performance digital assets."
          laptopImage="https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=1200"
          phoneImage="https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=600"
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
                  className={`bg-[#0f172a] p-8 rounded-2xl border ${plan.isPopular ? 'border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.2)]' : 'border-white/5'} hover:border-blue-500/30 transition-all flex flex-col group relative overflow-hidden`}
                >
                  {plan.isPopular && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-black px-3 py-1 rounded-bl-xl uppercase tracking-wider shadow-lg"
                    >
                      Most Popular
                    </motion.div>
                  )}

                  <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter">{plan.name}</h3>
                  <p className="text-gray-400 text-sm mb-6 h-10 font-medium">{plan.desc}</p>
                  <div className="text-4xl font-black text-blue-400 mb-8 tracking-tight">{plan.price}</div>

                  <ul className="space-y-4 mb-8 flex-grow">
                    {plan.features.map((feat, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + (idx * 0.1) }}
                        className="flex items-center text-gray-300 font-medium text-sm"
                      >
                        <span className="text-blue-500 mr-3 text-lg"><i className="bi bi-check2"></i></span>
                        {feat}
                      </motion.li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleSelectPlan(plan.name)}
                    className={`w-full block text-center py-4 rounded-xl font-black uppercase text-xs tracking-[0.2em] transition-all transform group-hover:scale-105 ${plan.isPopular ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-900/40' : 'bg-white/5 text-white hover:bg-white/10 hover:border-white/20 border border-transparent'}`}
                  >
                    Choose Plan
                  </button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Comparison Table */}
        <PricingComparisonTable plans={plans} features={tableFeatures} />

        {/* FAQ */}
        <ServiceFAQ category="Pricing" customFaqs={customFaqs} />

      </div>

      <PricingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedPlan={selectedPlan}
        planType="Website"
      />
    </>
  );
}
