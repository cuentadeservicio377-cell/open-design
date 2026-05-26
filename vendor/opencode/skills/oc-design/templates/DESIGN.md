# Design System: {{project_name}}

**Philosophy:** {{philosophy}}

**Visual Thesis:** {{visual_thesis}}

---

## Brand Identity

| Property | Value |
|----------|-------|
| Style Reference | `{{style_reference}}` |
| Primary Mode | `{{primary_mode}}` |
| Variance | `{{variance}}` / 10 |
| Motion | `{{motion}}` / 10 |
| Density | `{{density}}` / 10 |

---

## Color System

### Semantic Tokens — Dark Mode

| Token | Hex | Role |
|-------|-----|------|
| `--background` | `{{dark_background}}` | Page canvas |
| `--surface-1` | `{{dark_surface1}}` | Cards, elevated surfaces |
| `--surface-2` | `{{dark_surface2}}` | Nested surfaces |
| `--surface-3` | `{{dark_surface3}}` | Inputs, recessed elements |
| `--border` | `{{dark_border}}` | Subtle borders |
| `--border-visible` | `{{dark_border_visible}}` | Intentional borders |
| `--text-1` | `{{dark_text1}}` | Primary text |
| `--text-2` | `{{dark_text2}}` | Secondary text |
| `--text-3` | `{{dark_text3}}` | Tertiary text |
| `--text-4` | `{{dark_text4}}` | Disabled text |
| `--accent` | `{{dark_accent}}` | Primary interactive color |
| `--accent-hover` | `{{dark_accent_hover}}` | Accent on hover |
| `--accent-subtle` | `{{dark_accent_subtle}}` | Tinted bg for accent |
| `--success` | `{{dark_success}}` | Positive states |
| `--warning` | `{{dark_warning}}` | Caution states |
| `--error` | `{{dark_error}}` | Destructive states |

### Semantic Tokens — Light Mode

| Token | Hex | Role |
|-------|-----|------|
| `--background` | `{{light_background}}` | Page canvas |
| `--surface-1` | `{{light_surface1}}` | Cards, elevated surfaces |
| `--surface-2` | `{{light_surface2}}` | Nested surfaces |
| `--surface-3` | `{{light_surface3}}` | Inputs, recessed elements |
| `--border` | `{{light_border}}` | Subtle borders |
| `--border-visible` | `{{light_border_visible}}` | Intentional borders |
| `--text-1` | `{{light_text1}}` | Primary text |
| `--text-2` | `{{light_text2}}` | Secondary text |
| `--text-3` | `{{light_text3}}` | Tertiary text |
| `--text-4` | `{{light_text4}}` | Disabled text |
| `--accent` | `{{light_accent}}` | Primary interactive color |
| `--accent-hover` | `{{light_accent_hover}}` | Accent on hover |
| `--accent-subtle` | `{{light_accent_subtle}}` | Tinted bg for accent |
| `--success` | `{{light_success}}` | Positive states |
| `--warning` | `{{light_warning}}` | Caution states |
| `--error` | `{{light_error}}` | Destructive states |

### Accent Usage Rules

- One accent color only. Semantic colors (`success`, `warning`, `error`) supplement but never replace the accent.
- Accent at `{{dark_accent}}` / `{{light_accent}}` is used for: primary buttons, active states, links, focus rings, and interactive highlights.
- Never use `{{dark_accent}}` for large background fills — use `--accent-subtle` instead.
- Gray backgrounds with a single accent high-contrast element. No rainbow palettes.

---

## Typography

### Font Families

| Role | Family | Fallback |
|------|--------|----------|
| Display | `{{font_display}}` | `{{font_display_fallback}}` |
| Body | `{{font_body}}` | `{{font_body_fallback}}` |
| Mono | `{{font_mono}}` | `{{font_mono_fallback}}` |

**Google Fonts import:** `{{google_fonts_url}}`

### Type Scale

