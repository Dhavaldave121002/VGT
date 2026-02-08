// src/components/Pricing/Application/Comparison.jsx
import React from 'react'
import '../../../pages/pricing/pricing.css' // Import the new CSS

export default function Comparison() {
    const Check = <span className="comparison-check">✓</span>
    const Dash = <span className="comparison-text">—</span>
    const Basic = <span className="comparison-text">Basic</span>
    const Full = <span className="comparison-highlight">Full QA & Load</span>

  return (
    <section className="app-comparison-section" id="comparison-table">
      <div className="container">
        <div className="text-center mb-4">
          <h4>Core Feature Comparison 🛠️</h4>
          <p className="lead text-white">A high-level view of core deliverables across the application development stages.</p>
        </div>

        <div className="table-responsive">
          <table className="table table-borderless pricing-table text-center">
            <thead>
              <tr><th>Feature</th><th>Prototype</th><th>Startup</th><th>Enterprise</th></tr>
            </thead>
            <tbody>
              <tr><td>Platforms Included</td><td>Single / Demo</td><td className='comparison-highlight'>Android + iOS</td><td>**Native** Multi-platform</td></tr>
              <tr><td>Backend (API)</td><td>Mock / Firebase</td><td>Dedicated API + DB</td><td><span className="comparison-highlight">HA & Auto-scaling</span></td></tr>
              <tr><td>User Authentication</td><td>{Dash}</td><td>{Check} (Basic)</td><td>{Check} (SSO Ready)</td></tr>
              <tr><td>Code Testing Coverage</td><td>{Basic}</td><td>Automated & Manual</td><td>{Full}</td></tr>
              <tr><td>App Store Submission</td><td>{Dash}</td><td>{Check}</td><td>{Check} + Optimization</td></tr>
              <tr><td>Service Level Agreement (SLA)</td><td>{Dash}</td><td>Post-Launch Window</td><td><span className="comparison-highlight">Dedicated Contract</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}