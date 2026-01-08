/**
 * Torre Correos - Configuration
 * All configurable values in one place
 */

export const CONFIG = {
  // Contact Information
  whatsapp: {
    number: '5216641234567', // +52 664 123 4567 (formato internacional)
    message: 'Hola, me interesa obtener más información sobre Torre Correos'
  },

  // Calendar Integration
  calendar: {
    provider: 'cal.com',
    link: 'oscar-arredondo-fs6wzu/agenda-cita-torre-correos',
    namespace: 'agenda-cita-torre-correos',
    config: {
      layout: 'month_view',
      hideEventTypeDetails: false
    },
    timeout: 6000 // milliseconds before fallback
  },

  // Google Maps
  maps: {
    embedUrl: 'https://www.google.com/maps/embed?pb=...', // Update with actual embed URL
    latitude: 32.5149,
    longitude: -117.0382
  },

  // Animation Settings
  animations: {
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    tabRotateInterval: 5000, // milliseconds
    scrollRevealThreshold: 0.1,
    scrollRevealRootMargin: '-50px 0px'
  },

  // Site Metadata
  site: {
    title: 'Torre Correos - Departamentos Premium en Tijuana',
    description: 'Vive en el corazón de Tijuana con Torre Correos. Residencias, oficinas y comercios en el desarrollo de usos mixtos más exclusivo de la ciudad.',
    url: 'https://torrecorreos.vercel.app',
    developer: 'Probien Bienes Exclusivos'
  }
};
