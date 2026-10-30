import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { build } from 'vite';
import puppeteer from 'puppeteer';
import prerender from '../vite-prerender.mjs';

test('Chromium snapshots each route and preserves intentional noindex', async () => {
  const root = await mkdtemp(join(tmpdir(), 'lwa-render-'));
  try {
    await writeFile(join(root, 'index.html'), `<!doctype html><html><head><title>Shell</title></head><body>
      <script type="module" src="/app.js"></script></body></html>`);
    await writeFile(join(root, 'app.js'), `
      async function render() {
      const route = location.pathname;
      if (route === '/') await fetch('/guide');
      document.title = 'Guide ' + route;
      const heading = document.createElement('h1');
      heading.textContent = 'Answer for ' + route;
      document.body.append(heading);
      if (route === '/utility') {
        const robots = document.createElement('meta');
        robots.name = 'robots'; robots.content = 'noindex,follow'; document.head.append(robots);
      }
      document.dispatchEvent(new Event('prerender-ready'));
      }
      void render();
    `);
    await build({
      configFile: false, root, logLevel: 'silent',
      plugins: [prerender({
        routes: ['/', '/guide', '/utility'],
        rendererOptions: {
          timeout: 5000,
          maxConcurrentRoutes: 1,
          launchOptions: {
            executablePath: await puppeteer.executablePath(),
            args: ['--no-sandbox', '--disable-background-timer-throttling', '--disable-renderer-backgrounding'],
          },
        },
      })],
    });
    for (const route of ['', 'guide', 'utility']) {
      const html = await readFile(join(root, 'dist', route, 'index.html'), 'utf8');
      assert.ok(html.includes(`<title>Guide /${route}</title>`));
      assert.ok(html.includes(`<h1>Answer for /${route}</h1>`));
      assert.ok(html.includes(`data-lwa-prerender-route="/${route}"`));
      if (route === 'utility') assert.ok(html.includes('content="noindex,follow"'));
    }
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
