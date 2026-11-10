export const DEFAULT_MIN_IMPRESSIONS: number;
export const MIN_POSITION: number;
export const MAX_POSITION: number;

export type StrikingDistanceRow = {
  query: string;
  clicks: number;
  impressions: number;
  ctr: string;
  position: number;
};

export function parseCsv(text: string): string[][];
export function strikingDistanceQueries(
  csv: string,
  opts?: { minImpressions?: number; minPosition?: number; maxPosition?: number },
): StrikingDistanceRow[];
export function formatStrikingDistance(rows: StrikingDistanceRow[], minImpressions: number): string;
