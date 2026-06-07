# Proyecto: Landing Page — Vivir en Presencia · Tameana

## Contexto del proyecto
Landing page profesional para **July**, terapeuta de Tameana en Argentina. Marca: **Vivir en Presencia**.
Las sesiones son 100% a distancia (online), lo que permite atraer audiencia hispanohablante global.
Estética: editorial wellness con raíces espirituales. NO SaaS ni startup.

## Stack técnico
- HTML5 + CSS3 + JavaScript vanilla (GSAP para animaciones sutiles si es necesario)
- Deploy en Vercel
- Dominio: [PENDIENTE — a definir]
- Analytics: Google Analytics 4 + Search Console

## Skills activas en este proyecto
- `frontend-design` — construcción UI
- `claude-design` — diseño one-shot
- `ui-ux-pro-max` — UX/UI avanzado
- `web-design-guidelines` — auditoría performance/a11y
- `seo-onpage`, `seo-technical`, `seo-keyword`, `seo-aeo-geo`, `landing-page-copy` — SEO

## Identidad de marca (COMPLETA)

### Nombre
**Vivir en Presencia** — Logo tipográfico con planta botánica integrada en la "R"

### Paleta de colores
| Variable CSS | HEX | Rol |
|-------------|-----|-----|
| `--color-primary` | `#2A5833` | Verde bosque — logo, H1, CTAs |
| `--color-secondary` | `#7D9E7F` | Verde salvia — acentos, hover |
| `--color-accent` | `#C07840` | Terracota dorada — CTAs secundarios |
| `--color-bg` | `#F5F5E8` | Crema cálida — background principal |
| `--color-bg-alt` | `#EDE8D0` | Crema profunda — secciones alternas |
| `--color-text` | `#1E2E20` | Verde casi negro — cuerpo |
| `--color-text-soft` | `#6B7860` | Salvia grisácea — textos de apoyo |
| `--color-mint` | `#A9C5A5` | Menta claro — cards, chips |
| `--color-gold` | `#D4B030` | Dorado tierra — ornamentos |
| `--color-teal` | `#7EC0B8` | Teal — detalles |

### Tipografía
- **Display / H1 / H2**: Fraunces 300 Italic (Google Fonts)
- **Body / párrafos**: DM Sans 300-400 (Google Fonts)
- **Acento / citas**: Cormorant Garamond 300 Italic (Google Fonts)
- **CTAs / labels**: DM Sans 500

## Sesiones (3 servicios principales)


Todas las sesiones son a distancia (online). Apta para niños y mascotas.



## Estructura de secciones de la landing (orden recomendado)

1. **Hero** — Visual impactante + H1 + tagline + CTA "Reservar sesión"
2. **Qué es Tameana** — 200 palabras + foto geometría sagrada
3. **Las sesiones** — 3 tarjetas (Salush Nahié / Maát / Orígenes) + CTA
4. **Quién soy** — Bio + foto pirámides de Giza + hitos del camino
5. **Lo que transforma Tameana** — Lista visual de beneficios principales
6. **Testimonios** — 3 testimonios (Lola / Beatriz / Yolanda) + foto mariposa
7. **FAQ** — 8-10 preguntas con respuestas completas (ver seo/faq-content.md)
8. **Reservar sesión** — CTA final + WhatsApp + formulario simple
9. **Footer** — Logo + Instagram + copyright + aviso complementariedad médica

## Reglas de diseño NO negociables
1. NO usar Inter, Roboto, Arial — solo Fraunces / DM Sans / Cormorant
2. NO gradientes púrpura-azul — solo paleta verde/terracota/crema
3. NO bento grids agresivos — layout editorial, columnas amplias
4. Animaciones SUTILES: fade-in 1.2-2s, parallax lento, nunca glitch
5. Respetar `prefers-reduced-motion` siempre
6. 60% del scroll debe sentirse respirable (whitespace generoso)
7. CTA siempre cálido: "Reservar sesión" — nunca lenguaje de venta agresivo
8. El copy menciona "a distancia" / "online" en al menos 3 secciones distintas
9. Usar fuente, colores, etc que viene en el index de claude desing

## Reglas de SEO NO negociables
1. H1: "Sesiones de Tameana a Distancia — Vivir en Presencia" (o variante aprobada)
2. Texto mínimo: 900 palabras visibles en el HTML
3. Schema.org: LocalBusiness + Service×3 + Person + FAQPage + Review×3
4. Core Web Vitals: Performance ≥ 90, SEO ≥ 95, Accessibility ≥ 95
5. Imágenes en WebP con fallback JPG, alt text descriptivo
6. Lazy loading en todo lo que esté below-the-fold

## Flujo de trabajo (FRAME adaptado)
1. **Fase 1** ✅ — Assets recolectados, documentación completada
2. **Fase 2** — Brief en Claude Chat con todos los docs → sistema visual + prompt one-shot
3. **Fase 3** — Higgsfield para animar fotos (cuarzo, july-giza, geometría)
4. **Fase 4** — One-shot en Claude Design → iteración → aprobación
5. **Fase 5** — Handoff a Claude Code → SEO técnico + performance → Lighthouse ≥ 90
6. **Fase 6** — Deploy Vercel + dominio + GA4 + Search Console

## Comandos útiles
- `npx http-server src/ -p 8080` → servidor local rápido
- `npm run lighthouse` → auditoría de Core Web Vitals (a configurar en Fase 5)
- `npx skills list` → ver skills disponibles

## Convenciones
- Commits: `feat:`, `fix:`, `seo:`, `design:` en español
- Branch principal: `main`
- Branches: `feature/[nombre]`

## Lo que NO debe hacer Claude
- NO modificar imágenes en `assets/fotos-cliente/` — son originales del cliente
- NO sustituir fotos del cliente con imágenes generadas por IA
- NO usar lorem ipsum — usar copy real de `brand-spec.md` o marcar `[PLACEHOLDER]`
- NO desplegar sin Lighthouse ≥ 90/95/95
- NO agregar tracking sin banner de cookies (GDPR)
- NO prometer curas médicas en el copy — siempre "práctica complementaria"
- NO mencionar precios sin confirmar con July primero
