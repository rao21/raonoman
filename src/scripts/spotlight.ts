// Spotlight on every widget: track the pointer over each .w tile and set
// --x/--y so its radial glow (see base.css) follows the cursor.
// Fine-pointer devices only — no point tracking touch input.
if (window.matchMedia('(pointer: fine)').matches) {
  document.addEventListener(
    'pointermove',
    (e) => {
      const el = (e.target as HTMLElement).closest?.('.w') as HTMLElement | null;
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--x', `${e.clientX - r.left}px`);
      el.style.setProperty('--y', `${e.clientY - r.top}px`);
    },
    { passive: true }
  );
}
