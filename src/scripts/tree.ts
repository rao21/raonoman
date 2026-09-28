// Widget tree line grows with scroll: the vertical connector under
// #treeList fills in as the section scrolls into view. Full under
// reduced motion, since there's no scroll-driven animation to run.
const tree = document.getElementById('treeList');
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (tree) {
  function growTree() {
    if (!tree) return;
    const r = tree.getBoundingClientRect();
    const p = (window.innerHeight * 0.75 - r.top) / r.height;
    tree.style.setProperty('--grow', `${Math.max(0, Math.min(1, p)) * 100}%`);
  }

  if (!reduce) {
    window.addEventListener('scroll', growTree, { passive: true });
    growTree();
  } else {
    tree.style.setProperty('--grow', '100%');
  }
}

export {};
