// src/components/About/MissionVision.jsx
import React from 'react'
import './about.css' // Import the new CSS

export default function MissionVision() {
  return (
    <div className="row gy-4 mt-5 mission-vision">
      <div className="col-md-6">
        <article className="card sp-card p-4 h-100">
          <h3 className="mb-2">Our Mission 🚀</h3>
          <p className="text-white">Build digital products that **perform, convert and scale** — delivered with clarity and ownership.</p>
          <ul className="sp-feature-list">
            <li>Performance-first engineering</li>
            <li>Design with empathy</li>
            <li>Secure & maintainable systems</li>
          </ul>
        </article>
      </div>

      <div className="col-md-6">
        <article className="card sp-card p-4 h-100">
          <h3 className="mb-2">Our Vision ✨</h3>
          <p className="text-white">Be the trusted partner for product-driven companies — from **MVP to multi-million-user scale**.</p>
          <p className="mb-0"><strong>Focus:</strong> maintainability, measurable outcomes, and delightful UX.</p>
        </article>
      </div>
    </div>
  )
}