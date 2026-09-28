// Boot overlay + hero assemble. Server HTML is fully assembled with #boot hidden;
// this only plays the intro when JS runs, motion is allowed and the session has not seen it.
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const boot = document.getElementById('boot');
const bootCode = document.getElementById('bootCode');
const h1 = document.getElementById('headline');
const bento = document.getElementById('bento');
// .b-head holds the LCP element (#headline) and must stay painted at opacity 1
// from first paint, so it is excluded from the scatter/assemble flyers.
const flyers = Array.from(document.querySelectorAll<HTMLElement>('.fly:not(.b-head)'));

let timers: ReturnType<typeof setTimeout>[] = [];
let active = false;
const later = (fn: () => void, ms: number) => timers.push(setTimeout(fn, ms));
const clearTimers = () => {
  timers.forEach(clearTimeout);
  timers = [];
};

function alreadyBooted(): boolean {
  try {
    return window.sessionStorage.getItem('booted') === '1';
  } catch {
    return false;
  }
}
function markBooted() {
  try {
    window.sessionStorage.setItem('booted', '1');
  } catch {
    /* storage unavailable (private mode): the intro simply replays next time */
  }
}

/* ---------- headline words ---------- */
function splitWords(node: Node) {
  Array.from(node.childNodes).forEach((n) => {
    if (n.nodeType === Node.TEXT_NODE) {
      const frag = document.createDocumentFragment();
      (n.textContent ?? '').split(/(\s+)/).forEach((part) => {
        if (!part) return;
        if (/^\s+$/.test(part)) frag.appendChild(document.createTextNode(part));
        else {
          const s = document.createElement('span');
          s.className = 'word';
          s.textContent = part;
          frag.appendChild(s);
        }
      });
      node.replaceChild(frag, n);
    } else if (n instanceof Element && !n.classList.contains('rot')) splitWords(n);
  });
}
let words: HTMLElement[] = [];
function ensureWords() {
  if (!h1 || words.length) return;
  splitWords(h1);
  words = Array.from(h1.querySelectorAll<HTMLElement>('.word'));
}

/* ---------- count-up (server HTML already shows the final values) ---------- */
function countUp() {
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const end = Number(el.dataset.count);
    const suf = el.dataset.suffix ?? '';
    if (reduce || !Number.isFinite(end)) {
      el.textContent = `${end}${suf}`;
      return;
    }
    const t0 = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / 1200);
      const e = 1 - Math.pow(1 - p, 3);
      el.textContent = `${Math.round(end * e)}${suf}`;
      if (p < 1) requestAnimationFrame(step);
    };
    step(t0);
  });
}

/* ---------- boot + assemble ---------- */
function scatter() {
  flyers.forEach((el) => {
    el.style.transition = 'none';
    el.classList.add('out');
    const r = (n: number, off: number) => Math.random() * n - off;
    el.style.transform = `translate3d(${r(300, 150)}px,${r(220, 60)}px,${250 + Math.random() * 400}px) rotateX(${r(50, 25)}deg) rotateY(${r(50, 25)}deg)`;
  });
}

function assemble() {
  flyers.forEach((el, i) =>
    later(() => {
      el.style.transition = '';
      el.classList.remove('out');
      el.style.transform = '';
    }, 60 + i * 90)
  );
  later(countUp, 500);
}

function finishBoot() {
  if (!boot || !active) return;
  active = false;
  clearTimers();
  boot.classList.add('done');
  later(() => boot.classList.contains('done') && (boot.hidden = true), 450);
  assemble();
}

const code: [string, string][] = [
  ['kw', 'void '],
  ['fn', 'main'],
  ['', '() => '],
  ['fn', 'runApp'],
  ['', '('],
  ['cl', 'RaoNoman'],
  ['', '());'],
];

function runBoot() {
  if (!boot || !bootCode || reduce) return;
  clearTimers();
  markBooted();
  ensureWords();
  active = true;
  bootCode.textContent = '';
  boot.hidden = false;
  boot.style.transition = 'none'; // appear at once; only the exit fades
  boot.classList.remove('done');
  void boot.offsetWidth;
  boot.style.transition = '';
  scatter();
  const flat = code.flatMap(([cls, text]) => text.split('').map((ch) => [cls, ch] as const));
  let k = 0;
  const type = () => {
    if (k < flat.length) {
      const [cls, ch] = flat[k++];
      const s = document.createElement('span');
      if (cls) s.className = cls;
      s.textContent = ch;
      bootCode.appendChild(s);
      later(type, 32);
    } else later(finishBoot, 380);
  };
  type();
}

boot?.addEventListener('click', finishBoot);
window.addEventListener('keydown', () => active && finishBoot());
window.addEventListener('hotreload:rebuild', () => {
  window.scrollTo({ top: 0, behavior: 'instant' });
  if (reduce) countUp();
  else runBoot();
});

if (!reduce && !alreadyBooted()) runBoot();

/* ---------- hero parallax tilt ---------- */
const hero = document.querySelector<HTMLElement>('.hero');
if (hero && bento && !reduce && window.matchMedia('(pointer:fine)').matches) {
  hero.addEventListener('pointermove', (e) => {
    const r = bento.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    bento.style.transform = `rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
  });
  hero.addEventListener('pointerleave', () => (bento.style.transform = ''));
}

export {};
