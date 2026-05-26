---
name: oc-qa
description: QA funcional y visual de una app o URL con foco en errores visibles, consola y UX básica. Usa chrome-devtools MCP.
---

# OpenCode QA

## Conexión con el flujo spec-driven

Este skill es el PASO 7 del flujo (verificación visual):

1. **Antes**: `oc-implement` (código implementado)
2. **Este skill**: Verifica en browser que todo funciona visualmente
3. **Después**: `oc-ship` (cerrar) o `oc-debug` (si se encontraron bugs)

Usa el agente `qa` (modelo MiniMax M2.5) cuando se delega como sub-agente.

## Objetivo
Revisar una aplicación desde la perspectiva del usuario, detectando roturas visibles y errores técnicos.

## Pasos operativos

### Paso 1: Navegar a la URL
Usar chrome-devtools MCP:
- `chrome-devtools_navigate_page` con URL del argumento
- Si no hay URL, usar `http://localhost:3000` o preguntar

### Paso 2: Capturar estado inicial
- `chrome-devtools_take_snapshot` — árbol de accesibilidad
- `chrome-devtools_take_screenshot` — evidencia visual

### Paso 3: Revisar consola
- `chrome-devtools_list_console_messages` — buscar errores y warnings
- Filtrar por tipos: `error`, `warn`

### Paso 4: Revisar network
- `chrome-devtools_list_network_requests` — buscar requests fallidos (status >= 400)
- Identificar recursos que no cargan

### Paso 5: Interactuar con flujos críticos
Si es app con auth o formularios:
- Intentar login simple o form submission
- Capturar snapshots después de interacciones

### Paso 6: Generar reporte
```
## Errores de consola
- [Error]: [mensaje] @ [timestamp]

## Requests fallidos
- [URL]: [status code]

## Problemas visuales
- [Descripción]: [elemento afectado]

## Flujos bloqueados
- [Descripción del bloqueo]

## Recomendación
[Acción prioritaria]
```

## Reglas
- Enfocarse en errores VISIBLES, no en optimizaciones
- Incluir pasos para reproducir
- Sugerir siguiente acción concreta
