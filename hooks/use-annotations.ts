"use client"

import { useState, useEffect } from "react"
import type { Annotation } from "@/lib/types"

const STORAGE_KEY = "kpi-annotations"

export function useAnnotations() {
  const [annotations, setAnnotations] = useState<Annotation[]>([])

  // Load annotations from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setAnnotations(JSON.parse(stored))
      } catch (error) {
        console.error("Failed to parse stored annotations:", error)
      }
    }
  }, [])

  // Save annotations to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(annotations))
  }, [annotations])

  const addAnnotation = (month: string, note: string, value: number) => {
    const newAnnotation: Annotation = {
      id: crypto.randomUUID(),
      month,
      note,
      value,
    }
    setAnnotations((prev) => [...prev, newAnnotation])
  }

  const getAnnotation = (month: string): Annotation | undefined => {
    return annotations.find((a) => a.month === month)
  }

  const hasAnnotation = (month: string): boolean => {
    return annotations.some((a) => a.month === month)
  }

  return {
    annotations,
    addAnnotation,
    getAnnotation,
    hasAnnotation,
  }
}
