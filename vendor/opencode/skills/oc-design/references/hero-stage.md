# Hero Stage Presets

Brands don't just have backgrounds — they have **hero stages**. A hero stage is the composed visual behind the first impression: a background layer, an optional hero subject, and a defined relation between the two. This file documents the 9 presets that cover the current design landscape, with composition rules for each.

## Two-layer model

```
  ┌─ hero subject (optional) ─┐
  │                           │
  │    ← relation layer →     │   glow / halo / reflection / emissive / shadow / flat
  │                           │
  └─ background field ────────┘
```

When `hero.subject: none`, the stage collapses to just a background — that is a first-class choice. When a hero subject is present, the relation layer makes it feel native to the stage vs. pasted on top.

---

## 1. luminous-on-gradient

**Brands:** Stripe, Revolut, Cursor

A single glowing abstract form floats on a rich gradient background. The subject emits light from within, bleeding warmth into the field. This is the signature look for AI products, dev tools, and anything that wants to feel like it has an energy source at its core.

### Description
A luminous sphere or disc sits at or near the center of a radial gradient. The gradient colors come from the brand palette, and the subject bleeds its own light into the background via a glow relation. The effect is magnetic — the eye is drawn to the light source immediately. No ground contact, no shadows, no physicality. Pure energy.

### Background rules
| Dial | Value |
|------|-------|
| `medium` | `gradient` |
| `color_mode` | `palette` or `brand-tinted-neutral` |
| `saturation` | `vibrant` |
| `intensity` | `bold` start, but alpha values tuned to `subtle` to protect headline legibility |
| `light_source` | `center` (matches subject position) |
| `falloff` | `radial` |
| `vignette` | `subtle` |
| `texture` | `clean` |
| `motion` | `static` or `drift` |

Background CSS: radial gradient with 2–3 brand hues, starting at ~50% alpha and fading to transparent. Apply `filter: blur(40-80px)` for mesh-like softness when more color variety is needed.

### Hero subject rules
- `subject`: `luminous`
- `form`: `sphere` (default), `disc`, or `ring`
- `placement`: `center` or `off-center-left` / `off-center-right`
- `scale`: `balanced` (default) or `dominant`
- `tint`: `gradient-from-palette`

The luminous object uses radial gradients with specular highlight spots, inner shadows for depth, and a hot center-to-edge color walk from bright to dark brand hues.

### Relation to background
- `type`: `glow` (canonical) or `emissive`
- `bleed`: 50–70

The glow sits behind the subject, in front of the background. It's a diffused radial wash in the subject's hue, blurred 40–80px, using `mix-blend-mode: screen`. This creates the "bleeding light" effect that ties subject to field.

### Typography rules
- Position: Centered above or overlapping the subject, or offset to a calm edge when subject is dominant
- Alignment: `center` when above, `left` when offset
- Size: Display at `clamp(2.25rem, 5vw, 3.75rem)`. Never larger than 72px
- Headline must have its own text shadow or backdrop when overlapping the glow zone

### CTA placement rules
- Single primary CTA below headline
- Maximum one button. No secondary "Learn more" link
- CTA uses `accent` fill with white text

### Mobile adaptation rules
- Subject scales down to 180–220px
- Gradient simplifies to 2 colors max
- Headline alignment shifts to `left`
- Glow bleed reduced by 40%
- `min-h-[100dvh]` with `flex` column layout, subject below text

### Best diales ranges
| Dial | Ideal range | Notes |
|------|------------|-------|
| `variance` | 5–8 | Asymmetric placement of subject reads best |
| `motion` | 5–8 | Subtle drift on subject + glow keeps it alive |
| `density` | 1–5 | Sparse layouts let the glow breathe |

### Anti-patterns
- Never give a luminous subject a ground shadow or floor reflection — light has no floor
- Never use `type: shadow-only` or `type: reflection` with a luminous subject
- Never center small text directly inside the light ball — always offset
- Never use `intensity: blown-out` as default — start at `subtle` and increase
- Never use `form: freeform` with luminous — stick to geometric primitives

---

## 2. device-on-mesh

**Brands:** Linear, Figma

