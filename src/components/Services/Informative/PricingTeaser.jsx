// src/components/Services/Informative/PricingTeaser.jsx
import React from 'react'
import './informative.css' // Import the new CSS

function PriceCard({ title, price, bullets = [], featured }) {
  return (
    <div className="col-md-6 col-lg-4"> {/* Adjusted column size for better layout */}
      <div className={`price-card h-100 p-4 ${featured ? 'featured' : ''}`}>
        <h5>{title}</h5>
        <div className="price display-6">{price}</div>
        <ul className="list-unstyled mt-2 mb-4">
          {bullets.map((b, i) => <li key={i} className="small text-muted">• {b}</li>)}
        </ul>
        <a href="/contact" className="btn btn-sm btn-primary">Choose Plan</a> {/* Changed text to be clearer */}
      </div>
    </div>
  )
}

export default function PricingTeaser() {
  return (
    <section id="pricing" className="pricing-section"> {/* Use class name for styling */}
      <div className="container">
        <div className="text-center mb-5">
          <h3>Simple, Transparent Pricing</h3>
          <p className="text-muted lead">Transparent packages for brochure websites. Custom quotes available for complex projects.</p>
          
        </div>

        <div className="row g-4 justify-content-center"> {/* Adjusted gap and alignment */}
          <PriceCard title="Starter" price="₹12,000" bullets={['Up to 5 pages','Responsive design','Basic SEO setup','1-month support']} />
          <PriceCard title="Business Pro" price="₹25,000" featured bullets={['Up to 12 pages','Integrated CMS (Headless)','Advanced forms & Analytics','Technical SEO optimization','3-months support']} />
          <PriceCard title="Enterprise" price="Custom Quote" bullets={['Large site architectures','Custom system integrations (CRM/ERP)','Dedicated DevOps consultation','Priority 24/7 support']} />
        </div>
      </div>
    </section>
  )
}