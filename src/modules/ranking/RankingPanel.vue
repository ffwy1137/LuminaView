<template>
  <div class="city-ranking">
    <div class="section-title">
      <span class="section-dot" />
      <span class="section-name">城市访问排名</span>
    </div>
    <VChart :option="chartOption" autoresize />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import { GridComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import type { EChartsOption } from 'echarts'
import { useDashboardStore } from '@/stores/dashboard'

use([CanvasRenderer, BarChart, GridComponent])

const store = useDashboardStore()

const chartOption = computed<EChartsOption>(() => {
  if (!store.cities) return {}

  const data = store.cities.items.map((i) => i.value).reverse()
  const names = store.cities.items.map((i) => i.city).reverse()

  return {
    backgroundColor: 'transparent',
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: 12,
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } },
      axisLabel: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 11,
        formatter: (v: number) => `${(v / 1000).toFixed(1)}k`,
      },
    },
    yAxis: {
      type: 'category',
      data: names,
      axisLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } },
      axisLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 12 },
    },
    series: [
      {
        type: 'bar',
        data,
        barWidth: 12,
        itemStyle: {
          borderRadius: [0, 4, 4, 0],
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              { offset: 0, color: '#7b61ff' },
              { offset: 1, color: '#00d4ff' },
            ],
          },
        },
        animationDuration: 1500,
        animationEasing: 'cubicOut',
        label: {
          show: true,
          position: 'right',
          color: 'rgba(255,255,255,0.7)',
          fontFamily: 'var(--font-number)',
          fontSize: 11,
        },
      },
    ],
  }
})
</script>

<style scoped>
.city-ranking {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 4px 8px 4px;
  flex-shrink: 0;
}

.section-dot {
  width: 6px;
  height: 6px;
  background: var(--accent-blue);
  transform: rotate(45deg);
  box-shadow: 0 0 6px var(--accent-blue);
  flex-shrink: 0;
}

.section-name {
  font-size: 14px;
  color: var(--text-secondary);
  font-weight: 500;
  letter-spacing: 0.5px;
}

.city-ranking :deep(.v-chart) {
  flex: 1;
  min-height: 0;
  overflow: hidden;
}
</style>
