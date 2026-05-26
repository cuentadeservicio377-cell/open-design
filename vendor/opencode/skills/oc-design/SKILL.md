---
name: oc-design
description: |
  Meta-skill de diseño frontend. Activa cuando el usuario dice:
  - "diseñar", "crear UI", "hacer el frontend"
  - "usar estilo [X]", "estilo [linear/stripe/apple/etc]"
  - "crear sistema de diseño", "generar DESIGN.md"
  - "/design", "/estilo"
  
  Motor de razonamiento que combina:
  - UI UX Pro Max (161 reglas, 67 estilos, 161 paletas, motor Python)
  - Anti-slop rules (taste-skill + OpenAI GPT-5.4 principles)
  - 22 YAML de marca curados con layout/responsive/interaction
  - Micro-interacciones premium (Framer Motion, spring physics)
  - Protocolo de razonamiento obligatorio antes de código

  Posición en el flujo: oc-specify → **oc-design** → oc-tasks → oc-implement
---

# OpenCode Design Skill v2

## Conexión con el flujo spec-driven

1. **Antes**: `oc-specify` (ya definió QUÉ construir)
2. **Este skill**: Define CÓMO construirlo (sistema de diseño + plan técnico + UI)
3. **Después**: `oc-tasks` (descompone en tareas) → `oc-implement` (ejecuta)

SI el usuario llega directamente sin spec → sugerir `oc-specify` (tareas grandes).
SI es tarea simple → generar plan inline sin ceremonia.

---

## Protocolo de Razonamiento OBLIGATORIO

ANTES de escribir una línea de código, DEBES completar estos 6 pasos en orden.

### PASO 1: CLASIFICAR → ¿Qué tipo de página?

| Tipo | Señales | Diales default |
|------|---------|----------------|
| **Landing** | "landing", "homepage", "página de venta", "marketing" | variance:7 motion:6 density:4 |
| **Dashboard** | "dashboard", "analytics", "panel", "métricas" | variance:4 motion:5 density:7 |
| **App/Tool** | "app", "tool", "editor", "IDE", "plataforma" | variance:5 motion:4 density:6 |
| **Form/Wizard** | "form", "checkout", "onboarding", "signup" | variance:3 motion:3 density:5 |
| **Docs/Wiki** | "docs", "documentación", "wiki", "ayuda" | variance:3 motion:2 density:5 |
| **E-commerce** | "tienda", "shop", "catálogo", "producto" | variance:5 motion:5 density:5 |
| **Chat/Messaging** | "chat", "messaging", "conversación" | variance:4 motion:4 density:6 |

### PASO 2: RAZONAR → Usar UI UX Pro Max Engine

EJECUTAR obligatoriamente antes de diseñar:

```bash
python3 skills/ui-ux-pro-max/scripts/search.py "<tipo_producto> <industria> <keywords>" --design-system -p "ProjectName"
```

Esto genera: Pattern + Style + Colors + Typography + Effects + Anti-patterns.

Luego补充 con búsquedas específicas:
```bash
python3 skills/ui-ux-pro-max/scripts/search.py "<keyword>" --domain style
python3 skills/ui-ux-pro-max/scripts/search.py "<keyword>" --domain typography
python3 skills/ui-ux-pro-max/scripts/search.py "<keyword>" --domain color
```

### PASO 3: TESIS → Escribir antes de diseñar (OpenAI principle)

**OBLIGATORIO.** Generar estas 3 cosas ANTES de cualquier código:

1. **Visual Thesis** (1 frase): "El mood y energía de esta página es ___"
2. **Content Plan** (lista ordenada):
   - Hero → establecer identidad y promesa
   - Supporting → mostrar contexto
   - Detail → explicar la oferta
   - Social proof → construir credibilidad
   - Final CTA → convertir
3. **Interaction Thesis** (2-3 ideas de motion):
   - Hero entrance → ___
   - Scroll-linked → ___
   - Hover/reveal → ___

### PASO 4: DIALES → Convertir a decisiones CSS concretas

#### variance → Layout

| Valor | Grid Pattern | Hero Layout | Section Composition |
|-------|-------------|-------------|---------------------|
| 1-3 | Columnas iguales, centrado | Centrado, simétrico | Padding uniforme, hero centrado |
| 4-7 | 2+1 zig-zag, offset columns | Split screen, left-aligned | Varied spacing, overlapping elements |
| 8-10 | Masonry, asymmetric grids, massive whitespace | Asymmetric, text-left + visual-right | Bento grid, broken grids, dramatic whitespace |

