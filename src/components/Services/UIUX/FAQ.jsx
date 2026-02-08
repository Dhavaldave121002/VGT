// src/components/Services/UIUX/FAQ.jsx
import React from 'react'
import './uiux.css' // Import the new CSS

export default function FAQ() {
  return (
    <section className="uiux-faq-section" id="faq"> {/* Use new section class */}
      <div className="container">
        <h3 className="mb-5 text-center">Frequently Asked Questions 🤔</h3>

        <div className="accordion" id="uiuxFaq">
          <div className="accordion-item">
            <h2 className="accordion-header" id="q1">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#u1" aria-expanded="false" aria-controls="u1">
                How do you handoff final designs to developers?
              </button>
            </h2>
            <div id="u1" className="accordion-collapse collapse" aria-labelledby="q1" data-bs-parent="#uiuxFaq">
              <div className="accordion-body text-white">We provide full access to the source files (Figma or Sketch), a dedicated **Design System**, detailed component specifications, CSS/styling tokens, and code snippets to ensure the handoff is frictionless and the final product is pixel-perfect.</div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="q2">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#u2" aria-expanded="false" aria-controls="u2">
                Is usability testing included in your design process?
              </button>
            </h2>
            <div id="u2" className="accordion-collapse collapse" aria-labelledby="q2" data-bs-parent="#uiuxFaq">
              <div className="accordion-body text-white">Yes — we strongly recommend incorporating **usability testing** (moderated or unmoderated) at key prototyping stages. This ensures the design decisions are validated by real users, leading to measurable improvements in conversion and satisfaction.</div>
            </div>
          </div>
          
          <div className="accordion-item">
            <h2 className="accordion-header" id="q3">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#u3" aria-expanded="false" aria-controls="u3">
                How long does a typical UI/UX project take?
              </button>
            </h2>
            <div id="u3" className="accordion-collapse collapse" aria-labelledby="q3" data-bs-parent="#uiuxFaq">
              <div className="accordion-body text-white">The duration varies significantly based on complexity. A full **Discovery and MVP Design** project usually spans **4 to 8 weeks**, covering research, wireframing, high-fidelity mockups, and prototyping. A short design audit or feature refinement can take 1-2 weeks.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}