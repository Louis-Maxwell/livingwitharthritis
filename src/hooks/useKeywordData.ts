import { useMemo } from "react";
import { taxonomy, contentMap, suggestInternalLinks, expandKeyword } from "@/lib/keyword-clustering";
import type { KeywordTaxonomy, KeywordContentMap } from "@/types/keyword";

/**
 * Static keyword infrastructure hook.
 * No network call — taxonomy is bundled JSON for zero-cost reads.
 */
export function useKeywordData() {
  return useMemo(
    () => ({
      taxonomy: taxonomy as unknown as KeywordTaxonomy,
      contentMap: contentMap as unknown as KeywordContentMap,
      suggestInternalLinks,
      expandKeyword,
    }),
    [],
  );
}
