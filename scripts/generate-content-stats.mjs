/**
 * Generates src/data/contentStats.generated.json so the landing page and
 * /search never have to load the multi-megabyte article catalogues in the
 * browser. Re-run after adding or removing blog content.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const read = (p) => JSON.parse(readFileSync(new URL(`../${p}`, import.meta.url), 'utf8'));

const published = (rows) =>
  rows.filter((r) => typeof r?.slug === 'string' && r.slug && r.is_published !== false).map((r) => r.slug);

const slugs = new Set([
  ...published(read('src/content/blog/frailty-batch.json')),
  ...published(read('src/content/blog/phase2-batch.json')),
  ...published(read('src/data/blogList.json')),
]);

const countWords = (html) => {
  if (!html) return 0;
  const text = String(html).replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/gi, ' ');
  return (text.match(/[A-Za-z][A-Za-z'-]*/g) ?? []).length;
};

const wordCounts = {};
for (const a of read('src/data/blogArticles.json')) {
  if (a?.slug) wordCounts[a.slug] = countWords(a.content);
}

writeFileSync(
  new URL('../src/data/contentStats.generated.json', import.meta.url),
  `${JSON.stringify({ blogArticleCount: slugs.size, wordCounts }, null, 2)}\n`,
);
console.log(`blogArticleCount=${slugs.size} wordCounts=${Object.keys(wordCounts).length}`);
