// src/components/Services/UIUX/Offerings.jsx
import React from 'react'
import './uiux.css' // Import the new CSS

export default function Offerings() {
  const items = [
    { t: 'User Research & Strategy', d: 'In-depth persona workshops, user interviews, competitive analysis, and information architecture design.' },
    { t: 'Interaction Design (UX)', d: 'Creation of detailed wireframes, user flow mapping, site mapping, and defining micro-interactions for seamless journeys.' },
    { t: 'Visual Design (UI)', d: 'Development of high-fidelity mockups, typography, color palettes, brand alignment, and ensuring WCAG accessibility standards.' },
    { t: 'Prototyping & Testing', d: 'Building interactive, clickable prototypes (Figma/Sketch) for fast iteration and validation through formal usability testing.' },
    { t: 'Design Systems & Documentation', d: 'Creating scalable component libraries, design tokens, style guides, and comprehensive documentation for developer handoff.' },
    { t: 'Design Audit & Consulting', d: 'Evaluation of existing products for usability flaws, performance issues, and accessibility gaps, with actionable recommendations.' }
  ]

  return (
    <section className="uiux-offerings-section" id="offerings"> {/* Use new section class */}
      <div className="container">
        <div className="text-center mb-5">
          <h3>Our End-to-End Design Offerings 💡</h3>
          <p className="lead text-white">We cover the entire product design lifecycle, ensuring a cohesive experience from initial concept to final system documentation.</p>
        </div>

        <div className="row g-4"> {/* Increased gap for better spacing */}
          {items.map((o, i) => (
            <div className="col-md-6 col-lg-4" key={i}>
              <div className="offering-card h-100">
                <h5 className="mb-2">{o.t}</h5>
                <p className="text-white small mb-0">{o.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}