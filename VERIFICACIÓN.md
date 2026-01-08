# Checklist de Verificación - Torre Correos

## 🚀 Sprint 4: Verificación End-to-End

### 1. Performance Testing

**Lighthouse (usar Chrome DevTools)**
```bash
# Opción 1: Chrome DevTools
# 1. Abrir Chrome DevTools (F12)
# 2. Tab "Lighthouse"
# 3. Seleccionar "Performance", "Accessibility", "Best Practices", "SEO"
# 4. Click "Analyze page load"

# Opción 2: CLI
npx lighthouse https://torrecorreos.vercel.app --view
```

**Métricas Objetivo:**
- [ ] Performance: 90+ (⚠️ Pendiente optimización de imágenes)
- [ ] Accessibility: 95+
- [ ] Best Practices: 95+
- [ ] SEO: 100

### 2. Responsive Testing

**Mobile (320px - 768px)**
- [ ] 320px - iPhone SE (navegación móvil funciona)
- [ ] 375px - iPhone X (hero section se ve bien)
- [ ] 414px - iPhone Plus (cards se alinean correctamente)
- [ ] 768px - iPad (grid de 2 columnas funciona)

**Desktop (1024px+)**
- [ ] 1024px - Laptop (grid completo de 4 columnas)
- [ ] 1280px - Desktop (container max-width correcto)
- [ ] 1920px - Full HD (imágenes no pixeladas)

**Herramienta:** Chrome DevTools → Device Toolbar (Ctrl+Shift+M)

### 3. Browser Testing

**Navegadores Principales**
- [ ] Chrome/Edge (latest) - Funcionalidad completa
- [ ] Firefox (latest) - CSS Grid/Flexbox
- [ ] Safari (latest) - WebP support

**Verificar:**
- Fonts cargan correctamente
- Animaciones funcionan suavemente
- ES6 modules cargan (requiere servidor)
- CSS @import funciona

### 4. Funcionalidad Core

