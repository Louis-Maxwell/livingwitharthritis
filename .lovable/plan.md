# Wave 2 — AEO, Schema & LLM-readiness for remaining priority routes

Extend the AEO/AI-visibility pattern already applied to `BenefitsPIPGuide`, `ArthritisFlareUps`, and `ExerciseHub` to the rest of the high-intent pages. Same proven pattern: 40–60 word "answer paragraph" under H1, `FAQPage` JSON-LD, breadcrumbs, condition/medical schema, speakable spec, plus an LCP preload on the homepage.

## Scope (pages to upgrade)

**Pillar guides** (high keyword value, missing FAQ/breadcrumb schema):
- `src/pages/pillar/UKArthritisGuide.tsx`
- `src/pages/pillar/DietGuide.tsx`
- `src/pages/pillar/ExerciseGuide.tsx`
- `src/pages/pillar/HealthServicesGuide.tsx`

**Condition pages** (11 — add `MedicalCondition` + `FAQPage` + breadcrumbs + speakable intro):
- Osteoarthritis, RheumatoidArthritis, PsoriaticArthritis, Gout, AnkylosingSpondylitis, JuvenileArthritis, Fibromyalgia, Lupus, KneeArthritis, HandArthritis, ShoulderArthritis

**Diet / Exercise / Myths long-form:**
- `src/pages/diet/MediterraneanDietForArthritis.tsx` — `Article` + `FAQPage` + `HowTo` (sample day) + speakable
- `src/pages/exercises/TaiChiForArthritis.tsx`, `TaiChiForBalance.tsx`, `TaiChiForBeginners.tsx`, `SeatedTaiChiForArthritis.tsx` — `HowTo` + `FAQPage` + breadcrumbs
- `src/pages/myths/DoesCrackingKnucklesCauseArthritis.tsx` — `ClaimReview` + `FAQPage`

**Tool / support hubs:**
- `src/pages/tools/WaitingTimeCalculator.tsx` — `HowTo` + `FAQPage`
- `src/pages/WaitingListHelp.tsx` — `FAQPage` + breadcrumbs
- `src/pages/SelfHelpTool.tsx` — `FAQPage` + breadcrumbs

## Per-page pattern (deterministic, no new components)

1. Add a `.speakable-intro` 40–60-word answer paragraph directly under H1, in plain English, answering the page's primary query.
2. Add a "Key takeaways" `<ul>` (3–5 bullets) above the first deep section on long-form pages.
3. Inject JSON-LD via the project's existing `useEffect` pattern (per memory — never via Helmet) with a unique `id` per schema so cleanup works:
   - `BreadcrumbList` on every page
   - `FAQPage` built from the 5–8 most-searched questions for that topic
   - `MedicalCondition` on each condition page (name, alternateName, signOrSymptom, riskFactor, possibleTreatment, epidemiology — UK figures only)
   - `MedicalWebPage` + `SpeakableSpecification` (cssSelector `.speakable-intro`) on guides/conditions/diet
   - `HowTo` on Tai Chi pages and waiting-time calculator
   - `Article` + `speakable` on Mediterranean diet and myths page
4. Tighten any `<title>` over 60 chars discovered during the edit.

## Homepage LCP preload

In `index.html`, add `<link rel="preload" as="image" href="<OAHero image URL>" fetchpriority="high" imagesrcset="…">` for the hero image used in `OAHero`. Confirm `font-display: swap` is already set (it is — leave fonts alone unless verification fails). No `Index.tsx` logic changes.

## Prerender list

`scripts/prerender-routes.mjs` already covers all the above routes, so no additions needed — just confirm during the edit pass.

## Out of scope (explicitly NOT in this wave)

- No copy from competitors; FAQ questions sourced from existing on-page content + UK search-intent patterns
- No `/admin`, `/auth`, `/chat` sitemap changes
- No new React components, no design changes, no Framer Motion, no Helmet refactors
- No backend / Supabase / edge-function changes
- No new images generated (preload uses existing hero asset)

## Technical notes

- All JSON-LD injected via `useEffect` with `document.createElement("script")`, unique `id`, and a cleanup `return` — matches the established pattern in `Index.tsx` and `BenefitsPIPGuide.tsx`.
- UK English throughout; "for everyone" phrasing; no "NHS" references; no "AI" branding in user-facing copy.
- Colour tokens untouched (white bg, black text, red accents preserved).
- Verification: after edits, run `node scripts/validate-jsonld.mjs` against the changed routes and `node scripts/check-canonicals.mjs` to confirm no duplicate canonicals.

## Delivery

One build pass, ~22 file edits + 1 `index.html` preload edit. No new dependencies.
