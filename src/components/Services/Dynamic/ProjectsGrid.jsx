// src/components/Services/Dynamic/ProjectsGrid.jsx
import React from 'react'
import './dynamic.css' // Import the new CSS

export default function ProjectsGrid({ projects = [], onPreview }) {
  const visible = projects.slice(0, 6)
  
  return (
    <section className="section dynamic-projects-section">
      <div className="container">
        <div className="text-center mb-5">
            <h3>Featured Dynamic Projects</h3>
            <p className="lead text-muted">A showcase of recent work featuring custom CMS, integrations, and unique user experiences.</p>
        </div>

        <div className="row g-4"> {/* Increased gap for better spacing */}
          {visible.map(proj => (
            <div key={proj.id} className="col-sm-6 col-lg-4">
              <article className="card proj-card h-100">
                <img src={proj.thumb} alt={proj.title} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title mb-1">{proj.title}</h5>
                  <p className="text-muted small mb-3">{proj.excerpt}</p>
                  <div className="d-flex gap-2 mt-auto"> {/* mt-auto pushes buttons to the bottom */}
                    <button className="btn btn-sm btn-outline-light" onClick={() => onPreview(proj)}>Project Details</button>
                    <a href="/contact" className="btn btn-sm btn-primary">Enquire about this</a>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>

        {/* Optional: See All Projects Button */}
        {projects.length > 6 && (
            <div className="text-center mt-5">
                <a href="/portfolio" className="btn btn-lg btn-outline-light">See All {projects.length} Projects →</a>
            </div>
        )}
      </div>
    </section>
  )
}