**Navegación**
- [ ] Header sticky funciona al hacer scroll
- [ ] Logo cambia de tamaño al scrollear
- [ ] Links de navegación funcionan (#proyecto, #galeria, etc)
- [ ] Mobile menu abre/cierra correctamente
- [ ] Botón hamburguesa anima (3 líneas → X)
- [ ] ESC cierra menú móvil
- [ ] Smooth scroll con offset correcto

**Hero Section**
- [ ] Imagen de fondo carga
- [ ] Overlay gradient se ve bien
- [ ] Botones CTA visibles y clicables
- [ ] Animaciones fade-in funcionan
- [ ] Scroll indicator se muestra

**Galería**
- [ ] Grid masonry se renderiza correctamente
- [ ] Click en imagen abre lightbox
- [ ] Imagen en lightbox se muestra full screen
- [ ] Botón close (X) cierra lightbox
- [ ] ESC cierra lightbox
- [ ] Click fuera de imagen cierra lightbox
- [ ] Lazy loading funciona (imágenes cargan al scroll)

**Amenidades Tabs**
- [ ] Tabs se pueden clickear
- [ ] Panel activo se muestra correctamente
- [ ] Solo un panel visible a la vez
- [ ] Auto-rotate cada 5 segundos funciona
- [ ] Hover pausa auto-rotate
- [ ] Keyboard navigation (Arrow keys) funciona
- [ ] Enter/Space activa tab
- [ ] ARIA attributes correctos (aria-selected, aria-hidden)
- [ ] Transiciones suaves entre tabs

**Formulario de Contacto**
- [ ] Inputs tienen focus styles
- [ ] Validación de campos requeridos funciona
- [ ] Email validation funciona (formato correcto)
- [ ] Error shake animation se muestra
- [ ] Mensaje de error se muestra en rojo
- [ ] Botón muestra "Enviando..." durante submit
- [ ] Mensaje de éxito se muestra en verde
- [ ] Form se resetea después de éxito
- [ ] Form no permite submit vacío

**Cal.com Integration**
- [ ] Botón "Agenda tu cita" funciona
- [ ] Modal Cal.com abre correctamente
- [ ] Skeleton loader se muestra mientras carga
- [ ] Calendario se carga (puede tardar ~6 segundos)
- [ ] Fallback a nueva pestaña si no carga
- [ ] ESC cierra modal
- [ ] Click fuera cierra modal
- [ ] Botón close (X) funciona

**WhatsApp Button**
- [ ] Botón flotante visible en esquina inferior derecha
- [ ] Hover hace scale(1.1)
- [ ] Click abre WhatsApp Web
- [ ] Número correcto: +52 664 123 4567
- [ ] Mensaje pre-llenado correcto
- [ ] Floating animation funciona (sube/baja suavemente)

**Google Maps**
- [ ] Iframe de mapa carga correctamente
- [ ] Lazy loading funciona (carga al scrollear)
- [ ] Mapa es interactivo (zoom, pan)
- [ ] Title attribute para accesibilidad

**Animaciones Scroll**
- [ ] Elementos .reveal aparecen al scrollear
- [ ] IntersectionObserver funciona
- [ ] Stagger delays funcionan en gallery
- [ ] Cards animan con delays progresivos
- [ ] Respeta prefers-reduced-motion
- [ ] No lag durante scroll

**Counters**
- [ ] Números animan cuando entran en viewport
- [ ] Easing suave (ease-out)
- [ ] Se detienen en número final correcto
- [ ] Solo animan una vez

### 5. Código Quality

**HTML Validation**
```bash
# Opción 1: Online
# Visitar https://validator.w3.org/
# Subir index.html

# Opción 2: CLI (si tienes Node)
npx html-validate index.html
```

**CSS Validation**
```bash
# Verificar que @import funciona
# Abrir DevTools → Network → filtrar por CSS
# Verificar que se cargan: 01-variables.css, 02-base.css, etc
```

**JavaScript**
```bash
# Verificar que ES6 modules cargan
# Abrir DevTools → Console
# No debe haber errores de "module not found"
# Verificar mensaje de bienvenida en consola
```

**Errores en Consola**
- [ ] Sin errores JavaScript
- [ ] Sin errores CSS
- [ ] Sin 404s de archivos faltantes
- [ ] Sin warnings críticos

### 6. SEO Verification

**Sitemap**
- [ ] `sitemap.xml` existe en raíz
- [ ] URL correcta: https://torrecorreos.vercel.app/
- [ ] Fecha lastmod actual
- [ ] XML válido (abrir en browser)

**Robots.txt**
- [ ] `robots.txt` existe en raíz
- [ ] Allow: / presente
- [ ] Sitemap URL correcto
- [ ] Accesible en https://torrecorreos.vercel.app/robots.txt

**Meta Tags**
- [ ] Title tag presente y descriptivo
- [ ] Meta description presente
- [ ] Open Graph tags presentes (og:title, og:description, og:image, og:url)
- [ ] Twitter Card tags presentes
- [ ] Manifest linked en <head>

**Manifest PWA**
- [ ] `manifest.json` existe
- [ ] JSON válido
- [ ] Icons array presente
- [ ] Theme color correcto (#b8965c)
- [ ] Background color correcto (#1a2744)

### 7. Accessibility (A11y)

**Keyboard Navigation**
- [ ] Tab navega por todos elementos interactivos
- [ ] Focus visible en todos elementos
- [ ] Skip links (si aplica)
- [ ] Modals son trap focus

**Screen Reader**
- [ ] Imágenes tienen alt text descriptivo
- [ ] Headings en orden correcto (h1 → h2 → h3)
- [ ] ARIA labels en botones sin texto
- [ ] Form labels asociados a inputs
- [ ] ARIA live regions para mensajes dinámicos

**Color Contrast**
- [ ] Texto cumple WCAG AA (4.5:1)
- [ ] Links visibles
- [ ] Botones tienen contraste suficiente

### 8. Configuración

**Verificar valores en js/config.js:**
- [ ] WhatsApp number: `5216641234567` (correcto)
- [ ] WhatsApp message: texto apropiado
- [ ] Cal.com link: `oscar-arredondo-fs6wzu/agenda-cita-torre-correos`
- [ ] Calendar timeout: 6000ms
- [ ] Tab rotate interval: 5000ms

### 9. Files & Structure

**Verificar estructura final:**
```
Torre Correos/
├── index.html ✅
├── README.md ✅
├── REFACTORIZACIÓN.md ✅
├── VERIFICACIÓN.md ✅ (este archivo)
├── sitemap.xml ✅
├── robots.txt ✅
├── manifest.json ✅
├── optimize-images.js ✅
├── styles/
│   ├── 01-variables.css ✅
│   ├── 02-base.css ✅
│   ├── 03-layout.css ✅
│   ├── 04-components.css ✅
│   ├── 05-sections.css ✅
│   ├── 06-animations.css ✅
│   └── main.css ✅
├── js/
│   ├── config.js ✅
│   ├── utils.js ✅
│   ├── header.js ✅
│   ├── gallery.js ✅
│   ├── amenities.js ✅
│   ├── form.js ✅
│   ├── animations.js ✅
│   └── main.js ✅
└── assets/
    ├── images/
    │   ├── gallery/ ✅ (9 archivos)
    │   ├── amenities/ ✅ (1 archivo)
    │   └── logos/ ✅ (1 archivo)
    └── videos/ ✅ (1 archivo)
```

### 10. Deploy Readiness

**Pre-Deploy Checklist:**
- [ ] Todas las rutas usan paths relativos
- [ ] No hay hardcoded localhost URLs
- [ ] Google Fonts cargan desde CDN
- [ ] Cal.com embed carga correctamente
- [ ] Imágenes existen en assets/
- [ ] ES6 modules funcionan (requiere servidor)

**Deploy a Vercel:**
```bash
# 1. Instalar Vercel CLI (si no lo tienes)
npm i -g vercel

# 2. Deploy
cd "c:\Users\Oscar\Desktop\Torre Correos"
vercel

# 3. Seguir prompts
# - Set up and deploy? Y
# - Which scope? (tu cuenta)
# - Link to existing project? N
# - What's your project's name? torre-correos
# - In which directory is your code located? ./
```

**Post-Deploy Verification:**
- [ ] Site carga en production URL
- [ ] HTTPS funciona
- [ ] Todas las rutas funcionan
- [ ] Assets cargan correctamente
- [ ] Meta tags se muestran en shares

## 📊 Resultados Esperados

| Métrica | Antes | Objetivo | Actual |
|---------|-------|----------|--------|
| CSS | 1 archivo (40 KB) | 6 módulos | ✅ |
| JS | 1 archivo (20 KB) | 8 módulos | ✅ |
| Imágenes | 8.4 MB | ~2.5 MB | ⏳ Pendiente |
| Lighthouse Performance | ~70 | 90+ | ⏳ Test |
| Lighthouse Accessibility | ~85 | 95+ | ⏳ Test |
| SEO | Básico | 100 | ✅ |
| Estructura | Desorganizada | Escalable | ✅ |

## ⚠️ Problemas Conocidos

1. **Imágenes sin optimizar** (8.4 MB)
   - Solución: Ejecutar `node optimize-images.js`
   - Impacto: Performance score bajo

2. **ES6 Modules requieren servidor**
   - No funciona con file://
   - Usar http-server, Live Server, o deploy

## ✅ Completar Verificación

Marca cada checkbox cuando verifiques el item.
Al finalizar, todo debería estar ✅ para deployment.
