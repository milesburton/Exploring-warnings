import { test, expect } from '@playwright/test';

test.describe('Warning Centre visual snapshot (open dialog - warning)', () => {
  test('renders warning severity', async ({ page }) => {
    await page.goto('http://localhost:4200/');
    await page.locator('.alert-icon-btn').click();

    const popover = page.locator('.p-popover.pok-overlay');
    await expect(popover).toBeVisible();

    const errorCloseButtons = page.locator('.error-item.msg-error .close-btn');
    const errorCount = await errorCloseButtons.count();
    for (let i = 0; i < errorCount; i++) {
      await errorCloseButtons.nth(0).click();
    }

    await expect(page.locator('.error-item.msg-warning')).toBeVisible();

    await expect(page).toHaveScreenshot('warning-centre-open-warning.png', {
      fullPage: true,
      maxDiffPixelRatio: 0,
      mask: [page.locator('.manual-add-panel')],
    });
  });
});