A product screenshot or abstracted device window floats on a multi-hue mesh gradient background. The device feels physically separate from the field — it sits on top, not embedded. The mesh provides color and energy underneath while the device shows the product clearly.

### Description
A rectangular device mockup (browser window, app frame, dashboard) is positioned in the hero, usually off-center or right-aligned. Behind it, overlapping blurred gradients create a rich, painterly mesh. The device casts a soft shadow but does not glow into the background — the relation is flat. This is the go-to for SaaS products, issue trackers, and anything that needs to show the UI itself as the hero.

### Background rules
| Dial | Value |
|------|-------|
| `medium` | `mesh` |
| `color_mode` | `palette` or `brand-tinted-neutral` |
| `saturation` | `muted` to `vibrant` |
| `intensity` | `subtle` |
| `light_source` | `off-center-left` or `ambient` |
| `falloff` | `soft` |
| `vignette` | `subtle` or `off` |
| `texture` | `clean` |
| `motion` | `static` |

Background CSS: 4–6 overlapping radial gradients with `filter: blur(60-80px)`, positioned at corners and edges (not center). Each gradient uses a different brand hue at 30–50% alpha. The mesh provides atmosphere without competing with the device.

### Hero subject rules
- `subject`: `device`
- `placement`: `off-center-right` (default), `center`, or `off-center-left`
- `scale`: `balanced` or `dominant`
- `tint`: `neutral`

The device is an abstracted browser/app frame with simplified UI rows, not a real screenshot. It uses `var(--surface1)` fill with `var(--border)` outline and subtle drop shadow. border-radius matches the brand's `component` radius.

### Relation to background
- `type`: `flat` (canonical) — the device sits on top with no light interaction
- `bleed`: 0

A simple drop shadow (`0 40px 80px rgba(0,0,0,0.15)`) is acceptable for grounding. No glow, no halo, no emissive bleed. The mesh and device are independent layers.

### Typography rules
- Position: Left-aligned, to the left of the device (split-screen layout)
- Alignment: `left`
- Size: Display at `clamp(2rem, 4.5vw, 3.5rem)`
- Hero text sits on the calm side of the mesh, never on top of a hot gradient spot

### CTA placement rules
- Below headline text, left-aligned
- Primary CTA + optional secondary ghost button
- CTA buttons are inline, not stacked

### Mobile adaptation rules
- Device drops below headline, full-width, aspect ratio preserved
- Mesh gradient simplifies: reduce from 4–6 colors to 2–3
- Headline takes full width, left-aligned
- Layout collapses to single column `flex-col`

### Best diales ranges
| Dial | Ideal range | Notes |
|------|------------|-------|
| `variance` | 4–7 | Offset device placement |
| `motion` | 3–6 | Static or subtle CSS transitions |
| `density` | 4–7 | Medium density works well with the information-dense device |

### Anti-patterns
- Never make the device glow or emit light — it's a product window, not a light source
- Never use `type: emissive` or `type: glow` with device subject
- Never place headline text overlapping the device content area
- Never use `intensity: blown-out` on the mesh — it fights the device UI
- Never show real product screenshots in the device frame during design — use abstracted rows

---

## 3. painterly-no-hero

**Brands:** Apple, Ferrari

Rich, abstract, soft-edged visual art fills the entire background. There is no hero subject — the art IS the experience. This creates an emotional, editorial, almost cinematic first impression. The typography sits directly on the art, protected by careful placement or subtle scrims.

### Description
The background uses SVG feTurbulence filters combined with displaced gradient layers to create a hand-painted, organic look. Warm and muted colors blend softly across the field. The result is timeless and aspirational — more like a gallery wall than a tech product. When `hero.subject: none`, everything lives in the background, and typography must be carefully placed in calm zones.

### Background rules
| Dial | Value |
|------|-------|
| `medium` | `painterly` |
| `color_mode` | `palette` or `brand-tinted-neutral` |
| `saturation` | `muted` |
| `intensity` | `subtle` |
| `light_source` | `ambient` |
| `falloff` | `soft` |
| `vignette` | `subtle` |
| `texture` | `paint` |
| `motion` | `static` |

