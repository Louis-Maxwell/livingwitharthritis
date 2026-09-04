/**
 * Deterministically picks real, openly-licensed images (Openverse-sourced,
 * already vetted and stored in /public/openverse — no watermarks, no new
 * network fetches) for a blog article, based on its category/title.
 *
 * Covers: 1:1 slug → unique file via blog-cover-map.generated.json.
 * In-article gallery: category buckets (may share within body images).
 */

import blogCoverMap from "@/data/blog-cover-map.generated.json";

type Bucket = "arthritis" | "community" | "nutrition" | "wellness";

const COVER_MAP = blogCoverMap as Record<string, string>;

const CATEGORY_FILES: Record<Bucket, string[]> = {
  arthritis: [
    "arthritis-01-arthritic-hands-in-pain.webp",
    "arthritis-02-arthritis-on-the-right-hand.webp",
    "arthritis-03-khaleda-zia-hand-development-due-to-arthritis.webp",
    "arthritis-04-posttraumatic-arthritis-of-the-wrist.webp",
    "arthritis-05-rheumatoid-arthritis.webp",
    "arthritis-06-osteoarthritis-left-knee.webp",
    "arthritis-07-patellofemoral-osteoarthritis-severe-2.webp",
    "arthritis-08-rheumatoid-arthritis-hand.webp",
    "arthritis-09-rheumatoid-arthritis-with-carpal-ankylosis-2017.webp",
    "arthritis-10-varus-knee-osteoarthritis-xray.webp",
    "arthritis-11-osteoarthritis.webp",
    "arthritis-12-osteoarthritis.webp",
    "arthritis-13-osteoarthritis-on-x-ray.webp",
  ],
  community: [
    "community-01-an-elderly-tibetan-women-holding-a-prayer-wheel-on.webp",
    "community-02-wolf-creek-nfh-2022-13th-annual-catch-a-smile-seni.webp",
    "community-03-a-senior-indian-couple-on-a-scooty.webp",
    "community-04-renewing-bonds-family-reconnects-at-4th-asog-marri.webp",
    "community-05-pride-be-2018-2018-05-19-16-47-31-ilce-6500-dsc081.webp",
    "community-06-pride-be-2018-2018-05-19-15-19-41-ilce-6500-dsc082.webp",
    "community-07-2018-05-19-15-31-50-ilce-6500-dsc08438-dxo.webp",
    "community-08-physical-therapy-teaching-lab-at-cu-anschutz-octob.webp",
    "community-09-us-navy-100306-n-5319a-020-occupational-therapist-.webp",
    "community-10-us-navy-100306-n-5319a-035-ten-year-old-joseph-cam.webp",
    "community-11-us-navy-100306-n-5319a-069-ten-year-old-joseph-cam.webp",
    "community-12-physical-therapy-session-aboard-the-uss-george-was.webp",
  ],
  nutrition: [
    "nutrition-01-oliven-v1.webp",
    "nutrition-02-healthy-meal-planning-with-fresh-fruits-and-vegeta.webp",
    "nutrition-03-colorful-assortment-of-fresh-fruits-arranged-in-a-.webp",
    "nutrition-04-healthy-meal-prep-with-fresh-salad-fruits-and-plan.webp",
    "nutrition-05-freshly-sliced-fruits-on-wooden-board-alongside-a-.webp",
    "nutrition-06-fruit-salad-or-fruit-bowl.webp",
    "nutrition-07-woman-writing-notes-while-enjoying-a-fresh-fruit-p.webp",
    "nutrition-08-gesundes-leben-004-2024-03-22.webp",
    "nutrition-09-dfc-3934-a-colorful-medley-of-freshly-chopped-frui.webp",
    "nutrition-10-mysore-special-fruit-salad-with-ice-cream.webp",
    "nutrition-11-bowl-of-fresh-fruit-unsplash.webp",
    "nutrition-12-the-small-acai-bowl-in-a-cup.webp",
  ],
  wellness: [
    "wellness-01-upward-facing-dog-pose.webp",
    "wellness-02-tai-chi-young-and-old.webp",
    "wellness-03-pilates-wunda-chair.webp",
    "wellness-04-a-woman-supporting-herself-with-a-walking-frame.webp",
    "wellness-05-pilates-reformer.webp",
    "wellness-06-pilates-9956369565.webp",
    "wellness-07-cane-walker-cane-hybrid-walker.webp",
    "wellness-08-pilates-reformer2.webp",
    "wellness-09-pilates-9956559243.webp",
    "wellness-10-walker-frame.webp",
    "wellness-11-pilates-9956372676.webp",
    "wellness-12-pilates-at-a-gym.webp",
    "wellness-13-pilates-9956534863.webp",
  ],
};

function humanizeAlt(filename: string): string {
  const base = filename.replace(/\.webp$/, "");
  const withoutPrefix = base
    .replace(/^[a-z]+-\d+-/, "")
    .replace(/^cover-\d+-/, "");
  const words = withoutPrefix.replace(/-/g, " ").trim();
  return words.replace(/\b\w/g, (c) => c.toUpperCase()) || "Article cover image";
}

function bucketFor(category: string, title: string): Bucket {
  const text = `${category ?? ""} ${title ?? ""}`.toLowerCase();
  if (/diet|nutrition|food|meal|\beat(?:s|en|ing)?\b|supplement/.test(text)) return "nutrition";
  if (/exercise|yoga|tai chi|pilates|walk|stretch|physio|movement|swim|activity|\bactive\b/.test(text)) return "wellness";
  if (/communit|support|mental|story|stories|wellbeing|well-being|social|group|peer/.test(text)) return "community";
  return "arthritis";
}

function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function toImg(filename: string): ArticleImage {
  return {
    src: `/openverse/${filename}`,
    alt: humanizeAlt(filename),
    credit: "Openly licensed image via Openverse",
  };
}

export interface ArticleImage {
  src: string;
  alt: string;
  credit: string;
}

/**
 * Returns exactly 3 topic-matched images for an article: two from the
 * best-matching category, one from a complementary category for variety.
 * Deterministic per (category, title, seedKey) — stable across renders.
 */
export function getArticleImages(
  category: string,
  title: string,
  seedKey: string,
): ArticleImage[] {
  const bucketKey = bucketFor(category, title);
  const primary = CATEGORY_FILES[bucketKey];
  const secondaryKey: Bucket = bucketKey === "arthritis" ? "wellness" : "arthritis";
  const secondary = CATEGORY_FILES[secondaryKey];

  const h = hashStr(seedKey || title || category || "default");
  const pick = (arr: string[], offset: number) => arr[(h + offset) % arr.length];

  const first = pick(primary, 0);
  let second = pick(primary, 1);
  if (second === first && primary.length > 1) second = pick(primary, 2);
  const third = pick(secondary, 0);

  return [toImg(first), toImg(second), toImg(third)];
}

/**
 * Primary cover for listings, Open Graph, and JSON-LD.
 * Unique per blog slug via generated Openverse cover map (1:1).
 * Falls back to category hash pick only if slug is absent from the map.
 */
export function coverImage(
  category: string,
  title: string,
  slug: string,
): ArticleImage {
  const mapped = slug ? COVER_MAP[slug] : undefined;
  if (mapped) {
    return toImg(mapped);
  }
  return getArticleImages(category, title, slug || title)[0];
}
