---
name: oc-specify
description: Define QUÉ construir. Transforma la descripción del usuario en una especificación clara con requisitos, criterios de aceptación y alcance. Incluye Plan Mode: multi-opción (A/B/C), read-only, iterativo. Inspirado en spec-kit.specify + Kimi Code Plan Mode.
---

# OpenCode Specify v3

## Objetivo
Transformar lo que el usuario describe en lenguaje natural en una especificación técnica clara con 2-3 opciones de implementación. Esta spec es la FUENTE DE VERDAD para todo el desarrollo posterior.

## Cuándo usar
- SIEMPRE antes de `oc-design` para tareas no triviales
- Cuando el usuario dice "quiero hacer X", "necesito Y", "agregar Z"
- NUNCA para tareas pequeñas y obvias (bugfix simple, typo, config change)

## Modos de operación

### Modo Rápido (tareas < 15 min)
Si la tarea es trivial: "esto es simple, no necesita spec" → ejecutar directamente.

### Plan Mode (tareas no triviales — POR DEFECTO)
El agente entra en modo de SOLO LECTURA para generar 2-3 opciones y someter a aprobación.

---

## Plan Mode — Protocolo Completo

### Principio: Read-Only hasta aprobación
Durante Plan Mode, el agente:
- ✅ **PUEDE**: leer archivos, buscar código, analizar contexto, ejecutar comandos de solo lectura
- ❌ **NO PUEDE**: escribir/modificar archivos, ejecutar comandos destructivos, instalar dependencias

### Paso 1: Leer contexto existente
```bash
# Verificar constitution
cat AGENTS.md 2>/dev/null || echo "⚠️ No hay AGENTS.md — ejecutar oc-constitution primero"

# Verificar specs previas
ls .specify/ 2>/dev/null || echo "No hay .specify/ previo"

# Verificar memoria del proyecto
cat ~/.opencode/memory/*.json 2>/dev/null | head -30

# Entender codebase actual (si existe)
ls -la src/ 2>/dev/null || ls -la app/ 2>/dev/null || ls -la lib/ 2>/dev/null
```

### Paso 2: Entender la solicitud del usuario
Analizar el mensaje del usuario y extraer:
- **Problema**: Qué quiere resolver o construir
- **Usuarios**: Quién va a usar esto
- **Valor**: Por qué es importante
- **Alcance**: Qué incluye y qué NO incluye
- **Restricciones**: Stack, tiempo, dependencias

**Máximo 3 preguntas** si falta información crítica. Priorizar:
1. ¿Qué stack? (si no se menciona y no hay proyecto existente)
2. ¿Alcance exacto? (si es ambiguo)
3. ¿Prioridad? (si hay múltiples features compitiendo)

### Paso 3: Generar 2-3 opciones de implementación

Cada opción debe tener:
- **Nombre descriptivo** (ej: "Opción A: Server Components", "Opción B: SPA + API")
- **Enfoque**: Arquitectura y decisiones clave
- **Complejidad**: Baja / Media / Alta
- **Tiempo estimado**: X-Y horas
- **Pros**: 2-3 ventajas
- **Contras**: 2-3 desventajas
- **Trade-offs**: qué se gana y qué se sacrifica

```
## Opción A: {nombre} (Recomendada) ⭐
**Enfoque:** {descripción del approach}
**Complejidad:** {Baja/Media/Alta}
**Tiempo:** {X-Y horas}

**Pros:**
- 🟢 {ventaja 1}
- 🟢 {ventaja 2}

**Contras:**
- 🔴 {desventaja 1}
- 🔴 {desventaja 2}

**Trade-off:** {qué se gana vs qué se sacrifica}

---

## Opción B: {nombre}
**Enfoque:** {descripción del approach}
**Complejidad:** {Baja/Media/Alta}
**Tiempo:** {X-Y horas}

**Pros:**
- 🟢 {ventaja 1}
- 🟢 {ventaja 2}

**Contras:**
- 🔴 {desventaja 1}
- 🔴 {desventaja 2}

**Trade-off:** {qué se gana vs qué se sacrifica}

---

## Opción C: {nombre} (si aplica)
...
```

### Paso 4: Especificación detallada (para la opción recomendada)

```markdown
# Spec: {Título descriptivo}

## Meta
{1 línea medible — qué logra esta feature cuando está completa}

## Contexto
- **Problema**: {por qué existe esta necesidad}
- **Usuarios**: {quién se beneficia}
- **Valor**: {qué ganan}

## Requisitos Funcionales
1. {RF-01}: {descripción concreta — qué hace, no cómo}
2. {RF-02}: {descripción concreta}
...

## Criterios de Aceptación
- [ ] {RF-01}: {cómo se verifica que funciona}
- [ ] {RF-02}: {cómo se verifica que funciona}
...

## Alcance
### Incluye
- {lo que sí se hace}

### NO incluye
- {lo que explícitamente se excluye}

## Dependencias
- {libs, APIs, servicios necesarios}

## Riesgos
| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|-------------|--------|------------|
| {riesgo 1} | Alta/Media/Baja | Alto/Medio/Bajo | {cómo mitigarlo} |
```

### Paso 5: Guardar spec
```bash
mkdir -p .specify/features
```
Guardar en `.specify/features/{nombre-feature}/spec.md`

### Paso 6: Presentar al usuario (CRÍTICO)

Mostrar la spec completa y las opciones:

```
📋 SPEC LISTA PARA REVISIÓN

## Opciones disponibles:
⭐ Opción A: {nombre} (RECOMENDADA) — {1 línea}
   Opción B: {nombre} — {1 línea}
   Opción C: {nombre} — {1 línea}

## Spec detallada (Opción A):
[spec completa...]

---

❓ PREGUNTAS PARA EL USUARIO:
1. ¿Cuál de las opciones prefieres? (A / B / C)
2. ¿La spec captura correctamente lo que quieres?
3. ¿Falta algún requisito o criterio de aceptación?
4. ¿Apruebas para pasar a oc-design (planificación técnica)?
```

### Paso 7: Iterar si es necesario

Si el usuario pide cambios:
- El agente sigue en modo read-only
- Actualiza la spec según feedback
- Re-presenta sin tener que regenerar todo

---

## Decisiones automáticas (sin preguntar)

| Situación | Acción |
|-----------|--------|
| Solo hay 1 approach viable | Mostrar 1 opción (sin forzar alternativas artificiales) |
| Proyecto existente con stack definido | Respetar el stack, no proponer migraciones |
| Tarea claramente simple | Saltar a implementación directa |
| Usuario dijo "rápido" o "MVP" | Priorizar opción más simple |
| Usuario dijo "robusto" o "escalable" | Priorizar opción con mejor arquitectura |

---

## Reglas
- NUNCA implementar código en este paso — solo definir
- Si el usuario no da suficiente info, hacer MÁXIMO 3 preguntas clave
- Priorizar por valor: si el usuario dice 10 cosas, sugerir las 3 más importantes primero
- Si la tarea es trivial (< 15 min de trabajo), decir "esto es simple, no necesita spec" y ejecutar directamente
- Respetar los principios del AGENTS.md del proyecto
- Si no hay AGENTS.md, sugerir ejecutar `oc-constitution` primero
- **Plan Mode es read-only** — no escribir archivos hasta aprobación
- **Siempre ofrecer 2-3 opciones** (excepto cuando solo 1 approach es viable)

## Conexión con otros skills
- **Antes**: `oc-constitution` (si es proyecto nuevo)
- **Después**: `oc-design` (plan técnico y diseño UI), `oc-tasks` (descomponer en TODOS.md)
