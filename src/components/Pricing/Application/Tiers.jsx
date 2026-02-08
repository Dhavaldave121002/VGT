// src/components/Pricing/Application/Tiers.jsx
import React from 'react'
import '../../../pages/pricing/pricing.css' // Import the new CSS

export default function Tiers() {
    
  return (
    <section className="app-tiers-section" id="packages-section">
      <div className="container">
        <div className="text-center mb-5">
          <h3>Application Development Tiers 📈</h3>
          <p className="lead text-white">Transparent starting prices for development phases. Final costs are estimated based on **complexity, platforms, and third-party integrations**.</p>
        </div>

        <div className="row g-4 justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="price-card h-100 text-center">
              <h5 className="mb-1">1. Prototype (Discovery)</h5>
              <div className="price">₹60,000+</div>
              <p className="small text-white mb-3">Validate your idea with a clickable design or minimal test app (no production code).</p>
              <ul className="list-unstyled text-start mb-3">
                <li>**Detailed Wireframes & UI/UX**</li>
                <li>Clickable Prototype (Figma/Sketch)</li>
                <li>User Flow Mapping</li>
                <li>Basic Backend Mockup</li>
                <li>1 Round of Usability Testing</li>
              </ul>
              <a className="btn btn-primary w-100" href="/contact">Request Prototype</a>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="price-card h-100 text-center featured">
              <h5 className="mb-1">2. Startup (MVP/Production)</h5>
              <div className="price">₹1,80,000+</div>
              <p className="small text-white mb-3">Production-ready Minimum Viable Product (MVP) ready for launch on app stores.</p>
              <ul className="list-unstyled text-start mb-3">
                <li>**Single Platform Development** (iOS or Android)</li>
                <li>Live Backend and Database Setup</li>
                <li>User Authentication & Basic Features</li>
                <li>Basic Analytics & Reporting</li>
                <li>App Store/Play Store Submission</li>
              </ul>
              <a className="btn btn-primary w-100" href="/contact">Choose MVP Plan</a>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="price-card h-100 text-center">
              <h5 className="mb-1">3. Enterprise (Custom Scale)</h5>
              <div className="price">Custom Quote</div>
              <p className="small text-white mb-3">Large-scale, high-availability solution with complex integrations and security.</p>
              <ul className="list-unstyled text-start mb-3">
                <li>Multi-Platform Native Development</li>
                <li>**Advanced Security & SSO** Integration</li>
                <li>Complex API & Third-Party Integration</li>
                <li>High-Availability/Multi-Region Backend</li>
                <li>Dedicated Support & SLA Agreement</li>
              </ul>
              <a className="btn btn-primary w-100" href="/contact">Get Enterprise Quote</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}