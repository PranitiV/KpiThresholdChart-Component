"use client"

import type { TooltipProps } from "recharts"
import type { Annotation } from "@/lib/types"

interface CustomTooltipProps extends TooltipProps<number, string> {
  getAnnotation: (month: string) => Annotation | undefined
}

export function CustomTooltipComponent({ active, payload, label, getAnnotation }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const data = payload[0]
    const annotation = getAnnotation(label as string)

    return (
      <div className="bg-white border rounded-lg shadow-lg p-3 max-w-xs">
        <p className="font-medium">{label}</p>
        <p className="text-sm text-muted-foreground">Value: {data.value?.toLocaleString()}</p>
        {annotation && (
          <div className="mt-2 pt-2 border-t">
            <p className="text-xs font-medium text-amber-600">Note:</p>
            <p className="text-xs text-muted-foreground">{annotation.note}</p>
          </div>
        )}
      </div>
    )
  }

  return null
}
