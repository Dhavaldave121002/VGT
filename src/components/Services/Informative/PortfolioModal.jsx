// src/components/Services/Informative/PortfolioModal.jsx
import React from 'react'
import './informative.css' // Import the new CSS

export default function PortfolioModal({ item, onClose }) {
  if (!item) return null
  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{item.title}</h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {/* Image of the portfolio thumbnail */}
            
            <img src={item.thumb} alt={item.title} className="img-fluid mb-3 rounded" />
            <p className="text-muted">{item.description}</p>
            <p className="small text-muted">This is a portfolio preview — final designs vary per client.</p>
          </div>
          <div className="modal-footer">
            <a href="/contact" className="btn btn-primary">Enquire about this style</a>
            <button className="btn btn-outline-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}