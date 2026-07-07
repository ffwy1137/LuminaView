<template>
  <div class="kpi-section">
    <div class="section-title">
      <span class="section-dot" />
      <span class="section-name">核心指标概览</span>
    </div>
    <div class="kpi-row">
    <GlowBorder
      v-for="(card, index) in cards"
      :key="card.key"
      class="kpi-card"
      :style="{ animationDelay: `${index * 100}ms` }"
    >
      <div class="kpi-header">
        <span class="kpi-dot" />
        <span class="kpi-title">{{ card.title }}</span>
      </div>
      <div class="kpi-body">
        <span class="kpi-value">{{ card.formattedValue }}</span>
        <span class="kpi-unit" v-if="card.unit">{{ card.unit }}</span>
      </div>
      <div class="kpi-footer">
        <span :class="['kpi-trend', card.trendUp ? 'up' : 'down']">
          {{ card.trendUp ? '▲' : '▼' }} {{ card.trend }}
        </span>
        <span class="kpi-desc">环比昨日</span>
      </div>
    </GlowBorder>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'
import GlowBorder from '@/shared/components/GlowBorder.vue'

const store = useDashboardStore()

const cards = computed(() => {
  if (!store.overview) return []
  const o = store.overview
  return [
    {
      key: 'visits',
      title: '今日访问量',
      value: o.todayVisits,
      trend: o.visitTrend,
      trendUp: true,
      unit: '',
    },
    {
      key: 'users',
      title: '活跃用户数',
      value: o.activeUsers,
      trend: o.userTrend,
      trendUp: true,
      unit: '',
    },
    {
      key: 'health',
      title: '系统健康度',
      value: o.systemHealth,
      trend: o.healthTrend,
      trendUp: true,
      unit: '%',
    },
    {
      key: 'courses',
      title: '课程总数',
      value: o.courseCount,
      trend: o.courseTrend,
      trendUp: true,
      unit: '',
    },
  ].map((c) => ({
    ...c,
    formattedValue: c.value.toLocaleString('zh-CN'),
  }))
})
</script>

<style scoped>
.kpi-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 4px 8px 4px;
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

.kpi-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  flex-shrink: 0;
}

.kpi-card {
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  animation: fadeInUp 0.6s ease both;
}

.kpi-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.kpi-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent-blue);
  box-shadow: 0 0 8px var(--accent-blue);
  flex-shrink: 0;
}

.kpi-title {
  font-size: 13px;
  color: var(--text-secondary);
  font-weight: 500;
  letter-spacing: 0.5px;
}

.kpi-body {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.kpi-value {
  font-family: var(--font-number);
  font-size: 38px;
  font-weight: 700;
  color: var(--text-primary);
  text-shadow: 0 0 12px rgba(0, 212, 255, 0.4);
  font-variant-numeric: tabular-nums;
}

.kpi-unit {
  font-size: 14px;
  color: var(--text-muted);
}

.kpi-footer {
  display: flex;
  align-items: center;
  gap: 8px;
}

.kpi-trend {
  font-size: 13px;
  font-weight: 700;
  font-family: var(--font-mono);
  color: #ffaa00;
}

.kpi-desc {
  font-size: 12px;
  color: var(--text-muted);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
