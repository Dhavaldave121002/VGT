// src/components/Pricing/Website/Hero.jsx
import React from 'react'
import '../../../pages/pricing/pricing.css' // Import the new CSS

export default function Hero() {
  return (
    <section className="pricing-hero py-6" id="hero-section">
      <div className="container">
        <div className="row align-items-center gy-5">
          <div className="col-lg-7">
            <p className="eyebrow">Website Design & Development</p>
            <h1 className="display-5">Transparent pricing for high-performance websites.</h1>
            <p className="lead text-white">
              Choose from clear, predictable packages for **brochure sites, dynamic CMS solutions, and custom SEO-first e-commerce stores**. Predictable cost, premium delivery.
            </p>

            <div className="mt-4 d-flex gap-3">
              <a href="#packages-section" className="btn btn-primary btn-lg">View Packages</a>
              <a href="#faq-section" className="btn btn-outline-light btn-lg">Billing FAQ</a>
            </div>
          </div>

          <div className="col-lg-5 text-center">
            <img src="/assets/pricing-website.png" alt="Clean web design mockups for pricing" className="img-fluid rounded-3 shadow" />
            

[Image of website pricing plans structure]

          </div>
        </div>
      </div>
    </section>
  )
}