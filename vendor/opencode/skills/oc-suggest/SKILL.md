---
name: oc-suggest
description: Genera sugerencias proactivas basadas en el estado del proyecto. Detecta tests fallando, TODOs, issues de git y dependencias.
---

# OpenCode Suggest

## Objetivo
Analizar el proyecto y generar sugerencias de acción basadas en el estado actual.

## Cuándo usar
- Automáticamente después de cada respuesta (idle)
- Manualmente con "muéstrame sugerencias"
- Al inicio de sesión con "¿qué debería hacer?"

## Qué detecta

### Prioridad ALTA 🔴
- **Tests fallando**: Ejecuta test runner y detecta failures
- **Build roto**: Compilación o typecheck con errores
- **Conflictos git**: Merge conflicts sin resolver

### Prioridad MEDIA 📝
- **TODOs pendientes**: Comments TODO, FIXME, HACK en código
- **Branch desincronizado**: ahead/behind de remote
- **Archivos sin commit**: Más de 5 archivos modificados
- **Código duplicado**: Detección básica de duplicación

### Prioridad BAJA 📦
- **Dependencias outdated**: npm outdated, cargo outdated
- **Branches stale**: Branches antiguos sin merge
- **Cobertura baja**: Tests con coverage < 50%

## Pasos operativos

### Paso 1: Detectar stack
```bash
# Identificar tipo de proyecto
[ -f "package.json" ] && STACK="node"
[ -f "Cargo.toml" ] && STACK="rust"
[ -f "pyproject.toml" ] && STACK="python"
[ -f "go.mod" ] && STACK="go"
```

### Paso 2: Ejecutar checks según stack

#### Node/TypeScript
```bash
npm test -- --passWithNoTests 2>&1 | grep -E "FAIL|Error"
npm run build 2>&1 | grep -E "error|Error"
npm run typecheck 2>&1 || npx tsc --noEmit 2>&1 | grep -E "error"
```

#### Rust
```bash
cargo test 2>&1 | grep -E "test result:.*failed"
cargo build 2>&1 | grep -E "error\["
```

#### Python
```bash
pytest -q 2>&1 | grep -E "FAILED|ERROR"
```

#### Go
```bash
go test ./... 2>&1 | grep -E "FAIL"
go build ./... 2>&1 | grep -E "error"
```

### Paso 3: Detectar TODOs
```bash
rg -n "TODO|FIXME|HACK|XXX" --type-add 'code:*.{js,ts,jsx,tsx,py,rs,go}' -t code
```

### Paso 4: Detectar issues de git
```bash
git status --porcelain | wc -l  # Archivos modificados
git status -sb | grep -E "ahead|behind"  # Sync status
git log --oneline origin/main..HEAD | wc -l  # Commits ahead
```

### Paso 5: Generar sugerencias ordenadas

## Formato de salida

```
💡 Sugerencias para {proyecto}

🔴 CRÍTICO
├─ Tests: {n} tests fallando en {archivo}
│  → Acción: "revisa los tests en {archivo}"
│
└─ Build: Error en línea {n} de {archivo}
   → Acción: "fix the build error in {archivo}"

📝 IMPORTANTE
├─ TODOs: {n} pendientes
│  └─ {ejemplo más reciente}
│
└─ Git: {n} archivos sin commit
   → Acción: "commit these changes"

📦 MEJORAS
└─ Dependencias: {n} actualizaciones disponibles
   → Acción: "update dependencies"
```

## Comportamiento proactivo

### Después de cada respuesta (idle)
El plugin `proactive.js` automáticamente:
1. Ejecuta checks en segundo plano
2. Si hay sugerencias, las muestra
3. No interrumpe el flujo de trabajo

### Máximo 3 sugerencias mostradas
- Siempre ordenadas por prioridad
- Nunca repetir la misma sugerencia en la sesión
- Incluir acción sugerida concreta

## Reglas
- No ejecutar tests completos en cada idle (solo check rápido)
- Cachear resultados por 5 minutos
- Si usuario está trabajando en algo específico, no interrumpir
- Sugerencias deben ser accionables inmediatamente
