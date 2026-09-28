// Skeleton → content on scroll: elements below the fold start pending
// (skeleton shimmer shown), then reveal with a stagger once they scroll
// into view. Does nothing under reduced motion.
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const builds = Array.from(document.querySelectorAll<HTMLElement>('.build'));

if (!reduce && 'IntersectionObserver' in window) {
  builds.forEach((el) => {
    if (el.getBoundingClientRect().top > window.innerHeight) el.classList.add('pending');
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        const parent = el.parentNode as ParentNode;
        const siblings = Array.from(parent.querySelectorAll<HTMLElement>('.build.pending'));
        const delay = Math.max(0, siblings.indexOf(el)) * 120;
        setTimeout(() => el.classList.remove('pending'), 250 + delay);
        io.unobserve(el);
      });
    },
    { threshold: 0.2 }
  );

  builds.forEach((el) => io.observe(el));
}
