<template>
  <div class="glow-border">
    <slot />
  </div>
</template>

<style scoped>
.glow-border {
  position: relative;
  background: var(--bg-card);
  border: 1px solid var(--border-glow);
  border-radius: var(--radius-md);
  backdrop-filter: blur(10px);
  box-shadow:
    var(--shadow-glow),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

.glow-border:hover {
  transform: translateY(-4px);
  background: var(--bg-card-hover);
  box-shadow:
    0 8px 30px rgba(0, 212, 255, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.glow-border::before {
  content: '';
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  border-radius: inherit;
  background: linear-gradient(135deg, var(--accent-blue), transparent, var(--accent-purple));
  opacity: 0.15;
  z-index: -1;
}
</style>
