import { readFileSync, writeFileSync } from 'node:fs';

const BASE_URL = 'https://livingwitharthritis.org.uk';
const SITEMAP_PATH = 'public/sitemap.xml';
const INDEX_PATH = 'public/sitemap-index.xml';
const OUTPUT_PATH = 'public/sitemap-articles.xml';

function requiredFile(path) {
  try {
    return readFileSync(path, 'utf8');
  } catch (error) {
    throw new Error(`Unable to read ${path}: ${error.message}`);
  }
}

const sitemap = requiredFile(SITEMAP_PATH);
if (!/<urlset\b/.test(sitemap)) throw new Error(`${SITEMAP_PATH} is not a URL sitemap.`);

const redirectSource = requiredFile('src/data/blogRedirects.ts');
const redirectedSlugs = new Set(
  [...redirectSource.matchAll(/"([^"]+)"\s*:\s*"[^"]+"/g)].map((match) => match[1]),
);
const noindex = JSON.parse(requiredFile('src/data/blog-noindex.json'));
const excludedSlugs = new Set([
  ...redirectedSlugs,
  ...(Array.isArray(noindex) ? noindex : []),
]);

const entries = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)]
  .map((match) => match[1])
  .filter((entry) => {
    const loc = entry.match(/<loc>([^<]+)<\/loc>/)?.[1];
    const path = loc?.startsWith(BASE_URL) ? loc.slice(BASE_URL.length) : '';
    const slug = path.match(/^\/blog\/([a-z0-9]+(?:-[a-z0-9]+)*)\/?$/)?.[1];
    return Boolean(slug && !excludedSlugs.has(slug));
  });

if (!entries.length) throw new Error('No canonical article URLs found; refusing to write an empty article sitemap.');

const articleSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries.map((entry) => `  <url>${entry.trim()}</url>`).join('\n')}
</urlset>
`;
writeFileSync(OUTPUT_PATH, articleSitemap);

const index = requiredFile(INDEX_PATH);
if (!/<sitemapindex\b/.test(index)) throw new Error(`${INDEX_PATH} is not a sitemap index.`);
const articleLoc = `${BASE_URL}/sitemap-articles.xml`;
const updatedIndex = index.includes(`<loc>${articleLoc}</loc>`)
  ? index
  : index.replace('</sitemapindex>', `  <sitemap><loc>${articleLoc}</loc></sitemap>\n</sitemapindex>`);
if (updatedIndex === index && !index.includes(`<loc>${articleLoc}</loc>`)) {
  throw new Error('Could not register article sitemap in sitemap index.');
}
writeFileSync(INDEX_PATH, updatedIndex);
console.log(`[article-sitemap] Wrote ${entries.length} canonical article URLs.`);
