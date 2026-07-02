/**
 * Returns the site-relative OG image URL for a given page slug.
 *
 * OG images are generated at build time by scripts/generate-og-images.ts into
 * public/og/<slug>.png. If a slug has no generated image the caller should
 * fall back to the sitewide default.
 */
export function getOgImageUrl(slug: string, opts?: { absolute?: boolean }): string {
  const clean = slug.replace(/^\/+/, "").replace(/\/+$/, "").toLowerCase() || "home";
  const path = `/og/${clean}.png`;
  if (opts?.absolute) {
    return `https://livingwitharthritis.org.uk${path}`;
  }
  return path;
}

/**
 * Derive an OG slug from a route or filename.
 * e.g. "/conditions/knee-arthritis" -> "conditions-knee-arthritis"
 *      "KneeArthritis"              -> "conditions-knee-arthritis" (with category)
 */
export function ogSlugFromRoute(route: string): string {
  return route
    .replace(/^\/+/, "")
    .replace(/\/+/g, "-")
    .toLowerCase();
}
