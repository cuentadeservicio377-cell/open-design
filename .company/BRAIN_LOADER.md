# BRAIN_LOADER — Protocolo de Carga para el Agente

> **Este archivo le dice al agente EXACTAMENTE qué hacer al iniciar una sesión de diseño.**
> Es el equivalente a `AGENTS.md` pero específico para el sistema de memoria multi-empresa.

---

## Al iniciar sesión (automático)

El agente DEBE ejecutar esta secuencia sin que el usuario lo pida:

```
1. Leer .company/BRAIN.md
2. Detectar si el usuario mencionó una empresa en su primer mensaje
3. Si SÍ → cargar el brain de esa empresa
4. Si NO → preguntar "¿WS Capital o We Law?"
5. Una vez seleccionada la empresa → cargar en este orden:
   a. .company/{empresa}/brain.md      ← Memoria de diseños
   b. .company/{empresa}/brief.md       ← Quiénes son
   c. .company/{empresa}/settings.json  ← Config técnica
   d. design-systems/{empresa}/DESIGN.md ← Design system
```

## Durante la sesión

### Antes de diseñar cualquier cosa:
- ✅ Verificar que el brief está completo
- ✅ Cargar design system de la empresa correcta
- ✅ Revisar el brain para no duplicar trabajo
- ✅ Usar los colores, fonts, tono de ESA empresa (no de la otra)

### Después de crear un diseño:
- ✅ Agregar entrada en `brain.md` → sección "Historial de Diseños"
- ✅ Si es proyecto nuevo → crear archivo en `projects/`
- ✅ Actualizar fecha de "Última actualización" en el brain

### Si el usuario cambia de empresa a mitad de sesión:
- ✅ Cerrar contexto actual (nota mental: "esto era de WS")
- ✅ Cargar brain de la nueva empresa
- ✅ NUNCA mezclar assets entre empresas

---

## Template para nuevas entradas en brain.md

Cada vez que termines un diseño, agrega esto bajo `## 📝 Historial de Diseños`:

```markdown
### YYYY-MM-DD
- **[Tipo de diseño]:** [Descripción breve]
- Archivos: `ruta/archivo.html`, `ruta/archivo.css`
- Cambios específicos: [2-3 bullets de lo que se modificó]
- → [[projects/nombre-proyecto#seccion]]
```

---

## Template para nuevo proyecto

Cuando crees un proyecto nuevo, crea `projects/nombre.md`:

```markdown
# Proyecto: [Empresa] — [Nombre]

> **Creado:** YYYY-MM-DD
> **Estado:** [En progreso / Completo / VIVO]

## Archivos

| Archivo | Propósito |
|---------|-----------|
| ... | ... |

## Historial de Cambios

- YYYY-MM-DD — [Cambio realizado]
```

---

> **⚠️ Importante:** Si el agente no tiene acceso a internet o no puede leer archivos por alguna razón, 
> debe DECIRLO explícitamente en lugar de improvisar diseños sin contexto.
