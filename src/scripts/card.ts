// Titanium contact card: pointer tilt, idle sway, and a flip that works from
// click, the "Flip card" button, and the keyboard (Enter/Space on #card3d).
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const zone = document.getElementById('cardzone');
const card = document.getElementById('card3d');
let flipped = false;
let flipTimer = 0;

export function isFlipped(): boolean {
  return flipped;
}

export function setFlipped(next: boolean): void {
  if (!card || next === flipped) return;
  flipped = next;
  card.setAttribute('aria-pressed', String(flipped));
  card.style.setProperty('--flip', flipped ? '180deg' : '0deg');
  if (reduce) return;
  card.classList.add('flipping');
  clearTimeout(flipTimer);
  flipTimer = window.setTimeout(() => card.classList.remove('flipping'), 900);
}

const flip = () => setFlipped(!flipped);

if (zone && card) {
  let idle = true;
  let visible = false;
  let t = 0;
  let raf = 0;

  zone.addEventListener('pointermove', (e) => {
    if (e.pointerType === 'touch') return;
    idle = false;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    if (!reduce) {
      card.style.setProperty('--ry', `${(x - 0.5) * 34}deg`);
      card.style.setProperty('--rx', `${(0.5 - y) * 24}deg`);
    }
    card.style.setProperty('--mx', `${x * 100}%`);
    card.style.setProperty('--my', `${y * 100}%`);
  });
  zone.addEventListener('pointerleave', () => (idle = true));

  const sway = () => {
    raf = 0;
    if (!visible) return;
    if (idle) {
      t += 0.01;
      card.style.setProperty('--ry', `${-16 + Math.sin(t) * 12}deg`);
      card.style.setProperty('--rx', `${8 + Math.cos(t * 0.8) * 4}deg`);
      card.style.setProperty('--mx', `${50 + Math.sin(t) * 40}%`);
    }
    raf = requestAnimationFrame(sway);
  };
  if (!reduce && 'IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(sway);
    }).observe(zone);
  }

  card.addEventListener('click', flip);
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      flip();
    }
  });
  document.getElementById('flipBtn')?.addEventListener('click', flip);
}
