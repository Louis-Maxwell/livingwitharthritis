## Add Polymyalgia Rheumatica & Reactive Arthritis condition pages

Mirror the existing `/conditions/*` pattern (e.g. `Fibromyalgia.tsx`, `Gout.tsx`) so the two new pages are indistinguishable in structure, styling and SEO depth from current pages.

### New files
- `src/pages/conditions/PolymyalgiaRheumatica.tsx`
- `src/pages/conditions/ReactiveArthritis.tsx`

### Routing & discoverability
- Register lazy imports + routes in `src/App.tsx`:
  - `/conditions/polymyalgia-rheumatica`
  - `/conditions/reactive-arthritis`
- Add both routes to `scripts/prerender-routes.mjs` so crawler-readable HTML ships.
- Add both URLs to `public/sitemap.xml`.
- Append concise condition summaries (UK prevalence, key facts, citation policy) to `public/llms.txt`.
- Link from the conditions index/landing list (wherever existing 11 conditions are listed) so users and crawlers can reach them.

### Per-page content (AEO-ready)
Each page includes:
1. Unique `<title>` ≤60 chars and single H1 (e.g. "Polymyalgia Rheumatica: UK Guide, Symptoms & Treatment").
2. `.speakable-intro` 40–60 word plain-English answer paragraph directly under H1.
3. "Key takeaways" `<ul>` (3–5 bullets) covering who it affects, hallmark symptoms, UK treatment pathway.
4. Sections: Overview, Symptoms, Causes & risk factors, Diagnosis (UK/GP pathway), Treatment, Living with it / self-management, When to see a GP, FAQs.
5. UK-specific stats only (NICE / NHS-style figures, no NHS branding per project memory).
6. Internal links to Exercise Hub, Diet Guide, Flare-ups, Self-Help Tool, Waiting List Help.

### JSON-LD schema (via existing `PageSchema` helper in `src/components/seo/PageSchema.tsx`)
- `BreadcrumbList` (Home › Conditions › [Name])
- `MedicalCondition` (name, alternateName, signOrSymptom, riskFactor, possibleTreatment)
- `MedicalWebPage` + `SpeakableSpecification` targeting `.speakable-intro`
- `FAQPage` with 6–8 high-intent UK questions per condition (e.g. "What is polymyalgia rheumatica?", "How long does PMR last?", "Can reactive arthritis come back?", "Is reactive arthritis curable?")
- `Article` with author = Living with Arthritis, publisher logo

### Verification
- Run `node scripts/validate-jsonld.mjs` and `node scripts/check-canonicals.mjs`.
- Spot-check both routes render, title <60 chars, single H1, speakable block present.

### Out of scope
No new components, no Framer Motion, no backend, no design-system changes, no edits to other condition pages.
