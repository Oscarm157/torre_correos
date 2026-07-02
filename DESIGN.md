# DESIGN.md — dirección visual del proyecto

Este archivo congela la dirección de diseño para que el agente sea consistente en todas las
pantallas. Rebuild de un sitio con identidad ya establecida — el research de Refero es para
el NIVEL DE EJECUCIÓN DE MOTION/PROFUNDIDAD (pedido explícito: "más animaciones, así como en
Grupo Orve"), no para reemplazar la paleta ni la tipografía, que ya son de marca real.

## Reference lock (de Refero)
- **Referencia primaria: Aker** (akercompanies.com) — descrita por Refero como "sophisticated
  real-estate/investment brand with a lifestyle edge". Hero cinematográfico full-bleed
  (foto/video), cards flotantes translúcidas sobre la imagen (`rgba(0,0,0,0.5-0.6)`, radius 8px),
  secciones alternando full-bleed/contenido, acento cromático único usado con disciplina.
  Motion philosophy documentada: transiciones 0.2-0.35s, easing `cubic-bezier(0.165,0.84,0.44,1)`,
  animan opacity/radius/color/transform — nada de rebote ni exceso.
- **Detalles prestados:**
  1. De **Aspelin Reitan** (aspelineiendom.no, inmobiliaria): acento dorado usado EXCLUSIVO para
     texto interactivo/labels sobre foto arquitectónica oscura, botones outline (borde cromático,
     fondo transparente) en vez de rellenos — encaja directo con nuestro dorado de marca.
  2. De **Liron Moran Interiors**: headline serif oversized recortado/superpuesto contra la
     imagen (efecto "cutout") para que el hero se sienta monumental, no un título chico flotando.
- **Rechazado:** paleta acromática de Liron Moran (nosotros SÍ tenemos acento dorado funcional),
  canvas crema como base de Aspelin Reitan (nuestro hero es oscuro, el crema solo aparece en
  bandas claras alternadas, ver Layout).

## Tema y atmósfera
Editorial oscuro con respiros claros — inmobiliaria premium seria, no "vende humos". Sensación:
un desarrollo con historia real (junto al edificio histórico de correos de Tijuana) contado con
seriedad de marca, no con genérico real-estate-SaaS.

## Paleta (roles semánticos, no solo hex) — tokens reales de marca, se mantienen
- Fondo / superficies: `#1a2744` (navy primario, hero/secciones dark) · `#0f1729` (navy oscuro,
  bandas más profundas) · `#f5f3ef` (crema, bandas claras alternadas) · `#ffffff`
- Texto: `#333333` fuerte sobre crema · blanco/`#f5f3ef` fuerte sobre navy · `#666666` suave ·
  `#999999` tenue
- Acento (dorado, disciplina Aspelin Reitan — SOLO interactivo/label, nunca decorativo de fondo):
  `#b8965c` acento base · `#d4b87a` acento claro (hover/highlight) · `#9a7a48` acento oscuro
  (texto sobre superficie clara)
- Bordes / líneas: dorado al 20-30% opacidad sobre navy (outline buttons estilo Aspelin Reitan)
- Overlays sobre imagen/video (rol Aker): `rgba(15,23,41,0.5)` a `rgba(15,23,41,0.65)` — usa el
  navy oscuro de marca, no negro puro
- Estados: éxito `#4a7c59` (verde apagado, no saturado), error `#a84448` — solo para el form de
  contacto

## Tipografía
- Display / títulos: Cormorant Garamond (serif), tratamiento oversized tipo Liron Moran para el
  H1 del Hero — grande, cortado por el frame, superpuesto a la imagen/video
- Cuerpo: Montserrat
- Escala: display hero 56-96px según viewport, heading de sección 36-48px, body 16-18px
- Números: tabulares si aparecen métricas (m², recámaras, etc. — no hay en esta fase)

## Componentes
- Botones primario: relleno dorado (`#b8965c`), texto navy oscuro — reservado a la CTA principal
  (agendar cita)
- Botones secundario: outline dorado sobre navy (rol Aspelin Reitan: borde 1px, fondo
  transparente, texto dorado)
- Cards flotantes sobre imagen (rol Aker): `rgba(15,23,41,0.55)`, radius 8px, sin padding interno
  duro — contenido sangra al borde
- Navegación: minimal, translúcida sobre el hero, se vuelve sólida navy al hacer scroll

## Layout y espaciado
- Full-bleed para Hero, Galería y Amenidades (imagen domina); contenido con max-width en
  "Sobre el Proyecto" y Contacto (editorial, legible)
- Ritmo: secciones alternan dark (navy) / light (crema) — igual que el resto del catálogo de
  proyectos de Oscar, refuerza el contraste editorial en vez de scroll monótono
  todo-oscuro-o-todo-claro
- Densidad: cómoda, gaps de sección generosos (~64-100px según viewport), nada apretado

## Motion
Nivel de ejecución objetivo: Grupo Orve (profundidad, scroll choreography con propósito), NO su
paleta. Reglas concretas (rol Aker):
- Duración 0.2-0.35s para microinteracciones, hasta 0.6s para reveals de sección grandes
- Easing `cubic-bezier(0.165, 0.84, 0.44, 1)` — salida rápida, llegada suave, nunca bounce
- Se anima opacity/transform/color/radius — nunca layout-shifting properties
- Scroll reveal por sección (fade + translateY sutil), parallax leve en imágenes de fondo del
  hero/galería, tabs de Amenidades con transición de cross-fade al cambiar categoría
- Respeta `prefers-reduced-motion: reduce` en todo — desactiva parallax/autoplay de reveals

## Guardrails (qué NO hacer)
- No usar negro puro (`#000`) en overlays — siempre navy de marca (`#0f1729`/`#1a2744`)
- No promediar: si una sección se siente plana, no se le agrega un "detallito" (sombra/borde) —
  se rediseña la familia de layout completa de esa sección
- No stock genérico nuevo (la foto de Unsplash de "Cancha de Bochas" del sitio viejo se flaggea
  para que Oscar decida, no se repite el patrón)
- No inventar copy ni datos — todo trazable al PDF de retro o al brief real
  (`docs/informacion-principal.txt`)
- Secciones hermanas (value props, galería, amenidades) no pueden compartir la misma familia de
  layout — cada una distinta a propósito

## Responsive
- Mobile-first para las secciones de contenido; el Hero conserva el video de fondo en mobile solo
  si el performance lo permite (si no, poster estático + lazy del video)
- Breakpoints: 640px (mobile/tablet), 1024px (tablet/desktop), 1440px (desktop grande, max-width
  de contenido se satura ahí)
