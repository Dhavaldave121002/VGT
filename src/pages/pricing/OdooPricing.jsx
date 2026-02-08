import { useState, useEffect } from 'react';
import { api } from '../../utils/api';
import { motion } from 'framer-motion';
import PricingModal from '../../components/Pricing/PricingModal';
import ServiceHero3D from '../../components/UI/ServiceHero3D';
import SEO from '../../components/SEO';
import PricingComparisonTable from '../../components/Pricing/PricingComparisonTable';
import ServiceFAQ from '../../components/Services/ServiceFAQ';

const DEFAULT_ODOO_PLANS = [
  { name: 'Essentials', price: '$5,000', desc: 'Core Odoo setup for startups and small businesses.', features: ['Standard Modules Config', 'Standard CRM & Sales', 'Basic Invoicing', '3 Users Included', 'Remote Training'], isPopular: false },
  { name: 'Business Pro', price: '$12,000', desc: 'Customized ERP solution for growing enterprises.', features: ['Custom Module (1 Unit)', 'Inventory & Manufacturing', 'Advanced Accounting', 'Multi-Company Support', 'On-site Training'], isPopular: true },
  { name: 'Infinite Suite', price: 'Custom', desc: 'Full-scale digital transformation with total Odoo mastery.', features: ['Infinite Customization', 'Legacy Data Migration', 'External API Sync', 'Dedicated ERP Manager', '24/7 Priority Support'], isPopular: false }
];

const DEFAULT_ODOO_COMP = [
  {
    category: 'Architecture',
    items: [
      { name: 'Hosting Type', values: ['Odoo Online', 'Odoo.sh', 'Dedicated Server'] },
      { name: 'Support Level', values: ['Ticketing', 'Priority Support', 'Dedicated Manager'] },
      { name: 'Backup Frequency', values: ['Daily', '4x Daily', 'Real-time'] },
    ]
  },
  {
    category: 'Modules & Logic',
    items: [
      { name: 'Custom Modules', values: [false, '1 Unit', 'Infinite'] },
      { name: 'Workflow Automation', values: ['Basic', 'Advanced', 'Full Control'] },
      { name: 'Accounting', values: ['Standard', 'Advanced', 'Multi-Country'] },
    ]
  }
];

const DEFAULT_ODOO_FAQS = [
  { id: 1, q: "Odoo Online vs Odoo.sh?", a: "Odoo Online is SaaS-based and doesn't allow custom code. Odoo.sh is a cloud platform that allows full customization and Git integration." },
  { id: 2, q: "How long does implementation take?", a: "A standard implementation takes 4-8 weeks, while complex migrations can take 3-6 months depending on data volume." },
  { id: 3, q: "Do I own my Odoo data?", a: "Yes, you have full ownership of your data and can export it at any time." }
];

export default function OdooPricing() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');

  const [plans, setPlans] = useState(DEFAULT_ODOO_PLANS);
  const [tableFeatures, setTableFeatures] = useState(DEFAULT_ODOO_COMP);
  const [customFaqs, setCustomFaqs] = useState(DEFAULT_ODOO_FAQS);

  useEffect(() => {
    const loadData = async () => {
      try {
        // 1. Fetch Plans
        const allPlans = await api.fetchAll('pricing');
        if (allPlans && Array.isArray(allPlans)) {
          const myPlans = allPlans
            .filter(p => p.type === 'odoo')
            .map(p => ({
              ...p,
              features: typeof p.features === 'string' ? JSON.parse(p.features) : p.features
            }));
          if (myPlans.length > 0) setPlans(myPlans.sort((a, b) => a.id - b.id));
        }

        // 2. Fetch Comparison
        const comp = await api.fetchConfig('pricing_comparison_odoo');
        if (comp) setTableFeatures(comp);

        // 3. Fetch FAQs
        const allFaqs = await api.fetchAll('pricing_faqs');
        if (allFaqs && Array.isArray(allFaqs)) {
          const myFaqs = allFaqs.filter(f => f.type === 'odoo');
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
      transition: { staggerChildren: 0.1 }
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
        title="Odoo ERP Pricing"
        description="Transparent pricing for Odoo ERP customization and implementation. Packages for startups, growing businesses, and enterprise."
        keywords="odoo cost, erp implementation price, odoo customization fees, enterprise software pricing"
      />

      <div className="min-h-screen bg-[#030712]">
        <ServiceHero3D
          title="Odoo ERP Plans"
          highlight="Pricing"
          badge="Enterprise Grade"
          subtitle="Strategic investments for optimized business intelligence and automation."
          laptopImage="https://images.unsplash.com/photo-1551288049-bbbda546697a?auto=format&fit=crop&q=80&w=1000"
          phoneImage="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=500"
        />

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
                  className={`bg-[#0f172a] p-8 rounded-2xl border ${plan.isPopular ? 'border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.2)]' : 'border-white/5'} hover:border-purple-500/30 transition-all flex flex-col group relative overflow-hidden`}
                >
                  {plan.isPopular && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="absolute top-0 right-0 bg-purple-600 text-white text-xs font-black px-3 py-1 rounded-bl-xl uppercase tracking-wider shadow-lg"
                    >
                      Most Popular
                    </motion.div>
                  )}

                  <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter">{plan.name}</h3>
                  <p className="text-gray-400 text-sm mb-6 h-10 font-medium">{plan.desc}</p>
                  <div className="text-4xl font-black text-purple-400 mb-8 tracking-tight">{plan.price}</div>

                  <ul className="space-y-4 mb-8 flex-grow">
                    {plan.features.map((feat, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + (idx * 0.1) }}
                        className="flex items-center text-gray-300 font-medium text-sm"
                      >
                        <span className="text-purple-500 mr-3 text-lg"><i className="bi bi-check2"></i></span>
                        {feat}
                      </motion.li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleSelectPlan(`Odoo ${plan.name}`)}
                    className={`w-full block text-center py-4 rounded-xl font-black uppercase text-xs tracking-[0.2em] transition-all transform group-hover:scale-105 ${plan.isPopular ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg shadow-purple-900/40' : 'bg-white/5 text-white hover:bg-white/10 hover:border-white/20 border border-transparent'}`}
                  >
                    Select Node
                  </button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <PricingComparisonTable plans={plans} features={tableFeatures} />
        <ServiceFAQ category="Odoo Pricing" customFaqs={customFaqs} />
      </div>

      <PricingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedPlan={selectedPlan}
        planType="Odoo ERP"
      />
    </>
  );
}
