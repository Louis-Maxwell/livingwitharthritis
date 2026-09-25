// Auto-generates public/sitemap.xml.
// Runs via `predev` and `prebuild` hooks. Discovers static routes from
// src/App.tsx and dynamic routes from data files and local JSON.
//
// Growth-lever policy (not SEO theatre):
//   - List indexable visitor-job URLs Google should crawl.
//   - Omit thin/utility shells (search UI, AI meta pages, product SKUs, etc.).
//   - Emit <lastmod> only from real content dates (blog JSON, ai-head-data
//     updatedAt, or literal dateModified/lastReviewed in page sources).
//   - Do NOT invent today's date. Prefer omitting lastmod over faking it.
//   - Omit <priority> and <changefreq> — Google ignores them.
//
// Run manually:  bun scripts/generate-sitemap.ts

import { writeFileSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { assertSafeBlogInventory } from "../src/lib/seoBuildSafety";
import { exactRedirectPathSet } from "./seo-redirect-map.mjs";
import { readBlogCatalog } from "./lib/blog-posts.mjs";
import {
  BLOG_CATEGORY_KEYS,
  canonicalBlogCategoryKey,
} from "../src/data/blogCategories";
const BASE_URL = "https://livingwitharthritis.org.uk";

interface SitemapEntry {
  path: string;
  lastmod?: string;
}

interface BlogPostEntry {
  slug: string;
  lastmod?: string;
  category?: string;
}

interface BlogInventory {
  posts: BlogPostEntry[];
  source: "local-json" | "checked-in-fallback";
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
  "/admin/backlinks",
  "/admin/chat-feedback",
  "/admin/keyword-strategy",
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
  // Same hub as /conditions/foot-and-ankle-arthritis (canonical). Keep live for
  // visitor typos; never advertise aliases in XML (crawl-budget / duplicate loc).
  "/conditions/ankle-arthritis",
  "/conditions/foot-arthritis",
  // Thin / utility shells — keep live, do not advertise in XML sitemap.
  // Visitor-job hubs (pain, conditions, benefits-PIP, Access to Work / disability
  // support, falls, exercises) stay included via App.tsx discovery.
  "/search",
  "/seo-content-framework",
  "/ai-citations",
  "/ai-guidelines",
  "/accessibility-for-ai",
  "/ai",
  "/credits",
  "/gallery",
  "/shop",
  "/buddy",
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

function parseNavigateAliasPaths(): Set<string> {
  // <Route path="/zakat" element={<Navigate to="/zakat-appeal" replace />} />
  // and similar aliases must never appear in the sitemap (canonical ≠ loc).
  const src = read("src/App.tsx");
  const aliases = new Set<string>();
  const re =
    /<Route\s+path="([^"]+)"\s+element=\{\s*<Navigate\s+to="([^"]+)"/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src)) !== null) {
    if (!m[1].includes(":")) aliases.add(m[1]);
  }
  return aliases;
}

function parseStaticRoutes(): string[] {
  const src = read("src/App.tsx");
  const aliases = parseNavigateAliasPaths();
  const re = /<Route\s+path="([^"]+)"/g;
  const paths = new Set<string>();
  let m: RegExpExecArray | null;
  while ((m = re.exec(src)) !== null) {
    const p = m[1];
    if (p.includes(":")) continue;
    if (EXCLUDE_PREFIXES.some((pre) => p === pre || p.startsWith(pre + "/"))) continue;
    if (STATIC_EXCLUDE.has(p)) continue;
    if (aliases.has(p)) continue;
    paths.add(p);
  }
  return [...paths];
}

