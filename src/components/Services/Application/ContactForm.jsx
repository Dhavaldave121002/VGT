// src/components/Services/Application/ContactForm.jsx
import React, { useState } from 'react'
import './application.css' // Import the new CSS

export default function ContactForm() {
    const [form, setForm] = useState({ name: '', email: '', company: '', platform: 'Both', budget: '', message: '' })
    const [errors, setErrors] = useState({})

    function change(e) {
        const { name, value } = e.target
        setForm(f => ({ ...f, [name]: value }))
        setErrors(er => ({ ...er, [name]: undefined }))
    }

    function validate() {
        const err = {}
        if (!form.name.trim()) err.name = 'Please enter your name'
        // Simple email validation
        if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) err.email = 'Valid email required'
        if (!form.message.trim()) err.message = 'Please provide a short brief'
        return err
    }

    function sendQuote(e) {
        e.preventDefault()
        const err = validate()
        if (Object.keys(err).length) { setErrors(err); return }

        // Construct the mailto link content
        const subject = encodeURIComponent(`Application Development Inquiry — ${form.company || 'No company'}`)
        const body = encodeURIComponent([
            `Name: ${form.name}`,
            `Company: ${form.company || '-'}`,
            `Email: ${form.email}`,
            `Platform: ${form.platform}`,
            `Estimated budget: ${form.budget || '-'}`,
            '',
            `Brief:`,
            form.message
        ].join('\n'))

        window.location.href = `mailto:hello@vertexglobaltech.com?subject=${subject}&body=${body}`
    }

    return (
        <section className="py-5" id="contact-form-section">
            <div className="container">
                <div className="text-center mb-5">
                    <h3>Start Your Mobile Application Project</h3>
                    <p className="lead text-white">Provide us with some details about your project goals, and we'll send a tailored proposal.</p>
                </div>

                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <form className="row g-4 app-contact-form" onSubmit={sendQuote} noValidate>

                            {/* Name and Email */}
                            <div className="col-md-6">
                                <input name="name" value={form.name} onChange={change} className={`form-control ${errors.name ? 'is-invalid' : ''}`} placeholder="Your name" />
                                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                            </div>

                            <div className="col-md-6">
                                <input name="email" type="email" value={form.email} onChange={change} className={`form-control ${errors.email ? 'is-invalid' : ''}`} placeholder="Work Email" />
                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                            </div>

                            {/* Company and Platform */}
                            <div className="col-md-6">
                                <input name="company" value={form.company} onChange={change} className="form-control" placeholder="Company (optional)" />
                            </div>

                            <div className="col-md-6">
                                <select name="platform" value={form.platform} onChange={change} className="form-select">
                                    <option disabled>Target Platform(s)</option>
                                    <option value="Both">Web & Mobile (Cross-platform)</option>
                                    <option value="Web">Mobile Application / SaaS</option>
                                    <option value="Android">Android Native</option>
                                    <option value="iOS">iOS Native</option>
                                </select>
                            </div>

                            {/* Budget */}
                            <div className="col-md-6">
                                <input name="budget" value={form.budget} onChange={change} className="form-control" placeholder="Estimated budget (e.g., $150k or 'TBD')" />
                            </div>

                            {/* Blank spacer for alignment */}
                            <div className="col-md-6">
                                <input className="form-control" placeholder="Optional Placeholder" disabled style={{ visibility: 'hidden' }} />
                            </div>

                            {/* Message Brief */}
                            <div className="col-12">
                                <textarea name="message" value={form.message} onChange={change} className={`form-control ${errors.message ? 'is-invalid' : ''}`} rows="5" placeholder="Project brief: Describe the core features, target users, and desired timeline."></textarea>
                                {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                            </div>

                            {/* Submission Buttons */}
                            <div className="col-12 mt-4">
                                <button type="submit" className="btn btn-primary btn-lg">Request Proposal</button>
                                <a className="btn btn-outline-light btn-lg ms-3" href="/contact">Book a Call</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}