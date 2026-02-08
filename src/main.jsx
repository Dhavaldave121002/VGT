import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import ErrorBoundary from './components/UI/ErrorBoundary'

// Bootstrap CSS + JS (Popper included)
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Bootstrap Icons
import 'bootstrap-icons/font/bootstrap-icons.css'

import './styles/bootstrap-harmonize.css'
import './index.css' // Load Tailwind last to override Bootstrap

// Handle chunk load errors globally (Common cause of blank page on redeploy)
window.addEventListener('error', (event) => {
  if (event.message?.includes('chunk')) {
    console.warn('Chunk load error detected, auto-refreshing...');
    window.location.reload();
  }
}, true);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
)