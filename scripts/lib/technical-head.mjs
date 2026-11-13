import { cleanBrand, cleanJsonLd, canonicalPath, distinctSeoTitle }
  from '../../src/lib/technicalSeo.mjs';

const escape = (v) => String(v).replace(/&/g, '&amp;')
  .replace(/"/g, '&quot;').replace(/</g, '&lt;');

/** Square charity logo. About must keep this image even if head data is regenerated. */
export const ABOUT_LOGO_PATH = '/brand/lwa-logo-square-720.png';

export function aboutShareMeta(base) {
  const url = `${String(base).replace(/\/$/, '')}${ABOUT_LOGO_PATH}`;
  return {
    ogImage: url,
    ogImageWidth: 720,
    ogImageHeight: 720,
    ogImageAlt: 'Living With Arthritis logo',
    twitterCard: 'summary',
  };
}

/** Deduplicate tags, including missing/inherited homepage tags in snapshots.
 *  This function is the last writer of the static head: it deletes every
 *  og:* and twitter:* tag, then writes one set. About's logo is applied here
 *  so an earlier Helmet tag or a missing ogImage cannot put the landscape
 *  share image back. */
export function finalizeTechnicalHead(html, route, data = {}, base) {
  const path = canonicalPath(route);
  const url = `${base}${path}`;
  const title = distinctSeoTitle(
    data.title || '',
    data.article?.title || data.question || '',
    { route: path, breadcrumb: data.breadcrumb },
  );
  const description = cleanBrand(data.description);
  const about = path === '/about' ? aboutShareMeta(base) : null;
  const image = about?.ogImage || data.ogImage || `${base}/og/landing-share.png`;
  const imageWidth = about?.ogImageWidth || data.ogImageWidth;
  const imageHeight = about?.ogImageHeight || data.ogImageHeight;
  const imageAlt = about?.ogImageAlt || data.ogImageAlt;
  let out = html.replace(/<title>[\s\S]*?<\/title>/gi, '')
    .replace(/<link\b[^>]*rel=["']canonical["'][^>]*>\s*/gi, '')
    .replace(/<meta\b[^>]*>/gi, (tag) => {
      const key = /\b(?:name|property)=["']([^"']+)["']/i.exec(tag)?.[1];
      return key === 'description' || /^(og:|twitter:)/i.test(key || '') ? '' : tag;
    });
  const fields = {
    'og:title': title, 'og:description': description, 'og:url': url,
    'og:image': image, 'og:image:secure_url': image,
    ...(imageWidth ? { 'og:image:width': String(imageWidth), 'og:image:height': String(imageHeight) } : {}),
    ...(imageAlt ? { 'og:image:alt': imageAlt, 'twitter:image:alt': imageAlt } : {}),
    'og:type': data.article ? 'article' : 'website',
    'og:site_name': 'Living With Arthritis', 'og:locale': 'en_GB',
    'twitter:card': about?.twitterCard || data.twitterCard || 'summary_large_image',
    'twitter:title': title,
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