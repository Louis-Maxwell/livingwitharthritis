## The benchmarking gap

Semrush UK database, livingwitharthritis.org.uk vs versusarthritis.org:

| Metric | You | Versus Arthritis | Gap |
|---|---|---|---|
| Organic keywords | 49 | 323 | 6.6× |
| Est. organic traffic | 0/mo | 498/mo | — |
| Authority Score | 0/100 | 32/100 | 32 pts |
| Referring domains | 3 | 9,811 | 3,270× |

Authority Score 0 means new pages take months to rank — that's why even strong content isn't pulling traffic yet. The fastest unlock is **targeting the specific high-traffic pages competitors own** with better, more current versions, while we build authority in parallel.

## What I'll build

### 1. Five competitor-gap pages (highest traffic concentration on versusarthritis.org)

Each follows the existing pillar template (AnswerBox, FAQPage schema, MedicalReviewBadge, internal cluster links):

1. `/treatments/drugs/azathioprine` — competitor's #1 traffic page (33.7% share, pos 8). We already have `AzathioprineGuide`; promote it into the `/treatments/drugs/` namespace with stronger schema + redirect old slug.
2. `/treatments/drugs/steroids-for-arthritis` — 14 keywords, pos 2 for competitor.
3. `/treatments/drugs/febuxostat-gout` — 3 keywords, pos 2 (gout/uric acid intent — a cluster we don't own).
4. `/treatments/painkillers-and-nsaids` — 6 keywords, branded pain-relief intent.
5. `/exercises/neck-arthritis-exercises` — already shipped last turn; cross-link into this cluster and add a sibling `/exercises/foot-and-ankle-arthritis-exercises` (matches competitor's foot/ankle surgery traffic with a conservative-care angle).

### 2. Authority-building fixes (close the AS 0 → meaningful score gap)

- Add `sameAs` links to Maxwell's HCPC register + LinkedIn in the existing `Person` JSON-LD (medical-authors.json) — biggest E-E-A-T signal we're missing.
- Add `citation` arrays to the 5 new pages pointing at NICE/Cochrane/PubMed — Google uses these for medical YMYL trust.
- Add `MedicalCondition` schema cross-references between the new drug pages and existing condition pages (gout ↔ febuxostat, RA ↔ azathioprine, etc.).

### 3. Internal link mesh

Update `src/lib/relatedClusters.ts` so each new drug page links to: (a) the condition it treats, (b) sibling drugs, (c) the relevant exercise/diet pillar. This is the lever that lifted versusarthritis.org's steroids page from 1 keyword to 14.

### 4. Sitemap + rescan

- Register all new routes in `src/App.tsx`.
- Add to `public/sitemap.xml` with current `lastmod`.
- Trigger an SEO rescan so the platform re-benchmarks.

## Out of scope (need separate decisions)

- **Backlinks (3 → 9,811 gap)** — can't be solved in code. Needs an outreach plan; happy to draft one separately.
- **Paid-search benchmarking** — would need the Semrush connector wired into the app.
- **Live competitor monitoring dashboard** — same; flag if you want it.

## Technical notes

- All new pages use existing `BlogPost`/pillar templates, `MedicalReviewBadge`, `SeoDefaults`, and the FAQ/HowTo JSON-LD helpers in `src/lib/jsonLd.ts` — no new dependencies.
- Drug pages carry a clear "not medical advice — consult prescriber" disclaimer (matches existing tone, satisfies YMYL).
- No copy mentioning NHS, per project memory.
- Old `/blog/azathioprine-guide` URL gets a 301 entry in `src/data/blogRedirects.ts`.

Approve and I'll implement, then trigger the SEO rescan.