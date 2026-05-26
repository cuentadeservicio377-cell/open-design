// OpenCode Proactive Plugin v2 — Smart suggestions after responses
// Fixed: Uses correct API, caches results, doesn't run full test suites on idle
// Inspired by: spec-kit status + Superpowers proactive behavior

import { writeFileSync, readFileSync, existsSync, mkdirSync } from "fs"
import { join } from "path"

const CACHE_DIR = join(process.env.HOME, ".opencode", "cache")
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

if (!existsSync(CACHE_DIR)) {
  mkdirSync(CACHE_DIR, { recursive: true })
}

function getCachedResult(key) {
  const cachePath = join(CACHE_DIR, `${key}.json`)
  if (!existsSync(cachePath)) return null
  
  try {
    const cached = JSON.parse(readFileSync(cachePath, "utf-8"))
    if (Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.result
    }
  } catch {}
  return null
}

function setCachedResult(key, result) {
  const cachePath = join(CACHE_DIR, `${key}.json`)
  writeFileSync(cachePath, JSON.stringify({
    timestamp: Date.now(),
    result
  }))
}

// Quick checks only — no full test runs
async function quickHealthCheck(directory, $) {
  const cached = getCachedResult("health-check")
  if (cached) return cached

  const issues = []

  try {
    // Quick git status (fast)
    if ($) {
      try {
        const status = await $`git status --porcelain 2>/dev/null`.quiet()
        const lines = status.text().trim().split("\n").filter(l => l.trim())
        if (lines.length > 10) {
          issues.push({ priority: "medium", icon: "📝", message: `${lines.length} archivos sin commit`, action: "oc-ship" })
        }
        
        const branchStatus = await $`git status -sb 2>/dev/null`.quiet()
        const branchText = branchStatus.text()
        if (branchText.includes("behind") || branchText.includes("ahead")) {
          issues.push({ priority: "medium", icon: "🌿", message: "Branch desincronizado con remote", action: "git pull/push" })
        }
      } catch {}
    }
  } catch {}

  // Quick TODO check (fast with rg)
  try {
    if ($) {
      const todos = await $`rg -c 'TODO|FIXME|HACK' --type-add 'code:*.{js,ts,jsx,tsx,py,rs,go}' -t code 2>/dev/null | head -5`.quiet()
      const todoText = todos.text().trim()
      if (todoText) {
        const count = todoText.split("\n").length
        if (count > 0) {
          issues.push({ priority: "low", icon: "📌", message: `${count} archivos con TODOs/FIXMEs`, action: "oc-suggest" })
        }
      }
    }
  } catch {}

  setCachedResult("health-check", issues)
  return issues
}

export const ProactivePlugin = async ({ project, client, $, directory, worktree }) => {
  const projectDir = directory || worktree || process.cwd()

  return {
    // Hook: session idle — generate proactive suggestions (cached, quick)
    "session.idle": async ({ event }) => {
      const issues = await quickHealthCheck(projectDir, $)

      if (issues.length > 0) {
        const priorityOrder = { high: 0, medium: 1, low: 2 }
        issues.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])

        const formatted = issues
          .slice(0, 3)
          .map(s => `${s.icon} ${s.message}`)
          .join("\n")

        return {
          suggestion: `\n💡 Sugerencias:\n${formatted}\n`
        }
      }
    },

    // Hook: command — handle /suggest
    "tui.command.execute": async ({ event }) => {
      if (event.command === "/suggest") {
        // Clear cache to force fresh check
        const cachePath = join(CACHE_DIR, "health-check.json")
        if (existsSync(cachePath)) {
          const { unlinkSync } = await import("fs")
          unlinkSync(cachePath)
        }
        return await quickHealthCheck(projectDir, $)
      }
    }
  }
}

export default ProactivePlugin
