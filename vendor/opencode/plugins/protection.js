// OpenCode Protection Plugin v2 — Safety guardrails + AgentShield-inspired checks
// Fixed: Uses correct API, adds security audit patterns from AgentShield

const DANGEROUS_PATTERNS = [
  /^rm\s+-rf/,
  /^rm\s+-fr/,
  /^rm\s+.*\*/,
  /sudo\s+/,
  />\s*\/dev\/(sda|hda|nvme)/,
  /mkfs/,
  /dd\s+if=/,
  /:(){ :|:& };:/,     // Fork bomb
  /chmod\s+777/,
  /chown\s+.*:\s*\*/,
  /^git\s+push\s+.*--force/,
  /^git\s+push\s+.*-f\s/,
  /drop\s+table/i,
  /delete\s+from/i,
  /truncate\s+table/i
]

const SENSITIVE_FILES = [
  /\.env$/,
  /\.env\./,
  /\.key$/,
  /\.pem$/,
  /\.p12$/,
  /credentials/i,
  /secrets?\.json$/i,
  /password/i,
  /token/i,
  /\.npmrc$/,
  /\.gitconfig$/,
  /ssh\/id_/
]

const PROTECTED_PATHS = [
  /^\/etc\//,
  /^\/usr\//,
  /^\/var\//,
  /^\/System\//,
  /^\/Applications\//,
  /^~\/\.ssh\//,
  /^~\/\.gnupg\//
]

// AgentShield-inspired: detect secrets in file content
const SECRET_PATTERNS = [
  /(?:api[_-]?key|apikey)\s*[:=]\s*['"][a-zA-Z0-9]{20,}['"]/i,
  /(?:secret|token)\s*[:=]\s*['"][a-zA-Z0-9]{20,}['"]/i,
  /(?:password|passwd)\s*[:=]\s*['"].+['"]/i,
  /sk-[a-zA-Z0-9]{32,}/,         // OpenAI-style keys
  /ghp_[a-zA-Z0-9]{36,}/,        // GitHub PATs
  /AKIA[A-Z0-9]{16}/,            // AWS access keys
  /[a-f0-9]{40}/,                 // Potential hex secrets (check context)
]

function isDangerousCommand(command) {
  return DANGEROUS_PATTERNS.some(pattern => pattern.test(command))
}

function isSensitiveFile(filePath) {
  return SENSITIVE_FILES.some(pattern => pattern.test(filePath))
}

function isProtectedPath(filePath) {
  return PROTECTED_PATHS.some(pattern => pattern.test(filePath))
}

function containsSecret(content) {
  if (typeof content !== "string") return null
  for (const pattern of SECRET_PATTERNS) {
    const match = content.match(pattern)
    if (match) return match[0].substring(0, 20) + "..."
  }
  return null
}

export const ProtectionPlugin = async ({ project, client, $, directory }) => {
  return {
    // Hook: tool execute before — intercept dangerous operations
    "tool.execute.before": async (input, output) => {
      // Check bash commands
      if (input.tool === "bash") {
        const command = output.args?.command || ""

        if (isDangerousCommand(command)) {
          throw new Error(
            `⚠️ Comando bloqueado por seguridad: "${command.substring(0, 30)}..."\n` +
            `Si necesitas ejecutarlo, desactiva safe-mode temporalmente con oc-safe-mode.`
          )
        }
      }

      // Check file writes
      if (input.tool === "write" || input.tool === "edit") {
        const filePath = output.args?.filePath || output.args?.path || ""

        if (isSensitiveFile(filePath)) {
          throw new Error(
            `⚠️ Archivo sensible protegido: "${filePath}"\n` +
            `Contiene información sensible. Si necesitas modificarlo, usa oc-safe-mode.`
          )
        }

        if (isProtectedPath(filePath)) {
          throw new Error(
            `⚠️ Ruta protegida: "${filePath}"\n` +
            `No se pueden modificar archivos del sistema.`
          )
        }

        // AgentShield-inspired: check for secrets in content being written
        const content = output.args?.content || ""
        const secretFound = containsSecret(content)
        if (secretFound) {
          throw new Error(
            `⚠️ Posible secret detectado en el contenido: "${secretFound}"\n` +
            `No se deben hardcodear secrets. Usa variables de entorno.\n` +
            `Si es falso positivo, usa oc-safe-mode para omitir.`
          )
        }
      }
    }
  }
}

export default ProtectionPlugin