#### motion → Animación

| Valor | Approach | Spring Config | Choreography |
|-------|---------|---------------|-------------|
| 1-3 | Estático. Solo CSS `:hover`/`:active` | None | None |
| 4-7 | CSS transitions `cubic-bezier(0.16, 1, 0.3, 1)` | stiffness:100 damping:20 | Staggered reveals (100ms delay) |
| 8-10 | Framer Motion, spring physics | stiffness:150 damping:15 | Hero entrance + scroll-linked + magnetic buttons |

#### density → Espaciado

| Valor | Padding Cards | Section Gap | Info Density | Component Style |
|-------|-------------|-------------|-------------|-----------------|
| 1-3 | 24-32px | 64-96px | Art gallery, mucho aire | Rounded cards, shadows OK |
| 4-7 | 16-24px | 32-48px | App normal | Standard cards with borders |
| 8-10 | 8-12px | 16-24px | Cockpit, datos densos | `border-t`, `divide-y`, NO shadows |

### PASO 5: TOKENS → Todo desde el sistema

CADA color, spacing, radii, font DEBE venir de:
1. `design-model.yaml` del proyecto (si existe)
2. El YAML de estilo seleccionado (de `library/styles/`)
3. El output de UI UX Pro Max engine

NUNCA inventar valores ad-hoc. Si falta un token, derivarlo de la escala existente.

### PASO 6: VALIDAR → Checklist anti-slop

Antes de entregar, verificar contra `references/anti-slop-rules.md`:
- [ ] No Inter como font de identidad
- [ ] No AI purple/violet aesthetic
- [ ] No #000000 puro
- [ ] No 3 columnas iguales de cards
- [ ] No cards en el hero (OpenAI rule)
- [ ] No nombres/nums genéricos
- [ ] No AI filler words
- [ ] `min-h-[100dvh]` en heroes
- [ ] Animaciones solo transform/opacity
- [ ] Z-index sistémicos
- [ ] Motion budget ≤ 3 intencionales
- [ ] One job per section

---

## Configuración por Proyecto

Los diales se guardan en `AGENTS.md` del proyecto:

```yaml
design:
  style: "linear"
  variance: 8
  motion: 6
  density: 4
```

| Dial | Rango | Default | Qué Controla |
|------|-------|---------|--------------|
| `variance` | 1-10 | 8 | Simetría → Asimetría en layout |
| `motion` | 1-10 | 6 | Estático → Cinematográfico |
| `density` | 1-10 | 4 | Amplio → Denso |

---

## Workflow Completo

### FASE 1: ANÁLISIS DE CONTEXTO

```
1. Leer AGENTS.md del proyecto → extraer design config
2. ¿Existe DESIGN.md? → usarlo como fuente de verdad
3. ¿Existe design-model.yaml? → usar sus tokens
4. ¿Usuario especificó estilo? → cargar de library/styles/
5. Sin especificar → UI UX Pro Max engine recomienda + proponer 2-3 opciones
```

#### Input: URL (extraer diseño existente)

1. Chrome DevTools MCP: `new_page(url)` → esperar carga
2. `evaluate_script()` → extraer computed styles:
   - `getComputedStyle(document.body)` → bg, color, font
   - Todos los `<button>`, `<a class*="btn">` → border-radius, padding, colors
   - Font families de h1-h6 y body
3. `take_screenshot()` → inspeccionar visualmente
4. Navegar a 2-3 subpáginas → repetir
5. Generar `design-model.yaml`

#### Input: Descripción

1. Ejecutar UI UX Pro Max: `python3 skills/ui-ux-pro-max/scripts/search.py "<descripción>" --design-system`
2. Traducir adjetivos a tokens:
   - "warm" → grises con tinte cálido
   - "minimal" → alto espaciado, pocos elementos
   - "neon" → colores saturados en superficie oscura
3. Cargar YAML de estilo que mejor match
4. Generar design-model.yaml con valores derivados

### FASE 2: GENERAR SISTEMA DE DISEÑO

1. **UI UX Pro Max Engine** genera recomendaciones base
2. **YAML de estilo** aporta tokens de marca específicos
3. **Diales** convierten recomendaciones a CSS concreto
4. **Anti-slop rules** filtran todo lo prohibido
5. Generar `design-model.yaml` en el proyecto
6. Generar `DESIGN.md` en el proyecto (usando `templates/DESIGN.md`)

