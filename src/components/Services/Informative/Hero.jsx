// src/components/Services/Informative/Hero.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import './informative.css' // Import the new CSS

export default function Hero() {
  return (
    <section className="inf-hero">
      <div className="container">
        <div className="row align-items-center gy-4">
          <div className="col-md-7">
            <p className="eyebrow">Informative Websites</p>
            <h1 className="display-5">Beautiful, fast brochure websites that convert</h1>
            <p className="lead text-muted">Perfect for businesses, professionals and agencies — SEO-friendly, mobile-ready and simple to manage.</p>
            <div className="mt-3 d-flex gap-2">
              <Link to="/contact" className="btn btn-primary btn-lg">Get a Quote</Link>
              <a href="#pricing" className="btn btn-outline-light btn-lg">See Pricing</a>
            </div>
          </div>

          <div className="col-md-5 text-center">
            <div className="hero-mockup">
              {/* Trigger an image of a professional, clean website mockup */}
              
              <img src="/assets/inf-hero-mock.png" alt="Website mockup" className="img-fluid rounded-3 shadow-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}