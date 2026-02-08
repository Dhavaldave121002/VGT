// src/components/Pricing/UIUX/CTA.jsx
import React from 'react'
import '../../../pages/pricing/pricing.css' // Import the new CSS

export default function CTA() {
  return (
    <section className="uiux-cta-section" id="contact-cta">
      <div className="container text-center">
        <h4>Need a Tailored Design Strategy? 💡</h4>
        <p className="text-white">Contact us with your product goals, and we’ll prepare a detailed design project plan and estimate perfectly tailored to your needs.</p>
        
        <div className="d-flex justify-content-center gap-3">
          <a className="btn btn-primary btn-lg" href="/contact">Book Design Consultation</a>
          <a className="btn btn-outline-light btn-lg" href="mailto:hello@vertexglobaltech.com?subject=UIUX%20Plan%20Inquiry">Request Quote</a>
        </div>
      </div>
    </section>
  )
}