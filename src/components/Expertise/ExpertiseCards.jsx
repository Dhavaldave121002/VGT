import React, { useState } from 'react'
import './expertise.css'

const cardsData = [
  {
    id: 'website',
    title: 'Website Development',
    short: 'SEO-first, fast & responsive websites',
    details: [
      'Informative & brochure sites',
      'Dynamic content & CMS',
      'High-converting e-commerce'
    ],
    cta: { text: 'See Website Services', href: '/services#website' }
  },
  {
    id: 'application',
    title: 'Application Development',
    short: 'Native & cross-platform apps',
    details: [
      'Android & iOS native apps',
      'Cross-platform (Flutter/React Native)',
      'Store submission & maintenance'
    ],
    cta: { text: 'See App Services', href: '/services#application' }
  },
  {
    id: 'uiux',
    title: 'UI / UX Design',
    short: 'Research-driven design systems',
    details: [
      'Research & user flows',
      'Prototypes & interaction design',
      'Design systems & handoffs'
    ],
    cta: { text: 'See UI/UX Services', href: '/services#uiux' }
  }
]

export default function ExpertiseCards() {
  const [flipped, setFlipped] = useState({})

  const toggle = (id) => setFlipped(s => ({ ...s, [id]: !s[id] }))

  return (
    <section className="expertise-section container-fluid p-0 m-0" aria-label="Our Core Expertise">
      <div className="text-center mb-4">
        <h3 className="section-title">Our Core Expertise</h3>
        <p className="section-intro text-muted">Focused services that scale your product — engineered for performance, UX and growth.</p>
      </div>

      <div className="container-fluid p-0 m-0">
        <div className="row g-4">
          {cardsData.map(c => (
            <div key={c.id} className="col-12 col-md-6 col-lg-4 d-flex">
              <div
                className={`flip-card ${flipped[c.id] ? 'is-flipped' : ''}`}
                tabIndex={0}
                role="button"
                aria-pressed={!!flipped[c.id]}
                onClick={() => toggle(c.id)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(c.id) } }}
              >
                <div className="flip-card-inner">
                  <div className="flip-card-face flip-card-front">
                    <div className="icon-wrap" aria-hidden="true">
                      {/* Use currentColor for fill for CSS control */}
                      {c.id === 'website' && (<svg width="44" height="44" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h18v14H3z" fill="currentColor" opacity="0.12"/><path d="M4 6h16v10H4z" fill="currentColor"/></svg>)}
                      {c.id === 'application' && (<svg width="44" height="44" viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="2" width="16" height="20" rx="2" fill="currentColor"/></svg>)}
                      {c.id === 'uiux' && (<svg width="44" height="44" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="6" fill="currentColor"/></svg>)}
                    </div>

                    <h5 className="card-title">{c.title}</h5>
                    <p className="card-sub">{c.short}</p>
                    <div className="learn-more"><span className="link-cta">Tap to view →</span></div>
                  </div>

                  <div className="flip-card-face flip-card-back">
                    <div className="card-back-content">
                      <ul className="back-list">
                        {c.details.map((d, idx) => <li key={idx}>{d}</li>)}
                      </ul>
                      <a className="btn btn-sm btn-primary mt-3" href={c.cta.href}>{c.cta.text}</a>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}