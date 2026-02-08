import React, { useState } from 'react'
import './sections.css'

const items = [
  { id:1, name:'Amit K', role:'Founder, Fintech', quote:'Vertex built our merchant portal — fast, reliable and the UX improved conversions 38%.' },
  { id:2, name:'Nisha P', role:'Product Head', quote:'Great communication, on-time, and the app quality was outstanding.' },
  { id:3, name:'Ravi S', role:'CTO', quote:'We migrated legacy systems and the performance gains were immediate.' }
]

export default function Testimonials() {
  const [i, setI] = useState(0)
  
  // Function to move to the previous index, wrapping around
  const prev = () => setI((v) => (v - 1 + items.length) % items.length)
  
  // Function to move to the next index, wrapping around
  const next = () => setI((v) => (v + 1) % items.length)

  return (
    <section className="sections testimonials container-fluid p-5" aria-label="Customer testimonials">
      <div className="text-center mb-4">
        <h3 className="section-title">What clients say</h3>
      </div>

      <div className="testimonial-wrap d-flex align-items-center justify-content-center">
        <button className="tc-btn" onClick={prev} aria-label="Previous testimonial">‹</button>

        {/* Added key={items[i].id} to ensure React updates the component correctly for animations */}
        <blockquote className="testimonial-card" key={items[i].id} tabIndex={0}>
          <p className="quote">“{items[i].quote}”</p>
          <footer className="text-muted">— {items[i].name}, <span className="muted-role">{items[i].role}</span></footer>
        </blockquote>

        <button className="tc-btn" onClick={next} aria-label="Next testimonial">›</button>
      </div>
    </section>
  )
}