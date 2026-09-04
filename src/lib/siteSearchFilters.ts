export type SearchTopic =
  | "All"
  | "Guides & hubs"
  | "Exercise"
  | "Nutrition"
  | "Health"
  | "Lifestyle"
  | "Supplements"
  | "Treatment"
  | "Finances & Benefits"
  | "Mental Health"
  | "Work & Career"
  | "Conditions"
  | "Other";

export interface SearchCatalogItem {
  id: string;
  title: string;
  href: string;
  excerpt: string;
  topic: SearchTopic;
  /** Approximate body word count for filter UI (hubs use a stable estimate). */
  wordCount: number;
  keywords?: string[];
}

/** Word-count filter buckets shown on /search. */
export type WordCountBucket = "any" | "under1000" | "over1000";

export interface SearchFilterOptions {
  query?: string;
  topic?: SearchTopic | string;
  wordCount?: WordCountBucket;
}

const TOPIC_ALIASES: Record<string, SearchTopic> = {
  all: "All",
  "guides & hubs": "Guides & hubs",
  guides: "Guides & hubs",
  hubs: "Guides & hubs",
  exercise: "Exercise",
  exercises: "Exercise",
  "exercise guides": "Exercise",
  nutrition: "Nutrition",
  diet: "Nutrition",
  health: "Health",
  lifestyle: "Lifestyle",
  supplements: "Supplements",
  treatment: "Treatment",
  treatments: "Treatment",
  "treatment guides": "Treatment",
  "finances & benefits": "Finances & Benefits",
  finances: "Finances & Benefits",
  benefits: "Finances & Benefits",
  pip: "Finances & Benefits",
  "mental health": "Mental Health",
  "work & career": "Work & Career",
  work: "Work & Career",
  conditions: "Conditions",
  other: "Other",
};

export function normalizeTopic(raw: string | undefined | null): SearchTopic {
  if (!raw) return "All";
  const key = raw.trim().toLowerCase();
  return TOPIC_ALIASES[key] ?? (raw as SearchTopic);
}

export function mapBlogCategoryToTopic(category: string | null | undefined): SearchTopic {
  const c = (category || "").trim().toLowerCase();
  if (!c) return "Other";
  if (c.includes("exercise")) return "Exercise";
  if (c.includes("nutrition") || c === "diet") return "Nutrition";
  if (c.includes("supplement")) return "Supplements";
  if (c.includes("treatment")) return "Treatment";
  if (c.includes("finance") || c.includes("benefit") || c.includes("pip")) {
    return "Finances & Benefits";
  }
  if (c.includes("mental")) return "Mental Health";
  if (c.includes("work") || c.includes("career")) return "Work & Career";
  if (c.includes("condition") || c === "symptoms") return "Conditions";
  if (
    c.includes("lifestyle") ||
    c.includes("travel") ||
    c.includes("social") ||
    c.includes("family") ||
    c.includes("sleep") ||
    c.includes("weather")
  ) {
    return "Lifestyle";
  }
  if (
    c.includes("health") ||
    c.includes("prevention") ||
    c.includes("frailty") ||
    c.includes("surgery")
  ) {
    return "Health";
  }
  return "Other";
}

export function wordCountInBucket(count: number, bucket: WordCountBucket): boolean {
  if (bucket === "any") return true;
  if (bucket === "under1000") return count > 0 && count < 1000;
  if (bucket === "over1000") return count >= 1000;
  return true;
}

export function filterSearchCatalog(
  items: SearchCatalogItem[],
  options: SearchFilterOptions = {},
): SearchCatalogItem[] {
  const topic = normalizeTopic(options.topic);
  const bucket = options.wordCount ?? "any";
  const q = (options.query || "").trim().toLowerCase();

  return items.filter((item) => {
    if (topic !== "All" && item.topic !== topic) return false;
    if (!wordCountInBucket(item.wordCount, bucket)) return false;
    if (!q) return true;
    const hay = [item.title, item.excerpt, item.topic, ...(item.keywords || [])]
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
  });
}

export const SEARCH_TOPICS: SearchTopic[] = [
  "All",
  "Guides & hubs",
  "Exercise",
  "Nutrition",
  "Health",
  "Lifestyle",
  "Supplements",
  "Treatment",
  "Finances & Benefits",
  "Mental Health",
  "Work & Career",
  "Conditions",
  "Other",
];
