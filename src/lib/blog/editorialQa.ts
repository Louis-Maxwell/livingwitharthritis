/**
 * Non-destructive editorial QA heuristics for blog guides.
 *
 * These flags only point a human reviewer at things to check. They never
 * mark a guide reviewed and never say whether the medical content is right.
 */

export interface QaCitation {
  label?: string | null;
  publisher?: string | null;
  url?: string | null;
}

export interface QaPost {
  slug: string;
  title: string;
  category: string;
  content?: string | null;
  citations?: QaCitation[] | null;
  reviewStatus?: string | null;
  reviewed_by?: string | null;
  last_reviewed?: string | null;
}

export interface CitationIssue {
  index: number;
  problem: 'missing-url' | 'invalid-url' | 'not-https' | 'missing-label' | 'missing-publisher' | 'duplicate-url';
}

export function citationIssues(citations: QaCitation[] | null | undefined): CitationIssue[] {
  const issues: CitationIssue[] = [];
  const seen = new Set<string>();
  (citations ?? []).forEach((c, index) => {
    const url = (c.url ?? '').trim();
    if (!url) issues.push({ index, problem: 'missing-url' });
    else {
      let parsed: URL | null = null;
      try {
        parsed = new URL(url);
      } catch {
        issues.push({ index, problem: 'invalid-url' });
      }
      if (parsed && parsed.protocol !== 'https:') issues.push({ index, problem: 'not-https' });
      const key = url.replace(/\/+$/, '').toLowerCase();
      if (seen.has(key)) issues.push({ index, problem: 'duplicate-url' });
      seen.add(key);
    }
    if (!(c.label ?? '').trim()) issues.push({ index, problem: 'missing-label' });
    if (!(c.publisher ?? '').trim()) issues.push({ index, problem: 'missing-publisher' });
  });
  return issues;
}

/** Topics where wrong advice could cause harm; a reviewer should read these first. */
const RISK_PATTERNS: Record<string, RegExp> = {
  medication: /\b(methotrexate|dmard|biologic|steroid|prednisolone|nsaid|ibuprofen|naproxen|opioid|codeine|tramadol|paracetamol|injection|dose|dosage|mg\b)/i,
  supplementDose: /\b\d+\s?(mg|mcg|micrograms?|iu|g)\s?(a|per)\s?day\b/i,
  redFlag: /\b(cauda equina|chest pain|999|a&e|sepsis|hot swollen joint|septic|sudden weakness|numb(ness)? (in|around) (the )?(groin|saddle))\b/i,
  pregnancy: /\bpregnan/i,
  surgery: /\b(surgery|operation|replacement|post-?op)\b/i,
  quantifiedClaim: /\b\d{1,3}\s?(–|-|to)\s?\d{1,3}\s?%|\b\d{1,3}\s?% (less|reduction|fewer|improvement)/i,
  cureLanguage: /\b(cure[sd]?|reverse[sd]?|guarantee[sd]?|miracle|repair(s|ed)? cartilage)\b/i,
};

export function riskFlags(text: string): string[] {
  return Object.entries(RISK_PATTERNS)
    .filter(([, re]) => re.test(text))
    .map(([k]) => k);
}

const PLACEHOLDER_REVIEWER = /^(none|null|n\/a|tbc|)$|ph123456|sarah jennings/i;

/** True only when a named reviewer AND a review date are recorded. */
export function hasDatedReviewEvidence(p: QaPost): boolean {
  const who = (p.reviewed_by ?? '').trim();
  const when = (p.last_reviewed ?? '').trim();
  return !PLACEHOLDER_REVIEWER.test(who) && !Number.isNaN(Date.parse(when));
}

export interface EditorialQaRow {
  slug: string;
  category: string;
  reviewStatus: string;
  citationCount: number;
  citationIssues: CitationIssue[];
  datedReviewEvidence: boolean;
  /** "reviewed" claimed without a named reviewer and date. */
  reviewClaimUnsupported: boolean;
  riskFlags: string[];
  /** Higher = look sooner. Ordering aid only, not a safety verdict. */
  priority: number;
}

export function editorialQaRow(p: QaPost): EditorialQaRow {
  const text = `${p.title} ${(p.content ?? '').replace(/<[^>]+>/g, ' ')}`;
  const flags = riskFlags(text);
  const issues = citationIssues(p.citations);
  const count = (p.citations ?? []).length;
  const status = p.reviewStatus || 'pending';
  const evidence = hasDatedReviewEvidence(p);
  const unsupported = status === 'reviewed' && !evidence;
  const priority =
    flags.length * 2 + (count === 0 ? 3 : 0) + (issues.length > 0 ? 1 : 0) + (unsupported ? 4 : 0);
  return {
    slug: p.slug,
    category: p.category,
    reviewStatus: status,
    citationCount: count,
    citationIssues: issues,
    datedReviewEvidence: evidence,
    reviewClaimUnsupported: unsupported,
    riskFlags: flags,
    priority,
  };
}

/** Licence record from public/openverse/ATTRIBUTION.json. */
export interface AttributionRecord {
  creator?: string;
  license?: string;
  license_url?: string;
  source?: string;
  title?: string;
}

export type Provenance = 'verified-licence' | 'own-or-legacy-unverified' | 'no-record';

/** Verified only when creator, licence URL and a real source URL are all recorded. */
export function provenanceOf(rec: AttributionRecord | undefined): Provenance {
  if (!rec) return 'no-record';
  const ok =
    !!rec.creator?.trim() &&
    !!rec.license?.trim() &&
    /^https:\/\/creativecommons\.org\//.test(rec.license_url ?? '') &&
    /^https?:\/\//.test(rec.source ?? '');
  return ok ? 'verified-licence' : 'own-or-legacy-unverified';
}
