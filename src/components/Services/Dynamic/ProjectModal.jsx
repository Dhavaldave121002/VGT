// src/components/Services/Dynamic/ProjectModal.jsx
import React from 'react'
import './dynamic.css' // Import the new CSS

export default function ProjectModal({ project, onClose }) {
  if (!project) return null

  // Function to close modal when clicking the backdrop
  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('modal')) {
      onClose()
    }
  }
  
  const stackText = Array.isArray(project.stack) ? project.stack.join(', ') : project.stack

  return (
    // Add onClick handler to the modal container (backdrop)
    <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true" onClick={handleBackdropClick}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{project.title}</h5>
            <button className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {/* Image */}
            <img src={project.thumb} alt={project.title} className="img-fluid mb-3 rounded" />
            
            {/* Description */}
            <p className="text-white">{project.description || project.excerpt}</p>
            
            {/* Tech Stack */}
            {project.stack && (
              <p className="small text-white">
                Technology Stack: <span>{stackText}</span>
              </p>
            )}
          </div>
          <div className="modal-footer">
            <a href="/contact" className="btn btn-primary">Enquire about this project</a>
            <button className="btn btn-outline-secondary" onClick={onClose}>Close Preview</button>
          </div>
        </div>
      </div>
    </div>
  )
}