---
name: oc-memory
description: Accede a memoria persistente de sesiones anteriores. Guarda decisiones, preferencias y contexto.
---

# OpenCode Memory

## Objetivo
Consultar, actualizar o revisar memoria persistente del proyecto actual.

## Uso

### Consultar memoria
```
"qué hicimos la sesión pasada"
"qué decisiones tomamos sobre la auth"
"recuerda el contexto del proyecto"
```

### Guardar información
```
"recuerda que prefiero tabs sobre spaces"
"guarda esta decisión: usamos JWT para auth"
"memoriza que el módulo de pagos está en progreso"
```

### Listar memoria
```
"muestra toda la memoria del proyecto"
"qué tengo pendiente de sesiones anteriores"
```

## Estructura de memoria

El sistema almacena:
- **Sesiones**: Resumen de cada sesión completada
- **Decisiones**: Decisiones técnicas importantes tomadas
- **Preferencias**: Preferencias del usuario para este proyecto
- **Contexto**: Estado del proyecto en la última sesión

## Ubicación
```
~/.opencode/memory/{project-hash}.json
```

## Pasos operativos

### Para consultar
1. Leer archivo de memoria del proyecto
2. Buscar información relevante por关键词
3. Presentar resumen estructurado

### Para guardar
1. Identificar tipo de información (decisión/preferencia/contexto)
2. Cargar memoria existente
3. Añadir nueva entrada con timestamp
4. Guardar memoria actualizada

### Para listar
1. Cargar memoria completa
2. Presentar por categorías:
   - Últimas 5 sesiones
   - Decisiones recientes
   - Preferencias activas
   - Items pendientes

## Formato de respuesta

### Consulta específica
```
📅 Última sesión: {fecha}
📝 Resumen: {resumen de lo que se hizo}

💾 Decisión encontrada:
- {fecha}: {decisión}

📌 Preferencias activas:
- {preferencia}: {valor}
```

### Listado completo
```
## Memoria del proyecto ({nombre})

### Sesiones ({n} totales)
- {fecha}: {resumen breve}
...

### Decisiones importantes
- {fecha}: {decisión}
...

### Preferencias
- {clave}: {valor}
...

### Items pendientes
- {item}
...
```

## Reglas
- Máximo 50 sesiones guardadas (FIFO)
- Decisiones nunca se eliminan automáticamente
- Preferencias se pueden sobrescribir
- Memoria es específica por proyecto
