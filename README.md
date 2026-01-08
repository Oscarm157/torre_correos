# Torre Correos - Website Refactorizado

Sitio web premium para Torre Correos, un desarrollo de usos mixtos en Tijuana.

## ✅ Refactorización Completada

### Sprint 2: Modularización (✅ Completado)

**CSS Modularizado** (6 archivos)
```
styles/
├── 01-variables.css       Design tokens y custom properties
├── 02-base.css            Reset, typography, base styles
├── 03-layout.css          Header, footer, containers
├── 04-components.css      Botones, cards, forms, gallery
├── 05-sections.css        Hero, about, amenities, etc
├── 06-animations.css      Keyframes, transitions, effects
└── main.css               Orquestador (imports todos)
```

**JavaScript Modularizado** (8 módulos ES6)
```
js/
├── config.js              Configuración (WhatsApp: +52 664 123 4567)
├── utils.js               Funciones helper compartidas
├── header.js              Scroll effect + mobile menu
├── gallery.js             Lightbox + lazy loading
├── amenities.js           Tabs interactivos
├── form.js                Validación y envío
├── animations.js          Scroll reveal, counters, etc
└── main.js                Inicialización de todo
```

### Sprint 3: Optimización (✅ Completado)

**Estructura de Archivos Reorganizada**
```
Torre Correos/
├── index.html             HTML principal (optimizado)
├── styles/                CSS modularizado
├── js/                    JavaScript modularizado
├── assets/
│   ├── images/
│   │   ├── gallery/       Imágenes principales (16 archivos)
│   │   ├── amenities/     Fotos amenidades
│   │   └── logos/         Logo Torre Correos
│   └── videos/            Video home
├── docs/                  Documentación del proyecto
├── sitemap.xml            ✅ SEO
├── robots.txt             ✅ SEO
└── manifest.json          ✅ PWA básico
```

**Optimizaciones HTML**
- ✅ Meta tags Open Graph completos
- ✅ Twitter Card meta tags
- ✅ Google Fonts optimizado (una sola carga)
- ✅ Rutas actualizadas a nueva estructura
- ✅ WhatsApp configurado (+52 664 123 4567)
- ✅ Manifest PWA enlazado
- ✅ Script type="module" para ES6

## 🚀 Cómo Usar

### Opción 1: Servidor Local (Requerido para ES6 modules)

**Python:**
```bash
cd "c:\Users\Oscar\Desktop\Torre Correos"
python -m http.server 3000
```

**Node.js:**
```bash
cd "c:\Users\Oscar\Desktop\Torre Correos"
npx http-server . -p 3000 -c-1
```

**VS Code:**
1. Instalar extensión "Live Server"
2. Click derecho en index.html → "Open with Live Server"

### Opción 2: Deployment a Vercel

El sitio está listo para deployar directamente:
```bash
vercel
```

## 📊 Mejoras Logradas

### Performance
- ✅ CSS modularizado (mejor mantenibilidad)
- ✅ JavaScript en módulos ES6 (mejor debugging)
- ✅ Configuración externalizada
- ⏳ Optimización de imágenes (pendiente - ver abajo)

### SEO
- ✅ sitemap.xml creado
- ✅ robots.txt creado
- ✅ Meta tags Open Graph
- ✅ Twitter Cards
- ✅ PWA Manifest

### Developer Experience
- ✅ Código organizado por responsabilidad
- ✅ Fácil localizar y editar archivos
- ✅ Configuración centralizada en config.js
- ✅ Estructura escalable

## ⚠️ Pendiente: Optimización de Imágenes

Las imágenes aún no están optimizadas (8.4 MB total). Para optimizarlas:

### Opción A: Automatizada (Recomendado)
```bash
npm install sharp
node optimize-images.js
```

### Opción B: Manual
1. Visita [squoosh.app](https://squoosh.app)
2. Sigue instrucciones en [REFACTORIZACIÓN.md](REFACTORIZACIÓN.md)

**Resultado esperado:** 8.4 MB → ~2-3 MB (65% reducción)

## 🛠️ Configuración

### WhatsApp
Configurado en `js/config.js`:
```javascript
whatsapp: {
  number: '5216641234567', // +52 664 123 4567
  message: 'Hola, me interesa obtener más información sobre Torre Correos'
}
```

### Cal.com
Configurado en `js/config.js`:
```javascript
calendar: {
  link: 'oscar-arredondo-fs6wzu/agenda-cita-torre-correos',
  namespace: 'agenda-cita-torre-correos',
  timeout: 6000
}
```

## 📝 Archivos Principales

| Archivo | Descripción | Estado |
|---------|-------------|--------|
| `index.html` | HTML principal | ✅ Optimizado |
| `styles/main.css` | CSS entry point | ✅ Modular |
| `js/main.js` | JS entry point | ✅ Modular |
| `js/config.js` | Configuración | ✅ Externalizado |
| `sitemap.xml` | SEO sitemap | ✅ Creado |
| `robots.txt` | SEO robots | ✅ Creado |
| `manifest.json` | PWA manifest | ✅ Creado |

## 🎯 Próximos Pasos

1. **Optimizar imágenes** (ver sección arriba)
2. **Testing completo** en todos los navegadores
3. **Deploy a producción**
4. **Agregar nuevas secciones** (ahora es fácil gracias a estructura modular)

## 📚 Documentación

- **Plan completo**: `C:\Users\Oscar\.claude\plans\woolly-singing-mango.md`
- **Guía de implementación**: [REFACTORIZACIÓN.md](REFACTORIZACIÓN.md)

## 🌐 Deployment

Compatible con:
- Vercel (recomendado)
- Netlify
- GitHub Pages
- Cualquier hosting estático

No requiere build process - deploy directo de archivos.

---

**Desarrollado por**: Probien Bienes Exclusivos
**Refactorizado**: 2026-01-08
**Framework**: Vanilla HTML/CSS/JS (Sin dependencias)
