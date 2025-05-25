"use client"

import type { DotProps } from "recharts"

interface CustomDotProps extends DotProps {
  hasAnnotation?: boolean
  onDoubleClick?: (month: string, value: number) => void
  month?: string
}

export function CustomDotComponent({ cx, cy, hasAnnotation, onDoubleClick, month, payload }: CustomDotProps) {
  const handleDoubleClick = () => {
    if (onDoubleClick && month && payload) {
      onDoubleClick(month, payload.value)
    }
  }

  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={5}
        fill="#2563eb"
        stroke="#ffffff"
        strokeWidth={2}
        className="cursor-pointer hover:fill-[#2563eb] hover:shadow-lg transition-all duration-200"
        onDoubleClick={handleDoubleClick}
      />
      {hasAnnotation && (
        <circle cx={cx} cy={cy} r={8} fill="none" stroke="#f59e0b" strokeWidth={2} strokeDasharray="2,2" />
      )}
      <circle
        cx={cx}
        cy={cy}
        r={14}
        fill="transparent"
        stroke="transparent"
        strokeWidth={2}
        className="cursor-pointer"
        onDoubleClick={handleDoubleClick}
      />
    </g>
  )
}
