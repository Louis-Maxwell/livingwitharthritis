import { HOME_PAGE_TITLE } from "@/lib/homeSeo";

/** Homepage <title> — must match index.html and Index.tsx Helmet. */
export const GENERIC_HOME_TITLE = HOME_PAGE_TITLE;

export function isPrerenderDocumentReady(
  document: Document,
  pathname: string,
): boolean {
  const normalisedPath =
    pathname === '/' ? '/' : `/${pathname.replace(/^\/+|\/+$/g, '')}`;
  const h1 = document.querySelector('h1');
  const title = document.title.trim();

  if (!h1?.textContent?.trim() || !title) return false;

  if (normalisedPath === '/') return true;

  return title !== GENERIC_HOME_TITLE;
}
