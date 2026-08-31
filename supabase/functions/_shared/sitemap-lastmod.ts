// Shared helper: refresh <lastmod> values for /blog/<slug> sitemap entries
// using authoritative dates from the database. Entries for other routes or
// other origins are left byte-identical.

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const toIsoDate = (value: string) => value.slice(0, 10);

export function refreshBlogLastmods(
  xml: string,
  blogDates: Map<string, string>,
  siteUrl: string,
): string {
  const base = siteUrl.replace(/\/$/, '');
  const locPattern = new RegExp(
    `<loc>${escapeRegExp(base)}/blog/([^<]+)</loc>(\\s*<lastmod>[^<]*</lastmod>)?`,
    'g',
  );

  return xml.replace(locPattern, (match, slug: string, existing?: string) => {
    const next = blogDates.get(slug);
    if (!next) return match;
    const date = toIsoDate(next);
    const loc = `<loc>${base}/blog/${slug}</loc>`;
    if (existing) {
      return `${loc}<lastmod>${date}</lastmod>`;
    }
    return `${loc}\n    <lastmod>${date}</lastmod>`;
  });
}

export default refreshBlogLastmods;
