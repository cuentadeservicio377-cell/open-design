// OpenCode Memory Plugin v3 — Cross-session memory with auto-extraction
// Inspired by: Codex memories/ system + Kimi Code session persistence
// New in v3: auto-extract, multi-file, frontmatter, MEMORY.md index

import { writeFileSync, readFileSync, existsSync, mkdirSync, readdirSync } from "fs"
import { join, dirname } from "path"
import { createHash } from "crypto"

const MEMORY_DIR = join(process.env.HOME, ".opencode", "memory")

if (!existsSync(MEMORY_DIR)) {
  mkdirSync(MEMORY_DIR, { recursive: true })
}

function getProjectHash(directory) {
  return createHash("md5").update(directory).digest("hex").substring(0, 12)
}

function getProjectMemoryDir(projectHash) {
  const dir = join(MEMORY_DIR, projectHash)
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }
  return dir
}

function getMemoryIndexPath(projectHash) {
  return join(getProjectMemoryDir(projectHash), "MEMORY.md")
}

function getLegacyMemoryPath(projectHash) {
  return join(MEMORY_DIR, `${projectHash}.json`)
}

// --- Legacy support: migrate old JSON to new directory structure ---
function migrateLegacyMemory(projectHash) {
  const legacyPath = getLegacyMemoryPath(projectHash)
  const projectDir = getProjectMemoryDir(projectHash)
  const indexPath = getMemoryIndexPath(projectHash)

  if (existsSync(legacyPath) && !existsSync(indexPath)) {
    try {
      const legacy = JSON.parse(readFileSync(legacyPath, "utf-8"))
      const memories = []

      // Convert sessions to memory files
      if (legacy.sessions && legacy.sessions.length > 0) {
        const sessionsContent = legacy.sessions
          .map(s => `- **${s.date}**: ${s.summary}`)
          .join("\n")
        const sessionsFile = join(projectDir, "sessions.md")
        writeFileSync(sessionsFile, `---\nname: session history\ndescription: Historial de sesiones del proyecto\ntype: project\n---\n\n${sessionsContent}`)
        memories.push({ name: "session history", file: "sessions.md", type: "project" })
      }

      // Convert decisions
      if (legacy.decisions && legacy.decisions.length > 0) {
        const decisionsContent = legacy.decisions
          .map(d => `- **${d.date}**: ${d.decision}`)
          .join("\n")
        const decisionsFile = join(projectDir, "decisions.md")
        writeFileSync(decisionsFile, `---\nname: technical decisions\ndescription: Decisiones técnicas tomadas durante el desarrollo\ntype: project\n---\n\n${decisionsContent}`)
        memories.push({ name: "technical decisions", file: "decisions.md", type: "project" })
      }

      // Convert preferences
      if (legacy.preferences && Object.keys(legacy.preferences).length > 0) {
        const prefsContent = Object.entries(legacy.preferences)
          .map(([k, v]) => `- **${k}**: ${v}`)
          .join("\n")
        const prefsFile = join(projectDir, "preferences.md")
        writeFileSync(prefsFile, `---\nname: project preferences\ndescription: Preferencias del usuario para este proyecto\ntype: user\n---\n\n${prefsContent}`)
        memories.push({ name: "project preferences", file: "preferences.md", type: "user" })
      }

      // Write MEMORY.md index
      const indexContent = generateIndex(projectHash, memories, "Migrated from legacy memory")
      writeFileSync(indexPath, indexContent)

      // Delete legacy file after successful migration
      try {
        const { unlinkSync } = require("fs")
        unlinkSync(legacyPath)
      } catch {}
    } catch (e) {
      console.error("Memory migration failed:", e.message)
    }
  }
}

// --- MEMORY.md index generation ---
function generateIndex(projectHash, memories, summary = "") {
  const lines = [
    `# Memory Index — ${projectHash}`,
    `> Last updated: ${new Date().toISOString()}`,
    "",
  ]

  if (summary) {
    lines.push(summary)
    lines.push("")
  }

  lines.push("## Memory Files")
  lines.push("")
  lines.push("| File | Type | Description |")
  lines.push("|------|------|-------------|")

  for (const mem of memories) {
    lines.push(`| ${mem.file} | ${mem.type} | ${mem.description || mem.name} |`)
  }

  lines.push("")
  lines.push("---")
  lines.push("*Auto-managed by OpenCode Memory Plugin v3*")

  return lines.join("\n")
}