Background CSS: SVG `feTurbulence` with `baseFrequency: 0.008–0.02`, `numOctaves: 3`, `scale: 30–80`, plus 3–4 radial gradient layers at low alpha (0.15–0.25). Apply `feDisplacementMap` for organic distortion and `feGaussianBlur` for softness.

### Hero subject rules
- `subject`: `none` — the background is the hero
- No device, no object, no luminous form

The painterly field itself provides all the visual interest. Adding a subject would compete and dilute the effect.

### Relation to background
- `type`: `flat`
- `bleed`: 0

No relation layer — there is no subject to relate.

### Typography rules
- Position: Centered or offset into a calm zone of the painting
- Alignment: `center` for minimal layouts, `left` for editorial
- Size: Display at `clamp(2.5rem, 6vw, 4rem)` — large, confident type
- Text color must be white or near-white on dark painterly, dark on light painterly
- Use `text-shadow: 0 2px 20px rgba(0,0,0,0.4)` for legibility insurance

### CTA placement rules
- Single CTA below headline, generous whitespace
- CTA is minimal: text link or ghost button, not a chunky pill
- Maximum visual breathing room around the CTA

### Mobile adaptation rules
- Painterly background zooms to fill viewport (scale 120%)
- Headline reduces to mobile-appropriate size
- CTA remains centered
- Vignette strengthens on mobile for text legibility

### Best diales ranges
| Dial | Ideal range | Notes |
|------|------------|-------|
| `variance` | 2–5 | Calm, symmetrical layouts complement the art |
| `motion` | 1–4 | Static or minimal transitions — art speaks for itself |
| `density` | 1–3 | Maximum air, gallery feel |

### Anti-patterns
- Never add a hero subject — the art IS the subject
- Never use `type: glow` or `type: emissive` — there's nothing to glow
- Never place text on a busy/hot area of the painting — use `safe_zone: masked-for-text`
- Never use `saturation: vibrant` or `intensity: blown-out` — painterly works because it's restrained
- Never add grain/noise texture on top — the feTurbulence already provides texture

---

## 4. grid-on-dark

**Brands:** Vercel, Raycast

A subtle dot-grid or line-grid pattern on a dark background with a clean content panel in the center. This is the developer platform aesthetic — precise, technical, and zero-nonsense. The grid provides visual texture without decoration; the content panel does all the work.

### Description
The background is a dark solid (`neutral.950` or similar) with an SVG pattern overlay of evenly-spaced dots or thin lines. A radial mask fades the pattern at the edges to prevent "wall of dots". A single product window or content panel sits centered, 功能ally separate from the grid. The overall effect is architectural and competent — like a blueprint.

### Background rules
| Dial | Value |
|------|-------|
| `medium` | `pattern` |
| `color_mode` | `monochrome` |
| `saturation` | `flat` |
| `intensity` | `subtle` |
| `light_source` | `ambient` or `corner` |
| `falloff` | `radial` (controls pattern fade) |
| `vignette` | `subtle` |
| `texture` | `clean` |
| `motion` | `static` |

Background CSS: Dark base with SVG dot pattern (16–48px grid spacing, 1.2px dot radius, `opacity: 0.3–0.5`). Apply `mask-image: radial-gradient(ellipse at center, black 40%, transparent 85%)` to fade edges. Optionally add a faint accent-colored gradient glow at a corner.

### Hero subject rules
- `subject`: `device` or `composition` — optional
- `placement`: `center`
- `scale`: `balanced`
- `tint`: `neutral`

Many grid-on-dark pages have no hero subject at all — just the grid background with centered text. When a subject is included, it's a device window or an icon composition, always clean and minimal.

### Relation to background
- `type`: `shadow-only` or `flat`
- `bleed`: 0

The subject is grounded via a simple drop shadow (`0 40px 60px rgba(0,0,0,0.25)`) without any light interaction. The grid doesn't react to the subject.

