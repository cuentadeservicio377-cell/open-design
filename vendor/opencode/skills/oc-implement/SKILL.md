---
name: oc-implement
description: Ejecuta la implementación de las tareas definidas por oc-tasks. Sigue el plan, ejecuta tarea por tarea con Scope Lock, verifica cada una antes de pasar a la siguiente. Usa TODOS.md como mecanismo focal vivo. Inspirado en spec-kit.implement + Kimi Code scope-guard + Codex executing-plans.
---

# OpenCode Implement v3

## Objetivo
Ejecutar las tareas de implementación de forma disciplinada: una por una, con Scope Lock, verificando cada una antes de avanzar, actualizando TODOS.md en tiempo real.

## Cuándo usar
- Después de `oc-specify` → `oc-design` → `oc-tasks`
- Cuando el usuario dice "implementa", "ejecuta", "hazlo", "ya aprobé el plan"
- NUNCA sin un plan/tareas aprobado (a menos que sea tarea simple)

---

## Principios de ejecución (v3)

### 1. Scope Lock (INQUEBRANTABLE)
- SOLO trabajar en lo que está en `TODOS.md` → `## 🟢 En Progreso`
- Si descubres un bug, refactor, o mejora → `## 📝 Parking Lot`
- NUNCA arreglar algo fuera de la tarea actual
- Excepción ÚNICA: error de SEGURIDAD → STOP y reportar

**Regla anti-slop durante ejecución:**
```
Si el pensamiento es "mientras estoy aquí..." → DETENTE → Parking Lot → Continúa
```

### 2. Una tarea a la vez (actualizando TODOS.md)
- Mover tarea de `Pendientes` a `En Progreso` en TODOS.md
- Implementar SOLO esa tarea
- Verificar criterio de éxito
- Mover de `En Progreso` a `Hecho` en TODOS.md
- Avanzar a la siguiente

### 3. Re-lectura forzada cada 3 tareas
Cada 3 tareas completadas:
1. Re-leer el plan original y TODOS.md
2. Verificar que no haya desviación > 20%
3. Si hay desviación → reportar al usuario

### 4. Commits atómicos por tarea
- Después de cada tarea verificada → commit con mensaje `T##: descripción`
- NUNCA mezclar cambios de múltiples tareas en un commit
- Si el usuario no quiere commits automáticos, preguntar al final de cada ola

---

## Pasos operativos

### Paso 0: Cargar estado y activar Scope Lock
```bash
# Leer TODOS.md (FUENTE DE VERDAD durante ejecución)
cat TODOS.md 2>/dev/null || echo "❌ No hay TODOS.md — ejecuta oc-tasks primero"

# Leer spec y plan (contexto)
cat .specify/features/*/spec.md 2>/dev/null
cat .specify/features/*/plan.md 2>/dev/null

# Leer AGENTS.md
cat AGENTS.md 2>/dev/null

# Activar oc-scope (Scope Lock)
# Cargar skill oc-scope para reglas de Parking Lot
```

### Paso 1: Detectar estado actual
```bash
# Tests actuales
npm test 2>&1 | tail -5 || pytest -q 2>&1 | tail -5 || echo "No test runner"

# Git status
git status --short

# Build status
npm run build 2>&1 | tail -5 || cargo build 2>&1 | tail -5 || echo "No build"
```

### Paso 2: Ejecutar tareas en orden (con Scope Lock)

Para cada ola del TODOS.md:

```
OLA N: {M} tareas
```

Para cada tarea en la ola actual:

#### 2.1 PRE-TAREA: Activar foco
1. **Mover a En Progreso**: Actualizar TODOS.md:
   ```
   - [ ] T## → mover de Pendientes a En Progreso
   ```
2. **Verificar dependencias**: ¿Las dependencias de esta tarea están en Hecho?
   - Si NO → ERROR, no debería estar en esta ola
3. **Anunciar**: `🔨 T##: {descripción} — iniciando...`

#### 2.2 DURANTE-TAREA: Scope Lock activo
1. **Implementar**: Crear/modificar SOLO los archivos listados en la tarea
2. **Si descubres algo fuera de scope**:
   ```
   → NO tocar
   → Anotar en TODOS.md → Parking Lot
   → Continuar con la tarea
   ```
