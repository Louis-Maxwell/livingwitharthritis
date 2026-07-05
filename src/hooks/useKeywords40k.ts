import { useState, useEffect, useCallback } from "react";

/**
 * useKeywords40k — lazy-loads the 40,000-keyword dataset (30K original +
 * 10K new organic long-tail terms added July 2026) from a static JSON
 * asset rather than bundling it into the JS chunk.
 *
 * Mirrors the existing useKeywords30k pattern exactly, so it drops into
 * the same admin dashboard code with no other changes needed.
 */

export interface KeywordRecord {
  keyword: string;
  category: string;
  target_page: string | null;
  source: string;
  intent: "organic" | "paid";
}

interface UseKeywords40kResult {
  keywords: KeywordRecord[];
  loading: boolean;
  error: string | null;
  reload: () => void;
  byCategory: Record<string, KeywordRecord[]>;
  totalCount: number;
}

const CACHE_KEY = "lwa_keywords_40k_cache_v1";

export function useKeywords40k(): UseKeywords40kResult {
  const [keywords, setKeywords] = useState<KeywordRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Serve from in-memory session cache on repeat visits within a tab.
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        setKeywords(JSON.parse(cached));
        setLoading(false);
        return;
      }
      const res = await fetch("/data/keywords-40000.json");
      if (!res.ok) throw new Error(`Failed to load keyword dataset: ${res.status}`);
      const data: KeywordRecord[] = await res.json();
      sessionStorage.setItem(CACHE_KEY, JSON.stringify(data));
      setKeywords(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error loading keywords");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const byCategory: Record<string, KeywordRecord[]> = {};
  for (const k of keywords) {
    (byCategory[k.category] ??= []).push(k);
  }

  return { keywords, loading, error, reload: load, byCategory, totalCount: keywords.length };
}

export default useKeywords40k;
