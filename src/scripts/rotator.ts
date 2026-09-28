// Rotating promise: select → delete → type, like an editor.
// Pauses while the tab is hidden or #rot is off screen.
const rot = document.getElementById('rot');
const text = rot?.querySelector('em');
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function readPhrases(): string[] {
  try {
    const raw = rot?.dataset.phrases;
    const list: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list.filter((p): p is string => typeof p === 'string') : [];
  } catch {
    return [];
  }
}

if (rot && text) {
  const phrases = readPhrases();
  let inView = true;
  let wake: (() => void) | null = null;
  const canRun = () => inView && !document.hidden;
  const poke = () => {
    if (canRun() && wake) {
      wake();
      wake = null;
    }
  };
  const gate = () => (canRun() ? Promise.resolve() : new Promise<void>((r) => (wake = r)));
  const wait = async (ms: number) => {
    await new Promise((r) => setTimeout(r, ms));
    await gate();
  };

  setTimeout(() => rot.classList.add('lined'), reduce ? 0 : 1800);

  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      inView = entries.some((e) => e.isIntersecting);
      poke();
    }).observe(rot);
  }
  document.addEventListener('visibilitychange', poke);

  const loop = async () => {
    let i = 0;
    await wait(3200);
    for (;;) {
      rot.classList.add('sel');
      await wait(420);
      rot.classList.remove('sel');
      rot.classList.add('typing');
      while (text.textContent) {
        text.textContent = text.textContent.slice(0, -1);
        await wait(22);
      }
      await wait(260);
      i = (i + 1) % phrases.length;
      const next = phrases[i];
      for (let k = 1; k <= next.length; k++) {
        text.textContent = next.slice(0, k);
        await wait(45 + Math.random() * 55);
      }
      rot.classList.remove('typing');
      await wait(2600);
    }
  };
  if (!reduce && phrases.length > 1) loop();
}

export {};
