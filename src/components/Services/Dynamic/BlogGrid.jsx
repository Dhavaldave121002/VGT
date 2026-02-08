// src/components/Services/Dynamic/BlogGrid.jsx
import React from 'react'
import './dynamic.css' // Import the new CSS

export default function BlogGrid({ posts = [], onRead, page, totalPages, setPage }) {
  return (
    <>
      <div className="row g-4"> {/* Increased gap for better spacing */}
        {posts.map(p => (
          <div key={p.id} className="col-md-6 col-lg-4 col-xl-3"> {/* Adjusted column sizes for grid flexibility */}
            <article className="card post-card h-100">
              <img src={p.thumb} alt={p.title} className="card-img-top" />
              <div className="card-body">
                <h6 className="mb-1">{p.title}</h6>
                <small className="text-white">{new Date(p.date).toLocaleDateString()}</small>
                <p className="text-white small mt-2 mb-3">{p.excerpt}</p>
                <div className="d-flex gap-2 mt-auto"> {/* mt-auto pushes to the bottom */}
                  <button className="btn btn-sm btn-primary" onClick={() => onRead(p)}>Quick Read</button>
                  <a className="btn btn-sm btn-outline-light" href={`/blog/${p.slug}`}>Full Post →</a>
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>

      {/* Pagination Section */}
      {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-5">
            <nav aria-label="Blog pages">
              <ul className="pagination pagination-sm">
                
                {/* Previous Button */}
                <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => setPage(p => Math.max(1, p - 1))} aria-label="Previous">Prev</button>
                </li>
                
                {/* Page Number Buttons */}
                {Array.from({ length: totalPages }).map((_, i) => (
                  <li key={i} className={`page-item ${page === i + 1 ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => setPage(i + 1)}>{i + 1}</button>
                  </li>
                ))}
                
                {/* Next Button */}
                <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => setPage(p => Math.min(totalPages, p + 1))} aria-label="Next">Next</button>
                </li>
              </ul>
            </nav>
          </div>
      )}
    </>
  )
}