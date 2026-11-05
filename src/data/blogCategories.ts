/**
 * Blog taxonomy: 9 visitor-led primary categories. Every published post has
 * exactly one (its `category` field holds the label below).
 * Older category keys (/blog/category/health etc.) and editorial labels are
 * kept as aliases so existing URLs and unpublished drafts still resolve.
 */
export const BLOG_CATEGORY_KEYS = [
  "pain-flares",
  "exercise",
  "conditions",
  "benefits-work",
  "diet-lifestyle",
  "treatments",
  "surgery-recovery",
  "carers-family",
  "mental-health-fatigue",
] as const;

export type BlogCategoryKey = (typeof BLOG_CATEGORY_KEYS)[number];

/** Display label stored in each post's `category`. */
export const BLOG_CATEGORY_LABELS: Record<BlogCategoryKey, string> = {
  "pain-flares": "Pain & flares",
  exercise: "Exercise & movement",
  conditions: "Conditions",
  "benefits-work": "Benefits, PIP & work",
  "diet-lifestyle": "Diet & lifestyle",
  treatments: "Treatments & medicines",
  "surgery-recovery": "Surgery & recovery",
  "carers-family": "Carers & family",
  "mental-health-fatigue": "Mental health & fatigue",
};

/** Old category keys (previous taxonomy) -> new key. Used for URL redirects. */
export const LEGACY_BLOG_CATEGORY_KEYS: Record<string, BlogCategoryKey> = {
  nutrition: "diet-lifestyle",
  lifestyle: "diet-lifestyle",
  supplements: "diet-lifestyle",
  health: "conditions",
  "mental-health": "mental-health-fatigue",
  treatment: "treatments",
  frailty: "exercise",
};

const ALIASES: Record<BlogCategoryKey, string[]> = {
  "pain-flares": ["Pain & flares", "Pain", "Flares"],
  exercise: ["Exercise & movement", "Exercise", "Exercises", "Exercise Guides", "Frailty", "Prevention & Longevity"],
  conditions: ["Conditions", "Health", "Symptoms", "Inflammatory", "Expert Q&A"],
  "benefits-work": ["Benefits, PIP & work", "Finances & Benefits", "Work & Career"],
  "diet-lifestyle": [
    "Diet & lifestyle",
    "Nutrition",
    "Diet",
    "Supplements",
    "Lifestyle",
    "Living Well",
    "Travel",
    "Social & Leisure",
    "Weather & Season",
    "Older Adults",
    "Young Adults",
  ],
  treatments: ["Treatments & medicines", "Treatment", "Treatments", "Treatment Guides"],
  "surgery-recovery": ["Surgery & recovery", "Surgery & Recovery"],
  "carers-family": ["Carers & family", "Family & Relationships"],
  "mental-health-fatigue": ["Mental health & fatigue", "Mental Health", "Sleep"],
};

const normalise = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const ALIAS_TO_KEY = new Map<string, BlogCategoryKey>();
for (const key of BLOG_CATEGORY_KEYS) {
  ALIAS_TO_KEY.set(key, key);
  for (const alias of ALIASES[key]) ALIAS_TO_KEY.set(normalise(alias), key);
}
for (const [legacy, key] of Object.entries(LEGACY_BLOG_CATEGORY_KEYS)) {
  if (!ALIAS_TO_KEY.has(legacy)) ALIAS_TO_KEY.set(legacy, key);
}

export const canonicalBlogCategoryKey = (
  category: string,
): BlogCategoryKey | undefined => ALIAS_TO_KEY.get(normalise(category));

export const blogCategoryAliases = (key: BlogCategoryKey): string[] =>
  ALIASES[key];