### FASE 3: VISUAL THESIS + CONTENT PLAN + INTERACTION THESIS

Escribir las 3 tesis OBLIGATORIAS (PASO 3 del protocolo) y MOSTRAR al usuario.

### FASE 4: VALIDACIÓN VISUAL

Generar `preview.html` (usando `templates/preview.html`) y abrir en navegador:
- Chrome DevTools MCP → `take_screenshot()`
- Verificar: colores, tipografía, componentes, spacing, responsive
- El usuario confirma o ajusta

### FASE 5: PLAN DE IMPLEMENTACIÓN

Generar plan que incluya:
- Visual Thesis (1 frase)
- Content Plan (secciones ordenadas)
- Interaction Thesis (2-3 motions)
- Componentes con tokens específicos
- Archivos a crear/modificar
- Diales aplicados con valores concretos
- **ESPERAR confirmación del usuario**

### FASE 6: IMPLEMENTACIÓN

Aplicar reglas anti-slop durante la construcción. Ver `references/anti-slop-rules.md`.

### FASE 7: VALIDACIÓN EN NAVEGADOR

Chrome DevTools MCP → screenshot antes/después. Verificar:
- Console sin errores
- Layout no roto en mobile (375px) y desktop (1440px)
- Hover/focus states funcionan
- Motion se siente natural

---

## Page-Type Patterns

### Landing Page (variance:7 motion:6 density:4)

**Regla OpenAI**: Full-bleed hero by default. No cards in hero. Brand first.

```
STRUCTURE:
1. Hero — full-bleed, split (text left + visual right)
   - Brand name hero-level
   - CTA above fold
   - NO cards
2. Features — zig-zag 2+1 (NOT 3 equal columns)
3. Social proof — logo wall (opacity 0.4) + testimonials
4. Detail section — one job, one takeaway
5. Final CTA — full-width with accent

HERO PRESETS (from references/hero-stage.md):
- SaaS/Dev → grid-on-dark
- Fintech → luminous-on-gradient  
- Premium → painterly-no-hero
- Consumer → editorial-photo
```

### Dashboard (variance:4 motion:5 density:7)

**Regla OpenAI**: If an operator scans only headings, labels, and numbers — can they understand the page?

```
STRUCTURE:
1. Sidebar (240px) + main content
2. KPI row — border-t, NO shadows (dashboard hardening)
3. Primary chart — 60% viewport width
4. Secondary data — table or list with divide-y
5. Alerts — inline, NOT toast spam

DASHBOARD HARDENING (density > 7):
- NO generic card containers → use border-t, divide-y, negative space
- NO box shadows → borders only
- NO rounded cards (12px+) → sharp or minimal radius (4px)
- NO colored backgrounds per card → single surface, borders for hierarchy
- Cards ONLY when the card IS the interaction
```

### Form/Wizard (variance:3 motion:3 density:5)

```
STRUCTURE:
1. Single column, max-width 480px
2. Progress bar (multi-step)
3. Labels ALWAYS visible (NOT placeholder-only)
4. Inline validation on blur
5. Submit button full-width
6. Error messages near field with recovery path
```

### Chat/Messaging (variance:4 motion:4 density:6)

```
STRUCTURE:
1. Sidebar (conversations) + main (messages)
2. Message bubbles — left for other, right for user
3. Input area fixed at bottom with auto-resize
4. Typing indicator (motion: pulse)
5. Empty state: "Start a conversation" with direction
```

---

## Micro-interacciones Premium

Cuando `motion > 5`, aplicar patrones de `references/micro-interactions.md`:

### Motion Budget (OpenAI rule): ELEGIR 3, no más

1. **Hero entrance** — Staggered reveal de headline → subtitle → CTA
2. **Scroll-linked** — Fade-in sections con IntersectionObserver
3. **Hover/reveal** — Magnetic buttons o direction-aware fill

### Patrones disponibles

| Patrón | Motion requerido | Complejidad |
|--------|-----------------|-------------|
| Staggered Reveals | motion > 4 | Baja |
| Spring Hover | motion > 5 | Baja |
| Magnetic Buttons | motion > 7 | Media |
| Border Beam | motion > 7 | Media |
| Liquid Glass | motion > 6 | Baja (CSS) |
| Scroll Progress | motion > 6 | Media |
| Layout Animations | motion > 8 | Alta |
| Parallax Subtle | motion > 6 | Media |

