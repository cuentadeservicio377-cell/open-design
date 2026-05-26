# Anti-Slop Rules

THE SINGLE SOURCE OF TRUTH for anti-generic LLM design rules. No other file should duplicate these.

---

## 1. Typography Discipline

### Fonts Banned from Display/Identity Use

| Font | Reason | Replacement |
|------|--------|-------------|
| Inter | Overused, default LLM output | Geist, Outfit, Satoshi, Cabinet Grotesk |
| Roboto | Generic, Android vibe | Plus Jakarta Sans, DM Sans |
| System UI | No character, no identity | Define explicit stack per project |

**Inter Resolution: Inter is ONLY acceptable as a body font in editorial/marketing contexts. It is NEVER acceptable as a display, heading, or identity font in any context. If Inter appears in a design model, it must be demoted to `--font-body` at most, and a proper display font must carry all headings and branding.**

### Font Pairing by Context

**Dashboard/Software UI (density >= 6):**
```css
--font-display: "Geist", sans-serif;
--font-body: "Geist", sans-serif;
--font-mono: "Geist Mono", monospace;
```

**Editorial/Marketing:**
```css
--font-display: "Cabinet Grotesk", sans-serif;
--font-body: "Inter", sans-serif;  /* ONLY as body, never display */
--font-mono: "JetBrains Mono", monospace;
```

**Premium/Luxury:**
```css
--font-display: "Cormorant Garamond", serif;
--font-body: "Outfit", sans-serif;
--font-mono: "JetBrains Mono", monospace;
```

### OpenAI Typography Rules

**RULE: Two typefaces max. One accent color.**
- Maximum 2 font families per page. Display + body is the pair. Mono is a utility, not a third family.
- One accent color across the entire page. Semantic colors (success, warning, error) are exempt but must be desaturated.
- If the design uses 3+ font families, eliminate until 2 remain.
- If the design uses multiple accent colors, unify to one.

### Typography Rules

- BANNED: Serif in dashboards/software UI
- BANNED: H1 oversize (>72px)
- BANNED: More than 2 font families per screen
- BANNED: Inter as display/identity font in any context
- REQUIRED: Display for headlines, body for content, mono for code
- REQUIRED: Define font stack per project, never rely on `font-family: system-ui`

---

## 2. Color Calibration

### The LILA Ban

The "AI Purple/Blue" aesthetic is BANNED entirely:

- BANNED: Purple button glows
- BANNED: Neon gradients (purple to blue)
- BANNED: Violet accents across everything
- BANNED: "Matrix" green that is not actually Matrix
- BANNED: Any gradient with purple as a dominant stop

### Alternatives by Category

| Category | Instead Of | Use |
|----------|-----------|-----|
| Developer Tools | Purple/Violet | Emerald, Cyan, Amber |
| Fintech | Blue/Navy | Deep Navy + Gold accent |
| SaaS B2B | Purple gradient | Single accent + neutral palette |
| Consumer | Rainbow | Single brand color |

### Color Rules

- BANNED: `#000000` pure black. Use Zinc-950, Slate-950, neutral-950
- BANNED: Accent saturation >80%. Desaturate to 60-70%
- BANNED: More than 3 accent colors. 1 accent + semantic colors only
- REQUIRED: Grays with temperature (warm gray for warm brand, cool gray for tech)
- REQUIRED: One accent color with high contrast. Semantic colors are separate system.

### Dark Mode Rules

- Dark backgrounds must use warm-tinted blacks (not pure `#000000` or cold `#0a0a0a`)
- Surface hierarchy must be visible: background < surface-1 < surface-2 < surface-3
- Text must never overlay on dark backgrounds without contrast check (minimum 4.5:1)
- Accent colors must be lightened 10-15% in dark mode for equivalent perceptual brightness
- Bordered elements in dark mode use `border: 1px solid rgba(255,255,255,0.06)` minimum

### Semantic Color Tokens

```css
/* Only these. Do not invent tokens outside this set. */
--background      /* Page canvas */
--surface-1       /* Primary elevated (cards) */
--surface-2       /* Secondary (nested) */
--surface-3       /* Tertiary (inputs) */
--border          /* Subtle borders */
--border-visible  /* Intentional borders */
--text-1          /* Primary text */
--text-2          /* Secondary text */
--text-3          /* Tertiary text */
--text-4          /* Disabled text */
--accent          /* Primary interactive */
--accent-subtle   /* Tinted bg for accent */
--success         /* Positive states */
--warning         /* Caution states */
--error           /* Destructive states */
```

---

## 3. Layout Anti-Patterns

### Banned Layouts

