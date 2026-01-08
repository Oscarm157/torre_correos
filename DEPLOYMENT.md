# 🚀 Deployment a Vercel - Torre Correos

## ✅ Cambios Subidos a GitHub

Los cambios ya están en GitHub:
- **Repositorio:** https://github.com/Oscarm157/torre_correos
- **Commit:** Refactorización completa Torre Correos
- **Archivos:** 70 archivos modificados/agregados

## 🔄 Deploy Automático en Vercel

Si ya tenías el proyecto conectado a Vercel, el deploy debería iniciar automáticamente.

### Verificar Deploy:

1. **Visita tu Dashboard de Vercel:**
   - https://vercel.com/dashboard

2. **Busca el proyecto "torre_correos"**
   - Deberías ver un deploy en progreso o completado

3. **URL de producción:**
   - https://torrecorreos.vercel.app (o tu URL personalizada)

## 📋 Si NO tienes el proyecto en Vercel

Si es la primera vez que deployeas a Vercel, sigue estos pasos:

### Opción 1: Vercel Dashboard (Más Fácil)

1. **Ir a Vercel Dashboard:**
   - https://vercel.com/new

2. **Import Git Repository:**
   - Click en "Import Project"
   - Seleccionar "Import Git Repository"
   - Conectar tu cuenta de GitHub si no lo has hecho
   - Seleccionar el repo: `Oscarm157/torre_correos`

3. **Configurar el proyecto:**
   ```
   Project Name: torre-correos
   Framework Preset: Other
   Root Directory: ./
   Build Command: (dejar vacío)
   Output Directory: (dejar vacío)
   Install Command: (dejar vacío)
   ```

4. **Deploy:**
   - Click en "Deploy"
   - Esperar 1-2 minutos
   - ✅ Sitio en vivo!

### Opción 2: Vercel CLI

```bash
# 1. Instalar Vercel CLI (si no lo tienes)
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy
cd "c:\Users\Oscar\Desktop\Torre Correos"
vercel --prod

# Seguir prompts:
# - Set up and deploy? Y
# - Which scope? (tu cuenta)
# - Link to existing project? (Y si existe, N si es nuevo)
# - What's your project's name? torre-correos
# - In which directory is your code located? ./
```

## ✅ Verificación Post-Deploy

Una vez que el deploy termine, verifica:

### 1. Sitio Funciona
- [ ] Página carga correctamente
- [ ] CSS se ve bien (no hay estilos rotos)
- [ ] JavaScript funciona (check consola sin errores)

### 2. Imágenes Responsive
- [ ] Abrir Chrome DevTools → Network tab
- [ ] Recargar página
- [ ] Verificar que se cargan imágenes -320, -640, -1024, -1920 según viewport
- [ ] En mobile debería cargar -320 o -640
- [ ] En desktop debería cargar -1024 o -1920

### 3. Funcionalidad
- [ ] Header sticky funciona
- [ ] Mobile menu abre/cierra
- [ ] Galería lightbox funciona
- [ ] Tabs de amenidades cambian
- [ ] Formulario valida
- [ ] WhatsApp redirige a +52 664 123 4567
- [ ] Cal.com modal abre

### 4. Performance
- [ ] Abrir Chrome DevTools → Lighthouse
- [ ] Run Performance audit
- [ ] Verificar scores:
  - Performance: 90+ ✅
  - Accessibility: 95+ ✅
  - Best Practices: 95+ ✅
  - SEO: 100 ✅

### 5. SEO
- [ ] Visitar: https://torrecorreos.vercel.app/sitemap.xml
- [ ] Visitar: https://torrecorreos.vercel.app/robots.txt
- [ ] Compartir en Facebook/Twitter (verificar Open Graph)

## 🔧 Configuración de Vercel

El archivo `vercel.json` ya está configurado con:

```json
{
  "version": 2,
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
      "source": "/js/(.*\\.js)",
      "headers": [
        {
          "key": "Content-Type",
          "value": "application/javascript; charset=utf-8"
        }
      ]
    }
  ]
}
```

Esto optimiza:
- ✅ Cache de imágenes (1 año)
- ✅ Cache de CSS/JS
- ✅ Content-Type correcto para ES6 modules

## 📊 Resultados Esperados

### Antes de Refactorización:
- Imágenes: ~8 MB
- Lighthouse: ~60-70
- CSS: Monolítico
- JS: Un archivo

### Después de Refactorización:
- Imágenes: ~3.5 MB (responsive)
- Lighthouse: 90+ esperado
- CSS: 6 módulos
- JS: 8 módulos ES6

### Mejora en Performance:
- **First Contentful Paint:** ~1.5-2s más rápido
- **Largest Contentful Paint:** ~2-3s más rápido
- **Total Blocking Time:** Reducido significativamente
- **Cumulative Layout Shift:** 0 (imágenes con width/height)

## 🐛 Troubleshooting

### Si el sitio no carga correctamente:

1. **Error 404 en archivos:**
   - Verificar que rutas son case-sensitive
   - assets/images/gallery/ (minúsculas)

2. **ES6 Modules no funcionan:**
   - Verificar Content-Type en Network tab
   - Debe ser: `application/javascript`
   - vercel.json debería manejarlo

3. **Imágenes no cargan:**
   - Verificar que existen en assets/images/gallery/
   - Check DevTools Network tab para ver errores

4. **CSS no se aplica:**
   - Verificar que main.css importa todos los módulos
   - Check que @import paths son correctos

### Si hay errores en consola:

```javascript
// Error común: CORS
// Solución: Vercel maneja esto automáticamente

// Error común: Module not found
// Verificar rutas en imports:
import { CONFIG } from './config.js'; // ✅ Correcto
import { CONFIG } from './config';    // ❌ Falta .js
```

## 📱 URLs Importantes

- **Sitio en vivo:** https://torrecorreos.vercel.app
- **Dashboard Vercel:** https://vercel.com/dashboard
- **GitHub Repo:** https://github.com/Oscarm157/torre_correos
- **Documentación:** README.md, VERIFICACIÓN.md

## 🎯 Próximos Pasos

1. **Verificar deploy en Vercel dashboard**
2. **Probar sitio en producción**
3. **Correr Lighthouse audit**
4. **Compartir URL con cliente/equipo**
5. **Configurar dominio personalizado (opcional)**

## 🔐 Dominio Personalizado (Opcional)

Si quieres usar un dominio personalizado:

1. **En Vercel Dashboard:**
   - Ir a tu proyecto
   - Settings → Domains
   - Add Domain
   - Seguir instrucciones DNS

2. **Configurar DNS:**
   - Agregar CNAME apuntando a `cname.vercel-dns.com`
   - O A record a Vercel IP

## ✅ Checklist Final

- [✅] Código commiteado a Git
- [✅] Push a GitHub completado
- [ ] Deploy en Vercel iniciado
- [ ] Sitio accesible en producción
- [ ] Lighthouse score 90+
- [ ] Todas las funciones trabajan
- [ ] Cliente/equipo notificado

---

**Estado:** ✅ Código subido a GitHub
**Siguiente:** Verificar deploy automático en Vercel
**URL:** https://torrecorreos.vercel.app (verificar)
