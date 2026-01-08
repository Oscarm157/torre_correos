/**
 * Torre Correos - Amenities Module
 * Handles amenities tabs interaction, keyboard navigation, and auto-rotation
 */

import { CONFIG } from './config.js';

/**
 * Initialize amenities tabs functionality
 * Provides tab switching, keyboard navigation, and automatic rotation
 */
export function initAmenities() {
    const tabs = document.querySelectorAll('.amenity-tab');
    const panels = document.querySelectorAll('.amenity-panel');

    if (!tabs.length || !panels.length) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetPanel = this.dataset.tab;

            // Remove active class from all tabs and panels and update aria
            tabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            panels.forEach(p => {
                p.classList.remove('active');
                p.setAttribute('aria-hidden', 'true');
            });

            // Add active class to clicked tab and corresponding panel
            this.classList.add('active');
            this.setAttribute('aria-selected', 'true');

            const panel = document.querySelector(`.amenity-panel[data-panel="${targetPanel}"]`);
            if (panel) {
                panel.classList.add('active');
                panel.setAttribute('aria-hidden', 'false');
                // move focus to panel for keyboard users
                panel.focus && panel.focus();
            }
        });

        // Keyboard navigation
        tab.addEventListener('keydown', function(e) {
            const currentIndex = Array.from(tabs).indexOf(this);
            let newIndex;

            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                newIndex = (currentIndex + 1) % tabs.length;
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
            } else if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
                return;
            } else {
                return;
            }

            tabs[newIndex].focus();
            tabs[newIndex].click();
        });
    });

    // Auto-rotate tabs (pauses on hover)
    let autoRotate;
    const tabsContainer = document.querySelector('.amenities-tabs');

    function startAutoRotate() {
        autoRotate = setInterval(() => {
            const activeTab = document.querySelector('.amenity-tab.active');
            const currentIndex = Array.from(tabs).indexOf(activeTab);
            const nextIndex = (currentIndex + 1) % tabs.length;
            tabs[nextIndex].click();
        }, CONFIG.animations.tabRotateInterval);
    }

    function stopAutoRotate() {
        clearInterval(autoRotate);
    }

    // Start auto-rotate
    startAutoRotate();

    // Pause on hover or focus
    if (tabsContainer) {
        tabsContainer.addEventListener('mouseenter', stopAutoRotate);
        tabsContainer.addEventListener('mouseleave', startAutoRotate);
        tabsContainer.addEventListener('focusin', stopAutoRotate);
        tabsContainer.addEventListener('focusout', startAutoRotate);
    }
}