| Pattern | Reason | Alternative |
|---------|--------|-------------|
| 3 equal horizontal cards | Generic, default LLM output | 2+1 zig-zag, bento grid, horizontal scroll |
| Hero centered over image | Cliche, marketing 2010 | Split screen, left-aligned, asymmetric |
| Equal spacing everywhere | No hierarchy | Varied spacing based on importance |
| Perfect 12-column grid | Predictable | Asymmetric grids, overlapping elements |
| Card grids in hero section | Competing focal points destroy composition | OpenAI Rule: no cards in hero, EVER |
| Multiple competing focal points in first viewport | Viewer's eye has nowhere to land | One composition, one focal point |

### OpenAI One-Composition Rule

**The first viewport must read as a single composition.** Not a buffet of sections fighting for attention.

- BANNED: Multiple competing focal points above the fold
- BANNED: Card grids in hero sections, no exceptions
- BANNED: Hero sections that require scanning to understand the layout
- REQUIRED: One clear focal point per hero viewport
- REQUIRED: Visual hierarchy must be immediately parseable (what matters, what supports)
- REQUIRED: Full-bleed hero by default on landing pages. Contained/narrow heroes are BANNED unless the page type is dashboard or form.
- REQUIRED: Brand name must be hero-level on branded pages. Tiny logos in corners are BANNED for landing and marketing pages.

### Layout Rules

- BANNED: `h-screen` in heroes. Use `min-h-[100dvh]`
- BANNED: Complex flex percentage math. Use CSS Grid
- BANNED: Floating elements with weird gaps. Align perfectly
- BANNED: Contained heroes on landing pages (full-bleed is default)
- REQUIRED: Mobile-first, standard breakpoints (sm:640, md:768, lg:1024, xl:1280)
- REQUIRED: Every section has one job, one purpose, one takeaway

### Variance Dial Mapping

| Level | Layout Approach |
|-------|----------------|
| 1-3 | Centered, symmetrical, equal paddings |
| 4-7 | Overlapping, varied ratios, left-aligned headers |
| 8-10 | Masonry, asymmetric grids, massive whitespace |

---

## 4. Component Anti-Patterns

### Dashboard Hardening (density >= 6)

Linear-style restraint for data-dense surfaces. Calm surface hierarchy, strong typography, few colors, dense but readable.

| Banned | Use Instead |
|--------|-------------|
| Generic card containers with rounded corners and shadows | `border-t`, `divide-y`, negative space for grouping |
| Box shadows everywhere | Borders only. No shadows on data surfaces |
| Rounded cards (radius > 8px) | Sharp or minimal radius (2-4px) on data |
| Colored background per card | Single surface color, borders for hierarchy |
| Hover states that move content | Subtle background shifts, never layout shift |
| Icon-only actions without labels | Icon + label, or tooltip on icon-only |
| Nested cards (card within card) | Flatten with `divide-y` or `border-t` |

**Dashboard principle: A card component only exists when the card IS the interaction** (clickable, draggable, expandable). If a card is purely presentational and sits in a grid, flatten it into a row with borders.

### OpenAI No-Cards-in-Hero Rule

**Cards are BANNED in hero sections.** This is non-negotiable.

- Hero sections must present a single composition, not a grid of feature cards
- Feature cards belong below the hero in a dedicated features section
- Social proof (logos, testimonials) below the hero, not competing with it
- If you find yourself wrapping hero content in card containers, remove the cards

### Component Rules

- BANNED: Skeleton loaders that are generic rectangles. Shape must match actual content
- BANNED: Empty states without direction. Always show how to populate
- BANNED: Error states that are generic. Inline errors with context only
- BANNED: Toast notifications as default pattern. Inline errors preferred
- BANNED: `shadcn/ui` or `Material UI` with default theme uncustomized
- REQUIRED: Customize radii, colors, shadows (or remove shadows) per brand

### Hover States

```css
/* BANNED */
button:active {
  transform: scale(0.95);
}

/* ACCEPTABLE */
button:active {
  transform: translateY(-1px);
}

/* BEST (with spring physics) */
<motion.button whileTap={{ y: -1, scale: 0.98 }} />
```

- BANNED: Scale-based active states on buttons (makes UI feel cheap)
- BANNED: Content shift on hover (layout thrashing)
- REQUIRED: Tactile vertical push feel (translateY) for active states
- REQUIRED: Dashboard hover = subtle background shift, never layout movement

---

## 5. Interaction Anti-Patterns

### OpenAI Motion Budget

**Before writing any animation code, you MUST define:**

1. **Visual thesis** (1 sentence): What single visual impression should this page create?
2. **Content plan**: What content lives where, in what hierarchy?
3. **Interaction thesis** (2-3 motion ideas): What 2-3 motions bring the visual thesis to life?

**Then commit to exactly 3 intentional motions from this list:**

| Category | Motion Type | When to Use |
|----------|------------|-------------|
| Hero entrance | Fade + slide, reveal, scale-in | First meaningful paint |
| Scroll-linked | Parallax, progress bar, sticky transform | Guiding narrative flow |
| Hover/reveal | Background shift, tooltip, subtle scale | Interactive feedback |

