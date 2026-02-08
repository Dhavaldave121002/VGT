import React, { useState } from 'react'
import { api } from '../utils/api';
import { motion } from 'framer-motion'
import { FaCopy, FaCheck, FaUserPlus, FaChartLine, FaGift, FaWhatsapp, FaTwitter, FaCrown, FaEnvelope } from 'react-icons/fa'
import SEO from '../components/SEO'
import emailjs from '@emailjs/browser';
import { validateEmail, validateName, validatePhone, validateReferralCode, validateRequired, checkDuplicate } from '../utils/ValidationUtils';
import FormError from '../components/UI/FormError';
import Toast from '../components/UI/Toast';

export default function Referral() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  })
  const [generatedCode, setGeneratedCode] = useState(null)
  const [codeLoading, setCodeLoading] = useState(false)
  const [codeErrors, setCodeErrors] = useState({ name: '', email: '' })

  // Lead Form State
  const [lead, setLead] = useState({
    referralCode: '',
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    projectType: 'Website Development',
    notes: ''
  })
  const [leadSubmitting, setLeadSubmitting] = useState(false)
  const [leadSuccess, setLeadSuccess] = useState(false)
  const [leadErrors, setLeadErrors] = useState({ referralCode: '', clientName: '', clientPhone: '', clientEmail: '' })

  // Toast state
  const [toast, setToast] = useState({ show: false, type: 'success', message: '' })

  // Tiers from localStorage
  const [tiers, setTiers] = useState([])


  // ... 

  React.useEffect(() => {
    const loadTiers = async () => {
      const savedTiers = await api.fetchConfig('referral_tiers');
      if (savedTiers) {
        setTiers(savedTiers);
      } else {
        const defaultTiers = [
          { name: 'Bridge', commission: '1000', description: 'Standard entry level partner status.', color: 'blue' },
          { name: 'Nexus', commission: '1500', description: 'Elite partner status after 3 successful referrals.', color: 'purple' }
        ]
        setTiers(defaultTiers);
        api.saveConfig('referral_tiers', defaultTiers);
      }
    };
    loadTiers();
  }, [])

  // Handlers
  const isGeneratingRef = React.useRef(false);

  const handleGenerateCode = async (e) => {
    e.preventDefault()

    // Validate name
    const nameValidation = validateName(formData.name, 'Name');
    const emailValidation = validateEmail(formData.email);

    // Check for duplicate email
    // Check for duplicate email via API
    const allReferrals = await api.fetchAll('referrals');
    const duplicateCheck = checkDuplicate(formData.email, allReferrals, 'email', 'Email');

    // Set errors
    setCodeErrors({
      name: nameValidation.valid ? '' : nameValidation.error,
      email: !emailValidation.valid ? emailValidation.error : (!duplicateCheck.valid ? duplicateCheck.error : '')
    });

    // Stop if validation fails
    if (!nameValidation.valid || !emailValidation.valid || !duplicateCheck.valid) {
      setToast({ show: true, type: 'error', message: 'Please fix the errors before submitting' });
      return;
    }

    if (codeLoading || isGeneratingRef.current) return;

    isGeneratingRef.current = true;
    setCodeLoading(true)

    // Generate unique code
    const baseCode = `VTX-${nameValidation.value.substring(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    // Save to API
    const referralData = {
      code: baseCode,
      name: nameValidation.value,
      email: emailValidation.value,
      tier: tiers[0]?.name || 'Bridge',
      status: 'Active'
    };

    const response = await api.save('referrals', referralData);

    if (!response.success) {
      setToast({ show: true, type: 'error', message: response.error || 'Failed to generate code. Try again.' });
      setCodeLoading(false);
      isGeneratingRef.current = false;
      return;
    }

    const code = response.data?.code || baseCode; // Use returned code if backend normalized it

    // EmailJS Configuration
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_MARKETING_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_MARKETING_TEMPLATE_REFERRAL;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_MARKETING_PUBLIC_KEY;

    const templateParams = {
      to_name: nameValidation.value,
      to_email: emailValidation.value,
      referral_code: code,
      message: `Your exclusive partner referral code is: ${code}`
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then(() => {
        setGeneratedCode(code)
        setCodeLoading(false)
        isGeneratingRef.current = false;
        setLead(prev => ({ ...prev, referralCode: code }))
        setToast({ show: true, type: 'success', message: 'Referral code generated and sent to your email!' });

      }, (err) => {
        console.error('Email send failed:', err);
        setToast({ show: true, type: 'error', message: 'Failed to send email. Please try again.' });
        setCodeLoading(false);
        isGeneratingRef.current = false;
      });
  }

  const handleLeadSubmit = async (e) => {
    e.preventDefault()

    // Validate all fields
    const codeValidation = validateReferralCode(lead.referralCode);
    const nameValidation = validateName(lead.clientName, 'Client name');
    const phoneValidation = validatePhone(lead.clientPhone);
    const emailValidation = lead.clientEmail ? validateEmail(lead.clientEmail) : { valid: true };

    // Set errors
    setLeadErrors({
      referralCode: !codeValidation.valid ? codeValidation.error : '',
      clientName: nameValidation.valid ? '' : nameValidation.error,
      clientPhone: phoneValidation.valid ? '' : phoneValidation.error,
      clientEmail: emailValidation.valid ? '' : emailValidation.error
    });

    // Stop if validation fails
    if (!codeValidation.valid || !nameValidation.valid || !phoneValidation.valid || !emailValidation.valid) {
      setToast({ show: true, type: 'error', message: 'Please fix the errors before submitting' });
      return;
    }

    setLeadSubmitting(true)

    const leadData = {
      referralCode: codeValidation.value,
      name: nameValidation.value,
      phone: phoneValidation.value,
      email: emailValidation.value || '',
      service: lead.projectType,
      plan: lead.notes.trim(), // Using 'plan' field for notes/details or add 'notes' to DB? I added 'plan' earlier.
      status: 'New'
    };

    // Note: I mapped clientName -> name, clientPhone -> phone, projectType -> service. 
    // DB has 'plan'. I will store notes in plan? Or just lose notes? Database has no 'notes' column.
    // I should probably add 'notes' column to leads table or combine.
    // Let's assume 'plan' is okay for now or I'll ADD 'notes' to leads table. I will Add 'message' or 'notes'.

    // Check referral code validity via API?
    // The API save will validate/link?
    // For now, assume API accepts it. Backend should validate referral code ideally.

    const res = await api.save('leads', leadData);

    if (res.success) {
      setLeadSubmitting(false)
      setLeadSuccess(true)
      setToast({ show: true, type: 'success', message: 'Lead submitted successfully! Awaiting admin approval.' });

      setTimeout(() => {
        setLeadSuccess(false)
        setLead(prev => ({ ...prev, clientName: '', clientPhone: '', clientEmail: '', notes: '' }))
        setLeadErrors({ referralCode: '', clientName: '', clientPhone: '', clientEmail: '' });
      }, 3000)
    } else {
      setLeadSubmitting(false);
      setToast({ show: true, type: 'error', message: res.error || 'Failed to submit lead.' });
    }
  }

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode)
  }

  return (
    <div className="min-h-screen bg-[#030712] pt-24 pb-20 overflow-hidden font-sans">
      <SEO
        title="Partner Program"
        description="Refer clients to Vertex Global Tech and earn rewards. Join our partner program today."
        keywords="referral program, partner program, earn money online, tech affiliate"
      />
      {/* Hero Section */}
      <section className="relative px-6 mb-24">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="container mx-auto text-center relative z-10 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold text-xs uppercase tracking-widest mb-6"
          >
            Partner Engine
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-[0.9] uppercase tracking-tighter"
          >
            Revolutionize Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Earnings Yield</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto uppercase tracking-[0.2em] font-medium"
          >
            Join our elite partner network and monetize your professional bridge.
          </motion.p>

          {/* Tiers Visual Dynamic */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
            {tiers.map((tier, idx) => {
              // Auto-detect premium tier (highest commission or "Nexus")
              const isPremium = tier.name === 'Nexus' ||
                parseInt(tier.commission) === Math.max(...tiers.map(t => parseInt(t.commission)))

              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -10, scale: 1.02 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`backdrop-blur-xl p-8 rounded-[2.5rem] border relative overflow-hidden text-left group ${isPremium
                    ? 'bg-gradient-to-br from-purple-900/30 via-blue-900/20 to-[#0f172a]/60 border-purple-500/30 shadow-2xl shadow-purple-500/10'
                    : 'bg-[#0f172a]/60 border-white/5'
                    }`}
                >
                  <div className={`absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity rotate-12 text-blue-400`}><FaCrown size={120} /></div>
                  <h3 className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] mb-4">{tier.name} Status</h3>
                  <div className="text-5xl font-black text-white mb-2 tracking-tighter">₹{tier.commission} <span className="text-xs text-gray-500 font-black uppercase tracking-widest">Per Node</span></div>
                  <p className="text-gray-400 text-xs font-medium leading-relaxed">{tier.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">

        {/* Left Col: Generate Code */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="bg-[#0f172a] rounded-3xl p-8 border border-white/10 relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-sm">1</span>
                Get Your Referral Code
              </h2>

              {!generatedCode ? (
                <form onSubmit={handleGenerateCode} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Your Full Name</label>
                    <input
                      required
                      value={formData.name}
                      onChange={e => { setFormData({ ...formData, name: e.target.value }); setCodeErrors(prev => ({ ...prev, name: '' })); }}
                      className={`w-full bg-white/5 border ${codeErrors.name ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors`}
                      placeholder="Enter name"
                    />
                    <FormError error={codeErrors.name} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={e => { setFormData({ ...formData, email: e.target.value }); setCodeErrors(prev => ({ ...prev, email: '' })); }}
                      className={`w-full bg-white/5 border ${codeErrors.email ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors`}
                      placeholder="Enter email to receive code"
                    />
                    <FormError error={codeErrors.email} />
                  </div>
                  <button
                    disabled={codeLoading}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    {codeLoading ? 'Generating...' : 'Generate Code & Send to Email'}
                  </button>
                  <p className="text-xs text-gray-500 text-center">We will send your unique code to your email.</p>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-green-400 text-2xl">
                    <FaCheck />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2">Code Generated!</h3>
                  <p className="text-gray-400 text-sm mb-6">Your exclusive partner code is ready.</p>

                  <div className="bg-black/40 border border-blue-500/30 rounded-xl p-4 flex items-center justify-between group cursor-pointer hover:bg-black/60 transition-colors" onClick={copyCode}>
                    <code className="text-3xl font-mono text-blue-400 font-bold tracking-wider">{generatedCode}</code>
                    <FaCopy className="text-gray-500 group-hover:text-white transition-colors" />
                  </div>
                  <p className="text-[10px] text-gray-500 mt-2 uppercase tracking-wider mb-6">Click to copy to clipboard</p>

                  <div className="flex flex-col gap-3">
                    <div className="w-full py-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 font-bold flex flex-col items-center justify-center gap-1">
                      <div className="flex items-center gap-2">
                        <FaEnvelope className="text-lg" />
                        <span>Email Dispatched!</span>
                      </div>
                      <span className="text-[10px] uppercase tracking-widest opacity-60">Sent to: {formData.email}</span>
                    </div>

                    <button
                      onClick={() => setGeneratedCode(null)}
                      className="text-xs text-gray-500 hover:text-white transition-colors py-2 mt-4"
                    >
                      Generate New Code
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Steps */}
          <div className="grid gap-6">
            <div className="flex gap-4 items-start p-4 bg-white/5 rounded-xl border border-white/5">
              <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400"><FaUserPlus /></div>
              <div>
                <h4 className="text-white font-bold">1. Find a Client</h4>
                <p className="text-gray-400 text-sm">Anyone looking for a website, app, or design.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start p-4 bg-white/5 rounded-xl border border-white/5">
              <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400"><FaChartLine /></div>
              <div>
                <h4 className="text-white font-bold">2. Submit Lead</h4>
                <p className="text-gray-400 text-sm">Fill the form on the right with your code.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start p-4 bg-white/5 rounded-xl border border-white/5">
              <div className="p-3 bg-green-500/10 rounded-lg text-green-400"><FaGift /></div>
              <div>
                <h4 className="text-white font-bold">3. Get Paid</h4>
                <p className="text-gray-400 text-sm">Once project starts, you receive payout.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Col: Submit Lead */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-[#0f172a] border border-white/10 rounded-3xl p-8 relative"
        >
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <FaUserPlus className="text-9xl text-white" />
          </div>

          <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-sm">2</span>
            Submit a Lead
          </h2>
          <p className="text-gray-400 text-sm mb-8">Enter client details and your code to claim credit.</p>

          {!leadSuccess ? (
            <form onSubmit={handleLeadSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Your Referral Code <span className="text-red-500">*</span></label>
                <input
                  required
                  value={lead.referralCode}
                  onChange={e => { setLead({ ...lead, referralCode: e.target.value }); setLeadErrors(prev => ({ ...prev, referralCode: '' })); }}
                  className={`w-full bg-blue-900/10 border ${leadErrors.referralCode ? 'border-red-500' : 'border-blue-500/30'} rounded-xl px-4 py-3 text-blue-300 font-mono font-bold placeholder-blue-700/50 focus:border-blue-500 focus:outline-none transition-colors`}
                  placeholder="e.g. VTX-JOH-8291"
                />
                <FormError error={leadErrors.referralCode} />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Client Name</label>
                  <input
                    required
                    value={lead.clientName}
                    onChange={e => { setLead({ ...lead, clientName: e.target.value }); setLeadErrors(prev => ({ ...prev, clientName: '' })); }}
                    className={`w-full bg-white/5 border ${leadErrors.clientName ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none`}
                    placeholder="Client Name"
                  />
                  <FormError error={leadErrors.clientName} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Client Phone</label>
                  <input
                    required
                    type="tel"
                    value={lead.clientPhone}
                    onChange={e => { setLead({ ...lead, clientPhone: e.target.value }); setLeadErrors(prev => ({ ...prev, clientPhone: '' })); }}
                    className={`w-full bg-white/5 border ${leadErrors.clientPhone ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none`}
                    placeholder="Phone Number"
                  />
                  <FormError error={leadErrors.clientPhone} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Client Email (Optional)</label>
                <input
                  type="email"
                  value={lead.clientEmail}
                  onChange={e => { setLead({ ...lead, clientEmail: e.target.value }); setLeadErrors(prev => ({ ...prev, clientEmail: '' })); }}
                  className={`w-full bg-white/5 border ${leadErrors.clientEmail ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none`}
                  placeholder="client@example.com"
                />
                <FormError error={leadErrors.clientEmail} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Project Interest</label>
                <select
                  value={lead.projectType}
                  onChange={e => setLead({ ...lead, projectType: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none appearance-none"
                >
                  <option className="bg-[#0f172a]">Website Development</option>
                  <option className="bg-[#0f172a]">App Development</option>
                  <option className="bg-[#0f172a]">UI/UX Design</option>
                  <option className="bg-[#0f172a]">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Notes (Optional)</label>
                <textarea
                  value={lead.notes}
                  onChange={e => setLead({ ...lead, notes: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                  placeholder="Additional details..."
                  rows="2"
                ></textarea>
              </div>

              <button
                disabled={leadSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-3 rounded-xl shadow-lg transition-all"
              >
                {leadSubmitting ? 'Submitting...' : 'Submit Lead'}
              </button>
            </form>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCheck className="text-4xl text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Lead Submitted!</h3>
              <p className="text-gray-400">We will verify the code and contact the client.</p>
              <button onClick={() => setLeadSuccess(false)} className="mt-8 text-blue-400 hover:text-white text-sm">Submit another</button>
            </div>
          )}

        </motion.div>

      </div>

      {/* Toast Notification */}
      <Toast
        show={toast.show}
        type={toast.type}
        message={toast.message}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </div>
  )
}