/* ============================================
   Torre Correos - Landing Page Scripts
   Premium Real Estate Development
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initHeader();
    initMobileMenu();
    initScrollReveal();
    initStaggerAnimations();
    initGalleryLightbox();
    initSmoothScroll();
    initContactForm();
    initImageLoading();
    initSplitText();
    initCalPrefetch();
    initAmenitiesTabs();
    initCounterAnimation();
});

/* Header Scroll Effect */
function initHeader() {
    const header = document.querySelector('.header');
    let lastScroll = 0;
    let ticking = false;

    function handleScroll() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(handleScroll);
            ticking = true;
        }
    }, { passive: true });

    handleScroll();
}

/* Mobile Menu Toggle */
function initMobileMenu() {
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

/* Enhanced Scroll Reveal Animation */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-clip, .split-text');

    if (!reveals.length) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        reveals.forEach(el => el.classList.add('active'));
        return;
    }

    const observerOptions = {
        root: null,
        rootMargin: '-50px 0px',
        threshold: 0.1
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

/* Stagger Animations for Grids */
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

/* Split Text Animation */
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

/* Gallery Lightbox */
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (!lightbox || !galleryItems.length) return;

    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.dataset.img;
            if (imgSrc) {
                lightboxImg.src = imgSrc;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            lightboxImg.src = '';
        }, 300);
    }

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}

/* Smooth Scroll */
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

/* Image Loading Animation */
function initImageLoading() {
    const images = document.querySelectorAll('img[data-src]');

    if (!images.length) return;

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('img-loading');

                img.onload = () => {
                    img.classList.add('loaded');
                    img.classList.remove('img-loading');
                };

                imageObserver.unobserve(img);
            }
        });
    }, { rootMargin: '50px 0px' });

    images.forEach(img => imageObserver.observe(img));
}

/* Contact Form */
function initContactForm() {
    const form = document.getElementById('contactForm');

    if (!form) return;

    // Add focus animations to inputs
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(form);
        const data = {
            nombre: formData.get('nombre'),
            email: formData.get('email'),
            telefono: formData.get('telefono'),
            mensaje: formData.get('mensaje')
        };

        if (!data.nombre || !data.email || !data.telefono) {
            showFormMessage('Por favor completa todos los campos requeridos.', 'error');
            shakeForm(form);
            return;
        }

        if (!isValidEmail(data.email)) {
            showFormMessage('Por favor ingresa un email válido.', 'error');
            shakeForm(form);
            return;
        }

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<span class="btn-loading"></span> Enviando...';
        submitBtn.disabled = true;

        setTimeout(() => {
            showFormMessage('¡Gracias por tu interés! Nos pondremos en contacto contigo pronto.', 'success');
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;

            // Success animation
            submitBtn.classList.add('success');
            setTimeout(() => submitBtn.classList.remove('success'), 1000);
        }, 1500);
    });
}

/* Helper Functions */
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function shakeForm(form) {
    form.classList.add('shake');
    setTimeout(() => form.classList.remove('shake'), 500);
}

function showFormMessage(message, type) {
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

    const form = document.getElementById('contactForm');
    form.insertBefore(messageEl, form.firstChild);

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

/* Add shake animation styles */
const shakeStyles = document.createElement('style');
shakeStyles.textContent = `
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
`;
document.head.appendChild(shakeStyles);

/* Cal.com Prefetch & Modal */
function initCalPrefetch() {
    const calButton = document.querySelector('[data-cal-namespace]');
    if (!calButton) return;
    const namespace = calButton.dataset.calNamespace || calButton.getAttribute('data-cal-namespace');
    const calLink = calButton.dataset.calLink || calButton.getAttribute('data-cal-link');
    let scriptLoading = false;

    function prefetchCalScript() {
        if (window._calPrefetched || scriptLoading) return;
        if (navigator.connection && navigator.connection.saveData) return; // respect Save-Data
        scriptLoading = true;
        const s = document.createElement('script');
        s.src = 'https://app.cal.com/embed/embed.js';
        s.async = true;
        s.crossOrigin = 'anonymous';
        s.onload = () => { window._calPrefetched = true; scriptLoading = false; };
        s.onerror = () => { scriptLoading = false; };
        document.head.appendChild(s);
    }

    calButton.addEventListener('pointerenter', prefetchCalScript, { once: true });
    calButton.addEventListener('touchstart', prefetchCalScript, { once: true, passive: true });

    calButton.addEventListener('click', function(e) {
        e.preventDefault();
        openCalModal(namespace, calLink);
    });
}

function openCalModal(namespace, calLink) {
    const modal = document.getElementById('calModal');
    if (!modal) return;
    const calButton = document.querySelector('[data-cal-namespace]');
    if (calButton) calButton.setAttribute('aria-expanded', 'true');
    const skeleton = modal.querySelector('.cal-skeleton');
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    modal.setAttribute('aria-busy', 'true');
    document.body.style.overflow = 'hidden';
    let opened = false;

    function tryOpenCal() {
        if (window.Cal && typeof window.Cal === 'function') {
            try {
                if (window.Cal.ns && window.Cal.ns[namespace]) {
                    window.Cal.ns[namespace]('ui', { "hideEventTypeDetails": false, "layout": "month_view" });
                    opened = true;
                    hideSkeleton();
                } else {
                    window.Cal('init', namespace, { origin: 'https://app.cal.com' });
                    if (window.Cal.ns && window.Cal.ns[namespace]) {
                        window.Cal.ns[namespace]('ui', { "hideEventTypeDetails": false, "layout": "month_view" });
                        opened = true;
                        hideSkeleton();
                    }
                }
            } catch (err) {
                // ignore, will retry
            }
        }
    }

    function hideSkeleton() {
        if (skeleton) skeleton.style.display = 'none';
        const embed = document.getElementById('calEmbedContainer');
        if (embed) embed.hidden = false;
        modal.removeAttribute('aria-busy');
    }

    tryOpenCal();
    const interval = setInterval(() => {
        if (opened) { clearInterval(interval); return; }
        tryOpenCal();
    }, 500);

    // Timeout fallback
    setTimeout(() => {
        clearInterval(interval);
        if (!opened) {
            const open = confirm('El calendario no pudo cargarse rápidamente. ¿Deseas abrirlo en una nueva pestaña?');
            if (open) {
                window.open('https://cal.com/' + calLink, '_blank', 'noopener');
                closeCalModal();
            }
        }
    }, 6000);
}

function closeCalModal() {
    const modal = document.getElementById('calModal');
    if (!modal) return;
    const calButton = document.querySelector('[data-cal-namespace]');
    if (calButton) calButton.setAttribute('aria-expanded', 'false');
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-busy');
    document.body.style.overflow = '';
}

// Modal close button and overlay behavior
document.addEventListener('click', function(e) {
    const target = e.target;
    const modal = document.getElementById('calModal');
    if (!modal) return;
    if (target.matches('.cal-modal-close')) closeCalModal();
    if (target === modal) closeCalModal();
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeCalModal();
});

/* Amenities Tabs Interaction */
function initAmenitiesTabs() {
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

    // Auto-rotate tabs every 5 seconds (optional, pauses on hover)
    let autoRotate;
    const tabsContainer = document.querySelector('.amenities-tabs');

    function startAutoRotate() {
        autoRotate = setInterval(() => {
            const activeTab = document.querySelector('.amenity-tab.active');
            const currentIndex = Array.from(tabs).indexOf(activeTab);
            const nextIndex = (currentIndex + 1) % tabs.length;
            tabs[nextIndex].click();
        }, 5000);
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

/* Counter Animation */
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
