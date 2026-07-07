const DESIGN_WIDTH = 1920
const DESIGN_HEIGHT = 1080

export function computeScale(): number {
  if (typeof window === 'undefined') return 1
  const w = window.innerWidth
  const h = window.innerHeight
  const scaleX = w / DESIGN_WIDTH
  const scaleY = h / DESIGN_HEIGHT
  return Math.min(scaleX, scaleY)
}

export function getDesignSize() {
  return { width: DESIGN_WIDTH, height: DESIGN_HEIGHT }
}