3. **Si el bug IMPIDE continuar**:
   ```
   → ⛔ STOP
   → Reportar: archivo, línea, error, bloqueo
   → Esperar decisión del usuario
   ```

#### 2.3 POST-TAREA: Verificar y commit
1. **Verificar**:
   ```bash
   # Ejecutar tests relevantes a la tarea
   # Ejecutar linter
   # Verificar criterio de éxito de la tarea
   ```
2. **Mover a Hecho**: Actualizar TODOS.md:
   ```
   - [x] T##: {descripción} → mover a Hecho
   ```
3. **Commit atómico** (si aplica):
   ```bash
   git add {archivos de la tarea}
   git commit -m "T##: {descripción corta}"
   ```

#### 2.4 Cada 3 tareas: Re-lectura forzada
```
📋 Re-lectura #N:
1. Leer plan original (.specify/features/*/plan.md)
2. Leer TODOS.md actual
3. ¿Desviación > 20%? → Reportar
4. ¿Siguiente tarea correcta? → Confirmar
```

### Paso 3: Reportar progreso (al final de cada ola)
```
📊 Progreso: {completadas}/{total} tareas ({porcentaje}%)
✅ Ola {N} completada ({M} tareas)
📝 Parking Lot: {P} items pendientes de revisión

→ Siguiente: Ola {N+1} con {M} tareas
→ ¿Continuar con siguiente ola?
```

### Paso 4: Cierre de implementación
Cuando todas las tareas estén en Hecho:
```bash
# Verificación final
npm test 2>&1 || pytest -q 2>&1
npm run build 2>&1 || cargo build 2>&1

# Gate de calidad (de TODOS.md)
- [ ] Todos los tests pasan
- [ ] Linter/typecheck limpio
- [ ] Build exitoso
```

### Paso 5: Reporte final
```
✅ IMPLEMENTACIÓN COMPLETA

📊 Stats:
- Tareas completadas: {N}/{N}
- Olas ejecutadas: {M}
- Tiempo total: ~{X} horas
- Commits: {C} commits atómicos

📝 Parking Lot acumulado:
{P} items para revisión futura

🚦 Siguientes pasos sugeridos:
1. oc-review → revisar calidad del código
2. oc-qa → verificar en browser
3. Revisar Parking Lot → ¿priorizar algo?
4. oc-ship → cerrar feature
```

---

## Estrategia de sub-agentes (para olas con tareas independientes)

Cuando una ola tiene tareas que NO comparten archivos:

```
Ola N: T04, T05, T06 (independientes entre sí)
→ Verificar: ¿comparten archivos? NO → paralelizar
→ Lanzar 3 sub-agentes, cada uno con:
  - SU tarea específica
  - SUS archivos a modificar
  - SU criterio de éxito
→ Cada sub-agente aplica oc-scope internamente
→ Esperar a que todos terminen
→ Verificar integración (tests)
→ Mover todos a Hecho
```

**Reglas para sub-agentes:**
- Máximo 4 sub-agentes en paralelo
- NUNCA paralelizar tareas que comparten archivos
- Cada sub-agente recibe SOLO su tarea (no el plan completo)
- El agente padre integra y verifica

---

## Reglas
- NUNCA implementar sin un TODOS.md o plan aprobado
- NUNCA marcar tarea como completa sin verificar el criterio de éxito
- Si un test falla, NO avanzar — corregir primero
- Si se descubre un requisito nuevo → Parking Lot, NO implementar de una vez
- Scope Lock es INQUEBRANTABLE durante la ejecución
- Hacer commits atómicos por tarea
- Respetar los principios del AGENTS.md del proyecto
- La ÚNICA excepción al Scope Lock son errores de SEGURIDAD

## Conexión con otros skills
- **Antes**: `oc-specify` → `oc-design` → `oc-tasks`
- **Durante**: `oc-scope` (Scope Lock activo)
- **Después**: `oc-review` (verificar calidad) → `oc-qa` (verificar en browser) → `oc-ship` (cerrar)
