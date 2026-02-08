// src/components/Services/Dynamic/Hero.jsx
import React from 'react'
import './dynamic.css' // Import the new CSS

export default function Hero() {
  return (
    <section className="dyn-hero"> {/* Removed py-6, use CSS padding */}
      <div className="container">
        <div className="row align-items-center gy-4">
          <div className="col-md-7">
            <p className="eyebrow">Dynamic Websites & Web Apps</p>
            <h1 className="display-5">Powerful, CMS-driven solutions for growth</h1>
            <p className="lead text-white">We build on technologies like **Next.js, React, and WordPress** — creating content-first, fast, and highly extensible platforms with custom admin panels, user roles, eCommerce integrations, and robust APIs.</p>

            <div className="d-flex gap-3 mt-4"> {/* Increased gap and margin */}
              <a className="btn btn-primary btn-lg" href="#contact">Start a Project</a>
              <a className="btn btn-outline-light btn-lg" href="#tech">Explore Our Tech</a>
            </div>
          </div>

          <div className="col-md-5 text-center">
            {/* Image of a dynamic website running on a laptop or tablet, showing an admin panel interface */}
            <img src="/assets/dyn-hero.png" alt="Dynamic site mock" className="img-fluid rounded-3 shadow" />
          </div>
        </div>
      </div>
    </section>
  )
}