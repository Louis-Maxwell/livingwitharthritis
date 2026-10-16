/**
 * Completion gate for the per-article remediation manifest.
 *
 * A guide may only be "complete" when ALL of these hold:
 *  - 3 or 4 distinct pictures in total (cover included), every one
 *    topic-matched AND licence-verified;
 *  - at least one checked, claim-specific citation with no metadata problems;
 *  - a real named human reviewer with a valid review date.
 * Nothing here can create evidence; it only refuses to accept missing evidence.
 */
import type { Provenance } from './editorialQa';

export const MIN_IMAGES = 3;
export const MAX_IMAGES = 4;

export interface GateImage {
  file: string;
  provenance: Provenance;
  topicMatched: boolean;
}

export interface GateInput {
  images: GateImage[];
  citationCount: number;
  citationIssueCount: number;
  /** Set only by a person who has checked each source supports its claim. */
  citationsClaimChecked: boolean;
  reviewer: string | null;
  reviewedOn: string | null;
}

const PLACEHOLDER = /^(none|null|n\/a|tbc|tbd|unknown|editorial team|)$|ph123456|sarah jennings/i;

export function validReviewer(name: string | null | undefined): boolean {
  const n = (name ?? '').trim();
  return n.length > 1 && !PLACEHOLDER.test(n);
}

export function validReviewDate(d: string | null | undefined, today = new Date()): boolean {
  if (!d || !/^\d{4}-\d{2}-\d{2}$/.test(d)) return false;
  const t = Date.parse(d);
  return !Number.isNaN(t) && t <= today.getTime();
}

export function gateBlockers(g: GateInput, today = new Date()): string[] {
  const out: string[] = [];
  const distinct = [...new Map(g.images.map((i) => [i.file, i])).values()].filter((i) => i.file);
  const good = distinct.filter((i) => i.topicMatched && i.provenance === 'verified-licence');
  if (good.length < MIN_IMAGES) out.push(`images: ${good.length}/${MIN_IMAGES} topic-matched licence-verified`);
  if (distinct.length > MAX_IMAGES) out.push(`images: ${distinct.length} exceeds ${MAX_IMAGES}`);
  if (good.length < distinct.length) out.push('images: some pictures lack topic match or licence record');
  if (g.citationCount === 0) out.push('citations: none recorded');
  if (g.citationIssueCount > 0) out.push(`citations: ${g.citationIssueCount} metadata issue(s)`);
  if (!g.citationsClaimChecked) out.push('citations: not checked claim-by-claim by a person');
  if (!validReviewer(g.reviewer)) out.push('review: no named human reviewer');
  if (!validReviewDate(g.reviewedOn, today)) out.push('review: no valid dated review');
  return out;
}

export type RemediationStatus = 'complete' | 'in-progress' | 'blocked';

export function gateStatus(g: GateInput, today = new Date()): RemediationStatus {
  const b = gateBlockers(g, today);
  if (b.length === 0) return 'complete';
  const anyProgress =
    g.images.some((i) => i.provenance === 'verified-licence' && i.topicMatched) ||
    g.citationCount > 0 ||
    validReviewer(g.reviewer);
  return anyProgress ? 'in-progress' : 'blocked';
}
