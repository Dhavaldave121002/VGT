/**
 * Session Manager Utility
 * Centralizes user session management. 
 * Currently wraps localStorage, but allows easy migration to Cookies or sessionStorage.
 */

const SESSION_KEY = 'vgtw_admin_session';

export const SessionManager = {
  /**
   * Save user session
   * @param {Object} user - User object to store
   */
  saveSession: (user) => {
    if (!user) return;
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    } catch (e) {
      console.error("Failed to save session", e);
    }
  },

  /**
   * Get current user session
   * @returns {Object|null} User object or null
   */
  getSession: () => {
    try {
      const stored = localStorage.getItem(SESSION_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      console.error("Failed to retrieve session", e);
      return null;
    }
  },

  /**
   * Clear user session (Logout)
   */
  clearSession: () => {
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch (e) {
      console.error("Failed to clear session", e);
    }
  },

  /**
   * Check if user is Super Admin
   * @returns {boolean}
   */
  isMaster: () => {
    const session = SessionManager.getSession();
    return session && (session.role === 'Super Admin' || session.isMaster === true);
  },

  /**
   * Validate Access and Redirect if invalid
   * Helper for protected routes
   * @param {Function} navigate - React Router navigate function
   * @param {boolean} requireMaster - If true, requires Super Admin role
   * @returns {boolean} isValid - True if access granted
   */
  requireAuth: (navigate, requireMaster = false) => {
    const session = SessionManager.getSession();
    if (!session) {
      navigate('/admin/login');
      return false;
    }
    if (requireMaster && !SessionManager.isMaster()) {
      navigate('/admin/dashboard');
      return false;
    }
    return true;
  }
};
