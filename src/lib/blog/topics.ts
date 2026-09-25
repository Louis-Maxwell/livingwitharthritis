/**
 * Shared topic (category) helpers for /blog, /blog/category/:key and /blog/archive.
 * Raw post categories (25 editorial labels) collapse onto 8 canonical topics
 * via src/data/blogCategories.ts.
 */
import {
  BLOG_CATEGORY_KEYS,
  canonicalBlogCategoryKey,
  type BlogCategoryKey,
} from "@/data/blogCategories";

export const BLOG_TOPIC_LABELS: Record<BlogCategoryKey, string> = {
  exercise: "Exercise",
  nutrition: "Nutrition",
  lifestyle: "Lifestyle",
  health: "Health",
  "mental-health": "Mental Health",
  supplements: "Supplements",
  treatment: "Treatment",
  frailty: "Frailty",
};

export const BLOG_TOPIC_BLURBS: Record<BlogCategoryKey, string> = {
  exercise: "Physio routines, yoga, swimming & cycling",
  nutrition: "Anti-inflammatory diet, meal plans & recipes",
  lifestyle: "Work, travel, gardening & daily living",
  health: "Symptoms, diagnosis & condition guides",
  "mental-health": "Mood, anxiety & coping with chronic pain",
  supplements: "Turmeric, omega-3, glucosamine & collagen",
  treatment: "Medication, TENS, hydrotherapy & relief",
  frailty: "Falls prevention, sarcopenia & longevity",
};

export type BlogTopicFilter = "All" | (typeof BLOG_TOPIC_LABELS)[BlogCategoryKey];

export const BLOG_TOPIC_FILTERS: BlogTopicFilter[] = [
  "All",
  ...BLOG_CATEGORY_KEYS.map((key) => BLOG_TOPIC_LABELS[key]),
];

export function postMatchesTopic(postCategory: string, active: BlogTopicFilter): boolean {
  if (active === "All") return true;
  const activeKey = canonicalBlogCategoryKey(active);
  const postKey = canonicalBlogCategoryKey(postCategory);
  return !!activeKey && postKey === activeKey;
}

export function countInTopic(posts: { category: string }[], topic: BlogTopicFilter): number {
  return posts.filter((p) => postMatchesTopic(p.category, topic)).length;
}

export function topicFilterFromSlug(slug?: string): BlogTopicFilter {
  if (!slug) return "All";
  const key = canonicalBlogCategoryKey(slug);
  return key ? BLOG_TOPIC_LABELS[key] : "All";
}

export function topicKeyFromLabel(label: BlogTopicFilter): BlogCategoryKey | undefined {
  return label === "All" ? undefined : canonicalBlogCategoryKey(label);
}

/** "9 June 2026" — en-GB long date; falls back to the raw string. */
export function formatBlogDate(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return String(iso);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

/** Fallback estimate when a row has no catalog reading time. */
export function estimateListReadTime(excerpt: string): string {
  const words = excerpt.trim().split(/\s+/).filter(Boolean).length;
  const mins = Math.max(4, Math.min(14, Math.ceil(words / 40) + 3));
  return `${mins} min read`;
}

/** "N min read" from the catalog's real word count, else the excerpt estimate. */
export function readTimeLabel(post: { reading_minutes?: number | null; excerpt: string }): string {
  return post.reading_minutes && post.reading_minutes > 0
    ? `${post.reading_minutes} min read`
    : estimateListReadTime(post.excerpt);
}
