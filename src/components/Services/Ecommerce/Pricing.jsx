// Pricing.jsx
import React from 'react'
import './ecommerce.css' // Import the new CSS

export default function Pricing() {
  // Utility function for formatting Indian Rupees
  const formatINR = (value) => {
    if (value === 'Custom') return value;
    // Format with Indian locale grouping and currency symbol
    return new Intl.NumberFormat('en-IN', { 
        style: 'currency', 
        currency: 'INR', 
        maximumFractionDigits: 0 
    }).format(value);
  }

  return (
    <section id="pricing" className="ecom-pricing-section"> {/* Use new section class */}
      <div className="container">
        <div className="text-center mb-5">
          <h3>E-commerce Pricing Packages</h3>
          <p className="lead text-white">Representative packages — final quote depends on custom features, catalog size, and required third-party integrations.</p>
        </div>

        <div className="row g-4 justify-content-center">
          {/* Card 1: Starter Shop */}
          <div className="col-md-6 col-lg-4">
            <div className="price-card text-center">
              <div>
              <h5>Starter Shop (SME)</h5>
              <div className="price">{formatINR(55000)}</div>
              <p className="small text-white">Ideal for new ventures. Includes core functionality, payment setup, shipping configuration, and basic admin panel.</p>
              </div>
              <a className="btn btn-lg btn-primary" href="/contact">Choose Starter</a>
            </div>
          </div>

          {/* Card 2: Business Store (Featured) */}
          <div className="col-md-6 col-lg-4">
            <div className="price-card text-center featured">
              <div>
              <h5>Business Store Pro</h5>
              <div className="price">{formatINR(125000)}</div>
              <p className="small text-white">Full-featured platform with advanced marketing stack, deeper ERP/CRM integrations, and optimized checkout.</p>
              </div>
              <a className="btn btn-lg btn-primary" href="/contact">Select Business</a>
            </div>
          </div>

          {/* Card 3: Enterprise */}
          <div className="col-md-6 col-lg-4">
            <div className="price-card text-center">
              <div>
              <h5>Enterprise / Headless</h5>
              <div className="price">{formatINR('Custom')}</div>
              <p className="small text-white">For high-volume brands needing multi-store management, custom API development, and Headless architecture.</p>
              </div>
              <a className="btn btn-lg btn-primary" href="/contact">Get Custom Quote</a>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mt-5 table-responsive">
          <table className="table table-borderless ecom-feat-table">
            <thead>
              <tr><th>Feature</th><th>Starter Shop</th><th>Business Pro</th><th>Enterprise</th></tr>
            </thead>
            <tbody>
              <tr><td>Catalog size</td><td>Up to 500 SKUs</td><td>Up to 10,000 SKUs</td><td>Unlimited (Headless Ready)</td></tr>
              <tr><td>Key Integrations</td><td>Payments, Shipping (Standard)</td><td>ERP, CRM, Marketing Automation</td><td>Custom API Integration</td></tr>
              <tr><td>Conversion Optimization</td><td>Standard Flow</td><td>A/B Testing & Funnel Analysis</td><td>Advanced CRO & Custom Logic</td></tr>
              <tr><td>Performance</td><td>CDN & Caching</td><td>Optimized for High Traffic</td><td>Enterprise SRE & Monitoring</td></tr>
              <tr><td>Support</td><td>Email</td><td>Priority Ticket</td><td>Dedicated Account Manager</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}