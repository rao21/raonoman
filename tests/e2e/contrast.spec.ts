import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// Reduced motion (the config default) reveals every section, so axe sees all content.
// The .w::before spotlight (opacity 0 at rest), the faint hero glow, the ticket-stub
// notches and the journey tree lines are decorative pseudo elements that never sit
// under text; axe can't see past pseudo elements, so they are removed for the check.
const UNVEIL = '.w::before,.b-head::after,.stub::before,.stub::after,.tree ul::before,.tree li::before{content:none!important}';

for (const skin of ['paper', 'graphite', 'flutter']) {
  test(`text meets WCAG AA contrast in the ${skin} skin`, async ({ page }) => {
    await page.addInitScript(s => localStorage.setItem('skin', s), skin);
    await page.route('https://api.web3forms.com/submit', r => r.fulfill({ status: 200, json: { success: true } }));
    await page.goto('./');
    await expect(page.locator('html')).toHaveAttribute('data-skin', skin);
    await page.addStyleTag({ content: UNVEIL });

    // Put the form's error messages and both receipt states on screen.
    await page.fill('#f-name', 'Sara');
    await page.fill('#f-email', 'sara@startup.ae');
    await page.fill('#f-what', 'A wallet app');
    await page.click('#contact button[type=submit]');
    await expect(page.locator('#receipt')).toContainText('✓ RECEIVED');
    await page.evaluate(() => {
      document.querySelectorAll<HTMLElement>('#contact .err').forEach(e => (e.hidden = false));
      const row = document.createElement('div');
      row.className = 'in';
      row.innerHTML = '<span>STATUS</span><span class="bad">✕ NOT SENT</span>';
      document.getElementById('receipt')!.append(row);
    });

    const { violations } = await new AxeBuilder({ page }).withRules(['color-contrast']).analyze();
    const summary = violations.flatMap(v => v.nodes.map(n => `${n.target.join(' ')}: ${n.any.map(a => a.message).join('; ')}`));
    expect(summary).toEqual([]);
  });
}
