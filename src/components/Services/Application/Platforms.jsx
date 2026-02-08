// src/components/Services/Application/Platforms.jsx
import React from 'react'
import './application.css' // Import the new CSS

export default function Platforms() {
  return (
    <section className="app-platforms-section" id="platforms"> {/* Use new section class */}
      <div className="container">
        <div className="row align-items-center gy-5"> {/* Increased vertical spacing */}
          <div className="col-md-6">
            <h3>Platforms & Technology Approaches 🛠️</h3>
            <p className="text-white">We carefully select the right platform and architecture based on your product needs, performance requirements, time-to-market, and long-term maintainability.</p>
             {/* List is cleaned up to let CSS handle the styling */}
            <ul className="list-unstyled fw-bold"> 
              <li>Native Android — **Kotlin**, Jetpack Compose for modern UI development.</li>
              <li>Native iOS — **Swift** and SwiftUI for smooth, device-optimized experiences.</li>
              <li>Cross-platform — **React Native** and **Flutter** to accelerate multi-platform delivery.</li>
              <li>Backend & APIs — **Node.js, .NET Core**, Firebase, and GraphQL for scalable server architecture.</li>
              <li>DevOps — **CI/CD**, Automated Testing, and seamless App/Play Store pipeline management.</li>
            </ul>
          </div>

          <div className="col-md-6 text-center">
            {/* Image representing various mobile and web development logos */}
            <img src="/assets/app-platforms.png" alt="Diagram showing Native, Cross-platform, and Backend technologies" className="img-fluid rounded" /> 
          </div>
        </div>
      </div>
    </section>
  )
}