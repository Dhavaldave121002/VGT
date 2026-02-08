// src/components/Services/UIUX/Hero.jsx
import React from 'react'
import './uiux.css' // Import the new CSS

export default function Hero() {
  return (
    <section className="uiux-hero" id="hero-section"> {/* Use new section class and ID */}
      <div className="container">
        <div className="row align-items-center gy-5"> {/* Increased vertical spacing for mobile */}
          <div className="col-lg-7">
            <p className="eyebrow">User Interface & User Experience Design</p>
            <h1 className="display-5">Designing delightful digital interfaces that users truly love.</h1>
            <p className="lead text-white">
              We deliver **research-driven, conversion-focused** UI/UX solutions for web, mobile, and enterprise platforms, backed by comprehensive wireframes, interactive prototypes, and scalable design systems.
            </p>

            <div className="mt-4 d-flex gap-3">
              <a href="#contact-form-section" className="btn btn-primary btn-lg">Start a Project</a>
              <a href="#process-section" className="btn btn-outline-light btn-lg">See Our Process</a>
            </div>
          </div>

          <div className="col-lg-5 text-center">
            {/* Image representing a modern UI/UX workflow or mockups */}
            <img src="/assets/uiux-hero.png" alt="Clean and modern UI/UX mockups" className="img-fluid rounded-3 shadow" />
          </div>
        </div>
      </div>
    </section>
  )
}