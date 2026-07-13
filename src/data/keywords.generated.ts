// AUTO-GENERATED loader — the 5000 keyword rows live in `keywords.generated.json`.
// Loading via JSON import avoids TS2590 ("union type too complex") that occurred
// when a 35k-line array literal was contextually typed against `KeywordRow[]`.
// Runtime data is IDENTICAL to the previous inline array.
import raw from "./keywords.generated.json";

export type KeywordIntent =
  | "informational" | "commercial" | "transactional" | "navigational" | "local";

export interface KeywordRow {
  keyword: string;
  intent: KeywordIntent;
  category: string;
  cluster: string;
  targetPage: string;
}

export const GENERATED_KEYWORDS: KeywordRow[] = raw as KeywordRow[];

export default GENERATED_KEYWORDS;
