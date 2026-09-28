export function joinBase(base: string, path: string): string {
  if (/^(https?:|mailto:|tel:)/.test(path)) return path;
  const b = base.endsWith('/') ? base : base + '/';
  if (path.startsWith('#')) return b + path;
  return (b + path.replace(/^\//, '')).replace(/\/{2,}/g, '/');
}
export const withBase = (path: string) => joinBase(import.meta.env.BASE_URL, path);
