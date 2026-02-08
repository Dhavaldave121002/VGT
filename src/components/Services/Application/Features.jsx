// src/components/Services/Application/Features.jsx
import React from 'react'
import './application.css' // Import the new CSS

export default function Features() {
  const items = [
    { t: 'Native Android 🤖', d: 'Kotlin/Jetpack implementation for performance, deep platform integration, and access to the latest Android features.' },
    { t: 'Native iOS 🍎', d: 'Swift + SwiftUI/Combine for delivering highly polished, smooth, and native-feeling user experiences on Apple devices.' },
    { t: 'Cross-platform 🌐', d: 'React Native & Flutter expertise to accelerate delivery, share codebases, and maintain a near-native feel across platforms.' },
    { t: 'Offline & Sync 📶', d: 'Implementation of offline-first patterns, robust background synchronization, and automatic conflict resolution for reliability.' },
    { t: 'Auth & Security 🔒', d: 'Secure implementation of OAuth, JWT tokens, biometric authentication (Face ID/Fingerprint), and secure storage best-practices.' },
    { t: 'Analytics & Crash 📊', d: 'Seamless integrations with modern analytics (e.g., Firebase, Amplitude), A/B testing tools, and real-time crash reporting.' }
  ]

  return (
    <section className="app-features-section" id="features">
      <div className="container">
        <div className="text-center mb-5">
          <h3>Core Application Development Capabilities ✨</h3>
          <p className="lead text-white">We specialize in building consumer apps, enterprise solutions, SaaS mobile frontends, and digital marketplaces — tailored precisely to your business goals.</p>
        </div>

        <div className="row g-4"> {/* Increased gap for better spacing */}
          {items.map((it, i) => (
            <div className="col-md-6 col-lg-4" key={i}>
              <div className="feature-card p-3 h-100">
                <h5 className="mb-2">{it.t}</h5>
                <p className="text-white small mb-0">{it.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}