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
 * Content is NOT invented: title, excerpt/direct_answer and dates all come
 * from the already-reviewed blog_articles rows. If the fetch fails the
 * previous JSON is preserved rather than emptied.
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
      `${url}/rest/v1/blog_articles?select=slug,title,excerpt,direct_answer,meta_description,category,updated_at,date&is_published=eq.true&limit=2000`,
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

  const data = {};
  for (const row of rows) {
    if (!row.slug || redirectSlugs.has(row.slug)) continue;
    const answer = row.direct_answer || row.excerpt || '';
    const description =
      row.meta_description || row.excerpt || row.direct_answer || '';
    if (!row.title || !description) continue;
    data[`/blog/${row.slug}`] = {
      title: clip(`${row.title} | Living With Arthritis UK`, 110),
      description: clip(description, 158),
      question: row.title,
      answer: answer ? clip(answer, 600) : undefined,
      breadcrumb: row.title,
      about: row.category || undefined,
      updatedAt: String(row.updated_at || row.date || '').slice(0, 10) || undefined,
    };
  }

  writeFileSync(OUT, `${JSON.stringify(data, null, 2)}\n`);
  console.log(`[blog-head-data] wrote ${Object.keys(data).length} blog entries`);
}

main();
