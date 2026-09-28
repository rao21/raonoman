import { test, expect } from '@playwright/test';

test('toolkit has Python and FastAPI, no .NET', async ({ page }) => {
  await page.goto('./');
  const kit = page.locator('#stack');
  await expect(kit.getByText('FastAPI', { exact: true })).toBeVisible();
  await expect(kit.getByText('Python', { exact: true }).first()).toBeVisible();
  await expect(kit).not.toContainText('.NET');
});

test('journey facts and aligned logos', async ({ page }) => {
  await page.goto('./');
  const tree = page.locator('#journey');
  await expect(tree).toContainText('Visiting Faculty');
  await expect(tree).toContainText('Institute of Business Administration (IBA), Karachi');
  await expect(tree.locator('summary', { hasText: 'Figg Wealth' })).toContainText('Senior Software Engineer');
  const xs = await tree.locator('.role').evaluateAll(els => els.map(e => Math.round(e.getBoundingClientRect().left)));
  expect(new Set(xs).size).toBe(1);
});
