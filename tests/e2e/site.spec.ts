import { test, expect } from '@playwright/test';

test('no horizontal scroll at phone width', async ({ page, isMobile }) => {
  test.skip(!isMobile);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./');
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});

test('no broken internal links', async ({ page, request }) => {
  await page.goto('./');
  const hrefs = await page.locator('a[href^="/raonoman"]').evaluateAll(as => [...new Set(as.map(a => a.getAttribute('href')!.split('#')[0]))]);
  for (const h of hrefs) {
    const res = await request.get(h);
    expect(res.status(), h).toBe(200);
  }
});

test('every nav link lands on a section', async ({ page }) => {
  await page.goto('./');
  for (const id of ['services', 'work', 'reviews', 'speaking', 'stack', 'process', 'contact']) {
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  }
});

test('SEO basics', async ({ page }) => {
  await page.goto('./');
  await expect(page).toHaveTitle('Rao Noman · Flutter Consultant & AI Engineer');
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('meta[name=description]')).toHaveAttribute('content', /Flutter consultant/);
  await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href', 'https://rao21.github.io/raonoman/');
  expect(await page.locator('script[type="application/ld+json"]').count()).toBeGreaterThanOrEqual(1);
});

test('404 page', async ({ page }) => {
  const res = await page.goto('./does-not-exist');
  await expect(page.getByRole('heading', { name: 'Hot reload failed.' })).toBeVisible();
  expect(res?.status()).toBe(404);
});
