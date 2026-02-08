// src/components/Pricing/UIUX/Tiers.jsx
import React from 'react'
import '../../../pages/pricing/pricing.css' // Import the new CSS

export default function Tiers() {
    
  return (
    <section className="uiux-tiers-section" id="packages-section">
      <div className="container">
        <div className="text-center mb-5">
          <h3>Design Packages & Product Strategy Tiers 💡</h3>
          <p className="lead text-white">Fixed-price packages for common design needs, from idea validation to building a scalable system.</p>
        </div>

        <div className="row g-4 justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="price-card h-100 text-center">
              <h5 className="mb-1">1. Discovery Workshop</h5>
              <div className="price">₹25,000 (Fixed)</div>
              <p className="small text-white mb-3">Validate your idea, define user flows, and establish core business requirements.</p>
              <ul className="list-unstyled text-start mb-3">
                <li>**1-Day Virtual Workshop**</li>
                <li>User Persona & Journey Map</li>
                <li>High-Level UX Audit Report</li>
                <li>1-Page Project Plan / Scope Document</li>
              </ul>
              <a className="btn btn-primary w-100" href="/contact">Book Workshop</a>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="price-card h-100 text-center featured">
              <h5 className="mb-1">2. Product UI/UX (MVP Design)</h5>
              <div className="price">₹95,000+</div>
              <p className="small text-white mb-3">End-to-end design for a small application or website, ready for developer handoff.</p>
              <ul className="list-unstyled text-start mb-3">
                <li>**Low-Fi Wireframes** (up to 20 screens)</li>
                <li>High-Fidelity Visual Design</li>
                <li>Clickable Prototype (Figma)</li>
                <li>Basic UI Kit & Style Guide</li>
                <li>Dev Handoff & Specifications</li>
              </ul>
              <a className="btn btn-primary w-100" href="/contact">Choose Product Design</a>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="price-card h-100 text-center">
              <h5 className="mb-1">3. Scalable Design System</h5>
              <div className="price">Custom Quote</div>
              <p className="small text-white mb-3">A comprehensive system for large teams managing multiple products or complex interfaces.</p>
              <ul className="list-unstyled text-start mb-3">
                <li>**Advanced Design Tokens**</li>
                <li>Comprehensive Component Library</li>
                <li>Documentation Hub (Storybook/Zeroheight)</li>
                <li>Accessibility Audit & Guidelines (WCAG)</li>
              </ul>
              <a className="btn btn-primary w-100" href="/contact">Get System Quote</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}