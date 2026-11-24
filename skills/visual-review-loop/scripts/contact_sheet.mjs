#!/usr/bin/env node
// Contact sheet: every image of one or more folders side by side (one row per folder), with file names,
// rendered to a PNG by a local headless Chrome/Chromium. No dependencies.
// Usage: node contact_sheet.mjs out.png folderA [folderB …]   (env: CHROME=/path/to/chrome, THUMB=260)
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, readdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const [out, ...folders] = process.argv.slice(2);
if (!out || !folders.length) {
  console.error('Usage: node contact_sheet.mjs out.png folderA [folderB …]');
  process.exit(1);
}

const candidates = [
  process.env.CHROME,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
].filter(Boolean);
const chrome = candidates.find((p) => existsSync(p));
if (!chrome) {
  console.error('No Chrome or Chromium found. Set CHROME=/path/to/chrome.');
  process.exit(1);
}

const THUMB = Number(process.env.THUMB) || 260;
const natural = (a, b) => a.localeCompare(b, undefined, { numeric: true });
const rows = folders.map((f) => {
  const dir = resolve(f);
  const files = readdirSync(dir).filter((n) => /\.(png|jpe?g|webp|gif)$/i.test(n)).sort(natural);
  return { name: basename(dir), files: files.map((n) => ({ n, url: pathToFileURL(join(dir, n)).href })) };
});
const cols = Math.max(...rows.map((r) => r.files.length), 1);
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
body{margin:0;padding:16px;background:#d9e1ea;font:13px -apple-system,system-ui,sans-serif;color:#13263a;width:max-content}
h2{font-size:14px;margin:14px 0 8px}.row{display:flex;gap:10px;align-items:flex-start}
figure{margin:0;width:${THUMB}px}img{width:100%;display:block;border-radius:8px;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,.15)}
figcaption{margin-top:4px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
</style></head><body>${rows
  .map((r) => `<h2>${esc(r.name)} · ${r.files.length}</h2><div class="row">${r.files.map((f) => `<figure><img src="${f.url}"><figcaption>${esc(f.n)}</figcaption></figure>`).join('')}</div>`)
  .join('')}</body></html>`;

const work = mkdtempSync(join(tmpdir(), 'contact-sheet-'));
const page = join(work, 'sheet.html');
writeFileSync(page, html);
// Height: tallest plausible thumbnail (9:16) per row + labels.
const width = 32 + cols * (THUMB + 10);
const height = 40 + rows.length * (Math.round(THUMB * 16 / 9) + 60);
execFileSync(chrome, [
  '--headless=new', '--disable-gpu', '--hide-scrollbars', '--allow-file-access-from-files',
  `--user-data-dir=${join(work, 'profile')}`, '--virtual-time-budget=5000',
  `--window-size=${width},${height}`, `--screenshot=${resolve(out)}`, pathToFileURL(page).href,
], { stdio: 'ignore' });
console.log(`${resolve(out)} (${rows.reduce((s, r) => s + r.files.length, 0)} images, ${rows.length} row(s))`);
