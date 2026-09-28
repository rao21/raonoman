import { test, expect } from '@playwright/test';

test('reduced motion: no boot overlay, full headline visible', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./');
  await expect(page.locator('#boot')).toBeHidden();
  await expect(page.locator('h1')).toContainText('I help startups ship mobile apps that');
  await expect(page.locator('#rot em')).toHaveText('scale to millions.');
});

test.describe('with motion', () => {
  test.use({ reducedMotion: 'no-preference' });

  test('boot overlay shows once per session and can be skipped', async ({ page }) => {
    await page.goto('./');
    await expect(page.locator('#boot')).toBeVisible();
    await page.mouse.click(10, 10);
    await expect(page.locator('#boot')).toBeHidden();
    await page.reload();
    await expect(page.locator('#boot')).toBeHidden();
  });

  test('rebuild replays the boot', async ({ page }) => {
    await page.goto('./');
    await page.mouse.click(10, 10);
    await page.click('#btnRebuild');
    await expect(page.locator('#boot')).toBeVisible();
  });
});

test('clock shows Pakistan time', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#clock')).toHaveText(/^\d{2}:\d{2}:\d{2}$/);
  await expect(page.locator('.b-loc')).toContainText('Pakistan');
});
