---
name: oc-scope
description: Protege contra scope creep y distracciones durante implementación. Scope Lock + Parking Lot + Jerarquía de decisiones. Inspirado en Kimi Code scope-guard + Codex Scope Lock.
---

# OpenCode Scope Guard

## Objetivo
Mantener al agente enfocado en la tarea actual del plan. Prevenir:
- Distraerse arreglando bugs no relacionados
- Proponer refactors que no están en el plan
- Meterse en rabbit holes técnicos
- Cambiar el plan sin autorización explícita

## Conexión con el flujo
- **Se activa automáticamente** durante `oc-implement`
- **Se consulta manualmente** con "scope check", "parking lot", "back to plan"
- **Complementa** `oc-tasks` (lee TODOS.md para saber qué está en progreso)

---

## Reglas de Oro

### 1. La Tarea Actual es Sagrada
- SOLO se trabaja en lo que está en `TODOS.md` → `## En Progreso`
- Todo lo demás está BLOQUEADO hasta nuevo aviso
- Si no hay tarea en `En Progreso`, mover la primera de `Pendientes`

### 2. El Parking Lot es tu Mejor Amigo

Cuando descubras algo que NO está en el plan actual:

```
PASO 1: NO toques el código relacionado con el hallazgo
PASO 2: Anota en TODOS.md → ## Parking Lot:
  - [ ] [SEVERIDAD] Descripción del issue
    - Archivo: ruta/función
    - Impacto: qué podría romper
    - Por qué no ahora: razón
PASO 3: Continúa con la tarea actual
PASO 4: Reporta al usuario al final de la fase
```

### 3. Jerarquía de Decisiones

| Situación | Acción |
|-----------|--------|
| **Bug CRÍTICO** que IMPIDE la tarea actual | ⛔ STOP → Reportar → Esperar decisión |
| Bug no crítico en código relacionado | 📝 Parking Lot → Continuar |
| Mejora de performance visible | 📝 Parking Lot → Continuar |
| Refactor que "quedaría mejor" | 📝 Parking Lot → Continuar |
| **Error de SEGURIDAD** (SQLi, XSS, secret hardcoded) | ⛔ STOP → Reportar INMEDIATAMENTE |
| Dependencia faltante del plan | ⛔ STOP → Reportar → Esperar decisión |
| Typo o formato en archivo que YA estás editando | ✅ Arreglar (cambio adyacente justificado) |

### 4. Re-lectura Forzada

**Cada 3 tareas completadas** (o cada 30 minutos), RE-LEER:
1. El plan original (`.specify/features/*/plan.md` o `docs/plans/*.md`)
2. `TODOS.md` — ¿Qué sigue?
3. Si hay desviación > 20% del plan, REPORTAR al usuario

### 5. Anti-Patterns BLOQUEADOS

**NUNCA digas ni hagas:**
- ❌ "Mientras estoy aquí, arreglo esto también..."
- ❌ "Veo que esto podría refactorizarse..."
- ❌ "Este patrón no es ideal, deberíamos cambiarlo..."
- ❌ "Hay un bug en esta otra función, déjame arreglarlo..."
- ❌ "Aprovecho y mejoro el naming de esta variable..."
- ❌ "Ya que abrí este archivo, optimizo esta query..."

**SIEMPRE digas y hagas:**
- ✅ "Anotado en Parking Lot. Continúo con [tarea actual]."
- ✅ "Termino esta tarea y luego pregunto si quieres revisar el Parking Lot."

---

## Comandos de Recuperación

El usuario puede decir en cualquier momento:

| Comando | Efecto |
|---------|--------|
| `"scope check"` | Revisar si estamos en scope del plan actual |
| `"parking lot"` | Mostrar todo lo que se ha pospuesto |
| `"back to plan"` | Abandonar lo que se esté haciendo y volver al plan |
| `"reset focus"` | Leer plan, olvidar distracciones, continuar tarea actual |
| `"promote parking lot"` | Revisar y priorizar items del Parking Lot |

---

## Integración con oc-implement

Cuando `oc-implement` está activo, `oc-scope` corre en segundo plano:

```
ANTES de cada tarea:
  → Verificar que la tarea está en "En Progreso" de TODOS.md
  → Si no está → moverla de "Pendientes" a "En Progreso"

DURANTE cada tarea:
  → Si se descubre algo fuera de scope → Parking Lot
  → Si el bug IMPIDE continuar → STOP y reportar

DESPUÉS de cada tarea:
  → Mover de "En Progreso" a "Hecho" en TODOS.md
  → Si es cada 3ª tarea → re-leer plan y TODOS.md
  → Si hay desviación → reportar
```

---

## Ejemplo de Flujo

```
Usuario: "ejecuta el plan"
Agente: [carga TODOS.md, Plan]

T01: Crear modelo User
  → Trabajando en T01...

Agente: [descubre que la función validateEmail en otro archivo tiene un bug]
  
  ❌ MAL: "Arreglo validateEmail primero..."
  ✅ BIEN: "Anotado en Parking Lot: Bug en validateEmail (utils/validators.ts).
            Continúo con T01."

Agente: [termina T01, la mueve a Hecho]
Agente: [T02: Crear endpoint POST /users]
  → Trabajando en T02...

Agente: [descubre que falta la dependencia bcrypt en package.json]
  
  ⛔ STOP: "La tarea T02 requiere bcrypt que no está en package.json.
           ¿Lo agrego como tarea T02.1 o continúo sin hash de passwords?"
```

---

## Reglas
- NUNCA ignorar el Scope Lock — es la regla más importante
- El Parking Lot NO se vacía sin autorización del usuario
- Si el usuario insiste en arreglar algo del Parking Lot → crear tarea explícita en Pendientes
- Los errores de SEGURIDAD son la ÚNICA excepción automática al Scope Lock
- Commits solo para la tarea actual — no mezclar cambios de diferentes tareas
