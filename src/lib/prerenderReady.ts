export const GENERIC_HOME_TITLE =
  "Living With Arthritis UK — Free Physio, Exercises & Diet";

const SITE_URL = "https://livingwitharthritis.org.uk";

export function isBlogListingPath(pathname: string): boolean {
  const normalisedPath =
    pathname === "/" ? "/" : `/${pathname.replace(/^\/+|\/+$/g, "")}`;
  return (
    normalisedPath === "/blog" || normalisedPath.startsWith("/blog/category/")
  );
}

export function isPrerenderDocumentReady(
  document: Document,
  pathname: string,
): boolean {
  const normalisedPath =
    pathname === "/" ? "/" : `/${pathname.replace(/^\/+|\/+$/g, "")}`;
  const canonical = document.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]',
  );
  const h1 = document.querySelector("h1");

  if (!canonical?.href || !h1?.textContent?.trim()) return false;

  if (normalisedPath === "/") {
    return canonical.href === `${SITE_URL}/`;
  }

  if (isBlogListingPath(normalisedPath)) {
    const listing = document.querySelector("[data-blog-listing]");
    if (!listing) return false;
  }

  return (
    document.title.trim() !== GENERIC_HOME_TITLE &&
    canonical.href !== `${SITE_URL}/`
  );
}
