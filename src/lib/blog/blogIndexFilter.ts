/**
 * Pure search + topic + sort logic for the /blog index, kept separate from
 * the page so it can be unit-tested. Never changes slugs or content.
 */
import { canonicalBlogCategoryKey } from "@/data/blogCategories";
import { BLOG_TOPIC_LABELS, postMatchesTopic, type BlogTopicFilter } from "./topics";

export type BlogSortMode = "newest" | "oldest" | "updated" | "az";

export const BLOG_SORT_OPTIONS: { id: BlogSortMode; label: string }[] = [
  { id: "newest", label: "Newest first" },
  { id: "oldest", label: "Oldest first" },
  { id: "updated", label: "Recently updated" },
  { id: "az", label: "A–Z" },
];

export interface BlogIndexRow {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  updated_at?: string | null;
  author?: string | null;
}

export function effectiveUpdated(post: { date: string; updated_at?: string | null }): string {
  return post.updated_at || post.date || "";
}

/** Normalise text for matching: lower-case, collapse punctuation/spaces. */
const norm = (v: string) => v.toLowerCase().replace(/[\s\-–—_]+/g, " ").trim();

export function postMatchesQuery(post: BlogIndexRow, query: string): boolean {
  const terms = norm(query).split(" ").filter(Boolean);
  if (terms.length === 0) return true;
  const key = canonicalBlogCategoryKey(post.category || "");
  const hay = norm(
    [
      post.title,
      post.excerpt,
      post.author || "",
      post.category || "",
      key ? BLOG_TOPIC_LABELS[key] : "",
      post.slug,
    ].join(" "),
  );
  // Every word must appear somewhere, so "knee exercise" finds
  // "Exercises for knee arthritis" regardless of word order.
  return terms.every((t) => hay.includes(t));
}

export function sortBlogRows<T extends BlogIndexRow>(posts: T[], mode: BlogSortMode): T[] {
  const sorted = [...posts];
  const bySlug = (a: T, b: T) => a.slug.localeCompare(b.slug);
  if (mode === "newest") {
    sorted.sort((a, b) => (b.date || "").localeCompare(a.date || "") || bySlug(a, b));
  } else if (mode === "oldest") {
    sorted.sort((a, b) => (a.date || "").localeCompare(b.date || "") || bySlug(a, b));
  } else if (mode === "updated") {
    sorted.sort(
      (a, b) => effectiveUpdated(b).localeCompare(effectiveUpdated(a)) || bySlug(a, b),
    );
  } else {
    sorted.sort((a, b) => a.title.localeCompare(b.title, "en-GB", { sensitivity: "base" }));
  }
  return sorted;
}

export function filterBlogRows<T extends BlogIndexRow>(
  posts: T[],
  opts: { topic: BlogTopicFilter; query: string; sort: BlogSortMode },
): T[] {
  const seen = new Set<string>();
  const out = posts.filter((p) => {
    if (seen.has(p.slug)) return false; // never show the same guide twice
    seen.add(p.slug);
    return postMatchesTopic(p.category, opts.topic) && postMatchesQuery(p, opts.query);
  });
  return sortBlogRows(out, opts.sort);
}
