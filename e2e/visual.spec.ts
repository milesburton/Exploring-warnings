import { test, expect } from '@playwright/test';
test.describe('Warning Centre visual snapshot', () => {
  test('renders consistently', async ({ page }) => {
    await page.goto('http://localhost:4200/');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('app-root')).toBeVisible();
    await expect(page.locator('app-warning-centre, app-warning-centre-root, app-warning-centre-component')).toBeVisible({ timeout: 3000 });
    
      await expect(page).toHaveScreenshot('warning-centre.png', {
        fullPage: true,
        maxDiffPixelRatio: process.env.CI ? 0.02 : 0,
        mask: [page.locator('.manual-add-panel')],
      });
  });
});
