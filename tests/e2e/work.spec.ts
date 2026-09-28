import { test, expect } from '@playwright/test';

test('case studies link out to their websites', async ({ page }) => {
  await page.goto('./');
  const xpence = page.locator('#work .case', { hasText: 'Xpence' });
  await expect(xpence.getByRole('link', { name: /Xpence/ }).first()).toHaveAttribute('href', 'https://xpence.com/');
  await expect(page.locator('#work .case', { hasText: 'Figg Wealth' }).getByText('No longer on the stores')).toBeVisible();
});

test('no placeholder result rows ship', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#work')).not.toContainText('Add a');
  await expect(page.locator('#work .case', { hasText: 'Xpence' }).getByText('Result', { exact: true })).toHaveCount(0);
  await expect(page.locator('#work .case', { hasText: 'JazzCash' }).getByText("Pakistan's largest mobile wallet")).toBeVisible();
});

test('every case study has its own page', async ({ page }) => {
  for (const slug of ['xpence', 'cence', 'figg-wealth', 'jazzcash', 'rock']) {
    const res = await page.goto(`./work/${slug}/`);
    expect(res?.status()).toBe(200);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1);
  }
});

const SLUGS = ['xpence', 'cence', 'figg-wealth', 'jazzcash', 'rock'];

test('case-study canonicals match the sitemap', async ({ page }) => {
  const { readFileSync } = await import('node:fs');
  const sitemap = readFileSync('dist/sitemap-0.xml', 'utf8');
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  for (const slug of SLUGS) {
    await page.goto(`./work/${slug}/`);
    const canonical = await page.locator('link[rel=canonical]').getAttribute('href');
    expect(locs, slug).toContain(canonical);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', canonical!);
  }
  await page.goto('./');
  for (const href of await page.locator('#work a[href*="/work/"]').evaluateAll(as => as.map(a => a.getAttribute('href')!))) {
    expect(href).toMatch(/\/work\/[a-z-]+\/$/);
  }
});

test('case-study JSON-LD points at the case page', async ({ page }) => {
  await page.goto('./work/xpence/');
  const ld = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent())!);
  const canonical = await page.locator('link[rel=canonical]').getAttribute('href');
  expect(ld.url).toBe(canonical);
  expect(ld.sameAs).toBe('https://xpence.com/');
  await page.goto('./work/figg-wealth/');
  const figg = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent())!);
  expect(figg.url).toMatch(/\/work\/figg-wealth\/$/);
  expect(figg.sameAs).toBeUndefined();
});
