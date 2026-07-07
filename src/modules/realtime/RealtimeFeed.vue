<template>
  <div class="realtime-feed">
    <div class="feed-header">
      <span class="feed-dot" />
      <span class="feed-title">实时事件流</span>
    </div>
    <div class="feed-list" ref="listRef">
      <div
        v-for="item in visibleEvents"
        :key="item.id"
        class="feed-item"
        :class="{ 'is-new': item.isNew }"
      >
        <span class="feed-time">{{ item.time }}</span>
        <span :class="['feed-level', `feed-level--${item.level}`]">{{
          levelLabel(item.level)
        }}</span>
        <span class="feed-event">{{ item.event }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'
import { logger } from '@/utils/logger'

const store = useDashboardStore()
const listRef = ref<HTMLElement | null>(null)
let timer: number | null = null

type FeedEvent = {
  id: number
  time: string
  level: string
  event: string
  isNew: boolean
}

const events = ref<FeedEvent[]>([])
let nextId = 100

const eventTemplates = [
  { level: 'info', event: '用户 王五 完成课程《Vue3进阶》结业考试' },
  { level: 'success', event: '系统自动备份任务完成，耗时 2.8s' },
  { level: 'warn', event: '服务器 Node-05 内存使用率达到 82%' },
  { level: 'info', event: '新课程《TypeScript实战》已上架' },
  { level: 'success', event: '今日学习时长报表生成完毕' },
  { level: 'info', event: '管理员 赵六 更新了课程封面图片' },
  { level: 'warn', event: '在线并发人数接近峰值，建议扩容' },
  { level: 'info', event: '学生 孙七 提交了《算法作业》' },
]

function randomTime() {
  const now = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
}

function pushEvent() {
  const template = eventTemplates[Math.floor(Math.random() * eventTemplates.length)]
  const newItem: FeedEvent = {
    id: nextId++,
    time: randomTime(),
    level: template.level,
    event: template.event,
    isNew: true,
  }
  events.value.unshift(newItem)
  if (events.value.length > 8) {
    events.value.pop()
  }
  events.value.forEach((e) => (e.isNew = false))
  logger.debug('realtime', `new event: ${template.event}`)
}

const visibleEvents = computed(() => events.value)

function levelLabel(level: string): string {
  const map: Record<string, string> = {
    info: '信息',
    success: '成功',
    warn: '告警',
    error: '错误',
  }
  return map[level] || '信息'
}

onMounted(() => {
  if (store.realtime && store.realtime.events) {
    events.value = store.realtime.events.map((e) => ({ ...e, isNew: false }))
  }
  timer = window.setInterval(pushEvent, 2000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.realtime-feed {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 14px 16px;
  overflow: hidden;
}

.feed-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.feed-dot {
  width: 8px;
  height: 8px;
  background: var(--accent-green);
  border-radius: 50%;
  box-shadow: 0 0 8px var(--accent-green);
  animation: blink 1s ease-in-out infinite;
}

.feed-title {
  font-size: 14px;
  color: var(--text-secondary);
  letter-spacing: 1px;
}

.feed-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
  overflow: hidden;
}

.feed-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background: var(--bg-card);
  border: 1px solid var(--border-glow);
  border-radius: var(--radius-sm);
  font-size: 13px;
  transition: all 0.4s ease;
}

.feed-item.is-new {
  animation: flash 1s ease;
}

.feed-time {
  font-family: var(--font-mono);
  color: var(--text-muted);
  min-width: 70px;
  flex-shrink: 0;
}

.feed-level {
  font-size: 11px;
  font-weight: 600;
  padding: 1px 6px;
  border-radius: 4px;
  flex-shrink: 0;
}

.feed-level--info {
  background: rgba(0, 212, 255, 0.2);
  color: var(--accent-blue);
}

.feed-level--success {
  background: rgba(0, 255, 136, 0.2);
  color: var(--accent-green);
}

.feed-level--warn {
  background: rgba(255, 170, 0, 0.2);
  color: #ffaa00;
}

.feed-event {
  flex: 1;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}

@keyframes flash {
  0% {
    box-shadow: 0 0 0 rgba(0, 212, 255, 0);
  }
  50% {
    box-shadow: 0 0 20px rgba(0, 212, 255, 0.6);
  }
  100% {
    box-shadow: 0 0 0 rgba(0, 212, 255, 0);
  }
}
</style>
