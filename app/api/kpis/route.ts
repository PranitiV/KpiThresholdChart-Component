import { NextResponse } from "next/server"

export interface KPIData {
  month: string
  value: number
  date: string
}

// Mock KPI data for demonstration
const mockKPIData: KPIData[] = [
  { month: "Jan", value: 120000, date: "2024-01-01" },
  { month: "Feb", value: 135000, date: "2024-02-01" },
  { month: "Mar", value: 148000, date: "2024-03-01" },
  { month: "Apr", value: 142000, date: "2024-04-01" },
  { month: "May", value: 165000, date: "2024-05-01" },
  { month: "Jun", value: 178000, date: "2024-06-01" },
  { month: "Jul", value: 185000, date: "2024-07-01" },
  { month: "Aug", value: 172000, date: "2024-08-01" },
  { month: "Sep", value: 195000, date: "2024-09-01" },
  { month: "Oct", value: 210000, date: "2024-10-01" },
  { month: "Nov", value: 225000, date: "2024-11-01" },
  { month: "Dec", value: 240000, date: "2024-12-01" },
]

export async function GET() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return NextResponse.json({
    data: mockKPIData,
    success: true,
  })
}
