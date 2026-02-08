// src/components/Services/Informative/Process.jsx
import React from 'react'
import './informative.css' // Import the new CSS

function Step({ step, title, text }) {
  return (
    <div className="col-md-6 col-lg-3 text-center">
      <div className="process-step p-3 h-100">
        <div className="step-number mb-2">{step}</div>
        <h6>{title}</h6>
        <p className="text-muted small mb-0">{text}</p>
      </div>
    </div>
  )
}

export default function Process() {
  return (
    <section className="process-section"> {/* Use class name for styling */}
      <div className="container">
        <div className="text-center mb-5">
          <h3>Our Process</h3>
          <p className="text-muted lead">A simple four-step process to ship quickly and predictably.</p>
          
        </div>

        <div className="row g-4 justify-content-center"> {/* Adjusted gap and alignment */}
          <Step step="1" title="Discovery" text="Workshop, goals, user questions and sitemap definition." />
          <Step step="2" title="Design" text="Wireframes, high-fidelity visual design and conversion path mapping." />
          <Step step="3" title="Build" text="Fast, accessible implementation using modern stacks (Next.js/React) and rigorous QA." />
          <Step step="4" title="Launch & Handover" text="Secure deployment, performance monitoring, and comprehensive documentation handover." />
        </div>
      </div>
    </section>
  )
}