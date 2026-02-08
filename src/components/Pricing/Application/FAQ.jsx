// src/components/Pricing/Application/FAQ.jsx
import React from 'react'
import '../../../pages/pricing/pricing.css' // Import the new CSS

export default function FAQ() {
  return (
    <section className="app-faq-section" id="faq-section">
      <div className="container">
        <h3 className="mb-4">Frequently Asked Questions 📱</h3>
        <div className="accordion" id="appPricingFaq">

          <div className="accordion-item">
            <h2 className="accordion-header" id="apfaq1">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#acollapse1" aria-expanded="false" aria-controls="acollapse1">
                **How do you handle App Store and Play Store submissions?**
              </button>
            </h2>
            <div id="acollapse1" className="accordion-collapse collapse" aria-labelledby="apfaq1" data-bs-parent="#appPricingFaq">
              <div className="accordion-body text-white">We manage the full submission process for both the **Google Play Store and Apple App Store**. This includes preparing all required assets (screenshots, icons), drafting the description, ensuring compliance with review guidelines (like privacy policies), and handling any feedback from the review teams until the app is live.</div>
            </div>
          </div>
          
          <div className="accordion-item">
            <h2 className="accordion-header" id="apfaq2">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#acollapse2" aria-expanded="false" aria-controls="acollapse2">
                **What is the difference between Native and Cross-Platform development?**
              </button>
            </h2>
            <div id="acollapse2" className="accordion-collapse collapse" aria-labelledby="apfaq2" data-bs-parent="#appPricingFaq">
              <div className="accordion-body text-white">
                **Native** development uses platform-specific languages (Swift/Kotlin) for maximum performance and direct hardware access. **Cross-Platform** (e.g., React Native, Flutter) uses a single codebase to deploy to both iOS and Android, offering faster development but sometimes less fine-tuned performance. The choice depends on your budget, timeline, and feature requirements.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="apfaq3">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#acollapse3" aria-expanded="false" aria-controls="acollapse3">
                **Are hosting/backend costs included in the upfront pricing?**
              </button>
            </h2>
            <div id="acollapse3" className="accordion-collapse collapse" aria-labelledby="apfaq3" data-bs-parent="#appPricingFaq">
              <div className="accordion-body text-white">
                The pricing tiers primarily cover **development, testing, and launch preparation**. Ongoing server hosting and backend maintenance costs (like AWS, Azure, or Google Cloud fees) are billed separately or managed by the client after launch, as these fees vary based on user load and data storage requirements.
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}