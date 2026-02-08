/**
 * API Utility - SOLIDIFIED VERSION
 * Primary Connection: PHP/MySQL Backend
 * Design Goal: Permanent connection with zero runtime crashes (Blank Page Prevention)
 */

const API_BASE_URL = 'http://localhost/Vertex/public/api'; 

const ALLOWED_SERVICES = [
  'blogs', 'blog_posts', 'users', 'accounting', 'testimonials', 'teams', 
  'careers', 'jobs', 'applications', 'projects', 'tech_stack', 'timeline', 
  'brands', 'leads', 'referrals', 'pricing', 'pricing_faqs', 'subscribers', 'contacts'
];

/**
 * Robust fetch wrapper to handle JSON errors and connection drops
 */
async function safeFetch(url, options = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000); // 8-second safety timeout

  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timeoutId);
    
    if (!response.ok) throw new Error(`HTTP_${response.status}`);
    
    const data = await response.json();
    
    // Check if PHP returned a connection error object
    if (data && data.error && data.error.includes('Connection error')) {
      console.error("Critical Database Error:", data.error);
      return null;
    }
    
    return data;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      console.warn(`API Connection Timeout at ${url}`);
    } else {
      console.warn(`API Connection Failure at ${url}:`, error.message);
    }
    return null;
  }
}

/**
 * Service to endpoint mapping
 */
function getEndpoint(service) {
  const map = {
    'users': 'users.php',
    'accounting': 'accounting.php',
    'testimonials': 'testimonials.php',
    'teams': 'teams.php',
    'careers': 'jobs.php',
    'jobs': 'jobs.php',
    'applications': 'applications.php',
    'projects': 'projects.php',
    'tech_stack': 'tech_stack.php',
    'timeline': 'timeline.php',
    'brands': 'brands.php',
    'leads': 'leads.php',
    'referrals': 'referrals.php',
    'pricing': 'pricing.php',
    'pricing_faqs': 'pricing_faqs.php',
    'subscribers': 'subscribers.php',
    'contacts': 'contacts.php'
  };
  return map[service] || 'blogs.php';
}

export const api = {
  /**
   * Fetch all records
   */
  fetchAll: async (service) => {
    const endpoint = getEndpoint(service);
    const data = await safeFetch(`${API_BASE_URL}/${endpoint}`);
    
    // Components expect an array for listing. Always return array to prevent .map() crashes.
    return Array.isArray(data) ? data : [];
  },

  /**
   * Save a record (Create or Update)
   */
  save: async (service, data) => {
    const endpoint = getEndpoint(service);
    const method = data.id ? 'PUT' : 'POST';
    
    const result = await safeFetch(`${API_BASE_URL}/${endpoint}`, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    return result || { success: false, error: 'Connection Failed' };
  },

  /**
   * Delete a record
   */
  delete: async (service, id) => {
    const endpoint = getEndpoint(service);
    const result = await safeFetch(`${API_BASE_URL}/${endpoint}?id=${id}`, {
      method: 'DELETE'
    });

    return result || { success: false, error: 'Connection Failed' };
  },

  /**
   * Config Operations
   */
  fetchConfig: async (key) => {
    const data = await safeFetch(`${API_BASE_URL}/site_config.php?key=${key}`);
    return data; // site_config returns value directly or null
  },

  saveConfig: async (key, value) => {
    const result = await safeFetch(`${API_BASE_URL}/site_config.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, value }),
    });

    return result || { success: false, error: 'Connection Failed' };
  },

  /**
   * Health Check for App Preloader
   */
  checkConnection: async () => {
    // Attempt to hit a lightweight endpoint
    const data = await safeFetch(`${API_BASE_URL}/test_db.php`);
    return data !== null;
  },

  /**
   * Authentication - Fetch users and match
   */
  login: async (email, password) => {
    const users = await api.fetchAll('users');
    const user = users.find(u => u.email === email && u.password === password);
    return user || null;
  },

  /**
   * Update User Profile
   */
  updateProfile: async (data) => {
    return await api.save('users', data);
  }
};
