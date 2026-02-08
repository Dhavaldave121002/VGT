/**
 * LocalStorage Utilities
 * Safe localStorage operations with validation and error handling
 */

/**
 * Safely get data from localStorage with fallback
 * @param {string} key - localStorage key
 * @param {*} defaultValue - fallback value if parsing fails
 * @param {function} validator - optional validation function
 * @returns {*} parsed data or default value
 */
export const safeGetLocalStorage = (key, defaultValue = null, validator = null) => {
  try {
    const item = localStorage.getItem(key);
    
    if (!item) {
      return defaultValue;
    }
    
    const parsed = JSON.parse(item);
    
    // Run validator if provided
    if (validator && typeof validator === 'function') {
      const isValid = validator(parsed);
      if (!isValid) {
        console.warn(`LocalStorage data validation failed for key: ${key}. Using default value.`);
        return defaultValue;
      }
    }
    
    return parsed;
  } catch (error) {
    console.error(`Error reading from localStorage (key: ${key}):`, error);
    return defaultValue;
  }
};

/**
 * Safely set data to localStorage with validation
 * @param {string} key - localStorage key
 * @param {*} value - value to store
 * @param {function} validator - optional validation function
 * @returns {boolean} success status
 */
export const safeSetLocalStorage = (key, value, validator = null) => {
  try {
    // Run validator if provided
    if (validator && typeof validator === 'function') {
      const isValid = validator(value);
      if (!isValid) {
        console.error(`LocalStorage data validation failed for key: ${key}. Data not saved.`);
        return false;
      }
    }
    
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
    
    // Dispatch storage event for cross-component sync
    window.dispatchEvent(new Event('storage'));
    
    return true;
  } catch (error) {
    console.error(`Error writing to localStorage (key: ${key}):`, error);
    return false;
  }
};

/**
 * Remove item from localStorage
 * @param {string} key - localStorage key
 * @returns {boolean} success status
 */
export const removeLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
    window.dispatchEvent(new Event('storage'));
    return true;
  } catch (error) {
    console.error(`Error removing from localStorage (key: ${key}):`, error);
    return false;
  }
};

/**
 * Clear all localStorage
 * @returns {boolean} success status
 */
export const clearLocalStorage = () => {
  try {
    localStorage.clear();
    window.dispatchEvent(new Event('storage'));
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
};

// Schema validators for common data types

export const validateArray = (data) => {
  return Array.isArray(data);
};

export const validateObject = (data) => {
  return data !== null && typeof data === 'object' && !Array.isArray(data);
};

export const validateReferralSchema = (data) => {
  if (!validateObject(data)) return false;
  
  const required = ['id', 'code', 'name', 'email', 'tier', 'referralCount', 'totalEarnings', 'status'];
  return required.every(field => data.hasOwnProperty(field));
};

export const validateLeadSchema = (data) => {
  if (!validateObject(data)) return false;
  
  const required = ['id', 'referralCode', 'clientName', 'clientPhone', 'projectType', 'submittedAt', 'status'];
  return required.every(field => data.hasOwnProperty(field));
};

export const validateContactSchema = (data) => {
  if (!validateObject(data)) return false;
  
  const required = ['id', 'name', 'email', 'phone', 'service', 'message', 'submittedAt', 'status'];
  return required.every(field => data.hasOwnProperty(field));
};

export const validateServiceSchema = (data) => {
  if (!validateObject(data)) return false;
  
  const required = ['features', 'techStack', 'faqs', 'process'];
  return required.every(field => data.hasOwnProperty(field) && Array.isArray(data[field]));
};

/**
 * Migrate data if schema changes
 * @param {string} key - localStorage key
 * @param {function} migrationFn - migration function
 */
export const migrateLocalStorage = (key, migrationFn) => {
  try {
    const data = safeGetLocalStorage(key);
    if (!data) return;
    
    const migrated = migrationFn(data);
    safeSetLocalStorage(key, migrated);
    
    console.log(`Successfully migrated data for key: ${key}`);
  } catch (error) {
    console.error(`Error migrating localStorage (key: ${key}):`, error);
  }
};

/**
 * Get all keys from localStorage
 * @returns {string[]} array of keys
 */
export const getAllKeys = () => {
  try {
    return Object.keys(localStorage);
  } catch (error) {
    console.error('Error getting localStorage keys:', error);
    return [];
  }
};

/**
 * Get localStorage usage info
 * @returns {object} usage statistics
 */
export const getStorageInfo = () => {
  try {
    let totalSize = 0;
    const keys = getAllKeys();
    
    keys.forEach(key => {
      const item = localStorage.getItem(key);
      totalSize += item ? item.length : 0;
    });
    
    // Approximate size in KB
    const sizeKB = (totalSize / 1024).toFixed(2);
    
    return {
      itemCount: keys.length,
      sizeKB,
      keys
    };
  } catch (error) {
    console.error('Error getting storage info:', error);
    return { itemCount: 0, sizeKB: 0, keys: [] };
  }
};

/**
 * Backup all localStorage data
 * @returns {object} backup object
 */
export const backupLocalStorage = () => {
  try {
    const backup = {};
    const keys = getAllKeys();
    
    keys.forEach(key => {
      backup[key] = localStorage.getItem(key);
    });
    
    return backup;
  } catch (error) {
    console.error('Error backing up localStorage:', error);
    return {};
  }
};

/**
 * Restore localStorage from backup
 * @param {object} backup - backup object
 * @returns {boolean} success status
 */
export const restoreLocalStorage = (backup) => {
  try {
    Object.entries(backup).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });
    
    window.dispatchEvent(new Event('storage'));
    return true;
  } catch (error) {
    console.error('Error restoring localStorage:', error);
    return false;
  }
};