**Motion cap: 3 intentional motions maximum per page.** BANNED: 5+ animations, decorative-only motion, animations that exist without serving the visual thesis.

- Motion 1: Hero entrance (how does the page arrive?)
- Motion 2: Scroll-linked (how does the story unfold?)
- Motion 3: Hover/reveal (how does interaction feel?)

If you add a 4th animation, you must remove one. No exceptions.

### Animation Performance

| Banned | Reason | Use Instead |
|--------|--------|-------------|
| `useState` for continuous animation | Triggers re-renders | `useMotionValue` from Framer Motion |
| `window.addEventListener('scroll')` | Performance killer | IntersectionObserver, Framer Motion scroll |
| Animating `width`, `height`, `top`, `left` | Layout thrash | Animate `transform` and `opacity` only |
| Grain/noise on scrolling containers | GPU repaint loop | Fixed, pointer-events-none pseudo-elements |
| `will-change` on 5+ elements | GPU memory exhaustion | Apply only to elements actively animating |

### Motion Dial Mapping

| Level | Approach |
|-------|----------|
| 1-3 | No animations. CSS `:hover`/`:active` only. Motion budget = 0. |
| 4-7 | CSS transitions. `transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1)`. Motion budget = 2. |
| 8-10 | Framer Motion, spring physics, scroll-triggered reveals. Motion budget = 3. |

### Z-Index System

```css
/* BANNED: Arbitrary z-index */
z-index: 999;
z-index: 9999;

/* REQUIRED: Systematic z-index */
--z-base: 0;
--z-dropdown: 10;
--z-sticky: 50;
--z-modal: 100;
--z-toast: 150;
--z-tooltip: 200;
```

---

## 6. Content Anti-Patterns

### Names Banned

| Don't Use | Use Instead |
|-----------|-------------|
| John Doe, Jane Doe | Marcus Chen, Aisha Patel, Koji Tanaka |
| Sarah Chan, Jack Su | Elena Vasquez, Marcus Wright |
| Acme Corp, XYZ Company | Helix Technologies, Crest Analytics |
| Foo, Bar, Baz in UI | Actual representative content |
| Lorem ipsum | Real copy or purposeful placeholder text |

### Numbers Banned

| Don't Use | Use Instead |
|-----------|-------------|
| 99.99% | 94.7%, 87.3%, 99.2% |
| 50%, 100% | 47.2%, 73.1%, 12.8% |
| $9.99, $19.99 | $47, $149, $2,847 |
| +1 (555) 123-4567 | +1 (312) 847-1928, +44 20 7946 0958 |
| Round percentages | Specific, believable numbers |

### Copy Banned

| Don't Use | Use Instead |
|-----------|-------------|
| Elevate your X | Track your metrics |
| Seamless integration | Connect your tools |
| Unleash the power | Run queries 10x faster |
| Next-Gen solution | Built for modern teams |
| World-class | Enterprise-grade |
| Cutting-edge | Latest |
| Revolutionize | Simplify |
| Game-changer | What it actually does |

### OpenAI Litmus Checks

Two tests that every page must pass before shipping:

**Litmus 1 - Image Removal Test:**
> "If you remove the hero image and the page still works, the image was too weak."

The hero image must be load-bearing. If removing it changes nothing about the message or composition, either make the image essential to the composition or remove it entirely.

**Litmus 2 - Heading-Only Scan Test:**
> "If an operator scans only headings, labels, and numbers, can they understand the page immediately?"

Headings must tell the story. Labels must identify their data. Numbers must convey their meaning. If scanning H1-H3 + labels + KPIs doesn't communicate the page's purpose, the content hierarchy is broken.

---

## 7. Page-Type Rules

Different page types have different rules. One size does not fit all.

### Landing Pages

- Full-bleed hero. BANNED: contained/narrow heroes
- Brand name must be hero-level, not a tiny logo in the corner
- One composition in first viewport (OpenAI rule)
- No card grids in hero (OpenAI rule)
- Motion budget: 3 (hero entrance + scroll reveal + hover)
- Variance: 6-10 (asymmetric, editorial)
- Density: 3-5 (breathing room)

### Dashboards

- Flat hierarchy. Borders and divide-y, not card shadows
- Card only when card IS the interaction (draggable, expandable, clickable)
- Strong typography hierarchy. Headers carry the structure
- Motion budget: 1-2 (hover states only, maybe a subtle entrance)
- Variance: 2-4 (predictable, scannable)
- Density: 6-9 (dense but readable)
- No decorative animations. Every motion is functional feedback

### Forms / App UI

