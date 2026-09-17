import { test, expect } from '@playwright/test'

test('desktop: coverflow, navigation, dialog keyboard access, filters and theme', async ({ page }) => {
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  // Reduced motion disables the carousel auto-advance so navigation is deterministic.
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.goto('./')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await expect(page.locator('.coverflow-card')).toHaveCount(6)
  await expect(page.locator('.coverflow-card.is-active h3')).toHaveText('HireLens')
  await expect(page.locator('.showcase')).toBeVisible()
  await expect(page.locator('.showcase-hero')).toBeVisible()
  await expect(page.locator('.showcase-chip')).toHaveCount(3)
  await page.screenshot({ path: 'test-results/desktop-hero.png' })

  // Arrow navigation moves the active card.
  await page.getByRole('button', { name: 'Next project' }).click()
  await expect(page.locator('.coverflow-card.is-active h3')).toHaveText('Smart Community Safety')
  await page.getByRole('button', { name: 'Previous project' }).click()
  await expect(page.locator('.coverflow-card.is-active h3')).toHaveText('HireLens')
  // Dot navigation.
  await page.getByRole('tab', { name: /Air Gesture Mouse/ }).click()
  await expect(page.locator('.coverflow-card.is-active h3')).toHaveText('Air Gesture Mouse')
  await page.screenshot({ path: 'test-results/desktop-coverflow.png' })

  // Center card opens the project dialog.
  await page.locator('.coverflow-card.is-active').getByRole('button', { name: 'View Air Gesture Mouse', exact: true }).click()
  const dialog = page.getByRole('dialog', { name: 'Air Gesture Mouse' })
  await expect(dialog).toBeVisible()
  await expect(page.getByRole('button', { name: 'Close dialog' })).toBeFocused()
  await expect(page.locator('#portfolio-content')).toHaveAttribute('inert', '')
  await page.keyboard.press('Shift+Tab')
  await expect(dialog.getByRole('link', { name: /View source/ })).toBeFocused()
  await page.screenshot({ path: 'test-results/desktop-dialog.png' })
  await page.keyboard.press('Escape')
  await expect(dialog).toHaveCount(0)
  await expect(page.locator('.coverflow-card.is-active').getByRole('button', { name: 'View Air Gesture Mouse', exact: true })).toBeFocused()

  // Filters still drive the notebook.
  await page.getByRole('button', { name: 'Computer Vision', exact: true }).click()
  await page.getByRole('button', { name: /More projects/ }).click()
  await expect(page.locator('.notebook-item').first()).toBeVisible()
  await page.getByRole('button', { name: 'All work', exact: true }).click()

  await page.getByRole('button', { name: 'Switch to light mode' }).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  await page.screenshot({ path: 'test-results/desktop-light.png', fullPage: true })
  expect(errors).toEqual([])
})

for (const width of [375, 320, 768]) {
  test(`phone/tablet ${width}px: coverflow fits, scrolling, project dialog has one scroll region`, async ({ page }) => {
    await page.setViewportSize({ width, height: 812 })
    await page.goto('./')
    await expect(page.locator('.coverflow-card')).toHaveCount(6)
    await expect(page.locator('.brand-tag')).toBeVisible()
    await expect(page.getByRole('navigation').getByRole('link', { name: 'Resume' })).toBeVisible()
    await expect(page.locator('.showcase')).toBeVisible()
    const sizes = await page.evaluate(() => ({ width: document.documentElement.clientWidth, scrollWidth: document.documentElement.scrollWidth, height: window.innerHeight, scrollHeight: document.documentElement.scrollHeight, touchAction: getComputedStyle(document.body).touchAction }))
    expect(sizes.scrollWidth).toBeLessThanOrEqual(sizes.width)
    expect(sizes.scrollHeight).toBeGreaterThan(sizes.height)
    expect(sizes.touchAction).not.toBe('none')
    await page.screenshot({ path: `test-results/mobile-${width}-hero.png`, fullPage: true })
    await page.locator('.coverflow-card.is-active').getByRole('button', { name: 'View HireLens', exact: true }).click()
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
    const box = await dialog.boundingBox()
    expect(box.x).toBeGreaterThanOrEqual(0)
    expect(box.x + box.width).toBeLessThanOrEqual(width)
    expect(await page.locator('.info-panel-body').evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true)
    await page.screenshot({ path: `test-results/mobile-${width}-dialog.png` })
    await page.getByRole('button', { name: 'Close dialog' }).click()
    await expect(dialog).toHaveCount(0)
    await expect(page.locator('.coverflow-card.is-active').getByRole('button', { name: 'View HireLens', exact: true })).toBeFocused()
    await expect(page.locator('#portfolio-content')).not.toHaveAttribute('inert', '')
  })
}

test('reduced motion, resize, and printable resume', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('./')
  await expect(page.locator('.showcase')).toBeVisible()
  await expect(page.locator('.coverflow-card')).toHaveCount(6)
  await page.screenshot({ path: 'test-results/reduced-motion.png' })
  await page.setViewportSize({ width: 375, height: 812 })
  await expect(page.locator('.coverflow-card')).toHaveCount(6)
  await page.goto('resume.html')
  await expect(page.getByRole('heading', { name: 'Saba Fatima', exact: true })).toBeVisible()
  await expect(page.getByRole('link', { name: /sabaaaahussain/ })).toHaveAttribute('href', 'mailto:sabaaaahussain@gmail.com')
})
