"use client"

import { useState, useEffect } from "react"
import type { Threshold } from "@/lib/types"

const STORAGE_KEY = "kpi-thresholds"

const defaultColors = [
  "#ff0000", // bright red
  "#ff7f00", // bright orange
  "#ffff00", // bright yellow
  "#00ff00", // bright green
  "#0000ff", // bright blue
  "#4b0082", // indigo
  "#ee82ee", // violet
]

export function useThresholds() {
  const [thresholds, setThresholds] = useState<Threshold[]>([])

  // Load thresholds from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setThresholds(JSON.parse(stored))
      } catch (error) {
        console.error("Failed to parse stored thresholds:", error)
      }
    }
  }, [])

  // Save thresholds to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(thresholds))
  }, [thresholds])

  const addThreshold = (name: string, value: number) => {
    const newThreshold: Threshold = {
      id: crypto.randomUUID(),
      name,
      value: Math.round(value),
      color: defaultColors[thresholds.length % defaultColors.length],
      locked: false,
    }
    setThresholds((prev) => [...prev, newThreshold])
  }

  const removeThreshold = (id: string) => {
    setThresholds((prev) => prev.filter((t) => t.id !== id))
  }

  const updateThreshold = (id: string, updates: Partial<Threshold>) => {
    setThresholds((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)))
  }

  const toggleLock = (id: string) => {
    setThresholds((prev) => prev.map((t) => (t.id === id ? { ...t, locked: !t.locked } : t)))
  }

  return {
    thresholds,
    addThreshold,
    removeThreshold,
    updateThreshold,
    toggleLock,
  }
}