| Token | Size | Weight | Line-height | Letter-spacing | Use |
|-------|------|--------|-------------|----------------|-----|
| `--text-display` | `{{display_size}}` | `{{display_weight}}` | `{{display_line_height}}` | `{{display_letter_spacing}}` | Page headlines, hero text |
| `--text-h1` | `{{h1_size}}` | 600 | 1.15 | -0.02em | Section headers |
| `--text-h2` | `{{h2_size}}` | 600 | 1.2 | -0.01em | Sub-headers |
| `--text-h3` | `{{h3_size}}` | 500 | 1.3 | 0em | Card titles |
| `--text-body` | `{{body_size}}` | `{{body_weight}}` | `{{body_line_height}}` | 0em | Paragraphs, descriptions |
| `--text-caption` | 12px | 400 | 1.5 | 0.01em | Labels, metadata |
| `--text-mono` | `{{mono_size}}` | `{{mono_weight}}` | `{{mono_line_height}}` | 0em | Code, timestamps, data |

### Pairing Rationale

{{typography_pairing_rationale}}

### Banned Fonts

- `Inter` — banned in premium contexts. Use `{{font_display}}` instead.
- `Roboto` — banned. Generic, Android vibe.
- `System UI` — banned as primary. Define an explicit stack.
- Serif in dashboards/software UI — banned. Use only for editorial/creative contexts.
- `h1` size > 72px — banned. Use `clamp()` for fluid scale instead.

---

## Spacing & Layout

### Spacing Scale

| Token | Value | Use |
|-------|-------|-----|
| `--space-2xs` | 2px | Inline gaps, icon padding |
| `--space-xs` | 4px | Tight element spacing |
| `--space-sm` | 8px | Compact gaps |
| `--space-md` | 16px | Standard padding |
| `--space-lg` | 24px | Section inner padding |
| `--space-xl` | 32px | Section gaps |
| `--space-2xl` | 48px | Major section spacing |
| `--space-3xl` | 64px | Page-level spacing |
| `--space-4xl` | 96px | Hero-level spacing |

### Grid System

| Property | Value |
|----------|-------|
| Container max-width | `{{container_max_width}}` |
| Grid columns | `{{grid_columns}}` |
| Grid gutter | `{{grid_gutter}}` |
| Container padding (mobile) | 1rem |
| Container padding (tablet) | 2rem |
| Container padding (desktop) | 4rem |

### Variance Mapping

| Variance Level | Layout Approach |
|----------------|-----------------|
| 1–3 | Centered, symmetrical, equal padding |
| 4–7 | Offset, varied ratios, left-aligned headers |
| 8–10 | Masonry, asymmetric grids, massive whitespace |

Current variance: **`{{variance}}`** → `{{variance_approach}}`

### Layout Rules

- Grid-first: CSS Grid for all structural layouts. Never flexbox percentage math.
- Feature sections: The "3 equal cards in a row" pattern is banned. Use 2+1 zig-zag, bento grid, or horizontal scroll.
- Containment: All content within `max-width: {{container_max_width}}`, centered.
- Full-height: Use `min-height: 100dvh` — never `height: 100vh`.
- No overlapping elements. Clean spatial zones.

---

## Components

### Button Variants

#### Primary Button
```css
.btn-primary {
  background: var(--accent);
  color: #FFFFFF;
  padding: {{btn_primary_padding}};
  border-radius: {{btn_primary_radius}}px;
  font-weight: {{btn_primary_font_weight}};
  border: none;
}
.btn-primary:hover { background: var(--accent-hover); }
.btn-primary:active { transform: translateY(-1px); }
```

#### Secondary Button
```css
.btn-secondary {
  background: transparent;
  color: var(--text-1);
  padding: {{btn_secondary_padding}};
  border-radius: {{btn_secondary_radius}}px;
  font-weight: 500;
  border: 1px solid var(--border-visible);
}
.btn-secondary:hover { background: var(--surface-1); }
.btn-secondary:active { transform: translateY(-1px); }
```

#### Ghost Button
```css
.btn-ghost {
  background: transparent;
  color: var(--accent);
  padding: 8px 12px;
  border-radius: {{btn_primary_radius}}px;
  font-weight: 500;
  border: none;
}
.btn-ghost:hover { background: var(--accent-subtle); }
```

### Card Types

