# Open Design — Brain Global

> **"¿Con qué empresa trabajamos hoy?"**
> El agente lee este archivo al iniciar sesión. Decide qué brain cargar.

---

## 🏢 Empresas Registradas

### WS Capital
- **Brain:** `.company/ws-capital/brain.md`
- **Brief:** `.company/ws-capital/brief.md`
- **Design System:** `design-systems/ws-capital/DESIGN.md`
- **Settings:** `.company/ws-capital/settings.json`
- **Estado:** 🟢 Activo, documentado, diseño en producción
- **Web:** https://wsc.lat
- **Proyectos:** 6 (web, landing, pitch deck, LinkedIn, email, sales playbook)

### We Law
- **Brain:** `.company/we-law/brain.md`
- **Brief:** `.company/we-law/brief.md` (PENDIENTE)
- **Design System:** `design-systems/we-law/DESIGN.md` (POR CREAR)
- **Settings:** `.company/we-law/settings.json` (PLACEHOLDER)
- **Estado:** 🟡 Esperando brief del cliente
- **Proyectos:** 0 (sin iniciar)

---

## 🔀 Protocolo de Selección

Cuando el usuario dice algo, el agente decide:

| Trigger | Acción |
|---------|--------|
| "WS Capital", "wsc", "hermes", "ws" | Cargar `.company/ws-capital/brain.md` |
| "We Law", "welaw", "we law" | Cargar `.company/we-law/brain.md` |
| No especifica empresa | Preguntar: "¿WS Capital o We Law?" |
| "Crea algo para [X]" donde X no es ninguna | Preguntar si es nueva empresa |

---

## 📐 Reglas del Brain

1. **Antes de diseñar** → leer el brain de la empresa correspondiente
2. **Después de diseñar** → agregar entrada en el historial del brain
3. **Nuevo proyecto** → crear `.md` en `projects/` y referenciarlo en el brain
4. **Nunca mezclar** → los assets, colores, tono de WS son solo para WS. Lo mismo para We Law.
5. **Si no hay brief** → no diseñar. Pedir brief primero.

---

> **Última actualización:** 2026-05-19