### Spring Configs por defecto

| Interacción | Stiffness | Damping |
|-------------|-----------|---------|
| Button hover | 300 | 20 |
| Modal open | 100 | 15 |
| List item enter | 100 | 20 |
| Card expand | 50 | 15 |

---

## Catálogo de Estilos

22 estilos curados en `library/styles/` — todos actualizados con layout, responsive, interaction rules y sin Inter/purple:

### Developer Tools
| Estilo | Acento | Font Display | Font Body | Uso ideal |
|--------|--------|-------------|-----------|-----------|
| `linear` | Emerald | Geist | Geist | Project management, SaaS B2B |
| `cursor` | Emerald | Geist | Geist | Dev tools, IDEs |
| `vercel` | Neutral | Geist | Geist | Deploy platforms, portfolios |
| `raycast` | Emerald | Geist | Geist | Launchers, productivity apps |

### AI Platforms
| Estilo | Acento | Font Display | Font Body | Uso ideal |
|--------|--------|-------------|-----------|-----------|
| `claude` | Terracotta | Cabinet Grotesk | Geist | AI assistants, chat |
| `opencode` | Cyan | Cabinet Grotesk | Geist | Code assistants, CLI |

### Fintech
| Estilo | Acento | Font Display | Font Body | Uso ideal |
|--------|--------|-------------|-----------|-----------|
| `stripe` | Sky-blue | Geist | Plus Jakarta Sans | Payments, SaaS pricing |
| `revolut` | Teal | Geist | Plus Jakarta Sans | Banking, crypto |

### Premium/Luxury
| Estilo | Acento | Font Display | Font Body | Uso ideal |
|--------|--------|-------------|-----------|-----------|
| `apple` | Neutral | SF Pro Display | Outfit | Consumer electronics |
| `ferrari` | Red | Cabinet Grotesk | Outfit | Luxury brands |
| `lamborghini` | Gold | Cabinet Grotesk | Outfit | Hyper-luxury |

### Productivity / Design / Media / Backend / E-commerce
| Estilo | Acento | Font Display | Uso ideal |
|--------|--------|-------------|-----------|
| `notion` | Warm neutral | Cabinet Grotesk | Documentation, wikis |
| `figma` | Teal | Satoshi | Design tools |
| `framer` | Blue | Satoshi | Website builders |
| `spotify` | Green | Plus Jakarta Sans | Music, media |
| `supabase` | Emerald | Geist | BaaS, dev platforms |
| `mongodb` | Green | Geist | Database, infra |
| `airbnb` | Coral | Plus Jakarta Sans | Marketplaces, travel |
| `corporate-blue` | Navy | DM Sans | Enterprise, corporate |
| `neon-cyber` | Cyan | Satoshi | Gaming, crypto |
| `tech-minimal` | Neutral | Geist | Minimal SaaS |
| `warm-editorial` | Warm | Cabinet Grotesk | Blogs, magazines |

---

## UI UX Pro Max Integration

### Motor de razonamiento (OBLIGATORIO en FASE 1-2)

```bash
# Generar sistema de diseño completo
python3 skills/ui-ux-pro-max/scripts/search.py "<producto> <industria>" --design-system -p "Name"

# Búsquedas por dominio
python3 skills/ui-ux-pro-max/scripts/search.py "minimalism dark" --domain style
python3 skills/ui-ux-pro-max/scripts/search.py "elegant luxury" --domain typography
python3 skills/ui-ux-pro-max/scripts/search.py "saas dashboard" --domain color
python3 skills/ui-ux-pro-max/scripts/search.py "real-time monitoring" --domain chart
python3 skills/ui-ux-pro-max/scripts/search.py "animation accessibility" --domain ux

# Persistir para uso entre sesiones
python3 skills/ui-ux-pro-max/scripts/search.py "<query>" --design-system --persist -p "Name"
```

### Base de datos disponible

| Dominio | Registros | Qué aporta |
|---------|-----------|------------|
| products.csv | 161 | Patrones por tipo de producto |
| styles.csv | 67 | Estilos UI con keywords y mejores usos |
| colors.csv | 161 | Paletas por industria |
| typography.csv | 57 | Font pairings curados |
| ux-guidelines.csv | 99 | Best practices priorizados |
| ui-reasoning.csv | 161 | Reglas de razonamiento por industria |
| charts.csv | 25 | Tipos de gráfico recomendados |
| landing.csv | 8 | Patrones de landing page |

