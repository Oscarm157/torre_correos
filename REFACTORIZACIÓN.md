# Guía de Refactorización - Torre Correos

Esta guía te ayudará a completar la refactorización del sitio web de Torre Correos.

## Estado Actual

- ✅ Plan de refactorización completado
- 🔄 Optimización de imágenes (requiere acción manual)
- ⏳ Pendiente: Modularización de código
- ⏳ Pendiente: Reorganización de estructura

---

## Sprint 1: Optimización de Imágenes (REQUIERE ACCIÓN)

### Opción A: Automatizada con Sharp (Recomendado)

**Pasos:**

1. **Instalar Node.js** (si no lo tienes):
   - Descargar de [nodejs.org](https://nodejs.org)
   - Versión LTS recomendada

2. **Instalar Sharp:**
   ```bash
   cd "c:\Users\Oscar\Desktop\Torre Correos"
   npm install sharp
   ```

3. **Ejecutar script de optimización:**
   ```bash
   node optimize-images.js
   ```

4. **Resultado:**
   - Se creará la carpeta `assets/images/gallery/`
   - Contendrá 28 imágenes optimizadas (4 tamaños de cada una)
   - Reducción estimada: 8.4 MB → ~2-3 MB (65% menos)

### Opción B: Manual con Squoosh.app

**Pasos:**

1. Visita [squoosh.app](https://squoosh.app)

2. Para cada imagen en la carpeta `imagenes/`:
   - Arrastra la imagen a Squoosh
   - Configura:
     - **Formato:** WebP
     - **Calidad:** 85
     - **Resize:** Crear 4 versiones con estos anchos:
       - 320px → guardar como `nombre-320.webp`
       - 640px → guardar como `nombre-640.webp`
       - 1024px → guardar como `nombre-1024.webp`
       - 1920px → guardar como `nombre-1920.webp`
   - Guardar cada versión en `assets/images/gallery/`

3. **Imágenes a procesar (7 archivos):**
   - `Torre+Correos+-+Facade.webp`
   - `torre_correos_ext_01.webp`
   - `torre_correos_ext_04.webp`
   - `torre_correos_int_01.webp`
   - `torre_correos_int_02.webp`
   - `torre_correos_int_04.webp`
   - `torre_correos_int_06.webp`

### Verificación

Después de optimizar las imágenes, verifica que existan estos archivos en `assets/images/gallery/`:

```
Torre+Correos+-+Facade-320.webp
Torre+Correos+-+Facade-640.webp
Torre+Correos+-+Facade-1024.webp
Torre+Correos+-+Facade-1920.webp

torre_correos_ext_01-320.webp
torre_correos_ext_01-640.webp
... (y así para cada imagen)
```

---

## Sprint 2-3: Continuación Automática

Una vez que las imágenes estén optimizadas, **avísame** y continuaré automáticamente con:

- ✅ Modularización de CSS (6 archivos)
- ✅ Modularización de JavaScript (8 módulos ES6)
- ✅ Configuración externalizada
- ✅ Reorganización de estructura
- ✅ Optimización HTML
- ✅ Archivos SEO

---

## Notas Importantes

### ¿Por qué necesito optimizar las imágenes manualmente?

La optimización de imágenes requiere procesamiento gráfico que no puedo hacer directamente. Sin embargo, he creado un script automatizado (`optimize-images.js`) que hace todo el trabajo por ti si tienes Node.js instalado.

### ¿Puedo continuar sin optimizar las imágenes?

Sí, pero perderás el **mayor impacto en performance** (reducción de 65% en peso de imágenes). Puedes hacerlo después, pero es altamente recomendado hacerlo primero.

### ¿Qué pasa si no tengo Node.js?

Usa la Opción B (Squoosh.app) que es una herramienta web gratuita sin instalación.

---

## Preguntas Frecuentes

**Q: ¿Cuánto tiempo toma optimizar las imágenes?**
- Con script automatizado: ~2-3 minutos
- Manual con Squoosh: ~15-20 minutos

**Q: ¿Se perderá calidad en las imágenes?**
- No perceptible. Usando calidad 85% mantienes excelente calidad visual con mucho menos peso.

**Q: ¿Las imágenes originales se borrarán?**
- No. Las originales permanecen en `imagenes/`. Las optimizadas van a `assets/images/gallery/`.

**Q: ¿Puedo ajustar la calidad?**
- Sí. En `optimize-images.js` cambia la línea `const QUALITY = 85;` al valor deseado (70-95).

---

## Progreso de Refactorización

- [⏳] Sprint 1: Optimización de Imágenes (ACCIÓN REQUERIDA)
- [ ] Sprint 2: Modularización de Código
- [ ] Sprint 3: Estructura y SEO
- [ ] Sprint 4: Verificación y Testing

**Siguiente paso:** Ejecuta la optimización de imágenes y avísame cuando esté lista.
