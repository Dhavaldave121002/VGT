// src/components/Services/Dynamic/Pricing.jsx
import React from 'react'
import './dynamic.css' // Import the new CSS

export default function Pricing() {
  // Utility function for formatting Indian Rupees
  const formatINR = (value) => {
    if (value === 'Custom') return value;
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
  }

  return (
    <section id="pricing" className="dynamic-pricing-section"> {/* Use new section class */}
      <div className="container">
        <div className="text-center mb-5">
          <h3>Dynamic Website Pricing (Teaser)</h3>
          <p className="lead text-white">Estimated starting prices — final cost depends on required custom features, integrations, and content complexity.</p>
        </div>

        <div className="row g-4 justify-content-center"> {/* Increased gap */}
          {/* Card 1: Starter CMS */}
          <div className="col-md-6 col-lg-4">
            <div className="price-card text-center">
              <div>
                <h5>Starter CMS</h5>
                <div className="price">{formatINR(35000)}</div>
                <p className="small text-white">Ideal for small businesses, includes basic admin panel, up to 10 pages, and a simple blog.</p>
              </div>
              <a className="btn btn-lg btn-primary" href="/contact">Choose Plan</a>
            </div>
          </div>

          {/* Card 2: Business (Featured) */}
          <div className="col-md-6 col-lg-4">
            <div className="price-card text-center featured">
              <div>
                <h5>Business Pro</h5>
                <div className="price">{formatINR(75000)}</div>
                <p className="small text-white">Multi-page platform with advanced CMS, user roles, 3rd-party integration support, and detailed analytics.</p>
              </div>
              <a className="btn btn-lg btn-primary" href="/contact">Select Business</a>
            </div>
          </div>

          {/* Card 3: Custom / Enterprise */}
          <div className="col-md-6 col-lg-4">
            <div className="price-card text-center">
              <div>
                <h5>Custom / Enterprise</h5>
                <div className="price">{formatINR('Custom')}</div>
                <p className="small text-white">Designed for complex platforms, full-scale web applications, eCommerce solutions, and bespoke integrations.</p>
              </div>
              <a className="btn btn-lg btn-primary" href="/contact">Get Custom Quote</a>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mt-5 table-responsive">
          <table className="table table-borderless dynamic-feat-table">
            <thead>
              <tr><th>Core Element</th><th>Starter CMS</th><th>Business Pro</th><th>Enterprise</th></tr>
            </thead>
            <tbody>
              <tr><td>CMS Features</td><td>Basic Content</td><td>Advanced Workflow</td><td>Custom Built</td></tr>
              <tr><td>Page Count</td><td>Up to 10</td><td>Up to 40</td><td>Unlimited</td></tr>
              <tr><td>Third-Party Integrations</td><td>Limited (2)</td><td>Standard (5)</td><td>Custom APIs</td></tr>
              <tr><td>Hosting & Deployment</td><td>Standard</td><td>High Performance</td><td>Dedicated Cloud</td></tr>
              <tr><td>Support Level</td><td>Email</td><td>Priority Ticket</td><td>Dedicated Account Manager</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}