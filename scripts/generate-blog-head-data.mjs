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
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const OUT = resolve('scripts/blog-head-data.json');

function publicSupabaseDefaults() {
  try {
    const src = readFileSync(
      resolve('src/integrations/supabase/publicDefaults.ts'),
      'utf8',
    );
    return {
      url: src.match(/url:\s*['"]([^'"]+)['"]/)?.[1],
      key: src.match(/publishableKey:\s*['"\s]+([^'"]+)['"]/)?.[1],
    };
  } catch {
    return {};
  }
}

function keepExisting(reason) {
  const count = existsSync(OUT)
    ? Object.keys(JSON.parse(readFileSync(OUT, 'utf8'))).length
    : 0;
  console.warn(`[blog-head-data] ${reason} — keeping existing ${count} entries`);
  process.exit(0);
}

async function main() {
  const defaults = publicSupabaseDefaults();
  const url =
    process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || defaults.url;
  const key =
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    defaults.key;
  if (!url || !key) keepExisting('Supabase credentials missing');

  let rows = [];
  try {
    const res = await fetch(
      `${url}/rest/v1/blog_articles?select=slug,title,meta_title,excerpt,direct_answer,meta_description,category,content,updated_at,date,image_url,keywords,author,author_credentials,reviewed_by,reviewer_credentials,display_order,citations&is_published=eq.true&limit=2000`,
      { headers: { apikey: key, Authorization: `Bearer ${key}` } },
    );
    if (!res.ok) keepExisting(`blog fetch ${res.status}`);
    rows = await res.json();
  } catch (error) {
    keepExisting(`blog fetch failed (${error.message})`);
  }
  if (!Array.isArray(rows) || rows.length === 0) keepExisting('no rows returned');

  const redirectSrc = readFileSync(resolve('src/data/blogRedirects.ts'), 'utf8');
  const redirectSlugs = new Set(
    [...redirectSrc.matchAll(/"([^"]+)"\s*:\s*"[^"]+"/g)].map((m) => m[1]),
  );

  const clip = (text, max) => {
    const value = String(text ?? '').replace(/\s+/g, ' ').trim();
    if (value.length <= max) return value;
    return `${value.slice(0, max - 1).replace(/[\s,;:.-]+$/, '')}…`;
  };

  // Mirrors extractFaqs() in src/pages/BlogPost.tsx: only headings that end
  // in "?" and are followed by real answer text. Those same pairs render in
  // the visible FAQ section, so FAQPage JSON-LD never describes hidden copy.
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
    const answer = row.direct_answer || row.excerpt || '';
    const description =
      row.meta_description || row.excerpt || row.direct_answer || '';
    // Some legacy rows store a truncated `title`; meta_title is the curated
    // SERP headline where present.
    const headline = row.meta_title || row.title;
    if (!headline || !description) continue;
    data[`/blog/${row.slug}`] = {
      // Keep the full article title readable, appending the brand suffix
      // only when the combined string still fits a sensible SERP length.
      title:
        headline.length <= 72
          ? `${headline} | Living With Arthritis UK`
          : clip(headline, 110),
      description: clip(description, 158),
      question: headline,

      answer: answer ? clip(answer, 600) : undefined,
      breadcrumb: headline,
      about: row.category || undefined,
      updatedAt: String(row.updated_at || row.date || '').slice(0, 10) || undefined,
      // Full reviewed body so inject-canonicals can put unique article
      // HTML in the first response. Without this, Google's no-JS pass
      // only sees a homepage shell and reports Soft 404.
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
    const faqs = extractFaqs(row.content);
    if (faqs.length >= 2) data[`/blog/${row.slug}`].faqs = faqs;
  }

  writeFileSync(OUT, `${JSON.stringify(data, null, 2)}\n`);
  console.log(`[blog-head-data] wrote ${Object.keys(data).length} blog entries`);
}

main();
