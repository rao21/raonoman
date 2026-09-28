import { describe, it, expect } from 'vitest';
import { joinBase } from '../../src/lib/base';

describe('joinBase', () => {
  it('prefixes paths', () => expect(joinBase('/raonoman/', '/work/xpence')).toBe('/raonoman/work/xpence'));
  it('keeps anchors on the home page', () => expect(joinBase('/raonoman/', '#work')).toBe('/raonoman/#work'));
  it('handles root', () => expect(joinBase('/raonoman/', '/')).toBe('/raonoman/'));
  it('leaves absolute URLs alone', () => expect(joinBase('/raonoman/', 'https://xpence.com/')).toBe('https://xpence.com/'));
});
