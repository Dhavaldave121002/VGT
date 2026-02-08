// src/components/Services/Dynamic/PostModal.jsx
import React from 'react'
import './dynamic.css' // Import the new CSS

export default function PostModal({ post, onClose }) {
  if (!post) return null

  // Function to close modal when clicking the backdrop
  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('modal')) {
      onClose()
    }
  }

  return (
    // Add onClick handler to the modal container (backdrop)
    <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true" onClick={handleBackdropClick}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{post.title}</h5>
            <button className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {/* Image */}
            <img src={post.thumb} alt={post.title} className="img-fluid mb-3 rounded" />
            
            {/* Meta Data */}
            <p className="text-white small">
              Published: <span className="text-primary">{new Date(post.date).toLocaleDateString()}</span>
            </p>
            
            {/* Content Body */}
            <div className="post-body">{post.content || post.excerpt}</div>
          </div>
          <div className="modal-footer">
            <a className="btn btn-outline-light" href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer">Open Full Post →</a>
            <button className="btn btn-outline-secondary" onClick={onClose}>Close Preview</button>
          </div>
        </div>
      </div>
    </div>
  )
}