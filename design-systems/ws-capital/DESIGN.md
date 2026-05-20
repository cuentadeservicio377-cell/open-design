# Design System — WS Capital

> **Kernel:** WS_CAPITAL_OS
> **Art Direction:** Retro Mac System 9 × Modern Precision
> **Principios:** Brutalist, No Noise, High Contrast, Rebel Spirit.

---

## 1. Visual Theme

WS Capital no es una página web. Es un sistema operativo simulado dentro del navegador. Un homenaje funcional al Mac Classic (System 9) con contenido real y typography moderna.

Paleta Platinum (grises clásicos Mac) con acentos quirúrgicos. VT323 para pixel headings. Share Tech Mono para mono técnico. Inter para UI.

## 2. Color Palette

### Platinum Neutrals
- `--plat-50`: #ffffff
- `--plat-100`: #f0f0f0
- `--plat-200`: #e0e0e0
- `--plat-300`: #cccccc (fondo de página)
- `--plat-400`: #aaaaaa (titlebars, botones)
- `--plat-500`: #888888
- `--plat-600`: #666666
- `--plat-700`: #444444
- `--plat-800`: #222222
- `--plat-900`: #000000

### Accents
- `--accent-blue`: #0000D0
- `--accent-blue-soft`: #CCCCFF
- `--accent-teal`: #008080
- `--accent-red`: #FF3B30
- `--ws-rust`: #A9552C
- `--accent-gold`: #c9a227

## 3. Typography

| Rol | Font |
|-----|------|
| Display / Pixel | VT323, monospace |
| Mono / Técnico | Share Tech Mono, monospace |
| UI / Cuerpo | Inter, system-ui, sans-serif |

## 4. Layout

Page max-width: 1100px. OS menubar fixed top 32px. Windows with 2px solid black borders, 6px 6px 0 shadow. Desktop icons fixed right.

## 5. Components

### Windows
- bg: var(--plat-100)
- border: 2px solid #000
- box-shadow: 6px 6px 0 #000
- titlebar: 30px, var(--plat-400), stripe pattern

### Buttons
- 2px solid #000 border
- font-family: var(--font-mono)
- box-shadow: 2px 2px 0 #000
- hover: translate(-1px,-1px), shadow 4px 4px

### Progress Bars
- 16px height, repeating diagonal pattern

### Terminal Forms
- bg: var(--plat-900), green text #00FF00

## 6. Animations
- Boot loader: progress bar fill
- Scroll reveal: fade-in-up
- Modal pop: spring scale
- Incinerator: multi-step shake

## 7. Anti-Patterns
- No rounded corners
- No soft shadows
- No gradients (except progress bars)
- No stock photography
- No em dashes in prose
- No purple/blue AI aesthetic
