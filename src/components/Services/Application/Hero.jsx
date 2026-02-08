// src/components/Services/Application/Hero.jsx
import React from 'react'
import './application.css' // Import the new CSS

export default function Hero() {
  return (
    <section className="app-hero" id="app-hero-section">
      <div className="container">
        <div className="row align-items-center gy-5"> {/* Increased vertical spacing */}
          <div className="col-lg-7">
            <p className="eyebrow">Application Development</p>
            <h1 className="display-5">Native & cross-platform apps that scale globally 🌎</h1>
            <p className="lead text-white">We build high-performance **Android, iOS, and cross-platform (React Native & Flutter)** applications, defined by clean code, robust architecture, and delightful user experience.</p>
            
            <div className="mt-4 d-flex gap-3"> {/* Increased gap */}
              <a href="#contact-form-section" className="btn btn-primary btn-lg">Request Quote</a>
              <a href="#process" className="btn btn-outline-light btn-lg">Our Process</a>
            </div>
          </div>

          <div className="col-lg-5 text-center">
            {/* Image of mobile and tablet mockups displaying an application interface */}
            <img src="/assets/app-hero-mock.png" alt="App development mockups for mobile and tablet" className="img-fluid rounded-3 shadow" /> 
          </div>
        </div>
      </div>
    </section>
  )
}