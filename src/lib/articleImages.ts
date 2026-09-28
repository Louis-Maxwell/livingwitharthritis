/**
 * Map-based article images for listings, cards, Open Graph and JSON-LD.
 *
 * Covers: 1:1 slug → unique file via blog-cover-map.generated.json.
 * In-article gallery picking lives in articleImagePicks.ts (no map), which the
 * article page uses directly with the cover file from the loaded guide.
 */
import blogCoverMap from "@/data/blog-cover-map.generated.json";
import { LOCAL_COVER_FALLBACK } from "@/lib/coverFallback";
import {
  BROKEN_SRC_RE,
  hashStr,
  pickArticleImages,
  toImg,
  type ArticleImage,
} from "@/lib/articleImagePicks";

export { LOCAL_COVER_FALLBACK, DEFAULT_OG_PATH, safeCoverSrc, onCoverImgError } from "@/lib/coverFallback";
export {
  coverFromFile,
  isDietNutritionTopic,
  isNutritionStockPath,
  pickArticleImages,
  type ArticleImage,
} from "@/lib/articleImagePicks";

const COVER_MAP = blogCoverMap as Record<string, string>;

/**
 * Topic-matched in-article images for a post. Index 0 is always the unique
 * cover (`coverImage`); see pickArticleImages for the selection rules.
 */
export function getArticleImages(
  category: string,
  title: string,
  seedKey: string,
  keywords?: string | string[] | null,
): ArticleImage[] {
  return pickArticleImages(coverImage(category, title, seedKey), category, title, seedKey, keywords);
}

/**
 * Primary cover for listings, Open Graph, and JSON-LD.
 * ALWAYS uses the 1:1 slug → file map (blog-cover-map.generated.json).
 * Never falls back to category buckets — those ~50 shared files make cards
 * look identical and are what made blog images "keep breaking" after fixes.
 *
 * If a slug is somehow unmapped (new blog before map regen), pick a
 * deterministic file from the existing unique corpus so cards stay distinct
 * until `python3 scripts/download-unique-openverse-covers.py` is re-run.
 * Do not use article.image_url for listing covers.
 */
export function coverImage(
  _category: string,
  title: string,
  slug: string,
): ArticleImage {
  const mapped = slug ? COVER_MAP[slug] : undefined;
  if (mapped && mapped.trim() && !BROKEN_SRC_RE.test(mapped)) {
    return toImg(mapped);
  }
  const corpus = Object.values(COVER_MAP).filter((file) => file && !BROKEN_SRC_RE.test(file));
  if (corpus.length > 0) {
    const file = corpus[hashStr(slug || title || "unmapped") % corpus.length];
    return toImg(file);
  }
  // Last resort: branded hero that exists in public/openverse (never favicon, never 404).
  return {
    src: LOCAL_COVER_FALLBACK,
    alt: "People walking together",
    credit: "Living With Arthritis UK",
  };
}
