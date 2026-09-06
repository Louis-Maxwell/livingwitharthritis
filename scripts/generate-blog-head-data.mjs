#!/usr/bin/env node
/**
 * Generates scripts/blog-head-data.json — one head-data entry per published
 * blog article, in the same shape as scripts/ai-head-data.json.
 *
 * Why: most AI crawlers (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot,
 * CCBot) and the first Googlebot pass do NOT execute JavaScript, so the
 * react-helmet titles on /blog/* were invisible — every blog URL shipped
 * the generic homepage shell. scripts/inject-canonicals.mjs merges this
 * file into the static per-route HTML it writes at postbuild.
 *
 * Content is NOT invented: title, excerpt/direct_answer, dates and the
 * reviewed article body all come from the already-reviewed blog_articles
 * rows. The body is required so inject-canonicals can put unique article
 * HTML in the first response (Google Soft 404s on empty SPA shells).
 * If the fetch fails the previous JSON is preserved rather than emptied.
 *
 * Social / share preview:
 *   - Page titles prefer the full article title when meta_title was hard-clipped
 *     mid-phrase (e.g. "Supporting a Partner With").
 *   - ogImage is resolved from src/data/blog-cover-map.generated.json →
 *     https://livingwitharthritis.org.uk/openverse/<file>, falling back to
 *     /og/home.png only when no cover exists (homepage banner stays for `/`).
 *
 * Lightweight refresh (no full vite build) when dist/ already exists:
 *   node scripts/generate-blog-head-data.mjs && node scripts/inject-canonicals.mjs
 * Lovable publish / production deploy is still required for live crawlers.
 */
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = resolve('scripts/blog-head-data.json');
const LOCAL_BLOG_DIR = resolve('src/content/blog');
const COVER_MAP_PATH = resolve('src/data/blog-cover-map.generated.json');
const SITE = 'https://livingwitharthritis.org.uk';
const BRAND = 'Living With Arthritis UK';
const DEFAULT_OG_IMAGE = `${SITE}/og/home.png`;

export function clipText(text, max) {
  const value = String(text ?? '').replace(/\s+/g, ' ').trim();
  if (value.length <= max) return value;
  return `${value.slice(0, max - 1).replace(/[\s,;:.-]+$/, '')}…`;
}

/**
 * Many rows have meta_title hard-clipped mid-phrase ("Supporting a Partner With")
 * while `title` still holds the full headline. Prefer the full title in that case.
 */
export function looksTruncatedMeta(meta, title) {
  const m = String(meta ?? '').trim();
  const t = String(title ?? '').trim();
  if (!m) return true;
  if (!t) return false;
  // meta is a strict shorter prefix of the full title (common DB / CMS clip)
  if (t.startsWith(m) && t.length > m.length + 3) return true;
  // Suspiciously short vs title, no terminal punctuation
  if (m.length < 40 && t.length > m.length + 10 && !/[.?!):]$/.test(m)) return true;
  // ~60-char hard clip mid-word / mid-phrase
  if (
    m.length >= 50 &&
    m.length <= 65 &&
    t.length > m.length &&
    !/[.?!)"'\u2019\u201d]$/.test(m)
  ) {
    return true;
  }
  return false;
}

export function pickHeadline(row) {
  const title = String(row?.title ?? '').trim();
  const meta = String(row?.meta_title ?? '').trim();
  if (meta && !looksTruncatedMeta(meta, title)) return meta;
  return title || meta;
}

/**
 * Brand-style <title> / og:title. Prefer full headline + brand when the
 * headline is a normal length; never chop mid-phrase like
 * "Supporting a Partner With | …".
 */
export function buildPageTitle(headline) {
  const h = String(headline ?? '').replace(/\s+/g, ' ').trim();
  if (!h) return BRAND;
  const withBrand = `${h} | ${BRAND}`;
  // Soft SERP-friendly target ~60–70 when we can keep a complete branded phrase.
  if (withBrand.length <= 70) return withBrand;
  // Prefer dropping the brand over shipping 90–110 char titles. Never chop
  // mid-phrase like "Supporting a Partner With | …".
  if (h.length <= 72) return h;
  // Longer headlines: word-boundary clip under ~70 (no brand after a clip).
  return clipText(h, 70);
}

export function loadCoverMap(path = COVER_MAP_PATH) {
  if (!existsSync(path)) return {};
  try {
    const raw = JSON.parse(readFileSync(path, 'utf8'));
    return raw && typeof raw === 'object' && !Array.isArray(raw) ? raw : {};
  } catch {
    return {};
  }
}

/**
 * Absolute og:image for a blog post. Cover map wins for social previews;
 * article.image_url is used when present; else homepage banner fallback.
 */
