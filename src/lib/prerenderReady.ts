export const GENERIC_HOME_TITLE =
  "Free arthritis exercises, diet & support for the UK";

const SITE_URL = "https://livingwitharthritis.org.uk";

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

  return (
    document.title.trim() !== GENERIC_HOME_TITLE &&
    canonical.href !== `${SITE_URL}/`
  );
}
