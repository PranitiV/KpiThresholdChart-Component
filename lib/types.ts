export interface KPIData {
  month: string
  value: number
  date: string
}

export interface Threshold {
  id: string
  name: string
  value: number
  color: string
  locked: boolean
}

export interface Annotation {
  id: string
  month: string
  note: string
  value: number
}

export interface ThresholdColors {
  [key: string]: string
}
