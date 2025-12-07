import { test, expect } from '@playwright/test';

// Visual snapshot test for the Warning Centre
// First run will create the snapshot; subsequent runs compare it.
test.describe('Warning Centre visual snapshot', () => {
  test('renders consistently', async ({ page }) => {
    await page.goto('http://localhost:4200/');

    // Ensure main UI is visible before snapshot
    await expect(page.locator('app-root')).toBeVisible();
    await expect(page.locator('app-warning-centre, app-warning-centre-root, app-warning-centre-component')).toBeVisible({ timeout: 3000 });

    // Take a screenshot of the full page for stability (soft assert to avoid failing builds)
      await expect(page).toHaveScreenshot('warning-centre.png', {
        fullPage: true,
        maxDiffPixelRatio: 0,
        // Mask highly dynamic UI bits if needed in the future
        // masks: [page.locator('.pok-overlay')]
      });
  });
});
