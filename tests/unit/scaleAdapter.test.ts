import { describe, it, expect } from 'vitest'
import { computeScale, getDesignSize } from '@/utils/scaleAdapter'

describe('scaleAdapter', () => {
  it('should return 1 when viewport matches design size', () => {
    const originalInnerWidth = (window as any).innerWidth
    const originalInnerHeight = (window as any).innerHeight
    ;(window as any).innerWidth = 1920
    ;(window as any).innerHeight = 1080
    expect(computeScale()).toBe(1)
    ;(window as any).innerWidth = originalInnerWidth
    ;(window as any).innerHeight = originalInnerHeight
  })

  it('should return min(scaleX, scaleY) when viewport is smaller', () => {
    const originalInnerWidth = (window as any).innerWidth
    const originalInnerHeight = (window as any).innerHeight
    ;(window as any).innerWidth = 960
    ;(window as any).innerHeight = 540
    expect(computeScale()).toBe(0.5)
    ;(window as any).innerWidth = originalInnerWidth
    ;(window as any).innerHeight = originalInnerHeight
  })

  it('should return less than 1 when only width is smaller', () => {
    const originalInnerWidth = (window as any).innerWidth
    const originalInnerHeight = (window as any).innerHeight
    ;(window as any).innerWidth = 960
    ;(window as any).innerHeight = 1080
    expect(computeScale()).toBe(0.5)
    ;(window as any).innerWidth = originalInnerWidth
    ;(window as any).innerHeight = originalInnerHeight
  })

  it('should return correct design size', () => {
    expect(getDesignSize()).toEqual({ width: 1920, height: 1080 })
  })
})
