/**
 * Torre Correos - Animations Module
 * Handles scroll reveals, text animations, counters, and smooth scrolling
 */

import { CONFIG } from './config.js';

/**
 * Initialize scroll reveal animations
 * Uses IntersectionObserver to animate elements as they enter the viewport
 */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-clip, .split-text');

    if (!reveals.length) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = CONFIG.animations.reducedMotion;

    if (prefersReducedMotion) {
        reveals.forEach(el => el.classList.add('active'));
        return;
    }

    const observerOptions = {
        root: null,
        rootMargin: CONFIG.animations.scrollRevealRootMargin,
        threshold: CONFIG.animations.scrollRevealThreshold
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Unobserve after animation to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    reveals.forEach(reveal => {
        observer.observe(reveal);
    });
}

/**
 * Initialize stagger animations for grid items
 * Adds progressive delays to create cascading animation effects
 */
function initStaggerAnimations() {
    // Add stagger delays to gallery items
    const galleryItems = document.querySelectorAll('.gallery-item.reveal');
    galleryItems.forEach((item, index) => {
        item.setAttribute('data-delay', (index % 6) + 1);
    });

    // Add stagger delays to value cards
    const valueCards = document.querySelectorAll('.value-card.reveal');
    valueCards.forEach((card, index) => {
        card.setAttribute('data-delay', index + 1);
    });

    // Add stagger delays to amenity items
    const amenityItems = document.querySelectorAll('.amenity-item');
    amenityItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });
}

/**
 * Initialize split text animation
 * Splits text into individual word elements for animated reveals
 */
function initSplitText() {
    const splitTexts = document.querySelectorAll('.split-text');

    splitTexts.forEach(element => {
        const text = element.textContent;
        const words = text.split(' ');

        element.innerHTML = words.map(word =>
            `<span class="word"><span class="word-inner">${word}</span></span>`
        ).join(' ');
    });
}

/**
 * Initialize counter animations
 * Animates numbers from 0 to their target value when scrolled into view
 */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number[data-count]');

    if (!counters.length) return;

    const animateCounter = (counter) => {
        const target = counter.dataset.count;
        const duration = 2000; // 2 seconds
        const startTime = performance.now();

        // Check if it's a number or special format (like "360°" or "24/7")
        const isNumeric = !isNaN(parseInt(target));

        if (!isNumeric) {
            // For non-numeric values, just reveal them with a typing effect
            counter.textContent = '';
            let i = 0;
            const typeInterval = setInterval(() => {
                counter.textContent += target[i];
                i++;
                if (i >= target.length) {
                    clearInterval(typeInterval);
                }
            }, 100);
            return;
        }

        const targetNum = parseInt(target);

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function for smooth deceleration
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);

            const currentValue = Math.floor(easeOutQuart * targetNum);
            counter.textContent = currentValue;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = targetNum;
            }
        }

        requestAnimationFrame(updateCounter);
    };

    // Use Intersection Observer to trigger animation when in view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

/**
 * Initialize smooth scrolling for anchor links
 * Provides smooth scroll behavior with offset for fixed header
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - headerHeight - 20;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Initialize all animation features
 * Main export function that sets up all animation-related functionality
 */
export function initAnimations() {
    initScrollReveal();
    initStaggerAnimations();
    initSplitText();
    initCounterAnimation();
    initSmoothScroll();
}
