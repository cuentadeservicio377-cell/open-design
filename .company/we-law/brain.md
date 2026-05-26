# We Law — Brain

> **Última actualización:** 2026-05-20
> **Estado:** 🟢 BRIEF COMPLETO, DESIGN SYSTEM CREADO

---

## 📋 Archivos del Ecosistema

| Archivo | Estado | Descripción |
|---------|--------|-------------|
| `brief.md` | ✅ Completo | Brief de marca con ICP, tono, servicios, canales |
| `settings.json` | ✅ Completo | Config técnica con colores, fonts, URLs |
| `design-systems/we-law/DESIGN.md` | ✅ Completo | Design system completo (11 secciones) |
| `assets/manifest.md` | ⬜ Pendiente | Inventario de logos, imágenes, fuentes |

---

## 🏢 Datos Clave de We Law

- **Nombre:** We Law
- **Web:** https://welaw.com.mx
- **Email:** hola@welaw.com.mx
- **Teléfono:** +52 33 1146 2523
- **Ubicación:** Guadalajara, Jalisco, México
- **Stack:** WordPress 6.9.4 + Elementor 3.31.3 + Royal Elementor Addons
- **Diferencial:** Legal Design + Design Thinking = contratos que funcionan como manuales operativos

---

## 🎨 Identidad Visual (Real del sitio)

| Token | Hex | Uso |
|-------|-----|-----|
| **Primary** | `#0A192F` | Deep navy |
| **Accent** | `#9D773C` | Gold/bronze |
| Secondary | `#E2E8F0` | Cool gray |
| Text | `#2C2C2C` | Near-black |
| Off-white | `#F4F4F2` | Cream |
| Gold light | `#C5A370` | Gradientes |

**Tipografía:** Poppins (headings) + Roboto (body)

---

## 📱 Redes Sociales

| Red | URL |
|-----|-----|
| Instagram | https://www.instagram.com/welawofficial/ |
| TikTok | https://www.tiktok.com/@welawofficial |
| Facebook | https://www.facebook.com/people/We-Law/61576333265810/ |
| LinkedIn | https://www.linkedin.com/company/we-lawmx/ |

---

## 🗂️ Estructura del Brain

```
.company/we-law/
├── brain.md              ← Este archivo
├── brief.md              ← Brief de marca
├── settings.json         ← Config técnica
├── assets/
│   ├── logo/             ← IMAGOTIPO-FINAL-SF-200.png, FAVICON.png
│   └── manifest.md       ← POR CREAR
└── projects/             ← Se llena conforme diseñemos
```

---

## 📂 Proyectos

### 1. Web Principal — welaw.com.mx
- **Estado:** 🟢 Live
- **Plataforma:** WordPress + Elementor
- **Descripción:** Sitio principal con landing, blog, páginas de servicio por industria

### 2. 🏆 Campaña MÉDICOS — Completada
- **Estado:** 🟢 Completado (2026-05-20)
- **Landing WordPress:** page_id=2393 (draft) → `https://welaw.com.mx/?page_id=2393`
- **Landing HTML:** `projects/medicos-ads/landing-medicos.html`
- **11 opciones de anuncio** → `projects/medicos-ads/`

### 3. 🏆 Campaña PEQUEÑO EMPRESARIO — Completada
- **Estado:** 🟢 Completado (2026-05-20)
- **Precio:** $2,500 MXN
- **Landing HTML:** `projects/empresario-ads/landing-empresario.html`
- **Landing WordPress:** ✅ page_id=2626 (draft) → `https://welaw.com.mx/?page_id=2626`
- **11 opciones de anuncio** → `projects/empresario-ads/`

### 4. 🏆 Campaña PYME LABORAL — Completada
- **Estado:** 🟢 Completado (2026-05-20)
- **Precio:** $5,000 MXN (paquete medio)
- **Landing HTML:** `projects/laboral-ads/landing-laboral.html`
- **Landing WordPress:** ✅ page_id=2630 (draft) → `https://welaw.com.mx/pyme-laboral/`
- **11 opciones de anuncio** → `projects/laboral-ads/`

### 5. 🏆 Campaña SAS STARTUPS — Completada
- **Estado:** 🟢 Completado (2026-05-25)
- **Precio:** $3,500-$8,500 MXN (3 paquetes: Arranca, Opera, Protege)
- **Landing HTML:** `projects/sas-ads/landing-sas.html`
- **11 opciones de anuncio** → `projects/sas-ads/`
- **Basada en:** Investigación completa del dueño de SAS mexicana real (perfil, dolores, cultura del contrato, competencia)
- **Hook principal:** "En México hacemos negocios de palabra. Hasta que la palabra no alcanza."
- **Datos clave:** 92% clientes no pagan, 95% desconocimiento legal, 88% miedo al SAT

### 6. Campañas pendientes
- **Estado:** 🟡 Por iniciar
- (Todas las campañas de nicho completadas)

---

## 🧬 SISTEMA DE ADS — Metodología Replicable

**CADA campaña de nicho produce 11 opciones con esta estructura:**

