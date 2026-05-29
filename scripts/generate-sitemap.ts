// Auto-generates public/sitemap.xml.
// Runs via `predev` and `prebuild` hooks. Discovers static routes from
// src/App.tsx and dynamic routes from data files + Supabase.
//
// Run manually:  bun scripts/generate-sitemap.ts

import { writeFileSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const BASE_URL = "https://livingwitharthritis.org.uk";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: string;
}

const today = new Date().toISOString().slice(0, 10);
const read = (p: string) => readFileSync(resolve(p), "utf8");

// ---------- 1. STATIC ROUTES (parsed from App.tsx) ----------
// Keep in sync with Disallow rules in public/robots.txt — search engines
// flag URLs that appear in sitemap.xml but are blocked by robots.txt.
// Intentionally excluded (private / utility — also noindex via SeoHead):
//   /auth, /admin*, /donation-result, /unsubscribe, /newsletter/confirm,
//   /sitemap, /site-index, /debug/*
// /chat (Help & Support) IS public and IS included in the sitemap.
const STATIC_EXCLUDE = new Set([
  "*",
  "/auth",
  "/admin",
  "/admin/appointments",
  "/admin/psi",
  "/admin/emails",
  "/admin/seo-health",
  "/donation-result",
  "/unsubscribe",
  "/newsletter/confirm",
  "/sitemap",
  "/site-index",
  "/buddy/match",
]);

function parseStaticRoutes(): string[] {
  const src = read("src/App.tsx");
  const re = /<Route\s+path="([^"]+)"/g;
  const paths = new Set<string>();
  let m: RegExpExecArray | null;
  while ((m = re.exec(src)) !== null) {
    const p = m[1];
    if (p.includes(":")) continue;
    if (p.startsWith("/admin")) continue;
    if (p.startsWith("/debug")) continue;
    if (STATIC_EXCLUDE.has(p)) continue;
    paths.add(p);
  }
  return [...paths];
}

// ---------- 2. DYNAMIC ROUTES (regex over data files) ----------
function extractAll(re: RegExp, src: string, group = 1): string[] {
  const out: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(src)) !== null) out.push(m[group]);
  return out;
}

function dailyTipSlugs(): string[] {
  const src = read("src/data/dailyTips.ts");
  // first slug field per object
  const re = /\bslug:\s*"([^"]+)"/g;
  return extractAll(re, src);
}

function productIds(): string[] {
  const src = read("src/data/affiliateProducts.ts");
  const re = /^\s*id:\s*"([^"]+)"/gm;
  return extractAll(re, src);
}

function citySlugs(): string[] {
  const src = read("src/data/ukCities.ts");
  const re = /\{\s*slug:\s*"([^"]+)"/g;
  return extractAll(re, src);
}

function regionSlugsFromCities(): string[] {
  const src = read("src/data/ukCities.ts");
  const regions = extractAll(/region:\s*"([^"]+)"/g, src);
  return [...new Set(regions.map((r) => r.toLowerCase().replace(/\s+/g, "-")))];
}

function conditionSlugs(): string[] {
  const src = read("src/data/arthritisConditions.ts");
  const re = /\bslug:\s*"([^"]+)"/g;
  return extractAll(re, src);
}

function exerciseJointSlugs(): string[] {
  const src = read("src/data/exerciseJointMatrix.ts");
  const exMatch = src.match(/const exercises\s*=\s*\[([^\]]+)\]/);
  const jtMatch = src.match(/const joints\s*=\s*\[([^\]]+)\]/);
  if (!exMatch || !jtMatch) return [];
  const list = (s: string) =>
    extractAll(/"([^"]+)"/g, s).filter(Boolean);
  const exercises = list(exMatch[1]);
  const joints = list(jtMatch[1]);
  const slugs: string[] = [];
  for (const e of exercises) for (const j of joints) slugs.push(`${e}-for-${j}`);
  return slugs;
}