export function resolveOgImage(slug, imageUrl, coverMap = {}) {
  const file = coverMap?.[slug];
  if (file) return `${SITE}/openverse/${String(file).replace(/^\//, '')}`;

  const img = String(imageUrl ?? '').trim();
  if (img) {
    if (/^https?:\/\//i.test(img)) return img;
    if (img.startsWith('/')) return `${SITE}${img}`;
    return `${SITE}/openverse/${img}`;
  }

  return DEFAULT_OG_IMAGE;
}

function loadLocalStaticArticles() {
  const articles = [];
  try {
    for (const name of readdirSync(LOCAL_BLOG_DIR)) {
      if (!name.endsWith('.json')) continue;
      const raw = JSON.parse(readFileSync(resolve(LOCAL_BLOG_DIR, name), 'utf8'));
      const rows = Array.isArray(raw) ? raw : [raw];
      for (const row of rows) {
        if (row?.slug && row?.title && row?.is_published !== false) articles.push(row);
      }
    }
  } catch {
    // Catalog is optional at bootstrap.
  }
  return articles;
}

function buildEntry(row, extractFaqs, coverMap) {
  const answer = row.direct_answer || row.excerpt || '';
  const description = row.meta_description || row.excerpt || row.direct_answer || '';
  const headline = pickHeadline(row);
  if (!headline || !description) return null;

  const entry = {
    title: buildPageTitle(headline),
    description: clipText(description, 158),
    question: headline,
    answer: answer ? clipText(answer, 600) : undefined,
    breadcrumb: headline,
    about: row.category || undefined,
    updatedAt: String(row.updated_at || row.date || '').slice(0, 10) || undefined,
    ogImage: resolveOgImage(row.slug, row.image_url, coverMap),
    article: {
      slug: row.slug,
      title: row.title,
      excerpt: row.excerpt ?? '',
      content: row.content ?? '',
      date: row.date,
      category: row.category,
      image_url: row.image_url ?? null,
      meta_title: row.meta_title ?? null,
      meta_description: row.meta_description ?? null,
      keywords: row.keywords ?? null,
      author: row.author ?? null,
      author_credentials: row.author_credentials ?? null,
      reviewed_by: row.reviewed_by ?? null,
      reviewer_credentials: row.reviewer_credentials ?? null,
      is_published: true,
      display_order: row.display_order ?? 0,
      updated_at: row.updated_at ?? null,
      direct_answer: row.direct_answer ?? null,
      citations: row.citations ?? null,
    },
  };

  if (typeof extractFaqs === 'function') {
    const faqs = extractFaqs(row.content);
    if (faqs.length >= 2) entry.faqs = faqs;
  }
  return entry;
}

function mergeLocalStatic(data, extractFaqs, coverMap) {
  for (const row of loadLocalStaticArticles()) {
    const entry = buildEntry(row, extractFaqs, coverMap);
    if (entry) data[`/blog/${row.slug}`] = entry;
  }
  return data;
}

function loadRowsFromLocalJson() {
  const rows = [];
  if (existsSync(OUT)) {
    const data = JSON.parse(readFileSync(OUT, 'utf8'));
    for (const entry of Object.values(data)) {
      if (entry?.article) rows.push(entry.article);
    }
  }
  const snap = resolve('src/data/blogArticles.json');
  if (existsSync(snap)) {
    const arr = JSON.parse(readFileSync(snap, 'utf8'));
    if (Array.isArray(arr)) rows.push(...arr);
  }
  for (const row of loadLocalStaticArticles()) {
    rows.push(row);
  }
  const map = new Map();
  for (const row of rows) {
    if (row?.slug) map.set(row.slug, row);
  }
  return [...map.values()];
}

async function main() {
  // local JSON only — never fetch a remote CMS
  const rows = loadRowsFromLocalJson();
  const coverMap = loadCoverMap();

  const redirectSrc = readFileSync(resolve('src/data/blogRedirects.ts'), 'utf8');
  const redirectSlugs = new Set(
    [...redirectSrc.matchAll(/"([^"]+)"\s*:\s*"[^"]+"/g)].map((m) => m[1]),
  );

  const extractFaqs = (content) => {
    if (!content) return [];
    const body = String(content).replace(/\\n/g, '\n');
    const isHtml = body.trim().startsWith('<');
    const pairs = [];
    if (isHtml) {
      const re = /<h[23][^>]*>([\s\S]*?)<\/h[23]>([\s\S]*?)(?=<h[23][^>]*>|$)/gi;
      let m;
      while ((m = re.exec(body)) !== null) {
        const q = m[1].replace(/<[^>]*>/g, '').trim();
        const a = m[2].replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 500);
        if (q.endsWith('?') && a.length > 30) pairs.push({ q, a });
        if (pairs.length >= 6) break;
      }
      return pairs;
    }
    const re = /^#{2,3}\s+(.+\?)\s*$/gm;
    let m;
    while ((m = re.exec(body)) !== null) {
      const q = m[1].trim();
      const rest = body.slice(m.index + m[0].length);
      const a = rest
        .split(/^#{1,3}\s+/m)[0]
        .replace(/[*_`>#\[\]]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 500);
      if (a.length > 30) pairs.push({ q, a });
      if (pairs.length >= 6) break;
    }
    return pairs;
  };

  const data = {};
  for (const row of rows) {
    if (!row.slug || redirectSlugs.has(row.slug)) continue;
    const entry = buildEntry(row, extractFaqs, coverMap);
    if (entry) data[`/blog/${row.slug}`] = entry;
  }

  mergeLocalStatic(data, extractFaqs, coverMap);
  writeFileSync(OUT, `${JSON.stringify(data, null, 2)}\n`);
  const withContent = Object.values(data).filter((e) => e?.article?.content).length;
  const fromCover = Object.values(data).filter(
    (e) => e?.ogImage && e.ogImage.includes('/openverse/'),
  ).length;
  const fallbackOg = Object.values(data).filter((e) => e?.ogImage === DEFAULT_OG_IMAGE).length;
  console.log(
    `[blog-head-data] local JSON only — ${Object.keys(data).length} entries, ${withContent} with article content, ${fromCover} ogImage from cover map, ${fallbackOg} fallback /og/home.png`,
  );
}

function isDirectRun() {
  const entry = process.argv[1];
  if (!entry) return false;
  try {
    return fileURLToPath(import.meta.url) === resolve(entry);
  } catch {
    return /generate-blog-head-data\.mjs$/.test(entry);
  }
}

if (isDirectRun()) {
  main();
}
