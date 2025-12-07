
import { test, expect } from '@playwright/test';

test.describe('Warning Centre UI', () => {
  test('happy path: seeded warnings, remove, clear all', async ({ page }) => {
    await page.goto('http://localhost:4200');

    
    await page.locator('.alert-icon-btn').click();
    const overlay = page.locator('.pok-overlay');
    await expect(overlay).toBeVisible();
    
    await expect(overlay.locator('.error-item')).toHaveCount(4);
    await expect(overlay.locator('.msg-text')).toContainText([
      'Pikachu is missing from the Pokédex. Please check your connection to Professor Oak.',
      'Charmander needs more training.',
      'Bulbasaur has not completed gym registration.',
      'The Pokémon League is now open.'
    ]);
    
    const firstCloseBtn = overlay.locator('.error-item .close-btn').first();
    await firstCloseBtn.click();
    await expect(overlay.locator('.error-item')).toHaveCount(3);
    await expect(overlay.locator('.msg-text')).not.toContainText(['MissingNo encountered']);
    
    await overlay.locator('.clear').click();
    
    await expect(overlay.locator('.ok .title')).toHaveText(/All good/);
  });

  test('unhappy path: remove non-existent warning', async ({ page }) => {
    await page.goto('http://localhost:4200');
    
    await page.locator('.alert-icon-btn').click();
    const overlay = page.locator('.pok-overlay');
    await expect(overlay).toBeVisible();
    
    await page.evaluate(() => {
      window.dispatchEvent(new CustomEvent('REMOVE_FAKE_WARNING'));
    });
    
    await expect(overlay).toBeVisible();
  });

  test('unhappy path: overlay with no warnings', async ({ page }) => {
    await page.goto('http://localhost:4200');
    
    await page.locator('.alert-icon-btn').click();
    const overlay = page.locator('.pok-overlay');
    await expect(overlay).toBeVisible();
    
    await overlay.locator('.clear').click();
    
    await expect(overlay.locator('.ok .title')).toHaveText(/All good/);
  });
});
