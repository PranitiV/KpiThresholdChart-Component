"use client"

import type { Threshold } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Lock, Unlock, X } from "lucide-react"

interface ThresholdPillProps {
  threshold: Threshold
  onToggleLock: (id: string) => void
  onRemove: (id: string) => void
}

export function ThresholdPill({ threshold, onToggleLock, onRemove }: ThresholdPillProps) {
  return (
    <div className="flex items-center gap-2 bg-white border rounded-lg px-3 py-2 shadow-sm">
      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: threshold.color }} />
      <span className="text-sm font-medium">{threshold.name}</span>
      <span className="text-sm text-muted-foreground">{threshold.value.toLocaleString()}</span>
      <Button variant="ghost" size="sm" onClick={() => onToggleLock(threshold.id)} className="h-6 w-6 p-0">
        {threshold.locked ? <Lock className="h-3 w-3" /> : <Unlock className="h-3 w-3" />}
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onRemove(threshold.id)}
        className="h-6 w-6 p-0 text-destructive hover:text-destructive"
      >
        <X className="h-3 w-3" />
      </Button>
    </div>
  )
}
