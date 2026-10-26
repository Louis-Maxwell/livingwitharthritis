/**
 * Internal-linking helpers that make every published guide discoverable:
 * topic neighbours (prev/next, circular), latest, most helpful and
 * path-matched related guides for non-blog pages.
 */
import { getBlogCatalog, type BlogListItem } from "@/lib/blog/catalog";
import { canonicalBlogCategoryKey } from "@/data/blogCategories";

const byDateDesc = (a: BlogListItem, b: BlogListItem) =>
  String(b.date || "").localeCompare(String(a.date || "")) || a.slug.localeCompare(b.slug);

export function topicKeyOf(item: Pick<BlogListItem, "category">): string {
  return canonicalBlogCategoryKey(item.category || "") || "conditions";
}

let topicCache: Map<string, BlogListItem[]> | null = null;
export function guidesByTopic(): Map<string, BlogListItem[]> {
  if (topicCache) return topicCache;
  const m = new Map<string, BlogListItem[]>();
  for (const g of getBlogCatalog()) {
    const k = topicKeyOf(g);
    if (!m.has(k)) m.set(k, []);
    m.get(k)!.push(g);
  }
  for (const list of m.values()) list.sort(byDateDesc);
  topicCache = m;
  return m;
}

/** Previous/next guide in the same topic (wraps around, so nothing is a dead end). */
export function topicNeighbours(slug: string): { topic: string; prev?: BlogListItem; next?: BlogListItem } {
  for (const [topic, list] of guidesByTopic()) {
    const i = list.findIndex((g) => g.slug === slug);
    if (i === -1) continue;
    if (list.length < 2) return { topic };
    return {
      topic,
      prev: list[(i - 1 + list.length) % list.length],
      next: list[(i + 1) % list.length],
    };
  }
  return { topic: "conditions" };
}

export function latestGuides(n = 4): BlogListItem[] {
  return [...getBlogCatalog()].sort(byDateDesc).slice(0, n);
}

/** Editorially prioritised guides (display_order), used as "most helpful". */
export function mostHelpfulGuides(n = 4): BlogListItem[] {
  return [...getBlogCatalog()]
    .filter((g) => typeof g.display_order === "number")
    .sort((a, b) => (b.display_order as number) - (a.display_order as number) || byDateDesc(a, b))
    .slice(0, n);
}

const STOP = new Set(["the", "and", "for", "with", "uk", "arthritis", "guide", "guides", "resources", "about", "page"]);

/** 3–4 guides matched to a page path by keyword; falls back to most helpful. */
export function relatedGuidesForPath(pathname: string, n = 4): BlogListItem[] {
  const words = pathname.toLowerCase().split(/[^a-z]+/).filter((w) => w.length > 2 && !STOP.has(w));
  const scored: Array<[number, BlogListItem]> = [];
  if (words.length) {
    for (const g of getBlogCatalog()) {
      const hay = `${g.slug} ${g.title} ${g.keywords || ""}`.toLowerCase();
      const s = words.reduce((acc, w) => acc + (hay.includes(w) ? 1 : 0), 0);
      if (s > 0) scored.push([s, g]);
    }
  }
  scored.sort((a, b) => b[0] - a[0] || byDateDesc(a[1], b[1]));
  const picked = scored.slice(0, n).map(([, g]) => g);
  for (const g of mostHelpfulGuides(n * 2)) {
    if (picked.length >= n) break;
    if (!picked.some((p) => p.slug === g.slug)) picked.push(g);
  }
  return picked.slice(0, n);
}
