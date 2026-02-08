// Mock3D.jsx - Fixed with Loading States
import React, { useEffect, useRef, useState, Suspense, lazy } from 'react';
import './mock3d.css';

// Lazy load Three.js components
const ThreeScene = lazy(() => import('./ThreeScene'));

// Loading Component
const Mock3DLoader = () => (
  <div className="mock3d-container loading">
    <div className="loading-overlay">
      <div className="loading-content">
        <div className="loader-spinner">
          <div className="spinner-inner"></div>
        </div>
        <div className="loading-text">
          <span className="loading-dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
          <p>Loading 3D Visualization</p>
        </div>
      </div>
    </div>
    
    {/* Skeleton Devices */}
    <div className="skeleton-scene">
      <div className="skeleton-devices">
        <div className="skeleton-device laptop">
          <div className="skeleton-screen"></div>
          <div className="skeleton-base"></div>
        </div>
        <div className="skeleton-device tablet">
          <div className="skeleton-screen"></div>
          <div className="skeleton-home-button"></div>
        </div>
        <div className="skeleton-device mobile">
          <div className="skeleton-screen"></div>
          <div className="skeleton-buttons"></div>
        </div>
      </div>
      
      {/* Skeleton Controls */}
      <div className="skeleton-controls">
        <div className="skeleton-button"></div>
        <div className="skeleton-button"></div>
        <div className="skeleton-button"></div>
      </div>
      
      {/* Skeleton Info Panel */}
      <div className="skeleton-info">
        <div className="skeleton-title"></div>
        <div className="skeleton-specs">
          <div className="skeleton-spec"></div>
          <div className="skeleton-spec"></div>
          <div className="skeleton-spec"></div>
        </div>
      </div>
    </div>
  </div>
);

// Fallback for Three.js errors
const Mock3DFallback = () => (
  <div className="mock3d-container fallback">
    <div className="fallback-content">
      <div className="fallback-icon">
        <i className="bi bi-cpu"></i>
      </div>
      <h3>Interactive Device Showcase</h3>
      <p>Experience our responsive designs across all devices</p>
      
      <div className="fallback-devices">
        <div className="fallback-device">
          <i className="bi bi-laptop"></i>
          <span>Desktop</span>
        </div>
        <div className="fallback-device">
          <i className="bi bi-tablet"></i>
          <span>Tablet</span>
        </div>
        <div className="fallback-device">
          <i className="bi bi-phone"></i>
          <span>Mobile</span>
        </div>
      </div>
      
      <div className="fallback-stats">
        <div className="stat">
          <div className="value">100%</div>
          <div className="label">Responsive</div>
        </div>
        <div className="stat">
          <div className="value">99.9%</div>
          <div className="label">Uptime</div>
        </div>
        <div className="stat">
          <div className="value">0.2s</div>
          <div className="label">Performance</div>
        </div>
      </div>
    </div>
  </div>
);

export default function Mock3D() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeDevice, setActiveDevice] = useState('laptop');
  const [hasError, setHasError] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setLoadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 100);

    // Check if Three.js is available
    const checkThreeJS = async () => {
      try {
        // Simulate asset loading
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        if (typeof window !== 'undefined' && window.THREE) {
          setIsLoaded(true);
        } else {
          // If Three.js fails to load, show fallback
          setHasError(true);
        }
      } catch (error) {
        console.error('Three.js load error:', error);
        setHasError(true);
      }
    };

    checkThreeJS();

    // Auto rotate active device
    const interval = setInterval(() => {
      const devices = ['laptop', 'tablet', 'mobile'];
      const currentIndex = devices.indexOf(activeDevice);
      const nextIndex = (currentIndex + 1) % devices.length;
      setActiveDevice(devices[nextIndex]);
    }, 5000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(interval);
    };
  }, [activeDevice]);

  // Handle device click
  const handleDeviceClick = (device) => {
    setActiveDevice(device);
  };

  // Show loader while loading
  if (!isLoaded && !hasError) {
    return <Mock3DLoader />;
  }

  // Show fallback if error
  if (hasError) {
    return <Mock3DFallback />;
  }

  return (
    <div className="mock3d-container">
      <Suspense fallback={<Mock3DLoader />}>
        <ThreeScene activeDevice={activeDevice} />
      </Suspense>

      {/* Device Controls */}
      <div className="device-controls">
        <button 
          className={`device-btn ${activeDevice === 'laptop' ? 'active' : ''}`}
          onClick={() => handleDeviceClick('laptop')}
        >
          <i className="bi bi-laptop"></i>
          <span>Laptop</span>
          <div className="device-info">
            <small>Full Dashboard</small>
          </div>
        </button>
        
        <button 
          className={`device-btn ${activeDevice === 'tablet' ? 'active' : ''}`}
          onClick={() => handleDeviceClick('tablet')}
        >
          <i className="bi bi-tablet"></i>
          <span>Tablet</span>
          <div className="device-info">
            <small>Tablet View</small>
          </div>
        </button>
        
        <button 
          className={`device-btn ${activeDevice === 'mobile' ? 'active' : ''}`}
          onClick={() => handleDeviceClick('mobile')}
        >
          <i className="bi bi-phone"></i>
          <span>Mobile</span>
          <div className="device-info">
            <small>Mobile App</small>
          </div>
        </button>
      </div>

      {/* Progress Bar */}
      {!isLoaded && (
        <div className="load-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${loadProgress}%` }}
            ></div>
          </div>
          <span className="progress-text">Loading... {Math.round(loadProgress)}%</span>
        </div>
      )}
    </div>
  );
}