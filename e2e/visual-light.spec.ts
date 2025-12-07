import { test, expect } from '@playwright/test';

test.describe('Warning Centre visual snapshot (light mode)', () => {
  test('renders consistently in light theme', async ({ page }) => {
    await page.addInitScript(() => {
      try {
        localStorage.setItem('app-theme-preference', 'light');
      } catch {}
    });
    await page.goto('/');
    await expect(page.locator('app-warning-centre, app-warning-centre-root, app-warning-centre-component')).toBeVisible({ timeout: 3000 });
    await expect(page).toHaveScreenshot('warning-centre-light.png', {
      fullPage: true,
      maxDiffPixelRatio: process.env.CI ? 0.02 : 0.002,
      mask: [
        page.locator('.manual-add-panel'),
        page.locator('.app-footer'),
        page.locator('app-debug-tools'),
      ],
    });
  });
});
