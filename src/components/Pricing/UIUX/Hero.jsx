// src/components/Pricing/UIUX/Hero.jsx
import React from 'react'
import '../../../pages/pricing/pricing.css' // Import the new CSS

export default function Hero() {
  return (
    <section className="pricing-hero py-6" id="hero-section">
      <div className="container">
        <div className="row align-items-center gy-5">
          <div className="col-lg-7">
            <p className="eyebrow">User Interface & Experience Design</p>
            <h1 className="display-5">Structured pricing for impactful design outcomes.</h1>
            <p className="lead text-white">
              Clear packages covering **Discovery Workshops, high-fidelity UI/UX design, and implementation of scalable design systems**. Start with a fixed-price audit or jump into full project design.
            </p>

            <div className="mt-4 d-flex gap-3">
              <a href="#packages-section" className="btn btn-primary btn-lg">View Design Packages</a>
              <a href="#comparison-table" className="btn btn-outline-light btn-lg">Compare Deliverables</a>
            </div>
          </div>

          <div className="col-lg-5 text-center">
            <img src="/assets/pricing-uiux.png" alt="UIUX wireframe and design mockups for pricing" className="img-fluid rounded-3 shadow" />
            
          </div>
        </div>
      </div>
    </section>
  )
}