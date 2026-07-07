import { describe, it, expect, vi, beforeEach } from 'vitest'
import { logger } from '@/utils/logger'

describe('logger', () => {
  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {})
  })


  it('should format info logs with module and level', () => {
    logger.info('test-module', 'hello world')
    expect(console.log).toHaveBeenCalledTimes(1)
    const call = (console.log as any).mock.calls[0][0]
    expect(call).toContain('[test-module][INFO] hello world')
  })

  it('should format warn logs correctly', () => {
    logger.warn('test-module', 'be careful')
    const call = (console.log as any).mock.calls[0][0]
    expect(call).toContain('[test-module][WARN] be careful')
  })

  it('should format error logs with optional error object', () => {
    const error = new Error('fail')
    logger.error('test-module', 'something failed', error)
    const call = (console.log as any).mock.calls[0][0]
    expect(call).toContain('[test-module][ERROR] something failed')
    expect(call).toContain('fail')
  })
})
