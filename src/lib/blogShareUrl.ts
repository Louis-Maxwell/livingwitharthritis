/** Public origin for Living With Arthritis blog posts. */
export const BLOG_SITE_ORIGIN = "https://livingwitharthritis.org.uk";

/**
 * Canonical URL for a blog article page.
 * Accepts a bare slug (`turmeric-for-arthritis`) or a path that already
 * starts with `blog/` — always returns
 * `https://livingwitharthritis.org.uk/blog/{slug}`.
 */
export function buildCanonicalBlogUrl(slug: string): string {
  const trimmed = String(slug ?? "")
    .trim()
    .replace(/^\/+/u, "")
    .replace(/\/+$/u, "");
  const withoutPrefix = trimmed.replace(/^blog\//iu, "");
  return `${BLOG_SITE_ORIGIN}/blog/${withoutPrefix}`;
}