```
projects/{nicho}-ads/
├── 01-anuncio-estatico-pas.html          ← Tono directo · Con precio
├── 01b-anuncio-estatico-sin-precio.html  ← Tono directo · Sin precio
├── 01c-anuncio-landing-tone.html         ← Tono aspiracional · Con precio
├── 01d-anuncio-landing-tone-sin-precio.html ← Tono aspiracional · Sin precio
├── 02-carrusel-5-slides.html             ← Tono directo · Con precio
├── 02b-carrusel-sin-precio.html          ← Tono directo · Sin precio
├── 02c-carrusel-landing-tone.html        ← Tono aspiracional · Con precio
├── 02d-carrusel-landing-tone-sin-precio.html ← Tono aspiracional · Sin precio
├── 03-video-concepto-9-16.html           ← Video concepto (1 solo)
└── landing-{nicho}.html                  ← Landing HTML full
```

### 🎯 Los 2 Tonos

| Tono | Headline ejemplo | Cuándo usarlo |
|------|-----------------|---------------|
| **Directo** | "¿Tu consentimiento realmente te protege?" | Audiencia fría, scroll-stop, problema claro |
| **Aspiracional** | "Operas con precisión. Tus documentos deberían reflejar lo mismo." | Audiencia tibia, profesional, criterio |

### 📐 Formato base (aplica a TODOS los nichos)

- **Medidas:** 1080×1080 (imagen/carrusel), 1080×1920 (video)
- **Colores:** Navy `#0A192F` fondo, Gold `#9D773C` acento, White/Off-white texto
- **Tipografía:** Poppins 900 headings, Roboto 500 body
- **Badge fijo:** "SIN PAPELEO · TODO POR VIDEOLLAMADA"
- **CTA fijo:** "Videollamada sin costo · Tú no te preocupas de nada"
- **Estadísticas:** NUNCA usar números de miedo ($ demandas, % demandados). Usar: 📹 videollamada, 48h, ⚕️ especialistas
- **Anti-patrones:** Cero rojo, cero miedo, cero "te pueden demandar", cero "pierdes tu cédula"

### 🔄 Flujo de trabajo por nicho

1. **Preguntar** qué nicho sigue
2. **Crear HTML** de los 11 archivos (estático ×4, carrusel ×4, video ×1, landing ×1 + WordPress)
3. **Iterar** con feedback del usuario sobre copy y tono
4. **Construir landing** en WordPress vía Elementor MCP
5. **Cerrar** y pasar al siguiente nicho

---

## 🧠 Historial de Diseños

| Fecha | Tipo | Descripción | Archivos |
|-------|------|-------------|----------|
| 2026-05-25 | Landing Page SAS | Landing completa HTML + 11 creativos (estático×4, carrusel×4, video×1) | landing-sas.html, 01-anuncio-estatico-pas.html, etc. |
| 2026-05-25 | Investigación SAS | Investigación completa del dueño de SAS mexicana real: perfil, dolores, cultura del contrato, competencia, pricing | investigacion_sas_mexicana.md |
| 2026-05-20 | Landing Page Médicos | **Construida en WordPress** (page_id=2393). 8 secciones, 92 elementos, gold/navy | https://welaw.com.mx/?page_id=2393 |
| 2026-05-20 | Landing Page Médicos | Landing completa HTML tono aspiracional (7 secciones) | landing-medicos.html |
| 2026-05-20 | Meta Ads Creatives | Kit campaña Médicos: imagen PAS + carrusel 5 slides + video concepto 9:16 | 01-anuncio-estatico-pas.html, 02-carrusel-5-slides.html, 03-video-concepto-9-16.html |
| 2026-05-20 | Design System | Extracción de paleta real + creación de DESIGN.md | brief.md, DESIGN.md, settings.json, brain.md |
| 2026-05-20 | Brief | Brief completo desde sitio real + docs de investigación | brief.md |

---

## 📝 Notas para el Agente

1. **Colores — USAR LOS REALES DEL SITIO:** Gold `#9D773C` + Navy `#0A192F`. NO usar el rosa Barragán.
2. **Tipografía:** Poppins 900/700 headings + Roboto 500/400 body.
3. **Tono:** Directo y cálido. Cero miedo, cero "abogadés", cero "te pueden demandar".
4. **Mensaje clave:** "Videollamada sin costo. Tú hablas, nosotros hacemos todo. Tú no te preocupas de nada."
5. **Entry point:** Diagnóstico gratuito 20 min por videollamada → Propuesta → Servicio.
6. **Campañas:** Cada nicho produce 11 opciones (estático×4 + carrusel×4 + video×1 + landing×1 + WordPress).
7. **Metodología ads:** Ver sección 🧬 SISTEMA DE ADS arriba. Replicar para cada nicho.
8. **Industrias pendientes:** SAS Startups, PyME Laboral, Pequeño Empresario.

---

> **Para el agente:** We Law ya tiene ecosistema completo.
> Carga siempre `brief.md` + `DESIGN.md` antes de diseñar cualquier cosa.
> Los docs de investigación en `WeLaw/` son material de referencia rico para estrategia,
> pero la paleta y el tono visual vienen del sitio real y este DESIGN.md.
