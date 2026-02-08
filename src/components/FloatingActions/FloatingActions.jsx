// src/components/FloatingContactPro/FloatingContactPro.jsx
import React, { useEffect, useState, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import {
  FaWhatsapp,
  FaPhone,
  FaCommentAlt,
  FaTimes,
  FaEnvelope,
  FaChevronRight,
  FaSpinner,
  FaCopy,
  FaCheck,
  FaPaperPlane
} from 'react-icons/fa';
import './floating-actions.css';

export default function FloatingContactPro({
  // WhatsApp configuration
  whatsappNumbers = [
    { number: '+919876543210', label: 'Sales Team', icon: '👔' },
    { number: '+919876543211', label: 'Support Team', icon: '🛠️' }
  ],
  whatsappMessage = 'Hello, I would like to know more about your services!',

  // Phone configuration
  phoneNumbers = [
    { number: '+919876543210', label: 'Sales Team', icon: '📞' },
    { number: '+919876543211', label: 'Support Team', icon: '🔧' }
  ],

  // Email configuration
  emailAddress = 'contact@vertexglobaltech.com',
  emailSubject = 'Inquiry from Website',

  // Settings
  enablePulse = true,
  position = 'right',
  showCallButton = true,
  showEmailButton = true,
  floatingButtonSize = 'medium',
  autoClose = true,
  enableRipple = true,
  showBadgeCount = true,
  darkMode = false,
  zIndex = 999999
}) {
  // State
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('main');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(null);
  const [notification, setNotification] = useState(null);
  const [ripple, setRipple] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [menuHeight, setMenuHeight] = useState('auto');
  const [mounted, setMounted] = useState(false);

  // Refs
  const containerRef = useRef(null);
  const menuRef = useRef(null);
  const timeoutRef = useRef(null);
  const rippleTimeoutRef = useRef(null);
  const notificationTimeoutRef = useRef(null);

  // Initialize component
  useEffect(() => {
    setMounted(true);

    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);

      if (width <= 768 && menuRef.current) {
        const viewportHeight = window.innerHeight;
        const maxHeight = viewportHeight * 0.7;
        setMenuHeight(`${maxHeight}px`);
      } else {
        setMenuHeight('auto');
      }
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    return () => {
      window.removeEventListener('resize', checkDevice);
      clearAllTimeouts();
    };
  }, []);


  // Clear all timeouts
  const clearAllTimeouts = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (rippleTimeoutRef.current) clearTimeout(rippleTimeoutRef.current);
    if (notificationTimeoutRef.current) clearTimeout(notificationTimeoutRef.current);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target) &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);

      if (isMobile) {
        const scrollY = window.scrollY;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';
      }
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);

      if (isMobile) {
        const scrollY = parseInt(document.body.style.top || '0') * -1;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
      }
    };
  }, [isOpen, isMobile]);

  // Handle escape key
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeMenu();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [isOpen]);

  // Handle touch swipe to close on mobile
  const handleTouchStart = useCallback((e) => {
    if (isOpen && isMobile && menuRef.current) {
      setTouchStartY(e.touches[0].clientY);
    }
  }, [isOpen, isMobile]);

  const handleTouchMove = useCallback((e) => {
    if (!isOpen || !isMobile || !menuRef.current || touchStartY === 0) return;

    const touchY = e.touches[0].clientY;
    const diff = touchY - touchStartY;

    if (diff > 100) {
      closeMenu();
    }
  }, [isOpen, isMobile, touchStartY]);

  // Ripple effect
  const createRipple = useCallback((e) => {
    if (!enableRipple) return;

    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    setRipple({ x, y, size });

    if (rippleTimeoutRef.current) clearTimeout(rippleTimeoutRef.current);
    rippleTimeoutRef.current = setTimeout(() => {
      setRipple(null);
    }, 600);
  }, [enableRipple]);

  // Show notification
  const showNotification = useCallback((message, duration = 2000) => {
    setNotification(message);

    if (notificationTimeoutRef.current) clearTimeout(notificationTimeoutRef.current);
    notificationTimeoutRef.current = setTimeout(() => {
      setNotification(null);
    }, duration);
  }, []);

  // Close menu
  const closeMenu = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => {
      setActiveMenu('main');
      setLoading(false);
    }, 300);
  }, []);

  // Handle main button click
  const handleMainButtonClick = useCallback((e) => {
    createRipple(e);
    setIsOpen(!isOpen);
    if (isOpen) {
      setTimeout(() => setActiveMenu('main'), 300);
    }
  }, [isOpen, createRipple]);

  // Handle menu item click
  const handleMenuItemClick = useCallback((type) => {
    if (type === 'whatsapp') {
      if (whatsappNumbers.length === 1) {
        openWhatsApp(whatsappNumbers[0].number);
      } else {
        setActiveMenu('whatsapp');
      }
    } else if (type === 'call') {
      if (phoneNumbers.length === 1) {
        makePhoneCall(phoneNumbers[0].number);
      } else {
        setActiveMenu('call');
      }
    } else if (type === 'email') {
      sendEmail();
    }
  }, [whatsappNumbers, phoneNumbers]);

  // Handle back button
  const handleBackClick = useCallback(() => {
    setActiveMenu('main');
  }, []);

  // Open WhatsApp
  const openWhatsApp = useCallback((number) => {
    setLoading(true);
    const cleanedNumber = number.replace(/\D/g, '');
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${cleanedNumber}?text=${encodedMessage}`;

    showNotification('Opening WhatsApp...');

    setTimeout(() => {
      const newWindow = window.open(whatsappUrl, '_blank');

      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        window.location.href = whatsappUrl;
      }

      setLoading(false);
      if (autoClose) closeMenu();
    }, 300);
  }, [whatsappMessage, autoClose, closeMenu, showNotification]);

  // Make phone call
  const makePhoneCall = useCallback((number) => {
    setLoading(true);
    const cleanedNumber = number.replace(/\D/g, '');

    showNotification('Initiating call...');

    setTimeout(() => {
      if (isMobile) {
        window.location.href = `tel:${cleanedNumber}`;
      } else {
        copyToClipboard(cleanedNumber, 'call-desktop');
        showNotification(`Call ${formatPhoneNumber(number)} (Number copied)`);
      }
      setLoading(false);
      if (autoClose) closeMenu();
    }, 300);
  }, [isMobile, autoClose, closeMenu, showNotification]);

  // Send email
  const sendEmail = useCallback(() => {
    setLoading(true);
    const encodedSubject = encodeURIComponent(emailSubject);
    const mailtoUrl = `mailto:${emailAddress}?subject=${encodedSubject}`;

    showNotification('Opening Email Client...');

    setTimeout(() => {
      const newWindow = window.open(mailtoUrl, '_blank');

      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        window.location.href = mailtoUrl;
      }

      setLoading(false);
      if (autoClose) closeMenu();
    }, 300);
  }, [emailAddress, emailSubject, autoClose, closeMenu, showNotification]);

  // Copy to clipboard
  const copyToClipboard = useCallback((text, type) => {
    const fallbackCopy = () => {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        const successful = document.execCommand('copy');
        if (successful) {
          setCopied(type);
          showNotification('Copied to clipboard!');
        } else {
          showNotification('Failed to copy');
        }
      } catch (err) {
        showNotification('Failed to copy');
      }

      document.body.removeChild(textArea);
    };

    if (!navigator.clipboard) {
      fallbackCopy();
      return;
    }

    navigator.clipboard.writeText(text)
      .then(() => {
        setCopied(type);
        showNotification('Copied to clipboard!');

        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setCopied(null);
        }, 2000);
      })
      .catch(() => {
        fallbackCopy();
      });
  }, [showNotification]);

  // Format phone number
  const formatPhoneNumber = useCallback((phoneNumber) => {
    const cleaned = phoneNumber.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
    } else if (cleaned.length === 12) {
      return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`;
    } else if (cleaned.length === 11) {
      return `+${cleaned.slice(0, 1)} ${cleaned.slice(1, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
    }
    return phoneNumber;
  }, []);

  // Get button size class
  const getButtonSizeClass = useCallback(() => {
    switch (floatingButtonSize) {
      case 'small': return 'size-small';
      case 'large': return 'size-large';
      default: return 'size-medium';
    }
  }, [floatingButtonSize]);

  if (!mounted) return null;

  const portalContent = (
    <div
      ref={containerRef}
      className={`floating-contact-pro ${position} ${getButtonSizeClass()} ${darkMode ? 'dark-mode' : ''}`}
      style={{ zIndex }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      {/* Loading Overlay */}
      {loading && (
        <div className="floating-contact-skeleton">
          <div className="skeleton-card">
            <div className="skeleton-header">
              <div className="skeleton-avatar"></div>
              <div className="skeleton-text">
                <div className="skeleton-line"></div>
                <div className="skeleton-line short"></div>
              </div>
            </div>
            <div className="skeleton-body">
              <div className="skeleton-item"></div>
              <div className="skeleton-item"></div>
              <div className="skeleton-item"></div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Menu */}
      <div
        ref={menuRef}
        id="contact-menu"
        className={`contact-menu ${isOpen ? 'show' : 'hide'} ${isMobile ? 'mobile' : ''}`}
        aria-hidden={!isOpen}
        role="dialog"
        aria-label="Contact options"
        style={{ maxHeight: menuHeight }}
      >
        {/* Main Menu */}
        {activeMenu === 'main' && (
          <>
            <div className="menu-header">
              <h3>Contact Options</h3>
              <p>Choose how you'd like to reach us</p>
            </div>

            <div className="menu-items">
              {/* WhatsApp Option */}
              <button
                className="menu-item whatsapp"
                onClick={() => handleMenuItemClick('whatsapp')}
                disabled={loading}
                aria-label="Open WhatsApp chat options"
              >
                <div className="menu-icon">
                  <FaWhatsapp aria-hidden="true" />
                  <div className="icon-pulse"></div>
                </div>
                <div className="menu-content">
                  <strong>WhatsApp Chat</strong>
                  <span>Instant messaging with our team</span>
                </div>
                {showBadgeCount && whatsappNumbers.length > 1 && (
                  <div className="menu-badge" aria-label={`${whatsappNumbers.length} options available`}>
                    {whatsappNumbers.length}
                  </div>
                )}
                <div className="menu-arrow">
                  <FaChevronRight aria-hidden="true" />
                </div>
              </button>

              {/* Call Option */}
              {showCallButton && (
                <button
                  className="menu-item call"
                  onClick={() => handleMenuItemClick('call')}
                  disabled={loading}
                  aria-label="Open phone call options"
                >
                  <div className="menu-icon">
                    <FaPhone aria-hidden="true" />
                    <div className="icon-pulse"></div>
                  </div>
                  <div className="menu-content">
                    <strong>Phone Call</strong>
                    <span>Speak directly with our team</span>
                  </div>
                  {showBadgeCount && phoneNumbers.length > 1 && (
                    <div className="menu-badge" aria-label={`${phoneNumbers.length} options available`}>
                      {phoneNumbers.length}
                    </div>
                  )}
                  <div className="menu-arrow">
                    <FaChevronRight aria-hidden="true" />
                  </div>
                </button>
              )}

              {/* Email Option */}
              {showEmailButton && (
                <button
                  className="menu-item email"
                  onClick={() => handleMenuItemClick('email')}
                  disabled={loading}
                  aria-label="Send email"
                >
                  <div className="menu-icon">
                    <FaEnvelope aria-hidden="true" />
                    <div className="icon-pulse"></div>
                  </div>
                  <div className="menu-content">
                    <strong>Send Email</strong>
                    <span>Email us directly</span>
                  </div>
                  <div className="menu-arrow">
                    <FaChevronRight aria-hidden="true" />
                  </div>
                </button>
              )}
            </div>
          </>
        )}

        {/* WhatsApp Selection Menu */}
        {activeMenu === 'whatsapp' && (
          <>
            <div className="menu-header">
              <button
                className="back-btn"
                onClick={handleBackClick}
                disabled={loading}
                aria-label="Go back to main menu"
              >
                <FaChevronRight className="back-icon" aria-hidden="true" />
                <span>Back</span>
              </button>
              <h3>Select WhatsApp Number</h3>
              <p>Choose which team to contact</p>
            </div>

            <div className="menu-items number-selection-menu">
              {whatsappNumbers.map((item, index) => (
                <button
                  key={index}
                  className="number-item"
                  onClick={() => openWhatsApp(item.number)}
                  disabled={loading}
                  aria-label={`Contact ${item.label} on WhatsApp`}
                >
                  <div className="number-avatar">
                    <div className="avatar-glow"></div>
                    <span className="avatar-icon">
                      {typeof item.icon === 'string' && item.icon.startsWith('bi-') ? (
                        <i className={`bi ${item.icon}`} style={{ fontSize: '1.2rem' }}></i>
                      ) : (
                        item.icon || <FaWhatsapp aria-hidden="true" />
                      )}
                    </span>
                  </div>
                  <div className="number-content">
                    <strong>{item.label}</strong>
                    <div className="number-row">
                      <span className="number-display">
                        {formatPhoneNumber(item.number)}
                      </span>
                      <button
                        className="copy-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(item.number, `whatsapp-${index}`);
                        }}
                        aria-label="Copy phone number"
                        type="button"
                      >
                        {copied === `whatsapp-${index}` ? (
                          <FaCheck className="copy-success" aria-hidden="true" />
                        ) : (
                          <FaCopy aria-hidden="true" />
                        )}
                      </button>
                    </div>
                  </div>
                  {loading ? (
                    <FaSpinner className="loading-spinner" aria-hidden="true" />
                  ) : (
                    <FaChevronRight aria-hidden="true" />
                  )}
                </button>
              ))}
            </div>
          </>
        )}

        {/* Call Selection Menu */}
        {activeMenu === 'call' && (
          <>
            <div className="menu-header">
              <button
                className="back-btn"
                onClick={handleBackClick}
                disabled={loading}
                aria-label="Go back to main menu"
              >
                <FaChevronRight className="back-icon" aria-hidden="true" />
                <span>Back</span>
              </button>
              <h3>Select Phone Number</h3>
              <p>Choose which team to call</p>
            </div>

            <div className="menu-items number-selection-menu">
              {phoneNumbers.map((item, index) => (
                <button
                  key={index}
                  className="number-item"
                  onClick={() => makePhoneCall(item.number)}
                  disabled={loading}
                  aria-label={`Call ${item.label}`}
                >
                  <div className="number-avatar">
                    <div className="avatar-glow"></div>
                    <span className="avatar-icon">
                      {typeof item.icon === 'string' && item.icon.startsWith('bi-') ? (
                        <i className={`bi ${item.icon}`} style={{ fontSize: '1.2rem' }}></i>
                      ) : (
                        item.icon || <FaPhone aria-hidden="true" />
                      )}
                    </span>
                  </div>
                  <div className="number-content">
                    <strong>{item.label}</strong>
                    <div className="number-row">
                      <span className="number-display">
                        {formatPhoneNumber(item.number)}
                      </span>
                      <button
                        className="copy-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(item.number, `call-${index}`);
                        }}
                        aria-label="Copy phone number"
                        type="button"
                      >
                        {copied === `call-${index}` ? (
                          <FaCheck className="copy-success" aria-hidden="true" />
                        ) : (
                          <FaCopy aria-hidden="true" />
                        )}
                      </button>
                    </div>
                  </div>
                  {loading ? (
                    <FaSpinner className="loading-spinner" aria-hidden="true" />
                  ) : (
                    <FaChevronRight aria-hidden="true" />
                  )}
                </button>
              ))}
            </div>
          </>
        )}

        {/* Close button for mobile */}
        {isMobile && (
          <button
            className="mobile-close-btn"
            onClick={closeMenu}
            aria-label="Close contact menu"
          >
            <FaTimes aria-hidden="true" />
            Close
          </button>
        )}
      </div>

      {/* Main Button */}
      <button
        className={`floating-main-btn ${isOpen ? 'active' : ''} ${enablePulse ? 'pulse-enabled' : ''} ${getButtonSizeClass()}`}
        onClick={handleMainButtonClick}
        aria-label={isOpen ? "Close contact menu" : "Open contact menu"}
        aria-expanded={isOpen}
        aria-controls="contact-menu"
      >
        {isOpen ? (
          <FaTimes aria-hidden="true" />
        ) : (
          <FaCommentAlt className="comment-icon" aria-hidden="true" />
        )}

        {/* Ripple Effect */}
        {ripple && (
          <span
            className="ripple"
            style={{
              left: ripple.x + 'px',
              top: ripple.y + 'px',
              width: ripple.size + 'px',
              height: ripple.size + 'px'
            }}
            aria-hidden="true"
          />
        )}

        {/* Tooltip */}
        <span className="floating-tooltip">
          {isOpen ? 'Close Menu' : 'Contact Us'}
        </span>

        {/* Pulse Rings */}
        {enablePulse && !isOpen && (
          <>
            <div className="pulse-ring pulse-ring-1" aria-hidden="true"></div>
            <div className="pulse-ring pulse-ring-2" aria-hidden="true"></div>
            <div className="pulse-ring pulse-ring-3" aria-hidden="true"></div>
          </>
        )}
      </button>

      {/* Notification Toast */}
      {notification && (
        <div className="notification-toast show" role="alert">
          <FaPaperPlane aria-hidden="true" />
          <span>{notification}</span>
        </div>
      )}

    </div>
  );

  return ReactDOM.createPortal(portalContent, document.body);
}