import { readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { todayInLondon } from './lib/london-date.mjs';

/** Reuse only verified image entries from the canonical sitemap, never guess assets. */
export function imageSitemap(xml, buildDate = todayInLondon()) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(buildDate)) {
    throw new Error('image sitemap build date must be YYYY-MM-DD');
  }
  const entries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].flatMap((match) => {
    const loc = match[1].match(/<loc>([^<]+)<\/loc>/)?.[1];
    const images = match[1].match(/<image:image>[\s\S]*?<\/image:image>/g) ?? [];
    if (!loc || !images.length) return [];
    const lastmod = match[1].match(/<lastmod>\s*(\d{4}-\d{2}-\d{2})\s*<\/lastmod>/)?.[1] || buildDate;
    return [`  <url><loc>${loc}</loc><lastmod>${lastmod}</lastmod>${images.join('')}</url>`];
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${entries.join('\n')}\n</urlset>\n`;
}

export function registerImageSitemap(index) {
  const loc = 'https://livingwitharthritis.org.uk/sitemap-images.xml';
  if (index.includes(`<loc>${loc}</loc>`)) return index;
  return index.replace('</sitemapindex>', `  <sitemap><loc>${loc}</loc></sitemap>\n</sitemapindex>`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const result = imageSitemap(readFileSync('public/sitemap.xml', 'utf8'));
  if (!result.includes('<image:image>')) throw new Error('No verified image entries; refusing an empty image sitemap.');
  writeFileSync('public/sitemap-images.xml', result);
  writeFileSync('public/sitemap-index.xml', registerImageSitemap(readFileSync('public/sitemap-index.xml', 'utf8')));
  console.log(`[media-sitemap] ${[...result.matchAll(/<url>/g)].length} canonical image pages; video sitemap awaits playable videos with landing-page metadata.`);
}
