<template>
  <span class="scroll-number">{{ displayValue }}</span>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

const props = defineProps<{
  value: number
  duration?: number
}>()

const displayValue = ref('0')
let frameId: number | null = null

function animateValue(from: number, to: number) {
  const startTime = performance.now()
  const duration = props.duration || 800

  function tick(now: number) {
    const elapsed = now - startTime
    const progress = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    const current = Math.floor(from + (to - from) * eased)
    displayValue.value = current.toLocaleString('zh-CN')
    if (progress < 1) {
      frameId = requestAnimationFrame(tick)
    }
  }

  frameId = requestAnimationFrame(tick)
}

let previousValue = props.value
watch(
  () => props.value,
  (newVal) => {
    if (frameId) cancelAnimationFrame(frameId)
    animateValue(previousValue, newVal)
    previousValue = newVal
  }
)

onMounted(() => {
  displayValue.value = props.value.toLocaleString('zh-CN')
})
</script>

<style scoped>
.scroll-number {
  display: inline-block;
  font-family: var(--font-number);
  font-variant-numeric: tabular-nums;
}
</style>
