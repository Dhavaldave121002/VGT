// src/components/Services/UIUX/ContactForm.jsx
import React, { useState } from 'react'
import './uiux.css' // Import the new CSS

export default function ContactForm() {
  const [form, setForm] = useState({ name:'', email:'', company:'', budget:'', message:'' })
  const [errors, setErrors] = useState({})

  function change(e) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  function validate() {
    const err = {}
    if (!form.name.trim()) err.name = 'Please enter your name'
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) err.email = 'Valid email required'
    if (!form.message.trim()) err.message = 'Please add a short brief'
    return err
  }

  function sendQuote(e) {
    e.preventDefault()
    const err = validate()
    if (Object.keys(err).length) { setErrors(err); return }
    
    // Prepare mailto link content
    const subject = encodeURIComponent(`UI/UX Project Inquiry — ${form.company || 'Private'}`)
    const body = encodeURIComponent([
      `Name: ${form.name}`,
      `Company: ${form.company || '-'}`,
      `Email: ${form.email}`,
      `Budget: ${form.budget || '-'}`,
      '',
      `--- Project Brief ---`,
      form.message
    ].join('\n'))
    
    // Open default mail client
    window.location.href = `mailto:hello@vertexglobaltech.com?subject=${subject}&body=${body}`
  }

  return (
    <section className="uiux-contact-section" id="contact-form-section">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="text-center mb-5">
                        <h3>Ready to Start Your Project? 🚀</h3>
                        <p className="lead text-white">Tell us about your design challenge. We'll respond within one business day with a customized approach and proposal.</p>
                    </div>
                    
                    <div className="app-contact-form">
                        <form className="row g-3" onSubmit={sendQuote} noValidate>
                            <div className="col-md-6">
                                <input 
                                    name="name" 
                                    value={form.name} 
                                    onChange={change} 
                                    className={`form-control ${errors.name ? 'is-invalid' : ''}`} 
                                    placeholder="Your Name *" 
                                />
                                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                            </div>

                            <div className="col-md-6">
                                <input 
                                    name="email" 
                                    value={form.email} 
                                    onChange={change} 
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`} 
                                    placeholder="Work Email *" 
                                />
                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                            </div>

                            <div className="col-md-6">
                                <input 
                                    name="company" 
                                    value={form.company} 
                                    onChange={change} 
                                    className="form-control" 
                                    placeholder="Company / Organization (Optional)" 
                                />
                            </div>

                            <div className="col-md-6">
                                <input 
                                    name="budget" 
                                    value={form.budget} 
                                    onChange={change} 
                                    className="form-control" 
                                    placeholder="Estimated Budget (Optional)" 
                                />
                            </div>

                            <div className="col-12">
                                <textarea 
                                    name="message" 
                                    value={form.message} 
                                    onChange={change} 
                                    className={`form-control ${errors.message ? 'is-invalid' : ''}`} 
                                    rows="5" 
                                    placeholder="Short project brief (Tell us about your users, goals, and required deliverables) *"
                                ></textarea>
                                {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                            </div>

                            <div className="col-12 mt-4 d-flex gap-3">
                                <button type="submit" className="btn btn-primary btn-lg">Request Proposal</button>
                                <a className="btn btn-outline-light btn-lg" href="/contact">Contact Sales Team</a>
                            </div>
                            <div className="col-12 mt-3">
                                <p className="small text-white text-start">* Required fields. Data will be opened in your default email client.</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}