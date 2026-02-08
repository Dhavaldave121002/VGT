/**
 * Validation Utilities
 * Centralized validation functions for forms and data
 */

// Email validation (RFC 5322 compliant)
export const validateEmail = (email) => {
  if (!email || typeof email !== 'string') return { valid: false, error: 'Email is required' };
  
  const trimmed = email.trim();
  if (trimmed.length === 0) return { valid: false, error: 'Email is required' };
  if (trimmed.length > 254) return { valid: false, error: 'Email is too long (max 254 characters)' };
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) return { valid: false, error: 'Please enter a valid email address' };
  
  return { valid: true, value: trimmed };
};

// Phone validation (international formats)
export const validatePhone = (phone) => {
  if (!phone || typeof phone !== 'string') return { valid: false, error: 'Phone number is required' };
  
  const trimmed = phone.trim();
  if (trimmed.length === 0) return { valid: false, error: 'Phone number is required' };
  
  // Remove all non-digit characters for length check
  const digitsOnly = trimmed.replace(/\D/g, '');
  if (digitsOnly.length < 10 || digitsOnly.length > 15) {
    return { valid: false, error: 'Phone number must be 10-15 digits' };
  }
  
  const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  if (!phoneRegex.test(trimmed)) return { valid: false, error: 'Please enter a valid phone number' };
  
  return { valid: true, value: trimmed };
};

// Name validation
export const validateName = (name, fieldName = 'Name') => {
  if (!name || typeof name !== 'string') return { valid: false, error: `${fieldName} is required` };
  
  const trimmed = name.trim();
  if (trimmed.length === 0) return { valid: false, error: `${fieldName} is required` };
  if (trimmed.length < 2) return { valid: false, error: `${fieldName} must be at least 2 characters` };
  if (trimmed.length > 100) return { valid: false, error: `${fieldName} must be less than 100 characters` };
  
  const nameRegex = /^[a-zA-Z\s\-']+$/;
  if (!nameRegex.test(trimmed)) {
    return { valid: false, error: `${fieldName} can only contain letters, spaces, hyphens, and apostrophes` };
  }
  
  return { valid: true, value: trimmed };
};

// Required field validation
export const validateRequired = (value, fieldName = 'This field') => {
  if (value === null || value === undefined) return { valid: false, error: `${fieldName} is required` };
  
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (trimmed.length === 0) return { valid: false, error: `${fieldName} is required` };
    return { valid: true, value: trimmed };
  }
  
  return { valid: true, value };
};

// String length validation
export const validateLength = (str, min, max, fieldName = 'This field') => {
  if (!str || typeof str !== 'string') return { valid: false, error: `${fieldName} is required` };
  
  const trimmed = str.trim();
  if (trimmed.length < min) {
    return { valid: false, error: `${fieldName} must be at least ${min} characters` };
  }
  if (trimmed.length > max) {
    return { valid: false, error: `${fieldName} must be less than ${max} characters` };
  }
  
  return { valid: true, value: trimmed };
};

// Number validation
export const validateNumber = (value, min, max, fieldName = 'This field') => {
  const num = Number(value);
  
  if (isNaN(num)) return { valid: false, error: `${fieldName} must be a valid number` };
  if (min !== undefined && num < min) return { valid: false, error: `${fieldName} must be at least ${min}` };
  if (max !== undefined && num > max) return { valid: false, error: `${fieldName} must be at most ${max}` };
  
  return { valid: true, value: num };
};

// URL validation
export const validateURL = (url, fieldName = 'URL') => {
  if (!url || typeof url !== 'string') return { valid: false, error: `${fieldName} is required` };
  
  const trimmed = url.trim();
  if (trimmed.length === 0) return { valid: false, error: `${fieldName} is required` };
  
  try {
    const urlObj = new URL(trimmed);
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return { valid: false, error: `${fieldName} must start with http:// or https://` };
    }
    return { valid: true, value: trimmed };
  } catch (e) {
    return { valid: false, error: `Please enter a valid ${fieldName}` };
  }
};

// Referral code validation
export const validateReferralCode = (code) => {
  if (!code || typeof code !== 'string') return { valid: false, error: 'Referral code is required' };
  
  const trimmed = code.trim().toUpperCase();
  if (trimmed.length === 0) return { valid: false, error: 'Referral code is required' };
  
  const codeRegex = /^VTX-[A-Z]{3}-\d{4}$/;
  if (!codeRegex.test(trimmed)) {
    return { valid: false, error: 'Referral code must be in format: VTX-XXX-1234' };
  }
  
  return { valid: true, value: trimmed };
};

// Date validation (must be future date)
export const validateFutureDate = (dateStr, timeStr = null, fieldName = 'Date') => {
  if (!dateStr) return { valid: false, error: `${fieldName} is required` };
  
  const now = new Date();
  const selectedDate = new Date(dateStr);
  
  if (isNaN(selectedDate.getTime())) {
    return { valid: false, error: `Please enter a valid ${fieldName}` };
  }
  
  // If time is provided, combine date and time
  if (timeStr) {
    const [hours, minutes] = timeStr.split(':');
    selectedDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
  }
  
  if (selectedDate <= now) {
    return { valid: false, error: `${fieldName} must be in the future` };
  }
  
  return { valid: true, value: dateStr, dateTime: selectedDate };
};

// File validation
export const validateFile = (file, allowedTypes = [], maxSizeMB = 5) => {
  if (!file) return { valid: false, error: 'File is required' };
  
  // Check file type
  if (allowedTypes.length > 0) {
    const fileExt = file.name.split('.').pop().toLowerCase();
    if (!allowedTypes.includes(fileExt)) {
      return { valid: false, error: `File must be one of: ${allowedTypes.join(', ')}` };
    }
  }
  
  // Check file size
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return { valid: false, error: `File size must be less than ${maxSizeMB}MB` };
  }
  
  return { valid: true, value: file };
};

// Validate select/dropdown
export const validateSelect = (value, options, fieldName = 'Selection') => {
  if (!value) return { valid: false, error: `${fieldName} is required` };
  
  if (!options.includes(value)) {
    return { valid: false, error: `Please select a valid ${fieldName}` };
  }
  
  return { valid: true, value };
};

// Batch validation helper
export const validateForm = (validations) => {
  const errors = {};
  let isValid = true;
  
  for (const [field, validation] of Object.entries(validations)) {
    if (!validation.valid) {
      errors[field] = validation.error;
      isValid = false;
    }
  }
  
  return { isValid, errors };
};

// Check for duplicate in array
export const checkDuplicate = (value, array, key, fieldName = 'This value') => {
  const exists = array.some(item => {
    const itemValue = key ? item[key] : item;
    return itemValue.toString().toLowerCase() === value.toString().toLowerCase();
  });
  
  if (exists) {
    return { valid: false, error: `${fieldName} already exists` };
  }
  
  return { valid: true };
};
