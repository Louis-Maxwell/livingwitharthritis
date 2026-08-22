// Auto-generates public/sitemap.xml.
// Runs via `predev` and `prebuild` hooks. Discovers static routes from
// src/App.tsx and dynamic routes from data files + Supabase.
//
// Run manually:  bun scripts/generate-sitemap.ts

import { writeFileSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { assertSafeBlogInventory } from "../src/lib/seoBuildSafety";
import { PUBLIC_SUPABASE_DEFAULTS } from "../src/integrations/supabase/publicDefaults";

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

interface BlogPostEntry {
  slug: string;
  lastmod?: string;
  category?: string;
}

interface BlogInventory {
  posts: BlogPostEntry[];
  source: "supabase" | "checked-in-fallback";
}

const read = (p: string) => readFileSync(resolve(p), "utf8");
const BLOG_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

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
  "/donation-result/success",
  "/unsubscribe",
  "/newsletter/confirm",
  "/sitemap",
  "/site-index",
  "/buddy/match",
  // Alias / non-canonical routes (canonical points elsewhere)
  "/conditions/elbow-pain",
  "/conditions/axial-spondyloarthritis",
  "/conditions/calcific-tendinitis",
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
const EXCLUDE_PREFIXES = ["/admin", "/debug", "/auth", "/dashboard", "/checkout", "/callback", "/.lovable"];

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

// Only these four regional hubs exist as real pages (src/pages/regions/RegionHub.tsx).
// Deriving slugs from city `region` labels previously emitted redirecting URLs
// such as /regions/greater-manchester into the sitemap.
function regionSlugs(): string[] {
  return ["north-west", "midlands", "scotland", "wales"];
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
  // Route slugs are `<exercise>-for-<joint>-arthritis` (see exerciseJointMatrix.ts).
  // Emitting the shorter `<exercise>-for-<joint>` form put 48 URLs in the sitemap
  // that resolve to /404 — Google reported them as soft 404s.
  for (const e of exercises) for (const j of joints) slugs.push(`${e}-for-${j}-arthritis`);
  return slugs;
}

// ---------- 3. SUPABASE: blog_articles ----------
function blogRedirectSlugs(): Set<string> {
  const redirectSrc = read("src/data/blogRedirects.ts");
  return new Set(
    [...redirectSrc.matchAll(/"([^"]+)"\s*:\s*"[^"]+"/g)].map((m) => m[1]),
  );
}

