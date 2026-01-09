# 🚀 Guía de Deployment en Vercel - Torre Correos

## ✅ Problema Resuelto

**Error original:**
```
If rewrites, redirects, headers, cleanUrls or trailingSlash are used,
then routes cannot be present.
```

**Causa:** El archivo `vercel.json` tenía configuraciones incompatibles:
- `"rewrites"` + `"headers"` en el mismo archivo ❌
- `"builds"` innecesario para sitios estáticos ❌
- JSON corrupto en el remoto (otra IA lo modificó mal) ❌

## 🛠️ Solución Implementada

### Nueva Configuración `vercel.json`

```json
{
  "headers": [
    {
      "source": "/assets/images/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/styles/(.*\\.css)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/js/(.*\\.js)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/index.html",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        }
      ]
    }
  ],
  "cleanUrls": true,
  "trailingSlash": false
}
```

### ¿Qué hace cada parte?

1. **`headers` - Cache Optimization**
   - **Imágenes** (`/assets/images/`): Cache por 1 año (inmutable)
   - **CSS** (`/styles/`): Cache por 1 año (inmutable)
   - **JavaScript** (`/js/`): Cache por 1 año (inmutable)
   - **HTML** (`/index.html`): No cache, siempre revalidar (para actualizaciones inmediatas)

2. **`cleanUrls: true`**
   - `/about.html` → `/about`
   - `/contact.html` → `/contact`
   - URLs más limpias y profesionales

3. **`trailingSlash: false`**
   - `/about/` → `/about`
   - Previene URLs duplicadas para SEO

### ¿Por qué funciona ahora?

**Antes (❌ INCORRECTO):**
```json
{
  "version": 2,
  "builds": [...],       // Innecesario para sitios estáticos
  "rewrites": [...],     // ⚠️ CONFLICTO con headers
  "headers": [...]       // ⚠️ CONFLICTO con rewrites
}
```

**Ahora (✅ CORRECTO):**
```json
{
  "headers": [...],      // Solo headers - compatible
  "cleanUrls": true,     // Compatible con headers
  "trailingSlash": false // Compatible con headers
}
```

## 📊 Beneficios de la Nueva Configuración

### Performance
- ⚡ **Imágenes cacheadas por 1 año** → Carga instantánea en visitas repetidas
- ⚡ **CSS/JS cacheados por 1 año** → Sin re-descargas innecesarias
- ⚡ **HTML sin cache** → Actualizaciones inmediatas sin esperar

### SEO
- 🔍 **URLs limpias** → Mejor indexación en buscadores
- 🔍 **Sin trailing slashes** → Evita contenido duplicado
- 🔍 **Cache headers correctos** → Mejor Core Web Vitals

### Developer Experience
- 🚀 **Deploy automático** → Push a GitHub = Deploy en Vercel
- 🚀 **Sin build process** → ES6 modules nativos
- 🚀 **Configuración simple** → Solo lo necesario

## 🎯 Próximos Pasos para Deploy

### 1. Verificar que GitHub tiene el código correcto

```bash
# Ver último commit
git log -1

# Debería mostrar:
# commit 9033b9c...
# Merge: Usar versión limpia de vercel.json sin conflictos
```

### 2. Opciones de Deploy en Vercel

#### Opción A: Deploy Automático (Recomendado)
Vercel detectará el push automáticamente y deployará en ~1-2 minutos.

1. Ir a: https://vercel.com/dashboard
2. Seleccionar proyecto "torre_correos"
3. Ver pestaña "Deployments"
4. Esperar deployment automático

#### Opción B: Deploy Manual Forzado
Si el deploy automático no inicia:

1. En Vercel Dashboard → "torre_correos"
2. Pestaña "Deployments"
3. Click en "..." del último deployment
4. Click "Redeploy"
5. **Importante:** Desmarcar "Use existing Build Cache"
6. Click "Redeploy"

#### Opción C: Reimportar Proyecto (Si las anteriores fallan)
Si Vercel sigue mostrando el error:

