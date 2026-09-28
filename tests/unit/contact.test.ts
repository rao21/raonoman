import { describe, it, expect } from 'vitest';
import { validateContact, buildWhatsAppUrl, receiptLines, sendRequest } from '../../src/lib/contact';

const ok = { need: 'Build' as const, name: 'Sara', email: 'sara@startup.ae', about: 'A wallet app' };

describe('contact', () => {
  it('validates fields in order', () => {
    expect(validateContact(ok)).toBeNull();
    expect(validateContact({ ...ok, name: '  ' })).toBe('name');
    expect(validateContact({ ...ok, email: 'sara@' })).toBe('email');
    expect(validateContact({ ...ok, about: '' })).toBe('about');
  });
  it('builds a prefilled WhatsApp link', () => {
    const url = buildWhatsAppUrl('923332256193', ok);
    expect(url.startsWith('https://wa.me/923332256193?text=')).toBe(true);
    const text = decodeURIComponent(url.split('text=')[1]);
    expect(text).toContain('Name: Sara');
    expect(text).toContain('I need help with: Build');
    expect(text).toContain('About my app: A wallet app');
  });
  it('receipt says what happened', () => {
    expect(receiptLines('RN-1', ok, true)).toContainEqual(['STATUS', '✓ RECEIVED']);
    const failed = receiptLines('RN-1', ok, false);
    expect(failed).toContainEqual(['STATUS', '✕ NOT SENT']);
    expect(failed.find(([k]) => k === 'NEXT')?.[1]).toContain('rao.noman786@outlook.com');
  });
});

describe('sendRequest', () => {
  const fd = () => new FormData();
  const res = (status: number, body: unknown) =>
    (async () => new Response(typeof body === 'string' ? body : JSON.stringify(body), { status })) as unknown as typeof fetch;

  it('is true only when Web3Forms reports success', async () => {
    expect(await sendRequest('k', fd(), res(200, { success: true }))).toBe(true);
    expect(await sendRequest('k', fd(), res(200, { success: false }))).toBe(false);
    expect(await sendRequest('k', fd(), res(500, 'err'))).toBe(false);
    expect(await sendRequest('k', fd(), res(200, 'not json'))).toBe(false);
    expect(await sendRequest('k', fd(), (async () => { throw new Error('offline'); }) as unknown as typeof fetch)).toBe(false);
  });
  it('gives up on a stalled request', async () => {
    const stall = ((_: unknown, init?: RequestInit) =>
      new Promise((_r, reject) => init?.signal?.addEventListener('abort', () => reject(init.signal!.reason)))) as unknown as typeof fetch;
    expect(await sendRequest('k', fd(), stall, 20)).toBe(false);
  });
  it('skips the network when the key is empty', async () => {
    let called = false;
    const spy = (async () => { called = true; return new Response('{}'); }) as unknown as typeof fetch;
    expect(await sendRequest('', fd(), spy)).toBe(false);
    expect(called).toBe(false);
  });
});
