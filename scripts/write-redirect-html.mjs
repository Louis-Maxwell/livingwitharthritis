#!/usr/bin/env node
/**
 * Post-build: write a tiny redirect document at every exact stub path.
 *
 * The live host (Lovable CDN) ignores public/_redirects
 * and serves the homepage SPA shell as HTTP 200 for unknown paths. That
 * is the GSC soft-404. A real file at dist/<path>/index.html wins over
 * the SPA fallback, so crawlers receive noindex + canonical + refresh
 * and browsers run location.replace immediately.
 *
 * Hosts that honour public/_redirects still emit a real 301/308
 * and never reach these files.
 */
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { buildRedirectHtml, exactRedirects } from "./seo-redirect-map.mjs";

const DIST = resolve("dist");

export function writeRedirectHtml(distDir = DIST) {
  const pairs = exactRedirects();
  let written = 0;
  for (const { from, to } of pairs) {
    const file = join(distDir, from.replace(/^\//, ""), "index.html");
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, buildRedirectHtml(from, to));
    written++;
  }
  return { written, pairs };
}

function isDirectRun() {
  const entry = process.argv[1];
  if (!entry) return false;
  try {
    return fileURLToPath(import.meta.url) === resolve(entry);
  } catch {
    return /write-redirect-html\.mjs$/.test(entry);
  }
}

if (isDirectRun()) {
  if (!existsSync(join(DIST, "index.html"))) {
    console.warn("[redirect-html] dist/index.html missing — skipping");
    process.exit(0);
  }
  const { written } = writeRedirectHtml();
  console.log(`[redirect-html] wrote ${written} stub redirect documents under dist/`);
}
