import { cleanBrand, cleanJsonLd, canonicalPath, distinctSeoTitle }
  from '../../src/lib/technicalSeo.mjs';

const escape = (v) => String(v).replace(/&/g, '&amp;')
  .replace(/"/g, '&quot;').replace(/</g, '&lt;');

/** Deduplicate tags, including missing/inherited homepage tags in snapshots. */
export function finalizeTechnicalHead(html, route, data = {}, base) {
  const path = canonicalPath(route);
  const url = `${base}${path}`;
  const title = distinctSeoTitle(data.title || '', data.article?.title || data.question || '');
  const description = cleanBrand(data.description);
  const image = data.ogImage || `${base}/og/landing-share.png`;
  let out = html.replace(/<title>[\s\S]*?<\/title>/gi, '')
    .replace(/<link\b[^>]*rel=["']canonical["'][^>]*>\s*/gi, '')
    .replace(/<meta\b[^>]*>/gi, (tag) => {
      const key = /\b(?:name|property)=["']([^"']+)["']/i.exec(tag)?.[1];
      return key === 'description' || /^(og:|twitter:)/i.test(key || '') ? '' : tag;
    });
  const fields = {
    'og:title': title, 'og:description': description, 'og:url': url,
    'og:image': image, 'og:type': data.article ? 'article' : 'website',
    'og:site_name': 'Living With Arthritis', 'og:locale': 'en_GB',
    'twitter:card': 'summary_large_image', 'twitter:title': title,
    'twitter:description': description, 'twitter:image': image,
  };
  const tags = Object.entries(fields).map(([key, value]) =>
    `<meta ${key.startsWith('og:') ? 'property' : 'name'}="${key}" content="${escape(value)}" />`);
  out = out.replace(/<\/head>/i, `<title>${escape(title)}</title>\n<meta name="description" content="${escape(description)}" />\n<link rel="canonical" href="${url}" />\n${tags.join('\n')}\n</head>`);
  out = out.replace(/(<script\b[^>]*type=["']application\/ld\+json["'][^>]*>)([\s\S]*?)(<\/script>)/gi,
    (_, open, raw, close) => {
      // Malformed JSON must fail the validation gate, not be silently erased.
      const node = cleanJsonLd(JSON.parse(raw));
      return open + JSON.stringify(node).replace(/</g, '\\u003c') + close;
    });
  return out;
}