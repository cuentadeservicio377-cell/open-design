---
name: oc-ship
description: Cierre de trabajo con validación final, estado git claro y preparación para commit, push o PR.
---

# OpenCode Ship

## Conexión con el flujo spec-driven

Este skill es el PASO FINAL del flujo de desarrollo:

1. **Antes**: `oc-review` (calidad verificada) + `oc-qa` (browser verificado)
2. **Este skill**: Cierra el trabajo (commit + PR)
3. **Después**: Proyecto listo, o nueva feature con `oc-specify`

## Objetivo
Cerrar una unidad de trabajo asegurando que está lista para integrarse.

## Pasos operativos

### Paso 1: Detectar stack y comandos apropiados
```bash
# Detectar tipo de proyecto
if [ -f "package.json" ]; then
  CHECK_CMD="npm test"
  LINT_CMD="npm run lint"
elif [ -f "Cargo.toml" ]; then
  CHECK_CMD="cargo test"
  LINT_CMD="cargo clippy"
elif [ -f "pyproject.toml" ] || [ -f "setup.py" ]; then
  CHECK_CMD="pytest"
  LINT_CMD="ruff check ."
elif [ -f "go.mod" ]; then
  CHECK_CMD="go test ./..."
  LINT_CMD="go vet ./..."
elif [ -f "mix.exs" ]; then
  CHECK_CMD="mix test"
  LINT_CMD="mix format --check-formatted"
else
  CHECK_CMD="echo 'No tests configured'"
fi
```

### Paso 2: Ejecutar checks
```bash
$CHECK_CMD
$LINT_CMD 2>/dev/null || true
```

### Paso 3: Revisar estado git
```bash
git status --short
git diff --stat
git log --oneline -3
```

### Paso 4: Generar summary
```
## Estado
- Tests: [✅ pass / ❌ fail / ⚠️ no tests]
- Lint: [✅ pass / ⚠️ warnings]

## Cambios listos para commit
[Lista de archivos modificados]

## Summary de cambios
[1-2 líneas describiendo qué se hizo]

## Commit message sugerido
[type]: [descripción corta]

- [detalle 1]
- [detalle 2]
```

### Paso 5: Confirmar acciones
SI el usuario confirma:
- `git add .`
- `git commit` con mensaje generado
- Sugerir push o PR creation

## Reglas
- NUNCA hacer `push --force` sin confirmación explícita
- NUNCA hacer acciones destructivas sin confirmación
- SIEMPRE mostrar qué se va a commitear antes
- Si hay tests failing, NO commitear sin aviso
