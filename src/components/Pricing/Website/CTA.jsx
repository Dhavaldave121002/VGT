// src/components/Pricing/Website/CTA.jsx
import React from 'react'
import '../../../pages/pricing/pricing.css' // Import the new CSS

export default function CTA() {
  return (
    <section className="website-cta-section" id="contact-cta">
      <div className="container text-center">
        <h4>Ready to Launch Your Next Website? 💡</h4>
        <p className="text-white">Contact us with brief details about your project needs, and we’ll send a tailored proposal and quote.</p>
        
        <div className="d-flex justify-content-center gap-3">
          <a className="btn btn-primary btn-lg" href="/contact">Start Project Discussion</a>
          <a className="btn btn-outline-light btn-lg" href="mailto:hello@vertexglobaltech.com?subject=Website%20Plan%20Inquiry">Request Quote</a>
        </div>
      </div>
    </section>
  )
}