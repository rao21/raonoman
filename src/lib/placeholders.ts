const BAD = [/\bTODO\b/i, /\bAdd a\b/, /\bAdd your\b/, /coming soon/i, /lorem/i];

function isImageLike(value: object): boolean {
  return 'src' in value && 'width' in value;
}

export function findPlaceholders(value: unknown, path = ''): string[] {
  if (typeof value === 'string') {
    if (/\.(jpg|jpeg|png|webp|svg)$/i.test(value)) return [];
    return BAD.some((r) => r.test(value)) ? [path] : [];
  }
  if (Array.isArray(value)) {
    return value.flatMap((v, i) => findPlaceholders(v, `${path}[${i}]`));
  }
  if (value && typeof value === 'object' && !isImageLike(value)) {
    return Object.entries(value).flatMap(([k, v]) => findPlaceholders(v, path ? `${path}.${k}` : k));
  }
  return [];
}
