// src/components/Services/Informative/Benefits.jsx
import React from 'react'
import './informative.css' // Import the new CSS

// Update Benefit component to accept an icon class
function Benefit({ title, text, iconClass }) {
  return (
    <div className="col-md-6 col-lg-3">
      <div className={`benefit-card p-4 h-100 ${iconClass}`}> {/* Added iconClass and increased padding */}
        {/* Placeholder for Font Awesome / Icon */}
        <i className={`fa-3x mb-3 text-primary ${iconClass}`}></i>
        
        <h5 className="mb-2">{title}</h5>
        <p className="text-muted small mb-0">{text}</p>
      </div>
    </div>
  )
}

export default function Benefits() {
  return (
    <section className="benefits-section"> {/* Use class name for styling */}
      <div className="container">
        <div className="text-center mb-5">
          <h3>Why Choose an Informative Website?</h3>
          <p className="text-muted lead">Fast to launch, low maintenance, clear messaging — ideal for lead generation and building a strong brand presence.</p>
        </div>

        <div className="row g-4"> {/* Adjusted gap */}
          <Benefit 
                iconClass="fas fa-bullhorn" 
                title="Clear Messaging" 
                text="Crafted information architecture and compelling copy that clarifies what you do and why customers should trust you." 
            />
          <Benefit 
                iconClass="fas fa-tachometer-alt" 
                title="SEO & Performance" 
                text="Optimised for search engines (SEO) and built for lightning-fast load times so users find you and stay." 
            />
          <Benefit 
                iconClass="fas fa-mobile-alt" 
                title="Mobile-first Design" 
                text="Responsive layouts and touch-friendly interactions guaranteed to look and function perfectly across all devices." 
            />
          <Benefit 
                iconClass="fas fa-pencil-alt" 
                title="Easy Editing & CMS" 
                text="Simple content management system (CMS) integration for non-technical users to make instant content updates." 
            />
        </div>
      </div>
    </section>
  )
}