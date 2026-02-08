// src/components/Services/Informative/Portfolio.jsx
import React from 'react'
import './informative.css' // Import the new CSS

export default function Portfolio({ items = [], onPreview }) {
  return (
    <section className="portfolio-section"> {/* Use class name for styling */}
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3>Selected Work</h3>
          <a href="/portfolio" className="link-primary">See all →</a>
        </div>

        <div className="row g-4"> {/* Adjusted gap for better spacing */}
          {items.map(p => (
            <div className="col-sm-6 col-lg-4" key={p.id}>
              <article className="card portfolio-card h-100">
                {/* Image of the portfolio thumbnail */}
                
                <img src={p.thumb} alt={p.title} className="card-img-top" />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title mb-1">{p.title}</h5>
                  <p className="text-muted small mb-3">{p.description}</p>
                  <div className="d-flex gap-2 mt-auto"> {/* MT-auto pushes buttons to bottom */}
                    <button className="btn btn-sm btn-outline-light" onClick={() => onPreview(p)}>Preview</button>
                    <a href="/contact" className="btn btn-sm btn-primary">Enquire</a>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}