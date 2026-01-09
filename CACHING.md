# 📦 Estrategia de Caching - Torre Correos

## ✅ Problema Resuelto

**Pregunta:** ¿Cómo evitar que el usuario descargue el video (16 MB) en cada visita?

**Respuesta:** Configurar headers de cache en Vercel para que el navegador lo guarde localmente.

---

## 🎯 Cómo Funciona el Caching

### Primera Visita del Usuario

```
Usuario → Vercel CDN → Descarga Video (16 MB)
                    ↓
            Guarda en cache del navegador
```

**Tiempo:** ~2-10 segundos (depende de conexión)
**Datos descargados:** 16 MB

### Segunda Visita (Mismo Usuario)

```
Usuario → Cache del navegador → Video cargado ✅
```

**Tiempo:** Instantáneo (0 ms)
**Datos descargados:** 0 MB

---

## 📊 Configuración Implementada

### vercel.json

```json
{
  "headers": [
    {
      "source": "/assets/videos/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### ¿Qué significa cada parte?

| Parámetro | Significado | Beneficio |
|-----------|-------------|-----------|
| **`public`** | Cualquiera puede cachear (navegador, CDN, proxies) | Máxima distribución |
| **`max-age=31536000`** | Cachear por 31,536,000 segundos = **1 año** | Usuario no descarga de nuevo |
| **`immutable`** | El archivo nunca cambia (no verificar versión) | Ahorra requests HTTP |

---

## 🚀 Estrategia Completa de Cache

### Resumen de Configuración

| Tipo de Archivo | Cache | Duración | Razón |
|-----------------|-------|----------|-------|
| **Videos** (`.mp4`) | ✅ Sí | 1 año | Archivos grandes, rara vez cambian |
| **Imágenes** (`.webp`, `.jpg`) | ✅ Sí | 1 año | Archivos grandes, rara vez cambian |
| **CSS** (`.css`) | ✅ Sí | 1 año | Cambia solo en deploys |
| **JavaScript** (`.js`) | ✅ Sí | 1 año | Cambia solo en deploys |
| **HTML** (`index.html`) | ❌ No | 0 segundos | Debe actualizarse siempre |

### Flujo Completo

```
Primera Visita:
┌─────────────────────────────────────────────┐
│ index.html (0 cache)      → 29 KB           │
│ styles/main.css (1 año)   → 40 KB           │
│ js/main.js (1 año)        → 20 KB           │
│ Video_hero_correos.mp4    → 16 MB           │
│ Imágenes optimizadas      → 2-3 MB          │
├─────────────────────────────────────────────┤
│ TOTAL PRIMERA VISITA: ~18-19 MB             │
└─────────────────────────────────────────────┘

Segunda Visita (mismo día/semana/mes):
┌─────────────────────────────────────────────┐
│ index.html (revalidar)    → 29 KB           │
│ styles/main.css (cache)   → 0 KB ✅         │
│ js/main.js (cache)        → 0 KB ✅         │
│ Video_hero_correos.mp4    → 0 KB ✅         │
│ Imágenes (cache)          → 0 KB ✅         │
├─────────────────────────────────────────────┤
│ TOTAL SEGUNDA VISITA: ~29 KB (99.8% menos)  │
└─────────────────────────────────────────────┘
```

---

## 🔍 Verificar que el Cache Funciona

### Método 1: Chrome DevTools

1. **Primera visita:**
   ```
   F12 → Network → Recargar página
   ```
   - Video: `Status: 200` (descarga completa)
   - Size: `16 MB`
   - Time: ~2-10s

2. **Segunda visita (recargar página):**
   ```
   Ctrl + R (recargar normal)
   ```
   - Video: `Status: 200` o `304 Not Modified`
   - Size: `(from disk cache)` ✅
   - Time: ~0ms

3. **Hard reload (borrar cache):**
   ```
   Ctrl + Shift + R (hard reload)
   ```
   - Vuelve a descargar todo

### Método 2: Inspeccionar Headers

```bash
# Verificar headers de cache en producción
curl -I https://torrecorreos.vercel.app/assets/videos/Video_hero_correos.mp4

# Deberías ver:
# Cache-Control: public, max-age=31536000, immutable
```

**Resultado esperado:**
```http
HTTP/2 200
cache-control: public, max-age=31536000, immutable
content-type: video/mp4
content-length: 16777216
x-vercel-cache: HIT
```

---

## 🎯 Mejores Prácticas

### ✅ LO QUE ESTAMOS HACIENDO BIEN

1. **Cache largo para assets estáticos**
   - Videos, imágenes, CSS, JS → 1 año
   - Reduce costos de Vercel
   - Mejora experiencia del usuario

2. **HTML sin cache**
   - index.html → siempre revalidar
   - Permite actualizar contenido inmediatamente
   - Usuario siempre ve la versión más reciente

3. **`immutable` flag**
   - Navegador confía 100% en el cache
   - No hace request "If-Modified-Since"
   - Ahorra ancho de banda

### 🚨 IMPORTANTE: Si cambias el video

Si subes un nuevo video con **el mismo nombre**:

**Problema:**
```
Usuario tiene Video_hero_correos.mp4 cacheado
↓
Subes nueva versión con mismo nombre
↓
Usuario NO verá el nuevo video (tiene cache de 1 año)
```

**Solución 1: Cambiar nombre del archivo**
```html
<!-- Antes -->
<source src="assets/videos/Video_hero_correos.mp4">

