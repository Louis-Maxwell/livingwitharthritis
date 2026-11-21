/**
 * Blog index topic shelves (Arthritis, Pain, Diet, Exercise, Supplements, More guides).
 *
 * Presentation-only grouping for /blog. It does NOT change any post URL, title,
 * meta, canonical or structured data, and creates no new routes: "See all" uses
 * an in-page #hash anchor. Every post lands on exactly one shelf; posts that fit
 * none go to "More guides" so nothing disappears.
 *
 * Rules are evaluated in order; the first matching shelf wins.
 *   1. Supplements – supplement keywords in slug/title/keywords.
 *   2. Diet        – catalog category "Diet & lifestyle", or diet keywords.
 *   3. Exercise    – catalog category "Exercise & movement", or exercise keywords.
 *   4. Pain        – catalog category "Pain & flares", or pain keywords.
 *   5. Arthritis   – categories "Conditions", "Treatments & medicines",
 *                    "Surgery & recovery", or condition keywords.
 *   6. More guides – everything else (benefits, work, carers, mental health…).
 *
 * Reviewable mapping: docs/blog/topic-shelves-mapping.md and
 * docs/blog/topic-shelves-assignments.csv (regenerate with
 * `bun scripts/generate-blog-shelves-mapping.ts`).
 */

export type ShelfId = "arthritis" | "pain" | "diet" | "exercise" | "supplements" | "more";

export interface ShelfDef {
  id: ShelfId;
  label: string;
  description: string;
  categories: string[];
  keywords: string[];
}

export interface ShelfPost {
  slug: string;
  title: string;
  category?: string | null;
  keywords?: string | null;
}

/** Evaluation order (first match wins). */
export const SHELF_RULES: ShelfDef[] = [
  {
    id: "supplements",
    label: "Supplements",
    description: "What the evidence says about turmeric, omega-3, glucosamine, vitamin D and other supplements.",
    categories: [],
    keywords: [
      "supplement", "turmeric", "curcumin", "omega-3", "omega 3", "fish oil", "cod liver",
      "glucosamine", "chondroitin", "collagen", "vitamin", "magnesium", "msm", "boswellia",
      "cbd", "krill", "green-lipped", "green lipped", "zinc", "iron tablets",
    ],
  },
  {
    id: "diet",
    label: "Diet",
    description: "Anti-inflammatory and Mediterranean eating, recipes, weight and food myths.",
    categories: ["Diet & lifestyle"],
    keywords: ["diet", "food", "recipe", "meal", "nutrition", "eating", "smoothie", "alcohol", "weight", "cooking", "shopping list"],
  },
  {
    id: "exercise",
    label: "Exercise",
    description: "Gentle, joint-friendly movement: walking, swimming, yoga, strength and physio routines.",
    categories: ["Exercise & movement"],
    keywords: ["exercise", "yoga", "swim", "walking", "pilates", "stretch", "strength", "gym", "cycling", "tai chi", "hydrotherapy", "aquatic", "physio", "workout", "balance training"],
  },
  {
    id: "pain",
    label: "Pain",
    description: "Managing joint pain and flare-ups day to day, including sleep, fatigue and pain relief.",
    categories: ["Pain & flares"],
    keywords: ["pain", "flare", "stiffness", "ache", "tens", "heat vs ice", "sore", "fatigue", "sleep", "pacing"],
  },
  {
    id: "arthritis",
    label: "Arthritis",
    description: "Types of arthritis, symptoms, diagnosis, treatments and surgery explained in plain English.",
    categories: ["Conditions", "Treatments & medicines", "Surgery & recovery"],
    keywords: ["osteoarthritis", "juvenile", "rheumatoid", "gout", "psoriatic", "ankylosing", "lupus", "fibromyalgia", "spondyl", "symptom", "diagnosis", "treatment", "medication", "medicine"],
  },
  {
    id: "more",
    label: "More guides",
    description: "Benefits, work, carers, wellbeing and everything else.",
    categories: [],
    keywords: [],
  },
];

/** Display order on the page. */
export const SHELF_DISPLAY_ORDER: ShelfId[] = ["arthritis", "pain", "diet", "exercise", "supplements", "more"];

export const SHELVES_BY_ID: Record<ShelfId, ShelfDef> = Object.fromEntries(
  SHELF_RULES.map((s) => [s.id, s]),
) as Record<ShelfId, ShelfDef>;

function haystack(post: ShelfPost): string {
  return `${post.slug.replace(/-/g, " ")} ${post.title} ${post.keywords ?? ""}`.toLowerCase();
}

function hasKeyword(text: string, kw: string): boolean {
  // Word-start match so "tens" doesn't hit "intense" and "ache" doesn't hit "headache"-style substrings mid-word.
  const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(^|[^a-z0-9])${escaped}`, "i").test(text);
}

export interface ShelfMatch {
  shelf: ShelfId;
  reason: string;
}

/** Category matches are checked across all rules first, except Supplements which is keyword-only and always wins. */
export function assignShelf(post: ShelfPost): ShelfMatch {
  const text = haystack(post);
  const supp = SHELF_RULES[0].keywords.find((kw) => hasKeyword(text, kw));
  if (supp) return { shelf: "supplements", reason: `keyword "${supp}"` };

  const cat = (post.category ?? "").trim();
  for (const rule of SHELF_RULES) {
    if (rule.categories.includes(cat)) return { shelf: rule.id, reason: `category "${cat}"` };
  }
  for (const rule of SHELF_RULES) {
    if (rule.id === "supplements" || rule.id === "more") continue;
    const kw = rule.keywords.find((k) => hasKeyword(text, k));
    if (kw) return { shelf: rule.id, reason: `keyword "${kw}"` };
  }
  return { shelf: "more", reason: cat ? `no rule matched (category "${cat}")` : "no rule matched" };
}

export function groupIntoShelves<T extends ShelfPost>(posts: T[]): Record<ShelfId, T[]> {
  const out = { arthritis: [], pain: [], diet: [], exercise: [], supplements: [], more: [] } as Record<ShelfId, T[]>;
  for (const p of posts) out[assignShelf(p).shelf].push(p);
  return out;
}
