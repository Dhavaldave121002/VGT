// Process.jsx
import React from 'react'
import './ecommerce.css' // Import the new CSS

export default function Process() {
  const steps = [
    { s: '1', t: 'Discovery & Scope', d: 'Define business goals, target audience, catalog size, and key performance indicators (KPIs).' },
    { s: '2', t: 'Design & Prototyping', d: 'Creation of user flows, wireframes, and high-fidelity mockups for product pages and checkout UX.' },
    { s: '3', t: 'Build & Integration', d: 'Development of the storefront, integration of payment, logistics, inventory systems, and headless API connections.' },
    { s: '4', t: 'Testing & QA', d: 'Thorough testing of order flows, payment security, performance (load testing), and cross-browser compatibility.' },
    { s: '5', t: 'Launch & Optimization', d: 'Go-live, post-launch monitoring, performance optimization, and setting up analytics for continuous iteration.' }
  ]

  return (
    <section className="ecom-process-section" id="process">
      <div className="container">
        <div className="text-center mb-5">
          <h3>Our E-commerce Development Process</h3>
          <p className="lead text-white">A pragmatic 5-step approach ensures your e-commerce platform is shipped efficiently, securely, and ready for growth.</p>
        </div>

        <div className="row g-4 justify-content-center">
          {steps.map((st, i) => (
            // Using col-lg-auto to make columns automatically size based on content
            <div key={i} className="col-sm-6 col-md-4 col-lg h-100">
              <div className="process p-3 text-center h-100">
                <div className="step">{st.s}</div>
                <h6 className="mt-2">{st.t}</h6>
                <p className="small text-white">{st.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}