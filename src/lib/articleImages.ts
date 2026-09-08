/**
 * Deterministically picks real, openly-licensed images (Openverse-sourced,
 * already vetted and stored in /public/openverse — no watermarks, no new
 * network fetches) for a blog article.
 *
 * Covers: 1:1 slug → unique file via blog-cover-map.generated.json.
 * In-article gallery: topic-matched picks from curated Openverse files —
 * never force a nutrition/fruit bucket onto non-diet posts.
 */

import blogCoverMap from "@/data/blog-cover-map.generated.json";

type Bucket = "arthritis" | "community" | "nutrition" | "wellness";

const COVER_MAP = blogCoverMap as Record<string, string>;

/** Local files that exist under public/. Never the red favicon or an empty src. */
export const LOCAL_COVER_FALLBACK = "/openverse/hero-friends-800.webp";
export const DEFAULT_OG_PATH = "/og/landing-share.png";

const BROKEN_SRC_RE = /(?:^$|favicon\.(?:ico|png|svg)$|logo-mark)/i;

export function safeCoverSrc(src: string | null | undefined): string {
  const trimmed = (src ?? "").trim();
  if (!trimmed || BROKEN_SRC_RE.test(trimmed)) return LOCAL_COVER_FALLBACK;
  return trimmed;
}

/** Listing/hero onError: swap a 404 or empty load for a file that is on disk. */
export function onCoverImgError(event: { currentTarget: HTMLImageElement }) {
  const img = event.currentTarget;
  if (!img || img.dataset.coverFallback === "1") return;
  img.dataset.coverFallback = "1";
  img.src = LOCAL_COVER_FALLBACK;
}


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

/** Filenames that are clearly food/fruit stock — blocked unless the post is diet-related. */
const NUTRITION_FILENAME_RE =
  /(?:^nutrition-)|fruit|salad|meal|food|olive|oliven|acai|vegetable|diet|bowl-of-fresh/i;

const STOPWORDS = new Set([
  "the", "and", "for", "with", "from", "how", "your", "you", "our", "are", "is",
  "was", "were", "will", "can", "does", "did", "this", "that", "these", "those",
  "into", "onto", "about", "after", "before", "while", "without", "within",
  "guide", "tips", "explained", "practical", "plan", "best", "next", "wave",
  "step", "steps", "should", "start", "talk", "every", "day", "what", "when",
  "why", "who", "which", "their", "them", "they", "have", "has", "had", "been",
  "being", "over", "under", "more", "most", "some", "any", "all", "than", "then",
  "also", "just", "only", "very", "much", "many", "other", "into", "onto",
  "living", "blog", "post", "article", "page", "https", "www", "com", "org",
  "html", "webp", "lwa", "cover",
]);

function humanizeAlt(filename: string): string {
  const base = filename.replace(/\.webp$/, "");
  const withoutPrefix = base
    .replace(/^[a-z]+-\d+-/, "")
    .replace(/^cover-\d+-/, "")
    .replace(/^lwa-/, "");
  const words = withoutPrefix.replace(/-/g, " ").trim();
  return words.replace(/\b\w/g, (c) => c.toUpperCase()) || "Article cover image";
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

function flattenKeywords(keywords?: string | string[] | null): string {
  if (!keywords) return "";
  if (Array.isArray(keywords)) return keywords.join(" ");
  return keywords;
}

function topicText(
  category: string,
  title: string,
  seedKey: string,
  keywords?: string | string[] | null,
): string {
  return `${category ?? ""} ${title ?? ""} ${seedKey ?? ""} ${flattenKeywords(keywords)}`.toLowerCase();
}

function tokenize(text: string): Set<string> {
  const tokens = new Set<string>();
  for (const raw of text.split(/[^a-z0-9]+/)) {
    if (raw.length < 3 || STOPWORDS.has(raw)) continue;
    tokens.add(raw);
    // light plural trim
    if (raw.endsWith("s") && raw.length > 4) tokens.add(raw.slice(0, -1));
  }
  return tokens;
}

/** True when the post is actually about diet / food — not mere "supplement" on a meds page. */
export function isDietNutritionTopic(
  category: string,
  title: string,
  seedKey: string,
  keywords?: string | string[] | null,
): boolean {
  const text = topicText(category, title, seedKey, keywords);
  // Strong diet/food signals. Deliberately omit lone "supplement" (medication posts).
  return /diet|nutrition|foods?(?:\b|$)|meals?|recipe|mediterranean|anti-?inflammatory\s+diet|\beat(?:s|ing|en)?\b|fruit|vegetables?|omega-?3|shopping\s+list|healthy\s+eating|anti-?inflammatory\s+foods?/.test(
    text,
  );
}

function filenameTokens(filename: string): string[] {
  return filename
    .replace(/\.webp$/i, "")
    .replace(/^[a-z]+-\d+-/i, "")
    .replace(/^cover-\d+-/i, "")
    .replace(/^lwa-/i, "")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length > 2 && !STOPWORDS.has(w) && !/^\d+$/.test(w));
}