// --- Load project memory ---
function loadProjectMemory(projectHash) {
  migrateLegacyMemory(projectHash)

  const projectDir = getProjectMemoryDir(projectHash)
  const indexPath = getMemoryIndexPath(projectHash)

  const result = {
    projectHash,
    sessions: [],
    decisions: [],
    preferences: {},
    memoryFiles: [],
    createdAt: null,
    updatedAt: new Date().toISOString(),
  }

  // Read MEMORY.md index
  if (existsSync(indexPath)) {
    const indexContent = readFileSync(indexPath, "utf-8")
    // Parse memory files from index table
    const fileRegex = /\|\s*([\w.-]+\.md)\s*\|/g
    let match
    while ((match = fileRegex.exec(indexContent)) !== null) {
      result.memoryFiles.push(match[1])
    }

    // Extract createdAt from index if present
    const createdMatch = indexContent.match(/Created:\s*(.+)/)
    if (createdMatch) result.createdAt = createdMatch[1]
  }

  // Read individual memory files
  for (const file of result.memoryFiles) {
    const filePath = join(projectDir, file)
    if (existsSync(filePath)) {
      try {
        const content = readFileSync(filePath, "utf-8")
        const frontmatter = parseFrontmatter(content)
        result.decisions.push({
          date: frontmatter.date || "unknown",
          decision: frontmatter.description || file,
          source: file,
        })
      } catch {}
    }
  }

  // Also read any markdown files in the directory that aren't in the index
  try {
    const files = readdirSync(projectDir).filter(f => f.endsWith(".md") && f !== "MEMORY.md")
    for (const file of files) {
      if (!result.memoryFiles.includes(file)) {
        const filePath = join(projectDir, file)
        const content = readFileSync(filePath, "utf-8")
        const frontmatter = parseFrontmatter(content)
        result.memoryFiles.push(file)
        if (frontmatter.description) {
          result.decisions.push({
            date: frontmatter.date || "unknown",
            decision: frontmatter.description,
            source: file,
          })
        }
      }
    }
  } catch {}

  return result
}

// --- Frontmatter parser ---
function parseFrontmatter(content) {
  const fm = {}
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (match) {
    const lines = match[1].split("\n")
    for (const line of lines) {
      const [key, ...rest] = line.split(":")
      if (key && rest.length) {
        fm[key.trim()] = rest.join(":").trim()
      }
    }
  }
  return fm
}

// --- Auto-extract decisions from conversation ---
function extractDecisions(messages) {
  if (!messages || !Array.isArray(messages)) return []

  const decisions = []

  // Pattern 1: Explicit commands
  const explicitPatterns = [
    /recuerda que (.+)/i,
    /guarda(?:mos)? que (.+)/i,
    /decidimos (.+)/i,
    /uso (.+) para (?:el|la|los|las) (.+)/i,
    /prefiero (.+)/i,
    /vamos a usar (.+)/i,
    /elegimos (.+)/i,
    /optamos por (.+)/i,
  ]

  // Pattern 2: Auto-detected decisions (agent output patterns)
  const autoPatterns = [
    /stack:\s*(.+)/i,
    /framework:\s*(.+)/i,
    /base de datos:\s*(.+)/i,
    /arquitectura:\s*(.+)/i,
  ]

  for (const msg of messages) {
    const content = typeof msg.content === "string" ? msg.content : ""

    // Check explicit patterns
    for (const pattern of explicitPatterns) {
      const match = content.match(pattern)
      if (match) {
        const decision = match[1].length > 100
          ? match[1].substring(0, 100) + "..."
          : match[1]
        decisions.push({
          type: "explicit",
          decision,
          timestamp: new Date().toISOString(),
        })
      }
    }

    // Check auto patterns
    for (const pattern of autoPatterns) {
      const match = content.match(pattern)
      if (match) {
        const key = pattern.source.match(/\\s\*\(\.\+\)/)?.[0] || "config"
        decisions.push({
          type: "auto",
          decision: match[0].trim(),
          timestamp: new Date().toISOString(),
        })
      }
    }
  }

  return decisions
}

