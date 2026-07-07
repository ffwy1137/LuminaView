import { defineStore } from 'pinia'
import type {
  OverviewData,
  VisitTrendData,
  CategoryData,
  CityData,
  CapabilityData,
  RealtimeData,
  NetworkData,
} from '@/types'
import * as api from '@/services/api'

let overviewInterval: number | null = null
let realtimeInterval: number | null = null

export const useDashboardStore = defineStore('dashboard', {
  state: (): {
    overview: OverviewData | null
    trend: VisitTrendData | null
    categories: CategoryData | null
    cities: CityData | null
    capabilities: CapabilityData | null
    realtime: RealtimeData | null
    network: NetworkData | null
    loading: boolean
  } => ({
    overview: null,
    trend: null,
    categories: null,
    cities: null,
    capabilities: null,
    realtime: null,
    network: null,
    loading: false,
  }),

  actions: {
    async loadOverview() {
      this.overview = await api.fetchOverview()
    },
    async loadTrend() {
      this.trend = await api.fetchTrend()
    },
    async loadCategories() {
      this.categories = await api.fetchCategories()
    },
    async loadCities() {
      this.cities = await api.fetchCities()
    },
    async loadCapabilities() {
      this.capabilities = await api.fetchCapabilities()
    },
    async loadRealtime() {
      this.realtime = await api.fetchRealtime()
    },
    async loadNetwork() {
      this.network = await api.fetchNetwork()
    },
    async refreshAll() {
      this.loading = true
      try {
        await Promise.all([
          this.loadOverview(),
          this.loadTrend(),
          this.loadCategories(),
          this.loadCities(),
          this.loadCapabilities(),
          this.loadRealtime(),
          this.loadNetwork(),
        ])
      } finally {
        this.loading = false
      }
    },
    startAutoRefresh() {
      this.refreshAll()
      overviewInterval = window.setInterval(() => {
        this.loadOverview()
        this.loadTrend()
        this.loadCategories()
        this.loadCities()
        this.loadCapabilities()
        this.loadNetwork()
      }, 3000)
      realtimeInterval = window.setInterval(() => {
        this.loadRealtime()
      }, 2000)
    },
    stopAutoRefresh() {
      if (overviewInterval) {
        clearInterval(overviewInterval)
        overviewInterval = null
      }
      if (realtimeInterval) {
        clearInterval(realtimeInterval)
        realtimeInterval = null
      }
    },
  },
})
