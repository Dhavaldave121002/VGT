import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCheck } from 'react-icons/fa';

export default function PricingModal({ isOpen, onClose, selectedPlan, planType }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    plan: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({ ...prev, plan: `${planType} - ${selectedPlan}` }));
      setSubmitted(false);
    }
  }, [isOpen, selectedPlan, planType]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save to localStorage for admin
    const inquiry = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service: planType,
      plan: formData.plan,
      message: formData.message,
      date: new Date().toLocaleDateString(),
      status: 'New',
      priority: 'Medium'
    };

    const existing = JSON.parse(localStorage.getItem('vgtw_leads') || '[]');
    existing.unshift(inquiry);
    localStorage.setItem('vgtw_leads', JSON.stringify(existing));
    window.dispatchEvent(new Event('storage'));

    // Open email client
    const subject = encodeURIComponent(`New Inquiry: ${formData.plan}`);
    const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Plan: ${formData.plan}

Message:
${formData.message}
    `);
    window.location.href = `mailto:sales@vertexglobaltech.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative bg-[#0f172a] border border-white/10 rounded-2xl p-6 md:p-8 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <FaTimes className="text-xl" />
            </button>

            {!submitted ? (
              <>
                <h3 className="text-2xl font-bold text-white mb-2">Start Your Project</h3>
                <p className="text-gray-400 text-sm mb-6">
                  You selected <span className="text-blue-400 font-bold">{selectedPlan}</span>. Fill the details below.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                    <input
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
                    <input
                      required
                      type="email"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                      placeholder="+1 234 567 8900"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Selected Plan</label>
                    <input
                      readOnly
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-blue-400 font-bold cursor-not-allowed opacity-75"
                      value={formData.plan}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Message (Optional)</label>
                    <textarea
                      rows="3"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                      placeholder="Tell us about your requirements..."
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-3 rounded-lg transition-all shadow-lg hover:shadow-blue-500/25 mt-2"
                  >
                    Send Inquiry — Open Email
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCheck className="text-3xl text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Sent!</h3>
                <p className="text-gray-400">Opening your email client...</p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