### Typography rules
- Position: Centered above or inside the content panel
- Alignment: `center` (default for this preset) or `left` inside a panel
- Size: Display at `clamp(2rem, 5vw, 3.5rem)`
- Monospace accents for technical details (version numbers, CLI commands)
- Font choice: Geist, SF Pro, or similar clean sans-serif — never decorative

### CTA placement rules
- Single primary CTA centered below headline
- Ghost button or minimal border style acceptable for secondary
- CTA buttons with `border-radius: 0` or minimal radius match the grid precision aesthetic

### Mobile adaptation rules
- Grid pattern scales up (dot size ×1.5, spacing ×1.5) to stay readable
- Content panel becomes full-width
- Headline shifts to `left` alignment
- Accent glow simplifies or removes

### Best diales ranges
| Dial | Ideal range | Notes |
|------|------------|-------|
| `variance` | 2–4 | Symmetric, centered layouts match the grid precision |
| `motion` | 2–5 | Minimal or no animation |
| `density` | 4–7 | Medium-high density works well with the structured grid |

### Anti-patterns
- Never use `type: glow` or `type: emissive` — the grid aesthetic rejects decoration
- Never use `color_mode: palette` or bold multi-color gradients — monochrome only
- Never use `saturation: vibrant` — the grid's power is its restraint
- Never use `medium: mesh` or `medium: painterly` — those are different presets
- Never overcrowd the grid zone with competing UI elements

---

## 5. object-on-spotlight

**Brands:** Lamborghini, Airbnb

A single physical object sits on a dark stage under a dramatic top spotlight, with a contact shadow grounding it. This is the premium hardware aesthetic — products that have physical presence and demand attention through form, not flash. The stage is almost black; the spotlight and the object are everything.

### Description
The background is near-black (`neutral.950` or custom dark) with a tight, warm radial spotlight positioned directly above the subject. The subject renders as a generic warm metallic form (vertical pill, horizontal disc, or soft capsule) — a decorative placeholder that holds the slot. Before shipping, the user replaces this with their actual 3D render or product photography. The contact shadow and reflection zone are production-ready and carry over to the final asset.

### Background rules
| Dial | Value |
|------|-------|
| `medium` | `gradient` |
| `color_mode` | `brand-tinted-neutral` or `monochrome` |
| `saturation` | `muted` |
| `intensity` | `bold` (exception: hardware launches warrant bold) |
| `light_source` | `top` (critical: top, not center — stage is lit from above) |
| `falloff` | `radial` |
| `vignette` | `strong` |
| `texture` | `clean` |
| `motion` | `static` |

Background CSS: Near-black base with a warm, tight radial gradient positioned at the top-center (`radial-gradient(ellipse 60% 40% at 50% 0%, rgba(r,g,b,0.15), transparent 70%)`). The spotlight is narrow and top-oriented, mimicking a studio light.

### Hero subject rules
- `subject`: `object`
- `placement`: `center`
- `scale`: `dominant`
- `tint`: `metallic` or `neutral`
- `form`: vertical pill (default), horizontal disc, or soft capsule at an angle

The object renders as a generic warm metallic form with top-lit highlights and deep base shadows. It includes:
- Specular highlight at ~15–20% from top
- Deep wrap shadows on both sides
- Contact shadow below (ellipse, blurred)
- Optional vertical reflection zone fading below

### Relation to background
- `type`: `shadow-only` (canonical) — objects don't emit light
- Optional: `reflection` for Apple-style floor mirrors
- `bleed`: 0

The relation layer is purely the contact shadow and optional reflection. No glow, no emissive light — physical objects receive light, they don't generate it.

### Typography rules
- Position: Left-aligned, to the side or above the object (never overlapping)
- Alignment: `left`
- Size: Display at `clamp(3rem, 7vw, 6rem)` — larger than most presets; luxury commands space
- Generous letter-spacing on display: `-0.04em` to `-0.06em`
- Body text minimal — one line or none in the hero

### CTA placement rules
- Single line CTA below headline
- Ghost/outline style preferred over filled button
- CTA font-weight: 400–500, never bold
- Maximum whitespace between object and CTA

