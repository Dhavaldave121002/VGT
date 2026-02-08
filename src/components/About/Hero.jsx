// src/components/About/Hero.jsx
import React from 'react'
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <div className="row align-items-center gy-4 about-hero">
      <div className="col-lg-6">
        <p className="eyebrow">About Vertex Global Tech</p>
        <h1 className="hero-title">We design & engineer high-impact digital products</h1>
        <p className="lead hero-sub text-white">
          **Fast, secure and maintainable** websites, mobile apps and design systems — built for growth.
          We blend product thinking, modern engineering and measurable UX to deliver results.
        </p>

        <div className="d-flex flex-wrap gap-2 mt-4">
          <Link to="/contact" className="btn btn-primary btn-lg">Get a Quote</Link>
          <Link to="/services/informative" className="btn btn-outline-light btn-lg">Our Services</Link>
        </div>
      </div>

      <div className="col-lg-6 text-center hero-visual-wrap">
        <img src="/assets/about-hero.png" alt="Team collaborating on digital products in a modern office setting" className="img-fluid hero-visual" />
      </div>
    </div>
  )
}