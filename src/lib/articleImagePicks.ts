/**
 * Image picking without the slug → cover map, so the article page does not
 * download every guide's cover mapping. The map-based API lives in
 * articleImages.ts.
 *
 * Deterministically picks real, openly-licensed images (Openverse-sourced,
 * already vetted and stored in /public/openverse — no watermarks, no new
 * network fetches) for a blog article.
 *
 * Covers: 1:1 slug → unique file via blog-cover-map.generated.json.
 * In-article gallery: topic-matched picks from curated Openverse files —
 * never force a nutrition/fruit bucket onto non-diet posts.
 */

import { LOCAL_COVER_FALLBACK } from "@/lib/coverFallback";
import reviewedImages from "@/data/blog-reviewed-images.json";
import coverAltOverrides from "@/data/cover-alt-overrides.json";
import coverCredits from "@/data/cover-credits.generated.json";

/** Hand-written alt text for covers whose content was checked by eye. */
const ALT_OVERRIDES = coverAltOverrides as Record<string, string>;
/** Creator + licence per file (CC BY / BY-SA require attribution). */
const CREDITS = coverCredits as Record<string, string>;
const REVIEWED_IMAGES = reviewedImages as Record<string, ArticleImage[]>;
/** Filename-derived text that says nothing about the picture (camera codes, numbers, placeholders). */
const JUNK_ALT_RE = /^(?:[\d\s]+|.*\b(?:img|dsc|dscf|p\d{5,}|ams|lsc|ilce|dxo|jpg|imported article)\b.*|.*\b\d{6,}\b.*|[a-z]+)$/i;

export const BROKEN_SRC_RE = /(?:^$|favicon\.(?:ico|png|svg)$|logo-mark)/i;



function humanizeAlt(filename: string): string {
  const override = ALT_OVERRIDES[filename];
  if (override) return override;
  const base = filename.replace(/\.webp$/, "");
  const withoutPrefix = base
    .replace(/^[a-z]+-\d+-/, "")
    .replace(/^cover-\d+-/, "")
    .replace(/^lwa-/, "");
  const words = withoutPrefix.replace(/-/g, " ").trim();
  // Unknown picture content: mark decorative (alt="") rather than read out a camera code.
  const cleaned = words.replace(/\s+[0-9a-f]{8}$/i, "").trim();
  if (!cleaned || JUNK_ALT_RE.test(cleaned)) return "";
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

export function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

export function toImg(filename: string): ArticleImage {
  return {
    src: `/openverse/${filename}`,
    alt: humanizeAlt(filename),
    credit: CREDITS[filename] ?? "Openly licensed image via Openverse",
  };
}

/** True when the post is actually about diet / food — not mere "supplement" on a meds page. */
export function isDietNutritionTopic(
  category: string,
  title: string,
  seedKey: string,
  keywords?: string | string[] | null,
): boolean {
  const text = `${category} ${title} ${seedKey} ${Array.isArray(keywords) ? keywords.join(" ") : keywords ?? ""}`.toLowerCase();
  // Strong diet/food signals. Deliberately omit lone "supplement" (medication posts).
  return /diet|nutrition|foods?(?:\b|$)|meals?|recipe|mediterranean|anti-?inflammatory\s+diet|\beat(?:s|ing|en)?\b|fruit|vegetables?|omega-?3|shopping\s+list|healthy\s+eating|anti-?inflammatory\s+foods?/.test(
    text,
  );
}

export interface ArticleImage {
  src: string;
  alt: string;
  credit: string;
}

/**
 * Topic-matched in-article images for a post.
 *
 * - Index 0 is always the given cover.
 * - Further images are explicitly reviewed for this article slug.
 * - Nutrition / fruit stock is only eligible for diet/nutrition posts.
 * - May return fewer than 3 images when strong matches are scarce (better
 *   fewer related figures than unrelated stock).
 */
export function pickArticleImages(
  cover: ArticleImage,
  category: string,
  title: string,
  seedKey: string,
  keywords?: string | string[] | null,
): ArticleImage[] {
  // Visual relevance was checked per published article. Never guess from broad
  // tokens: a knee X-ray is not a hip figure, and a Pilates pose is not a walk.
  // Unknown/new slugs deliberately get no automatic gallery until reviewed.
  void category;
  void title;
  void keywords;
  const reviewed = REVIEWED_IMAGES[seedKey] ?? [];
  return [cover, ...reviewed.filter((image) => image.src !== cover.src).map((image) => ({
    ...image, credit: CREDITS[image.src.replace(/^\/openverse\//, "")] ?? image.credit,
  }))];
}

/**
 * Cover for a guide whose cover file is already known (the article page has
 * it on the loaded guide), without the slug → file map.
 */
export function coverFromFile(file: string | null | undefined): ArticleImage {
  if (file && file.trim() && !BROKEN_SRC_RE.test(file)) return toImg(file);
  return {
    src: LOCAL_COVER_FALLBACK,
    alt: "People walking together",
    credit: "Living With Arthritis",
  };
}

/** Test helper: true if a path/filename is nutrition/fruit stock. */
export function isNutritionStockPath(srcOrFile: string): boolean {
  return /(?:^nutrition-)|fruit|salad|meal|food|olive|oliven|acai|vegetable|diet|bowl-of-fresh/i.test(srcOrFile);
}
