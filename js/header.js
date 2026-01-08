/**
 * Torre Correos - Header Module
 * Handles header scroll effects and mobile menu functionality
 */

import { rafThrottle } from './utils.js';

/**
 * Initialize header scroll effects
 * Adds/removes 'scrolled' class based on scroll position
 */
export function initHeader() {
    const header = document.querySelector('.header');
    let lastScroll = 0;

    const handleScroll = rafThrottle(() => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial call
    handleScroll();
}

/**
 * Initialize mobile menu toggle functionality
 * Handles menu open/close, keyboard navigation, and accessibility
 */
export function initMobileMenu() {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.nav-menu');
    const menuLinks = document.querySelectorAll('.nav-menu a');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', function() {
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    });

    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            toggle.classList.remove('active');
            menu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && menu.classList.contains('active')) {
            toggle.classList.remove('active');
            menu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}