#### Standard Card
```css
.card {
  background: var(--surface-1);
  border: 1px solid var(--border);
  border-radius: {{card_radius}}px;
  padding: var(--space-md);
}
```

#### Flat Card (for dense dashboards, density > 7)
```css
.card-flat {
  background: transparent;
  border-top: 1px solid var(--border);
  padding: var(--space-md) 0;
}
```

#### Elevated Card
```css
.card-elevated {
  background: var(--surface-1);
  border: 1px solid var(--border);
  border-radius: {{card_radius}}px;
  padding: var(--space-lg);
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.05);
}
```

### Input Styles

```css
.input {
  background: var(--surface-3);
  border: 1px solid var(--border);
  border-radius: {{input_radius}}px;
  padding: 10px 12px;
  font-size: 14px;
  color: var(--text-1);
}
.input:focus {
  border-color: var(--accent);
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
.input::placeholder { color: var(--text-4); }
```

### Navigation

- Sticky header with `backdrop-filter: blur(8px)` and `background: rgba(var(--bg-rgb), 0.8)`
- Horizontal nav on desktop, slide-in or overlay on mobile
- Maximum 6 primary nav items
- Active state: accent underline or accent text color

---

## Interaction States

### Hover
- Buttons: `transform: translateY(-1px)` (tactile push, not `scale(0.95)`)
- Cards: subtle `background` shift (no glow, no shadow increase)
- Links: accent color, underline
- Transition: `all 0.3s cubic-bezier(0.16, 1, 0.3, 1)`

### Focus
- `outline: 2px solid var(--accent)`
- `outline-offset: 2px`
- Never `outline: none` without a replacement

### Active
- `transform: translateY(-1px)` or `scale(0.98)` for tactile press
- Transition: `0.1s ease-out`

### Disabled
- `opacity: 0.4`
- `pointer-events: none`
- `cursor: not-allowed`

---

## Motion Choreography

| Motion | Trigger | Duration | Easing | Spring |
|--------|---------|----------|--------|--------|
| {{motion_1_name}} | {{motion_1_trigger}} | {{motion_1_duration}} | {{motion_1_easing}} | — |
| {{motion_2_name}} | {{motion_2_trigger}} | {{motion_2_duration}} | {{motion_2_easing}} | — |
| {{motion_3_name}} | {{motion_3_trigger}} | {{motion_3_duration}} | {{motion_3_easing}} | — |

### Motion Dial Mapping

| Level | Approach |
|-------|----------|
| 1–3 | No animations. CSS `:hover`/`:active` only |
| 4–7 | CSS transitions. `transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1)` |
| 8–10 | Framer Motion, spring physics. `stiffness: 100, damping: 20` |

Current motion: **`{{motion}}`** → `{{motion_approach}}`

### Performance Rules

- Animate ONLY `transform` and `opacity`. Never `top`, `left`, `width`, `height`.
- `useMotionValue` for continuous animations. NEVER `useState` for animation loops.
- Grain/noise on fixed, `pointer-events: none` elements only.
- `will-change` only on elements that actually animate.

### Z-Index System

| Token | Value | Use |
|-------|-------|-----|
| `--z-base` | 0 | Normal flow |
| `--z-dropdown` | 10 | Dropdowns |
| `--z-sticky` | 50 | Sticky headers |
| `--z-modal` | 100 | Modals, dialogs |
| `--z-toast` | 150 | Toast notifications |
| `--z-tooltip` | 200 | Tooltips |

---

## Responsive Breakpoints

| Name | Min-width | Grid | Layout |
|------|-----------|------|--------|
| `xs` | 0px (375px baseline) | 4 columns | Single column, full-width |
| `sm` | 640px | 4 columns | Single column, compact |
| `md` | 768px | 8 columns | Two-column begins |
| `lg` | 1024px | 12 columns | Full layout |
| `xl` | 1280px | 12 columns | Extended layout |
| `2xl` | 1440px | 12 columns | Container max-width |

### Mobile-First Rules

- All layouts collapse to single column below `md` (768px)
- `width: 100%`, `padding: 1rem`, `gap: 1.5rem` on mobile
- No horizontal scroll — critical failure
- Body text never below 14px
- Headlines use `clamp()` for fluid scaling
- Touch targets minimum 44px
- Images scale proportionally
- Navigation collapses to mobile menu (slide-in or full-screen overlay)

