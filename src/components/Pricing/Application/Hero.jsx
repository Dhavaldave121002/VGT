// src/components/Pricing/Application/Hero.jsx
import React from 'react'
import '../../../pages/pricing/pricing.css' // Import the new CSS

export default function Hero() {
  return (
    <section className="pricing-hero py-6" id="hero-section">
      <div className="container">
        <div className="row align-items-center gy-5">
          <div className="col-lg-7">
            <p className="eyebrow">Mobile Application Development</p>
            <h1 className="display-5">Predictable pricing for custom applications.</h1>
            <p className="lead text-white">
              Clear pricing examples for **Minimum Viable Products (MVPs)**, user-ready mobile apps, and enterprise-grade solutions with complex integrations and service agreements.
            </p>

            <div className="mt-4 d-flex gap-3">
              <a href="#packages-section" className="btn btn-primary btn-lg">Explore Development Tiers</a>
              <a href="#contact-section" className="btn btn-outline-light btn-lg">Get Custom Quote</a>
            </div>
          </div>

          <div className="col-lg-5 text-center">
            <img src="/assets/pricing-app.png" alt="Custom app development pricing structure" className="img-fluid rounded-3 shadow" />

            [Image of a modern mobile application development mockup]

          </div>
        </div>
      </div>
    </section>
  )
}