/**
 * Semrush UK organic / related keyword metrics for livingwitharthritis.org.uk.
 *
 * Source label: Semrush (never Ahrefs).
 * Volumes are only present when verified from Semrush (MCP, UI, or public overview).
 * Do not invent volumes — if MCP is unblocked, replace keywords-semrush-organic.json
 * and keep this module as the typed loader.
 */
import raw from "./keywords-semrush-organic.json";

export type SemrushMetricSource =
  | "semrush_keyword_magic_uk"
  | "semrush_public_website_overview"
  | "semrush_mcp_execute_report";

export interface SemrushKeywordRow {
  keyword: string;
  /** Semrush UK monthly search volume (Nq). Only real Semrush values. */
  volume: number;
  keywordDifficulty?: number;
  cpc?: number;
  position?: number;
  intent?: string;
  metricSource: SemrushMetricSource | string;
  seed?: string;
  domainContext?: string;
  note?: string;
}

export interface GscRankingQuery {
  keyword: string;
  clicks: number;
  impressions: number;
  ctr: string;
  position: number;
  source: "google_search_console";
  note?: string;
}

export interface SemrushOrganicKeywordsFile {
  source: "Semrush";
  pulledAt: string;
  country: "uk" | string;
  target: string;
  status: string;
  requestedLimit: number;
  counts: {
    rankingKeywordsSemrush: number;
    relatedKeywordsSemrushVerified: number;
    gscQueriesIncluded: number;
    totalSemrushVolumeRows: number;
  };
  blockers: Array<Record<string, unknown>>;
  rankingKeywords: SemrushKeywordRow[];
  relatedKeywords: SemrushKeywordRow[];
  gscRankingQueries: GscRankingQuery[];
  top10ByVolumeSample: SemrushKeywordRow[];
  notes: string[];
}

export const SEMRUSH_ORGANIC_KEYWORDS =
  raw as unknown as SemrushOrganicKeywordsFile;

export function getSemrushKeywordsByVolumeDesc(): SemrushKeywordRow[] {
  return [...SEMRUSH_ORGANIC_KEYWORDS.relatedKeywords].sort(
    (a, b) => b.volume - a.volume,
  );
}
