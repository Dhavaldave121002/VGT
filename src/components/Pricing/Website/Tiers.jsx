// src/components/Pricing/Website/Tiers.jsx
import React from 'react'
import '../../../pages/pricing/pricing.css' // Import the new CSS

export default function Tiers() {
    
  return (
    <section className="website-tiers-section" id="packages-section">
      <div className="container">
        <div className="text-center mb-5">
          <h3>Website Development Packages 🚀</h3>
          <p className="lead text-white">Three common starting points — each can be fully **customised and scaled** to your exact business goals and feature requirements.</p>
        </div>

        <div className="row g-4 justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="price-card h-100 text-center">
              <h5 className="mb-1">1. Informative (Starter)</h5>
              <div className="price">₹12,000</div>
              <p className="small text-white mb-3">Single page or small brochure site — fast, secure & SEO friendly.</p>
              <ul className="list-unstyled text-start mb-3">
                <li>Fully **Responsive Design**</li>
                <li>Up to **5** Static Pages</li>
                <li>Basic On-Page SEO Setup</li>
                <li>Contact Form Integration</li>
                <li>1 Month Post-Launch Support</li>
              </ul>
              <a className="btn btn-primary w-100" href="/contact">Get Started</a>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="price-card h-100 text-center featured">
              <h5 className="mb-1">2. Dynamic (CMS Core)</h5>
              <div className="price">₹40,000+</div>
              <p className="small text-white mb-3">CMS-powered website for blogs, content marketing, and moderate scale.</p>
              <ul className="list-unstyled text-start mb-3">
                <li>**Headless CMS** or WordPress</li>
                <li>Up to **25** Dynamic Pages</li>
                <li>Advanced SEO & Google Analytics</li>
                <li>Admin Training & Documentation</li>
                <li>2 Months Post-Launch Support</li>
              </ul>
              <a className="btn btn-primary w-100" href="/contact">Choose Plan</a>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="price-card h-100 text-center">
              <h5 className="mb-1">3. E-commerce (Custom)</h5>
              <div className="price">Custom Quote</div>
              <p className="small text-white mb-3">Full e-commerce store with payments, shipping, and order management features.</p>
              <ul className="list-unstyled text-start mb-3">
                <li>Custom Product Catalog Design</li>
                <li>Secure Cart & Checkout Flow</li>
                <li>Payment Gateway Integration (Stripe/Razorpay)</li>
                <li>Inventory & Order Management</li>
                <li>3 Months Post-Launch Support</li>
              </ul>
              <a className="btn btn-primary w-100" href="/contact">Get Custom Quote</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}