1. **Eliminar proyecto en Vercel:**
   - Settings → General → Scroll abajo
   - "Delete Project" → Confirmar

2. **Reimportar desde GitHub:**
   - https://vercel.com/new
   - "Import Git Repository"
   - Seleccionar: `Oscarm157/torre_correos`
   - Click "Import"
   - **Configuración:**
     - Framework Preset: Other
     - Root Directory: `./`
     - Build Command: (dejar vacío)
     - Output Directory: `./`
   - Click "Deploy"

### 3. Verificar Deploy Exitoso

Una vez que Vercel termine el deploy:

```bash
# Verificar que el HTML es correcto
curl https://torrecorreos.vercel.app | grep "assets/images/gallery"

# Debería mostrar rutas como:
# src="assets/images/gallery/torre_correos_ext_04-1024.webp"
```

#### Verificación Visual:

1. **Abrir:** https://torrecorreos.vercel.app
2. **DevTools:** F12 → Network tab
3. **Recargar:** Ctrl+Shift+R (hard reload)
4. **Verificar imágenes:**
   - ✅ Cargan desde `assets/images/gallery/`
   - ✅ Tamaños correctos (~41-203 KB)
   - ✅ NO cargan desde `imagenes/` (carpeta eliminada)

#### Verificación Lighthouse:

```bash
# Chrome DevTools
F12 → Lighthouse → Performance → Analyze

# O con CLI
npx lighthouse https://torrecorreos.vercel.app --view
```

**Esperado:**
- Performance: 90+ ✅
- "Properly size images": Passed ✅
- "Serve images in next-gen formats": Passed ✅
- Total de imágenes: ~2-3 MB (no 9.3 MB) ✅

## 🔍 Troubleshooting

### Error: "routes cannot be present"
**Solución:** Ya resuelto en este commit. Si aparece de nuevo, verificar que `vercel.json` no tenga `"routes"`, `"rewrites"`, o `"builds"`.

### Error: "Invalid configuration"
**Solución:** Validar JSON en https://jsonlint.com/

### Imágenes siguen cargando desde `imagenes/`
**Solución:**
1. Hard refresh: Ctrl+Shift+F5
2. Limpiar cache de Vercel (redeploy sin cache)
3. Verificar que GitHub tenga el HTML correcto

### Deploy no inicia automáticamente
**Solución:**
1. Verificar Vercel Dashboard → Settings → Git
2. Confirmar que el repo está conectado
3. Verificar que "Production Branch" es `main`

## 📝 Referencia de Cambios

### Commits Relevantes:
```bash
# Fix del archivo vercel.json
git log --oneline --grep="vercel.json"

c821993 Fix: Simplificar vercel.json para compatibilidad con headers
9033b9c Merge: Usar versión limpia de vercel.json sin conflictos
```

### Archivos Modificados:
- ✏️ `vercel.json` - Configuración corregida
- 📄 `DEPLOYMENT.md` - Esta guía

## 🎯 Estado Final

**Configuración:**
- ✅ vercel.json simplificado y compatible
- ✅ Sin conflictos de rewrites/headers
- ✅ Cache headers optimizados
- ✅ Pushed a GitHub

**Próximo Paso:**
- ⏳ Esperar deploy automático de Vercel (~1-2 min)
- ✅ Verificar en https://torrecorreos.vercel.app
- ✅ Confirmar Lighthouse Performance 90+

---

## 📚 Fuentes y Referencias

- [Project Configuration - Vercel Docs](https://vercel.com/docs/project-configuration)
- [Headers - Vercel Docs](https://vercel.com/docs/headers)
- [Rewrites on Vercel](https://vercel.com/docs/rewrites)
- [Mastering vercel.json Guide](https://peerlist.io/mahmudrahman/articles/mastering-verceljson-a-beginnerfriendly-guide-to-vercel-conf)

**Estado:** ✅ PROYECTO RESCATADO - Listo para deploy

**Última actualización:** 2026-01-08
