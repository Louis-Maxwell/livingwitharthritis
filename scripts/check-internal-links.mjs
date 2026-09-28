#!/usr/bin/env node
/**
 * Internal link checker (fails CI on broken internal links).
 *
 * Collects every internal link the site can emit:
 *   - href attributes in every built HTML file under dist/ (prerendered pages,
 *     the index.html no-JS fallback, redirect stubs, 404 page)
 *   - <loc> entries in dist/sitemap*.xml
 *   - literal links in the React source (to="/x", href="/x", to: "/x", ...)
 *   - markdown/HTML links inside the blog guide JSON files
 *
 * A path is valid when one of these holds:
 *   1. dist/ has a file for it (path, path.html or path/index.html)
 *   2. it is a redirect source (seo-redirect-map, dist/_redirects)
 *   3. it matches a <Route path> in src/App.tsx (the "*" catch-all excluded);
 *      /blog/:slug is only valid for guides that exist
 *
 * Usage: node scripts/check-internal-links.mjs [--dist dist]
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import {
  SITE,
  EXACT_SEO_REDIRECTS,
  BLOG_SLUG_REDIRECTS,
  CITY_HUB_ALIASES,
} from "./seo-redirect-map.mjs";

const ROOT = resolve(import.meta.dirname, "..");
const distArg = process.argv.indexOf("--dist");
const DIST = resolve(ROOT, distArg > -1 ? process.argv[distArg + 1] : "dist");

if (!existsSync(join(DIST, "index.html"))) {
  console.error(`check-internal-links: ${DIST}/index.html not found. Run the build first.`);
  process.exit(1);
}

function walk(dir, filter, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name.startsWith(".")) continue;
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, filter, out);
    else if (filter(full)) out.push(full);
  }
  return out;
}

/** Normalise a raw href to a site path, or null when it is not an internal page link. */
function toInternalPath(raw) {
  let href = raw.trim().replace(/&amp;/g, "&");
  if (!href) return null;
  if (href.startsWith(SITE)) href = href.slice(SITE.length) || "/";
  else if (href.startsWith("//") || /^[a-z][a-z0-9+.-]*:/i.test(href)) return null;
  if (!href.startsWith("/")) return null;
  if (href.includes("${") || href.includes("{{")) return null;
  href = href.split("#")[0].split("?")[0];
  if (!href) return null;
  try {
    href = decodeURIComponent(href);
  } catch {
    return href;
  }
  if (href.length > 1 && href.endsWith("/")) href = href.slice(0, -1);
  return href;
}

// ---------------------------------------------------------------- valid paths
const appSource = readFileSync(join(ROOT, "src/App.tsx"), "utf8");
const routePatterns = [...appSource.matchAll(/<Route\s+path="([^"]+)"/g)]
  .map((m) => m[1])
  .filter((p) => p !== "*");

const blogSlugs = new Set(
  JSON.parse(readFileSync(join(ROOT, "src/data/blog-slugs.generated.json"), "utf8")),
);

