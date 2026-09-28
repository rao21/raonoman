// Talk ticket filters: toggle the `hidden` attribute so filtered-out
// tickets leave the accessibility tree entirely (display:none via [hidden]).
const tf = document.querySelector<HTMLElement>('.tfilter');

if (tf) {
  tf.addEventListener('click', (e) => {
    const b = (e.target as HTMLElement).closest('button');
    if (!b) return;
    Array.from(tf.children).forEach((x) => x.classList.toggle('on', x === b));
    const f = (b.getAttribute('data-f') || 'all').split(' ');
    document.querySelectorAll<HTMLElement>('.ticket').forEach((t) => {
      const show = f[0] === 'all' || f.includes(t.getAttribute('data-kind') || '');
      if (show) t.removeAttribute('hidden');
      else t.setAttribute('hidden', '');
    });
  });
}
