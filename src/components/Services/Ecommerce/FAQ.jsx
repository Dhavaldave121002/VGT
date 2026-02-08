// FAQ.jsx
import React from 'react'
import './ecommerce.css' // Import the new CSS

export default function FAQ() {
  return (
    <section className="ecom-faq-section" id="faq"> {/* Added section class and ID */}
      <div className="container">
        <h3 className="mb-4 text-center">Frequently Asked Questions</h3>

        <div className="accordion" id="ecomFaq">
          
          {/* FAQ 1: Timeline */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="faq1">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#ecollapse1" aria-expanded="false">
                How long does an e-commerce site take to build?
              </button>
            </h2>
            <div id="ecollapse1" className="accordion-collapse collapse" aria-labelledby="faq1" data-bs-parent="#ecomFaq">
              <div className="accordion-body text-white">
                Timeline depends heavily on complexity. **Standard Starter Sites** (Shopify/WooCommerce with minor customizations) typically take **4–6 weeks**. **Complex Headless or Custom Builds** (with multiple integrations like ERP/CRM) can range from **8–14 weeks**.
              </div>
            </div>
          </div>

          {/* FAQ 2: Payment & Tax */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="faq2">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#ecollapse2" aria-expanded="false">
                Do you handle payment gateway and tax configuration?
              </button>
            </h2>
            <div id="ecollapse2" className="accordion-collapse collapse" aria-labelledby="faq2" data-bs-parent="#ecomFaq">
              <div className="accordion-body text-white">
                **Yes.** We integrate all major payment gateways (Stripe, PayPal, Razorpay, etc.) and configure **local and regional tax rules** based on your target market, ensuring compliance from day one.
              </div>
            </div>
          </div>

          {/* FAQ 3: Product Data Migration */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="faq3">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#ecollapse3" aria-expanded="false">
                What about existing product data and inventory migration?
              </button>
            </h2>
            <div id="ecollapse3" className="accordion-collapse collapse" aria-labelledby="faq3" data-bs-parent="#ecomFaq">
              <div className="accordion-body text-white">
                We manage the full migration of **product catalogs, customer data, and order history**. We prefer structured data files (CSV, XML) but can also integrate with APIs for real-time inventory synchronization.
              </div>
            </div>
          </div>
          
          {/* FAQ 4: Headless Commerce */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="faq4">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#ecollapse4" aria-expanded="false">
                Why choose Headless Commerce over standard platforms?
              </button>
            </h2>
            <div id="ecollapse4" className="accordion-collapse collapse" aria-labelledby="faq4" data-bs-parent="#ecomFaq">
              <div className="accordion-body text-white">
                **Headless commerce** decouples the front-end (user experience) from the back-end (cart, orders). This delivers superior **performance (speed)**, better **SEO**, and complete **design flexibility**, allowing you to create unique, conversion-optimized storefronts without platform limitations.
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}