/** YYYY-MM-DD only — reject runtime `new Date()` stamps and junk. */
function asIsoDate(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const d = value.trim().slice(0, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(d) ? d : undefined;
}

function maxIsoDate(...dates: Array<string | undefined>): string | undefined {
  const ok = dates.filter((d): d is string => Boolean(d));
  if (ok.length === 0) return undefined;
  return ok.sort().at(-1);
}

/** Real content dates from scripts/ai-head-data.json (updatedAt). */
function aiHeadLastmods(): Map<string, string> {
  const out = new Map<string, string>();
  try {
    const data = JSON.parse(read("scripts/ai-head-data.json")) as Record<
      string,
      { updatedAt?: string }
    >;
    for (const [path, row] of Object.entries(data)) {
      const d = asIsoDate(row?.updatedAt);
      if (path.startsWith("/") && d) out.set(path, d);
    }
  } catch {
    // Optional at bootstrap.
  }
  return out;
}

/**
 * Literal dateModified / lastReviewed / datePublished in page sources.
 * Skips `new Date()` (runtime "today" is not a real content date).
 */
function pageSourceLastmods(): Map<string, string> {
  const out = new Map<string, string>();
  const app = read("src/App.tsx");
  // path -> relative import inside lazy(() => import("..."))
  const routeFiles = new Map<string, string>();
  const lazyRe =
    /const\s+(\w+)\s*=\s*lazy\(\s*\(\)\s*=>\s*import\(["']([^"']+)["']\)/g;
  const compToFile = new Map<string, string>();
  let m: RegExpExecArray | null;
  while ((m = lazyRe.exec(app)) !== null) {
    compToFile.set(m[1], m[2].replace(/^\.\//, "src/"));
  }
  const routeRe =
    /<Route\s+path="([^"]+)"\s+element=\{\s*(?:<GuideLayout[^>]*>)?\s*<(\w+)/g;
  while ((m = routeRe.exec(app)) !== null) {
    const file = compToFile.get(m[2]);
    if (file && !m[1].includes(":")) routeFiles.set(m[1], file.endsWith(".tsx") || file.endsWith(".ts") || file.endsWith(".jsx") ? file : file + ".tsx");
  }

  const dateRe =
    /\b(?:dateModified|lastReviewed|datePublished)\s*[:=]\s*["'](\d{4}-\d{2}-\d{2})["']/g;
  for (const [route, file] of routeFiles) {
    try {
      const body = read(file);
      if (/dateModified\s*:\s*new Date\(/.test(body)) {
        // Still allow lastReviewed / datePublished literals from the same file.
      }
      const found: string[] = [];
      let dm: RegExpExecArray | null;
      const re = new RegExp(dateRe.source, "g");
      while ((dm = re.exec(body)) !== null) found.push(dm[1]);
      const best = maxIsoDate(...found);
      if (best) out.set(route, best);
    } catch {
      // Missing file — skip.
    }
  }
  return out;
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

// productIds() intentionally removed from the sitemap assembly — /product/{id}
// SKU shells (comp-1, ex-1, …) are thin affiliate templates, not visitor-job URLs.

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

// Unique /conditions/:slug/:subpage URLs that have written copy in
// conditionSubpages.ts. Do not invent combinations for remaining hub-only
// conditions (for example calcific-periarthritis) — those would be empty
// templates. Hip and elbow now have written subpages.
function conditionSubpageSlugs(): string[] {
  const src = read("src/data/conditionSubpages.ts");
  const start = src.indexOf("export const conditionSubpages");
  if (start < 0) return [];
  const nested = new Set(["symptoms", "treatment", "exercises", "diet"]);
  return extractAll(/^\s{2}"?([a-z0-9-]+)"?:\s*\{/gm, src.slice(start)).filter(
    (slug) => !nested.has(slug),
  );
}

// Unique FAQ articles at /faq/:slug (src/data/faqArticles.ts).
function faqArticleSlugs(): string[] {
  const src = read("src/data/faqArticles.ts");
  return [...new Set(extractAll(/\bslug:\s*['"]([^'"]+)['"]/g, src))];
}

// Unique library topics at /library/:slug (src/data/healthTopics.ts).
// Deduped — the source file has one repeated slug.
function libraryTopicSlugs(): string[] {
  const src = read("src/data/healthTopics.ts");
  return [...new Set(extractAll(/"slug":\s*"([^"]+)"/g, src))];
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

// ---------- 3. LOCAL JSON: blog articles ----------
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

/** Every published guide from the single catalog (src/content/blog/posts → catalog.generated.json). */
function staticCatalogBlogPosts(): BlogPostEntry[] {
  try {
    return readBlogCatalog()
      .filter((r) => r.slug && BLOG_SLUG_PATTERN.test(r.slug))
      .map((r) => ({
        slug: r.slug,
        lastmod: String(r.updated_at || r.date || "").slice(0, 10) || undefined,
        category: r.category,
      }));
  } catch {
    // Catalog is optional at bootstrap.
    return [];
  }
}

function unionBlogPosts(primary: BlogPostEntry[], extra: BlogPostEntry[]): BlogPostEntry[] {
  const map = new Map<string, BlogPostEntry>();
  for (const p of primary) map.set(p.slug, p);
  for (const p of extra) {
    const cur = map.get(p.slug);
    map.set(p.slug, cur ? { ...cur, lastmod: p.lastmod || cur.lastmod, category: p.category || cur.category } : p);
  }
  return [...map.values()];
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
    const validPaths = new Set(
      BLOG_CATEGORY_KEYS.map((key) => `/blog/category/${key}`),
    );
    return [
      ...new Set(
        [...xml.matchAll(/<loc>https?:\/\/[^/]+(\/blog\/category\/[^<]+)<\/loc>/g)].map(
          (match) => match[1],
        ),
      ),
    ].filter((path) => validPaths.has(path));
  } catch {
    return [];
  }
}

function checkedInBlogFallback(reason: string): BlogInventory {
  const posts = unionBlogPosts(checkedInBlogPosts(), staticCatalogBlogPosts());
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
  const redirects = blogRedirectSlugs();
  const posts = staticCatalogBlogPosts().filter((p) => !redirects.has(p.slug));
  if (posts.length === 0) {
    return checkedInBlogFallback("blog catalog produced no posts");
  }
  return { posts, source: "local-json" };
}

// ---------- 4. ASSEMBLE ----------
function build(entries: SitemapEntry[]): string {
  const seen = new Set<string>();
  const unique = entries.filter((e) => {
    if (seen.has(e.path)) return false;
    seen.add(e.path);
    return true;
  });
  // loc + optional real lastmod only. Google ignores priority/changefreq.
  const urls = unique.map((e) => {
    return [
      "  <url>",
      `    <loc>${BASE_URL}${e.path}</loc>`,
      ...(e.lastmod ? [`    <lastmod>${e.lastmod}</lastmod>`] : []),
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
  const aiDates = aiHeadLastmods();
  const pageDates = pageSourceLastmods();

  function lastmodFor(path: string, extra?: string): string | undefined {
    return maxIsoDate(extra, aiDates.get(path), pageDates.get(path));
  }

  for (const p of parseStaticRoutes()) {
    const lastmod = lastmodFor(p);
    entries.push({ path: p, ...(lastmod ? { lastmod } : {}) });
  }

  for (const slug of dailyTipSlugs()) {
    const path = `/daily-tips/${slug}`;
    const lastmod = lastmodFor(path);
    entries.push({ path, ...(lastmod ? { lastmod } : {}) });
  }
  // Affiliate /product/{id} SKU shells (comp-1, ex-1, …) are thin templates —
  // keep the routes live for shop links, but do not spend crawl budget on them.
  // City hubs (/arthritis-support/{city}) — unique national-charity landings.
  for (const c of citySlugs()) {
    const path = `/arthritis-support/${c}`;
    const lastmod = lastmodFor(path);
    entries.push({ path, ...(lastmod ? { lastmod } : {}) });
  }
  for (const r of regionSlugs()) {
    const path = `/regions/${r}`;
    const lastmod = lastmodFor(path);
    entries.push({ path, ...(lastmod ? { lastmod } : {}) });
  }

  for (const s of exerciseJointSlugs()) {
    const path = `/exercises/${s}`;
    const lastmod = lastmodFor(path);
    entries.push({ path, ...(lastmod ? { lastmod } : {}) });
  }

  // Condition sub-pages have unique written content (src/data/conditionSubpages.ts).
  // City×condition, city×service and exercise×condition matrices are thin
  // templates — they 301 to a hub and must not appear in the sitemap.
  // Foot/ankle hub lands via App.tsx + conditionSubpages when PR #70 merges;
  // do not invent that URL while the route is absent from this branch.
  const SUBPAGES = ["symptoms", "treatment", "exercises", "diet"];
  for (const c of conditionSubpageSlugs())
    for (const s of SUBPAGES) {
      const path = `/conditions/${c}/${s}`;
      const lastmod = lastmodFor(path);
      entries.push({ path, ...(lastmod ? { lastmod } : {}) });
    }

  // Unique FAQ + library articles. These ship with written copy but were
  // previously omitted because parseStaticRoutes() skips /faq/:slug and
  // /library/:slug. Do not add /expert/:slug or /stories/:slug — those
  // arrays are empty placeholders.
  for (const slug of faqArticleSlugs()) {
    const path = `/faq/${slug}`;
    const lastmod = lastmodFor(path);
    entries.push({ path, ...(lastmod ? { lastmod } : {}) });
  }
  for (const slug of libraryTopicSlugs()) {
    const path = `/library/${slug}`;
    const lastmod = lastmodFor(path);
    entries.push({ path, ...(lastmod ? { lastmod } : {}) });
  }

  const blogInventory = await blogPosts();
  const posts = blogInventory.posts;
  const cats = new Set<string>();
  for (const p of posts) {
    entries.push({ path: `/blog/${p.slug}`, lastmod: asIsoDate(p.lastmod) });
    if (p.category) {
      const category = canonicalBlogCategoryKey(p.category);
      if (category) cats.add(category);
    }
  }
  for (const cat of cats) {
    entries.push({ path: `/blog/category/${cat}` });
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
  const push = (path: string, extraLastmod?: string) => {
    const lastmod = lastmodFor(path, extraLastmod);
    entries.push({ path, ...(lastmod ? { lastmod } : {}) });
  };

  for (const p of extractAll(/"(\/glossary(?:\/[^"]+)?)"/g, glossarySrc)) {
    if (p !== "/glossary" && !writtenTerms.has(p.replace("/glossary/", ""))) continue;
    push(p);
  }

  const comparisonSrc = read("src/data/comparison-routes.generated.ts");
  for (const p of extractAll(/"(\/guides\/[^"]+)"/g, comparisonSrc)) push(p);

  // Alias city hubs (stockport, stirling, …) 301 away and are filtered via
  // exactRedirectPathSet() below — only real ukCities slugs are listed above.
  const petsSrc = read("src/data/pets-arthritis.generated.ts");
  push("/pets");
  for (const s of extractAll(/"slug":\s*"([^"]+)"/g, petsSrc)) push(`/pets/${s}`);

  // Trust & partnerships hubs.
  push("/trust");
  push("/corporate-partnerships");

  // Author & reviewer bio pages (E-E-A-T signals for AEO/GEO).
  push("/authors");
  push("/reviewers");
  const authorsSrc = read("src/data/medical-authors.json");
  const authors = JSON.parse(authorsSrc) as Record<string, { slug: string; kind: "author" | "reviewer"; credential?: string }>;
  for (const rec of Object.values(authors)) {
    const prefix = rec.kind === "reviewer" ? "reviewers" : "authors";
    push(`/${prefix}/${rec.slug}`);
    // HCPC/GMC-registered authors also review content, so their /reviewers
    // bio URL is a real page and belongs in the sitemap.
    if (prefix === "authors" && /HCPC|GMC|NMC/i.test(rec.credential ?? "")) {
      push(`/reviewers/${rec.slug}`);
    }
  }

  // Final safety net: never ship empty locale stubs. Keep real city hubs.
  // City×condition paths are never pushed into entries (they 301 to the hub).
  const EXCLUDE_FROM_SITEMAP = [
    /^\/(es|fr|de|pt)(\/|$)/,
    /^\/arthritis-support\/[^/]+\/[^/]+/,
  ];
  const redirectSources = exactRedirectPathSet();
  const cleaned = entries.filter(
    (e) =>
      !EXCLUDE_FROM_SITEMAP.some((re) => re.test(e.path)) &&
      !redirectSources.has(e.path),
  );

  const xml = build(cleaned);
  writeFileSync(resolve("public/sitemap.xml"), xml);
  console.log(
    `[sitemap] wrote ${cleaned.length} entries (dropped ${entries.length - cleaned.length} locale/redirect URLs) -> public/sitemap.xml`,
  );

  // Honest single-child index (no fake locale sitemaps). lastmod = newest real URL date.
  const newest = cleaned
    .map((e) => e.lastmod)
    .filter((d): d is string => Boolean(d))
    .sort()
    .at(-1);
  const indexXml = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<!-- Locale sitemaps removed: /es, /fr, /de and /pt were empty stubs that`,
    `     served the English page and were being indexed as duplicates. -->`,
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    `  <sitemap>`,
    `    <loc>${BASE_URL}/sitemap.xml</loc>`,
    ...(newest ? [`    <lastmod>${newest}</lastmod>`] : []),
    `  </sitemap>`,
    `</sitemapindex>`,
    "",
  ].join("\n");
  writeFileSync(resolve("public/sitemap-index.xml"), indexXml);
  console.log(`[sitemap] wrote public/sitemap-index.xml` + (newest ? ` (lastmod ${newest})` : ""));

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
  // City hubs get unique static HTML from write-city-hub-html.mjs — keep them
  // out of the Chromium prerender list (faster CI; avoids duplicate work).
  const otherPaths = [...new Set(cleaned.map((e) => e.path))].filter(
    (p) =>
      (!p.startsWith("/blog/") || p.startsWith("/blog/category/")) &&
      !/^\/arthritis-support\/[^/]+$/.test(p),
  );
  writeFileSync(
    resolve("src/data/prerender-routes.generated.json"),
    JSON.stringify(otherPaths, null, 2) + "\n",
  );
  console.log(`[sitemap] wrote ${otherPaths.length} routes -> src/data/prerender-routes.generated.json`);
}

const isDirectRun =
  (import.meta as ImportMeta & { main?: boolean }).main === true ||
  (typeof process !== "undefined" &&
    Boolean(process.argv[1]?.includes("generate-sitemap")));

if (isDirectRun) {
  main().catch((e) => {
    console.error("[sitemap] failed:", e);
    process.exit(1);
  });
}
