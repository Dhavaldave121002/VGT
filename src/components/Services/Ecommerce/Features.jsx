// Features.jsx
import React from 'react'
import './ecommerce.css' // Import the new CSS

export default function Features() {
  const items = [
    { t: 'Product Catalog & Search', d: 'High-performance browsing, faceted search, filters, and product variants management.' },
    { t: 'Secure Payment Gateways', d: 'Integration with Stripe, Razorpay, PayPal, and local gateways for secure, fast transactions.' },
    { t: 'Optimised Checkout & Cart', d: 'A/B tested checkout flows, single-page options, and automated abandoned cart recovery.' },
    { t: 'Inventory & Order Management', d: 'Dedicated admin dashboards for real-time stock levels, returns, and order fulfillment workflows.' },
    { t: 'Shipping & Tax Configuration', d: 'Carrier integration (FedEx, UPS), dynamic live rate calculations, and accurate international tax rules.' },
    { t: 'Performance, SEO & Analytics', d: 'Next.js/SSR for SEO, CDN, image optimization, and full GA4 integration for performance monitoring.' }
  ]

  return (
    <section className="ecom-features-section" id="features">
      <div className="container">
        <div className="text-center mb-5">
          <h3>Core E-commerce Capabilities</h3>
          <p className="lead text-white">We deliver the end-to-end infrastructure required for high-volume sales and seamless operations.</p>
        </div>

        <div className="row g-4"> {/* Increased gap for better spacing */}
          {items.map((it, i) => (
            <div key={i} className="col-md-6 col-lg-4">
              <div className="ecom-feature p-3 h-100">
                <h5 className="mb-2">{it.t}</h5>
                <p className="text-white small mb-0">{it.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}