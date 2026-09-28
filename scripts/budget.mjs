// Checks that the built home page stays within its CSS/JS size budget and that
// no built page (every dist/**/*.html) contains leftover placeholder copy.
// For the size budget, only assets actually referenced by
// dist/index.html are counted (script src, link rel=stylesheet href, and
// inline <style>/<script> contents) — not every file under dist/.
import { readFile, readdir } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
import path from 'node:path';

const DIST = path.resolve('dist');
const JS_BUDGET = 25 * 1024;
const CSS_BUDGET = 30 * 1024;
const PLACEHOLDERS = [/TODO/, /Add a/, /Add your/, /coming soon/i, /lorem/i];

function gzipSize(str) {
  return gzipSync(Buffer.from(str, 'utf8')).length;
}

async function main() {
  const htmlPath = path.join(DIST, 'index.html');
  const html = await readFile(htmlPath, 'utf8');

  const errors = [];

  // Developer-only toolbar buttons must never reach a production build.
  if (process.env.PUBLIC_DEV_TOOLS !== 'true' && /id="(btnDebug|btnRebuild)"/.test(html)) {
    errors.push('Debug paint / Rebuild buttons found in a production build (set PUBLIC_DEV_TOOLS only for tests).');
  }

  const pages = (await readdir(DIST, { recursive: true })).filter((f) => f.endsWith('.html')).sort();
  for (const page of pages) {
    const text = await readFile(path.join(DIST, page), 'utf8');
    for (const re of PLACEHOLDERS) {
      if (re.test(text)) errors.push(`Placeholder text matching ${re} found in dist/${page}`);
    }
  }
  console.log(`Scanned ${pages.length} pages for placeholder text.`);

  let jsBytes = 0;
  let cssBytes = 0;
  const jsFiles = [];
  const cssFiles = [];

  // External stylesheets: <link rel="stylesheet" href="...">
  for (const m of html.matchAll(/<link\b[^>]*>/gi)) {
    const tag = m[0];
    if (!/rel=["']stylesheet["']/i.test(tag)) continue;
    const hrefMatch = tag.match(/href=["']([^"']+)["']/i);
    if (!hrefMatch) continue;
    const href = hrefMatch[1];
    const resolved = path.join(DIST, href.replace(/^https?:\/\/[^/]+/, '').replace(/^\/raonoman\//, ''));
    try {
      const content = await readFile(resolved);
      const size = gzipSync(content).length;
      cssBytes += size;
      cssFiles.push({ href, size });
    } catch {
      errors.push(`Referenced stylesheet not found on disk: ${href}`);
    }
  }

  // External scripts: <script ... src="...">
  for (const m of html.matchAll(/<script\b[^>]*>/gi)) {
    const tag = m[0];
    const srcMatch = tag.match(/src=["']([^"']+)["']/i);
    if (!srcMatch) continue;
    const typeMatch = tag.match(/type=["']([^"']+)["']/i);
    const type = typeMatch?.[1];
    if (type && !/^(module|text\/javascript|application\/javascript)$/i.test(type)) continue;
    const src = srcMatch[1];
    const resolved = path.join(DIST, src.replace(/^https?:\/\/[^/]+/, '').replace(/^\/raonoman\//, ''));
    try {
      const content = await readFile(resolved);
      const size = gzipSync(content).length;
      jsBytes += size;
      jsFiles.push({ src, size });
    } catch {
      errors.push(`Referenced script not found on disk: ${src}`);
    }
  }

  // Inline <style>...</style>
  for (const m of html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)) {
    const size = gzipSize(m[1]);
    cssBytes += size;
    cssFiles.push({ href: '(inline style)', size });
  }

  // Inline <script>...</script> without a src, excluding non-JS types (json-ld etc).
  for (const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    const attrs = m[1];
    if (/src=["']/i.test(attrs)) continue;
    const typeMatch = attrs.match(/type=["']([^"']+)["']/i);
    const type = typeMatch?.[1];
    if (type && !/^(module|text\/javascript|application\/javascript)$/i.test(type)) continue;
    const body = m[2];
    if (!body.trim()) continue;
    const size = gzipSize(body);
    jsBytes += size;
    jsFiles.push({ src: '(inline script)', size });
  }

  console.log('--- Referenced CSS ---');
  for (const f of cssFiles) console.log(`  ${f.href}: ${(f.size / 1024).toFixed(2)} KB gzip`);
  console.log(`Total CSS: ${(cssBytes / 1024).toFixed(2)} KB gzip (budget ${(CSS_BUDGET / 1024).toFixed(0)} KB)`);

  console.log('--- Referenced JS ---');
  for (const f of jsFiles) console.log(`  ${f.src}: ${(f.size / 1024).toFixed(2)} KB gzip`);
  console.log(`Total JS: ${(jsBytes / 1024).toFixed(2)} KB gzip (budget ${(JS_BUDGET / 1024).toFixed(0)} KB)`);

  if (jsBytes > JS_BUDGET) errors.push(`JS budget exceeded: ${(jsBytes / 1024).toFixed(2)} KB > ${(JS_BUDGET / 1024).toFixed(0)} KB`);
  if (cssBytes > CSS_BUDGET) errors.push(`CSS budget exceeded: ${(cssBytes / 1024).toFixed(2)} KB > ${(CSS_BUDGET / 1024).toFixed(0)} KB`);

  if (errors.length) {
    console.error('\nBudget check FAILED:');
    for (const e of errors) console.error(`  - ${e}`);
    process.exit(1);
  }

  console.log('\nBudget check passed.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