function previousBlogLastmods(): Map<string, string> {
  const lastmods = new Map<string, string>();
  try {
    const xml = read("public/sitemap.xml");
    for (const match of xml.matchAll(/<url>\s*<loc>[^<]+\/blog\/([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>[\s\S]*?<\/url>/g)) {
      if (!match[1].startsWith("category/")) lastmods.set(match[1], match[2]);
    }
  } catch {
    // The generated slug snapshot below remains the fallback source of truth.
  }
  return lastmods;
}

function checkedInBlogSlugs(): string[] {
  let slugs: unknown;
  try {
    slugs = JSON.parse(read("src/data/blog-slugs.generated.json"));
  } catch {
    slugs = [];
  }
  const redirects = blogRedirectSlugs();
  return (Array.isArray(slugs) ? slugs : [])
    .filter(
      (slug): slug is string =>
        typeof slug === "string" &&
        BLOG_SLUG_PATTERN.test(slug) &&
        !redirects.has(slug),
    );
}

function checkedInBlogPosts(): BlogPostEntry[] {
  const slugs = checkedInBlogSlugs();
  const allowed = new Set(slugs);
  const fromSitemap: BlogPostEntry[] = [];
  try {
    const xml = read("public/sitemap.xml");
    for (const match of xml.matchAll(/<url>\s*<loc>https?:\/\/[^/]+\/blog\/([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>[\s\S]*?<\/url>/g)) {
      if (allowed.has(match[1])) {
        fromSitemap.push({ slug: match[1], lastmod: match[2] });
      }
    }
  } catch {
    // Fall through to the generated slug snapshot below.
  }
  if (fromSitemap.length === slugs.length) return fromSitemap;
  const lastmods = previousBlogLastmods();
  return slugs.map((slug) => ({ slug, lastmod: lastmods.get(slug) }));
}

function previousBlogCategoryPaths(): string[] {
  try {
    const xml = read("public/sitemap.xml");
    return [
      ...new Set(
        [...xml.matchAll(/<loc>https?:\/\/[^/]+(\/blog\/category\/[^<]+)<\/loc>/g)].map(
          (match) => match[1],
        ),
      ),
    ];
  } catch {
    return [];
  }
}

function checkedInBlogFallback(reason: string): BlogInventory {
  const posts = checkedInBlogPosts();
  if (posts.length === 0) {
    throw new Error(
      `[sitemap] ${reason}; no checked-in blog inventory is available, so the build cannot continue safely.`,
    );
  }
  console.warn(
    `[sitemap] ${reason}; preserving ${posts.length} checked-in canonical blog routes.`,
  );
  return { posts, source: "checked-in-fallback" };
}

async function blogPosts(): Promise<BlogInventory> {
  const url =
    process.env.VITE_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    PUBLIC_SUPABASE_DEFAULTS.url;
  const key =
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    PUBLIC_SUPABASE_DEFAULTS.publishableKey;
  if (!url || !key) {
    return checkedInBlogFallback("Supabase environment is unavailable");
  }
  try {
    const res = await fetch(
      `${url}/rest/v1/blog_articles?select=slug,updated_at,category&is_published=eq.true&limit=2000`,
      { headers: { apikey: key, Authorization: `Bearer ${key}` } },
    );
    if (!res.ok) {
      return checkedInBlogFallback(`blog fetch returned HTTP ${res.status}`);
    }
    const rows = (await res.json()) as Array<{
      slug: string;
      updated_at?: string;
      category?: string;
    }>;
    const redirectSlugs = blogRedirectSlugs();
    const posts = rows
      .filter(
        (r) =>
          r.slug &&
          BLOG_SLUG_PATTERN.test(r.slug) &&
          !redirectSlugs.has(r.slug),
      )
      .map((r) => ({
        slug: r.slug,
        lastmod: r.updated_at?.slice(0, 10),
        category: r.category,
      }));
    assertSafeBlogInventory(
      checkedInBlogPosts().length,
      posts.length,
      process.env.ALLOW_SITEMAP_URL_LOSS === "1",
    );
    return { posts, source: "supabase" };
  } catch (e) {
    if (
      e instanceof Error &&
      e.message.startsWith("[sitemap] refusing to reduce canonical blog inventory")
    ) {
      throw e;
    }
    return checkedInBlogFallback(`blog fetch failed: ${(e as Error).message}`);
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
      ...(e.lastmod ? [`    <lastmod>${e.lastmod}</lastmod>`] : []),
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
  for (const r of regionSlugs()) entries.push({ path: `/regions/${r}` });

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

  const blogInventory = await blogPosts();
  const posts = blogInventory.posts;
  const cats = new Set<string>();
  for (const p of posts) {
    entries.push({ path: `/blog/${p.slug}`, lastmod: p.lastmod });
    if (p.category) cats.add(p.category);
  }
  for (const cat of cats) {
    const slug = cat.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    if (slug) entries.push({ path: `/blog/category/${slug}` });
  }
  if (blogInventory.source === "checked-in-fallback") {
    for (const path of previousBlogCategoryPaths()) entries.push({ path });
  }

  // Programmatic SEO: glossary, comparison guides, city hubs & pet articles.
  // These come from generated data files so the sitemap stays in sync.
  // Only glossary terms that have a written definition in glossary-content.ts are
  // listed. The remaining routes still render (with noindex) but showed a
  // placeholder, which Google reported as soft 404s.
  const glossaryContentSrc = read("src/data/glossary-content.ts");
  const writtenTerms = new Set(extractAll(/^\s{2}"?([a-z0-9-]+)"?:\s*\{/gm, glossaryContentSrc));
  const glossarySrc = read("src/data/glossary-routes.generated.ts");
  for (const p of extractAll(/"(\/glossary(?:\/[^"]+)?)"/g, glossarySrc)) {
    if (p !== "/glossary" && !writtenTerms.has(p.replace("/glossary/", ""))) continue;
    entries.push({ path: p, priority: p === "/glossary" ? "0.7" : "0.6", changefreq: "monthly" });
  }

  const comparisonSrc = read("src/data/comparison-routes.generated.ts");
  for (const p of extractAll(/"(\/guides\/[^"]+)"/g, comparisonSrc))
    entries.push({ path: p, priority: "0.7", changefreq: "monthly" });

  const cityRoutesSrc = read("src/data/city-routes.generated.ts");
  for (const p of extractAll(/"(\/arthritis-support\/[^"]+)"/g, cityRoutesSrc))
    entries.push({ path: p, priority: "0.6", changefreq: "monthly" });

  const petsSrc = read("src/data/pets-arthritis.generated.ts");
  entries.push({ path: "/pets", priority: "0.8", changefreq: "weekly" });
  for (const s of extractAll(/"slug":\s*"([^"]+)"/g, petsSrc))
    entries.push({ path: `/pets/${s}`, priority: "0.7", changefreq: "monthly" });

  // Trust & partnerships hubs.
  entries.push({ path: "/trust", priority: "0.8", changefreq: "monthly" });
  entries.push({ path: "/corporate-partnerships", priority: "0.7", changefreq: "monthly" });

  // Author & reviewer bio pages (E-E-A-T signals for AEO/GEO).
  const authorsSrc = read("src/data/medical-authors.json");
  const authors = JSON.parse(authorsSrc) as Record<string, { slug: string; kind: "author" | "reviewer" }>;
  for (const rec of Object.values(authors)) {
    const prefix = rec.kind === "reviewer" ? "reviewers" : "authors";
    entries.push({ path: `/${prefix}/${rec.slug}`, priority: "0.6", changefreq: "yearly" });
  }

  const xml = build(entries);
  writeFileSync(resolve("public/sitemap.xml"), xml);
  console.log(`[sitemap] wrote ${entries.length} entries -> public/sitemap.xml`);

  // Also emit a slug list for the prerender pipeline. Sorted newest-first by
  // lastmod so `PRERENDER_LIMIT` can trim to the freshest N without missing
  // recently-published posts. Consumed by scripts/prerender-routes.mjs.
  const slugList =
    blogInventory.source === "checked-in-fallback"
      ? checkedInBlogSlugs()
      : [...posts]
          .sort((a, b) => (b.lastmod ?? "").localeCompare(a.lastmod ?? ""))
          .map((p) => p.slug);
  writeFileSync(
    resolve("src/data/blog-slugs.generated.json"),
    JSON.stringify(slugList, null, 2) + "\n",
  );
  console.log(`[sitemap] wrote ${slugList.length} slugs -> src/data/blog-slugs.generated.json`);

  // Also emit every non-blog path this run discovered (deduplicated) — the
  // combinatorial city/condition/exercise/glossary/comparison/pet families
  // above previously had no prerender coverage at all, since prerender-routes.mjs
  // only knew about a small hand-curated list plus blog posts. Excludes
  // /blog/* (already covered by blogSlugList above) to avoid duplicating a
  // large array across two generated files.
  const otherPaths = [...new Set(entries.map((e) => e.path))].filter(
    (p) => !p.startsWith("/blog/"),
  );
  writeFileSync(
    resolve("src/data/prerender-routes.generated.json"),
    JSON.stringify(otherPaths, null, 2) + "\n",
  );
  console.log(`[sitemap] wrote ${otherPaths.length} routes -> src/data/prerender-routes.generated.json`);
}

if ((import.meta as ImportMeta & { main?: boolean }).main) {
  main().catch((e) => {
    console.error("[sitemap] failed:", e);
    process.exit(1);
  });
}