### Mobile adaptation rules
- Object scales down to 60% of desktop size
- Typography reduces with `clamp()`
- Layout swaps to: text on top, object below
- Spotlight narrows and intensifies slightly on mobile
- Alternative: hide object on mobile, show only spotlight + text

### Best diales ranges
| Dial | Ideal range | Notes |
|------|------------|-------|
| `variance` | 2–5 | Controlled, centered compositions |
| `motion` | 3–6 | Slow, cinematic transitions if any |
| `density` | 1–3 | Ultra-sparse — the object needs breathing room |

### Anti-patterns
- Never use `type: glow` or `type: emissive` — physical objects don't emit light
- Never use `luminous` as the subject — it contradicts the physical grounding
- Never brighten the overall background — the spotlight must be the only light source
- Never add decorative elements around the object — spotlight stage is intentionally empty
- Never use `color_mode: palette` — the stage color must be nearly monochrome

---

## 6. editorial-photo

**Brands:** Notion, Spotify

Full-bleed photography or rich imagery with text overlaid. The image does the emotional heavy lifting; typography sits on top with protection masks. This is the lifestyle and media brand hero — connecting through real imagery rather than abstract geometry.

### Description
A high-quality photograph or illustration fills the entire hero viewport. Text is overlaid with a scrim gradient (bottom-up or directional) to ensure legibility. The photo is not a decoration — it IS the page. When the actual image isn't available yet, render an honest labeled placeholder (never a fake stock photo).

### Background rules
| Dial | Value |
|------|-------|
| `medium` | `photo` (placeholder with prose description during design) |
| `color_mode` | derived from the photo palette |
| `saturation` | `vibrant` (let the photo speak) |
| `intensity` | `bold` |
| `light_source` | derived from the photo |
| `falloff` | `soft` |
| `vignette` | `subtle` or `off` |
| `texture` | `clean` |
| `motion` | `static` |

Background implementation: full-bleed `<img>` with `object-fit: cover`. A gradient scrim overlay protects text: `linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)`. During design, use a labeled placeholder div with a warm gradient and centered description text.

### Hero subject rules
- `subject`: `photo-cutout` or `none`
- `placement`: full-bleed background
- `scale`: N/A (background is the hero)
- `tint`: derived from photo colors

The photo is the hero. If a cutout subject (person, product) is needed, `photo-cutout` renders as a prose placeholder until the real asset is available.

### Relation to background
- `type`: `flat`
- `bleed`: 0

No relation layer — the photo provides all the visual energy. Text sits on a scrim, not on a subject.

### Typography rules
- Position: Bottom-left or bottom-center (overlaid on scrim)
- Alignment: `left` (default) or `center` (for centered brand compositions)
- Size: Display at `clamp(2.5rem, 6vw, 5rem)` — large and confident
- Text color: white, always — the scrim ensures contrast
- Line height: 1.05–1.15 for maximum impact
- Optional: large serif display font for editorial brands

### CTA placement rules
- Single CTA at the bottom of the text block
- Style: white outline button or white text button
- CTA must sit within the scrim zone for guaranteed contrast
- Never more than one CTA

### Mobile adaptation rules
- Photo crops intelligently (use `object-position: center top`)
- Scrim gradient strengthens on mobile (0.9 alpha floor)
- Headline reduces with `clamp()`
- CTA button becomes full-width
- Consider photo swap for mobile (taller crop or different orientation)

### Best diales ranges
| Dial | Ideal range | Notes |
|------|------------|-------|
| `variance` | 3–7 | Photo-centered layouts can be centered or asymmetric |
| `motion` | 2–5 | Photo is the motion — keep UI transitions subtle |
| `density` | 1–4 | Let the photo breathe |

### Anti-patterns
- Never use a fake stock photo placeholder — use an honest labeled prose placeholder
- Never add `type: glow` or `type: emissive` — the photo provides all visual energy
- Never use `intensity: blown-out` — protect photo quality
- Never overlay text without a scrim — legibility is non-negotiable
- Never use `color_mode: monochrome` unless intentionally desaturating the photo
- Never hotlink Unsplash or external image URLs — download and host locally

---

## 7. shader-ambient

**Brands:** Framer, Cursor