// ---------- 3. SUPABASE: blog_articles ----------
async function blogPosts(): Promise<{ slug: string; lastmod?: string; category?: string }[]> {
  const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const key =
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_ANON_KEY;
  if (!url || !key) {
    console.warn("[sitemap] Supabase env missing — skipping blog_articles");
    return [];
  }
  try {
    const res = await fetch(
      `${url}/rest/v1/blog_articles?select=slug,updated_at,category&is_published=eq.true&limit=2000`,
      { headers: { apikey: key, Authorization: `Bearer ${key}` } },
    );
    if (!res.ok) {
      console.warn(`[sitemap] blog fetch ${res.status} — skipping`);
      return [];
    }
    const rows = (await res.json()) as Array<{
      slug: string;
      updated_at?: string;
      category?: string;
    }>;
    return rows
      .filter((r) => r.slug)
      .map((r) => ({
        slug: r.slug,
        lastmod: r.updated_at?.slice(0, 10),
        category: r.category,
      }));
  } catch (e) {
    console.warn("[sitemap] blog fetch failed:", (e as Error).message);
    return [];
  }
}

// ---------- 4. ASSEMBLE ----------
function priorityFor(path: string): { priority: string; changefreq: SitemapEntry["changefreq"] } {
  if (path === "/") return { priority: "1.0", changefreq: "weekly" };
  if (path === "/donate" || path.startsWith("/conditions/")) {
    return { priority: "0.9", changefreq: "monthly" };
  }
  if (path.startsWith("/blog/")) return { priority: "0.7", changefreq: "monthly" };
  if (path.startsWith("/guides/") || path.startsWith("/exercises") || path.startsWith("/diet"))
    return { priority: "0.7", changefreq: "monthly" };
  if (path.startsWith("/arthritis-support/")) return { priority: "0.6", changefreq: "monthly" };
  return { priority: "0.6", changefreq: "monthly" };
}

function build(entries: SitemapEntry[]): string {
  const seen = new Set<string>();
  const unique = entries.filter((e) => {
    if (seen.has(e.path)) return false;
    seen.add(e.path);
    return true;
  });
  const urls = unique.map((e) => {
    const meta = priorityFor(e.path);
    return [
      "  <url>",
      `    <loc>${BASE_URL}${e.path}</loc>`,
      `    <lastmod>${e.lastmod ?? today}</lastmod>`,
      `    <changefreq>${e.changefreq ?? meta.changefreq}</changefreq>`,
      `    <priority>${e.priority ?? meta.priority}</priority>`,
      "  </url>",
    ].join("\n");
  });
  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
    "",
  ].join("\n");
}

async function main() {
  const entries: SitemapEntry[] = [];

  for (const p of parseStaticRoutes()) entries.push({ path: p });

  for (const slug of dailyTipSlugs()) entries.push({ path: `/daily-tips/${slug}` });
  for (const id of productIds()) entries.push({ path: `/product/${id}` });
  for (const c of citySlugs()) entries.push({ path: `/arthritis-support/${c}` });
  for (const r of regionSlugsFromCities()) entries.push({ path: `/regions/${r}` });

  const conds = conditionSlugs();
  for (const c of citySlugs())
    for (const cond of conds) entries.push({ path: `/arthritis-support/${c}/${cond}` });

  for (const s of exerciseJointSlugs()) entries.push({ path: `/exercises/${s}` });

  const posts = await blogPosts();
  const cats = new Set<string>();
  for (const p of posts) {
    entries.push({ path: `/blog/${p.slug}`, lastmod: p.lastmod });
    if (p.category) cats.add(p.category);
  }
  for (const cat of cats) {
    const slug = cat.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    if (slug) entries.push({ path: `/blog/category/${slug}` });
  }

  const xml = build(entries);
  writeFileSync(resolve("public/sitemap.xml"), xml);
  console.log(`[sitemap] wrote ${entries.length} entries -> public/sitemap.xml`);
}

main().catch((e) => {
  console.error("[sitemap] failed:", e);
  process.exit(1);
});
