// src/components/About/StatsCTA.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import './about.css' // Import the new CSS

function Stat({ number, label }) {
  return (
    <div className="col-6 col-sm-3">
      <div className="stat-box p-3 rounded-2">
        <div className="stat-number">{number}</div>
        <div className="stat-label text-muted">{label}</div>
      </div>
    </div>
  )
}

export default function StatsCTA() {
  return (
    <div className="row mt-5 align-items-center gy-4 stats-cta">
      <div className="col-md-8">
        <div className="row text-center g-1">
          <Stat number="120+" label="Projects" />
          <Stat number="95%" label="Satisfaction" />
          <Stat number="0.8s" label="Avg Load" />
          <Stat number="24/7" label="Support" />
        </div>
      </div>

      <div className="col-md-4 text-md-end text-center">
        <Link to="/contact" className="btn btn-lg btn-primary">Start a Project</Link>
      </div>
    </div>
  )
}