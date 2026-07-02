# Torre Correos — Reconstrucción a Next.js (Fase 1)

## Objetivo
Reconstruir torre_correos (hoy HTML/CSS/JS vanilla, sin build) sobre el starter de plomería (`Oscarm157/starter`) en Next.js, integrando directo el copy y features del PDF de retro que ya recibió Oscar — sin parchar primero el sitio viejo, para no rehacer el copy dos veces. Incluye animaciones a la altura de Grupo Orve (nivel de motion, no su paleta) y persistencia de leads en base de datos. Resultado esperado: sitio en producción listo para servir de base a Fase 2 (CRM portado de ADAF).

## Alcance

**Sí:**
- Migración completa de `index.html` a Next.js App Router sobre el starter (auth, Drizzle+Neon, Zod, seguridad, estados loading/empty/error, CI ya vienen del starter — no se recablea plomería).
- Las 9 secciones actuales portadas: Header/nav, Hero, Propuesta de valor, Sobre el Proyecto, Galería, Agenda (Cal.com), Amenidades, Ubicación, Contacto, Footer.
- Copy del PDF integrado directo (hero, value card "Bienestar Integral", "Sobre el Proyecto" reescrito, línea nueva en contacto) — detalle exacto en `/root/.claude/plans/entra-a-la-repo-dynamic-robin.md`.
- Nav ampliado con "Comunidad" y "Avance de Obra" como secciones mínimas ancladas, sin copy ni fotos inventadas.
- Amenidades reemplazada por álbum de categorías (Residencias / Penthouses / Áreas de confort / Corporativos / Comercio), reusando el patrón de tabs que ya existe (`js/amenities.js` como referencia de comportamiento, no de código — se reimplementa en React).
- Animaciones con Motion, research-first vía `refero-design` + `design-taste-frontend`, mismo nivel de cuidado que Grupo Orve.
- Formulario de contacto persiste leads en DB (Neon/Drizzle del starter) vía server action con guard de auth donde aplique + validación Zod + anti-abuso básico.
- Fix del link de Cal.com roto (en cuanto Oscar lo mande — cambio de una línea de config).
- `DESIGN.md` del proyecto con el reference lock de Refero.

**No (fuera de esta fase):**
- CRM (Fase 2, portado de ADAF, versionado a Torre Correos). Se especifica aparte cuando arranque esa fase — antes de tocar código ahí, explorar el repo real de ADAF (no asumir desde memoria) para saber qué se porta.
- Inventario de unidades/propiedades administrable vía CMS — no aplica, el sitio es una landing. El álbum de Amenidades por categorías es contenido estático (igual que los tabs actuales), no un data model editable.
- Contenido real de "Comunidad" y "Avance de Obra" (copy/fotos) — se agrega cuando Oscar lo mande.
- Fotos por categoría del álbum de Amenidades — pendientes de Oscar.
- Foto de "asesoras" en la sección de agenda — pendiente de Oscar.
- Texto completo de las 2 anotaciones del PDF que quedaron cortadas (cards "Bienestar Integral" / "Conectividad Estratégica") — pendiente de Oscar.

## Criterios de aceptación
- [ ] Sitio corre en Next.js sobre el starter; preview deploy en Vercel desde la rama `rebuild-nextjs`.
- [ ] Las 9 secciones actuales existen en el nuevo sitio con paridad de contenido salvo los cambios explícitos del PDF.
- [ ] Hero, value card "Bienestar Integral", "Sobre el Proyecto" y "Contacto" reflejan el copy nuevo exacto documentado en el plan.
- [ ] Nav incluye "Comunidad" y "Avance de Obra" con secciones ancladas mínimas (sin copy inventado).
- [ ] Amenidades muestra las 5 categorías nuevas en vez de las amenidades puntuales actuales, con placeholder honesto donde falte foto real (no stock genérico).
- [ ] Enviar el formulario de contacto crea un registro verificable en la tabla de leads en Neon.
- [ ] Animaciones corren sin jank perceptible en mobile y desktop, verificado con preview/captura real (no descripción).
- [ ] `DESIGN.md` documenta el reference lock de Refero usado.
- [ ] No quedan referencias a `styles.css`/`script.js` huérfanos del sitio viejo ni al stock de Unsplash sin flag explícito.

## Riesgos / decisiones abiertas
- Fase 2 (CRM portado de ADAF): pendiente explorar el código real de ADAF antes de especificarla — no asumir su estructura desde memoria.
- Cal.com: link correcto llega mañana; no bloquea el resto del build.
- 6 pendientes de contenido real de Oscar (ver plan) bloquean el 100% de "listo" pero no bloquean empezar a construir.
