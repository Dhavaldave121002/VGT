// src/components/Services/UIUX/Pricing.jsx
import React from 'react'
import './uiux.css' // Import the new CSS

export default function Pricing() {
    const checkIcon = <span className="feature-icon">✓</span>
    
  return (
    <section className="uiux-pricing-section" id="pricing-packages"> {/* Use new section class */}
      <div className="container">
        <div className="text-center mb-5">
          <h3>Our UI/UX Service Packages 📦</h3>
          <p className="lead text-white">Tailored design solutions for every stage, from initial discovery to full product development and long-term scaling.</p>
        </div>

        <div className="row g-4 justify-content-center"> {/* Increased gap */}
          <div className="col-md-6 col-lg-4">
            <div className="price-card h-100 text-center">
              <h5>1. Discovery Workshop</h5>
              <div className="price">₹25,000</div>
              <p className="price-card-subtext">Quick start and clarity</p>
              
              <ul className="list-unstyled text-start">
                <li>{checkIcon} **1-Day Stakeholder Workshop**</li>
                <li>{checkIcon} Competitor Analysis</li>
                <li>{checkIcon} User Persona Drafting</li>
                <li>{checkIcon} **1-Page Project Blueprint**</li>
                <li>{checkIcon} High-Level Feature List</li>
              </ul>

              <a className="btn btn-primary w-100" href="#contact-form-section">Start Discovery</a>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="price-card h-100 text-center featured">
              <h5>2. Full Product Design (MVP)</h5>
              <div className="price">₹95,000+</div>
              <p className="price-card-subtext">Complete UX/UI for launch</p>
              
              <ul className="list-unstyled text-start">
                <li>{checkIcon} **Includes Workshop (Tier 1)**</li>
                <li>{checkIcon} Detailed Wireframes & User Flows</li>
                <li>{checkIcon} **High-Fidelity UI Mockups**</li>
                <li>{checkIcon} Interactive Clickable Prototype</li>
                <li>{checkIcon} Full Developer Handoff & Support</li>
              </ul>
              
              <a className="btn btn-primary w-100" href="#contact-form-section">Request Proposal</a>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="price-card h-100 text-center">
              <h5>3. Design System & Scale</h5>
              <div className="price">Custom</div>
              <p className="price-card-subtext">For growing teams and enterprises</p>

              <ul className="list-unstyled text-start">
                <li>{checkIcon} **Component Library Creation**</li>
                <li>{checkIcon} Naming Conventions & Tokens</li>
                <li>{checkIcon} Full Documentation (Storybook/ZeroHeight)</li>
                <li>{checkIcon} Accessibility & Standards Review</li>
                <li>{checkIcon} Long-Term Maintenance Plan</li>
              </ul>

              <a className="btn btn-primary w-100" href="#contact-form-section">Get Custom Quote</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}