// --- Extract summary from messages ---
function extractSummary(messages) {
  if (!messages || !Array.isArray(messages)) return "Session completed"

  const assistantMessages = messages
    .filter(m => m.role === "assistant" && m.content && m.content.length > 50)

  if (assistantMessages.length === 0) return "Session completed"

  const lastMessage = assistantMessages[assistantMessages.length - 1]
  const content = typeof lastMessage.content === "string"
    ? lastMessage.content
    : JSON.stringify(lastMessage.content)

  return content.substring(0, 200).replace(/\n/g, " ").trim()
}

// --- Save memory file ---
function saveMemoryFile(projectHash, filename, frontmatter, content) {
  const projectDir = getProjectMemoryDir(projectHash)
  const filePath = join(projectDir, filename)

  let fmBlock = "---\n"
  for (const [key, value] of Object.entries(frontmatter)) {
    fmBlock += `${key}: ${value}\n`
  }
  fmBlock += "---\n\n"

  writeFileSync(filePath, fmBlock + content)

  // Update MEMORY.md index
  updateMemoryIndex(projectHash, filename, frontmatter)
}

// --- Update MEMORY.md index ---
function updateMemoryIndex(projectHash, filename, frontmatter) {
  const indexPath = getMemoryIndexPath(projectHash)
  let indexContent

  if (existsSync(indexPath)) {
    indexContent = readFileSync(indexPath, "utf-8")
    // Check if file already in index
    if (indexContent.includes(`| ${filename} |`)) return

    // Add to table
    const tableEnd = indexContent.lastIndexOf("\n\n---")
    if (tableEnd > 0) {
      const newLine = `| ${filename} | ${frontmatter.type || "reference"} | ${frontmatter.description || frontmatter.name || ""} |`
      indexContent = indexContent.slice(0, tableEnd) + "\n" + newLine + indexContent.slice(tableEnd)
    }
  } else {
    indexContent = generateIndex(projectHash, [{
      file: filename,
      type: frontmatter.type || "reference",
      description: frontmatter.description || frontmatter.name || filename,
    }])
    // Update timestamp
    const timestampLine = `> Last updated: ${new Date().toISOString()}`
    indexContent = indexContent.replace(/> Last updated:.*/, timestampLine)
  }

  if (indexContent.includes(`> Last updated:`)) {
    indexContent = indexContent.replace(
      /> Last updated:.*/,
      `> Last updated: ${new Date().toISOString()}`
    )
  }

  writeFileSync(indexPath, indexContent)
}

// --- Consolidate related memories ---
function consolidateMemories(projectHash) {
  const projectDir = getProjectMemoryDir(projectHash)
  const indexPath = getMemoryIndexPath(projectHash)

  if (!existsSync(indexPath)) return

  try {
    const files = readdirSync(projectDir).filter(f =>
      f.endsWith(".md") && f !== "MEMORY.md" && !f.startsWith("feedback_")
    )

    // If too many decision files, consolidate
    const decisionFiles = files.filter(f =>
      f.includes("decision") || f === "decisions.md"
    )

    if (decisionFiles.length > 5) {
      let consolidated = "# Consolidated Technical Decisions\n\n"
      for (const file of decisionFiles) {
        const filePath = join(projectDir, file)
        try {
          const content = readFileSync(filePath, "utf-8")
          const fm = parseFrontmatter(content)
          // Remove frontmatter from content
          const bodyContent = content.replace(/^---\n[\s\S]*?\n---\n\n/, "")
          consolidated += `## ${fm.name || file}\n\n${bodyContent}\n\n---\n\n`
        } catch {}
      }

      // Write consolidated file
      const consolidatedFile = join(projectDir, "consolidated-decisions.md")
      writeFileSync(consolidatedFile,
        `---\nname: consolidated decisions\ndescription: Todas las decisiones técnicas consolidadas\ntype: project\ndate: ${new Date().toISOString()}\n---\n\n${consolidated}`
      )

      // Remove individual files
      for (const file of decisionFiles) {
        if (file !== "consolidated-decisions.md") {
          try {
            const { unlinkSync } = require("fs")
            unlinkSync(join(projectDir, file))
          } catch {}
        }
      }

      // Update index
      updateMemoryIndex(projectHash, "consolidated-decisions.md", {
        type: "project",
        description: "Todas las decisiones técnicas consolidadas",
        name: "consolidated decisions"
      })
    }
  } catch {}
}

