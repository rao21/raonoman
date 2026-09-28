// Consultation form → Web3Forms → receipt, with a WhatsApp follow-up that is
// always offered. The receipt only says "✓ RECEIVED" when Web3Forms confirmed it
// (or the honeypot tripped, where we pretend success on purpose).
import { site } from '../content/site';
import { buildWhatsAppUrl, receiptLines, sendRequest, validateContact, type ContactFields, type Need } from '../lib/contact';
import { isFlipped, setFlipped } from './card';

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const form = document.getElementById('contactForm') as HTMLFormElement | null;
const receipt = document.getElementById('receipt');
const waBtn = document.getElementById('waBtn') as HTMLAnchorElement | null;

const fieldEl: Record<'name' | 'email' | 'about', string> = { name: 'f-name', email: 'f-email', about: 'f-what' };

// Each field's error message is the element its aria-describedby points at.
function setInvalid(el: HTMLElement, invalid: boolean) {
  const msg = document.getElementById(el.getAttribute('aria-describedby') ?? '');
  if (invalid) el.setAttribute('aria-invalid', 'true');
  else el.removeAttribute('aria-invalid');
  if (msg) msg.hidden = !invalid;
}

function showReceipt(lines: [string, string][]) {
  if (!receipt) return;
  receipt.textContent = '';
  for (const [k, v] of lines) {
    const row = document.createElement('div');
    const a = document.createElement('span');
    const b = document.createElement('span');
    a.textContent = k;
    b.textContent = v;
    if (k === 'STATUS') b.className = v.startsWith('✓') ? 'ok' : 'bad';
    row.append(a, b);
    receipt.append(row);
  }
  receipt.classList.add('on');
  Array.from(receipt.children).forEach((row, i) => {
    if (reduce) row.classList.add('in');
    else setTimeout(() => row.classList.add('in'), 200 + i * 180);
  });
}

if (form && receipt && waBtn) {
  const submit = form.querySelector<HTMLButtonElement>('button[type=submit]')!;
  const key = form.dataset.key ?? '';
  const label = submit.textContent ?? '';

  form.addEventListener('input', (e) => {
    const el = e.target as HTMLElement;
    if (el.hasAttribute('aria-describedby')) setInvalid(el, false);
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (submit.disabled) return;
    const data = new FormData(form);
    const fields: ContactFields = {
      need: ((data.get('need') as string) || 'Build') as Need,
      name: String(data.get('name') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      about: String(data.get('message') ?? '').trim(),
    };

    const bad = validateContact(fields);
    if (bad && bad !== 'need') {
      const el = document.getElementById(fieldEl[bad])!;
      setInvalid(el, true);
      el.focus();
      return;
    }

    const id = `RN-${Math.floor(1000 + Math.random() * 9000)}`;
    submit.disabled = true;
    submit.setAttribute('aria-busy', 'true');
    submit.textContent = 'Sending…';
    let sent: boolean;
    if (data.get('botcheck')) {
      sent = true; // honeypot tripped: say thanks, send nothing
    } else {
      data.set('subject', `New call request: ${fields.need}`);
      data.set('from_name', 'rao21.github.io');
      data.set('access_key', key);
      data.set('request', id);
      const timeout = Number(form.dataset.timeout) || 12000;
      sent = await sendRequest(key, data, fetch, timeout);
    }
    submit.disabled = false;
    submit.removeAttribute('aria-busy');
    submit.textContent = label;

    if (!isFlipped()) setFlipped(true);
    showReceipt(receiptLines(id, fields, sent));
    waBtn.href = buildWhatsAppUrl(site.whatsapp, fields, sent);
    // Clear a delivered request (need goes back to its "New app" default) so a second
    // click can't resend it; a failed one keeps the text for a retry.
    if (sent) form.reset();
    waBtn.hidden = false;
    if (!reduce) {
      waBtn.classList.remove('pop');
      void waBtn.offsetWidth;
      waBtn.classList.add('pop');
    }
  });
}
