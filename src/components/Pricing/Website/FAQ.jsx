// src/components/Pricing/Website/FAQ.jsx
import React from 'react'
import '../../../pages/pricing/pricing.css' // Import the new CSS

export default function FAQ() {
  return (
    <section className="website-faq-section" id="faq-section">
      <div className="container">
        <h3 className="mb-4">Frequently Asked Questions ❓</h3>
        <div className="accordion" id="webPricingFaq">

          <div className="accordion-item">
            <h2 className="accordion-header" id="wfaq1">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#wcollapse1" aria-expanded="false" aria-controls="wcollapse1">
                **How long does a Dynamic (CMS) site typically take to complete?**
              </button>
            </h2>
            <div id="wcollapse1" className="accordion-collapse collapse" aria-labelledby="wfaq1" data-bs-parent="#webPricingFaq">
              <div className="accordion-body text-white">Dynamic CMS sites usually require **4–8 weeks** from kickoff to final launch. The duration is heavily dependent on the complexity of required integrations, custom post types, and client content delivery speed.</div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="wfaq2">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#wcollapse2" aria-expanded="false" aria-controls="wcollapse2">
                **Do you provide hosting, maintenance, and ongoing support?**
              </button>
            </h2>
            <div id="wcollapse2" className="accordion-collapse collapse" aria-labelledby="wfaq2" data-bs-parent="#webPricingFaq">
              <div className="accordion-body text-white">We offer optional **managed hosting** solutions (on platforms like Vercel, Netlify, or AWS) and dedicated **Monthly Maintenance Agreements (MMAs)**. MMAs cover security updates, backups, performance checks, and priority support.</div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="wfaq3">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#wcollapse3" aria-expanded="false" aria-controls="wcollapse3">
                **What technologies do you use for development?**
              </button>
            </h2>
            <div id="wcollapse3" className="accordion-collapse collapse" aria-labelledby="wfaq3" data-bs-parent="#webPricingFaq">
              <div className="accordion-body text-white">For modern websites, we primarily use the **JAMstack architecture** leveraging technologies like React/Next.js for the frontend, combined with headless CMS solutions (e.g., Strapi, Contentful) or optimized WordPress for backend content management.</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}