// src/components/Services/Informative/FAQ.jsx
import React from 'react'
import './informative.css' // Import the new CSS

export default function FAQ() {
  return (
    <section className="faq-section"> {/* Use class name for styling */}
      <div className="container">
        <h3 className="mb-4 text-center">Frequently Asked Questions</h3>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="accordion" id="infFaq">
              
              <div className="accordion-item">
                <h2 className="accordion-header" id="faq1">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="false" aria-controls="collapse1">
                    How long does an informative site take?
                  </button>
                </h2>
                <div id="collapse1" className="accordion-collapse collapse" aria-labelledby="faq1" data-bs-parent="#infFaq">
                  <div className="accordion-body text-muted">
                    Usually **2–4 weeks** for a Starter site, depending heavily on feedback speed and content readiness. Larger, custom projects take longer.
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header" id="faq2">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse2" aria-expanded="false" aria-controls="collapse2">
                    Do you provide content & images?
                  </button>
                </h2>
                <div id="collapse2" className="accordion-collapse collapse" aria-labelledby="faq2" data-bs-parent="#infFaq">
                  <div className="accordion-body text-muted">
                    **Yes**, we offer professional copywriting and licensed stock imagery services for an extra fee. Alternatively, you can provide all your own text and assets.
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header" id="faq3">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse3" aria-expanded="false" aria-controls="collapse3">
                    What technology stack do you use?
                  </button>
                </h2>
                <div id="collapse3" className="accordion-collapse collapse" aria-labelledby="faq3" data-bs-parent="#infFaq">
                  <div className="accordion-body text-muted">
                    We primarily use the **JAMstack** architecture, often built with **Next.js or React**, hosted on Vercel or Netlify, and using a modern Headless CMS for content. This guarantees speed and SEO performance.
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header" id="faq4">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse4" aria-expanded="false" aria-controls="collapse4">
                    How is maintenance handled?
                  </button>
                </h2>
                <div id="collapse4" className="accordion-collapse collapse" aria-labelledby="faq4" data-bs-parent="#infFaq">
                  <div className="accordion-body text-muted">
                    We offer **post-launch maintenance packages** covering hosting, security updates, and minor content changes. Alternatively, the site is handed over for your team to manage via the CMS.
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}