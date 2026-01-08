/**
 * Torre Correos - Main Entry Point
 * Orchestrates initialization of all application modules
 */

import { initHeader, initMobileMenu } from './header.js';
import { initGallery } from './gallery.js';
import { initAnimations } from './animations.js';
import { initAmenities } from './amenities.js';
import { initForm } from './form.js';
import { CONFIG } from './config.js';

/**
 * Initialize all application components
 * Called when DOM is fully loaded
 */
function init() {
    // Header and navigation (must be first for proper layout)
    initHeader();
    initMobileMenu();

    // Gallery features
    initGallery();

    // Animation system
    initAnimations();

    // Interactive components
    initAmenities();

    // Contact form
    initForm();

    // Log initialization complete (can be removed in production)
    if (typeof console !== 'undefined') {
        console.log('%c Torre Correos initialized', 'color: #B8860B; font-weight: bold');
        console.log('%c Developer: ' + CONFIG.site.developer, 'color: #666');
    }
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    // DOM is already ready
    init();
}
