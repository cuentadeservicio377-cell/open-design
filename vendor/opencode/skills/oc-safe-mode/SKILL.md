---
name: oc-safe-mode
description: Activa o desactiva modo seguro. Restringe comandos peligrosos y archivos sensibles.
---

# OpenCode Safe Mode

## Objetivo
Controlar el nivel de protección del sistema. Por defecto activo, pero se puede desactivar temporalmente.

## Uso

### Verificar estado
```
"safe mode status"
"está activado el modo seguro?"
```

### Activar
```
"activa safe mode"
"enable safe mode"
```

### Desactivar temporalmente
```
"desactiva safe mode temporalmente"
"safe mode off por 10 minutos"
```

## Comportamiento

### Safe Mode ON (por defecto)

#### Comandos bloqueados
- `rm -rf` con wildcards
- `sudo` (requiere confirmación)
- `git push --force`
- Comandos de formateo (`mkfs`, `dd`)
- Fork bombs

#### Archivos protegidos
- `.env`, `.env.*`
- `*.key`, `*.pem`
- `credentials.json`, `secrets.json`
- Archivos en `/etc/`, `/usr/`, `/System/`
- `~/.ssh/`, `~/.gnupg/`

#### Acciones
- Write/Edit en archivos sensibles → ERROR
- Bash con comandos peligrosos → ERROR
- Permisos del sistema → ERROR

### Safe Mode OFF (temporal)

#### Duración
- Por defecto: 10 minutos
- Máximo: 60 minutos
- Después: auto-activación

#### Durante modo off
- Todas las acciones permitidas
- Logs de todas las operaciones
- Advertencia en cada operación riesgosa

## Pasos operativos

### Verificar estado
```bash
# Leer estado del plugin
cat ~/.opencode/safe-mode.json 2>/dev/null || echo '{"enabled": true}'
```

### Activar safe mode
1. Escribir `{"enabled": true}` en `~/.opencode/safe-mode.json`
2. Confirmar: "✅ Safe mode ACTIVADO"

### Desactivar safe mode
1. Calcular expiración: `now + minutes`
2. Escribir: `{"enabled": false, "expires": timestamp}`
3. Confirmar: "⚠️ Safe mode DESACTIVADO por {minutes} minutos"
4. Advertencia: "Serás notificado antes de reactivación"

## Formato de respuesta

### Estado actual
```
🔒 Safe Mode: ACTIVADO

Protecciones activas:
✅ Comandos destructivos bloqueados (rm -rf, sudo, etc.)
✅ Archivos sensibles protegidos (.env, .key, etc.)
✅ Rutas del sistema bloqueadas (/etc, /usr, etc.)
```

### Desactivación
```
⚠️ Safe Mode: DESACTIVADO
⏱️ Expira en: {minutes} minutos
📋 Logs: Todas las operaciones serán registradas

⚠️ ADVERTENCIA:
- Ten cuidado con comandos destructivos
- Evita modificar archivos del sistema
- El sistema se reactivará automáticamente
```

### Operación bloqueada (safe mode ON)
```
🚫 OPERACIÓN BLOQUEADA

Comando: {comando}
Razón: {razón}

Para ejecutar esta operación:
1. Desactiva safe mode temporalmente: "safe mode off por 5 minutos"
2. O usa el comando directamente con confirmación manual

Tipo de bloqueo: {dangerous| sensitive| protected}
```

## Logs

Todas las operaciones en safe mode se registran:
```
~/.opencode/logs/safe-mode.log
```

Formato:
```
[TIMESTAMP] {ACTION} | {STATUS} | {USER_RESPONSE}
```

## Reglas
- Safe mode ON por defecto al iniciar OpenCode
- Solo se puede desactivar temporalmente
- Logs siempre activos (incluso en modo off)
- Notificación 1 minuto antes de reactivación
- Si hay operación en progreso, esperar a completar
