// ContactForm.jsx
import React, { useState } from 'react'
import './ecommerce.css' // Import the new CSS

export default function ContactForm() {
  const [form, setForm] = useState({ name:'', email:'', company:'', budget:'', message:'' })
  const [errors, setErrors] = useState({})

  function change(e) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    setErrors(er => ({ ...er, [name]: undefined }))
  }

  function validate() {
    const err = {}
    if (!form.name.trim()) err.name = 'Please enter your name.'
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) err.email = 'A valid email address is required.'
    if (!form.message.trim()) err.message = 'Please share a short brief about your project.'
    return err
  }

  function sendQuote(e) {
    e.preventDefault()
    const err = validate()
    if (Object.keys(err).length) { setErrors(err); return }
    
    const subject = encodeURIComponent(`E-commerce Inquiry — ${form.company || 'No company'}`)
    const body = encodeURIComponent([
      `Name: ${form.name}`,
      `Company: ${form.company || 'N/A'}`,
      `Email: ${form.email}`,
      `Budget: ${form.budget || 'Not specified'}`,
      '',
      `Message:`,
      form.message
    ].join('\n'))
    
    window.location.href = `mailto:hello@vertexglobaltech.com?subject=${subject}&body=${body}`
    
    // Reset form after mailto attempt
    setForm({ name:'', email:'', company:'', budget:'', message:'' })
  }

  return (
    <form className="row g-3 ecom-contact-form" onSubmit={sendQuote} noValidate> {/* Added ecom-contact-form class and g-3 gap */}
      <div className="col-md-6">
        <input name="name" value={form.name} onChange={change} className={`form-control ${errors.name ? 'is-invalid' : ''}`} placeholder="Your Name *" />
        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
      </div>

      <div className="col-md-6">
        <input name="email" type="email" value={form.email} onChange={change} className={`form-control ${errors.email ? 'is-invalid' : ''}`} placeholder="Work Email *" />
        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
      </div>

      <div className="col-md-6">
        <input name="company" value={form.company} onChange={change} className="form-control" placeholder="Company Name (optional)" />
      </div>

      <div className="col-md-6">
        <input name="budget" value={form.budget} onChange={change} className="form-control" placeholder="Estimated Budget (e.g., $10,000+)" />
      </div>

      <div className="col-12">
        <textarea name="message" value={form.message} onChange={change} className={`form-control ${errors.message ? 'is-invalid' : ''}`} rows="4" placeholder="Short brief: e.g., catalog size, platform (Shopify/WooCommerce/Headless), key integrations required *"></textarea>
        {errors.message && <div className="invalid-feedback">{errors.message}</div>}
      </div>

      <div className="col-12 mt-4">
        <button type="submit" className="btn btn-primary btn-lg">Request Proposal</button>
        <a className="btn btn-outline-light btn-lg ms-2" href="/contact">Contact Sales Team →</a>
      </div>
    </form>
  )
}