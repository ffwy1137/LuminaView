import { test, expect } from '@playwright/test'

test.describe('LuminaView Dashboard', () => {
  test('should display dashboard title', async ({ page }) => {
    await page.goto('http://localhost:5173')
    await page.waitForSelector('h1', { timeout: 10000 })
    const title = await page.locator('h1').textContent()
    expect(title).toContain('流光视窗')
  })

  test('should render KPI cards', async ({ page }) => {
    await page.goto('http://localhost:5173')
    await page.waitForSelector('.title-card', { timeout: 10000 })
    const cards = await page.locator('.title-card').count()
    expect(cards).toBeGreaterThanOrEqual(4)
  })

  test('should render trend chart', async ({ page }) => {
    await page.goto('http://localhost:5173')
    await page.waitForSelector('.trend-chart canvas, .trend-chart div', { timeout: 10000 })
    const chart = await page.locator('.trend-chart').count()
    expect(chart).toBeGreaterThanOrEqual(1)
  })

  test('should render realtime feed items', async ({ page }) => {
    await page.goto('http://localhost:5173')
    await page.waitForSelector('.feed-item', { timeout: 10000 })
    const items = await page.locator('.feed-item').count()
    expect(items).toBeGreaterThanOrEqual(1)
  })
})
