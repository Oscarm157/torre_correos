/**
 * Hero Video Handler
 * Manages smooth loading and fade-in of hero background video
 */

/**
 * Initialize hero video with smooth fade-in
 * Shows background image until video is ready to play
 */
export function initHeroVideo() {
    const video = document.querySelector('.hero-video');

    if (!video) {
        return;
    }

    // Función para mostrar el video con fade-in
    function showVideo() {
        video.classList.add('loaded');
    }

    // Evento cuando el video puede reproducirse sin interrupciones
    video.addEventListener('canplaythrough', showVideo, { once: true });

    // Fallback: si el video ya está cargado cuando se ejecuta el script
    if (video.readyState >= 3) { // HAVE_FUTURE_DATA or HAVE_ENOUGH_DATA
        showVideo();
    }

    // Asegurar que el video se reproduce (algunos navegadores lo pausan)
    video.addEventListener('loadedmetadata', () => {
        video.play().catch((error) => {
            // Silenciar error de autoplay (esperado en algunos navegadores)
            console.log('Video autoplay blocked, will play on user interaction');
        });
    });
}
