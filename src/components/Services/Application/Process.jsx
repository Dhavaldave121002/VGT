// src/components/Services/Application/Process.jsx
import React from 'react'
import './application.css' // Import the new CSS

export default function Process() {
  const steps = [
    { title: '1. Discovery & Strategy', desc: 'Define goals, target users, core features, metrics, and select the optimal technology stack.' },
    { title: '2. UX/UI Design', desc: 'Create wireframes, high-fidelity prototypes, conduct interaction design, and perform usability testing.' },
    { title: '3. Agile Development', desc: 'Build modular code in sprints, implement automated testing (unit/integration), and set up Continuous Integration.' },
    { title: '4. Quality Assurance', desc: 'Comprehensive testing including security audits, performance profiling, device compatibility, and user acceptance testing (UAT).' },
    { title: '5. Launch & Support', desc: 'Final store submission (App/Play Store), post-launch monitoring, performance tracking, and ongoing maintenance.' }
  ]

  return (
    <section id="process" className="app-process-section"> {/* Use new section class */}
      <div className="container">
        <div className="text-center mb-5">
          <h3>Our Application Development Process ⚙️</h3>
          <p className="lead text-white">A structured, iterative, and test-driven approach designed to deliver robust, high-quality applications on time.</p>
        </div>

        <div className="row g-4 justify-content-center"> {/* Use g-4 for better spacing */}
          {steps.map((s, i) => (
            <div key={i} className="col-md-6 col-lg-2-4"> {/* col-lg-2-4 for five items in a row */}
              <div className="process-card h-100 text-center">
                <div className="process-number">{i + 1}</div>
                <h6 className="mt-2">{s.title}</h6>
                <p className="small text-white mb-0">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}