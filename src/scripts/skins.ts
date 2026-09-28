import { SKINS, nextSkin, readSkin, saveSkin, type Skin } from '../lib/skins';
import { withBase } from '../lib/base';

const root = document.documentElement;
const reloadBtn = document.getElementById('btnReload');
const toastEl = document.getElementById('toast');

// Private modes and blocked site data can make the localStorage getter itself throw.
function safeStorage(): Storage | null {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

// The skin on <html> is the source of truth; storage only seeds it on load.
function currentSkin(): Skin {
  const attr = root.dataset.skin as Skin | undefined;
  if (attr && SKINS.includes(attr)) return attr;
  return readSkin(safeStorage(), window.matchMedia('(prefers-color-scheme: dark)').matches);
}

let toastTimer: ReturnType<typeof setTimeout> | undefined;
function toast(msg: string) {
  if (!toastEl) return;
  toastEl.textContent = msg;
  toastEl.classList.add('on');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('on'), 2000);
}

reloadBtn?.addEventListener('click', () => {
  const skin = nextSkin(currentSkin());
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

  saveSkin(safeStorage(), skin);
  const ms = Math.round(performance.now() - start) || Math.round(150 + Math.random() * 120);
  const n = document.querySelectorAll('.w').length;
  toast(`⚡ Reloaded ${n} widgets in ${ms}ms · theme: ${skin}`);
});

// Only the home page has the boot overlay to replay; elsewhere Rebuild goes home.
document.getElementById('btnRebuild')?.addEventListener('click', () => {
  if (document.getElementById('boot')) window.dispatchEvent(new CustomEvent('hotreload:rebuild'));
  else window.location.assign(withBase('/'));
});
