// src/components/Services/Application/CaseStudies.jsx
import React from 'react'
import './application.css' // Import the new CSS

export default function CaseStudies({ projects = [], loading = false, onPreview }) {
  const visibleProjects = projects.slice(0, 6);

  if (loading) {
    return (
        <section className="app-case-studies-section text-center">
            <p className="lead text-white">Loading application projects…</p>
        </section>
    );
  }

  if (!Array.isArray(projects) || projects.length === 0) {
    return (
        <section className="app-case-studies-section text-center">
            <p className="lead text-white">No featured application case studies available. Please add project entries.</p>
        </section>
    );
  }

  return (
    <section className="app-case-studies-section">
        <div className="container">
            <div className="text-center mb-5">
                <h3>Featured Application Case Studies 🚀</h3>
                <p className="lead text-white">A showcase of custom web, mobile, and SaaS applications we've successfully delivered.</p>
            </div>
            
            <div className="row g-4 justify-content-center"> {/* Use g-4 for better spacing */}
              {visibleProjects.map(p => (
                <div key={p.id} className="col-sm-6 col-lg-4">
                  <article className="card proj-card h-100">
                    <img src={p.thumb} alt={p.title} className="card-img-top" />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title mb-1">{p.title}</h5>
                      <p className="text-white small mb-2">{p.excerpt}</p>
                      <div className="mt-auto d-flex gap-2"> {/* mt-auto pushes buttons to the bottom */}
                        <button className="btn btn-sm btn-outline-light" onClick={() => onPreview(p)}>View Details</button>
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
                    <a href="/portfolio/applications" className="btn btn-lg btn-outline-light">See All Projects →</a>
                </div>
            )}
        </div>
    </section>
  )
}