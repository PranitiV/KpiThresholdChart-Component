"use client"

import type { DotProps } from "recharts"

interface CustomDotProps extends Omit<DotProps, "onDoubleClick"> {
  hasAnnotation?: boolean
  onDotDoubleClick?: (month: string, value: number) => void
  month?: string
  payload?: any
}

export function CustomDotComponent({ cx, cy, hasAnnotation, onDotDoubleClick, month, payload }: CustomDotProps) {
  const handleDoubleClick = () => {
    if (onDotDoubleClick && month && payload) {
      onDotDoubleClick(month, payload.value)
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
