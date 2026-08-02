# Collagen Alternatives — new supplements guide

A new page at `/supplements/collagen-alternatives` for people who can't or don't want to take collagen (vegan, vegetarian, halal/kosher, fish or shellfish allergy) and want to know what else has evidence behind it.

## What the page covers

- Quick answer box: there is no vegan "collagen", but several alternatives have comparable or better evidence for joint pain.
- Why someone looks for an alternative: all collagen is animal-derived (bovine, chicken sternum, marine); marine collagen is off-limits with a fish allergy.
- The alternatives, each with dose, evidence strength and honest caveats:
  - Turmeric / curcumin (~1,000 mg/day) — strongest anti-inflammatory evidence
  - Glucosamine sulfate (1,500 mg/day) — most data, mixed results, warfarin caution
  - MSM (1.5–3 g/day) — modest knee OA benefit
  - Omega-3 (fish oil, or algal oil for vegans)
  - Vitamin C + adequate protein to support the body's own collagen synthesis
  - Vitamin D where deficient
  - "Vegan collagen builders" — what they actually are, and why the label overpromises
- What beats every supplement: strength training, weight management, anti-inflammatory diet.
- UK context: NICE NG226 does not recommend oral supplements for osteoarthritis; none of these are prescribed on the NHS.
- FAQ block (8 questions) — is there vegan collagen, best alternative, halal/kosher options, fish-allergy safe choices, what to take instead of collagen for knees, can diet replace supplements, how long to trial, safety with medication.
- Closing CTA linking to the diet guide, exercise hub and the existing collagen page.

## Technical notes

- New file `src/pages/supplements/CollagenAlternatives.tsx`, built on the exact pattern of `src/pages/supplements/Collagen.tsx`: Helmet meta (title, description, keywords, hreflang en-GB, geo, OG, Twitter), `useEffect`-injected JSON-LD, `Header`, `PageBreadcrumb`, `MedicalReviewBadge`, visible last-reviewed date, `AnswerBox`, sectioned prose, `<details>` FAQ list, `Footer`.
- Schema: `MedicalWebPage` (about a Substance set, en-GB, UK MedicalAudience, publisher) + `FAQPage` mirroring the on-page FAQ verbatim + `BreadcrumbList` (Home > Supplements > Collagen alternatives). Injected via `useEffect` and cleaned up on unmount, matching project convention.
- Canonical stays owned by `SeoDefaults` — no per-page canonical tag.
- Register lazy route `/supplements/collagen-alternatives` in `src/App.tsx`.
- Add the card/link to `src/pages/supplements/SupplementsHub.tsx`, plus a cross-link from `Collagen.tsx` ("can't take collagen?").
- Add the route to `scripts/generate-sitemap.ts` and regenerate `public/sitemap.xml`.
- Add a line for the page in `public/llms.txt`.
- Run the production build, then publish.