<!-- Después (nuevo video) -->
<source src="assets/videos/Video_hero_correos_v2.mp4">
```

**Solución 2: Cache busting con query params**
```html
<!-- Agregar timestamp o versión -->
<source src="assets/videos/Video_hero_correos.mp4?v=2">
```

**Solución 3: Hard refresh manual**
```
Pedir a usuarios: Ctrl + Shift + R
(No recomendado - no puedes controlar a todos)
```

---

## 📊 Comparativa: Con Cache vs Sin Cache

### Sin Cache (Configuración Antigua)

```
Primera visita:  18 MB descargados
Segunda visita:  18 MB descargados ❌
Tercera visita:  18 MB descargados ❌
Décima visita:   18 MB descargados ❌

Total: 180 MB en 10 visitas
```

### Con Cache (Configuración Nueva) ✅

```
Primera visita:  18 MB descargados
Segunda visita:  29 KB descargados ✅
Tercera visita:  29 KB descargados ✅
Décima visita:   29 KB descargados ✅

Total: 18.26 MB en 10 visitas (90% ahorro)
```

---

## 🌐 Cache en Diferentes Niveles

### Vercel CDN Edge Cache

Vercel ya cachea automáticamente en sus servidores edge:
- ✅ Distribución global (120+ ubicaciones)
- ✅ Usuario descarga desde servidor más cercano
- ✅ Primera visita ya es rápida (~2-3s en 4G)

**Ejemplo:**
```
Usuario en México → Edge de Querétaro → ~50ms latencia
Usuario en USA    → Edge de San Francisco → ~30ms latencia
Usuario en España → Edge de Madrid → ~40ms latencia
```

### Browser Cache (Navegador)

Con nuestra configuración:
- ✅ Video se guarda en disco local del usuario
- ✅ Válido por 1 año
- ✅ Sobrevive al cerrar navegador
- ✅ Compartido entre pestañas

### Service Worker (Futuro - Opcional)

Para PWA más avanzada:
```javascript
// Opcional: pre-cachear video con Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('torre-correos-v1').then((cache) => {
      return cache.addAll([
        '/assets/videos/Video_hero_correos.mp4'
      ]);
    })
  );
});
```

**Beneficio:** Video descargado en background, listo antes de visitar página

---

## 🔧 Troubleshooting

### "El video se descarga cada vez que recargo"

**Causa:** Cache no está funcionando

**Verificar:**
1. Esperar deploy de Vercel (~2 min después del push)
2. Hacer hard refresh una vez: `Ctrl + Shift + R`
3. Verificar headers:
   ```bash
   curl -I https://torrecorreos.vercel.app/assets/videos/Video_hero_correos.mp4
   ```
4. Debe mostrar: `cache-control: public, max-age=31536000, immutable`

### "Subí nuevo video pero usuarios ven el antiguo"

**Causa:** Cache de 1 año en navegadores

**Solución:**
```html
<!-- Cambiar nombre del archivo -->
<source src="assets/videos/Video_hero_correos_v2.mp4">
```

O agregar versión:
```html
<source src="assets/videos/Video_hero_correos.mp4?v=2">
```

### "¿El cache afecta el performance score de Lighthouse?"

**Respuesta:** ¡No! Lighthouse mide la **primera carga** (sin cache).

El cache ayuda en visitas repetidas, que **no** afectan el score de Lighthouse pero **sí** mejoran:
- Core Web Vitals reales (Field Data)
- Experiencia de usuario recurrente
- Costos de ancho de banda

---

## 📈 Métricas Esperadas

### Primera Visita (Sin Cache)

**Conexión 4G (10 Mbps):**
```
Video (16 MB):        ~12-15 segundos
Imágenes (2.5 MB):    ~2-3 segundos
CSS/JS (60 KB):       ~50-100ms
Total FCP:            ~1.5-2 segundos ✅
Total LCP:            ~3-4 segundos ✅
```

**Conexión WiFi (50 Mbps):**
```
Video (16 MB):        ~2-3 segundos
Imágenes (2.5 MB):    ~400-500ms
CSS/JS (60 KB):       ~10-20ms
Total FCP:            ~800ms ✅
Total LCP:            ~1.5 segundos ✅
```

### Segunda Visita (Con Cache)

**Cualquier Conexión:**
```
HTML (29 KB):         ~50-100ms
Video (cache):        0ms ✅
Imágenes (cache):     0ms ✅
CSS/JS (cache):       0ms ✅
Total FCP:            ~200-300ms ✅ (instant)
Total LCP:            ~500ms ✅ (instant)
```

---

## 🎯 Resumen

### Estado Actual ✅

| Característica | Estado | Beneficio |
|----------------|--------|-----------|
| Cache de videos | ✅ Configurado | Usuario descarga 1 vez |
| Cache de imágenes | ✅ Configurado | Carga instantánea en visitas |
| Cache de CSS/JS | ✅ Configurado | Estilos/funcionalidad instant |
| HTML sin cache | ✅ Configurado | Actualizaciones inmediatas |
| Vercel CDN | ✅ Automático | Distribución global rápida |

### Próximos Pasos (Opcional)

1. **Comprimir video** - Reducir de 16 MB a 8-10 MB
2. **Lazy loading** - Cargar video solo cuando sea visible
3. **Multiple sources** - Ofrecer calidades (low/medium/high)
4. **Service Worker** - Pre-cache agresivo para PWA

---

## 📚 Referencias

- [HTTP Caching - MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching)
- [Cache-Control Header - Vercel](https://vercel.com/docs/headers)
- [Immutable Cache - Google](https://developer.chrome.com/docs/lighthouse/performance/uses-long-cache-ttl/)

**Última actualización:** 2026-01-08
