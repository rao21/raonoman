import { site } from '../content/site';

export type Need = 'Advisory' | 'Audit' | 'Build' | 'Lead' | 'AI';

export interface ContactFields {
  need: Need;
  name: string;
  email: string;
  about: string;
}

export const WEB3FORMS_URL = 'https://api.web3forms.com/submit';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** First invalid field (in form order), or null when everything is fine. */
export function validateContact(f: ContactFields): keyof ContactFields | null {
  if (!f.name.trim()) return 'name';
  if (!EMAIL_RE.test(f.email.trim())) return 'email';
  if (!f.about.trim()) return 'about';
  return null;
}

export function buildWhatsAppUrl(number: string, f: ContactFields): string {
  const text =
    'Hi Rao, I just sent a call request on your website.\n' +
    `Name: ${f.name.trim()}\n` +
    `I need help with: ${f.need}\n` +
    `About my app: ${f.about.trim()}`;
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export function receiptLines(id: string, f: ContactFields, sent: boolean): [string, string][] {
  return [
    ['REQUEST', id],
    ['TYPE', f.need],
    ['FROM', f.name.trim()],
    ['REPLY TO', f.email.trim()],
    ['STATUS', sent ? '✓ RECEIVED' : '✕ NOT SENT'],
    ['NEXT', sent ? 'Rao replies by email' : `Message Rao on WhatsApp or email ${site.email}`],
  ];
}

/**
 * Posts the request to Web3Forms. Resolves true only when Web3Forms says
 * success; an empty key, a non-2xx, a thrown fetch, a timeout (a stalled request
 * is aborted after timeoutMs) or success:false are all false.
 */
export async function sendRequest(
  key: string,
  body: FormData,
  fetchFn: typeof fetch = fetch,
  timeoutMs = 12000,
): Promise<boolean> {
  if (!key) return false;
  try {
    const res = await fetchFn(WEB3FORMS_URL, {
      method: 'POST',
      body,
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(timeoutMs),
    });
    if (!res.ok) return false;
    const json = (await res.json()) as { success?: unknown };
    return json.success === true;
  } catch {
    return false;
  }
}
