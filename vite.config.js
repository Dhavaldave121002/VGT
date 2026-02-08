import { defineConfig } from 'vite' // Dependency Refresh
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 5000,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('three') || id.includes('@react-three') || id.includes('maath')) {
              return 'three-vendor';
            }
            if (id.includes('framer-motion') || id.includes('gsap')) {
              return 'animations';
            }
            if (id.includes('react-icons')) {
              // Split react-icons by icon set to avoid one huge chunk
              if (id.includes('/fa')) return 'icons-fa';
              if (id.includes('/bi')) return 'icons-bi';
              if (id.includes('/md')) return 'icons-md';
              if (id.includes('/ai')) return 'icons-ai';
              return 'icons-other';
            }
            if (id.includes('bootstrap-icons') || id.includes('@fortawesome')) {
              return 'icons-vendor';
            }
            if (id.includes('jspdf') || id.includes('html2canvas')) {
              return 'pdf-utils';
            }
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'react-vendor';
            }
            return 'vendor';
          }
        }
      }
    }
  }
})
