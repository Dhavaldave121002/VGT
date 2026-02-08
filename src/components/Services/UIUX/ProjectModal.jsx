// src/components/Services/UIUX/ProjectModal.jsx
import React from 'react'
import './uiux.css' // Import the new CSS

export default function ProjectModal({ project, onClose }) {
  if (!project) return null

    // Determine the array of deliverables/stack to display
    const deliverables = Array.isArray(project.deliverables) 
        ? project.deliverables 
        : (project.stack ? (Array.isArray(project.stack) ? project.stack : [project.stack]) : []);

  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{project.title} - Case Study</h5>
            <button className="btn-close" onClick={onClose} aria-label="Close project details"></button>
          </div>
          <div className="modal-body">
                {/* Main Project Visual */}
            <img src={project.thumb} alt={`Mockup for ${project.title}`} className="img-fluid mb-4 rounded" /> 
            
                {/* Full Description */}
                <h6 className="mt-0 text-white">Project Overview</h6>
            <p className="text-white">{project.description || project.excerpt}</p>
            
                {/* Deliverables/Stack */}
            {deliverables.length > 0 && 
                <p className="small text-white mt-3">
                    **Key Deliverables**: {deliverables.join(' • ')}
                </p>
            }
          </div>
          <div className="modal-footer">
            <a href="/contact" className="btn btn-primary">Start a Similar Project</a>
            <button className="btn btn-outline-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}