---

## Iconography

| Property | Value |
|----------|-------|
| Icon set | `{{icon_set}}` |
| Stroke width | `{{icon_stroke_width}}` |
| Default size | 20px |
| Small size | 16px |
| Large size | 24px |
| Icon color | `var(--text-2)` (default), `var(--accent)` (interactive) |

Standardize `strokeWidth` globally — never mix stroke widths within a project.

---

## Page Types

### Landing Page

```
┌──────────────────────────────────────┐
│ Navigation (sticky, blur backdrop)    │
├──────────────────────────────────────┤
│ Hero Section                          │
│ — Headline + subtext + CTA           │
│ — Hero stage (see {{hero_stage_preset}}) │
├──────────────────────────────────────┤
│ Social Proof (2–3 items, asymmetric)  │
├──────────────────────────────────────┤
│ Features (bento grid, NOT 3-equal)    │
├──────────────────────────────────────┤
│ Testimonial / Detail Section          │
├──────────────────────────────────────┤
│ Final CTA (hero stage may echo)       │
├──────────────────────────────────────┤
│ Footer                               │
└──────────────────────────────────────┘
```

### Dashboard

```
┌───────┬──────────────────────────────┐
│ Sidebar│ Header bar (sticky)          │
│        ├──────────────────────────────┤
│        │ KPI cards (2+1 bento)        │
│        │ Charts area                  │
│        │ Data table                   │
│        │ Detail panels                │
└────────┴──────────────────────────────┘
```

### Form Page

```
┌──────────────────────────────────────┐
│ Header with progress indicator       │
├──────────────────────────────────────┤
│ Form section (max-width: 600px)      │
│ — Label above input                  │
│ — Helper text below input            │
│ — Error text in --error color        │
│ — Inline validation                  │
├──────────────────────────────────────┤
│ Action bar (sticky bottom)           │
└──────────────────────────────────────┘
```

---

## Anti-Patterns to Avoid

See `references/anti-slop-rules.md` for the complete list. Summary:

### Visual
- No purple/blue AI aesthetic, no neon outer glows
- No pure black `#000000` — use `{{dark_background}}`
- No oversaturated accents above 80% saturation

### Typography
- No `Inter` in premium contexts — use `{{font_display}}`
- No `h1` > 72px — use `clamp()`
- No serif in dashboards

### Layout
- No 3-column equal card layouts — use asymmetric grids
- No `h-screen` — use `min-h-[100dvh]`
- No overlapping elements

### Content
- No generic names ("John Doe", "Acme Corp")
- No fake round numbers (99.99%, 50%)
- No AI filler words ("Elevate", "Seamless", "Unleash", "Next-Gen")

### Interaction
- No `useState` for continuous animations
- No arbitrary `z-index` values
- No `scale(0.95)` on `:active` — use `translateY(-1px)`

---

## Hero Stage

| Property | Value |
|----------|-------|
| Preset | `{{hero_stage_preset}}` |
| Background medium | `{{hero_bg_medium}}` |
| Hero subject | `{{hero_subject}}` |
| Relation type | `{{hero_relation_type}}` |

See `references/hero-stage.md` for full composition rules.

---

## Pre-Flight Checklist

Before shipping:

- [ ] No `Inter` font in premium contexts
- [ ] No purple/blue AI aesthetic
- [ ] No `#000000` pure black — using `{{dark_background}}`
- [ ] No 3-column equal card layouts
- [ ] No generic names or fake round numbers
- [ ] No AI filler words
- [ ] Viewport stable on mobile (`min-h-[100dvh]`)
- [ ] Animations use `transform`/`opacity` only
- [ ] Z-index values are systematic
- [ ] Empty/loading/error states exist
- [ ] Hero stage matches preset `{{hero_stage_preset}}`
- [ ] All semantic tokens defined and used
- [ ] Responsive at 375px, 768px, 1024px, 1440px
- [ ] `prefers-reduced-motion` respected
- [ ] Touch targets minimum 44px
- [ ] Focus rings visible on all interactive elements