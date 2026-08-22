export const BLOG_CATEGORY_KEYS = [
  "exercise",
  "nutrition",
  "lifestyle",
  "health",
  "mental-health",
  "supplements",
  "treatment",
  "frailty",
] as const;

export type BlogCategoryKey = (typeof BLOG_CATEGORY_KEYS)[number];

const ALIASES: Record<BlogCategoryKey, string[]> = {
  exercise: ["Exercise", "Exercises", "Exercise Guides"],
  nutrition: ["Nutrition", "Diet"],
  lifestyle: [
    "Lifestyle",
    "Living Well",
    "Family & Relationships",
    "Finances & Benefits",
    "Work & Career",
    "Travel",
    "Social & Leisure",
    "Weather & Season",
    "Sleep",
    "Older Adults",
    "Young Adults",
  ],
  health: ["Health", "Symptoms", "Conditions", "Inflammatory", "Expert Q&A"],
  "mental-health": ["Mental Health"],
  supplements: ["Supplements"],
  treatment: ["Treatment", "Treatments", "Treatment Guides", "Surgery & Recovery"],
  frailty: ["Frailty", "Prevention & Longevity"],
};

const normalise = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const ALIAS_TO_KEY = new Map<string, BlogCategoryKey>();
for (const key of BLOG_CATEGORY_KEYS) {
  ALIAS_TO_KEY.set(key, key);
  for (const alias of ALIASES[key]) ALIAS_TO_KEY.set(normalise(alias), key);
}

export const canonicalBlogCategoryKey = (
  category: string,
): BlogCategoryKey | undefined => ALIAS_TO_KEY.get(normalise(category));

export const blogCategoryAliases = (key: BlogCategoryKey): string[] =>
  ALIASES[key];

/**
 * Every real-world `blog_articles.category` label that belongs to the same
 * hub as one of `categories`, for use in an exact-match `IN` query. Older
 * rows stored some labels in lower case ("exercises", "treatments"), and
 * Postgres `IN` is case-sensitive, so both casings are returned.
 */
export const expandBlogCategoryLabels = (categories: string[]): string[] => {
  const labels = new Set<string>();
  for (const category of categories) {
    const key = canonicalBlogCategoryKey(category);
    for (const label of key ? ALIASES[key] : [category]) {
      labels.add(label);
      labels.add(label.toLowerCase());
    }
  }
  return [...labels];
};
