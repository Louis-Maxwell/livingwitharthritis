export const GENERIC_HOME_TITLE =
  "Living With Arthritis UK | Evidence-Based Health Guides";

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
