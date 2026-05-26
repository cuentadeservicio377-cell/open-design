---
name: oc-debug
description: Debugging sistemático con hipótesis. Nunca arreglar sin entender la causa raíz. Inspirado en systematic-debugging + debugging-wizard + Superpowers.
---

# OpenCode Debug

## Objetivo
Encontrar y corregir bugs de forma sistemática. NUNCA arreglar sin entender la causa raíz.

## Cuándo usar
- Cuando algo no funciona: errores, bugs, tests fallando, comportamiento inesperado
- Cuando el usuario dice "no funciona", "hay un bug", "esto falla"
- NUNCA adivinar la solución — siempre investigar primero

## Principios

### Iron Law: No fixes without root cause
- NUNCA hacer "fix por síntoma" — siempre encontrar la CAUSA
- Si no puedes explicar por qué falla, no estás listo para arreglarlo
- Un fix sin causa raíz = un bug futuro

### Hipótesis-driven debugging
1. Observar el síntoma
2. Generar hipótesis de causa raíz
3. Diseñar experimento para validar/rechazar hipótesis
4. Ejecutar experimento
5. Si hipótesis confirmada → fix
6. Si no → siguiente hipótesis

## Pasos operativos

### Paso 1: Recopilar información
```bash
# Error message completo
# Stack trace
# Archivo y línea del error
# Comportamiento esperado vs actual
# Cuándo empezó a fallar (si se sabe)
```

### Paso 2: Reproducir
- ¿El error es reproducible?
- ¿Hay pasos mínimos para reproducirlo?
- ¿Es consistente o intermitente?

### Paso 3: Generar hipótesis (máximo 3)
Listar las causas más probables en orden de likelihood:

```
HIPÓTESIS 1 (70%): {descripción}
→ Experimento: {cómo verificar}

HIPÓTESIS 2 (20%): {descripción}  
→ Experimento: {cómo verificar}

HIPÓTESIS 3 (10%): {descripción}
→ Experimento: {cómo verificar}
```

### Paso 4: Ejecutar experimentos
```bash
# Verificar hipótesis 1
# Si falla → verificar hipótesis 2
# Si falla → verificar hipótesis 3
```

Herramientas disponibles:
- `bash` → ejecutar comandos, tests, logs
- `grep`/`rg` → buscar en código
- `read` → leer archivos relevantes
- `chrome-devtools` → inspeccionar browser (console, network, elements)

### Paso 5: Confirmar causa raíz
UNA VEZ confirmada la causa raíz:
```
🔍 CAUSA RAÍZ CONFIRMADA:
- Archivo: {archivo}
- Línea: {línea}
- Problema: {explicación}
- Por qué: {razón técnica}
```

### Paso 6: Aplicar fix
- Hacer el cambio MÍNIMO necesario
- SOLO tocar el archivo(s) con la causa raíz
- Ejecutar tests para verificar
- Si hay tests nuevos que debería agregar → agregarlos

### Paso 7: Verificar
```bash
# Tests pasan
# Limpieza (no dejar debug logs, etc.)
# Comportamiento ahora es correcto
```

## Para errores de browser específicamente
1. Abrir Chrome DevTools MCP
2. `take_snapshot` → ver árbol de accesibilidad
3. `list_console_messages` → buscar errores
4. `list_network_requests` → buscar requests fallidos
5. `take_screenshot` → ver estado visual
6. Interactuar con el elemento problemático
7. Repetir

## Formato de reporte
```markdown
## Bug: {título}

### Síntoma
{qué se observa}

### Causa raíz
{explicación técnica}

### Fix
{qué se cambió}

### Verificación
- [ ] Tests pasan
- [ ] Comportamiento correcto
- [ ] No regresiones
```

## Reglas
- NUNCA hacer fix sin confirmar causa raíz
- MÁXIMO 3 hipótesis antes de pedir ayuda al usuario
- Si después de 3 hipótesis no se encuentra la causa → reportar y preguntar
- Siempre explicar QUÉ se cambió y POR QUÉ
- Hacer commits atómicos para fixes de bugs

## Conexión con otros skills
- **Relacionado**: `oc-review` (para bugs de calidad), `oc-qa` (para bugs visuales)
- **Después**: `oc-ship` (para commit del fix)
