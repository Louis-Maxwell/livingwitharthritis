/**
 * Honest public inventory. Counts come from the checked-in catalogs,
 * not from marketing copy. Do not round these up.
 */
import frailtyBatch from "@/content/blog/frailty-batch.json";
import phase2Batch from "@/content/blog/phase2-batch.json";
import blogList from "@/data/blogList.json";
import { GUIDE_REGISTRY } from "@/lib/guideRegistry";
import { generateExerciseJointPages } from "@/data/exerciseJointMatrix";

type CatalogRow = { slug?: string; is_published?: boolean };

function publishedSlugs(rows: CatalogRow[]): string[] {
  return rows
    .filter((row) => typeof row?.slug === "string" && row.slug.length > 0 && row.is_published !== false)
    .map((row) => row.slug as string);
}

const blogArticleSlugs = new Set<string>([
  ...publishedSlugs(frailtyBatch as CatalogRow[]),
  ...publishedSlugs(phase2Batch as CatalogRow[]),
  ...publishedSlugs(blogList as CatalogRow[]),
]);

/** Unique published blog posts across frailty-batch, phase2-batch and blogList. */
export const BLOG_ARTICLE_COUNT = blogArticleSlugs.size;

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
