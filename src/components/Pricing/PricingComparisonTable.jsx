import React from 'react';
import { motion } from 'framer-motion';

const PricingComparisonTable = ({ plans, features }) => {
  return (
    <section className="py-20 bg-[#020617] overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Compare <span className="text-blue-500">Plans</span></h2>
          <p className="text-gray-400 text-lg">Detailed breakdown of features to help you decide.</p>
        </div>

        <div className="overflow-x-auto pb-4">
          <table className="w-full min-w-[800px] border-collapse text-left">
            <thead>
              <tr>
                <th className="p-6 bg-[#0f172a] text-white rounded-tl-2xl w-1/4 sticky left-0 z-10 border-b border-white/10">Features</th>
                {plans.map((plan, i) => (
                  <th key={i} className={`p-6 bg-[#0f172a] text-xl font-bold border-b border-white/10 ${i === plans.length - 1 ? 'rounded-tr-2xl' : ''}`}>
                    <span className={plan.isPopular ? 'text-blue-400' : 'text-white'}>{plan.name}</span>
                    {plan.isPopular && <span className="block text-xs text-blue-500 font-normal mt-1 uppercase tracking-wider">Most Popular</span>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((featureCategory, catIndex) => (
                <React.Fragment key={catIndex}>
                  <tr className="bg-[#1e293b]/30">
                    <td colSpan={plans.length + 1} className="p-4 pl-6 font-bold text-blue-400 uppercase tracking-wider text-sm">
                      {featureCategory.category}
                    </td>
                  </tr>
                  {featureCategory.items.map((item, itemIndex) => (
                    <tr key={itemIndex} className="hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
                      <td className="p-6 text-gray-300 font-medium sticky left-0 bg-[#020617] md:bg-transparent z-10 border-r border-[#0f172a] md:border-none shadow-[2px_0_5px_rgba(0,0,0,0.5)] md:shadow-none">
                        {item.name}
                        {item.tooltip && <i className="bi bi-info-circle ml-2 text-gray-500 text-xs" title={item.tooltip}></i>}
                      </td>
                      {plans.map((plan, pIndex) => (
                        <td key={pIndex} className="p-6 text-center text-gray-400">
                          {renderCheck(item.values[pIndex])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

function renderCheck(value) {
  if (value === true) return <i className="bi bi-check-circle-fill text-blue-500 text-xl"></i>;
  if (value === false) return <i className="bi bi-dash text-gray-600 text-xl"></i>;
  return <span className="text-white text-sm font-medium">{value}</span>;
}

export default PricingComparisonTable;
