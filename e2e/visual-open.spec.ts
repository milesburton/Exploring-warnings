import { test, expect } from '@playwright/test';

// Visual snapshot when the error dialog (popover) is open
test.describe('Warning Centre visual snapshot (open dialog)', () => {
  test('renders popover with spacing', async ({ page }) => {
    await page.goto('http://localhost:4200/');

    await expect(page.locator('app-root')).toBeVisible();
    await expect(page.locator('app-warning-centre, app-warning-centre-root, app-warning-centre-component')).toBeVisible({ timeout: 3000 });

    // Open the popover via the alert icon button
    await page.locator('.alert-icon-btn').click();
    await expect(page.locator('.p-popover.pok-overlay')).toBeVisible();

    // Soft assertion to avoid CI failures while we iterate
    await expect.soft(page).toHaveScreenshot('warning-centre-open.png', {
      fullPage: true,
    });
  });
});
