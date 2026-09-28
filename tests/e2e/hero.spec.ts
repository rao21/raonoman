import { test, expect } from '@playwright/test';

test('reduced motion: no boot overlay, full headline visible', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./');
  await expect(page.locator('#boot')).toBeHidden();
  await expect(page.locator('h1')).toContainText('I help startups ship mobile apps that');
  await expect(page.locator('#rot em')).toHaveText('scale to millions.');
});

test('"Live on the stores" phones are visible, full size and inside the tile', async ({ page }) => {
  await page.goto('./');
  const tile = await page.locator('.b-phones').boundingBox();
  const phones = page.locator('.b-phones img.hp');
  await expect(phones).toHaveCount(3);
  for (const phone of await phones.all()) {
    await expect(phone).toBeVisible();
    const box = await phone.boundingBox();
    expect(box!.height).toBeGreaterThan(150);
    expect(box!.x + box!.width).toBeGreaterThan(tile!.x);
    expect(box!.x).toBeLessThan(tile!.x + tile!.width);
  }
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
