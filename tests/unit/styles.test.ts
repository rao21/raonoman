import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

// fontsource-variable registers "Geist Variable" and "Geist Mono Variable" only.
describe('font families', () => {
  it('always names the registered Geist variable fonts', () => {
    const dir = path.resolve('src/styles');
    const bad: string[] = [];
    for (const f of readdirSync(dir).filter(f => f.endsWith('.css'))) {
      readFileSync(path.join(dir, f), 'utf8').split('\n').forEach((line, i) => {
        if (/(["']?)Geist( Mono)?\1(?! Variable)[,;}]/.test(line.replace(/["']Geist( Mono)? Variable["']/g, ''))) bad.push(`${f}:${i + 1}`);
      });
    }
    expect(bad).toEqual([]);
  });
});
