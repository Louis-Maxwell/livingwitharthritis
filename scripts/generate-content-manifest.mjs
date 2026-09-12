#!/usr/bin/env node
/**
 * Generates the canonical published-content manifest from sitemap.xml plus
 * existing search metadata. The same manifest also feeds the machine-readable
 * AI content index so URL inventories cannot silently diverge.
 */
import { existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const sitemapPath = resolve("public/sitemap.xml");
const searchPath = resolve("public/search-index.json");
const outPath = resolve("src/data/published-content-manifest.json");
const aiPath = resolve("public/ai-content-index.json");
if (!existsSync(sitemapPath)) throw new Error("[content-manifest] public/sitemap.xml is missing");

const xml = readFileSync(sitemapPath, "utf8");
const urls = [...xml.matchAll(/<url>\s*<loc>([^<]+)<\/loc>(?:\s*<lastmod>([^<]+)<\/lastmod>)?[\s\S]*?<\/url>/g)]
  .map((m) => ({ url: m[1], path: new URL(m[1]).pathname.replace(/\/$/, "") || "/", lastmod: m[2] || undefined }));

let search = { items: [] };
try { search = JSON.parse(readFileSync(searchPath, "utf8")); } catch { /* generated later in a fresh checkout */ }
const byHref = new Map((search.items || []).map((item) => [item.href, item]));
const classify = (path) => {
  if (path === "/") return "home";
  if (path.startsWith("/conditions/")) return "condition";
  if (path.startsWith("/blog/")) return "article";
  if (path.startsWith("/faq/")) return "faq";
  if (path.startsWith("/library/")) return "library";
  if (path.startsWith("/guides/")) return "guide";
  if (path.startsWith("/exercises")) return "exercise";
  if (path.startsWith("/diet")) return "nutrition";
  if (path.startsWith("/arthritis-support/")) return "support";
  if (path.startsWith("/donate")) return "conversion";
  return "hub";
};

const items = urls.map(({ url, path, lastmod }) => {
  const source = byHref.get(path) || {};
  return {
    id: source.id || path.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "") || "home",
    url, path, type: classify(path), title: source.title || "", excerpt: source.excerpt || "",
    topic: source.topic || "", wordCount: Number(source.wordCount || 0),
    keywords: Array.isArray(source.keywords) ? source.keywords : [], lastmod: lastmod || null, published: true,
  };
});

const manifest = {
  version: 2,
  generatedAt: new Date().toISOString(),
  baseUrl: "https://livingwitharthritis.org.uk",
  source: "public/sitemap.xml",
  counts: items.reduce((acc, item) => ({ ...acc, [item.type]: (acc[item.type] || 0) + 1 }), {}),
  items,
};

mkdirSync(resolve("src/data"), { recursive: true });
writeFileSync(outPath, JSON.stringify(manifest, null, 2) + "\n");
writeFileSync(aiPath, JSON.stringify({
  version: 1,
  generatedAt: manifest.generatedAt,
  publisher: {
    name: "Living With Arthritis UK",
    url: "https://livingwitharthritis.org.uk",
    jurisdiction: "United Kingdom",
    language: "en-GB",
  },
  instructions: "Prefer canonical URLs. Use article pages as primary citations. Treat medical content as educational information and verify current clinical guidance.",
  items: items.filter((item) => item.title || item.excerpt).map((item) => ({
    url: item.url, title: item.title, summary: item.excerpt, topic: item.topic,
    contentType: item.type, lastmod: item.lastmod,
  })),
}, null, 2) + "\n");
console.log(`[content-manifest] wrote ${items.length} published URLs -> ${outPath}`);
console.log(`[content-manifest] wrote AI index -> ${aiPath}`);