// --- Main Plugin Export ---
export const MemoryPlugin = async ({ project, client, $, directory, worktree }) => {
  const projectHash = getProjectHash(directory || worktree || process.cwd())

  // Migrate on first load
  migrateLegacyMemory(projectHash)

  return {
    // Hook: session created — load previous memory
    "session.created": async ({ event }) => {
      const memory = loadProjectMemory(projectHash)

      if (memory.memoryFiles.length > 0 || memory.sessions.length > 0) {
        const recentDecisions = memory.decisions.slice(-5)

        return {
          context: {
            memory: {
              projectHash,
              memoryFileCount: memory.memoryFiles.length,
              recentDecisions: recentDecisions.map(d =>
                `${d.source || "unknown"}: ${d.decision}`
              ),
              memoryIndex: existsSync(getMemoryIndexPath(projectHash))
                ? "MEMORY.md exists"
                : "No MEMORY.md yet",
            }
          }
        }
      }
    },

    // Hook: session idle — save session with auto-extraction
    "session.idle": async ({ event }) => {
      const summary = extractSummary(event?.messages) ||
                      event?.summary ||
                      `Session completed`

      // Auto-extract decisions
      const decisions = extractDecisions(event?.messages || [])

      // Save decisions as memory files
      if (decisions.length > 0) {
        for (const d of decisions) {
          const safeName = d.decision
            .substring(0, 50)
            .replace(/[^a-zA-Z0-9\s-]/g, "")
            .replace(/\s+/g, "_")
            .toLowerCase()

          const filename = `decision_${safeName}_${Date.now().toString(36)}.md`
          const timestamp = d.timestamp || new Date().toISOString()

          saveMemoryFile(
            projectHash,
            filename,
            {
              name: d.decision.substring(0, 50),
              description: d.decision,
              type: "decision",
              date: timestamp,
            },
            `**Date:** ${timestamp}\n**Type:** ${d.type}\n\n${d.decision}\n`
          )
        }
      }

      // Save session summary
      const sessionDate = new Date().toISOString()
      saveMemoryFile(
        projectHash,
        `session_${sessionDate.substring(0, 10)}.md`,
        {
          name: `Session ${sessionDate.substring(0, 10)}`,
          description: summary.substring(0, 100),
          type: "project",
          date: sessionDate,
        },
        `**Date:** ${sessionDate}\n**Summary:** ${summary}\n\n---\n`
      )

      // Consolidate if needed
      consolidateMemories(projectHash)
    },

    // Hook: session updated — detect decisions in real-time
    "session.updated": async ({ event }) => {
      const messages = event?.messages || []
      const decisions = extractDecisions(messages)

      // Only save new decisions (not already saved)
      if (decisions.length > 0) {
        // Check last 2 messages for decisions
        const recent = decisions.slice(-2)
        if (recent.length > 0) {
          for (const d of recent) {
            const safeName = d.decision
              .substring(0, 40)
              .replace(/[^a-zA-Z0-9\s-]/g, "")
              .replace(/\s+/g, "_")
              .toLowerCase()

            saveMemoryFile(
              projectHash,
              `live_${safeName}.md`,
              {
                name: d.decision.substring(0, 50),
                description: d.decision,
                type: "decision",
                date: d.timestamp,
              },
              `**Date:** ${d.timestamp}\n**Type:** ${d.type}\n\n${d.decision}\n`
            )
          }
        }
      }
    },
  }
}

export default MemoryPlugin
