// Post-build: emit per-route static HTML with the correct
// <link rel="canonical"> and <meta property="og:url"> so non-JS
// crawlers (Semrush, Bing, social previewers) see each sitemap URL
// as canonical to itself, not to the homepage.
//
// Reads routes from public/sitemap.xml (covers every page in the
// sitemap) plus the curated PRERENDER_ROUTES list as a fallback.
// Copies dist/index.html into dist/<route>/index.html with the head
// rewritten. Skips routes whose index.html already exists (so the
// puppeteer prerender `build:prerender` path keeps working).

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { resolve, join, dirname } from "node:path";
import { PRERENDER_ROUTES } from "./prerender-routes.mjs";

const BASE = "https://livingwitharthritis.org.uk";
const DIST = resolve("dist");
const SRC = join(DIST, "index.html");

if (!existsSync(SRC)) {
  console.warn("[inject-canonicals] dist/index.html missing — skipping");
  process.exit(0);
}

const template = readFileSync(SRC, "utf8");

function collectRoutes() {
  const set = new Set(PRERENDER_ROUTES);
  const sitemapPath = resolve("public/sitemap.xml");
  if (existsSync(sitemapPath)) {
    const xml = readFileSync(sitemapPath, "utf8");
    for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      const u = m[1].trim();
      const path = u.replace(/^https?:\/\/[^/]+/, "") || "/";
      set.add(path);
    }
  }
  set.delete("/");
  return [...set].filter((p) => p.startsWith("/") && !p.includes("*"));
}

function rewriteHead(html, route) {
  const url = `${BASE}${route}`;
  // Replace homepage og:url with route-specific og:url.
  let out = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:url" content="${url}" />`,
  );
  // Replace homepage canonical with route-specific canonical.
  if (/<link\s+rel="canonical"[^>]*>/i.test(out)) {
    out = out.replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
      `<link rel="canonical" href="${url}" />`,
    );
  } else {
    out = out.replace(/<\/head>/i, `  <link rel="canonical" href="${url}" />\n</head>`);
  }
  // Also update twitter:url if present.
  out = out.replace(
    /<meta\s+name="twitter:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:url" content="${url}" />`,
  );
  return out;
}

const routes = collectRoutes();
let written = 0;
let skipped = 0;

for (const route of routes) {
  const dir = join(DIST, route.replace(/^\//, ""));
  const file = join(dir, "index.html");
  if (existsSync(file)) {
    skipped++;
    continue;
  }
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, rewriteHead(template, route));
  written++;
}

console.log(
  `[inject-canonicals] wrote ${written} per-route HTML files (skipped ${skipped} existing)`,
);
