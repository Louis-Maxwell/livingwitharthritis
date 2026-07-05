import { useEffect, useState } from "react";

export interface KeywordRow {
  keyword: string;
  intent: "informational" | "commercial" | "transactional" | "navigational" | "local";
  category: string;
  cluster: string;
  targetPage: string;
}

/**
 * Lazily fetches the 30,000-keyword dataset from /data/keywords-30000.json.
 * The file is ~5 MB, so it is deliberately served as a static asset and
 * fetched on demand (e.g. by the admin Keyword Strategy dashboard) instead of
 * being imported — importing it would bloat the app bundle for every visitor.
 */
export function useKeywords30k() {
  const [keywords, setKeywords] = useState<KeywordRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/data/keywords-30000.json")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((d: KeywordRow[]) => { if (!cancelled) setKeywords(d); })
      .catch((e) => { if (!cancelled) setError(String(e)); });
    return () => { cancelled = true; };
  }, []);

  return { keywords, loading: keywords === null && error === null, error };
}
