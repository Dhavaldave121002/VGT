// src/components/Pricing/Application/CTA.jsx
import React from 'react'
import '../../../pages/pricing/pricing.css' // Import the new CSS

export default function CTA() {
  return (
    <section className="app-cta-section" id="contact-cta">
      <div className="container text-center">
        <h4>Ready to Start Your Custom Application Project? 🚀</h4>
        <p className="text-white">Share your project brief with our team, and we’ll respond with a detailed project plan, technology stack recommendation, and an accurate estimate.</p>
        
        <div className="d-flex justify-content-center gap-3">
          <a className="btn btn-primary btn-lg" href="/contact">Start Project Discussion</a>
          <a className="btn btn-outline-light btn-lg" href="mailto:hello@vertexglobaltech.com?subject=App%20Plan%20Inquiry">Request Quote</a>
        </div>
      </div>
    </section>
  )
}