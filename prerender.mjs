// Prerender the built SPA into static HTML so crawlers and link-preview bots
// (Yandex, Telegram, VK, WhatsApp) receive fully rendered markup.
// Uses Playwright (already a devDependency). No extra runtime deps.
import { createServer } from 'node:http';
import { readFile, writeFile } from 'node:fs/promises';
import { join, extname, resolve } from 'node:path';
import { chromium } from 'playwright';

const DIST = resolve(process.cwd(), 'dist');
const PORT = 4178;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

const server = createServer(async (req, res) => {
  try {
    const url = decodeURIComponent((req.url || '/').split('?')[0]);
    let filePath = join(DIST, url === '/' ? 'index.html' : url);
    let body;
    try {
      body = await readFile(filePath);
    } catch {
      // SPA fallback
      filePath = join(DIST, 'index.html');
      body = await readFile(filePath);
    }
    res.writeHead(200, { 'Content-Type': MIME[extname(filePath)] || 'application/octet-stream' });
    res.end(body);
  } catch (err) {
    res.writeHead(500);
    res.end(String(err));
  }
});

await new Promise((r) => server.listen(PORT, r));

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle' });
// Wait until React has populated the root element.
await page.waitForFunction(() => {
  const root = document.getElementById('root');
  return root && root.children.length > 0;
}, { timeout: 30000 });

const html = await page.content();
await browser.close();
await new Promise((r) => server.close(r));

const out = join(DIST, 'index.html');
await writeFile(out, '<!doctype html>\n' + html, 'utf8');
console.log('Prerendered', out, `(${html.length} bytes)`);
