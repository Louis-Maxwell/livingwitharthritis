import { mkdir, writeFile } from 'node:fs/promises';
import { resolve, dirname, sep } from 'node:path';
import { preview } from 'vite';
import puppeteer from 'puppeteer';

/** Render the completed Vite build without the legacy plugin's merge dependency. */
export default function prerender({ routes, rendererOptions = {} }) {
  let config;
  return {
    name: 'lwa-prerender',
    apply: 'build',
    configResolved(resolved) { config = resolved; },
    async writeBundle() {
      const output = resolve(config.root, config.build.outDir);
      // Port 0 selects an available local port; configuration loading is disabled
      // so this preview cannot recursively instantiate the build's plugins.
      const server = await preview({
        configFile: false,
        root: config.root,
        logLevel: 'error',
        build: { outDir: output },
        preview: { host: '127.0.0.1', port: 0, open: false },
      });
      let browser;
      try {
        browser = await puppeteer.launch({
          headless: true,
          ...rendererOptions.launchOptions,
        });
        const address = server.httpServer.address();
        const origin = `http://127.0.0.1:${address.port}`;
        const queue = [...new Set(routes)];
        const snapshots = [];
        let failed = false;
        // Collect all snapshots before writing any, so later routes always load
        // the same SPA entry instead of a previously rendered route's HTML.
        async function worker() {
          while (queue.length && !failed) {
            const route = queue.shift();
            const file = resolve(output, `.${route}`, 'index.html');
            if (!route.startsWith('/') || !file.startsWith(`${output}${sep}`)) {
              throw new Error(`[prerender] Invalid route: ${route}`);
            }
            const page = await browser.newPage();
            try {
              page.setDefaultTimeout(rendererOptions.timeout ?? 30000);
              await page.setRequestInterception(true);
              page.on('request', request => {
                // Build-time rendering must not send analytics or depend on
                // third-party services. All application assets are local.
                const url = request.url();
                if (url.startsWith(`${origin}/`) || /^(data:|blob:)/.test(url)) {
                  void request.continue();
                } else {
                  void request.abort();
                }
              });
              await page.evaluateOnNewDocument(eventName => {
                window.__PRERENDER_INJECTED__ = { prerender: true };
                document.addEventListener(eventName, () => {
                  window.__LWA_PRERENDER_READY__ = true;
                });
              }, rendererOptions.renderAfterDocumentEvent ?? 'prerender-ready');
              const response = await page.goto(`${origin}${route}`, { waitUntil: 'domcontentloaded' });
              if (!response?.ok()) throw new Error(`HTTP ${response?.status()}`);
              await page.waitForFunction(() => window.__LWA_PRERENDER_READY__ === true);
              // Allow Helmet and requestAnimationFrame callbacks to flush.
              await page.evaluate(() => new Promise(resolve => {
                requestAnimationFrame(() => requestAnimationFrame(resolve));
              }));
              const actual = new URL(page.url()).pathname.replace(/\/$/, '') || '/';
              if (actual !== (route.replace(/\/$/, '') || '/')) {
                throw new Error(`Redirected to ${actual}; exclude redirect sources from prerender routes`);
              }
              snapshots.push({ file, html: await page.content() });
            } catch (cause) {
              failed = true;
              throw new Error(`[prerender] Failed ${route}: ${cause.message}`, { cause });
            } finally {
              await page.close();
            }
          }
        }
        const workers = Array.from(
          { length: rendererOptions.maxConcurrentRoutes ?? 2 }, worker,
        );
        const results = await Promise.allSettled(workers);
        const failure = results.find(result => result.status === 'rejected');
        if (failure) throw failure.reason;
        for (const { file, html } of snapshots) {
          await mkdir(dirname(file), { recursive: true });
          await writeFile(file, html);
        }
        config.logger.info(`[prerender] Wrote ${snapshots.length} route snapshots`);
      } finally {
        if (browser) await browser.close();
        await new Promise((resolve, reject) => {
          server.httpServer.close(error => error ? reject(error) : resolve());
          server.httpServer.closeAllConnections();
        });
      }
    },
  };
}
