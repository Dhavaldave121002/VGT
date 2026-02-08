import React from 'react'
import './sections.css'
import { Link } from 'react-router-dom'

export default function ContactCTA() {
  return (
    <section className="sections contact-cta py-5 mt-0" aria-label="Contact call to action">
      <div className="container">
        <div className="cta-inner rounded-3 p-4 d-flex flex-column flex-md-row align-items-center justify-content-between">
          <div>
            <h4 className="mb-1">Ready to build something great?</h4>
            <p className="mb-0 text-muted">Tell us about your project — we’ll propose a clear plan and timeline.</p>
          </div>

          <div className="mt-3 mt-md-0">
            <Link to="/contact" className="btn btn-lg btn-primary">Get a Quote</Link>
          </div>
        </div>
      </div>
    </section>
  )
}