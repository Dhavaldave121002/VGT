import React from 'react'
import { Link } from 'react-router-dom'
import '../service-pricing.css'

export default function PricingMain() {
  return (
    <>
      <section className="sp-hero">
        <div className="container">
          <p className="sp-breadcrumb"><Link to="/">Home</Link> / Pricing</p>
          <h1 className="sp-section-title">Pricing — simple and transparent</h1>
          <p className="text-muted">Choose a plan or contact us for a custom quote. Below are starting prices and example deliverables.</p>
        </div>
      </section>

      <section className="container py-5">
        <div className="pricing-table">
          <div className="pricing-plan">
            <h4>Website Plans</h4>
            <div className="price">Starting ₹15,000</div>
            <ul className="sp-feature-list">
              <li>Informative / Basic site</li>
              <li>Responsive & SEO basics</li>
              <li>Hosting & setup (optional)</li>
            </ul>
            <div className="sp-cta"><Link to="/pricing/website" className="btn btn-primary">View Website Plans</Link></div>
          </div>

          <div className="pricing-plan featured">
            <h4>Application Plans</h4>
            <div className="price">Starting ₹45,000</div>
            <ul className="sp-feature-list">
              <li>Android / iOS or cross-platform</li>
              <li>Core features + stores support</li>
              <li>CI / CD & analytics</li>
            </ul>
            <div className="sp-cta"><Link to="/pricing/application" className="btn btn-primary">View App Plans</Link></div>
          </div>

          <div className="pricing-plan">
            <h4>UI/UX Plans</h4>
            <div className="price">Starting ₹12,000</div>
            <ul className="sp-feature-list">
              <li>UI kit & prototype</li>
              <li>Usability testing (optional)</li>
              <li>Design system basics</li>
            </ul>
            <div className="sp-cta"><Link to="/pricing/uiux" className="btn btn-primary">View UI/UX Plans</Link></div>
          </div>
        </div>
      </section>
    </>
  )
}
