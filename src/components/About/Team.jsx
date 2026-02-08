// src/components/About/Team.jsx
import React from 'react'
import './about.css' // Import the new CSS

function TeamCard({ name, role, img }) {
  return (
    <div className="col-12 col-md-6 col-lg-3">
      <div className="team-card text-center p-3 h-100">
        <img src={img} alt={`Profile picture of ${name}`} className="team-img rounded-circle mb-3" loading="lazy" />
        <h6 className="mb-1">{name}</h6>
        <small className="text-muted">{role}</small>
      </div>
    </div>
  )
}

export default function Team() {
  return (
    <div className="team-wrap mt-5 bg-soft p-4 rounded-3">
      <div className="text-center mb-4">
        <h3>Meet the team</h3>
        <p className="text-muted">Small, focused team — experts in product and engineering.</p>
      </div>

      <div className="row g-4">
        <TeamCard name="Dhaval Dave" role="Founder & Tech Lead" img="/assets/team-dhaval.jpg" />
        <TeamCard name="Amit Patel" role="Product Manager" img="/assets/team-amit.jpg" />
        <TeamCard name="Nisha Sharma" role="Lead Designer" img="/assets/team-nisha.jpg" />
        <TeamCard name="Ravi Singh" role="Senior Engineer" img="/assets/team-ravi.jpg" />
      </div>
    </div>
  )
}