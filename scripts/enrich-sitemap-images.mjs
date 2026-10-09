/** Add existing article cover images to canonical page entries; never invent URLs. */
import { readFileSync, existsSync } from 'node:fs';
import { resolve, sep } from 'node:path';
import { pathToFileURL } from 'node:url';
import { writeFileAtomicSync } from './lib/atomic-write.mjs';

const SITE = 'https://livingwitharthritis.org.uk';
const escapeXml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

export function enrichSitemapImages(xml, covers, publicDir) {
  if (!/<urlset\b/.test(xml)) throw new Error('Expected a URL sitemap');
  let count = 0;
  const output = xml.replace(/<url>([\s\S]*?)<\/url>/g, (block, inner) => {
    const slug = inner.match(/<loc>https:\/\/livingwitharthritis\.org\.uk\/blog\/([a-z0-9-]+)<\/loc>/)?.[1];
    const filename = slug && covers[slug];
    if (typeof filename !== 'string' || !/^[a-zA-Z0-9._-]+\.(?:webp|png|jpe?g|avif)$/i.test(filename)) return block;
    const root = resolve(publicDir, 'openverse');
    const file = resolve(root, filename);
    if (!file.startsWith(root + sep) || !existsSync(file)) throw new Error(`Missing mapped cover for ${slug}: ${filename}`);
    count++;
    // Idempotent: replace our single cover record on a second run.
    const clean = inner.replace(/\s*<image:image>[\s\S]*?<\/image:image>/g, '').trimEnd();
    return `<url>${clean}\n    <image:image>\n      <image:loc>${escapeXml(`${SITE}/openverse/${filename}`)}</image:loc>\n    </image:image>\n  </url>`;
  }).replace(/<urlset\b([^>]*)>/, (tag, attrs) => attrs.includes('xmlns:image=') ? tag : `<urlset${attrs} xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`);
  return { xml: output, count };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const file = resolve('public/sitemap.xml');
  const covers = JSON.parse(readFileSync('src/data/blog-cover-map.generated.json', 'utf8'));
  const result = enrichSitemapImages(readFileSync(file, 'utf8'), covers, resolve('public'));
  writeFileAtomicSync(file, result.xml);
  console.log(`[sitemap-images] added ${result.count} existing article cover images`);
}
