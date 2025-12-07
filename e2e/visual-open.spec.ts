import { test, expect } from '@playwright/test';
test.describe('Warning Centre visual snapshot (open dialog)', () => {
  test('renders popover with spacing', async ({ page }) => {
    await page.goto('http://localhost:4200/');

    await expect(page.locator('app-root')).toBeVisible();
    await expect(page.locator('app-warning-centre, app-warning-centre-root, app-warning-centre-component')).toBeVisible({ timeout: 3000 });
    
    await page.locator('.alert-icon-btn').click();
    await expect(page.locator('.p-popover.pok-overlay')).toBeVisible();
    
    const trigger = page.locator('.alert-icon-btn');
    const popover = page.locator('.p-popover.pok-overlay');
    const [btnBox, popBox] = await Promise.all([
      trigger.boundingBox(),
      popover.boundingBox(),
    ]);
    expect(btnBox).toBeTruthy();
    expect(popBox).toBeTruthy();
    
    const popMarginTop = await popover.evaluate((el) => {
      const mt = getComputedStyle(el).marginTop;
      return Math.round(parseFloat(mt || '0'));
    });
    
    expect(popMarginTop).toBeGreaterThanOrEqual(0);
    expect(popMarginTop).toBeLessThanOrEqual(20);
    
    await expect(page).toHaveScreenshot('warning-centre-open.png', {
      fullPage: true,
      maxDiffPixelRatio: 0,
      mask: [page.locator('.manual-add-panel')],
    });
  });
});
