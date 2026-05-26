#!/usr/bin/env bash
# ============================================================
# Open Design + OpenCode — Instalador completo
# ============================================================
# Replica todo el flujo de diseño OD + OpenCode en otra máquina.
# Uso: bash install.sh
# ============================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VENDOR_DIR="$SCRIPT_DIR/vendor"

# ── Colores ──────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

info()  { echo -e "${CYAN}→${NC} $1"; }
ok()    { echo -e "${GREEN}✓${NC} $1"; }
warn()  { echo -e "${YELLOW}⚠${NC} $1"; }
err()   { echo -e "${RED}✗${NC} $1"; }

echo ""
echo -e "${BOLD}🎨 Open Design + OpenCode — Instalador${NC}"
echo "============================================"
echo ""

# ── 1. Verificar prerequisitos ──────────────────────────
info "Verificando prerequisitos..."

command -v node >/dev/null 2>&1 || { err "Node.js no encontrado. Instálalo primero: https://nodejs.org"; exit 1; }
command -v pnpm >/dev/null 2>&1 || { err "pnpm no encontrado. Instálalo: npm install -g pnpm"; exit 1; }

ok "Node.js $(node --version)"
ok "pnpm $(pnpm --version)"

# ── 2. Instalar dependencias del proyecto OD ─────────────
info "Instalando dependencias de Open Design..."
cd "$SCRIPT_DIR"
pnpm install --frozen-lockfile 2>/dev/null || pnpm install
ok "Dependencias OD instaladas"

# ── 3. Instalar skills de Claude ─────────────────────────
info "Instalando skills de Claude..."

# Crear directorios si no existen
mkdir -p ~/.claude/skills
mkdir -p ~/.claude/vendor

# Agent-reach → ~/.claude/skills/agent-reach/
if [ -d "$VENDOR_DIR/agent-reach" ]; then
    rm -rf ~/.claude/skills/agent-reach 2>/dev/null || true
    ln -sf "$VENDOR_DIR/agent-reach" ~/.claude/skills/agent-reach
    ok "agent-reach → ~/.claude/skills/agent-reach"
fi

# Gstack skills → ~/.claude/skills/gstack/
if [ -d "$VENDOR_DIR/gstack" ]; then
    rm -rf ~/.claude/skills/gstack 2>/dev/null || true
    ln -sf "$VENDOR_DIR/gstack" ~/.claude/skills/gstack

    # Crear symlinks individuales para cada sub-skill de gstack
    # (así Claude puede cargarlos directamente por nombre)
    for skill_dir in "$VENDOR_DIR/gstack"/*/; do
        skill_name=$(basename "$skill_dir")
        if [ "$skill_name" != "docs" ] && [ "$skill_name" != "scripts" ] && \
           [ "$skill_name" != "test" ] && [ "$skill_name" != "bin" ] && \
           [ "$skill_name" != "supabase" ] && [ "$skill_name" != "node_modules" ] && \
           [ -f "$skill_dir/SKILL.md" ]; then
            rm -rf ~/.claude/skills/"$skill_name" 2>/dev/null || true
            ln -sf "$VENDOR_DIR/gstack/$skill_name" ~/.claude/skills/"$skill_name"
        fi
    done
    ok "gstack → ~/.claude/skills/gstack/ + sub-skills symlinked"

    # Instalar dependencias de gstack y buildear browse
    if command -v bun >/dev/null 2>&1; then
        info "Build de gstack (bun)..."
        cd "$VENDOR_DIR/gstack"
        bun install --frozen-lockfile 2>/dev/null || bun install
        bun run build 2>/dev/null || warn "No se pudo buildear gstack browse (necesitarás bun)"
        cd "$SCRIPT_DIR"
    else
        warn "bun no encontrado. gstack browse no funcionará sin build."
        warn "Instala bun: curl -fsSL https://bun.sh/install | bash"
    fi
fi

# Taste-skill → ~/.claude/vendor/taste-skill/
if [ -d "$VENDOR_DIR/taste-skill" ]; then
    rm -rf ~/.claude/vendor/taste-skill 2>/dev/null || true
    ln -sf "$VENDOR_DIR/taste-skill" ~/.claude/vendor/taste-skill

    # Symlinks individuales para cada sub-skill
    for skill_dir in "$VENDOR_DIR/taste-skill/skills"/*/; do
        skill_name=$(basename "$skill_dir")
        rm -rf ~/.claude/skills/"$skill_name" 2>/dev/null || true
        ln -sf "$VENDOR_DIR/taste-skill/skills/$skill_name" ~/.claude/skills/"$skill_name"
    done
    ok "taste-skill → ~/.claude/vendor/taste-skill/ + 8 skills symlinked"
fi

