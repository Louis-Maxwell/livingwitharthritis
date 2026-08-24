const BLOG_PATH_PREFIX = "/blog/";
const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;

function toDateOnly(value: string): string | null {
  const date = value.slice(0, 10);
  return DATE_ONLY.test(date) ? date : null;
}

/**
 * Applies authoritative database modification dates to blog sitemap entries.
 * Other entries keep their existing lastmod: changing every URL to today's
 * date creates a false freshness signal and wastes crawler attention.
 */
export function refreshBlogLastmods(
  xml: string,
  blogLastmods: ReadonlyMap<string, string>,
  siteUrl: string,
): string {
  const base = siteUrl.replace(/\/+$/, "");

  return xml.replace(/<url>([\s\S]*?)<\/url>/g, (block) => {
    const locMatch = block.match(/<loc>([^<]+)<\/loc>/);
    if (!locMatch) return block;

    let path: string;
    try {
      const url = new URL(locMatch[1]);
      if (url.origin !== new URL(base).origin) return block;
      path = url.pathname;
    } catch {
      return block;
    }

    if (!path.startsWith(BLOG_PATH_PREFIX)) return block;
    const slug = decodeURIComponent(path.slice(BLOG_PATH_PREFIX.length));
    const rawLastmod = blogLastmods.get(slug);
    const lastmod = rawLastmod ? toDateOnly(rawLastmod) : null;
    if (!lastmod) return block;

    if (block.includes("<lastmod>")) {
      return block.replace(
        /<lastmod>[^<]*<\/lastmod>/,
        `<lastmod>${lastmod}</lastmod>`,
      );
    }

    return block.replace(
      /<\/loc>/,
      `</loc>\n    <lastmod>${lastmod}</lastmod>`,
    );
  });
}
