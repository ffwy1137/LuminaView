<template>
  <div class="doughnut-chart">
    <div class="section-title">
      <span class="section-dot" />
      <span class="section-name">课程分类占比</span>
    </div>
    <VChart :option="chartOption" autoresize />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import type { EChartsOption } from 'echarts'
import { useDashboardStore } from '@/stores/dashboard'

use([CanvasRenderer, PieChart, TitleComponent, TooltipComponent, LegendComponent])

const store = useDashboardStore()

const COLORS = ['#00d4ff', '#7b61ff', '#ff6b35', '#00ff88', '#ffaa00']

const chartOption = computed<EChartsOption>(() => {
  if (!store.categories) return {}

  const items = store.categories.items.map((item, idx) => ({
    name: item.name,
    value: item.value,
    percent: item.percent,
    itemStyle: { color: COLORS[idx % COLORS.length] },
  }))

  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(10, 14, 39, 0.95)',
      borderColor: 'rgba(0, 212, 255, 0.4)',
      borderWidth: 1,
      textStyle: { color: '#fff', fontSize: 13 },
      formatter: (params: any) => {
        return `<b>${params.name}</b><br/>学员数：${params.value.toLocaleString()}<br/>占比：${params.data.percent}`
      },
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center',
      textStyle: { color: 'rgba(255,255,255,0.8)', fontSize: 12 },
      itemWidth: 12,
      itemHeight: 12,
      itemGap: 12,
    },
    series: [
      {
        type: 'pie',
        radius: ['45%', '70%'],
        center: ['35%', '55%'],
        avoidLabelOverlap: false,
        itemStyle: { borderColor: '#050816', borderWidth: 2 },
        label: {
          show: true,
          position: 'outside',
          color: 'rgba(255,255,255,0.9)',
          fontSize: 12,
          formatter: '{b}\n{d}%',
        },
        labelLine: {
          show: true,
          lineStyle: { color: 'rgba(255,255,255,0.3)' },
        },
        data: items,
        animationDuration: 1500,
        animationEasing: 'cubicOut',
      },
    ],
  }
})
</script>

<style scoped>
.doughnut-chart {
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

.doughnut-chart :deep(.v-chart) {
  flex: 1;
  min-height: 0;
  overflow: hidden;
}
</style>
