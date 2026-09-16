#!/usr/bin/env node
/**
 * Post-build: write a unique noindex document at each real city hub
 * (`/arthritis-support/{slug}`) so Lovable's SPA fallback cannot serve
 * the homepage title/OG on those URLs.
 *
 * Thin doorway pages stay noindex (not in sitemap). Unknown cities are
 * not written — generate-404.mjs / host 404 owns junk slugs.
 */
import { mkdirSync, writeFileSync, existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { CITY_HUBS, SITE } from "./seo-redirect-map.mjs";

const DIST = resolve("dist");

const DISCLAIMER =
  "Educational information for people in the UK living with arthritis — not a diagnosis or personal medical advice. Check medicines and exercises with your GP, pharmacist or rheumatology team.";

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function assetTagsFromIndex(indexHtml) {
  return [
    ...indexHtml.matchAll(/<link[^>]+rel=["']stylesheet["'][^>]*>/gi),
    ...indexHtml.matchAll(/<link[^>]+rel=["']modulepreload["'][^>]*>/gi),
    ...indexHtml.matchAll(/<script[^>]+type=["']module["'][^>]*><\/script>/gi),
  ]
    .map((m) => `    ${m[0]}`)
    .join("\n");
}

export function buildCityHubHtml(city, assetTags = "") {
  const title = `Arthritis Support in ${city.name} | Living With Arthritis UK`;
  const description = city.description;
  const path = `/arthritis-support/${city.slug}`;
  const abs = `${SITE}${path}`;
  return `<!DOCTYPE html>
<html lang="en-GB">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="robots" content="noindex, follow" />
    <link rel="canonical" href="${abs}" />
    <meta property="og:title" content="${escapeHtml(`Arthritis Support in ${city.name}`)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${abs}" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${escapeHtml(`Arthritis Support in ${city.name}`)}" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
${assetTags}
  
  </head>
  <body>
    <a href="#main-content">Skip to main content
    <div id="root">
      <main id="main-content" role="main" tabindex="-1" style="max-width:42rem;margin:0 auto;padding:4rem 1.5rem;font-family:Inter,system-ui,sans-serif;">
        <h1>Arthritis Support in ${escapeHtml(city.name)}</h1>
        <p>${escapeHtml(description)}</p>
        <p role="note">${escapeHtml(DISCLAIMER)} <a href="/disclaimer">Full medical disclaimer</a>.</p>
        <p><a href="/arthritis-support">All city support hubs</a> · <a href="/conditions/osteoarthritis">Osteoarthritis guide</a> · <a href="/exercises">Exercise hub</a></p>
      </main>
    </div>
  </body>
</html>
`;
}

export function writeCityHubHtml(distDir = DIST) {
  const indexPath = join(distDir, "index.html");
  const assetTags = existsSync(indexPath)
    ? assetTagsFromIndex(readFileSync(indexPath, "utf8"))
    : "";
  let written = 0;
  for (const city of CITY_HUBS) {
    const file = join(distDir, "arthritis-support", city.slug, "index.html");
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, buildCityHubHtml(city, assetTags));
    written++;
  }
  return { written };
}

function isDirectRun() {
  const entry = process.argv[1];
  if (!entry) return false;
  try {
    return fileURLToPath(import.meta.url) === resolve(entry);
  } catch {
    return /write-city-hub-html\.mjs$/.test(entry);
  }
}

if (isDirectRun()) {
  if (!existsSync(join(DIST, "index.html"))) {
    console.warn("[city-hub-html] dist/index.html missing — skipping");
    process.exit(0);
  }
  const { written } = writeCityHubHtml();
  console.log(`[city-hub-html] wrote ${written} unique noindex city hub documents under dist/`);
}
