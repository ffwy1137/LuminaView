<template>
  <div class="trend-chart">
    <div class="section-title">
      <span class="section-dot" />
      <span class="section-name">访问趋势</span>
    </div>
    <VChart :option="chartOption" autoresize />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  MarkPointComponent,
  MarkLineComponent,
} from 'echarts/components'
import VChart from 'vue-echarts'
import type { EChartsOption } from 'echarts'
import { useDashboardStore } from '@/stores/dashboard'

use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  MarkPointComponent,
  MarkLineComponent,
])

const store = useDashboardStore()

const chartOption = computed<EChartsOption>(() => {
  if (!store.trend) return {}

  const { categories, todayData, yesterdayData } = store.trend

  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(10, 14, 39, 0.95)',
      borderColor: 'rgba(0, 212, 255, 0.4)',
      borderWidth: 1,
      textStyle: { color: '#fff', fontSize: 13 },
      axisPointer: {
        type: 'cross',
        label: { backgroundColor: 'rgba(0, 212, 255, 0.8)' },
      },
    },
    legend: {
      data: ['今日访问', '昨日访问'],
      textStyle: { color: 'rgba(255,255,255,0.8)', fontSize: 12 },
      top: 32,
      itemWidth: 20,
      itemHeight: 10,
      itemGap: 24,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: 56,
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: categories,
      axisLine: { lineStyle: { color: 'rgba(255,255,255,0.2)' } },
      axisLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 12 },
      axisTick: { show: true, lineStyle: { color: 'rgba(255,255,255,0.2)' } },
    },
    yAxis: {
      type: 'value',
      name: '访问次数',
      nameTextStyle: { color: 'rgba(255,255,255,0.7)', fontSize: 12, padding: [0, 40, 0, 0] },
      position: 'left',
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.06)' } },
      axisLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 12 },
      axisLine: { show: true, lineStyle: { color: 'rgba(255,255,255,0.2)' } },
    },
    series: [
      {
        name: '今日访问',
        type: 'line',
        smooth: true,
        data: todayData,
        symbol: 'circle',
        symbolSize: 6,
        itemStyle: { color: '#00d4ff' },
        lineStyle: { width: 3 },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(0, 212, 255, 0.3)' },
              { offset: 1, color: 'rgba(0, 212, 255, 0)' },
            ],
          },
        },
        animationDuration: 1500,
        animationEasing: 'cubicOut',
        markPoint: {
          data: [{ type: 'max', name: '峰值' }],
          symbol: 'pin',
          symbolSize: 36,
          itemStyle: { color: '#00d4ff' },
          label: { color: '#fff', fontSize: 11, fontWeight: 'bold' },
        },
      },
      {
        name: '昨日访问',
        type: 'line',
        smooth: true,
        data: yesterdayData,
        symbol: 'circle',
        symbolSize: 6,
        itemStyle: { color: '#7b61ff' },
        lineStyle: { width: 2, type: 'dashed' },
        animationDuration: 1500,
        animationEasing: 'cubicOut',
      },
    ],
  }
})
</script>

<style scoped>
.trend-chart {
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

.trend-chart :deep(.v-chart) {
  flex: 1;
  min-height: 0;
  overflow: hidden;
}
</style>
