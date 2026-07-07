<template>
  <header class="dashboard-header">
    <div class="header-decorator" />
    <div class="header-content">
      <h1 class="header-title">LuminaView · 流光视窗</h1>
      <p class="header-subtitle">数据驾驶舱</p>
    </div>
    <div class="header-clock">{{ dateTimeStr }}</div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const dateTimeStr = ref('')
let timer: number | null = null

function updateTime() {
  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  const h = String(now.getHours()).padStart(2, '0')
  const mi = String(now.getMinutes()).padStart(2, '0')
  const s = String(now.getSeconds()).padStart(2, '0')
  const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  const w = weekdays[now.getDay()]
  dateTimeStr.value = `${y}-${m}-${d} ${w} ${h}:${mi}:${s}`
}

onMounted(() => {
  updateTime()
  timer = window.setInterval(updateTime, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.dashboard-header {
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-shrink: 0;
}

.header-decorator {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent 0%, var(--accent-blue) 50%, transparent 100%);
  opacity: 0.6;
}

.header-content {
  text-align: center;
}

.header-title {
  font-size: 32px;
  font-weight: 700;
  letter-spacing: 4px;
  background: linear-gradient(90deg, #00d4ff, #7b61ff, #00d4ff);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shine 4s linear infinite;
  margin: 0;
  line-height: 1.2;
}

.header-subtitle {
  font-size: 12px;
  color: var(--text-muted);
  letter-spacing: 3px;
  margin-top: 4px;
  text-transform: uppercase;
}

.header-clock {
  position: absolute;
  right: 28px;
  top: 50%;
  transform: translateY(-50%);
  font-family: var(--font-number);
  font-size: 20px;
  color: var(--accent-blue);
  letter-spacing: 2px;
  text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
}

@keyframes shine {
  to {
    background-position: 200% center;
  }
}
</style>
