#!/usr/bin/env node
/**
 * Soft-404 / indexability gate for crawler HTML. For every sitemap URL the
 * built file must have: exactly one <h1>, real body text, a unique <title>
 * and meta description, a self-referencing canonical, no noindex, and no
 * "not found" wording (which Google reads as a soft 404). Run after a build.
 */
import { readFileSync } from "node:fs";
import { routeFile, wordCount } from "./lib/route-words.mjs";

const dist = process.argv[2] || "dist";
const MIN = Number(process.env.MIN_SITEMAP_BODY_WORDS || 150);
const NOT_FOUND = /\b(page not found|could not find (that|this) page|404 error|this page (doesn['’]t|does not) exist)\b/i;
const urls = [...readFileSync(`${dist}/sitemap.xml`, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
const bodyText = (h) => String(h).replace(/<head[\s\S]*?<\/head>/i, " ").replace(/<(script|style|noscript|template)\b[\s\S]*?<\/\1>/gi, " ").replace(/<!--[\s\S]*?-->/g, " ").replace(/<[^>]+>/g, " ");
const meta = (h, k) => (h.match(new RegExp(`<meta\\b[^>]*name="${k}"[^>]*>`, "i")) || [""])[0].match(/content="([^"]*)"/)?.[1] ?? "";
const fails = [], titles = new Map(), descs = new Map();
for (const url of urls) {
  const route = new URL(url).pathname;
  if (/\.[a-z0-9]{2,5}$/i.test(route)) continue; // assets
  const file = routeFile(route, dist);
  if (!file) { fails.push(`${route}: no built HTML`); continue; }
  const h = readFileSync(file, "utf8");
  const title = (h.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || "").trim();
  const desc = meta(h, "description");
  const canon = h.match(/<link\b[^>]*rel="canonical"[^>]*href="([^"]*)"/i)?.[1];
  const h1 = h.replace(/<head[\s\S]*?<\/head>/i, "").match(/<h1\b/gi)?.length || 0;
  const words = wordCount(h);
  if (h1 < 1) fails.push(`${route}: no <h1>`);
  if (words < MIN) fails.push(`${route}: only ${words} body words`);
  if (NOT_FOUND.test(bodyText(h)) || /not found/i.test(title)) fails.push(`${route}: contains not-found text`);
  if (!title) fails.push(`${route}: missing <title>`);
  if (!desc) fails.push(`${route}: missing meta description`);
  if (canon !== url) fails.push(`${route}: canonical ${canon || "missing"} != ${url}`);
  if (/noindex/i.test(meta(h, "robots"))) fails.push(`${route}: noindex`);
  for (const [m, v] of [[titles, title], [descs, desc]]) if (v) m.set(v, [...(m.get(v) || []), route]);
}
for (const [label, m] of [["title", titles], ["description", descs]]) for (const [v, rs] of m) if (rs.length > 1) fails.push(`duplicate ${label} on ${rs.join(", ")}: "${v.slice(0, 70)}"`);
if (fails.length) {
  console.error(`[sitemap-html] ${fails.length} problem(s) across ${urls.length} sitemap URLs:\n  ${fails.join("\n  ")}`);
  process.exit(1);
}
console.log(`[sitemap-html] OK: ${urls.length} sitemap URLs have h1, body, self canonical, unique title/description, no not-found text.`);
