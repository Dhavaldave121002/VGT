import React from 'react'

export default function RecruiterBox() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
      <h6 className="text-xl font-bold text-white mb-4">Referrals & recruiters</h6>
      <p className="text-gray-400 text-sm mb-4 leading-relaxed">
        For agency partnerships or bulk hiring, email
        {' '}
        <a href="mailto:talent@vertexglobaltech.com" className="text-blue-400 hover:text-blue-300 transition-colors">talent@vertexglobaltech.com</a>.
      </p>
      <p className="text-gray-400 text-sm">
        <strong className="text-white">Response time:</strong> 3–5 business days.
      </p>
    </div>
  )
}