function bucketOf(filename: string): Bucket | null {
  const prefix = filename.split("-")[0];
  if (prefix === "arthritis" || prefix === "community" || prefix === "nutrition" || prefix === "wellness") {
    return prefix;
  }
  return null;
}

function preferredBuckets(text: string, allowNutrition: boolean): Bucket[] {
  const buckets: Bucket[] = [];
  if (allowNutrition && /diet|nutrition|food|meal|recipe|fruit|vegetable|omega|eat/.test(text)) {
    buckets.push("nutrition");
  }
  if (/exercise|yoga|tai\s*chi|pilates|walk|stretch|physio|movement|swim|activity|\bactive\b|fitness|gym/.test(text)) {
    buckets.push("wellness");
  }
  if (/communit|support|mental|story|stories|wellbeing|well-being|social|group|peer|carer|family|senior/.test(text)) {
    buckets.push("community");
  }
  if (
    /arthrit|osteo|rheumat|joint|knee|hand|wrist|pain|inflam|gout|psoriatic|medication|medicine|treatment|dmard|methotrexate|biologic|drug|therap/.test(
      text,
    )
  ) {
    buckets.push("arthritis");
  }
  // Site default: clinical arthritis imagery is safer than random food/pilates.
  if (!buckets.includes("arthritis")) buckets.push("arthritis");
  if (/physio|therap|occupational/.test(text) && !buckets.includes("community")) {
    buckets.push("community");
  }
  return buckets;
}

/** Soft synonyms so diet posts match fruit/meal files and clinical posts match joint imagery. */
const TOKEN_SYNONYMS: Record<string, string[]> = {
  diet: ["nutrition", "food", "meal", "fruit", "vegetable", "salad"],
  nutrition: ["diet", "food", "meal", "fruit", "vegetable", "salad"],
  food: ["meal", "fruit", "vegetable", "salad", "diet", "nutrition"],
  foods: ["meal", "fruit", "vegetable", "salad", "diet", "nutrition"],
  meal: ["food", "fruit", "salad", "nutrition", "diet"],
  fruit: ["food", "meal", "salad", "nutrition", "diet"],
  medication: ["arthritis", "rheumatoid", "treatment", "therapy"],
  medicine: ["arthritis", "rheumatoid", "treatment", "therapy"],
  treatment: ["arthritis", "rheumatoid", "therapy", "hand", "knee"],
  dmard: ["rheumatoid", "arthritis", "treatment"],
  methotrexate: ["rheumatoid", "arthritis", "treatment"],
  gout: ["arthritis", "joint"],
  pilates: ["exercise", "wellness", "yoga"],
  exercise: ["pilates", "yoga", "stretch", "walk", "wellness"],
  physio: ["therapy", "physical", "wellness"],
  physiotherapy: ["therapy", "physical", "wellness"],
};

