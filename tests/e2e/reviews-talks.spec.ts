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
  await expect(page.locator('#speaking .ticket:visible')).toHaveCount(2);
  await expect(page.getByRole('button', { name: 'Panels' })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'false');
  await page.getByRole('button', { name: 'Mentor & judge' }).click();
  await expect(page.locator('#speaking .ticket:visible')).toHaveCount(3);
  await page.getByRole('button', { name: 'All' }).click();
  await expect(page.locator('#speaking .ticket:visible')).toHaveCount(10);
});
