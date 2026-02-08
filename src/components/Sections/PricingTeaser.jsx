import React from 'react'
import './sections.css'

export default function PricingTeaser() {
  const plans = [
    { id: 'basic', name: 'Starter', price: '₹15k', bullets: ['1–5 pages', 'Responsive', 'Basic SEO'] },
    { id: 'pro', name: 'Growth', price: '₹45k', bullets: ['CMS / Dynamic', 'Custom Forms', 'Analytics'] },
    { id: 'enterprise', name: 'Enterprise', price: 'Custom', bullets: ['Scale & Integrations', 'SLA', 'Dedicated Support'] }
  ]

  return (
    <section className="sections pricing-teaser container-fluid p-5" aria-label="Pricing teaser">
      <div className="text-center mb-4">
        <h3 className="section-title">Plans that fit your stage</h3>
        <p className="section-intro text-muted">Transparent pricing for predictable outcomes. Pick a plan or contact us for a custom quote.</p>
      </div>

      <div className="row g-4 justify-content-center">
        {plans.map(p => (
          <div key={p.id} className="col-12 col-md-4">
            <div className={`price-card ${p.id === 'pro' ? 'featured' : ''}`}>
              <div className="price-head">
                <div className="plan-name">{p.name}</div>
                <div className="plan-price">
                  {/* Use small tag to adjust the "Custom" text size */}
                  {p.id === 'enterprise' ? <small>{p.price}</small> : p.price}
                </div>
              </div>

              <ul className="plan-list text-muted">
                {p.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>

              <div className="text-center">
                <a className="btn btn-sm btn-primary" href="/pricing">
                    {p.id === 'enterprise' ? 'Contact Us' : `Choose ${p.name}`}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}