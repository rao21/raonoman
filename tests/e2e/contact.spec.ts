import { test, expect, type Page } from '@playwright/test';

const API = 'https://api.web3forms.com/submit';

async function fill(page: Page) {
  await page.fill('#f-name', 'Sara');
  await page.fill('#f-email', 'sara@startup.ae');
  await page.fill('#f-what', 'A wallet app');
}

test('empty submit is blocked and focuses the first field', async ({ page }) => {
  await page.goto('./#contact');
  await page.click('#contact button[type=submit]');
  await expect(page.locator('#f-name')).toBeFocused();
  await expect(page.locator('#receipt')).not.toHaveClass(/on/);
});

test('successful request shows receipt and WhatsApp link', async ({ page }) => {
  await page.route(API, r => r.fulfill({ status: 200, json: { success: true } }));
  await page.goto('./#contact');
  await fill(page);
  await page.click('#contact button[type=submit]');
  await expect(page.locator('#receipt')).toContainText('✓ RECEIVED');
  const wa = page.getByRole('link', { name: 'Continue on WhatsApp' });
  await expect(wa).toBeVisible();
  await expect(wa).toHaveAttribute('href', /wa\.me\/923332256193\?text=.*Sara/);
});

test('failed request never pretends to succeed', async ({ page }) => {
  await page.route(API, r => r.fulfill({ status: 500, body: 'err' }));
  await page.goto('./#contact');
  await fill(page);
  await page.click('#contact button[type=submit]');
  await expect(page.locator('#receipt')).toContainText('✕ NOT SENT');
  await expect(page.locator('#receipt')).toContainText('rao.noman786@outlook.com');
  await expect(page.getByRole('link', { name: 'Continue on WhatsApp' })).toBeVisible();
});

for (const [label, handler] of [
  ['network error', (r: import('@playwright/test').Route) => r.abort('failed')],
  ['success:false', (r: import('@playwright/test').Route) => r.fulfill({ status: 200, json: { success: false } })],
] as const) {
  test(`${label} is reported as not sent`, async ({ page }) => {
    await page.route(API, handler);
    await page.goto('./#contact');
    await fill(page);
    await page.click('#contact button[type=submit]');
    await expect(page.locator('#receipt')).toContainText('✕ NOT SENT');
    await expect(page.locator('#receipt')).not.toContainText('✓ RECEIVED');
    await expect(page.getByRole('link', { name: 'Continue on WhatsApp' })).toBeVisible();
  });
}

test('posts the Web3Forms payload and disables submit while in flight', async ({ page }) => {
  let release!: () => void;
  const gate = new Promise<void>(res => (release = res));
  let body = '';
  await page.route(API, async r => {
    body = r.request().postData() ?? '';
    await gate;
    await r.fulfill({ status: 200, json: { success: true } });
  });
  await page.goto('./#contact');
  await page.getByText('App audit', { exact: true }).click();
  await fill(page);
  const submit = page.locator('#contact button[type=submit]');
  await submit.click();
  await expect(submit).toBeDisabled();
  release();
  await expect(page.locator('#receipt')).toContainText('✓ RECEIVED');
  await expect(submit).toBeEnabled();
  expect(body).toContain('test-key');
  expect(body).toContain('New call request: Audit');
  expect(body).toContain('rao21.github.io');
  expect(body).not.toContain('name="botcheck"'); // unchecked honeypot is not submitted
});

test('honeypot is hidden and a filled one skips sending but shows success', async ({ page }) => {
  let called = false;
  await page.route(API, r => { called = true; return r.fulfill({ status: 200, json: { success: true } }); });
  await page.goto('./#contact');
  const hp = page.locator('#contact input[name=botcheck]');
  await expect(hp).toHaveAttribute('tabindex', '-1');
  await expect(hp).not.toBeVisible();
  await hp.evaluate((el: HTMLInputElement) => { el.checked = true; });
  await fill(page);
  await page.click('#contact button[type=submit]');
  await expect(page.locator('#receipt')).toContainText('✓ RECEIVED');
  expect(called).toBe(false);
});

test('card flips with the keyboard', async ({ page }) => {
  await page.goto('./#contact');
  const card = page.locator('#card3d');
  await expect(card).toHaveAttribute('aria-pressed', 'false');
  await card.focus();
  await page.keyboard.press('Enter');
  await expect(card).toHaveAttribute('aria-pressed', 'true');
  await page.keyboard.press('Space');
  await expect(card).toHaveAttribute('aria-pressed', 'false');
});

test('card back and direct chips carry the contact details', async ({ page }) => {
  await page.goto('./#contact');
  const c = page.locator('#contact');
  await expect(c.locator('.front')).toContainText('RAO NOMAN');
  await expect(c.locator('.front')).toContainText('PAKISTAN');
  await expect(c.locator('.back')).toContainText('+92 333 2256193');
  await expect(c.getByRole('link', { name: /Download CV/ })).toHaveAttribute('href', /drive\.google\.com/);
  await expect(c.locator('.direct a[href^="mailto:rao.noman786@outlook.com"]')).toHaveCount(1);
  await expect(c.locator('.direct a[href^="https://wa.me/923332256193"]')).toHaveCount(1);
  await expect(c.getByRole('radio', { name: 'New app' })).toBeChecked();
  await expect(c.getByRole('radio')).toHaveCount(5);
});
