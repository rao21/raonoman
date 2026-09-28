const nav = document.querySelector('nav.top');
const btn = nav?.querySelector<HTMLButtonElement>('.menu-btn');

function close() {
  btn?.setAttribute('aria-expanded', 'false');
  nav?.classList.remove('open');
}

function open() {
  btn?.setAttribute('aria-expanded', 'true');
  nav?.classList.add('open');
}

btn?.addEventListener('click', () => {
  const expanded = btn.getAttribute('aria-expanded') === 'true';
  if (expanded) close();
  else open();
});

nav?.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  if (target.closest('a')) close();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') close();
});
