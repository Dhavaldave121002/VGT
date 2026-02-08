// src/components/Services/Dynamic/ContactQuote.jsx
import React, { useState } from 'react'
import './dynamic.css' // Import the new CSS

export default function ContactQuote({ inline = false }) {
  const [form, setForm] = useState({ name: '', email: '', website: '', message: '', budget: '' })
  const [errors, setErrors] = useState({})

  function onChange(e) { 
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setErrors(err => ({ ...err, [e.target.name]: undefined }))
  }

  function sendQuote(e) {
    e?.preventDefault()
    
    // --- Basic Client-side Validation ---
    const err = {}
    if (!form.name.trim()) err.name = 'Name is required.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = 'Valid email is required.'
    if (!form.message.trim()) err.message = 'Project brief is required.'
    if (Object.keys(err).length) { setErrors(err); return }
    // ------------------------------------

    const subject = encodeURIComponent(`Dynamic Website Inquiry — ${form.website || 'No website'}`)
    const body = encodeURIComponent([
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Website: ${form.website || 'N/A'}`,
      `Estimated budget: ${form.budget || 'Not specified'}`,
      '',
      `Message:`,
      form.message
    ].join('\n'))
    
    window.location.href = `mailto:hello@vertexglobaltech.com?subject=${subject}&body=${body}`
    
    // Clear form after successful mailto attempt
    setForm({ name: '', email: '', website: '', message: '', budget: '' })
    setErrors({})
  }

  if (inline) {
    return (
      <section className="section dynamic-contact-section" id="contact">
        <div className="container">
          <div className="row g-4 align-items-center">
            
            {/* Form Column */}
            <div className="col-md-7">
              <h3 className="mb-2">Start Your Project: Request a Quote</h3>
              <p className="text-white mb-4">Tell us briefly about your dynamic project (goals, required features, budget) and we'll propose a detailed plan and timeline.</p>
              
              <form className="row g-3" onSubmit={sendQuote} noValidate>
                {/* Name & Email */}
                <div className="col-md-6">
                  <input className={`form-control ${errors.name ? 'is-invalid' : ''}`} name="name" placeholder="Your name *" value={form.name} onChange={onChange} required />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
                <div className="col-md-6">
                  <input className={`form-control ${errors.email ? 'is-invalid' : ''}`} name="email" type="email" placeholder="Work Email *" value={form.email} onChange={onChange} required />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                
                {/* Website & Budget */}
                <div className="col-md-6">
                  <input className="form-control" name="website" placeholder="Existing Website (optional)" value={form.website} onChange={onChange} />
                </div>
                <div className="col-md-6">
                  <input className="form-control" name="budget" placeholder="Estimated Budget (e.g., $5,000+)" value={form.budget} onChange={onChange} />
                </div>
                
                {/* Message */}
                <div className="col-12">
                  <textarea className={`form-control ${errors.message ? 'is-invalid' : ''}`} name="message" rows="4" placeholder="Brief outline of required features (e.g., custom login, eCommerce, integrations) *" value={form.message} onChange={onChange} required></textarea>
                  {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                </div>
                
                {/* Submit Button */}
                <div className="col-12 mt-4">
                  <button type="submit" className="btn btn-primary btn-lg">Send Request (Mail)</button>
                </div>
              </form>
            </div>

            {/* Aside Panel Column */}
            <aside className="col-md-5">
              <div className="card p-3 contact-panel">
                <h6>Need guidance or scoping help?</h6>
                <p className="small text-white mb-3">If you're unsure about the scope or required features, schedule a quick call with our technical team for free consultation and recommendations.</p>
                <a className="btn btn-outline-light" href="/contact">Book a Free Call →</a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    )
  }

  // Fallback CTA buttons
  return (
    <div className="text-center my-5">
      <div className="d-flex justify-content-center gap-3">
        <a className="btn btn-primary btn-lg" href="#contact">Request Quote</a>
        <a className="btn btn-outline-light btn-lg" href="#tech">Explore Our Tech</a>
      </div>
    </div>
  )
}