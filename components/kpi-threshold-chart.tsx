"use client"

import type React from "react"

import { useState, useCallback, useRef, useEffect  } from "react"
import { useQuery } from "@tanstack/react-query"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine, Tooltip } from "recharts"
import type { KPIData } from "@/lib/types"
import { useThresholds } from "@/hooks/use-thresholds"
import { useAnnotations } from "@/hooks/use-annotations"
import { ThresholdPill } from "./threshold-pill"
import { AddThresholdDialog } from "./add-threshold-dialog"
import { AnnotationDialog } from "./annotation-dialog"
import { CustomDotComponent } from "./custom-dot-component"
import { CustomTooltipComponent } from "./custom-tooltip-component"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import openai from "@/components/utils/openaiService"

async function fetchKPIData(): Promise<{ data: KPIData[] }> {
  const response = await fetch("/api/kpis")
  if (!response.ok) {
    throw new Error("Failed to fetch KPI data")
  }
  return response.json()
}

export function KPIThresholdChart() {
  const [summary, setSummary] = useState<string>(""); 
  const [annotationDialog, setAnnotationDialog] = useState<{
    open: boolean
    month: string
    value: number
  }>({
    open: false,
    month: "",
    value: 0,
  })

  const [draggedThreshold, setDraggedThreshold] = useState<string | null>(null)
  const chartRef = useRef<HTMLDivElement>(null)

  const { data, isLoading, error } = useQuery({
    queryKey: ["kpi-data"],
    queryFn: fetchKPIData,
  })

  const { thresholds, addThreshold, removeThreshold, updateThreshold, toggleLock } = useThresholds()

  const { annotations, addAnnotation, getAnnotation, hasAnnotation } = useAnnotations()

  const handleDoubleClickDot = useCallback((month: string, value: number) => {
    setAnnotationDialog({
      open: true,
      month,
      value,
    })
  }, [])

  const handleMouseDown = useCallback(
    (thresholdId: string, event: React.MouseEvent) => {
      const threshold = thresholds.find((t) => t.id === thresholdId)
      if (!threshold || threshold.locked) return

      setDraggedThreshold(thresholdId)
      event.preventDefault()
    },
    [thresholds],
  )

  const handleMouseMove = useCallback(
    (event: React.MouseEvent) => {
      if (!draggedThreshold || !chartRef.current) return;

      const rect = chartRef.current.getBoundingClientRect();
      const chartHeight = rect.height;
      const relativeY = event.clientY - rect.top;

      // Hard-coded data range
      const minValue = 0; // Example minimum value
      const maxValue = 240000; // Example maximum value
      const valueRange = maxValue - minValue;

      const normalizedY = Math.max(0, Math.min(1, relativeY / chartHeight));
      const newValue = minValue + (1 - normalizedY) * valueRange;

      updateThreshold(draggedThreshold, { value: newValue });
    },
    [draggedThreshold, updateThreshold]
  );

  const handleMouseUp = useCallback(() => {
    setDraggedThreshold(null)
  }, [])

  const handleGenerateSummary = useCallback(async () => {
    const prompt = `
      You are a helpful assistant that generates a summary of the KPI data.
      The data is as follows: ${JSON.stringify(data?.data)}
      The annotations are as follows: ${JSON.stringify(annotations)}
      The thresholds are as follows: ${JSON.stringify(thresholds)}
      Analyse the data and provide a summary of how the company is performing.
      `
    const summary = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    })
    setSummary(summary?.choices[0].message.content || "")
  }, [data, annotations, thresholds])

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center h-96">
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center h-96">
          <p className="text-destructive">Failed to load KPI data</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="w-full space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>KPI Threshold Chart</CardTitle>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" size="sm" onClick={handleGenerateSummary}>
                <Plus className="h-4 w-4 mr-2" />
                Generate AI Summary
              </Button>
              <AddThresholdDialog onAddThreshold={addThreshold} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Threshold Pills */}
            {thresholds.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {thresholds.map((threshold) => (
                  <ThresholdPill
                    key={threshold.id}
                    threshold={threshold}
                    onToggleLock={toggleLock}
                    onRemove={removeThreshold}
                  />
                ))}
              </div>
            )}

            {/* Chart */}
            <div
              ref={chartRef}
              className="h-96 w-full"
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={data?.data || []}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} />
                  <Tooltip content={<CustomTooltipComponent getAnnotation={getAnnotation} />} />

                  {/* Threshold Lines */}
                  {thresholds.map((threshold) => (
                    <g key={threshold.id}>
                      {/* Invisible overlay for larger grab area */}
                      <ReferenceLine
                        y={threshold.value}
                        stroke="transparent"
                        strokeWidth={30} // Further increase area for grabbing
                        onMouseDown={(e) => handleMouseDown(threshold.id, e as any)}
                        style={{ cursor: threshold.locked ? "default" : "ns-resize" }}
                      />
                      {/* Actual visible threshold line with label */}
                      <ReferenceLine
                        y={threshold.value}
                        stroke={threshold.color}
                        strokeDasharray="5 5"
                        strokeWidth={2}
                        style={{ cursor: threshold.locked ? "default" : "ns-resize" }}
                      >
                        
                      </ReferenceLine>
                    </g>
                  ))}

                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={(props) => {
                      const { key, ...restProps } = props;
                      return (
                        <CustomDotComponent
                          key={key}
                          {...restProps}
                          hasAnnotation={hasAnnotation(props.payload?.month)}
                          onDoubleClick={handleDoubleClickDot}
                          month={props.payload?.month}
                        />
                      );
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>

        {summary && <p className="text-sm text-gray-700 p-4 bg-white">
          <strong>AI Summary: </strong>
          {summary}
        </p>}
      </Card>

      {/* Annotation Dialog */}
      <AnnotationDialog
        open={annotationDialog.open}
        onOpenChange={(open) => setAnnotationDialog((prev) => ({ ...prev, open }))}
        month={annotationDialog.month}
        value={annotationDialog.value}
        onAddAnnotation={addAnnotation}
      />


    </div>
  )
}
