import { test, expect } from '@playwright/test';

test.describe('Warning Centre visual snapshot (open dialog - warning)', () => {
  test('renders warning severity', async ({ page }) => {
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

    await expect(popover.locator('.error-item.msg-warning')).toBeVisible();

    await popover.evaluate((el) => {
      const node = el as HTMLElement;
      node.style.width = '680px';
      node.style.height = '244px';
      node.style.boxSizing = 'border-box';
      node.style.overflow = 'hidden';
    });

    await expect(popover).toHaveScreenshot('warning-centre-open-warning.png', {
      // Slightly relaxed on CI due to rendering variance in element screenshots
      maxDiffPixelRatio: process.env.CI ? 0.03 : 0,
    });
  });
});
