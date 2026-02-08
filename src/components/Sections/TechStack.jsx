import React from 'react'
import './sections.css'

export default function TechStack() {
  const stack = ['React', 'Bootstrap', 'Node.js', 'Firebase', 'Flutter', 'Postgres']

  return (
    <section className="sections tech-stack container-fluid p-5" aria-label="Technology stack">
      <div className="text-center mb-3">
        <h3 className="section-title">Tech we use</h3>
        <p className="section-intro text-muted">Trusted, modern tools we use to deliver stable products.</p>
      </div>

      <div className="d-flex flex-wrap gap-3 justify-content-center mt-3">
        {stack.map((s) => (
          <div key={s} className="tech-chip" aria-hidden="true">
            {/* The SVG now contains the linear gradient definition */}
            <svg width="22" height="22" viewBox="0 0 24 24" className="chip-icon" aria-hidden="true">
                <defs>
                    <linearGradient id="chipGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{stopColor: '#0dcaf0'}} />
                        <stop offset="100%" style={{stopColor: '#0d6efd'}} />
                    </linearGradient>
                </defs>
                {/* The circle now uses the defined SVG gradient */}
                <circle cx="12" cy="12" r="10" fill="none" stroke="url(#chipGradient)" strokeWidth="2.5" />
            </svg>
            <span className="chip-label">{s}</span>
          </div>
        ))}
      </div>
    </section>
  )
}