A subtle, continuously moving 3D shader or ambient background creates an alive, generative feel. Not a static image — an evolving field. The shader runs at low intensity, providing atmosphere without distracting from content. This is for creative tools, generative apps, and products that want to signal movement and intelligence.

### Description
A WebGL shader or CSS-based ambient animation fills the background with slow, breathing motion. Think: slowly morphing color fields, gentle noise displacement, or subtle particle drift. The movement is perpetual but never attention-grabbing. It creates a sense of "the product is alive" without demanding focus.

### Background rules
| Dial | Value |
|------|-------|
| `medium` | `shader` |
| `color_mode` | `palette` or `brand-tinted-neutral` |
| `saturation` | `muted` |
| `intensity` | `subtle` (always start subtle — this is ambient, not a screensaver) |
| `light_source` | `ambient` or `drift` |
| `falloff` | `soft` |
| `vignette` | `subtle` |
| `texture` | `clean` (shader provides its own) |
| `motion` | `drift` or `pulse` |

Background implementation: WebGL `<canvas>` with a fragment shader that runs continuously. The shader must use `requestAnimationFrame`, never block the main thread, and degrade gracefully to a static gradient on low-powered devices. Shader uniforms map to `light_source`, `vignette`, `intensity`, and `motion` dials.

### Hero subject rules
- `subject`: `none` or `luminous`
- When `none`: the shader IS the hero
- When `luminous`: a small accent orb floats in the field, synced with shader motion
- `placement`: `center` or `off-center-right`
- `scale`: `accent` (never dominant — the shader owns the space)
- `tint`: `gradient-from-palette`

### Relation to background
- When `subject: none`: `type: flat`, `bleed: 0`
- When `subject: luminous`: `type: glow`, `bleed: 30`
- The glow is subtle and blended with the shader — not a separate halo

### Typography rules
- Position: Centered or left-aligned over the shader, with backdrop blur protection
- Alignment: `center` or `left`
- Size: Display at `clamp(2rem, 5vw, 3.5rem)`
- Use `backdrop-filter: blur(8px)` on text container for legibility
- Background: `rgba(var(--bg-rgb), 0.6)` with blur

### CTA placement rules
- Single CTA below headline text
- Style: accent-filled button with slight glow on hover
- CTA container has its own backdrop blur for guaranteed contrast

### Mobile adaptation rules
- Shader resolution reduces to 50% for performance
- Or: replace shader with a static gradient on mobile as fallback
- Text container increases backdrop blur opacity on mobile
- Headline shifts to `left` alignment

### Best diales ranges
| Dial | Ideal range | Notes |
|------|------------|-------|
| `variance` | 6–9 | Asymmetric compositions complement the organic shader |
| `motion` | 7–10 | Motion is the point — must be at least perceptible |
| `density` | 3–6 | Medium density lets the shader breathe |

### Anti-patterns
- Never use `intensity: blown-out` — the shader must remain ambient, not distracting
- Never use `medium: photo` or `medium: painterly` — those are different presets
- Never block the main thread with shader computation — use offscreen canvas or reduce resolution
- Never make the shader the only content — users came for functionality, not art
- Never skip the `prefers-reduced-motion` media query — must degrade to static gradient
- Never put text directly on the shader without a blur/pattern backdrop

---

## 8. flat-blank

**Brands:** tech-minimal, corporate

No background decoration whatsoever. A solid color fills the hero — nothing else. This is the most understated hero stage: the typography and spacing do 100% of the work. for writing tools, documentation sites, minimal SaaS, and any brand that rejects decoration on principle.

### Description
The background is `var(--background)` — a single solid color. No gradients, no patterns, no meshes, no noise. The absence is load-bearing. It communicates clarity, intention, and restraint. Every element must earn its place through typography, spacing, and content quality.

### Background rules
| Dial | Value |
|------|-------|
| `medium` | `absent` |
| `color_mode` | N/A (just the background token) |
| `saturation` | `flat` |
| `intensity` | N/A |
| `light_source` | `none` or `ambient` |
| `vignette` | `off` |
| `texture` | `clean` |
| `motion` | `static` |

