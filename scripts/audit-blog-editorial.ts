// Non-destructive audits for every published guide. Changes no content.
//   1. docs/audits/blog-asset-provenance.json — cover + inline pictures per
//      guide, licence/provenance of each, and unused licence-verified files
//      that strictly match the guide's topic (candidates for HUMAN review only).
//   2. docs/audits/editorial-qa.json — citations, source metadata problems,
//      risk flags, dated review evidence, disclaimer per guide.
// Run: bun run scripts/audit-blog-editorial.ts
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs';
import { readAllBlogPosts } from './lib/blog-posts.mjs';
import { isStrictTopicMatch, tailoredDisclaimer } from '../src/lib/blog/articleLayout';
import { coverFromFile, pickArticleImages } from '../src/lib/articleImagePicks';
import { editorialQaRow, provenanceOf, type AttributionRecord } from '../src/lib/blog/editorialQa';

const ATTR: Record<string, AttributionRecord> = JSON.parse(
  readFileSync('public/openverse/ATTRIBUTION.json', 'utf8'),
);
const FILES = readdirSync('public/openverse').filter((f) => /\.(webp|jpe?g|png)$/i.test(f));
const base = (src: string) => decodeURIComponent(src.split('/').pop() ?? '');

// Five high-impact pilot guides (historic top views + layout reference).
const PILOT = [
  'anti-inflammatory-diet',
  'tens-machines-arthritis-uk',
  'shoulder-arthritis-exercises-uk',
  'best-supplements-arthritis-uk',
  'vitamin-d-arthritis-uk',
];

const posts = readAllBlogPosts().filter((p: any) => p.is_published);
const used = new Set<string>();
const assetRows = posts.map((p: any) => {
  const picks = pickArticleImages(coverFromFile(p.cover), p.category, p.title, p.slug, p.keywords);
  const cover = base(picks[0]?.src ?? p.cover ?? '');
  const inline = picks
    .slice(1)
    .filter((i) => isStrictTopicMatch(i.src, p.slug, p.title))
    .map((i) => base(i.src));
  [cover, ...inline].forEach((f) => used.add(f));
  const describe = (file: string) => ({ file, provenance: provenanceOf(ATTR[file]), licence: ATTR[file]?.license ?? null, source: ATTR[file]?.source ?? null });
  return {
    slug: p.slug,
    category: p.category,
    cover: describe(cover),
    inline: inline.map(describe),
    inlineCount: inline.length,
    gap: Math.max(0, 2 - inline.length),
  };
});

// Candidates: licence-verified files that strictly match the topic and are not
// already used anywhere. Never inserted automatically.
for (const row of assetRows as any[]) {
  const p = posts.find((x: any) => x.slug === row.slug);
  row.candidates = row.gap
    ? FILES.filter((f) => !used.has(f) && provenanceOf(ATTR[f]) === 'verified-licence' && isStrictTopicMatch(f, p.slug, p.title)).slice(0, 5)
    : [];
}

const pilot = PILOT.map((slug) => {
  const r: any = assetRows.find((x: any) => x.slug === slug);
  if (!r) return { slug, status: 'not-published' };
  return {
    slug,
    inlineCount: r.inlineCount,
    coverProvenance: r.cover.provenance,
    candidates: r.candidates,
    unresolved: r.gap > 0 && r.candidates.length === 0
      ? `Needs ${r.gap} more on-topic licensed picture(s); no verified file in the library matches.`
      : r.gap > 0 ? 'Candidates listed need a human relevance check before use.' : null,
  };
});

const count = (fn: (r: any) => boolean) => assetRows.filter(fn).length;
const asset = {
  generated: new Date().toISOString().slice(0, 10),
  published: assetRows.length,
  coverProvenance: {
    verifiedLicence: count((r) => r.cover.provenance === 'verified-licence'),
    ownOrLegacyUnverified: count((r) => r.cover.provenance === 'own-or-legacy-unverified'),
    noRecord: count((r) => r.cover.provenance === 'no-record'),
  },
  inline: { three: count((r) => r.inlineCount >= 3), two: count((r) => r.inlineCount === 2), one: count((r) => r.inlineCount === 1), none: count((r) => r.inlineCount === 0) },
  guidesWithCandidates: count((r) => r.candidates.length > 0),
  pilot,
  rows: assetRows,
};

const qaRows = posts
  .map((p: any) => ({ ...editorialQaRow(p), disclaimer: tailoredDisclaimer(p.category, p.title).length > 0 }))
  .sort((a, b) => b.priority - a.priority || a.slug.localeCompare(b.slug));
const qc = (fn: (r: any) => boolean) => qaRows.filter(fn).length;
const qa = {
  generated: asset.generated,
  note: 'Heuristic flags for human reviewers. Not a medical-accuracy verdict; nothing is marked reviewed.',
  published: qaRows.length,
  noCitations: qc((r) => r.citationCount === 0),
  withCitationIssues: qc((r) => r.citationIssues.length > 0),
  reviewedStatus: qc((r) => r.reviewStatus === 'reviewed'),
  datedReviewEvidence: qc((r) => r.datedReviewEvidence),
  reviewClaimUnsupported: qc((r) => r.reviewClaimUnsupported),
  withDisclaimer: qc((r) => r.disclaimer),
  riskFlagCounts: qaRows.flatMap((r) => r.riskFlags).reduce((a: Record<string, number>, f) => ((a[f] = (a[f] ?? 0) + 1), a), {}),
  rows: qaRows,
};

mkdirSync('docs/audits', { recursive: true });
writeFileSync('docs/audits/blog-asset-provenance.json', JSON.stringify(asset, null, 2) + '\n');
writeFileSync('docs/audits/editorial-qa.json', JSON.stringify(qa, null, 2) + '\n');
const { rows: _a, ...aSum } = asset;
const { rows: _q, ...qSum } = qa;
console.log(JSON.stringify({ assets: aSum, editorial: qSum }, null, 2));