- Minimal motion. Motion budget: 0-1
- Clear labels, inline validation, contextual errors
- Density: 5-7 (compact but not crowded)
- Variance: 1-3 (centered, symmetrical, predictable)
- No hero needed. Jump straight to the form/action
- Brand is in the details: consistent radii, spacing rhythm, accent color on interactive elements

### Marketing Pages (Non-Landing)

- Content sections each have one job, one purpose, one takeaway
- Alternating visual treatments prevent monotony
- Social proof sections use real names, real numbers
- CTA is clear and above the fold, not buried
- Motion budget: 2-3

---

## 8. Resolution Protocol

When rules conflict, this is the decision chain:

### Anti-Slop vs YAML Style File

**Anti-slop wins for specific rules. YAML style defines brand identity.**

When a YAML style file (from `library/styles/`) conflicts with anti-slop rules:

1. **Typography conflicts**: Anti-slop font bans override. If the YAML says `Inter` for display, anti-slop overrides to a premium alternative. But the YAML's brand identity intent (e.g., "warm editorial feel") is preserved through an approved alternative.
2. **Color conflicts**: Anti-slop LILA ban overrides. If the YAML says purple accent, anti-slop forces a non-purple alternative. But the YAML's warmth/coolness intent is preserved through the replacement.
3. **Layout conflicts**: Anti-slop layout bans (no 3-equal-cards, no hero cards) override. But the YAML's spacing rhythm and density dial are preserved.
4. **Motion conflicts**: Anti-slop motion budget overrides. If the YAML says motion=10 but the budget exceeds 3 animations, the budget caps at 3. The YAML's spring/transition preferences are preserved within those 3.

**Rule of thumb: Anti-slop says WHAT NOT TO DO. YAML says WHAT THE BRAND LOOKS LIKE. When they collide, find a way to express the brand identity without violating the ban.**

### OpenAI Rules vs Dials

| Conflict | Resolution |
|----------|------------|
| OpenAI says full-bleed, dial says contained | OpenAI wins for landing pages. Dial wins for dashboards/forms. |
| OpenAI says 3 motions, dial says motion=10 | 3 motion budget always caps. High dial = more elaborate within 3, not more than 3. |
| OpenAI says one job per section, dial says high density | High density means more data per section, not more jobs per section. Density and singularity coexist. |
| OpenAI says one accent color, YAML says gradient brand | One accent color wins. Gradient can exist as background texture, not interactive accent. |

### Urgency Override

If the user explicitly requests something that violates anti-slop rules (e.g., "I want Inter font" or "give me 3 columns of cards"), implement their request but flag it: "Implemented per your request. Note: this exceeds the anti-slop budget for [X]. Consider [alternative] for premium feel."

---

## 9. Pre-Flight Checklist

Before shipping any design, verify every item:

### Typography
- [ ] No Inter as display/identity font (OK as body-only in editorial)
- [ ] Maximum 2 font families per page
- [ ] One accent color across entire page
- [ ] Font stack defined explicitly (no `system-ui` fallback as identity)

### Color
- [ ] No purple/blue AI aesthetic (LILA ban)
- [ ] No `#000000` pure black
- [ ] Accent saturation <= 70%
- [ ] Maximum 1 accent color + semantic tokens

### Layout
- [ ] No 3-column equal card layouts
- [ ] No card grids in hero section
- [ ] First viewport reads as single composition
- [ ] Hero is full-bleed (landing pages)
- [ ] Brand name is hero-level (landing/marketing pages)
- [ ] Each section has one job, one purpose, one takeaway
- [ ] `min-h-[100dvh]` instead of `h-screen`

### Components
- [ ] Dashboard surfaces use borders/divide-y, not card shadows
- [ ] Cards only exist when card IS the interaction
- [ ] Active states use translateY, not scale
- [ ] Hover states never cause layout shift
- [ ] Empty/loading/error states have direction

### Interaction
- [ ] Motion budget: maximum 3 intentional motions per page
- [ ] Visual thesis defined (1 sentence) before code
- [ ] Interaction thesis defined (2-3 motion ideas) before code
- [ ] Only `transform` and `opacity` animated (no layout properties)
- [ ] Z-index uses systematic scale, not arbitrary numbers
- [ ] `will-change` only on actively animating elements

### Content
- [ ] No generic names (John Doe, Acme Corp)
- [ ] No round/fake numbers (99.99%, 50%)
- [ ] No AI filler words (Elevate, Seamlessly, Unleash, Next-Gen)
- [ ] Image removal test: removing hero image breaks the composition
- [ ] Heading-only scan: H1-H3 + labels + KPIs tell the full story

### Dark Mode
- [ ] Background uses warm-tinted black, not pure `#000000`
- [ ] Surface hierarchy visible (background < s1 < s2 < s3)
- [ ] Accent colors lightened 10-15% for perceptual brightness
- [ ] Text contrast ratio minimum 4.5:1