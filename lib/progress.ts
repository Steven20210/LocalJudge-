type ProblemStatus = "unsolved" | "attempted" | "solved"

interface ProblemProgress {
  status: ProblemStatus
  lastSolution?: string
  language?: string
  solvedAt?: string
}

const STORAGE_KEY = "coding-practice-progress"

export function getProgress(): Record<string, ProblemProgress> {
  if (typeof window === "undefined") return {}

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch {
    return {}
  }
}

export function saveProgress(problemId: string, status: ProblemStatus, solution?: string, language?: string) {
  if (typeof window === "undefined") return

  try {
    const current = getProgress()
    current[problemId] = {
      status,
      lastSolution: solution,
      language: language || "javascript",
      solvedAt: status === "solved" ? new Date().toISOString() : current[problemId]?.solvedAt,
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(current))
  } catch (error) {
    console.error("Failed to save progress:", error)
  }
}

export function clearProgress() {
  if (typeof window === "undefined") return

  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error("Failed to clear progress:", error)
  }
}

export function exportProgress(): string {
  return JSON.stringify(getProgress(), null, 2)
}

export function importProgress(data: string): boolean {
  if (typeof window === "undefined") return false

  try {
    const parsed = JSON.parse(data)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed))
    return true
  } catch {
    return false
  }
}
