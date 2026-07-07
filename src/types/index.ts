export interface OverviewData {
  todayVisits: number
  activeUsers: number
  systemHealth: number
  courseCount: number
  visitTrend: string
  userTrend: string
  healthTrend: string
  courseTrend: string
}

export interface VisitTrendData {
  categories: string[]
  todayData: number[]
  yesterdayData: number[]
}

export interface CategoryItem {
  name: string
  value: number
  percent: string
}

export interface CategoryData {
  items: CategoryItem[]
}

export interface CityItem {
  city: string
  value: number
}

export interface CityData {
  items: CityItem[]
}

export interface CapabilityData {
  indicators: { name: string }[]
  currentTeam: number[]
  benchmark: number[]
}

export interface RealtimeEvent {
  id: number
  time: string
  level: string
  event: string
}

export interface RealtimeData {
  events: RealtimeEvent[]
}

export interface NetworkNode {
  id: string
  name: string
  category: number
  symbolSize: number
}

export interface NetworkLink {
  source: string
  target: string
}

export interface NetworkData {
  nodes: NetworkNode[]
  links: NetworkLink[]
}
