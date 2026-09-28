import { nextSkin, readSkin, saveSkin } from '../lib/skins';

const root = document.documentElement;
const reloadBtn = document.getElementById('btnReload');
const toastEl = document.getElementById('toast');

let toastTimer: ReturnType<typeof setTimeout> | undefined;
function toast(msg: string) {
  if (!toastEl) return;
  toastEl.textContent = msg;
  toastEl.classList.add('on');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('on'), 2000);
}

reloadBtn?.addEventListener('click', () => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const current = readSkin(localStorage, prefersDark);
  const skin = nextSkin(current);
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const apply = () => root.setAttribute('data-skin', skin);
  const start = performance.now();

  if (document.startViewTransition && !reduce) {
    const r = reloadBtn.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const end = Math.hypot(Math.max(cx, innerWidth - cx), Math.max(cy, innerHeight - cy));
    const vt = document.startViewTransition(apply);
    vt.ready
      .then(() => {
        root.animate(
          { clipPath: [`circle(0px at ${cx}px ${cy}px)`, `circle(${end}px at ${cx}px ${cy}px)`] },
          { duration: 650, easing: 'cubic-bezier(.4,0,.2,1)', pseudoElement: '::view-transition-new(root)' }
        );
      })
      .catch(() => {});
  } else {
    apply();
  }

  saveSkin(localStorage, skin);
  const ms = Math.round(performance.now() - start) || Math.round(150 + Math.random() * 120);
  const n = document.querySelectorAll('.w').length;
  toast(`⚡ Reloaded ${n} widgets in ${ms}ms · theme: ${skin}`);
});

document.getElementById('btnRebuild')?.addEventListener('click', () => {
  window.dispatchEvent(new CustomEvent('hotreload:rebuild'));
});
