// HeroBanner.jsx - Fixed with Skeleton Loading
import React, { useEffect, useRef, useState, Suspense } from 'react';
import Mock3D from '../Mock3D/Mock3D';
import './hero.css';

// Skeleton Components
const HeroSkeleton = () => (
  <div className="hero-banner skeleton-mode">
    <div className="hero-bg">
      <div className="gradient-overlay"></div>
    </div>
    
    <div className="container">
      <div className="row align-items-center">
        {/* Left Content Skeleton */}
        <div className="col-lg-6 col-12 mb-5 mb-lg-0">
          <div className="hero-content">
            {/* Tagline Skeleton */}
            <div className="tagline mb-4 skeleton-wrapper">
              <span className="skeleton-dot"></span>
              <span className="skeleton-text" style={{ width: '200px' }}></span>
            </div>

            {/* Heading Skeleton */}
            <div className="heading-section mb-4 skeleton-wrapper">
              <div className="skeleton-heading"></div>
              <div className="skeleton-heading-short"></div>
              <div className="skeleton-line" style={{ width: '80px' }}></div>
            </div>

            {/* Description Skeleton */}
            <div className="hero-description mb-5 skeleton-wrapper">
              <div className="skeleton-line"></div>
              <div className="skeleton-line"></div>
              <div className="skeleton-line" style={{ width: '60%' }}></div>
            </div>

            {/* Services Section Skeleton */}
            <div className="services-section mb-5 skeleton-wrapper">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="skeleton-text" style={{ width: '120px' }}></div>
                <div className="skeleton-dots">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="skeleton-dot-small"></span>
                  ))}
                </div>
              </div>
              
              <div className="service-card skeleton-wrapper">
                <div className="skeleton-icon"></div>
                <div className="service-content">
                  <div className="skeleton-text" style={{ width: '180px' }}></div>
                  <div className="skeleton-line" style={{ width: '100%' }}></div>
                  <div className="skeleton-line" style={{ width: '90%' }}></div>
                  <div className="features skeleton-wrapper">
                    {[...Array(4)].map((_, i) => (
                      <span key={i} className="skeleton-badge"></span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Section Skeleton */}
            <div className="stats-section mb-5">
              <div className="row g-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="col-6 col-md-3">
                    <div className="stat-card skeleton-wrapper">
                      <div className="skeleton-icon-small"></div>
                      <div className="skeleton-counter"></div>
                      <div className="skeleton-text" style={{ width: '60px' }}></div>
                      <div className="skeleton-progress"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons Skeleton */}
            <div className="cta-buttons skeleton-wrapper">
              <div className="skeleton-button"></div>
              <div className="skeleton-button-outline"></div>
            </div>
          </div>
        </div>

        {/* Right Visual Skeleton */}
        <div className="col-lg-6 col-12">
          <div className="hero-visual skeleton-wrapper">
            <div className="skeleton-3d-container"></div>
            <div className="service-badges skeleton-wrapper">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="skeleton-badge-large"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function HeroBanner() {
  const [activeService, setActiveService] = useState(0);
  const [currentHeadlineIndex, setCurrentHeadlineIndex] = useState(0);
  const [counters, setCounters] = useState({
    projects: 0,
    clients: 0,
    satisfaction: 0,
    speed: 0
  });
  const [isCountingActive, setIsCountingActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const heroRef = useRef(null);

  const services = [
    {
      title: "Informative Websites",
      icon: "bi bi-globe",
      color: "info",
      description: "Content-rich websites with CMS and SEO optimization",
      features: ["SEO Optimized", "Fast Loading", "Mobile Responsive", "Content Management"]
    },
    {
      title: "Dynamic Websites",
      icon: "bi bi-lightning",
      color: "primary",
      description: "Interactive web applications with real-time features",
      features: ["Real-time Updates", "User Authentication", "Database Integration", "API Connectivity"]
    },
    {
      title: "E-commerce Solutions",
      icon: "bi bi-cart",
      color: "success",
      description: "Secure online stores with payment integration",
      features: ["Payment Gateway", "Inventory Management", "Secure Checkout", "Order Tracking"]
    },
    {
      title: "Mobile Applications",
      icon: "bi bi-phone",
      color: "purple",
      description: "Native & cross-platform mobile apps",
      features: ["iOS & Android", "Push Notifications", "Offline Support", "App Store Ready"]
    },
    {
      title: "UI/UX Development",
      icon: "bi bi-palette",
      color: "warning",
      description: "Beautiful interfaces with exceptional user experience",
      features: ["User Research", "Wireframing", "Prototyping", "Usability Testing"]
    }
  ];

  // Initial load effect
  useEffect(() => {
    // Simulate initial loading
    const loadTimer = setTimeout(() => {
      setIsLoading(false);
      setShowContent(true);
      // start counters shortly after showing content
      setTimeout(() => {
        setIsCountingActive(true);
        startCountingAnimation();
      }, 400);
    }, 1000);

    return () => clearTimeout(loadTimer);
  }, []);

  const headlines = [
    { text: 'High-Performance Digital Solutions', color: '#ffffff' },
    { text: 'Creative Product Experiences', color: '#a5b4fc' },
    { text: 'Scale Your Business Online', color: '#60a5fa' }
  ];

  const startCountingAnimation = () => {
    const targets = {
      projects: 250,
      clients: 180,
      satisfaction: 98,
      speed: 0.8
    };

    const durations = {
      projects: 2000,
      clients: 2200,
      satisfaction: 1800,
      speed: 1600
    };

    Object.keys(targets).forEach((key, index) => {
      const target = targets[key];
      const duration = durations[key];
      
      let start = 0;
      const startTime = Date.now();
      const decimals = key === 'speed' ? 1 : 0;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOut = progress < 0.5 
          ? 4 * progress * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        const currentValue = start + (target - start) * easeOut;
        
        setCounters(prev => ({
          ...prev,
          [key]: parseFloat(currentValue.toFixed(decimals))
        }));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      setTimeout(() => {
        requestAnimationFrame(animate);
      }, index * 200);
    });
  };

  // Auto rotate services
  useEffect(() => {
    // rotate headline and services
    if (!showContent) return;

    const headlineInterval = setInterval(() => {
      setCurrentHeadlineIndex(i => (i + 1) % headlines.length);
    }, 3200);

    const serviceInterval = setInterval(() => {
      setActiveService(prev => (prev + 1) % services.length);
    }, 4200);

    return () => {
      clearInterval(headlineInterval);
      clearInterval(serviceInterval);
    };
  }, [showContent]);

  const handleServiceClick = (index) => {
    setActiveService(index);
  };

  // Show skeleton while loading
  if (isLoading) {
    return <HeroSkeleton />;
  }

  return (
    <section className="hero-banner" ref={heroRef} style={{ opacity: showContent ? 1 : 0, transition: 'opacity 0.5s ease' }}>
      {/* Background Effects */}
      <div className="hero-bg">
        <div className="gradient-overlay"></div>
        <div className="grid-pattern"></div>
        <div className="floating-dots">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="floating-dot"></div>
          ))}
        </div>
      </div>

      <div className="container">
        <div className="row align-items-center">
          {/* Left Content */}
          <div className="col-lg-6 col-12 mb-5 mb-lg-0">
            <div className="hero-content">
              {/* Tagline */}
              <div className="tagline mb-4">
                <span className="tagline-dot"></span>
                <span className="tagline-text">TRANSFORMING DIGITAL EXPERIENCES</span>
              </div>

              {/* Rotating Heading */}
              <div className="heading-section mb-4">
                <h1 className="hero-heading">
                  <span className="headline-static">We Build</span>
                  <span className="animated-headline">
                    {headlines.map((h, i) => (
                      <span
                        key={i}
                        className={`headline-item ${i === currentHeadlineIndex ? 'active' : ''}`}
                        style={{ color: h.color }}
                      >
                        {h.text}
                      </span>
                    ))}
                  </span>
                </h1>
                <div className="heading-line"></div>
              </div>

              {/* Description */}
              <p className="hero-description mb-5">
                Vertex Global Tech delivers enterprise-grade web and mobile applications 
                with exceptional performance, security, and user experience. 
                We transform complex challenges into elegant digital solutions.
              </p>

              {/* Services Section */}
              <div className="services-section mb-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0 text-white">
                    <i className="bi bi-stack me-2"></i>
                    Our Services
                  </h5>
                  <div className="service-dots">
                    {services.map((_, index) => (
                      <button
                        key={index}
                        className={`service-dot ${index === activeService ? 'active' : ''}`}
                        onClick={() => handleServiceClick(index)}
                      />
                    ))}
                  </div>
                </div>

                {/* Active Service Card */}
                <div className="service-card">
                  <div className="service-icon">
                    <i className={`${services[activeService].icon} fs-2`}></i>
                  </div>
                  <div className="service-content">
                    <h6 className="service-title">{services[activeService].title}</h6>
                    <p className="service-desc mb-3">{services[activeService].description}</p>
                    <div className="features">
                      {services[activeService].features.map((feature, idx) => (
                        <span key={idx} className="feature">
                          <i className="bi bi-check-circle-fill"></i> {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Section */}
              <div className="stats-section mb-5">
                <div className="row g-3">
                  <div className="col-6 col-md-3">
                    <div className="stat-card">
                      <div className="stat-icon">
                        <i className="bi bi-rocket-takeoff-fill"></i>
                      </div>
                      <div className="stat-value">
                        <span className="counter">{counters.projects}</span>
                        <span className="counter-suffix">+</span>
                      </div>
                      <div className="stat-label">Projects</div>
                      <div className="progress">
                        <div 
                          className="progress-bar"
                          style={{ 
                            width: isCountingActive ? '100%' : '0%',
                            transition: 'width 2s cubic-bezier(0.4, 0, 0.2, 1)'
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="stat-card">
                      <div className="stat-icon">
                        <i className="bi bi-people-fill"></i>
                      </div>
                      <div className="stat-value">
                        <span className="counter">{counters.clients}</span>
                        <span className="counter-suffix">+</span>
                      </div>
                      <div className="stat-label">Clients</div>
                      <div className="progress">
                        <div 
                          className="progress-bar"
                          style={{ 
                            width: isCountingActive ? '100%' : '0%',
                            transition: 'width 2.2s cubic-bezier(0.4, 0, 0.2, 1)'
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="stat-card">
                      <div className="stat-icon">
                        <i className="bi bi-star-fill"></i>
                      </div>
                      <div className="stat-value">
                        <span className="counter">{counters.satisfaction}</span>
                        <span className="counter-suffix">%</span>
                      </div>
                      <div className="stat-label">Satisfaction</div>
                      <div className="progress">
                        <div 
                          className="progress-bar"
                          style={{ 
                            width: isCountingActive ? '100%' : '0%',
                            transition: 'width 1.8s cubic-bezier(0.4, 0, 0.2, 1)'
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="stat-card">
                      <div className="stat-icon">
                        <i className="bi bi-lightning-fill"></i>
                      </div>
                      <div className="stat-value">
                        <span className="counter">{counters.speed}</span>
                        <span className="counter-suffix">s</span>
                      </div>
                      <div className="stat-label">Load Time</div>
                      <div className="progress">
                        <div 
                          className="progress-bar"
                          style={{ 
                            width: isCountingActive ? '100%' : '0%',
                            transition: 'width 1.6s cubic-bezier(0.4, 0, 0.2, 1)'
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="cta-buttons">
                <button className="btn btn-primary btn-lg me-3">
                  <i className="bi bi-play-circle me-2"></i>
                  Start Project
                  <i className="bi bi-arrow-right ms-2"></i>
                </button>
                <button className="btn btn-outline-light btn-lg">
                  <i className="bi bi-eye me-2"></i>
                  View Portfolio
                </button>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="col-lg-6 col-12">
            <div className="hero-visual">
              <Suspense fallback={<div className="mock3d-skeleton"></div>}>
                <Mock3D />
              </Suspense>
              
              {/* Service Badges */}
              <div className="service-badges">
                {services.map((service, index) => (
                  <div 
                    key={index}
                    className={`service-badge ${index === activeService ? 'active' : ''}`}
                    onClick={() => handleServiceClick(index)}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <i className={service.icon}></i>
                    <span>{service.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}