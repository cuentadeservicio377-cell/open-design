# TODOS — Open Design + OpenCode: Sincronización del repo

## En Progreso
_Empty_

## Pendientes
- [ ] Commitear y pushear los cambios a GitHub
- [ ] Probar `install.sh` en una máquina limpia (o verificar symlinks)
- [ ] Documentar en README.md cómo usar el repo en otra máquina

## Parking Lot (NO tocar ahora)
- La skill `use-railway` quedó en vendor/opencode/skills/ por ser parte del set oficial de OpenCode (el usuario puede decidir no usarla)
- Las skills de gstack no esenciales (office-hours, plan-ceo-review, retro, etc.) se incluyen completas para no romper la suite

## Hecho
- [x] Actualizar .gitignore para excluir archivos personales (CVs, propuestas, PDFs, screenshots, directorios sueltos)
- [x] Revisar estructura de las 4 skills externas esenciales (Gstack, Taste-skill, Kami, Agent-reach)
- [x] Copiar Gstack a vendor/gstack/ (sin node_modules ni browse/dist)
- [x] Copiar Taste-skill a vendor/taste-skill/
- [x] Copiar Kami a vendor/kami/
- [x] Copiar Agent-reach a vendor/agent-reach/
- [x] Copiar config de OpenCode a vendor/opencode/ (16 skills oc-*, 5 plugins, MCP proxy, AGENTS.md, opencode.json.template sanitizado)
- [x] Crear install.sh para replicar instalación completa en otra máquina
- [x] Verificar que no hay secrets en vendor/
- [x] Verificar que no hay nested .git en vendor/
- [x] Verificar que .gitignore funciona correctamente para archivos personales
