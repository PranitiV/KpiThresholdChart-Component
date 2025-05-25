"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { KPIThresholdChart } from "@/components/kpi-threshold-chart"
import { useState } from "react"

export default function Home() {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Interactive KPI Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Monitor your key performance indicators with interactive thresholds and annotations.
            </p>
          </div>

          <KPIThresholdChart />
        </div>
      </main>
    </QueryClientProvider>
  )
}
