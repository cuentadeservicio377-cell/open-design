---
name: oc-review
description: Review estructurado con findings primero, severidad y foco en regresiones. Se ejecuta en modo read-only desde build.
---

# OpenCode Review

## Conexión con el flujo spec-driven

Este skill es el PASO 6 del flujo (verificación de calidad):

1. **Antes**: `oc-implement` (código implementado)
2. **Este skill**: Review de calidad (security → regressions → performance → quality)
3. **Después**: `oc-qa` (verificar en browser) → `oc-ship` (cerrar)

Usa el agente `review` (modelo Qwen 235B) cuando se delega como sub-agente.
Qwen tiene mejor razonamiento analítico para detectar bugs y regresiones.

## Objetivo
Detectar bugs, regresiones, vulnerabilidades y problemas de calidad en cambios de código.

## Pasos operativos

### Paso 1: Obtener cambios
```bash
# Si hay argumento de range
git diff $ARGUMENTS

# Si no, usar HEAD~1
git diff HEAD~1

# Si es working directory
git diff
```

### Paso 2: Patrones de riesgo prioritarios
Buscar en orden:
1. **Seguridad**: SQL sin parametrizar, eval(), secrets hardcoded, auth sin validación
2. **Regresiones**: Cambios en APIs públicas, modificaciones de comportamiento existente
3. **Performance**: N+1 queries, loops anidados, memoria sin liberar
4. **Calidad**: Código muerto, naming confuso, duplicación
5. **Tests**: Cobertura faltante para lógica nueva

### Paso 3: Herramientas automáticas (si aplican)
```bash
# JavaScript/TypeScript
npm run lint 2>/dev/null || npx eslint . 2>/dev/null || true
npm run typecheck 2>/dev/null || npx tsc --noEmit 2>/dev/null || true

# Python
ruff check . 2>/dev/null || true
mypy . 2>/dev/null || true

# Rust
cargo clippy 2>/dev/null || true

# Go
go vet ./... 2>/dev/null || true
```

### Paso 4: Generar findings
```
## CRITICAL (bloqueantes)
- [Archivo:Línea] Descripción del problema
  - Impacto: [qué rompe]
  - Fix sugerido: [cómo arreglarlo]

## HIGH (importantes)
- [Archivo:Línea] Descripción
  - Impacto: [qué podría fallar]

## MEDIUM (mejoras)
- [Archivo:Línea] Descripción

## LOW (nice-to-have)
- [Descripción general]
```

### Paso 5: Resumen
Si no hay findings críticos o high:
`✅ No se encontraron problemas de seguridad o regresiones. [N] findings menores de calidad.`

Si hay problemas:
`❌ [N] findings CRITICAL, [N] HIGH. Revisar antes de merge.`

## Reglas
- NO editar archivos (read-only)
- SIEMPRE incluir línea/cómo reproducir
- Si no hay findings, decirlo explícitamente
- Priorizar seguridad y regresiones sobre estilo
