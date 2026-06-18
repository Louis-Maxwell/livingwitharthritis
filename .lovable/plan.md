## Goal

Lift the 6 keywords showing in your rank tracker (axial spondyloarthritis, glucosamine, gout symptoms, msm, what is gout, rheumatoid arthritis) from low visibility (10% or less) toward page-1 positions by adding dedicated supporting content and tightening existing pages.

## Current state

| Keyword | Existing page | Action |
|---|---|---|
| what is gout | `/conditions/gout` | Strengthen (already targets) |
| gout symptoms | `/conditions/gout` | Strengthen (add deeper symptom section + FAQ) |
| rheumatoid arthritis | `/conditions/rheumatoid-arthritis` | Strengthen (improve title, intro, FAQ) |
| axial spondyloarthritis | `/conditions/ankylosing-spondylitis` | Expand to cover axSpA umbrella + non-radiographic form |
| glucosamine | none | **Create new pillar page** |
| msm | none | **Create new pillar page** |

## What I'll build

### 1. New page: `/supplements/glucosamine`
- Pillar article (~1,500 words) targeting "glucosamine", "glucosamine for arthritis", "glucosamine vs chondroitin", "glucosamine side effects", "glucosamine dosage UK".
- Sections: what it is, evidence for OA, dosage, glucosamine vs collagen, side effects, NHS view, FAQ, MedicallyReviewed badge, JSON-LD MedicalWebPage + FAQPage.
- Internal links to `/conditions/osteoarthritis`, `/diet`, `/conditions/knee-arthritis`.

### 2. New page: `/supplements/msm`
- Pillar article (~1,200 words) targeting "msm", "msm supplement", "msm for joint pain", "msm vs glucosamine", "methylsulfonylmethane benefits".
- Same structural pattern as glucosamine page.
- Cross-link with glucosamine page and OA page.

### 3. New hub: `/supplements`
- Lightweight index linking to glucosamine + msm (plus future turmeric, omega-3, collagen, ginger entries already covered in your project knowledge).
- Adds internal-link equity to the two new pillars.

### 4. Strengthen `/conditions/gout`
- Add a dedicated "Gout symptoms" H2 block with bullet list mirroring the `gout symptoms` query, plus an AEO-style answer paragraph.
- Add 2 FAQ entries: "What are the first signs of gout?", "How do I know if my toe pain is gout?".
- Update metaTitle to lead with "Gout Symptoms, Causes & Treatment (UK Guide)".

### 5. Strengthen `/conditions/rheumatoid-arthritis`
- Tighten meta title/description for the head term.
- Add intro AEO answer ("What is rheumatoid arthritis?") and a "Living with RA in the UK" section to deepen topical authority.

### 6. Expand `/conditions/ankylosing-spondylitis` to cover axSpA
- Rename heading + add section explaining the axial spondyloarthritis umbrella (radiographic = AS, non-radiographic axSpA).
- Add alternateNames: ["Axial spondyloarthritis", "axSpA", "Non-radiographic axSpA"].
- Add FAQ "What's the difference between AS and axial spondyloarthritis?".
- Add 301-style route alias `/conditions/axial-spondyloarthritis` → same page (React Router redirect).

### 7. Plumbing
- Register all new routes in `src/App.tsx`.
- Add new routes to `scripts/prerender-routes.mjs` and `scripts/generate-sitemap.ts` so they're crawlable.
- Add the two supplement slugs to `src/data/keyword-content-map.json` under a new "Supplements" cluster (or extend the existing nutrition cluster) so the rank tracker and internal-link suggester pick them up.
- Add the 6 keywords to `tracked_keywords` if not already there (you already see them, so this is just a verify step).

## Out of scope (ask if you want them)
- Paid Semrush deep dives per keyword (can run if you want intent/SERP confirmation before writing).
- Backlink outreach for the new supplement pages.
- Programmatic city pages for these terms.

## Files to be created
- `src/pages/supplements/Glucosamine.tsx`
- `src/pages/supplements/Msm.tsx`
- `src/pages/supplements/SupplementsHub.tsx`

## Files to be edited
- `src/App.tsx` (routes + redirect)
- `src/pages/conditions/Gout.tsx`
- `src/pages/conditions/RheumatoidArthritis.tsx`
- `src/pages/conditions/AnkylosingSpondylitis.tsx`
- `scripts/prerender-routes.mjs`
- `scripts/generate-sitemap.ts`
- `src/data/keyword-content-map.json`
- `src/components/Footer.tsx` (add Supplements link under resources)

Approve and I'll build it in one pass.
