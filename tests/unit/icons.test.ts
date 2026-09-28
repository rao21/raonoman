import { describe, it, expect } from 'vitest';
import { getIcon, brandColor } from '../../src/lib/icons';

describe('icons', () => {
  it('returns path and hex for a known slug', () => {
    const i = getIcon('flutter');
    expect(i.title).toBe('Flutter');
    expect(i.path.length).toBeGreaterThan(20);
    expect(i.hex).toMatch(/^[0-9A-F]{6}$/i);
  });
  it('throws for unknown slugs', () => expect(() => getIcon('nope-nope')).toThrow());
  it('falls back to a local path for brands missing from simple-icons', () => {
    for (const slug of ['openai', 'xamarin', 'azuredevops']) {
      const i = getIcon(slug);
      expect(i.path.length).toBeGreaterThan(0);
      expect(i.hex).toMatch(/^[0-9A-F]{6}$/i);
    }
  });
  it('falls back to accent for near-black and near-white brands', () => {
    expect(brandColor('000000')).toBe('var(--accent)');
    expect(brandColor('FFFFFF')).toBe('var(--accent)');
    expect(brandColor('3776AB')).toBe('#3776AB');
  });
});
