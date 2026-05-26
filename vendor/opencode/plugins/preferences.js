// OpenCode Preferences Plugin v2 — Auto-detect preferences from project
// Fixed: Uses correct API, auto-detects from project instead of manual config

import { readFileSync, existsSync } from "fs"
import { join } from "path"

const PREFERENCES_FILE = join(process.env.HOME, ".opencode", "preferences.json")

function loadPreferences() {
  if (!existsSync(PREFERENCES_FILE)) {
    return {}
  }
  try {
    return JSON.parse(readFileSync(PREFERENCES_FILE, "utf-8"))
  } catch {
    return {}
  }
}

// Auto-detect coding style from project files
function detectFromProject(directory) {
  const detected = {
    coding_style: {},
    tools: {},
    behavior: {
      auto_format: true,
      run_tests_on_save: false,
      suggest_improvements: true
    }
  }

  try {
    // Detect from .editorconfig
    const editorconfigPath = join(directory, ".editorconfig")
    if (existsSync(editorconfigPath)) {
      const ec = readFileSync(editorconfigPath, "utf-8")
      const indentMatch = ec.match(/indent_style\s*=\s*(\w+)/)
      const sizeMatch = ec.match(/indent_size\s*=\s*(\d+)/)
      const quoteMatch = ec.match(/quote_type\s*=\s*(\w+)/)
      
      if (indentMatch) detected.coding_style.indent = indentMatch[1]
      if (sizeMatch) detected.coding_style.indent_size = parseInt(sizeMatch[1])
      if (quoteMatch) detected.coding_style.quotes = quoteMatch[1]
    }

    // Detect from .prettierrc
    const prettierPath = join(directory, ".prettierrc")
    if (existsSync(prettierPath)) {
      const prettier = JSON.parse(readFileSync(prettierPath, "utf-8"))
      if (prettier.singleQuote) detected.coding_style.quotes = "single"
      if (prettier.semi !== undefined) detected.coding_style.semicolons = prettier.semi
      if (prettier.tabWidth) detected.coding_style.indent_size = prettier.tabWidth
      if (prettier.trailingComma) detected.coding_style.trailing_comma = prettier.trailingComma
    }

    // Detect from package.json
    const pkgPath = join(directory, "package.json")
    if (existsSync(pkgPath)) {
      const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"))
      if (pkg.scripts?.test) detected.tools.test_runner = "npm test"
      if (pkg.scripts?.lint) detected.tools.linter = "npm run lint"
      if (pkg.scripts?.format) detected.tools.formatter = "npm run format"
    }

    // Detect from pyproject.toml
    const pyprojectPath = join(directory, "pyproject.toml")
    if (existsSync(pyprojectPath)) {
      const content = readFileSync(pyprojectPath, "utf-8")
      if (content.includes("pytest")) detected.tools.test_runner = "pytest"
      if (content.includes("ruff")) detected.tools.linter = "ruff"
      if (content.includes("black")) detected.tools.formatter = "black"
    }

  } catch (e) {
    // Silently fail — preferences are best-effort
  }

  return detected
}

export const PreferencesPlugin = async ({ project, client, $, directory, worktree }) => {
  const projectDir = directory || worktree || process.cwd()
  const savedPrefs = loadPreferences()
  const detectedPrefs = detectFromProject(projectDir)

  // Merge: saved prefs override detected
  const prefs = {
    ...detectedPrefs,
    ...savedPrefs,
    coding_style: { ...detectedPrefs.coding_style, ...savedPrefs.coding_style },
    tools: { ...detectedPrefs.tools, ...savedPrefs.tools }
  }

  return {
    // Hook: session created — log detected preferences
    "session.created": async ({ event }) => {
      // Return detected preferences as context
      const hasCustomPrefs = Object.keys(savedPrefs).length > 0
      
      return {
        context: {
          preferences: {
            detected: detectedPrefs,
            custom: savedPrefs,
            merged: prefs
          }
        }
      }
    }
  }
}

export default PreferencesPlugin
