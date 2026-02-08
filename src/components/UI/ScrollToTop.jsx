import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    const resetScroll = () => {
      // 1. Reset standard window/html/body scroll
      window.scrollTo(0, 0);
      document.documentElement.scrollTo(0, 0);
      document.body.scrollTo(0, 0);

      // 2. Reset Admin-specific scroll container if it exists
      const adminContainer = document.getElementById('admin-scroll-container');
      if (adminContainer) {
        adminContainer.scrollTo(0, 0);
      }
    };

    // Use requestAnimationFrame to ensure the scroll reset happens 
    // after the DOM has been updated by React
    const rafId = requestAnimationFrame(resetScroll);

    return () => cancelAnimationFrame(rafId);
  }, [location.pathname, location.search]); // Trigger on path or search change

  return null;
};

export default ScrollToTop;
