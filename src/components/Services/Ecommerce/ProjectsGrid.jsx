// ProjectsGrid.jsx
import React from 'react'
import './ecommerce.css' // Import the new CSS

export default function ProjectsGrid({ projects = [], onPreview }) {
  if (!Array.isArray(projects) || projects.length === 0) {
    return (
        <section className="ecom-projects-grid-section">
            <div className="container text-center">
                <p className="text-white lead">No featured e-commerce case studies available yet.</p>
            </div>
        </section>
    )
  }
  
  const visible = projects.slice(0, 6);

  return (
    <section className="ecom-projects-grid-section">
        <div className="container">
            <div className="text-center mb-5">
                <h3>E-commerce Project Case Studies</h3>
                <p className="lead text-white">A showcase of recent e-commerce solutions that drive sales and improve operational efficiency.</p>
            </div>

            <div className="row g-4 justify-content-center"> {/* Increased gap for better spacing */}
              {visible.map(p => (
                <div key={p.id} className="col-sm-6 col-lg-4">
                  <article className="card proj-card h-100">
                    <img src={p.thumb} alt={p.title} className="card-img-top" />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title mb-1">{p.title}</h5>
                      <p className="text-white small mb-2">{p.excerpt}</p>
                      <div className="mt-auto d-flex gap-2"> {/* mt-auto pushes buttons to the bottom */}
                        <button className="btn btn-sm btn-outline-light" onClick={() => onPreview(p)}>View Case Study</button>
                        <a className="btn btn-sm btn-primary" href="/contact">Enquire</a>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>

            {/* Optional: See All Projects Button */}
            {projects.length > 6 && (
                <div className="text-center mt-5">
                    <a href="/portfolio/e-commerce" className="btn btn-lg btn-outline-light">See All {projects.length} Case Studies →</a>
                </div>
            )}
        </div>
    </section>
  )
}