### Master + Overrides Pattern

UI UX Pro Max puede persistir el sistema de diseño:

```
design-system/
├── MASTER.md           # Source of truth global
└── pages/
    └── dashboard.md    # Override específico por página
```

Al construir una página: leer MASTER.md primero, luego pages/[page].md si existe (override).

---

## Decisiones Automáticas

| Situación | Acción |
|-----------|--------|
| Usuario pide "algo premium" | Sugerir Apple, Stripe, Linear |
| Usuario pide "oscuro y moderno" | Sugerir Cursor, Vercel, Raycast |
| Usuario pide "cálido y amigable" | Sugerir Notion, Airbnb, Claude |
| Usuario pide "dashboard denso" | density=8, borders sobre cards, dashboard hardening |
| Usuario pide "landing page" | variance=7, full-bleed hero, no cards in hero |
| Usuario pide "form/mvp" | density=4, motion=3, quick ship |
| UI UX Pro Max recomienda purple | APLICAR LILA ban → reemplazar con emerald/cyan |
| YAML de estilo tiene Inter | REEMPLAZAR con Geist/Cabinet Grotesk |
| Conflicto anti-slop vs YAML | Anti-slop WINS en bans específicos, YAML preserva brand intent |

---

## Archivos de Referencia

| Archivo | Qué contiene |
|---------|-------------|
| `references/anti-slop-rules.md` | Reglas completas anti-genérico + OpenAI principles |
| `references/micro-interactions.md` | Patrones de interacción premium (Border Beam, Magnetic, etc.) |
| `references/hero-stage.md` | 9 presets de hero con reglas de composición |
| `templates/design-model.yaml` | Template del modelo de diseño (SSoT) |
| `templates/DESIGN.md` | Template de especificación markdown |
| `templates/preview.html` | Template de validación visual HTML |
| `library/styles/*.yaml` | 22 estilos curados con layout/responsive/interaction |
| `../ui-ux-pro-max/` | Motor de razonamiento Python + base de datos |

---

## Litmus Checks (OpenAI)

Antes de entregar, pasar estas pruebas:

**Landing Page:**
> "Si quitas la imagen del hero y la página sigue funcionando, la imagen era demasiado débil"

**Dashboard:**
> "Si un operador escanea solo headings, labels y números — ¿puede entender la página inmediatamente?"

**General:**
> "¿Cada sección hace UN solo trabajo? Si hace dos, corta uno."

---

## Ajuste de Diales en Vivo

```
Usuario: "Quiero más movimiento"
→ motion = min(current_motion + 2, 10)
→ Revisar interaction thesis: agregar 1 motion, quitar otro si budget > 3
→ Actualizar AGENTS.md
→ Regenerar componentes afectados

Usuario: "Menos denso, más aire"
→ density = max(current_density - 2, 1)
→ Actualizar AGENTS.md
→ Regenerar espaciado

Usuario: "Más asimétrico"
→ variance = min(current_variance + 2, 10)
→ Actualizar AGENTS.md
→ Cambiar grid pattern según tabla de variance
```

---

## Integración con Elementor MCP (v3)

### Cuándo usar Elementor
Cuando el usuario pide construir páginas en WordPress con Elementor:
- "crea una landing page para mi sitio WordPress"
- "diseña la homepage en Elementor"
- "construye un dashboard en WordPress"
- "migra este diseño a Elementor"

### Flujo oc-design → oc-elementor

```
FASE 1-5 (oc-design normal):
  1. Clasificar tipo de página
  2. UI UX Pro Max Engine → recomendar estilo
  3. Visual Thesis + Content Plan + Interaction Thesis
  4. Convertir diales a CSS tokens
  5. Validar anti-slop

FASE 6 (NUEVA — Traducción a Elementor):
  6a. Traducir CSS tokens → Elementor global settings:
      - Colores → update-global-colors
      - Tipografías → update-global-typography
  
  6b. Traducir Content Plan → Secciones Elementor:
      - Hero → Container flex row (text 50% + image 50%)
      - Features → Containers en zig-zag (NO 3 iguales)
      - CTA → Container full-width con accent background
  
  6c. Asignar widgets por sección:
      - Títulos → add-heading (h1-h6 según jerarquía)
      - Texto → add-text-editor
      - CTAs → add-button (con estilos del sistema)
      - Imágenes → add-image o add-stock-image
  
  6d. Aplicar tokens de diseño a cada elemento:
      - Padding → según density dial
      - Gap → según variance dial
      - Border radius → según estilo
      - Colors → de la paleta del sistema

FASE 7 (oc-elementor — implementación):
  → Delegar al skill oc-elementor para ejecutar las llamadas MCP
```

