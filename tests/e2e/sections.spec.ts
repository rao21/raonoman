import { test, expect } from '@playwright/test';

test('content is visible without JavaScript', async ({ browser }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto('./');
  for (const t of ['Sound familiar?', 'Ways to work together', 'How a project runs', 'Why teams hire me']) {
    await expect(page.getByRole('heading', { name: t })).toBeVisible();
  }
  expect(await page.locator('.skel').first().evaluate((e) => getComputedStyle(e).opacity)).toBe('0');
  await ctx.close();
});

test('five services and four steps', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#services .svc > *')).toHaveCount(5);
  await expect(page.locator('#process .steps > li')).toHaveCount(4);
});
