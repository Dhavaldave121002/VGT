// src/components/Pricing/UIUX/Comparison.jsx
import React from 'react'
import '../../../pages/pricing/pricing.css' // Import the new CSS

export default function Comparison() {
    const Check = <span className="comparison-check">✓</span>
    const Dash = <span className="comparison-text">—</span>
    const Clickable = <span className="comparison-highlight">Clickable (Hi-Fi)</span>
    const FullSystem = <span className="comparison-highlight">Full Component Library</span>

  return (
    <section className="uiux-comparison-section" id="comparison-table">
      <div className="container">
        <div className="text-center mb-4">
          <h4>Design Deliverables at a Glance 📐</h4>
          <p className="lead text-white">A clear comparison of the core design outputs and documentation provided with each package.</p>
        </div>

        <div className="table-responsive">
          <table className="table table-borderless pricing-table text-center">
            <thead>
              <tr><th>Deliverable</th><th>Discovery Workshop</th><th>Product UI/UX</th><th>Design System</th></tr>
            </thead>
            <tbody>
              <tr><td>User Discovery & Research</td><td>{Check}</td><td>{Check}</td><td>{Check}</td></tr>
              <tr><td>Low-Fidelity Wireframes</td><td>{Dash}</td><td>{Check}</td><td>{Check}</td></tr>
              <tr><td>High-Fidelity Mockups (UI)</td><td>{Dash}</td><td>{Check}</td><td>{Check}</td></tr>
              <tr><td>Interactive Prototype</td><td>{Dash}</td><td>{Clickable}</td><td>{FullSystem} (Reusable)</td></tr>
              <tr><td>Design Tokens & Specs</td><td>{Dash}</td><td>{Dash}</td><td><span className="comparison-highlight">Included</span></td></tr>
              <tr><td>Developer Handoff Files</td><td>{Dash}</td><td>Figma/Zeplin Ready</td><td>{FullSystem} + Documentation</td></tr>
            </tbody>
          </table>
        </div>
        
      </div>
    </section>
  )
}