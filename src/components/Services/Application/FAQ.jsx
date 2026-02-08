// src/components/Services/Application/FAQ.jsx
import React from 'react'
import './application.css' // Import the new CSS

export default function FAQ() {
    const faqItems = [
        { 
            id: 'A1', 
            question: 'What platform (Native vs. Cross-platform) should I choose?', 
            answer: 'We evaluate your product goals: **Native** (Swift/Kotlin) is best for deep device integration, high performance, and complex features. **Cross-platform** (React Native/Flutter) offers faster delivery, shared codebases, and lower initial costs, suitable for most consumer apps.'
        },
        { 
            id: 'A2', 
            question: 'Do you handle the app store submission process?', 
            answer: 'Yes — we prepare all necessary assets (screenshots, metadata), manage the submission to **Apple App Store** and **Google Play Store**, handle any review feedback, and set up Continuous Integration (CI) pipelines for future updates and releases.'
        },
        { 
            id: 'A3', 
            question: 'What is the typical timeline and cost for a new application?', 
            answer: 'A **Minimum Viable Product (MVP)** with core features typically takes **3–5 months** to develop, costing between **\$40k and \$100k**, depending on complexity. A full-featured application requires longer. We provide a detailed scope and timeline after the discovery phase.'
        },
        { 
            id: 'A4', 
            question: 'What kind of maintenance and support do you offer post-launch?', 
            answer: 'We offer flexible post-launch support packages, including **bug fixes**, **OS compatibility updates** (e.g., new iOS/Android releases), security patching, and adding new features based on user feedback and analytics.'
        },
    ];

  return (
    <section className="app-faq-section" id="faq"> {/* Use new section class */}
      <div className="container">
        <h3 className="text-center mb-5">Frequently Asked Questions 💡</h3>

        <div className="row justify-content-center">
            <div className="col-lg-10">
                <div className="accordion" id="appFaq">
                    {faqItems.map((item, index) => (
                        <div key={item.id} className="accordion-item">
                            <h2 className="accordion-header" id={`faqH${item.id}`}>
                                <button 
                                    className="accordion-button collapsed" 
                                    type="button" 
                                    data-bs-toggle="collapse" 
                                    data-bs-target={`#aCollapse${item.id}`} 
                                    aria-expanded="false"
                                >
                                    {item.question}
                                </button>
                            </h2>
                            <div 
                                id={`aCollapse${item.id}`} 
                                className="accordion-collapse collapse" 
                                aria-labelledby={`faqH${item.id}`} 
                                data-bs-parent="#appFaq"
                            >
                                <div className="accordion-body text-white">{item.answer}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </section>
  )
}