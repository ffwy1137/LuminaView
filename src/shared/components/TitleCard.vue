<template>
  <GlowBorder class="title-card">
    <div class="card-header">
      <span class="card-icon">{{ icon }}</span>
      <span class="card-title">{{ title }}</span>
    </div>
    <div class="card-body">
      <div class="card-value">
        <span class="value-text">{{ formattedValue }}</span>
        <span class="value-unit" v-if="unit">{{ unit }}</span>
      </div>
      <div class="card-footer">
        <span :class="['trend', trendUp ? 'up' : 'down']">
          {{ trendUp ? '↑' : '↓' }} {{ trend }}
        </span>
      </div>
      <div class="card-desc">{{ description }}</div>
    </div>
  </GlowBorder>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import GlowBorder from './GlowBorder.vue'

const props = withDefaults(
  defineProps<{
    title: string
    value: number
    icon?: string
    unit?: string
    trend: string
    trendUp: boolean
    description?: string
  }>(),
  {
    icon: '◆',
    unit: '',
    description: '',
  }
)

const formattedValue = computed(() => {
  return props.value.toLocaleString('zh-CN')
})
</script>

<style scoped>
.title-card {
  padding: 20px 22px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  animation: fadeInUp 0.6s ease both;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.card-icon {
  color: var(--accent-blue);
  font-size: 14px;
  filter: drop-shadow(0 0 4px var(--accent-blue));
}

.card-title {
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.card-value {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.value-text {
  font-family: var(--font-number);
  font-size: 34px;
  font-weight: 700;
  color: var(--text-primary);
  text-shadow: 0 0 12px rgba(0, 212, 255, 0.35);
  transition: all 0.3s ease;
  font-variant-numeric: tabular-nums;
}

.value-unit {
  font-size: 14px;
  color: var(--text-muted);
  margin-left: 4px;
}

.card-footer {
  display: flex;
  align-items: center;
  gap: 8px;
}

.trend {
  font-size: 13px;
  font-weight: 700;
  font-family: var(--font-mono);
  padding: 2px 6px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.06);
}

.up {
  color: var(--accent-green);
  text-shadow: 0 0 6px rgba(0, 255, 136, 0.3);
}

.down {
  color: var(--accent-red);
  text-shadow: 0 0 6px rgba(255, 71, 87, 0.3);
}

.card-desc {
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.4;
  margin-top: 2px;
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
