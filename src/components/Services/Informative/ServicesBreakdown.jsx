// src/components/Services/Informative/ServicesBreakdown.jsx
import React from 'react'
import './informative.css' // Import the new CSS

export default function ServicesBreakdown() {
  return (
    <section className="breakdown-section"> {/* Use class name for styling */}
      <div className="container">
        <div className="row g-4">
          <div className="col-md-6 pe-md-5"> {/* Added padding for separator */}
            <h4>What We Build & Optimize</h4>
            <p className="text-muted">Informative websites typically include Home, About, Services, Case Studies, Blog, and Contact pages — each designed and optimised for specific conversion goals.</p>

            <ul className="list-unstyled">
              <li>Homepage & clear hero CTA</li>
              <li>Detailed Services & Case Studies pages</li>
              <li>Contact, inquiry forms & dedicated lead capture</li>
              <li>Integrated Basic Blog (optional CMS integration)</li>
              <li>Fully compliant Privacy Policy & Terms pages</li>
            </ul>
          </div>

          <div className="col-md-6 ps-md-5"> {/* Added padding for separator */}
            <h4>Technology & Handover</h4>
            <p className="text-muted">We use modern, lightweight **JAMstack** frameworks (Next.js/React, Gatsby) hosted on fast CDN platforms to deliver maximum performance and security.</p>

            <div className="mt-4">
              <span className="badge me-2">SEO-Ready & Semantic</span>
              <span className="badge me-2">WCAG Accessible</span>
              <span className="badge me-2">Lightning Fast Performance</span>
                <span className="badge me-2">Video Training & Docs</span>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  )
}