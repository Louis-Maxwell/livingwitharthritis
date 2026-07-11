#!/usr/bin/env node
/**
 * generate-sitemap.mjs
 *
 * HONEST NOTE ON SCOPE: this is a newly-written, standalone generator. I
 * did not have the contents of your existing sitemap generator (if one
 * exists in the live repo — prior session notes mention a 946-entry
 * public/sitemap.xml, but I never actually read that file's content or
 * the script that produces it). Rather than guess at its structure and
 * risk silently overwriting logic I've never seen, this script is built
 * fresh from routes I've directly verified in this conversation:
 *   - The 238 routes in scripts/ai-head-data.json
 *   - A handful of confirmed utility routes (/, /pets, /donate, etc.)
 *   - Every target_page referenced by the (now bug-fixed) keyword
 *     datasets — all cross-checked against ai-head-data.json this session
 *     so none of them are the broken references from before
 *
 * Total: 245 confirmed routes.
 *
 * If your live repo's real sitemap has 946 entries, this script's output
 * is a SUBSET, not a replacement — merge, don't overwrite. Diff the two
 * before committing. I don't have visibility into what the other ~700
 * entries are (likely blog posts, additional glossary/comparison pages,
 * or other content built in Lovable sessions I wasn't part of).
 *
 * Usage: node scripts/generate-sitemap.mjs
 * Outputs: public/sitemap-generated.xml (deliberately NOT sitemap.xml,
 * so it never silently overwrites your existing file — rename manually
 * once you've confirmed it's safe to merge/replace).
 */

import { writeFileSync, readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SITE_URL = "https://livingwitharthritis.org.uk";
const TODAY = new Date().toISOString().split("T")[0];

// Load the confirmed route set (see header note on provenance)
const aiHeadData = JSON.parse(readFileSync(join(ROOT, "scripts/ai-head-data.json"), "utf-8"));
const routes = new Set(Object.keys(aiHeadData));

const utilityRoutes = [
  "/", "/pets", "/corporate-partnerships", "/donate", "/get-involved",
  "/privacy", "/terms", "/exercise-hub", "/guides",
];
utilityRoutes.forEach((r) => routes.add(r));

// Pull confirmed target_page values from the keyword dataset (already
// verified against ai-head-data.json in the bug-fix pass this session —
// see BUG-FIX-REPORT-2026-07.md for that verification)
try {
  const kw40 = JSON.parse(readFileSync(join(ROOT, "public/data/keywords-40000.json"), "utf-8"));
  kw40.forEach((r) => {
    if (r.target_page) routes.add(r.target_page);
  });
} catch (e) {
  console.warn("Could not read keywords-40000.json — continuing with ai-head routes only:", e.message);
}

// Priority tiers — homepage and hub pages get higher priority than
// individual glossary/city pages. This is a reasonable SEO convention,
// not a guaranteed-optimal value; adjust if you have data suggesting
// otherwise.
function priorityFor(route) {
  if (route === "/") return "1.0";
  if (["/pets", "/donate", "/get-involved", "/corporate-partnerships", "/exercise-hub", "/guides"].includes(route)) return "0.9";
  if (route.startsWith("/conditions/")) return "0.8";
  if (route.startsWith("/guides/")) return "0.7";
  if (route.startsWith("/city/") || route.startsWith("/support/")) return "0.6";
  if (route.startsWith("/glossary/")) return "0.5";
  return "0.6";
}

function changefreqFor(route) {
  if (route === "/") return "daily";
  if (route.startsWith("/glossary/")) return "monthly";
  return "weekly";
}

const sortedRoutes = Array.from(routes).sort();

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sortedRoutes
  .map(
    (route) => `  <url>
    <loc>${SITE_URL}${route}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${changefreqFor(route)}</changefreq>
    <priority>${priorityFor(route)}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

const outPath = join(ROOT, "public/sitemap-generated.xml");
writeFileSync(outPath, xml, "utf-8");
console.log(`Wrote ${sortedRoutes.length} routes to ${outPath}`);
console.log("This is NOT your live sitemap.xml — diff and merge manually.");
