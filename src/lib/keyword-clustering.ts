import taxonomy from "@/data/keyword-taxonomy.json";
import contentMap from "@/data/keyword-content-map.json";
import type { KeywordTaxonomy, ArticleKeywordMap } from "@/types/keyword";

const TAX = taxonomy as unknown as KeywordTaxonomy;

const LONG_TAIL_MODIFIERS = [
  "best", "how to", "symptoms of", "treatment for",
  "uk", "nhs alternative", "exercises for", "diet for", "2026",
];

/** Expand a head keyword into long-tail variants (used to reach 5k coverage). */
export function expandKeyword(head: string): string[] {
  return LONG_TAIL_MODIFIERS.map((mod) =>
    mod.includes(" for") || mod.includes(" of") || mod === "how to" || mod === "best"
      ? `${mod} ${head}`
      : `${head} ${mod}`,
  );
}

/** Flat list of every head keyword across the taxonomy. */
export function getAllHeadKeywords(): string[] {
  return TAX.categories.flatMap((c) => c.clusters.flatMap((cl) => cl.keywords));
}

/** Find the cluster a given keyword belongs to (case-insensitive). */
export function findCluster(keyword: string) {
  const needle = keyword.trim().toLowerCase();
  for (const cat of TAX.categories) {
    for (const cl of cat.clusters) {
      if (cl.keywords.some((k) => needle.includes(k.toLowerCase()))) {
        return { category: cat, cluster: cl };
      }
    }
  }
  return null;
}

/** Suggest internal links for a draft article based on its primary keyword. */
export function suggestInternalLinks(primaryKeyword: string, limit = 5): ArticleKeywordMap[] {
  const match = findCluster(primaryKeyword);
  if (!match) return [];
  const all = [
    ...((contentMap as unknown as { pillars: ArticleKeywordMap[] }).pillars),
    ...((contentMap as unknown as { clusters_sample?: ArticleKeywordMap[] }).clusters_sample ?? []),
  ];
  return all
    .filter((a) => a.cluster === match.cluster.cluster)
    .slice(0, limit);
}

export { TAX as taxonomy, contentMap };
