---
name: oc-tasks
description: Descompone una especificación o plan en tareas ejecutables. Cada tarea es bite-sized (5-15 min), tiene criterio de éxito verificable y dependencias claras. Genera TODOS.md focal con En Progreso/Pendientes/Parking Lot/Hecho. Inspirado en spec-kit.tasks + Codex TODOS.md.
---

# OpenCode Tasks v3

## Objetivo
Convertir una spec o plan en una lista de tareas ejecutables con un mecanismo de foco activo (TODOS.md). Cada tarea es bite-sized, verificable y ordenada por dependencias.

## Cuándo usar
- Después de `oc-specify` y `oc-design`
- Cuando el usuario dice "descompón", "divide en tareas", "organiza el trabajo"
- NUNCA para tareas que ya son obvias y pequeñas

## Pasos operativos

### Paso 1: Cargar contexto
```bash
# Leer spec
cat .specify/features/*/spec.md 2>/dev/null

# Leer plan de diseño (si existe)
cat .specify/features/*/plan.md 2>/dev/null

# Leer AGENTS.md del proyecto
cat AGENTS.md 2>/dev/null

# Verificar si ya existe TODOS.md
cat TODOS.md 2>/dev/null && echo "⚠️ Ya existe TODOS.md — se actualizará"
```

### Paso 2: Identificar tareas
Para cada requisito funcional en la spec, crear tareas que:

1. **Sean bite-sized**: 5-15 minutos cada una
2. **Sean independientes**: cada tarea produce algo verificable por sí sola
3. **Tengan criterio de éxito**: test o verificación concreta
4. **Tengan dependencias explícitas**: qué tareas deben completarse antes

### Paso 3: Ordenar por dependencias
Crear un DAG (grafo acíclico dirigido) de dependencias:

```
T01 → T02 → T03
         → T04
   → T05 → T06
```

Agrupar en "olas" (waves) de ejecución paralela:
- Wave 1: Tareas sin dependencias
- Wave 2: Tareas que dependen de Wave 1
- etc.

### Paso 4: Generar TODOS.md (formato v3 — mecanismo focal)

```markdown
# TODOS — {Nombre del Feature/Proyecto}

> Plan: `.specify/features/{nombre}/plan.md`
> Spec: `.specify/features/{nombre}/spec.md`
> Creado: {fecha}

---

## 🟢 En Progreso
*(máximo 1 tarea a la vez)*

- [ ] 

---

## ⬜ Pendientes

### Ola 1 (base — {N} tareas)
- [ ] T01: {descripción corta}
  - Archivos: `{archivos}` | Criterio: `{cómo verificar}` | Depende de: —
- [ ] T02: {descripción}
  - Archivos: `{archivos}` | Criterio: `{cómo verificar}` | Depende de: —

### Ola 2 (depende de Ola 1 — {N} tareas)
- [ ] T03: {descripción}
  - Archivos: `{archivos}` | Criterio: `{cómo verificar}` | Depende de: T01
- [ ] T04: {descripción}
  - Archivos: `{archivos}` | Criterio: `{cómo verificar}` | Depende de: T02

### Ola 3 (depende de Ola 2 — {N} tareas)
- [ ] T05: {descripción}
  - Archivos: `{archivos}` | Criterio: `{cómo verificar}` | Depende de: T03, T04

---

## 📝 Parking Lot
*(NO TOCAR hasta que el usuario lo autorice)*

> Bugs, refactors, y mejoras descubiertas durante la implementación.
> El agente NO puede trabajar en estos items sin autorización explícita.

*(vacío al inicio — se llena durante la ejecución)*

---

## ✅ Hecho

*(vacío al inicio — se llena conforme se completan tareas)*

---

## 📊 Estimación
- **Tareas totales**: {N}
- **Olas**: {M}
- **Tiempo estimado**: {X-Y horas}
- **Tests planeados**: {N} unit + {N} integration

## 🚦 Gate de Calidad
- [ ] Todos los tests pasan
- [ ] Linter/typecheck limpio
- [ ] Build exitoso
- [ ] oc-review aprobado (sin CRITICAL/HIGH)
```

### Paso 5: Presentar al usuario
Mostrar el TODOS.md y preguntar:
1. "¿Las tareas cubren todo lo necesario?"
2. "¿Falta algún requisito?"
3. "¿Apruebas para pasar a implementación con oc-implement?"

---

## Formato legacy (tasks.md en .specify/)

Además del TODOS.md en raíz (mecanismo focal vivo), se mantiene una copia de respaldo en:
```
.specify/features/{nombre}/tasks.md
```

Este archivo usa el formato legacy para compatibilidad, pero el **TODOS.md en la raíz es la fuente de verdad durante la ejecución**.

---

## Reglas
- Cada tarea DEBE tener un criterio de éxito verificable
- NUNCA crear tareas de más de 15 minutos — dividir más
- NUNCA crear tareas sin archivo(s) asociado(s)
- Si una tarea requiere más de 3 archivos, probablemente es demasiado grande
- Incluir tests como tareas explícitas (no como afterthought)
- Marcar dependencias con `(depende de T##)`
- TODOS.md es un archivo VIVO — se actualiza en tiempo real durante implementación
- Parking Lot se llena pero NO se vacía sin autorización
- Solo 1 tarea en "En Progreso" a la vez

## Conexión con otros skills
- **Antes**: `oc-specify` + `oc-design`
- **Después**: `oc-implement` (ejecutar las tareas, leyendo TODOS.md)
- **Complementa**: `oc-scope` (Scope Lock durante ejecución)
