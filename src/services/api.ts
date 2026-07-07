import type {
  OverviewData,
  VisitTrendData,
  CategoryData,
  CityData,
  CapabilityData,
  RealtimeData,
  NetworkData,
} from '@/types'
import { logger } from '@/utils/logger'

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api'

export async function fetchOverview(): Promise<OverviewData> {
  logger.info('api', 'fetchOverview start')
  const start = Date.now()
  const res = await fetch(`${API_BASE}/overview`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const data = await res.json()
  logger.info('api', `fetchOverview done | ${Date.now() - start}ms`)
  return data
}

export async function fetchTrend(): Promise<VisitTrendData> {
  logger.info('api', 'fetchTrend start')
  const start = Date.now()
  const res = await fetch(`${API_BASE}/trend`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const data = await res.json()
  logger.info('api', `fetchTrend done | ${Date.now() - start}ms`)
  return data
}

export async function fetchCategories(): Promise<CategoryData> {
  logger.info('api', 'fetchCategories start')
  const start = Date.now()
  const res = await fetch(`${API_BASE}/categories`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const data = await res.json()
  logger.info('api', `fetchCategories done | ${Date.now() - start}ms`)
  return data
}

export async function fetchCities(): Promise<CityData> {
  logger.info('api', 'fetchCities start')
  const start = Date.now()
  const res = await fetch(`${API_BASE}/cities`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const data = await res.json()
  logger.info('api', `fetchCities done | ${Date.now() - start}ms`)
  return data
}

export async function fetchCapabilities(): Promise<CapabilityData> {
  logger.info('api', 'fetchCapabilities start')
  const start = Date.now()
  const res = await fetch(`${API_BASE}/capabilities`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const data = await res.json()
  logger.info('api', `fetchCapabilities done | ${Date.now() - start}ms`)
  return data
}

export async function fetchRealtime(): Promise<RealtimeData> {
  logger.info('api', 'fetchRealtime start')
  const start = Date.now()
  const res = await fetch(`${API_BASE}/realtime`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const data = await res.json()
  logger.info('api', `fetchRealtime done | ${Date.now() - start}ms`)
  return data
}

export async function fetchNetwork(): Promise<NetworkData> {
  logger.info('api', 'fetchNetwork start')
  const start = Date.now()
  const res = await fetch(`${API_BASE}/network`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const data = await res.json()
  logger.info('api', `fetchNetwork done | ${Date.now() - start}ms`)
  return data
}
