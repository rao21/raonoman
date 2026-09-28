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
    const res = await page.goto(`./work/${slug}`);
    expect(res?.status()).toBe(200);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1);
  }
});
