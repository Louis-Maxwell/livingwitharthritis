/**
 * Honest public inventory. Counts come from the checked-in catalogs,
 * not from marketing copy. Do not round these up.
 */
import contentStats from "@/data/contentStats.generated.json";
import { GUIDE_REGISTRY } from "@/lib/guideRegistry";
import { generateExerciseJointPages } from "@/data/exerciseJointMatrix";

/**
 * Unique published blog posts across frailty-batch, phase2-batch and blogList.
 * Counted at build time by scripts/generate-content-stats.mjs so the browser
 * never downloads the multi-megabyte article catalogues just for a number.
 */
export const BLOG_ARTICLE_COUNT = contentStats.blogArticleCount;

/** /guides/* pillar and medication pages listed in GUIDE_REGISTRY. */
export const PILLAR_GUIDE_COUNT = GUIDE_REGISTRY.length;

/** Joint × activity exercise pages generated from the exercise matrix. */
export const EXERCISE_JOINT_PAGE_COUNT = generateExerciseJointPages().length;

/**
 * PDFs actually shipped in public/downloads.
 * Keep in step if a file is added or removed — do not invent a round number.
 */
export const DOWNLOADABLE_PDF_COUNT = 1;

export const CONTENT_INVENTORY = {
  blogArticles: BLOG_ARTICLE_COUNT,
  pillarGuides: PILLAR_GUIDE_COUNT,
  exerciseJointPages: EXERCISE_JOINT_PAGE_COUNT,
  downloadablePdfs: DOWNLOADABLE_PDF_COUNT,
} as const;

export function formatInventoryCount(n: number): string {
  return n.toLocaleString("en-GB");
}