Background: `background: var(--background);` — that's it. Do NOT decorate "because it feels empty." The blankness is intentional.

### Hero subject rules
- `subject`: `composition` (icon arrangement) or `none`
- When `composition`: icon-stack of 3 overlapping cards with brand icons
- `placement`: `center` or `off-center-right`
- `scale`: `accent`
- `tint`: `brand`

Content-focused brands use `none`; product-focused brands use `composition` with a small icon arrangement.

### Relation to background
- `type`: `flat`
- `bleed`: 0

No relation layer. On a flat background, even a shadow would feel like an impostor.

### Typography rules
- Position: Centered or left-aligned, maximum whitespace
- Alignment: `center` for minimal brands, `left` for tech brands
- Size: Display at `clamp(2.25rem, 5.5vw, 4rem)` — type is the only visual element
- Letter-spacing: Extra-tight (`-0.03em` to `-0.05em`) for headlines
- Line-height: Compressed (1.05–1.15) for maximum typographic impact
- Font weight: 600–700 for display, 400 for body

### CTA placement rules
- Single CTA, centered or left-aligned
- Style: minimal — either accent fill with sharp radii or ghost outline
- Subtext or description line optional but brief

### Mobile adaptation rules
- Nothing changes structurally — flat-blank is already the simplest layout
- Headline reduces with `clamp()`
- Description text may be hidden on very small screens
- CTA becomes full-width on mobile

### Best diales ranges
| Dial | Ideal range | Notes |
|------|------------|-------|
| `variance` | 1–4 | Simmetry and order reinforce the blank aesthetic |
| `motion` | 1–4 | No animation or minimal CSS transitions only |
| `density` | 1–5 | Air and whitespace are the design |

### Anti-patterns
- Never add a gradient "because it feels empty" — that's a different preset
- Never add noise/grain overlay — defeats the point
- Never add `medium: pattern` — you're no longer flat-blank
- Never use `type: glow` or `type: emissive` — there's no subject to light
- Never use more than 3 UI elements in the hero — maximal restraint
- Never use `intensity: bold` or `blown-out` — this stage has no intensity

---

## 9. sculptural-field

**Brands:** Raycast, Spotify (some executions), neon-cyber

3D-rendered geometric masses fill the viewport — translucent glass bars, crystal shard clusters, or floating rectangular planes. The field itself is the hero. No discrete subject sits in front; the sculptural composition IS the visual identity. This is for launchers, developer AI tools, and creative platforms where the product's sophistication is signaled through the environment itself.

### Description
The background is filled with angular, translucent, 3D-looking forms stacked in perspective: diagonal glass bars (Raycast), faceted crystal shards (creative tools), or drifting geometric planes (generative platforms). There is no hero subject — the sculptural mass occupies the geometric center, and text sits on top with its own backdrop or offset to a calm corner. This is the most complex background rendering, requiring CSS perspective transforms and careful z-indexing.

### Background rules
| Dial | Value |
|------|-------|
| `medium` | `sculptural` |
| `color_mode` | `palette` or `brand-tinted-neutral` |
| `saturation` | `vibrant` |
| `intensity` | `bold` |
| `light_source` | `center` |
| `falloff` | `radial` |
| `vignette` | `subtle` |
| `texture` | `clean` |
| `motion` | `static` or `drift` |

Background CSS: Three recipe options:
1. **Glass bars** — 4–6 diagonal translucent slabs with `perspective: 1400px`, `backdrop-filter: blur(12px)`, shared `rotateZ` axis with per-bar `translateX` + `rotateY` for depth. Each bar uses linear gradients from brand palette with 0.20–0.55 alpha.
2. **Crystal cluster** — 3–5 pentagonal shards with `clip-path: polygon(...)` and `mix-blend-mode: screen` for additive light. Overlapping faceted shapes create depth.
3. **Geometric drift** — 4–8 rectangular planes at varied scales and rotations, using `border-radius: 20px` rounded corners. Each plane has gradient fills and subtle borders.

All recipes use `position: absolute; pointer-events: none;` and must NOT interfere with interactive content.

