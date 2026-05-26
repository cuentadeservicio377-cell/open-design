# We Law — Design System

> **Source of truth para todo diseño visual de We Law**
> **Extraído de:** welaw.com.mx CSS real (Elementor Kit) + Creative_Direction_System.docx
> **Última actualización:** 2026-05-20

---

## 1. COLOR SYSTEM

### 1.1 Paleta Principal

| Token CSS | Hex | Rol | Swatch |
|-----------|-----|-----|--------|
| `--color-primary` | `#0A192F` | Fondos oscuros, headings, iconos | ████████ |
| `--color-secondary` | `#E2E8F0` | Fondos sutiles, dividers, cards | ████████ |
| `--color-text` | `#2C2C2C` | Cuerpo de texto principal | ████████ |
| `--color-accent` | `#9D773C` | **Gold/bronze — EL color marca** | ████████ |
| `--color-offwhite` | `#F4F4F2` | Fondos claros, backgrounds | ████████ |
| `--color-white` | `#FFFFFF` | Fondos puros, texto sobre navy | ████████ |

### 1.2 Paleta Extendida

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-gold-light` | `#C5A370` | Gradientes, hover states, badges |
| `--color-gold-warm` | `#977D56` | Elementos interactivos, círculos |
| `--color-slate` | `#44566E` | Gradientes oscuros, variante navy |
| `--color-card-bg` | `#F3F7FD` | Fondos de cards (ligeramente azul) |
| `--color-bg-light` | `#FBFBFB` | Fondos de sección alternados |
| `--color-indigo` | `#605BE5` | **Usar con EXTREMA moderación** (solo 1 icono en el sitio) |

### 1.3 Reglas de Uso