# Kami → ~/.agents/skills/kami/
mkdir -p ~/.agents/skills
if [ -d "$VENDOR_DIR/kami" ]; then
    rm -rf ~/.agents/skills/kami 2>/dev/null || true
    ln -sf "$VENDOR_DIR/kami" ~/.agents/skills/kami
    # También symlink a ~/.claude/skills/ para fácil acceso
    rm -rf ~/.claude/skills/kami 2>/dev/null || true
    ln -sf "$VENDOR_DIR/kami" ~/.claude/skills/kami
    ok "kami → ~/.agents/skills/kami + ~/.claude/skills/kami"
fi

# ── 4. Instalar configuración de OpenCode ────────────────
info "Instalando configuración de OpenCode..."

OPENCODE_CONFIG_DIR="${OPENCODE_CONFIG_DIR:-$HOME/.config/opencode}"

if [ -d "$VENDOR_DIR/opencode" ]; then
    mkdir -p "$OPENCODE_CONFIG_DIR"

    # Skills oc-*
    if [ -d "$VENDOR_DIR/opencode/skills" ]; then
        rm -rf "$OPENCODE_CONFIG_DIR/skills" 2>/dev/null || true
        ln -sf "$VENDOR_DIR/opencode/skills" "$OPENCODE_CONFIG_DIR/skills"
        ok "OpenCode skills → $OPENCODE_CONFIG_DIR/skills"
    fi

    # Plugins
    if [ -d "$VENDOR_DIR/opencode/plugins" ]; then
        rm -rf "$OPENCODE_CONFIG_DIR/plugins" 2>/dev/null || true
        ln -sf "$VENDOR_DIR/opencode/plugins" "$OPENCODE_CONFIG_DIR/plugins"
        ok "OpenCode plugins → $OPENCODE_CONFIG_DIR/plugins"
    fi

    # MCP (Elementor proxy)
    if [ -d "$VENDOR_DIR/opencode/mcp" ]; then
        rm -rf "$OPENCODE_CONFIG_DIR/mcp" 2>/dev/null || true
        ln -sf "$VENDOR_DIR/opencode/mcp" "$OPENCODE_CONFIG_DIR/mcp"
        ok "OpenCode MCP proxy → $OPENCODE_CONFIG_DIR/mcp"
    fi

    # AGENTS.md global
    if [ -f "$VENDOR_DIR/opencode/AGENTS.md" ]; then
        cp "$VENDOR_DIR/opencode/AGENTS.md" "$OPENCODE_CONFIG_DIR/AGENTS.md"
        ok "OpenCode AGENTS.md → $OPENCODE_CONFIG_DIR/AGENTS.md"
    fi

    # opencode.json (solo si no existe, para no pisar config existente)
    if [ ! -f "$OPENCODE_CONFIG_DIR/opencode.json" ]; then
        if [ -f "$VENDOR_DIR/opencode/opencode.json.template" ]; then
            cp "$VENDOR_DIR/opencode/opencode.json.template" "$OPENCODE_CONFIG_DIR/opencode.json"
            warn "Creado $OPENCODE_CONFIG_DIR/opencode.json desde template"
            warn "╔══════════════════════════════════════════════════════╗"
            warn "║  EDITA LAS CREDENCIALES DE ELEMENTOR:               ║"
            warn "║  \$EDITOR $OPENCODE_CONFIG_DIR/opencode.json         ║"
            warn "║  Busca: YOUR-WORDPRESS-SITE, YOUR_WP_USERNAME...    ║"
            warn "╚══════════════════════════════════════════════════════╝"
        fi
    else
        ok "opencode.json ya existe, se preserva tu configuración"
    fi
fi

# ── 5. Verificar gitignore local ─────────────────────────
info "Verificando .gitignore..."
cd "$SCRIPT_DIR"
if ! grep -q "vendor/gstack/node_modules" .gitignore 2>/dev/null; then
    cat >> .gitignore <<'EOF'

# Vendor: prevent accidental commits of generated files
vendor/gstack/node_modules/
vendor/gstack/browse/dist/
EOF
    ok "Añadido exclusiones de vendor al .gitignore"
fi

# ── 6. Resumen final ─────────────────────────────────────
echo ""
echo -e "${BOLD}${GREEN}✅ Instalación completa${NC}"
echo "============================================"
echo ""
echo -e "${BOLD}Estructura instalada:${NC}"
echo "  ~/.claude/skills/     → gstack, agent-reach, taste-skill/*, kami"
echo "  ~/.claude/vendor/     → taste-skill (fuente)"
echo "  ~/.agents/skills/     → kami"
echo "  ~/.config/opencode/   → skills oc-*, plugins, mcp, AGENTS.md"
echo ""
echo -e "${BOLD}Próximos pasos:${NC}"
echo "  1. Edita las credenciales de Elementor si usas WordPress:"
echo "     \$EDITOR ~/.config/opencode/opencode.json"
echo "  2. Arranca el daemon de Open Design para preview visual:"
echo "     cd $SCRIPT_DIR && pnpm tools-dev run web"
echo "  3. Para diseñar algo, simplemente pídeselo a OpenCode:"
echo "     \"Quiero diseñar un dashboard estilo Linear para WS Capital\""
echo ""
