# 🔧 Instrucciones para Forzar Redeploy Limpio en Vercel

## ⚠️ Problema Detectado

Vercel está sirviendo una versión cacheada antigua que:
- ✅ HTML local correcto (usa `assets/`)
- ❌ HTML en Vercel cacheado (usa `imagenes/` viejas)

Lighthouse muestra:
```
❌ /imagenes/torre_correos_int_06.webp (3.3 MB)
   Debería ser:
✅ /assets/images/gallery/torre_correos_int_06-1024.webp (41 KB)
```

## 🚀 Solución: Redeploy Manual en Vercel

### Opción 1: Dashboard de Vercel (MÁS FÁCIL)

1. **Ir a Vercel Dashboard:**
   - https://vercel.com/dashboard

2. **Seleccionar proyecto "torre_correos"**

3. **Ir a la pestaña "Deployments"**

4. **Click en los 3 puntos (...) del último deployment**

5. **Seleccionar "Redeploy"**
   - Marcar la opción: **"Use existing Build Cache"** → ❌ **DESMARCAR ESTO**
   - Debe decir: "Rebuild from source"

6. **Click "Redeploy"**

7. **Esperar 2-3 minutos**

8. **Verificar:**
   - Visitar: https://torrecorreos.vercel.app
   - Abrir DevTools → Network
   - Recargar página
   - Verificar que imágenes cargan desde `assets/images/gallery/`

### Opción 2: Vercel CLI

```bash
# Instalar Vercel CLI si no lo tienes
npm i -g vercel

# Login
vercel login

# Ir al proyecto
cd "c:\Users\Oscar\Desktop\Torre Correos"

# Forzar redeploy limpio (sin cache)
vercel --prod --force
```

Esto fuerza un rebuild completo sin usar cache.

### Opción 3: Eliminar y Recrear Deployment

Si las opciones anteriores no funcionan:

1. **En Vercel Dashboard:**
   - Settings → General
   - Scroll hasta abajo
   - "Delete Project"
   - Confirmar

2. **Volver a importar:**
   - https://vercel.com/new
   - Import Git Repository
   - Seleccionar: `Oscarm157/torre_correos`
   - Deploy

⚠️ **NOTA:** Esto cambiará la URL si no tienes dominio personalizado.

## ✅ Verificación Después del Redeploy

### 1. Verificar que el HTML es correcto:

```bash
# Ver el HTML que Vercel está sirviendo
curl https://torrecorreos.vercel.app | grep "torre_correos_int_06"
```

Debería mostrar:
```html
src="assets/images/gallery/torre_correos_int_06-1024.webp"
```

**NO debería mostrar:**
```html
src="imagenes/torre_correos_int_06.webp"  ❌
```

### 2. Verificar en Chrome DevTools:

1. Abrir: https://torrecorreos.vercel.app
2. F12 → Network tab
3. Filter: "img"
4. Recargar página (Ctrl+Shift+R para hard reload)

**Deberías ver:**
```
✅ torre_correos_int_06-320.webp  (8 KB)   - mobile
✅ torre_correos_int_06-640.webp  (23 KB)  - tablet
✅ torre_correos_int_06-1024.webp (41 KB)  - desktop
```

**NO deberías ver:**
```
❌ torre_correos_int_06.webp (3.3 MB)
```

### 3. Correr Lighthouse:

```bash
# Chrome DevTools
F12 → Lighthouse → Performance → Analyze

# O con CLI
npx lighthouse https://torrecorreos.vercel.app --view
```

**Debería dar:**
- Performance: 90-95+ ✅
- "Properly size images": ✅ Passed
- "Serve images in next-gen formats": ✅ Passed
- No warnings sobre imágenes de 3.3 MB

## 🔍 Por Qué Pasó Esto

1. **Primer deploy:** Tenía carpetas `imagenes/` con originales
2. **Commits siguientes:** Eliminamos `imagenes/` pero Vercel cache no se limpió
3. **HTML en cache:** Vercel sirvió HTML antiguo que apunta a `imagenes/`
4. **404 silencioso:** O sirve archivos viejos del cache

## ✅ Archivos Agregados para Prevenir Esto

1. **`.vercelignore`:**
   ```
   imagenes/
   amenidades/
   info-proyecto/
   ```
   Asegura que Vercel ignore estas carpetas (ya eliminadas)

2. **Timestamp en HTML:**
   ```html
   <!-- Build: 2026-01-08 12:10 - Ultra-optimized images -->
   ```
   Invalida cache de HTML

3. **Commit de force:**
   Para que Vercel detecte cambio y rebuild

## 📊 Resultados Esperados

### Antes (Cache Antiguo):
```
Performance: 60-70
Imágenes: 7.8 MB
torre_correos_int_06.webp: 3.3 MB ❌
```

### Después (Redeploy Limpio):
```
Performance: 90-95+
Imágenes: ~2 MB total
torre_correos_int_06-1024.webp: 41 KB ✅
```

## 🎯 Próximos Pasos

1. **AHORA:** Hacer redeploy manual (Opción 1 recomendada)
2. **Esperar:** 2-3 minutos
3. **Verificar:** DevTools + Lighthouse
4. **Confirmar:** Performance 90+

---

**Estado Actual:**
- ✅ Código correcto en GitHub
- ✅ Push completado
- ⏳ Esperando redeploy manual en Vercel
- 🎯 Objetivo: Limpiar cache y servir versión optimizada
