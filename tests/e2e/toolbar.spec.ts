import { test, expect } from '@playwright/test';

test('hot reload cycles the skin and remembers it', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
  await page.goto('./');
  await page.click('#btnReload');
  await expect(page.locator('html')).toHaveAttribute('data-skin', 'graphite');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-skin', 'graphite');
});

test('debug paint toggles', async ({ page }) => {
  await page.goto('./');
  await page.click('#btnDebug');
  await expect(page.locator('body')).toHaveClass(/debug/);
  await expect(page.locator('#btnDebug')).toHaveAttribute('aria-pressed', 'true');
});

test('mobile menu opens and closes', async ({ page, isMobile }) => {
  test.skip(!isMobile);
  await page.goto('./');
  const btn = page.getByRole('button', { name: /menu/i });
  await btn.click();
  await expect(btn).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(btn).toHaveAttribute('aria-expanded', 'false');
});

for (const [label, init] of [
  ['localStorage getter throws', () => {
    Object.defineProperty(window, 'localStorage', { get() { throw new DOMException('denied', 'SecurityError'); } });
  }],
  ['setItem throws', () => {
    Storage.prototype.setItem = () => { throw new DOMException('full', 'QuotaExceededError'); };
  }],
] as const) {
  test(`hot reload cycles every skin when ${label}`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.addInitScript(init);
    await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
    await page.goto('./');
    const html = page.locator('html');
    for (const skin of ['graphite', 'flutter', 'paper']) {
      await page.click('#btnReload');
      await expect(html).toHaveAttribute('data-skin', skin);
    }
    expect(errors).toEqual([]);
  });
}

test('Rebuild on a case-study page goes home', async ({ page }) => {
  await page.goto('./work/xpence/');
  await page.click('#btnRebuild');
  await expect(page).toHaveURL(/\/raonoman\/$/);
});
