// src/components/About/Values.jsx
import React from 'react'
import './about.css' // Import the new CSS

function ValueCard({ title, desc }) {
  return (
    <div className="col-12 col-md-6 col-lg-3">
      <div className="value-card p-3 h-100">
        {/* Changed icon content for better visual intent */}
        <div className="value-icon" aria-hidden="true">★</div> 
        <h5 className="mt-2 mb-1">{title}</h5>
        <p className="text-muted mb-0 small">{desc}</p>
      </div>
      </div>
  )
}

export default function Values() {
  return (
    <div className="values-wrap mt-5">
      <div className="text-center mb-4">
        <h3>Core values</h3>
        <p className="text-muted">Principles that guide our work and culture.</p>
      </div>

      <div className="row g-3">
        <ValueCard title="Ownership" desc="We take full responsibility and are committed to delivering measurable results." />
        <ValueCard title="Craftsmanship" desc="We uphold high standards for code quality, system security, and pixel-perfect design." />
        <ValueCard title="Simplicity" desc="We favor clear, maintainable solutions over complexity, ensuring easy future scaling." />
        <ValueCard title="Customer-first" desc="All decisions and innovations are driven by real user outcomes and proven data." />
      </div>
    </div>
  )
}