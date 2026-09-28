import * as si from 'simple-icons';

type SI = { title: string; slug: string; hex: string; path: string };

const bySlug = new Map<string, SI>(
  Object.values(si as unknown as Record<string, SI>)
    .filter((v): v is SI => !!v && typeof v === 'object' && 'slug' in v)
    .map((v) => [v.slug, v]),
);

export function getIcon(slug: string): { title: string; path: string; hex: string } {
  const i = bySlug.get(slug);
  if (!i) throw new Error(`Unknown simple-icons slug: ${slug}`);
  return { title: i.title, path: i.path, hex: i.hex };
}

export function brandColor(hex: string): string {
  const [r, g, b] = [0, 2, 4].map((o) => parseInt(hex.slice(o, o + 2), 16) / 255);
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum < 0.18 || lum > 0.85 ? 'var(--accent)' : `#${hex.toUpperCase()}`;
}
