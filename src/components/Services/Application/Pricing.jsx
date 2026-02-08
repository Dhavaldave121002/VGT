// src/components/Services/Application/Pricing.jsx
import React from 'react'
import './application.css' // Import the new CSS

export default function Pricing() {
  return (
    <section id="pricing" className="app-pricing-section"> {/* Use new section class */}
      <div className="container">
        <div className="text-center mb-5">
          <h3>Application Development Pricing (Indicative) 💰</h3>
          <p className="lead text-white">Choose a starting point. Final cost depends on detailed requirements, complex integrations, and selected platform choices.</p>
        </div>

        <div className="row g-4 justify-content-center"> {/* Increased gap */}
          <div className="col-md-4">
            <div className="price-card p-3 text-center h-100">
              <h5>Prototype & Discovery</h5>
              <div className="price">₹1,50,000</div> {/* Updated price */}
              <p className="small text-white">Detailed wireframes, UI/UX conceptual design, basic clickable MVP prototype for testing/pitching, and final scope documentation.</p>
              <a className="btn btn-primary" href="#contact-form-section">Start Discovery</a>
            </div>
          </div>

          <div className="col-md-4">
            <div className="price-card p-3 text-center featured h-100">
              <h5>Standard MVP Launch</h5>
              <div className="price">₹4,00,000+</div> {/* Updated price */}
              <p className="small text-white">Development of a single-platform, full-featured **Minimum Viable Product (MVP)**, including backend API, QA testing, and initial App Store submission.</p>
              <a className="btn btn-primary" href="#contact-form-section">Start Project</a>
            </div>
          </div>

          <div className="col-md-4">
            <div className="price-card p-3 text-center h-100">
              <h5>Enterprise / Scaled</h5>
              <div className="price">Custom</div>
              <p className="small text-white">Advanced security, custom cloud architecture (AWS/Azure), deep third-party integrations, multi-language support, and strict Service Level Agreements (SLAs).</p>
              <a className="btn btn-primary" href="#contact-form-section">Get Consultation</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}