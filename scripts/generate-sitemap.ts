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
//
// Also excluded: ALIAS routes whose canonical <link> points to a different
// canonical URL. Including these triggers Semrush "incorrect pages in
// sitemap" (canonical mismatch). Alias route → canonical page:
//   /conditions/elbow-pain              → /conditions/elbow-arthritis
//   /conditions/axial-spondyloarthritis → /conditions/ankylosing-spondylitis
const STATIC_EXCLUDE = new Set([
  "*",
  "/auth",
  "/admin",
  "/admin/appointments",
  "/admin/psi",
  "/admin/emails",
  "/admin/seo-health",
  "/admin/distribute",
  "/admin/rank-tracker",
  "/admin/content-refresh",
  "/donation-result",
  "/unsubscribe",
  "/newsletter/confirm",
  "/sitemap",
  "/site-index",
  "/buddy/match",
  // Alias / non-canonical routes (canonical points elsewhere)
  "/conditions/elbow-pain",
  "/conditions/axial-spondyloarthritis",
]);

// Prefix-based exclusions for entire route trees that must never appear in
// the sitemap. These are protected, admin-only, or internal redirect/utility
// routes — indexing them would surface auth walls or empty pages to Google
// and trigger Lovable's "sitemap needs attention" warning.
//   /admin*    — admin dashboards (role-gated)
//   /debug*    — internal debug tools
//   /auth      — login/signup flow
//   /dashboard — authenticated user area
//   /checkout  — Stripe redirect target
//   /callback  — OAuth callback handlers
const EXCLUDE_PREFIXES = ["/admin", "/debug", "/auth", "/dashboard", "/checkout", "/callback"];

function parseStaticRoutes(): string[] {
  const src = read("src/App.tsx");
  const re = /<Route\s+path="([^"]+)"/g;
  const paths = new Set<string>();
  let m: RegExpExecArray | null;
  while ((m = re.exec(src)) !== null) {
    const p = m[1];
    if (p.includes(":")) continue;
    if (EXCLUDE_PREFIXES.some((pre) => p === pre || p.startsWith(pre + "/"))) continue;
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

  // Programmatic SEO: joint × condition exercise pages.
  // Mirrors src/data/exerciseConditionRecommendations.ts (6 joints × 13 conditions = 78).
  const ECR_JOINTS = ["knee", "hip", "shoulder", "hand", "back", "ankle"];
  const ECR_CONDITIONS = [
    "osteoarthritis", "rheumatoid-arthritis", "psoriatic-arthritis", "gout",
    "ankylosing-spondylitis", "juvenile-arthritis", "fibromyalgia", "lupus",
    "knee-arthritis", "hand-arthritis", "shoulder-arthritis",
    "polymyalgia-rheumatica", "reactive-arthritis",
  ];
  for (const j of ECR_JOINTS)
    for (const c of ECR_CONDITIONS)
      entries.push({ path: `/exercises/${j}/for/${c}`, priority: "0.7", changefreq: "monthly" });

  // Programmatic SEO: condition sub-pages.
  // Mirrors src/data/conditionSubpages.ts (13 conditions × 4 sub-pages = 52).
  const SUBPAGES = ["symptoms", "treatment", "exercises", "diet"];
  for (const c of ECR_CONDITIONS)
    for (const s of SUBPAGES)
      entries.push({ path: `/conditions/${c}/${s}`, priority: "0.8", changefreq: "monthly" });

  // Programmatic SEO: UK city × service pages.
  // Mirrors src/data/city-services.ts (26 cities × 4 services = 104).
  const CS_CITIES = [
    "london", "birmingham", "manchester", "leeds", "glasgow",
    "liverpool", "edinburgh", "bristol", "sheffield", "newcastle",
    "cardiff", "nottingham", "leicester", "coventry", "belfast",
    "brighton", "plymouth", "stoke-on-trent", "wolverhampton", "southampton",
    "derby", "swansea", "aberdeen", "oxford", "cambridge", "exeter",
  ];
  const CS_SERVICES = ["physiotherapy", "support-groups", "diet-support", "waiting-list-help"];
  for (const city of CS_CITIES)
    for (const svc of CS_SERVICES)
      entries.push({ path: `/uk/${city}/${svc}`, priority: "0.6", changefreq: "monthly" });

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
