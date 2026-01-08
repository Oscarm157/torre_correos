/**
 * Torre Correos - Gallery Module
 * Handles image lightbox and lazy loading functionality
 */

/**
 * Initialize gallery lightbox functionality
 * Allows users to view full-size images in a modal overlay
 */
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

/**
 * Initialize lazy loading for images
 * Uses IntersectionObserver to load images only when they enter the viewport
 */
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

/**
 * Initialize all gallery features
 * Main export function that sets up both lightbox and lazy loading
 */
export function initGallery() {
    initGalleryLightbox();
    initImageLoading();
}
