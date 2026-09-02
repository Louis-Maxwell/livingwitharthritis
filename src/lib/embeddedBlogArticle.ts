/** Article baked into the first HTML response by inject-canonicals.mjs. */
export function readEmbeddedBlogArticle<T extends { slug?: string; content?: string }>(
  documentRef: Document | undefined,
  slug: string | undefined,
): T | null {
  if (!documentRef || !slug) return null;
  const el = documentRef.getElementById("static-article-data");
  if (!el?.textContent) return null;
  try {
    const data = JSON.parse(el.textContent) as T;
    if (data?.slug === slug && typeof data.content === "string" && data.content.trim()) {
      return data;
    }
  } catch {
    return null;
  }
  return null;
}
