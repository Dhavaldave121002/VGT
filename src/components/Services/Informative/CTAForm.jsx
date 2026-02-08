// src/components/Services/Informative/CTAForm.jsx
import React, { useState } from 'react'
import './informative.css' // Import the new CSS

export default function CTAForm() {
  const [quote, setQuote] = useState({ name: '', email: '', website: '', message: '' })
  const [errors, setErrors] = useState({})

  function change(e) {
    const { name, value } = e.target
    setQuote(q => ({ ...q, [name]: value }))
    setErrors(err => ({ ...err, [name]: undefined }))
  }

  function sendQuote(e) {
    e.preventDefault()
    const err = {}
    if (!quote.name.trim()) err.name = 'Enter your name'
    if (!/^\S+@\S+\.\S+$/.test(quote.email)) err.email = 'Enter a valid email'
    if (!quote.message.trim()) err.message = 'Give a short brief'
    if (Object.keys(err).length) { setErrors(err); return }
    
    // Prepare mailto link
    const subject = encodeURIComponent('Website Inquiry — Informative Website')
    const body = encodeURIComponent(`Name: ${quote.name}\nEmail: ${quote.email}\nWebsite: ${quote.website || 'N/A'}\n\nMessage:\n${quote.message}`)
    window.location.href = `mailto:hello@vertexglobaltech.com?subject=${subject}&body=${body}`

    // Optionally reset the form fields after successful mailto trigger
    // Note: This relies on the user completing the email submission.
    setQuote({ name: '', email: '', website: '', message: '' }) 
  }

  return (
    <section className="cta-section"> {/* Use class name for styling */}
      <div className="container">
        <div className="cta-card p-5 text-center"> {/* Increased padding */}
          <h4>Ready to start your informative website project?</h4>
          <p className="text-muted mb-4">Provide a few quick details and we’ll prepare a tailored quote, usually within 24 hours.</p>
          <div className="row justify-content-center">
            <div className="col-md-9">
              <form className="row g-3" onSubmit={sendQuote} noValidate> {/* Increased gap */}
                
                {/* Input Fields */}
                <div className="col-md-4">
                  <input name="name" value={quote.name} onChange={change} className={`form-control ${errors.name ? 'is-invalid' : ''}`} placeholder="Your Name *" />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
                <div className="col-md-4">
                  <input name="email" type="email" value={quote.email} onChange={change} className={`form-control ${errors.email ? 'is-invalid' : ''}`} placeholder="Work Email *" />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                <div className="col-md-4">
                  <input name="website" value={quote.website} onChange={change} className="form-control" placeholder="Existing Website (optional)" />
                </div>

                <div className="col-12">
                  <textarea name="message" value={quote.message} onChange={change} className={`form-control ${errors.message ? 'is-invalid' : ''}`} rows="3" placeholder="Short brief: goals, required pages, desired deadline *"></textarea>
                  {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                </div>

                {/* Buttons */}
                <div className="col-12 mt-4">
                  <button className="btn btn-primary btn-lg me-3">Request Free Quote (Email)</button>
                  <a className="btn btn-outline-light btn-lg" href="/contact">View Other Contact Options</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}