### Tokens CSS → Elementor Global Settings

| Token CSS | Elementor Tool | Ejemplo |
|-----------|---------------|---------|
| `--color-primary` | `update-global-colors` | Emerald-500 |
| `--color-background` | `update-global-colors` | Zinc-50 |
| `--color-text` | `update-global-colors` | Zinc-900 |
| `--font-display` | `update-global-typography` | Geist 700 |
| `--font-body` | `update-global-typography` | Geist 400 |

### Page-Type → Elementor Structure

| Tipo | Estructura Elementor |
|------|---------------------|
| **Landing** | 1-page, full-width containers, `elementor_canvas` template |
| **Dashboard** | Sidebar + main content, border-t, NO shadows |
| **Form/Wizard** | Single column, max-width 480px, multi-step |
| **E-commerce** | Grid de productos, filtros, cards con border |
| **Blog/Editorial** | Single post, wide content, related posts grid |

### Widget Mapping (anti-slop compliant)

| Componente de diseño | Widget Elementor | Regla anti-slop |
|---------------------|------------------|-----------------|
| Hero heading | `add-heading` (h1, size="xl") | No Inter, no AI purple |
| Hero subtitle | `add-text-editor` | No filler words |
| CTA button | `add-button` | Accent color, no genérico |
| Feature card | `add-icon-box` | 2+1 zig-zag, NO 3 iguales |
| Testimonial | `add-testimonial` | Nombres reales, no "John Doe" |
| Image | `add-image` o `add-stock-image` | No placeholder genérico |
| Stats | `add-counter` | Números orgánicos (47.2%, no 50%) |
| Pricing | `add-price-table` (Pro) | 3 tiers con 1 destacado |
| Form | `add-form` (Pro) | Labels visibles, inline validation |

### Ejemplo Completo: Landing Page Linear

```
Diseño → Elementor:

1. update-global-colors({
     primary: "#10b981",
     secondary: "#059669", 
     text: "#18181b",
     accent: "#047857",
     background: "#fafafa"
   })

2. update-global-typography({
     primary: { family: "Geist", size: "56px", weight: "700" },
     secondary: { family: "Geist", size: "18px", weight: "400" },
     body: { family: "Geist", size: "16px", weight: "400" }
   })

3. create-page("Landing Page") → page_id
4. update-page-settings(page_id, template="elementor_canvas")

5. HERO (split: text 50% + visual 50%)
   hero = add-container(page_id, type="flex", direction="row", min_height="100vh")
   hero_text = add-container(hero, width="50%")
     add-heading(hero_text, "Build Faster", h1)
     add-text-editor(hero_text, "The platform that...")
     add-button(hero_text, "Start Building →", style="primary")
   hero_visual = add-container(hero, width="50%")
     add-stock-image(hero_visual, "modern development workspace")

6. FEATURES (2+1 zig-zag — NO 3 columnas iguales)
   ...

7. FINAL CTA (full-width, accent background)
   cta = add-container(page_id, background="primary", padding="80px")
   add-heading(cta, "Ready to ship?", align="center", color="white")
   add-button(cta, "Get Started", size="lg", style="secondary")
```

### Checklist Pre-Implementación Elementor

Antes de delegar a oc-elementor, verificar:
- [ ] ¿Tipo de página clasificado correctamente?
- [ ] ¿Dial configurados (variance, motion, density)?
- [ ] ¿Content Plan definido con secciones ordenadas?
- [ ] ¿Colores y tipografías traducidos a tokens?
- [ ] ¿Widgets mapeados correctamente?
- [ ] ¿Anti-slop rules aplicadas (no Inter, no AI purple, etc.)?
- [ ] ¿Números y nombres orgánicos (47.2%, no 50%)?
- [ ] ¿Secciones hacen UN solo trabajo?
- [ ] ¿Conexión Elementor MCP verificada?

### Conexión con otros skills
- **Antes**: `oc-specify` (definió la página)
- **Este skill**: Diseña la UI con anti-slop + traduce a Elementor
- **Después**: `oc-elementor` (ejecuta las llamadas MCP) → `oc-qa` (verifica en browser)
- **Herramientas**: `oc-elementor` skill para la implementación MCP
