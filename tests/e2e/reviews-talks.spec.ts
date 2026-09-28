import { test, expect } from '@playwright/test';

test('reviews show roles, not names', async ({ page }) => {
  await page.goto('./');
  await expect(page.getByRole('heading', { name: 'What my clients and peers say' })).toBeVisible();
  await expect(page.locator('#reviews figure')).toHaveCount(6);
  for (const n of ['Waleed', 'Burhanuddin', 'Usman Ali', 'Taha Ali', 'Ambreen']) await expect(page.locator('#reviews')).not.toContainText(n);
});

test('talk filters', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#speaking .ticket:visible')).toHaveCount(10);
  await page.getByRole('button', { name: 'Panels' }).click();
  await expect(page.locator('#speaking .ticket:visible')).toHaveCount(1);
  await expect(page.getByRole('button', { name: 'Panels' })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('button', { name: 'All', exact: true })).toHaveAttribute('aria-pressed', 'false');
  await page.getByRole('button', { name: 'Mentor & judge' }).click();
  await expect(page.locator('#speaking .ticket:visible')).toHaveCount(3);
  await page.getByRole('button', { name: 'All', exact: true }).click();
  await expect(page.locator('#speaking .ticket:visible')).toHaveCount(10);
});

test('talk tickets show real event banners', async ({ page }) => {
  await page.goto('./');
  const tickets = page.locator('#speaking .ticket:visible');
  const count = await tickets.count();
  expect(count).toBe(10);
  for (let i = 0; i < count; i++) {
    const ticket = tickets.nth(i);
    const img = ticket.locator('img');
    await expect(img).toHaveCount(1);
    await img.scrollIntoViewIfNeeded();
    const alt = await img.getAttribute('alt');
    expect(alt && alt.trim().length).toBeGreaterThan(0);
    await expect
      .poll(() => img.evaluate((el: HTMLImageElement) => el.naturalWidth))
      .toBeGreaterThan(0);
    const link = ticket.locator('a.tbanner');
    await expect(link).toHaveCount(1);
    const href = await link.getAttribute('href');
    expect(href).toMatch(/\.(jpg|jpeg|png|webp|avif)(\?.*)?$/);
  }
});
