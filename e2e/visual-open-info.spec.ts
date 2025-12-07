import { test, expect } from '@playwright/test';

test.describe('Warning Centre visual snapshot (open dialog - info)', () => {
  test('renders info severity', async ({ page }) => {
    await page.goto('http://localhost:4200/');
    await page.waitForLoadState('networkidle');
    await page.locator('.alert-icon-btn').click();
    await page.waitForLoadState('networkidle');

    const popover = page.locator('.p-popover.pok-overlay');
    await expect(popover).toBeVisible();

    const errorCloseButtons = page.locator('.error-item.msg-error .close-btn');
    const errorCount = await errorCloseButtons.count();
    for (let i = 0; i < errorCount; i++) {
      await errorCloseButtons.nth(0).click();
    }

    const warnCloseButtons = page.locator('.error-item.msg-warning .close-btn');
    const warnCount = await warnCloseButtons.count();
    for (let i = 0; i < warnCount; i++) {
      await warnCloseButtons.nth(0).click();
    }

    await expect(page.locator('.error-item.msg-info')).toBeVisible();

    await expect(page).toHaveScreenshot('warning-centre-open-info.png', {
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
