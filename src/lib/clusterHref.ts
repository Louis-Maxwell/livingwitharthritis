/**
 * Cluster nav hrefs must resolve to a real in-app route or published catalog slug.
 * Used by TopicClusterNav so we never ship sibling chips to missing pages.
 */
import blogSlugs from "@/data/blog-slugs.generated.json";
import { faqArticles } from "@/data/faqArticles";

const BLOG_SLUGS = new Set(blogSlugs as string[]);
const FAQ_SLUGS = new Set(faqArticles.map((a) => a.slug));

export function isResolvableClusterHref(path: string | null | undefined): boolean {
  if (!path || typeof path !== "string") return false;
  const clean = path.split("?")[0].split("#")[0].replace(/\/+$/, "") || "/";
  if (!clean.startsWith("/") || clean.includes("//") || /\s/.test(clean)) return false;

  const blog = /^\/blog\/([^/]+)$/.exec(clean);
  if (blog) return BLOG_SLUGS.has(blog[1]);

  const faq = /^\/faq\/([^/]+)$/.exec(clean);
  if (faq) return FAQ_SLUGS.has(faq[1]);

  // Static / param routes are asserted against App.tsx in topicClusters tests.
  return clean.length > 1;
}

export function filterClusterHrefs(paths: Array<string | null | undefined>): string[] {
  return paths.filter((p): p is string => Boolean(p) && isResolvableClusterHref(p));
}