function expandTokens(tokens: Set<string>): Set<string> {
  const out = new Set(tokens);
  for (const t of tokens) {
    for (const syn of TOKEN_SYNONYMS[t] ?? []) out.add(syn);
  }
  return out;
}

function scoreCandidate(
  filename: string,
  tokens: Set<string>,
  preferred: Bucket[],
  allowNutrition: boolean,
): number {
  if (!allowNutrition && NUTRITION_FILENAME_RE.test(filename)) return -1;

  const bucket = bucketOf(filename);
  if (bucket === "nutrition" && !allowNutrition) return -1;

  const expanded = expandTokens(tokens);
  let score = 0;
  const words = filenameTokens(filename);
  for (const w of words) {
    if (tokens.has(w)) score += 3;
    else if (expanded.has(w)) score += 2;
    else {
      for (const t of expanded) {
        if (t.length >= 4 && w.length >= 4 && (t.includes(w) || w.includes(t))) {
          score += 1;
          break;
        }
      }
    }
  }

  if (bucket && preferred.includes(bucket)) {
    // Theme alignment: strong for the primary topic bucket so diet posts
    // actually get nutrition files (filenames rarely contain the word "diet").
    const primary = preferred[0] === bucket;
    score += primary ? 4 : 2;
  }

  return score;
}

export interface ArticleImage {
  src: string;
  alt: string;
  credit: string;
}

/**
 * Topic-matched in-article images for a post.
 *
 * - Index 0 is always the unique cover (`coverImage`) when a slug/seed is given.
 * - Further images are Openverse files whose filenames overlap the post's
 *   title / category / slug / keywords.
 * - Nutrition / fruit stock is only eligible for diet/nutrition posts.
 * - May return fewer than 3 images when strong matches are scarce (better
 *   fewer related figures than unrelated stock).
 */
export function getArticleImages(
  category: string,
  title: string,
  seedKey: string,
  keywords?: string | string[] | null,
): ArticleImage[] {
  const cover = coverImage(category, title, seedKey);
  const text = topicText(category, title, seedKey, keywords);
  const tokens = tokenize(text);
  const allowNutrition = isDietNutritionTopic(category, title, seedKey, keywords);
  const preferred = preferredBuckets(text, allowNutrition);
  const coverFile = cover.src.replace(/^\/openverse\//, "");

  const candidates: { file: string; score: number }[] = [];
  for (const [bucket, files] of Object.entries(CATEGORY_FILES) as [Bucket, string[]][]) {
    if (bucket === "nutrition" && !allowNutrition) continue;
    for (const file of files) {
      if (file === coverFile) continue;
      const score = scoreCandidate(file, tokens, preferred, allowNutrition);
      if (score >= 3) candidates.push({ file, score });
    }
  }

  // Deterministic tie-break via seed hash so SSR/CSR stay stable.
  const h = hashStr(seedKey || title || category || "default");
  candidates.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return ((hashStr(a.file) ^ h) - (hashStr(b.file) ^ h)) | 0;
  });

  const picked: string[] = [];
  for (const { file } of candidates) {
    if (picked.includes(file)) continue;
    picked.push(file);
    if (picked.length >= 2) break;
  }

  // Diet / nutrition posts must reliably show food imagery mid/end-article,
  // even when historical covers were mis-mapped to exercise/clinical stock.
  if (allowNutrition && picked.length < 2) {
    const nutritionPool = CATEGORY_FILES.nutrition.filter(
      (f) => f !== coverFile && !picked.includes(f),
    );
    nutritionPool.sort(
      (a, b) => ((hashStr(a) ^ h) - (hashStr(b) ^ h)) | 0,
    );
    for (const file of nutritionPool) {
      picked.push(file);
      if (picked.length >= 2) break;
    }
  }

  return [cover, ...picked.map(toImg)];
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

/** Test helper: true if a path/filename is nutrition/fruit stock. */
export function isNutritionStockPath(srcOrFile: string): boolean {
  return NUTRITION_FILENAME_RE.test(srcOrFile);
}
