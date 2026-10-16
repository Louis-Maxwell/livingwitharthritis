// Builds docs/audits/remediation-manifest.{json,csv} from the two audits.
// Run after: bun run scripts/audit-blog-editorial.ts
// Non-destructive. Reviewer/evidence fields stay empty until a person fills them.
import { readFileSync, writeFileSync } from 'node:fs';
import { gateBlockers, gateStatus } from '../src/lib/blog/remediationGate';

const asset = JSON.parse(readFileSync('docs/audits/blog-asset-provenance.json', 'utf8'));
const qa = JSON.parse(readFileSync('docs/audits/editorial-qa.json', 'utf8'));
const qaBy = new Map(qa.rows.map((r: any) => [r.slug, r]));

const rows = asset.rows.map((a: any) => {
  const q: any = qaBy.get(a.slug);
  const images = [
    { file: a.cover.file, provenance: a.cover.provenance, topicMatched: true },
    ...a.inline.map((i: any) => ({ file: i.file, provenance: i.provenance, topicMatched: true })),
  ];
  const g = {
    images,
    citationCount: q.citationCount,
    citationIssueCount: q.citationIssues.length,
    citationsClaimChecked: false,
    reviewer: null,
    reviewedOn: null,
  };
  const blockers = gateBlockers(g);
  const next = blockers.find((b) => b.startsWith('citations: none')) ? 'Add checked NHS/NICE/primary sources'
    : blockers.find((b) => b.startsWith('images')) ? 'Source licensed on-topic pictures'
    : 'Book dated human clinical review';
  return {
    slug: a.slug,
    priority: q.priority + Math.max(0, 3 - images.length) * 2,
    currentImages: images.length,
    imageTarget: '3-4 incl. cover',
    coverProvenance: a.cover.provenance,
    inlineVerified: a.inline.filter((i: any) => i.provenance === 'verified-licence').length,
    citationCount: q.citationCount,
    citationIssues: q.citationIssues.length,
    citationQuality: q.citationCount === 0 ? 'none' : q.citationIssues.length ? 'metadata-issues' : 'recorded-unchecked',
    reviewStatus: q.reviewStatus,
    datedReviewEvidence: q.datedReviewEvidence,
    pdfDownload: 'text-only-available',
    riskFlags: q.riskFlags.join('|'),
    nextStep: next,
    status: gateStatus(g),
    blockers: blockers.join('; '),
    reviewer: '',
    reviewedOn: '',
    evidence: '',
  };
}).sort((x: any, y: any) => y.priority - x.priority || x.slug.localeCompare(y.slug));

const n = (f: (r: any) => boolean) => rows.filter(f).length;
const noImg = (r: any) => r.currentImages - 1 === 0;
const noCit = (r: any) => r.citationCount === 0;
const coverU = (r: any) => r.coverProvenance !== 'verified-licence';
const noRev = (r: any) => !r.datedReviewEvidence;
const metrics = {
  published: rows.length,
  zeroInlineImages: n(noImg),
  noCitations: n(noCit),
  coverUnverified: n(coverU),
  awaitingReview: n(noRev),
  overlap: {
    noImagesAndNoCitations: n((r) => noImg(r) && noCit(r)),
    noCitationsAndNoReview: n((r) => noCit(r) && noRev(r)),
    allFourGaps: n((r) => noImg(r) && noCit(r) && coverU(r) && noRev(r)),
    anyGap: n((r) => noImg(r) || noCit(r) || coverU(r) || noRev(r)),
  },
  complete: n((r) => r.status === 'complete'),
  inProgress: n((r) => r.status === 'in-progress'),
  blocked: n((r) => r.status === 'blocked'),
  releaseReady: n((r) => r.status === 'complete'),
};
const batch50 = rows.slice(0, 50).map((r: any, i: number) => ({ rank: i + 1, slug: r.slug, nextStep: r.nextStep, blockers: r.blockers }));
writeFileSync('docs/audits/remediation-manifest.json', JSON.stringify({ generated: new Date().toISOString().slice(0, 10), note: 'Status is computed by the gate; it cannot be set by hand.', metrics, batch50, rows }, null, 2) + '\n');
const cols = Object.keys(rows[0]);
const esc = (v: any) => `"${String(v).replace(/"/g, '""')}"`;
writeFileSync('docs/audits/remediation-manifest.csv', [cols.join(','), ...rows.map((r: any) => cols.map((c) => esc(r[c])).join(','))].join('\n') + '\n');
console.log(JSON.stringify(metrics, null, 2));