- **Gold (#9D773C) es SAGRADO.** Es lo que hace que We Law no se vea como un despacho tradicional. Usarlo en: CTAs principales, highlights, iconos activos, títulos de sección, el fancy-text animado.
- **Navy (#0A192F) reemplaza al negro.** Nunca usar #000000 puro. El navy profundo da seriedad legal sin dureza de negro puro.
- **El gradiente signature:** `linear-gradient(70deg, #C5A370 0%, #9D773C 100%)` — se usa en botones CTA principales sobre fondos claros.
- **NUNCA usar rosa.** El concepto original de los docs de investigación proponía rosa Barragán, pero el sitio REAL usa gold. Respetar la paleta del sitio.
- **NUNCA usar azul corporativo** (tipo #2563EB o similar). No somos un banco.
- **NUNCA usar rojo** para urgencia, descuentos o "SALE". El gold es suficiente para llamar atención.

### 1.4 Modo Claro/Oscuro

Por ahora, solo modo claro con secciones navy como contraste. El footer y algunas secciones usan fondo navy (#0A192F) con texto blanco. Las cards tipo "diagnóstico" usan `#F3F7FD` con borde blanco y shadow sutil.

---

## 2. TYPOGRAPHY SYSTEM

### 2.1 Font Stack

| Rol | Font Family | Weights | Fallback |
|-----|-------------|---------|----------|
| **Headings** | Poppins | 700, 900 | Sans-serif |
| **Body** | Roboto | 400, 500, 600 | Sans-serif |

### 2.2 Type Scale

| Nivel | Font Size | Weight | Font | Uso |
|-------|-----------|--------|------|-----|
| **Hero** | 45-50px | 900 | Poppins | Títulos principales animados |
| **H1** | 40px | 900 | Poppins | Títulos de sección |
| **H2** | 25px | 700 | Poppins | Subtítulos de sección |
| **H3** | 20px | 700 | Poppins | Títulos de card |
| **Body L** | 17px | 500-600 | Roboto | Texto destacado |
| **Body** | 15px | 500 | Roboto | Cuerpo de texto |
| **Body S** | 14px | 500 | Roboto | Texto secundario |
| **Button** | 14px | 700 | Poppins | CTAs |
| **Caption** | 12px | 600 | Poppins | Labels pequeños |

### 2.3 Reglas Tipográficas

- **Line-height en headings:** 1.1em para hero (tight), ~1.3em para H2/H3
- **Letter-spacing en hero:** 0.4px (sutil air)
- **Poppins 900 solo para hero y títulos que necesitan MÁXIMO impacto**
- **Poppins 700 para subtítulos y CTAs**
- **Roboto 600 para texto que necesita peso** (testimonios, stats)
- **Roboto 500 para cuerpo general**
- **NUNCA usar más de 2 familias en un mismo diseño**
- Las fuentes cargadas extra (Montserrat, Inter, Cabin, Lato, Nunito Sans, Unna, Roboto Slab) son ruido del theme — NO USAR en diseños nuevos.

---

## 3. LAYOUT SYSTEM

### 3.1 Grid Base

- **Max width container:** 1140px (desktop)
- **Breakpoints:** 1024px (tablet), 767px (mobile)
- **Column gap default:** 20px

### 3.2 Layout Patterns (del sitio real)

**Hero Layout:**
- Fondo off-white (#F4F4F2) con imagen de background
- Fancy text animado centrado (Poppins 900, 50px)
- Navy para prefijo/sufijo, Gold para palabras animadas
- Descripción Roboto 500 centrada debajo
- Botón CTA gradiente gold centrado
- Link secundario "Conocer cómo funciona" con borde gold

**Secciones alternadas:**
- Secciones claras (#FBFBFB o #F4F4F2) intercaladas con:
- Secciones con cards sobre fondo navy (#0A192F con gradiente a #44566E)
- Cards con border-radius: 20px, shadow sutil, padding 30px 20px

**Grid de icon boxes (4 columnas):**
- Icono navy (#0A192F) arriba
- Título en gold (#9D773C) Poppins 700
- Descripción en text (#2C2C2C) Roboto 500

### 3.3 Reglas de Layout

- ✅ Asimetría sutil (no 3 columnas iguales de cards)
- ✅ Espacio negativo generoso
- ✅ Secciones con fondo navy + texto blanco para contraste dramático
- ❌ Heroes centrados con texto sobre imagen oscura
- ❌ h-screen en heroes (usar min-height con padding)
- ❌ Cards genéricos con shadow pesado

---

## 4. COMPONENTS

### 4.1 Botones

**CTA Principal (Gold Gradient):**
```css
background: linear-gradient(70deg, #C5A370 0%, #9D773C 100%);
color: #FFFFFF;
font-family: Poppins;
font-size: 14px;
font-weight: 700;
border: 1px solid #9D773C;
border-radius: 2px;
padding: 10px;
```
- Hover: invierte a fondo off-white + texto gold

**CTA Secundario (Outline Gold):**
```css
background: #F4F4F2;
color: #9D773C;
font-family: Poppins;
font-size: 14px;
font-weight: 700;
border: 1px solid #9D773C;
border-radius: 2px;
padding: 10px;
```
- Hover: background gold gradient + texto white

### 4.2 Cards

**Card de Servicio:**
- Background: #F3F7FD (ligeramente azul para frescura)
- Border: 1px solid #FFFFFF
- Border-radius: 20px
- Shadow: 0px 0px 20px rgba(222, 222, 222, 0.5)
- Padding: 30px 20px

**Card de Cliente (logo grid):**
- Background: white
- Border-radius: sutil
- Sin shadow pesado — clean y minimal

### 4.3 Icon Boxes

- Icono: navy (#0A192F) a 15px
- Título: gold (#9D773C), Poppins 700, 16px
- Descripción: text (#2C2C2C), Roboto 500, 15px
- Gap icono-texto: 15px

### 4.4 Dividers

- Background: #E2E8F0 (secondary)
- Thickness: 1px
- Clean, sutil

### 4.5 Social Icons

- Default: navy (#0A192F)
- Hover: animación grow + mantienen color

---

## 5. MOTION & INTERACTION

### 5.1 Animaciones en Uso (Elementor)

- **FadeIn** — entradas de secciones
- **ZoomIn** — imágenes y elementos destacados
- **SlideInLeft/Right** — contenido que entra lateralmente
- **Grow** — social icons hover
- **BounceIn** — elementos que necesitan atención
- **Pulse** — CTAs (sutil)

### 5.2 Principios de Motion

- **Propósito sobre ornamento.** El movimiento debe guiar, no distraer.
- **Transiciones 0.3-0.4s** para la mayoría de interacciones.
- **Easing suave** — nada brusco.
- **Stagger sutil** en listas y grids (50-100ms entre items).
- **NUNCA** animaciones frenéticas tipo TikTok en la web principal.

### 5.3 Fancy Text Animation

El hero usa texto animado que rota entre palabras clave en gold. Las palabras fijas van en navy. Implementado con Essential Addons Fancy Text widget.

---

## 6. BRAND ASSETS

### 6.1 Logo

- **Archivo:** IMAGOTIPO-FINAL-SF-200.png (200x218px)
- **Versión:** Full color sobre fondos claros
- **Favicon:** FAVICON.png (150x150, 300x300)
- **Usar siempre con espacio de respeto** de al menos 20px

### 6.2 Imagotipo / Símbolo

El logo es un imagotipo (símbolo + texto). Consultar el archivo real antes de generar variantes.

### 6.3 Redes Sociales

| Red | URL |
|-----|-----|
| Instagram | https://www.instagram.com/welawofficial/ |
| TikTok | https://www.tiktok.com/@welawofficial |
| Facebook | https://www.facebook.com/people/We-Law/61576333265810/ |
| LinkedIn | https://www.linkedin.com/company/we-lawmx/ |

---

## 7. VOICE & TONE

### 7.1 Personalidad de Marca

**"El amigo inteligente que explica lo complejo en sencillo."**

Una fusión de:
- **Profesional** (es abogado, sabe lo que hace)
- **Cálido** (no intimida, explica, acompaña)
- **Práctico** (va directo al problema, soluciones concretas)
- **Mexicano** (habla en el español de hacer negocios en México)

### 7.2 Principios de Copy

1. **Primero el problema, después la solución.** Abrir con el dolor real del negocio.
2. **Cero "abogadés".** Nada de "por cuantos", "en virtud de", "fehaciente".
3. **Precios claros cuando se mencionan.** Sin "contáctanos para saber".
4. **Tono optimista, no alarmista.** "Protege tu negocio" no "No te demanden".
5. **Segunda persona cercana.** "Tu negocio", "tus procesos", no "las empresas".

### 7.3 Vocabulario de Marca

**SÍ usar:**
- "Documentamos tus procesos"
- "Protección legal que funciona"
- "Contratos que se entienden y se usan"
- "Diagnóstico gratuito"
- "Hecho a tu medida"
- "Sesión 1 a 1"
- "Tu equipo opera sin depender de ti"

**NO usar:**
- "Machote" (peyorativo — aunque a veces necesario en contraste)
- "Barato" / "descuento" / "oferta"
- "Elevate", "seamless", "next-gen"
- "Sin riesgos", "100% seguro" (promesas absolutas)
- "El mejor despacho", "líderes en" (autobombo vacío)

---

## 8. SPACING SYSTEM

### 8.1 Escala de Espaciado

| Token | Value | Uso |
|-------|-------|-----|
| `--space-xs` | 8px | Icon padding, gaps pequeños |
| `--space-sm` | 15-16px | Gap icono-texto, padding cards |
| `--space-md` | 20-25px | Widget spacing, separadores |
| `--space-lg` | 30px | Card padding interno |
| `--space-xl` | 50px | Margen entre secciones |
| `--space-2xl` | 100-150px | Separadores de sección grandes |

### 8.2 Reglas

- Elementor widget spacing default: 20px
- Column gap default: 20px (row y column)
- Container max-width: 1140px

---

## 9. PHOTOGRAPHY & VIDEO DIRECTION

### 9.1 Estilo Fotográfico

**"Enhanced Naturalism"** — luz natural, pero la mejor versión de ella. Ni raw reality ni estudio artificial.

- **Luz:** Natural, cálida, direccional. Golden hour. Ventana. Tungsteno cálido en interiores.
- **Color grade:** Cálido, ligeramente desaturado. Coherencia con la paleta gold/navy.
- **Composición:** Clean, espacio negativo, arquitectura modernista mexicana como contexto.
- **Sujetos:** El fundador como rostro principal. Clientes reales en sus espacios de trabajo.

### 9.2 Estilo de Video

- **Formato predominante:** 9:16 vertical (Reels, TikTok, Stories)
- **Pacing:** Medido, confiado. Sin prisa. "Sabe lo que hace."
- **Cámara:** Suave, gimbal cuando hay movimiento. Mayormente fija.
- **Transiciones:** Limpias, sin efectos llamativos.
- **Color grade:** Mismo warmth que fotografía.

### 9.3 Dirección de Arte para Meta Ads

- **El "Face Stop":** El rostro del fundador bien iluminado, ocupando 60%+ del frame en 9:16.
- **El "1.5-Second Hook":** Cambio visual o frase de apertura en los primeros 1.5 seg.
- **Text overlay:** Poppins bold, gold o white sobre fondo navy. Zona segura: 65% central del frame.
- **Documento como objeto:** Fotografiar contratos como producto premium — flat-lay, luz natural, papel texturizado.

### 9.4 Referencias Visuales

- **Arquitectura:** Luis Barragán (composición, luz, color — ADAPTADO a gold, no rosa)
- **Fotografía:** Pia Riverola (calidez mexicana), Ramón Peaz (retrato)
- **Cine:** "Her" (warm tech), "Roma" (luz CDMX)
- **Brands:** Nubank (fintech warmth), Kavak (Mexican premium), Notion (producto limpio)

---

## 10. ANTI-PATTERNS (Lo que NUNCA se hace)

### 10.1 Color
- ❌ Rosa / pink de ningún tipo
- ❌ Azul corporativo (#2563EB y similares)
- ❌ Negro puro (#000000)
- ❌ Rojo para urgencia/descuentos
- ❌ Verde/rojo/blanco (bandera mexicana) como palette

### 10.2 Tipografía
- ❌ Más de 2 familias en un diseño
- ❌ Serif en la web
- ❌ Inter como font principal (es genérica)
- ❌ Las fuentes extra cargadas (Montserrat, Cabin, Lato, Nunito, Unna)

### 10.3 Layout
- ❌ 3 columnas iguales de cards
- ❌ Hero centrado con texto sobre imagen oscura
- ❌ h-screen en cualquier elemento
- ❌ Sombras pesadas (shadow-lg, shadow-2xl)

### 10.4 Contenido
- ❌ "John Doe", "Acme Corp" en placeholders
- ❌ "Elevate your business", "Unleash potential"
- ❌ "99.99%", "50%" como números genéricos
- ❌ Miedo, vergüenza o culpa como motivadores
- ❌ Countdown timers, "solo quedan 2", urgencia falsa
- ❌ Gavels, balanzas, columnas griegas, martillos de juez

### 10.5 Técnico
- ❌ Dependencias externas innecesarias
- ❌ Tailwind sin customizar (usaría los tokens de este DESIGN.md)
- ❌ Google Fonts extra (cargar solo Poppins + Roboto)

---

## 11. CSS CUSTOM PROPERTIES (Reference)

```css
:root {
  /* Primary palette */
  --welaw-primary: #0A192F;
  --welaw-primary-rgb: 10, 25, 47;
  --welaw-secondary: #E2E8F0;
  --welaw-text: #2C2C2C;
  --welaw-accent: #9D773C;
  --welaw-accent-rgb: 157, 119, 60;
  --welaw-offwhite: #F4F4F2;
  --welaw-white: #FFFFFF;

  /* Extended */
  --welaw-gold-light: #C5A370;
  --welaw-gold-warm: #977D56;
  --welaw-slate: #44566E;
  --welaw-card-bg: #F3F7FD;
  --welaw-bg-light: #FBFBFB;

  /* Typography */
  --welaw-font-heading: 'Poppins', sans-serif;
  --welaw-font-body: 'Roboto', sans-serif;

  /* Spacing */
  --welaw-space-xs: 8px;
  --welaw-space-sm: 16px;
  --welaw-space-md: 20px;
  --welaw-space-lg: 30px;
  --welaw-space-xl: 50px;
  --welaw-space-2xl: 100px;

  /* Layout */
  --welaw-container-max: 1140px;

  /* Motion */
  --welaw-transition-fast: 0.3s;
  --welaw-transition-normal: 0.4s;

  /* Radius */
  --welaw-radius-sm: 2px;
  --welaw-radius-card: 20px;
}
```

---

## 12. ELEMENTOR MAPPING

Si se diseña directamente en Elementor, estos son los mapeos:

| Design Token | Elementor Global |
|-------------|-----------------|
| Primary | `--e-global-color-primary` = `#0A192F` |
| Secondary | `--e-global-color-secondary` = `#E2E8F0` |
| Text | `--e-global-color-text` = `#2C2C2C` |
| **Accent** | `--e-global-color-accent` = `#9D773C` |
| Off-white | `--e-global-color-fb72cc9` = `#F4F4F2` |
| Heading font | `--e-global-typography-primary-font-family` = `Poppins` |
| Body font | `--e-global-typography-text-font-family` = `Roboto` |

---

> **Este DESIGN.md es la fuente de verdad para TODO diseño de We Law.**
> Cualquier asset, landing page, ad creative, post de Instagram o documento
> debe referenciar y respetar este sistema. No se improvisa.
