// src/components/Services/Dynamic/Features.jsx
import React from 'react'
import './dynamic.css' // Import the new CSS

export default function Features() {
  const features = [
    {t:'Headless CMS', d:'Content management systems (Strapi, Sanity, Contentful) for flexible, API-driven content editing.'},
    {t:'SEO & SSR', d:'Server-Side Rendering (SSR) for guaranteed search engine optimization (SEO) and incredibly fast initial load times.'},
    {t:'Authentication', d:'Robust user accounts, secure gated content, and protected routes using modern token-based authorization.'},
    {t:'Integrations', d:'Seamless connections to payments (Stripe), CRM, analytics (GA4), and marketing automation platforms.'},
    {t:'eCommerce Engine', d:'Full product catalogs, shopping cart, and secure checkout integrated with leading eCommerce solutions.'},
    {t:'Scalable Hosting', d:'Global CDN, intelligent caching, image optimization, and enterprise-grade monitoring for high-traffic sites.'}
  ]
  return (
    <section className="dynamic-features-section" id="features"> {/* Added section class and ID */}
      <div className="container">
        <div className="text-center mb-5"> {/* Increased margin bottom */}
          <h3>Core Features of Our Dynamic Sites</h3>
          <p className="lead text-white">Every project includes essential elements like custom admin dashboards, content workflows, user roles, third-party integrations, and scalable hosting.</p>
        </div>

        <div className="row g-4"> {/* Increased gap for better spacing */}
          {features.map((f,i) => (
            <div key={i} className="col-md-6 col-lg-4"> {/* Adjusted column sizing for better layout */}
              <div className="feature-card h-100">
                <h5 className="mb-2">{f.t}</h5>
                <p className="text-white small mb-0">{f.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}