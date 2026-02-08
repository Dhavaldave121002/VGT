// src/components/Services/UIUX/CaseStudies.jsx
import React from 'react'
import './uiux.css' // Import the new CSS

export default function CaseStudies({ projects = [], loading = false, onPreview }) {
  
    if (loading) return (
        <section className="uiux-case-studies-section py-5">
            <div className="container">
                <p className="text-center text-white">Loading UI/UX case studies...</p>
            </div>
        </section>
    )

  if (!Array.isArray(projects) || projects.length === 0) {
    return (
        <section className="uiux-case-studies-section py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <p className="text-center text-white">
                            No recent UI/UX case studies available yet. Please add data to <code>public/data/projects.json</code>.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
  }

  return (
    <section className="uiux-case-studies-section" id="case-studies">
        <div className="container">
            <div className="text-center mb-5">
                <h3>Featured UI/UX Case Studies 🎨</h3>
                <p className="lead text-white">A selection of projects where our research-driven design process delivered measurable user experience improvements and stunning interfaces.</p>
            </div>

            <div className="row g-4"> {/* Increased gap for better spacing */}
                {projects.slice(0,6).map(p => (
                    <div key={p.id} className="col-sm-6 col-lg-4">
                        <article className="card proj-card h-100">
                            {/* Use thumb image for the visual mockup */}
                            <img src={p.thumb} alt={`UI/UX Mockup for ${p.title}`} className="card-img-top" />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title mb-1">{p.title}</h5>
                                <p className="text-white small mb-3 flex-grow-1">{p.excerpt}</p>
                                <div className="mt-auto d-flex gap-3"> {/* Increased gap */}
                                    <button 
                                        className="btn btn-sm btn-outline-light w-100" 
                                        onClick={() => onPreview(p)}
                                    >
                                        View Details
                                    </button>
                                    <a className="btn btn-sm btn-primary w-100" href="/contact">Start Project</a>
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