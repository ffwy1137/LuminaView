<template>
  <div class="network-graph">
    <div class="section-title">
      <span class="section-dot" />
      <span class="section-name">业务关联网络</span>
    </div>
    <VChart ref="chartRef" :option="chartOption" autoresize />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { GraphChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import type { EChartsOption } from 'echarts'
import { useDashboardStore } from '@/stores/dashboard'

use([CanvasRenderer, GraphChart, TitleComponent, TooltipComponent])

const store = useDashboardStore()
const chartRef = ref<InstanceType<typeof VChart>>()

const containerSize = ref({ width: 800, height: 600 })

const COLORS = ['#00d4ff', '#7b61ff', '#ffaa00', '#ff6b35', '#00ff88', '#ff4757']

function updateSize() {
  if (chartRef.value?.$el) {
    const rect = chartRef.value.$el.getBoundingClientRect()
    containerSize.value = { width: rect.width, height: rect.height }
  }
}

let observer: ResizeObserver | null = null

onMounted(() => {
  updateSize()
  if (chartRef.value?.$el) {
    observer = new ResizeObserver(updateSize)
    observer.observe(chartRef.value.$el)
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
    observer = null
  }
})

const chartOption = computed<EChartsOption>(() => {
  if (!store.network) return {}

  const { width, height } = containerSize.value
  const cx = width / 2
  const cy = height / 2
  const radius = Math.min(width, height) * 0.35

  const centerNode = store.network.nodes.find((n) => n.category === 0) || store.network.nodes[0]
  const outerNodes = store.network.nodes.filter((n) => n.id !== centerNode.id)

  const positionedNodes = [
    {
      ...centerNode,
      x: cx,
      y: cy,
      symbol: 'circle',
      symbolSize: centerNode.symbolSize,
      itemStyle: {
        color: '#ffaa00',
        shadowBlur: 20,
        shadowColor: 'rgba(255, 170, 0, 0.6)',
      },
      label: {
        show: true,
        color: '#fff',
        fontSize: 12,
      },
    },
    ...outerNodes.map((node, idx) => {
      const angle = (2 * Math.PI * idx) / outerNodes.length - Math.PI / 2
      return {
        ...node,
        x: cx + radius * Math.cos(angle),
        y: cy + radius * Math.sin(angle),
        symbol: 'circle',
        symbolSize: node.symbolSize,
        itemStyle: {
          color: COLORS[(node.category - 1 + idx) % COLORS.length],
          shadowBlur: 12,
          shadowColor: 'rgba(0, 212, 255, 0.4)',
        },
      }
    }),
  ]

  const positionedLinks = store.network.links.map((link) => ({
    ...link,
    lineStyle: {
      color: 'source',
      curveness: 0.3,
      width: 2,
      opacity: 0.7,
      shadowBlur: 6,
      shadowColor: 'rgba(0, 212, 255, 0.3)',
    },
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
        if (params.dataType === 'node') {
          return `<b>${params.name}</b>`
        }
        return `${params.data.source} → ${params.data.target}`
      },
    },
    series: [
      {
        type: 'graph',
        layout: 'none',
        data: positionedNodes,
        links: positionedLinks,
        roam: true,
        label: {
          position: 'bottom',
          distance: 6,
          color: '#fff',
          fontSize: 12,
        },
        lineStyle: {
          color: 'source',
          curveness: 0.3,
          width: 2,
          opacity: 0.7,
        },
        emphasis: {
          focus: 'adjacency',
          lineStyle: { width: 3, shadowBlur: 10 },
        },
        animationDuration: 1500,
        animationEasing: 'cubicOut',
      },
    ],
  }
})
</script>

<style scoped>
.network-graph {
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

.network-graph :deep(.v-chart) {
  flex: 1;
  min-height: 0;
  overflow: hidden;
}
</style>
