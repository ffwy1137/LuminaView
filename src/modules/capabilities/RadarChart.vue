<template>
  <div class="radar-chart">
    <div class="section-title">
      <span class="section-dot" />
      <span class="section-name">能力雷达</span>
    </div>
    <VChart :option="chartOption" autoresize />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { RadarChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import type { EChartsOption } from 'echarts'
import { useDashboardStore } from '@/stores/dashboard'

use([CanvasRenderer, RadarChart, TitleComponent, TooltipComponent, LegendComponent])

const store = useDashboardStore()

const chartOption = computed<EChartsOption>(() => {
  if (!store.capabilities) return {}

  const indicators = store.capabilities.indicators.map((ind) => ({
    name: ind.name,
    max: 100,
  }))

  return {
    backgroundColor: 'transparent',
    tooltip: {
      backgroundColor: 'rgba(10, 14, 39, 0.95)',
      borderColor: 'rgba(0, 212, 255, 0.4)',
      borderWidth: 1,
      textStyle: { color: '#fff', fontSize: 13 },
    },
    legend: {
      data: ['当前团队', '行业标杆'],
      textStyle: { color: 'rgba(255,255,255,0.8)', fontSize: 12 },
      top: 8,
      itemWidth: 14,
      itemHeight: 14,
    },
    radar: {
      indicator: indicators,
      shape: 'polygon',
      splitNumber: 4,
      axisName: { color: 'rgba(255,255,255,0.7)', fontSize: 12 },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } },
      splitArea: {
        show: true,
        areaStyle: { color: ['rgba(0,212,255,0.02)', 'rgba(0,212,255,0.05)'] },
      },
      axisLine: { lineStyle: { color: 'rgba(255,255,255,0.15)' } },
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: store.capabilities.currentTeam,
            name: '当前团队',
            areaStyle: { color: 'rgba(0, 212, 255, 0.25)' },
            lineStyle: { color: '#00d4ff', width: 2 },
            itemStyle: { color: '#00d4ff' },
          },
          {
            value: store.capabilities.benchmark,
            name: '行业标杆',
            areaStyle: { color: 'rgba(255, 170, 0, 0.15)' },
            lineStyle: { color: '#ffaa00', width: 2, type: 'dashed' },
            itemStyle: { color: '#ffaa00' },
          },
        ],
        animationDuration: 1500,
        animationEasing: 'cubicOut',
      },
    ],
  }
})
</script>

<style scoped>
.radar-chart {
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

.radar-chart :deep(.v-chart) {
  flex: 1;
  min-height: 0;
  overflow: hidden;
}
</style>
