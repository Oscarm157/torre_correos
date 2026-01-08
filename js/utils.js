/**
 * Torre Correos - Utility Functions
 * Shared helper functions and utilities
 */

/**
 * Request Animation Frame throttle
 * Ensures callback runs only once per animation frame
 */
export function rafThrottle(callback) {
  let requestId = null;
  return function(...args) {
    if (requestId === null) {
      requestId = requestAnimationFrame(() => {
        callback(...args);
        requestId = null;
      });
    }
  };
}

/**
 * Email validation
 * @param {string} email - Email address to validate
 * @returns {boolean} True if valid email format
 */
export function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Shake element animation
 * @param {HTMLElement} element - Element to shake
 */
export function shakeElement(element) {
  element.classList.add('shake');
  setTimeout(() => element.classList.remove('shake'), 500);
}

/**
 * Show notification message
 * @param {string} message - Message to display
 * @param {string} type - Message type ('success' | 'error')
 * @param {HTMLElement} container - Container to append message to
 */
export function showMessage(message, type, container) {
  const existingMessage = document.querySelector('.form-message');
  if (existingMessage) {
    existingMessage.remove();
  }

  const messageEl = document.createElement('div');
  messageEl.className = `form-message form-message--${type}`;
  messageEl.textContent = message;
  messageEl.style.cssText = `
    padding: 16px;
    margin-bottom: 16px;
    border-radius: 4px;
    font-size: 0.9375rem;
    text-align: center;
    opacity: 0;
    transform: translateY(-10px);
    transition: all 0.3s ease;
    ${type === 'success'
      ? 'background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb;'
      : 'background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'
    }
  `;

  container.insertBefore(messageEl, container.firstChild);

  // Trigger animation
  requestAnimationFrame(() => {
    messageEl.style.opacity = '1';
    messageEl.style.transform = 'translateY(0)';
  });

  setTimeout(() => {
    messageEl.style.opacity = '0';
    messageEl.style.transform = 'translateY(-10px)';
    setTimeout(() => messageEl.remove(), 300);
  }, 5000);
}

/**
 * Inject dynamic styles
 * @param {string} css - CSS rules to inject
 */
export function injectStyles(css) {
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);
  return styleEl;
}

// Inject form animation styles
injectStyles(`
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%, 60% { transform: translateX(-5px); }
    40%, 80% { transform: translateX(5px); }
  }
  .shake {
    animation: shake 0.5s ease;
  }
  .btn-loading {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin-right: 8px;
    vertical-align: middle;
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  .btn.success {
    background-color: #28a745 !important;
  }
`);
