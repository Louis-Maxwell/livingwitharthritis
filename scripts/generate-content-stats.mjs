/**
 * Generates src/data/contentStats.generated.json so the landing page and
 * /search never have to load the multi-megabyte article catalogues in the
 * browser. Re-run after adding or removing blog content.
 *
 * wordCounts must cover every published slug (frailty + phase2 + legacy
 * blogArticles). Static catalog content wins on slug overlap.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const read = (p) => JSON.parse(readFileSync(new URL(`../${p}`, import.meta.url), 'utf8'));

const published = (rows) =>
  rows.filter((r) => typeof r?.slug === 'string' && r.slug && r.is_published !== false);

const frailty = published(read('src/content/blog/frailty-batch.json'));
const phase2 = published(read('src/content/blog/phase2-batch.json'));
const legacyList = published(read('src/data/blogList.json'));
const legacyArticles = published(read('src/data/blogArticles.json'));

const slugs = new Set([
  ...frailty.map((r) => r.slug),
  ...phase2.map((r) => r.slug),
  ...legacyList.map((r) => r.slug),
]);

const countWords = (html) => {
  if (!html) return 0;
  const text = String(html).replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/gi, ' ');
  return (text.match(/[A-Za-z][A-Za-z'-]*/g) ?? []).length;
};

/** Prefer static catalog (frailty/phase2) over legacy blogArticles on overlap. */
const bySlug = new Map();
for (const a of legacyArticles) {
  if (a?.slug) bySlug.set(a.slug, a);
}
for (const a of [...frailty, ...phase2]) {
  if (a?.slug) bySlug.set(a.slug, a);
}

const wordCounts = {};
for (const slug of slugs) {
  const row = bySlug.get(slug);
  wordCounts[slug] = countWords(row?.content);
}

writeFileSync(
  new URL('../src/data/contentStats.generated.json', import.meta.url),
  `${JSON.stringify({ blogArticleCount: slugs.size, wordCounts }, null, 2)}\n`,
);
console.log(`blogArticleCount=${slugs.size} wordCounts=${Object.keys(wordCounts).length}`);
