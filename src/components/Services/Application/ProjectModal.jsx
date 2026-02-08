// src/components/Services/Application/ProjectModal.jsx
import React from 'react'
import './application.css' // Import the new CSS

export default function ProjectModal({ project, onClose }) {
  if (!project) return null

  return (
    <div 
        className="modal fade show d-block" 
        tabIndex="-1" 
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="projectModalTitle"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          
            <div className="modal-header">
                <h5 className="modal-title" id="projectModalTitle">{project.title}</h5>
                <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
            </div>
          
            <div className="modal-body">
                {/* Display project image/mockup */}
                <img src={project.thumb} alt={`Mockup of ${project.title}`} className="img-fluid mb-4 rounded" />
                
                {/* Full description */}
                <p>{project.description || project.excerpt}</p>
                
                {/* Tech Stack */}
                {project.stack && (
                    <p className="small text-white mt-3">
                        **Technology Stack:** {Array.isArray(project.stack) ? project.stack.join(' | ') : project.stack}
                    </p>
                )}
            </div>
          
            <div className="modal-footer">
                <a href="/contact" className="btn btn-primary">Enquire About This Project</a>
                <button type="button" className="btn btn-outline-secondary" onClick={onClose}>Close Preview</button>
            </div>
        </div>
      </div>
    </div>
  )
}