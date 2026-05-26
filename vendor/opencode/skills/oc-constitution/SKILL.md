---
name: oc-constitution
description: Establece los principios fundamentales del proyecto. Inspirado en Karpathy + spec-kit. Se ejecuta UNA VEZ por proyecto al inicio.
---

# OpenCode Constitution

## Objetivo
Crear el documento de principios que gobernará TODO el desarrollo del proyecto. Esto es lo primero que se hace en un proyecto nuevo — antes de cualquier código.

## Principios Karpathy (INVARIABLES)

### 1. Think Before Coding
- NUNCA implementar sin antes entender el problema completo
- Siempre explorar el código existente antes de proponer cambios
- Listar trade-offs antes de elegir un approach
- Si hay ambigüedad, preguntar — no asumir

### 2. Simplicity First
- NUNCA over-engineering: si se puede hacer en 10 líneas, no hacer en 100
- NUNCA agregar dependencias que nadie pidió
- NUNCA crear abstracciones prematuras (no crear interfaces para 1 implementación)
- Preferir composición sobre herencia
- Preferir funciones puras sobre clases con estado

### 3. Surgical Changes
- SOLO tocar archivos que el plan indica
- NUNCA "mientras estoy aquí, arreglo esto también"
- Cada cambio debe tener una justificación explícita
- Si un archivo necesita cambios fuera del plan → preguntar primero

### 4. Goal-Driven Execution
- Cada tarea necesita un criterio de éxito verificable
- Tests primero (TDD cuando aplique)
- NUNCA marcar tarea como completa sin verificar que funciona
- Si el test pasa, la tarea está hecha — no seguir "mejorando"

## Pasos operativos

### Paso 1: Detectar si ya existe constitution
```bash
# Buscar AGENTS.md en el proyecto actual
cat AGENTS.md 2>/dev/null | head -5
cat .specify/constitution.md 2>/dev/null | head -5
```

SI ya existe → mostrar resumen y preguntar si quiere actualizar.
SI no existe → crear nuevo.

### Paso 2: Analizar el proyecto
```bash
# Detectar stack
[ -f "package.json" ] && echo "Node.js" && cat package.json | head -20
[ -f "Cargo.toml" ] && echo "Rust"
[ -f "pyproject.toml" ] && echo "Python"
[ -f "go.mod" ] && echo "Go"
[ -f "mix.exs" ] && echo "Elixir"

# Detectar estructura
ls -la

# Detectar git
git log --oneline -5 2>/dev/null
git branch -a 2>/dev/null | head -10
```

### Paso 3: Generar constitution
Escribir o actualizar el archivo `AGENTS.md` del proyecto con:

```markdown
# {Nombre del Proyecto}

## Principios de Desarrollo
1. **Think Before Coding** → Entender antes de implementar
2. **Simplicity First** → Lo más simple que funcione
3. **Surgical Changes** → Solo cambios planificados
4. **Goal-Driven Execution** → Criterios de éxito verificables

## Stack
- Lenguaje: {detectado}
- Framework: {detectado}
- Test runner: {detectado}
- Linter: {detectado}

## Convenciones
- {detectadas del código existente: indentación, naming, etc.}

## Reglas de Archivos
- {archivos que NUNCA se tocan sin permiso}
- {archivos sensibles protegidos}

## Flujo de Trabajo
1. oc-specify → Definir qué construir
2. oc-design → Planificar cómo
3. oc-tasks → Descomponer en tareas
4. oc-implement → Ejecutar
5. oc-review → Verificar calidad
6. oc-ship → Cerrar

## Configuración de Diseño (si aplica)
\```yaml
design:
  style: "{sugerido según tipo de proyecto}"
  variance: 8
  motion: 6
  density: 4
\```
```

### Paso 4: Confirmar con el usuario
Mostrar la constitution generada y preguntar:
- "¿Apruebas estos principios para el proyecto?"
- "¿Quieres cambiar algo?"

### Paso 5: Guardar
Guardar en:
- `{directorio-del-proyecto}/AGENTS.md` — fuente de verdad
- `~/.opencode/memory/{project-hash}.json` — añadir decisión

## Reglas
- Se ejecuta UNA VEZ por proyecto (o cuando el usuario pide actualizar)
- NUNCA sobrescribir un AGENTS.md sin mostrar diff primero
- Si el proyecto ya tiene convenciones, respetarlas
- Máximo 3 preguntas al usuario — inferir el resto del código