### Hero subject rules
- `subject`: `none` — the sculptural field IS the hero
- No device, no object, no luminous form on top of the field
- The mass occupies the center; content must sit on top or offset

### Relation to background
- `type`: `flat`
- `bleed`: 0

No relation layer — the field and the content are separate layers. Content sits on top with its own backdrop.

### Typography rules
- Position: Offset to a calm zone (top-left, bottom-right) OR centered with backdrop blur
- Alignment: `left` preferred (centered works with very careful backdrop)
- Size: Display at `clamp(2rem, 5vw, 3.5rem)`
- Text container: `backdrop-filter: blur(16px)` + `background: rgba(var(--bg-rgb), 0.7)` for guaranteed legibility
- Sculptural fields are dense and compete with text — always protect the text zone

### CTA placement rules
- Single CTA within the text container's backdrop zone
- Must have guaranteed contrast against the sculptural background
- Style: accent-filled or solid background button
- Never place CTA outside the backdrop zone

### Mobile adaptation rules
- Sculptural elements reduce to 2–3 bars/shards
- Bars/shards scale down and shift to avoid text overlap
- Text backdrop increases opacity to 0.85
- Alternative: hide sculptural elements on mobile, show only the gradient base
- `perspective` value reduces on mobile for performance

### Best diales ranges
| Dial | Ideal range | Notes |
|------|------------|-------|
| `variance` | 7–10 | Asymmetric compositions are the point |
| `motion` | 5–8 | Subtle drift on sculptural elements enhances 3D feel |
| `density` | 5–8 | The sculptural field IS content density, but text must breathe |

### Anti-patterns
- Never add a luminous subject on top — the field is already the hero
- Never use `subject: object` or `subject: device` — they would compete
- Never use `type: glow` or `type: emissive` — the sculptural elements self-illuminate
- Never place text directly on the sculptural field without a backdrop — illegibility guaranteed
- Never use `intensity: subtle` — sculptural fields need presence
- Never use `color_mode: monochrome` — the whole point is multi-hue translucency
- Never animate sculptural elements with `useState` — use CSS `@keyframes` or `useMotionValue`

---

## Subject × Relation Compatibility Matrix

Not every subject pairs with every relation. Respect physics:

| | `flat` | `glow` | `halo` | `emissive` | `reflection` | `shadow-only` |
|---|---|---|---|---|---|---|
| `luminous` | weak | default | ok | ok | never | never |
| `object` | ok | never | weak | never | ok | default |
| `device` | default | ok | weak | never | ok | ok |
| `composition` | default | ok | never | never | never | ok |
| `photo-cutout` | default | ok | ok | never | ok | ok |
| `none` | default | — | — | — | — | — |

## Selecting a Preset

| If your brand is... | Choose... |
|---|---|
| AI/dev tools, single glowing product, launcher energy | `luminous-on-gradient` |
| SaaS, product tours, showing the UI itself | `device-on-mesh` |
| Editorial, luxury, lifestyle, cinematic imagery | `painterly-no-hero` |
| Developer infra, docs, precision, zero-nonsense | `grid-on-dark` |
| Physical hardware, audio, premium products, automotive | `object-on-spotlight` |
| Media, lifestyle, travel, fashion photography | `editorial-photo` |
| Generative, creative tools, anything "alive" | `shader-ambient` |
| Minimal, writing tools, docs, corporate restraint | `flat-blank` |
| Launchers, AI dev tools, bold 3D identity | `sculptural-field` |

## Rendering Pipeline

All hero stages render as a z-index stack:

```
z:0   body background (var(--bg))
z:1   background medium           ← .bg-{medium}
z:2   vignette overlay (if on)    ← .hero-vignette
z:3   noise overlay (if on)       ← .bg-grain-overlay
z:4   relation layer (glow/emissive/halo/reflection)  ← .relation-*
z:5   hero subject                 ← .hero-{subject}
z:10  content (headline, copy, CTA)
```

`flat` and `shadow-only` relations skip layer 4. `shadow-only` is a filter on the subject itself. The entire stack lives inside `position: relative; overflow: hidden` on the hero section. Content gets `position: relative; z-index: 10`.