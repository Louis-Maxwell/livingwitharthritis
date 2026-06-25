# Azathioprine Guide + Internal Link Cluster

The Semrush gap "azathioprine for arthritis" needs both a destination page and inbound internal links from high-authority pages. We'll mirror the existing `SteroidsGuide` pattern.

## 1. New pillar page: `/guides/azathioprine-for-arthritis`

Create `src/pages/pillar/AzathioprineGuide.tsx`, modelled on `SteroidsGuide.tsx`. Sections:

- `AnswerBox` summary (what Azathioprine is, who it's prescribed for, plain English).
- How it works (immunosuppressant / DMARD context).
- Conditions it's used in (RA, lupus, vasculitis, IBD-related arthritis).
- Dosing & how it's taken (general — educational, not prescriptive).
- Monitoring requirements (TPMT testing, regular bloods, infection risk).
- Common & serious side effects.
- Interactions (allopurinol, live vaccines, alcohol).
- Pregnancy & fertility notes.
- FAQ block (FAQPage schema).
- `MedicalReviewBadge` (Maxwell, HCPC PH128483).
- `Citation` block referencing NICE / BNF / NHS public guidance.
- `RelatedArticles` cluster.

Register the route in `src/App.tsx` (lazy import) and add to `public/sitemap.xml`.

## 2. Internal links (the SEO ask)

Add prominent, contextual links — not footer-buried — pointing at the new guide.

| Source page | Where the link goes | Anchor text |
|---|---|---|
| `src/pages/Index.tsx` | New "Medication guides" band (alongside existing Steroids card) | "Azathioprine for arthritis" |
| `src/pages/conditions/RheumatoidArthritis.tsx` | Treatment / DMARDs section | "Azathioprine: how it works, side effects & monitoring" |
| `src/pages/conditions/Lupus.tsx` | Treatment section | "Azathioprine for lupus" |
| `src/pages/conditions/PsoriaticArthritis.tsx` | DMARDs paragraph | "Azathioprine guide" |
| `src/pages/pillar/SteroidsGuide.tsx` | "Related medications" footer block | "Azathioprine (immunosuppressant)" |
| `src/components/Footer.tsx` | Guides column | "Azathioprine" |

Each link uses descriptive anchor text (Google rewards keyword-rich internal anchors) and lives inside body copy or a visible card — not hidden in a long list.

## 3. Schema & metadata

- `Helmet`: title "Azathioprine for Arthritis: Uses, Side Effects & Monitoring | Living With Arthritis UK", description <160 chars, self-referential canonical and `og:url`.
- JSON-LD: `Article` + `MedicalWebPage` + `FAQPage`, with `author.identifier = "HCPC PH128483"` matching the audited BlogPost pattern.
- `lastReviewed` + `reviewedBy` fields.

## 4. Content guardrails

- Educational tone, no dosing recommendations beyond "as prescribed".
- Explicit "speak to your rheumatology team / GP" disclaimers.
- Neutrality: no NHS branding (per project rule), reference "your rheumatology team" / "BNF" / "NICE guidance" generically.
- No AI branding in copy.

## 5. Out of scope

- Writing additional DMARD guides (methotrexate, sulfasalazine, hydroxychloroquine) — flag as a follow-up cluster, don't build now.
- Backend / database changes — none needed.

## Files touched

```text
Created:
  src/pages/pillar/AzathioprineGuide.tsx

Edited:
  src/App.tsx                                       (lazy import + route)
  public/sitemap.xml                                (new URL)
  src/pages/Index.tsx                               (medication band link)
  src/pages/conditions/RheumatoidArthritis.tsx      (DMARD link)
  src/pages/conditions/Lupus.tsx                    (treatment link)
  src/pages/conditions/PsoriaticArthritis.tsx       (DMARD link)
  src/pages/pillar/SteroidsGuide.tsx                (related-medications link)
  src/components/Footer.tsx                         (guides column link)
```

Approve to build.
