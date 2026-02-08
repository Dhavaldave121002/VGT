// src/components/Services/UIUX/Process.jsx
import React from 'react'
import './uiux.css' // Import the new CSS

export default function Process() {
  const steps = [
    { n: '1', title: 'Discovery & Research', text: 'Define the problem space through stakeholder interviews, analytics review, and deep user research.' },
    { n: '2', title: 'Structure & Planning', text: 'Develop Information Architecture (IA), user flows, and low-fidelity wireframes to establish the product foundation.' },
    { n: '3', title: 'Visual Design (UI)', text: 'Create high-fidelity mockups, define visual style, typography, color palettes, and prepare design tokens.' },
    { n: '4', title: 'Prototype & Test', text: 'Build interactive prototypes and conduct moderated or unmoderated usability testing to validate key flows and interactions.' },
    { n: '5', title: 'Handoff & Scale', text: 'Finalize design system documentation, provide full developer handoff, and offer ongoing QA and feature scaling support.' }
  ]

  return (
    <section className="uiux-process-section" id="process-section"> {/* Use new section class and ID */}
      <div className="container">
        <div className="text-center mb-5">
          <h3>Our 5-Step UI/UX Design Process ⚙️</h3>
          <p className="lead text-white">A collaborative, outcome-focused methodology designed to minimize risk and maximize user value.</p>
        </div>
        
        {/* Use col-lg-5ths for better spacing with 5 items, falling back to col-md-4 for 3 items per row on medium screens */}
        <div className="row g-4 justify-content-center">
          {steps.map((s, i) => (
            <div 
                className="col-12 col-sm-6 col-md-4 col-lg-2-4 process-item-col" /* Custom class for potential desktop layout fix */
                key={i}
            >
              <div className="process-card text-center h-100">
                <div className="step-number mx-auto">{s.n}</div>
                <h6 className="mt-2">{s.title}</h6>
                <p className="small text-white mb-0">{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}