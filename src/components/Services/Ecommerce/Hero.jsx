// Hero.jsx
import React from 'react'
import './ecommerce.css' // Import the new CSS

export default function Hero() {
  return (
    <section className="ecom-hero"> {/* Removed py-5, using CSS padding */}
      <div className="container">
        <div className="row align-items-center gy-4">
          <div className="col-lg-7">
            <p className="eyebrow">E-commerce Website Development</p>
            <h1 className="display-5">Scalable, secure & conversion-first e-commerce platforms</h1>
            <p className="lead text-white">
              From **Headless Commerce** and custom storefronts (React/Next.js) to optimized **Shopify/WooCommerce** builds—we deliver platforms that convert visitors into loyal customers and scale with your business.
            </p>
            <div className="mt-4 d-flex gap-3"> {/* Increased margin and gap */}
              <a href="#pricing" className="btn btn-primary btn-lg">See Pricing</a>
              <a href="#contact" className="btn btn-outline-light btn-lg">Request Quote</a>
            </div>
          </div>

          <div className="col-lg-5 text-center">
            <img src="/assets/ecom-hero-mock.png" alt="E-commerce mockup showing checkout screen" className="img-fluid rounded-3 shadow" />
          </div>
        </div>
      </div>
    </section>
  )
}