---
name: oc-elementor
description: Construye y gestiona páginas WordPress con Elementor usando 97 tools MCP. Conexión vía proxy HTTP a WordPress remoto. Usar cuando el usuario pida crear/editar páginas Elementor, diseñar en WordPress, o construir landings/dashboards en Elementor.
---

# OpenCode Elementor — WordPress Page Builder

## Objetivo
Construir, editar y gestionar páginas de WordPress con Elementor usando 97 herramientas MCP. El agente de diseño usa este skill para materializar diseños directamente en WordPress.

## Conexión con el flujo spec-driven
1. **oc-specify** → Define QUÉ página construir
2. **oc-design** → Diseña CÓMO se ve (anti-slop, diales, UI UX Pro Max)
3. **oc-elementor** → Materializa el diseño en WordPress/Elementor
4. **oc-qa** → Verifica en browser que la página funciona

---

## Requisitos previos

### En WordPress (remoto):
1. ✅ WordPress >= 6.8 con Elementor >= 3.20 instalado
2. ✅ Plugin "WordPress MCP Adapter" instalado y activado
3. ✅ Plugin "MCP Tools for Elementor" instalado y activado (https://github.com/msrbuilds/elementor-mcp)
4. ✅ Application Password creado en Users > Profile

### En la máquina local:
1. ✅ Node.js >= 18
2. ✅ Proxy descargado: `~/.config/opencode/mcp/elementor-mcp-proxy.mjs`
3. ✅ Configuración en `opencode.json` → `mcp.elementor`

---

## Configuración (primer uso)

### 1. Instalar plugins en WordPress
```bash
# En WordPress Admin:
# 1. Plugins > Add New > Upload Plugin
# 2. Subir ZIP de: https://github.com/WordPress/mcp-adapter/releases
# 3. Subir ZIP de: https://github.com/msrbuilds/elementor-mcp/releases
# 4. Activar ambos plugins
```

### 2. Crear Application Password
```
WordPress Admin > Users > Profile > Application Passwords
→ Nombre: "OpenCode Elementor MCP"
→ Copiar el password generado (formato: xxxx xxxx xxxx xxxx xxxx xxxx)
```

### 3. Configurar credenciales en opencode.json
```json
"mcp": {
  "elementor": {
    "env": {
      "WP_URL": "https://TUSITIO.com",
      "WP_USERNAME": "admin",
      "WP_APP_PASSWORD": "TU_APP_PASSWORD"
    }
  }
}
```

---

## Catálogo de 97 Tools

### 🔍 Query & Discovery (7)
| Tool | Descripción |
|------|-------------|
| `elementor-mcp_list-widgets` | Lista todos los widgets disponibles (Free + Pro) |
| `elementor-mcp_get-widget-schema` | Obtiene el esquema de controles de un widget |
| `elementor-mcp_get-page-structure` | Estructura completa de una página (árbol de elementos) |
| `elementor-mcp_get-element-settings` | Settings de un elemento específico |
| `elementor-mcp_list-pages` | Lista todas las páginas del sitio |
| `elementor-mcp_list-templates` | Lista templates guardados |
| `elementor-mcp_get-global-settings` | Settings globales de Elementor |

### 📄 Page Management (5)
| Tool | Descripción |
|------|-------------|
| `elementor-mcp_create-page` | Crea una página nueva con título y settings |
| `elementor-mcp_update-page-settings` | Actualiza settings (template, status, etc.) |
| `elementor-mcp_delete-page-content` | Borra contenido existente de una página |
| `elementor-mcp_import-template` | Importa template desde JSON |
| `elementor-mcp_export-page` | Exporta página como JSON |

### 🏗️ Layout & Structure (11)
| Tool | Descripción |
|------|-------------|
| `elementor-mcp_add-container` | Agrega un container (flexbox/grid) |
| `elementor-mcp_update-container` | Actualiza layout, gap, alignment, etc. |
| `elementor-mcp_move-element` | Mueve un elemento a otra posición |
| `elementor-mcp_remove-element` | Elimina un elemento |
| `elementor-mcp_duplicate-element` | Duplica un elemento existente |
| `elementor-mcp_get-container-schema` | Schema de controles de container |
| `elementor-mcp_find-element` | Busca elemento por selector/ID |
| `elementor-mcp_update-element` | Actualiza cualquier elemento |
| `elementor-mcp_batch-update` | Actualiza múltiples elementos a la vez |
| `elementor-mcp_reorder-elements` | Reordena elementos dentro de un container |

### 🧩 Widgets — Universales (2)
| Tool | Descripción |
|------|-------------|
| `elementor-mcp_add-widget` | Agrega cualquier widget por su tipo |
| `elementor-mcp_update-widget` | Actualiza settings de un widget |

### 🧩 Widgets — Conveniencia Free (27)
| Tool | Widget |
|------|--------|
| `elementor-mcp_add-heading` | Heading (h1-h6) |
| `elementor-mcp_add-text-editor` | Text Editor (WYSIWYG) |
| `elementor-mcp_add-image` | Image |
| `elementor-mcp_add-button` | Button |
| `elementor-mcp_add-video` | Video |
| `elementor-mcp_add-icon` | Icon |
| `elementor-mcp_add-spacer` | Spacer |
| `elementor-mcp_add-divider` | Divider |
| `elementor-mcp_add-icon-box` | Icon Box (icono + título + texto) |
| `elementor-mcp_add-accordion` | Accordion |
| `elementor-mcp_add-alert` | Alert |
| `elementor-mcp_add-counter` | Counter (animado) |
| `elementor-mcp_add-google-maps` | Google Maps |
| `elementor-mcp_add-icon-list` | Icon List |
| `elementor-mcp_add-image-box` | Image Box |
| `elementor-mcp_add-image-carousel` | Image Carousel |
| `elementor-mcp_add-progress` | Progress Bar |
| `elementor-mcp_add-social-icons` | Social Icons |
| `elementor-mcp_add-star-rating` | Star Rating |
| `elementor-mcp_add-tabs` | Tabs |
| `elementor-mcp_add-testimonial` | Testimonial |
| `elementor-mcp_add-toggle` | Toggle |
| `elementor-mcp_add-html` | HTML Code |
| `elementor-mcp_add-menu-anchor` | Menu Anchor |
| `elementor-mcp_add-shortcode` | Shortcode |
| `elementor-mcp_add-rating` | Rating |
| `elementor-mcp_add-text-path` | Text Path |

### 🧩 Widgets — Pro (22, requieren Elementor Pro)
| Tool | Widget |
|------|--------|
| `elementor-mcp_add-form` | Form Builder |
| `elementor-mcp_add-posts-grid` | Posts / Portfolio Grid |
| `elementor-mcp_add-countdown` | Countdown Timer |
| `elementor-mcp_add-price-table` | Price Table |
| `elementor-mcp_add-flip-box` | Flip Box |
| `elementor-mcp_add-animated-headline` | Animated Headline |
| `elementor-mcp_add-call-to-action` | Call to Action |
| `elementor-mcp_add-slides` | Slides |
| `elementor-mcp_add-testimonial-carousel` | Testimonial Carousel |
| `elementor-mcp_add-price-list` | Price List |
| `elementor-mcp_add-gallery` | Gallery |
| `elementor-mcp_add-share-buttons` | Share Buttons |
| `elementor-mcp_add-table-of-contents` | Table of Contents |
| `elementor-mcp_add-blockquote` | Blockquote |
| `elementor-mcp_add-lottie` | Lottie Animation |
| `elementor-mcp_add-hotspot` | Hotspot |
| `elementor-mcp_add-nav-menu` | Nav Menu |
| `elementor-mcp_add-loop-grid` | Loop Grid |
| `elementor-mcp_add-loop-carousel` | Loop Carousel |
| `elementor-mcp_add-media-carousel` | Media Carousel |
| `elementor-mcp_add-nested-tabs` | Nested Tabs |
| `elementor-mcp_add-nested-accordion` | Nested Accordion |

### 🎨 Templates & Theme Builder (8)
| Tool | Descripción |
|------|-------------|
| `elementor-mcp_save-as-template` | Guarda elemento/página como template |
| `elementor-mcp_apply-template` | Aplica un template a una página |
| `elementor-mcp_create-theme-template` | Crea template de Theme Builder (header, footer, single, archive) |
| `elementor-mcp_set-template-conditions` | Condiciones de display de theme template |
| `elementor-mcp_list-dynamic-tags` | Lista dynamic tags disponibles |
| `elementor-mcp_set-dynamic-tag` | Asigna un dynamic tag a un control |
| `elementor-mcp_create-popup` | Crea un popup |
| `elementor-mcp_set-popup-settings` | Configura triggers y display conditions |

### 🌐 Global Settings (2)
| Tool | Descripción |
|------|-------------|
| `elementor-mcp_update-global-colors` | Actualiza colores globales de Elementor |
| `elementor-mcp_update-global-typography` | Actualiza tipografías globales |

### 🏗️ Composite (1)
| Tool | Descripción |
|------|-------------|
| `elementor-mcp_build-page` | **Crea página COMPLETA desde JSON declarativo** en una sola llamada |

### 🖼️ Stock Images (3)
| Tool | Descripción |
|------|-------------|
| `elementor-mcp_search-images` | Busca imágenes en Unsplash/Pexels/Pixabay |
| `elementor-mcp_sideload-image` | Descarga e importa imagen a la biblioteca |
| `elementor-mcp_add-stock-image` | Busca Y agrega imagen en un paso |

### 🎯 SVG Icons (1)
| Tool | Descripción |
|------|-------------|
| `elementor-mcp_upload-svg-icon` | Sube SVG como icono personalizado |

### 💻 Custom Code (4)
| Tool | Descripción |
|------|-------------|
| `elementor-mcp_add-custom-css` | Agrega CSS personalizado |
| `elementor-mcp_add-custom-js` | Agrega JS personalizado |
| `elementor-mcp_add-code-snippet` | Agrega snippet de código |
| `elementor-mcp_list-code-snippets` | Lista snippets existentes |

### ⚛️ Atomic Elements — Elementor 4.0+ (13)
| Tool | Descripción |
|------|-------------|
| `elementor-mcp_detect-elementor-version` | Detecta versión de Elementor |
| `elementor-mcp_add-atomic-widget` | Widget atómico genérico |
| `elementor-mcp_update-atomic-widget` | Actualiza widget atómico |
| `elementor-mcp_add-atomic-heading` | Atomic Heading |
| `elementor-mcp_add-atomic-paragraph` | Atomic Paragraph |
| `elementor-mcp_add-atomic-button` | Atomic Button |
| `elementor-mcp_add-atomic-image` | Atomic Image |
| `elementor-mcp_add-atomic-svg` | Atomic SVG |
| `elementor-mcp_add-atomic-youtube` | Atomic YouTube |
| `elementor-mcp_add-atomic-video` | Atomic Video |
| `elementor-mcp_add-atomic-divider` | Atomic Divider |
| `elementor-mcp_add-flexbox` | Flexbox Container |
| `elementor-mcp_add-div-block` | Div Block |


---

## Workflow de Construcción de Página

### Paso 1: Verificar conexión
Antes de construir, verificar que el MCP está activo:
```
Usar tools de query (list-pages, get-global-settings) para confirmar conexión.
```

### Paso 2: Definir estructura (desde oc-design)
El skill `oc-design` define:
- Tipo de página (Landing, Dashboard, App, etc.)
- Content plan (Hero → Features → CTA → etc.)
- Sistema de diseño (colores, tipografía, espaciado)
- Anti-slop rules aplicadas

### Paso 3: Materializar diseño en Elementor
Para cada sección del Content Plan:

```
1. create-page → Crear página con título
2. update-page-settings → Configurar template (Elementor Canvas/Full Width)
3. delete-page-content → Limpiar contenido default

4. POR CADA SECCIÓN:
   a. add-container → Container con layout adecuado
   b. add-heading → Título de sección
   c. add-text-editor → Texto descriptivo
   d. add-button → CTA si aplica
   e. add-image → Imagen si aplica
   f. update-container → Ajustar padding, gap, background

5. update-global-colors → Aplicar paleta de colores del diseño
6. update-global-typography → Aplicar tipografías del diseño
```

### Paso 4: Alternativa rápida — build-page
Para landing pages completas:
```
Usar build-page con un JSON declarativo que defina TODA la página.
Más rápido para páginas simples o cuando el diseño está completamente definido.
```

### Paso 5: Verificar en browser
- Abrir URL de la página en chrome-devtools
- Verificar que el diseño coincide con la spec
- Ajustar con update-element/batch-update según sea necesario


## Integración con oc-design

### Flujo combinado:
```
oc-design genera:
  1. Visual Thesis → mood de la página
  2. Content Plan → secciones ordenadas
  3. Color tokens → aplicados via update-global-colors
  4. Typography tokens → aplicados via update-global-typography
  5. Component specs → traducidos a llamadas de Elementor MCP

oc-elementor ejecuta:
  1. Crea la página
  2. Construye cada sección del Content Plan
  3. Aplica colores y tipografías
  4. Agrega imágenes stock si es necesario
  5. Verifica en browser
```

### Ejemplo: Landing Page

```
Diseño (oc-design):
  Style: linear
  Fonts: Geist (display), Geist (body)
  Colors: Zinc neutrals + Emerald accent
  Content: Hero split → Features zig-zag 2+1 → CTA full-width

Ejecución (oc-elementor):
  1. create-page("Mi Landing")
  2. update-page-settings(page_id, template="elementor_canvas")
  3. update-global-colors({
       primary: "#10b981",     // Emerald-500
       secondary: "#059669",   // Emerald-600
       text: "#18181b",        // Zinc-900
       accent: "#047857"       // Emerald-700
     })
  4. update-global-typography({
       primary: { family: "Geist", weight: 700 },
       secondary: { family: "Geist", weight: 400 },
       body: { family: "Geist", weight: 400 }
     })

  5. // HERO SECTION
     hero_container = add-container(page_id, type="flex", direction="row")
     hero_text = add-container(hero_container, width="50%")
     add-heading(hero_text, "Título Principal", tag="h1", size="xl")
     add-text-editor(hero_text, "Subtítulo descriptivo...")
     add-button(hero_text, "CTA Principal", url="#cta", style="primary")
     hero_image = add-container(hero_container, width="50%")
     add-stock-image(hero_image, "modern office workspace")

  6. // FEATURES (zig-zag)
     ...

  7. // CTA FINAL
     cta_section = add-container(page_id, background="emerald", padding="large")
     add-heading(cta_section, "¿Listo para empezar?", align="center")
     add-button(cta_section, "Comienza Ahora", url="/signup", size="lg")
```


## Reglas
- SIEMPRE verificar conexión antes de construir (list-pages o get-global-settings)
- Aplicar anti-slop rules de oc-design también en Elementor:
  - No usar fuentes genéricas → Geist/Outfit/Cabinet Grotesk
  - No AI purple aesthetic → Emerald/Cyan/Neutral accents
  - No 3 columnas iguales → 2+1 zig-zag
- Usar `build-page` para páginas simples (hero + features + cta)
- Usar tools individuales para páginas complejas (dashboard, multi-sección)
- SIEMPRE verificar en browser después de construir
- Si Elementor Pro no está disponible, usar solo widgets Free
- Las imágenes stock requieren Unsplash/Pexels API keys configuradas en el plugin
- Atomic Elements solo disponibles en Elementor 4.0+

## Conexión con otros skills
- **Antes**: `oc-design` (define el diseño) → `oc-specify` (define la página)
- **Durante**: `oc-qa` (verifica visualmente en browser)
- **Después**: `oc-ship` (publica/commitea cambios)
