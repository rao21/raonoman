import { describe, it, expect } from 'vitest';
import { nextSkin, readSkin, saveSkin } from '../../src/lib/skins';

const throwing = { getItem() { throw new Error('denied'); }, setItem() { throw new Error('denied'); } };

describe('skins', () => {
  it('cycles paper → graphite → flutter → paper', () => {
    expect(nextSkin('paper')).toBe('graphite');
    expect(nextSkin('graphite')).toBe('flutter');
    expect(nextSkin('flutter')).toBe('paper');
  });
  it('reads a stored skin, else follows the OS', () => {
    expect(readSkin({ getItem: () => 'flutter' }, false)).toBe('flutter');
    expect(readSkin({ getItem: () => null }, true)).toBe('graphite');
    expect(readSkin({ getItem: () => 'bogus' }, false)).toBe('paper');
  });
  it('survives storage that throws', () => {
    expect(readSkin(throwing, true)).toBe('graphite');
    expect(() => saveSkin(throwing, 'paper')).not.toThrow();
    expect(readSkin(null, false)).toBe('paper');
  });
});
