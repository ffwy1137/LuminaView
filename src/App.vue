<template>
  <div class="screen-wrapper" :style="{ transform: `translate(-50%, -50%) scale(${scale})` }">
    <div class="dashboard">
      <Header />
      <KpiCards />
      <GlowBorder class="charts-row">
        <div class="charts-inner">
          <GlowBorder class="chart-col chart-col-left">
            <TrendChart />
          </GlowBorder>
          <GlowBorder class="chart-col chart-col-center">
            <MapPanel />
          </GlowBorder>
          <div class="chart-col chart-col-right">
            <GlowBorder class="chart-box">
              <RankingPanel />
            </GlowBorder>
            <GlowBorder class="chart-box">
              <RadarChart />
            </GlowBorder>
          </div>
        </div>
      </GlowBorder>
      <GlowBorder class="realtime-row">
        <RealtimeFeed />
      </GlowBorder>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'
import Header from '@/modules/header/Header.vue'
import KpiCards from '@/modules/overview/OverviewPanel.vue'
import TrendChart from '@/modules/trend/TrendChart.vue'
import MapPanel from '@/modules/map/MapPanel.vue'
import RankingPanel from '@/modules/ranking/RankingPanel.vue'
import RadarChart from '@/modules/capabilities/RadarChart.vue'
import RealtimeFeed from '@/modules/realtime/RealtimeFeed.vue'
import { computeScale } from '@/utils/scaleAdapter'
import GlowBorder from '@/shared/components/GlowBorder.vue'

const store = useDashboardStore()
const scale = ref(1)

function updateScale() {
  scale.value = computeScale()
}

onMounted(async () => {
  await store.refreshAll()
  store.startAutoRefresh()
  updateScale()
  window.addEventListener('resize', updateScale)
})

onUnmounted(() => {
  store.stopAutoRefresh()
  window.removeEventListener('resize', updateScale)
})
</script>

<style scoped>
.screen-wrapper {
  width: 1920px;
  height: 1080px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: center center;
}

.dashboard {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #050816 0%, #0a0e27 50%, #0d1133 100%);
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 10px;
  position: relative;
  overflow: hidden;
}

.charts-row {
  flex: 1;
  min-height: 0;
}

.charts-inner {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 10px;
  padding: 0;
}

.chart-col {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 0;
  overflow: hidden;
}

.chart-col-left,
.chart-col-center {
  min-height: 0;
  overflow: hidden;
}

.chart-box {
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

.realtime-row {
  height: 110px;
  min-height: 110px;
  flex-shrink: 0;
}
</style>