const routeMatchers = routePatterns.map((pattern) => {
  const source = pattern
    .split("/")
    .map((seg) => (seg.startsWith(":") ? "([^/]+)" : seg.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")))
    .join("/");
  return { pattern, re: new RegExp(`^${source}$`) };
});

const redirectSources = new Set();
for (const from of Object.keys(EXACT_SEO_REDIRECTS)) redirectSources.add(toInternalPath(from));
for (const from of Object.keys(CITY_HUB_ALIASES)) redirectSources.add(toInternalPath(from));
for (const slug of Object.keys(BLOG_SLUG_REDIRECTS)) {
  redirectSources.add(slug.startsWith("/") ? toInternalPath(slug) : `/blog/${slug}`);
}
const redirectsFile = join(DIST, "_redirects");
if (existsSync(redirectsFile)) {
  for (const line of readFileSync(redirectsFile, "utf8").split("\n")) {
    const [from] = line.trim().split(/\s+/);
    if (from && from.startsWith("/") && !from.includes("*")) redirectSources.add(toInternalPath(from));
  }
}

function isValid(path) {
  if (path === "/") return true;
  const rel = path.slice(1);
  if (existsSync(join(DIST, rel)) && statSync(join(DIST, rel)).isFile()) return true;
  if (existsSync(join(DIST, `${rel}.html`))) return true;
  if (existsSync(join(DIST, rel, "index.html"))) return true;
  if (redirectSources.has(path)) return true;
  for (const { pattern, re } of routeMatchers) {
    const m = path.match(re);
    if (!m) continue;
    if (pattern === "/blog/:slug") {
      if (blogSlugs.has(m[1])) return true;
      continue;
    }
    return true;
  }
  return false;
}

// -------------------------------------------------------------- collect links
/** @type {Map<string, Set<string>>} path -> sources */
const links = new Map();
function add(raw, source) {
  const path = toInternalPath(raw);
  if (!path) return;
  if (!links.has(path)) links.set(path, new Set());
  links.get(path).add(source);
}

for (const file of walk(DIST, (f) => f.endsWith(".html"))) {
  const html = readFileSync(file, "utf8");
  const source = `dist/${relative(DIST, file)}`;
  for (const m of html.matchAll(/<a\b[^>]*?\shref\s*=\s*"([^"]*)"/gi)) add(m[1], source);
}

for (const file of walk(DIST, (f) => /\/sitemap[^/]*\.xml$/.test(f))) {
  const xml = readFileSync(file, "utf8");
  for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) add(m[1], `dist/${relative(DIST, file)}`);
}

const SOURCE_LINK_RE =
  /\b(?:to|href|link|path|url|ctaHref|ctaLink)\s*[=:]\s*\{?\s*["'`](\/[^"'`\s]*)["'`]/g;
for (const file of walk(join(ROOT, "src"), (f) => /\.(tsx?|jsx?)$/.test(f) && !/__tests__|\.test\.|\.spec\./.test(f))) {
  const text = readFileSync(file, "utf8");
  const source = relative(ROOT, file);
  for (const m of text.matchAll(SOURCE_LINK_RE)) {
    const value = m[1];
    // Skip asset references (images, icons, audio) and API endpoints.
    if (/\.(png|jpe?g|webp|avif|svg|gif|ico|mp3|mp4|webm|pdf|json|xml|txt|woff2?)$/i.test(value)) continue;
    if (value.startsWith("/api/") || value.startsWith("/assets/")) continue;
    // Route patterns (e.g. <Route path="/blog/:slug">) are not links.
    if (value.includes("/:")) continue;
    add(value, source);
  }
}

const CONTENT_LINK_RE = /(?:\]\(|href=\\?")(\/[^"\\)\s]*)/g;
for (const dir of ["src/content"]) {
  const abs = join(ROOT, dir);
  if (!existsSync(abs)) continue;
  for (const file of walk(abs, (f) => /\.(json|md|mdx)$/.test(f) && !f.endsWith("catalog.generated.json"))) {
    const text = readFileSync(file, "utf8");
    for (const m of text.matchAll(CONTENT_LINK_RE)) add(m[1], relative(ROOT, file));
  }
}

// --------------------------------------------------------------------- report
const broken = [...links.entries()].filter(([path]) => !isValid(path)).sort(([a], [b]) => a.localeCompare(b));

console.log(
  `check-internal-links: ${links.size} unique internal paths, ${routePatterns.length} routes, ${redirectSources.size} redirect sources.`,
);
if (broken.length) {
  console.error(`\n${broken.length} broken internal link(s):`);
  for (const [path, sources] of broken) {
    const list = [...sources];
    console.error(`  ${path}\n      linked from: ${list.slice(0, 5).join(", ")}${list.length > 5 ? ` (+${list.length - 5} more)` : ""}`);
  }
  process.exit(1);
}
console.log("check-internal-links: no broken internal links.");
