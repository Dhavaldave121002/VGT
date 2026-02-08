import React from 'react'
import './sections.css'

export default function ServicesHighlights() {
  const items = [
    {
      id: 'speed',
      title: 'Blazing Performance',
      text: 'Optimized builds, CDN-ready assets and Lighthouse-friendly code for fast real-world speed.',
      // Icon fill color set to a consistent color or currentColor for CSS management
      icon: (<svg width="36" height="36" viewBox="0 0 24 24" className="highlight-svg" aria-hidden="true"><path d="M3 12h3l2-6 8-2-2 8-6 6-5-6z" fill="#0d6efd"/></svg>)
    },
    {
      id: 'secure',
      title: 'Secure by Default',
      text: 'Security best-practices, secure headers, encrypted transport and safe deployment workflows.',
      icon: (<svg width="36" height="36" viewBox="0 0 24 24" className="highlight-svg" aria-hidden="true"><path d="M12 1l7 4v5c0 5-3.8 10-7 12-3.2-2-7-7-7-12V5l7-4z" fill="#0dcaf0"/></svg>)
    },
    {
      id: 'scale',
      title: 'Scalable Architectures',
      text: 'Backend patterns that scale: APIs, microservices, caching and horizontal scaling made simple.',
      icon: (<svg width="36" height="36" viewBox="0 0 24 24" className="highlight-svg" aria-hidden="true"><path d="M12 2l4 4-4 4-4-4 4-4zm0 10l4 4-4 4-4-4 4-4z" fill="#7c5cff"/></svg>)
    }
  ]

  return (
    <section className="sections services-highlights container-fluid p-5" aria-label="Services highlights">
      <div className="text-center mb-4">
        <h3 className="section-title">What We Do Best</h3>
        <p className="section-intro text-muted">A short summary of our core strengths — engineered to perform.</p>
      </div>

      <div className="row g-4">
        {items.map(it => (
          <div key={it.id} className="col-12 col-md-4">
            <article className="feature-card h-100">
              <div className="feature-icon">{it.icon}</div>
              <h5>{it.title}</h5>
              <p className="text-muted">{it.text}</p>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}