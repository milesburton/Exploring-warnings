

import { test, expect } from '@playwright/test';

// E2E tests for the Warning Centre UI
// Assumes dev server is running on http://localhost:4200

test.describe('Warning Centre UI', () => {
  test('happy path: seeded warnings, remove, clear all', async ({ page }) => {
    await page.goto('http://localhost:4200');

    // Open the warning centre overlay
    await page.locator('.alert-icon-btn').click();
    const overlay = page.locator('.bank-overlay');
    await expect(overlay).toBeVisible();

    // Check all seeded warnings are present
    await expect(overlay.locator('.error-item')).toHaveCount(4);
    await expect(overlay.locator('.msg-text')).toContainText([
      'User profile could not be loaded. Please check your connection or try again later.',
      'Notional Amount too low.',
      'KYC documents are incomplete.',
      'Market is now open.'
    ]);

    // Remove the first warning
    const firstCloseBtn = overlay.locator('.error-item .close-btn').first();
    await firstCloseBtn.click();
    await expect(overlay.locator('.error-item')).toHaveCount(3);
    await expect(overlay.locator('.msg-text')).not.toContainText(['SDS Customer not found']);

    // Clear all warnings
    await overlay.locator('.clear').click();
    // Should show the 'All good' state
    await expect(overlay.locator('.ok .title')).toHaveText(/All good/);
  });

  test('unhappy path: remove non-existent warning', async ({ page }) => {
    await page.goto('http://localhost:4200');
    // Open overlay
    await page.locator('.alert-icon-btn').click();
    const overlay = page.locator('.bank-overlay');
    await expect(overlay).toBeVisible();

    // Try to remove a warning that doesn't exist (simulate by running JS in browser context)
    await page.evaluate(() => {
      window.dispatchEvent(new CustomEvent('REMOVE_FAKE_WARNING'));
    });
    // No crash, overlay still visible
    await expect(overlay).toBeVisible();
  });

  test('unhappy path: overlay with no warnings', async ({ page }) => {
    await page.goto('http://localhost:4200');
    // Open overlay
    await page.locator('.alert-icon-btn').click();
    const overlay = page.locator('.bank-overlay');
    await expect(overlay).toBeVisible();

    // Clear all warnings
    await overlay.locator('.clear').click();
    // Should show the 'All good' state
    await expect(overlay.locator('.ok .title')).toHaveText(/All good/);
  });
});
