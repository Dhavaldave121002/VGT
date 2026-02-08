// src/components/Pricing/UIUX/FAQ.jsx
import React from 'react'
import '../../../pages/pricing/pricing.css' // Import the new CSS

export default function FAQ() {
  return (
    <section className="uiux-faq-section" id="faq-section">
      <div className="container">
        <h3 className="mb-4">Frequently Asked Questions about Design 🎨</h3>
        <div className="accordion" id="uiuxPricingFaq">

          <div className="accordion-item">
            <h2 className="accordion-header" id="uipfaq1">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#uipcollapse1" aria-expanded="false" aria-controls="uipcollapse1">
                **How do design handoffs work for my development team?**
              </button>
            </h2>
            <div id="uipcollapse1" className="accordion-collapse collapse" aria-labelledby="uipfaq1" data-bs-parent="#uiuxPricingFaq">
              <div className="accordion-body text-white">
                We deliver a complete package via **Figma** (or your preferred tool like Zeplin/Sketch). This includes organized, production-ready design files, detailed **component specifications, design tokens** (for easy variable implementation), and a dedicated handoff document outlining flow, states, and responsive behavior. We also provide initial CSS/code snippets where requested.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="uipfaq2">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#uipcollapse2" aria-expanded="false" aria-controls="uipcollapse2">
                **What is a Design System, and why would I need one?**
              </button>
            </h2>
            <div id="uipcollapse2" className="accordion-collapse collapse" aria-labelledby="uipfaq2" data-bs-parent="#uiuxPricingFaq">
              <div className="accordion-body text-white">
                A **Design System** is a single source of truth for all design decisions, containing reusable UI components, guidelines, and visual styles. It's essential for **scaling** your product, ensuring **consistency** across multiple platforms, and dramatically speeding up future development and design iterations. It saves time and prevents design drift as your product grows.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="uipfaq3">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#uipcollapse3" aria-expanded="false" aria-controls="uipcollapse3">
                **How many revisions are included in the Product UI/UX package?**
              </button>
            </h2>
            <div id="uipcollapse3" className="accordion-collapse collapse" aria-labelledby="uipfaq3" data-bs-parent="#uiuxPricingFaq">
              <div className="accordion-body text-white">
                The **Product UI/UX** package typically includes **two full rounds of revisions** after the initial presentation of wireframes and high-fidelity mockups, plus minor adjustments during the final polish phase. Our process emphasizes continuous collaboration to ensure we meet your vision quickly and efficiently.
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}