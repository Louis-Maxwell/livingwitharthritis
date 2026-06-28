## Goal
Lift pages/session (currently 1.15, bounce 88%) by ensuring every `/guides/*` page ends with two onward-journey blocks: **Related guides** (peer pillar pages in the same cluster) and **Next read** (curated next article).

## Scope: 23 guide routes
Already wrapped in `GuideLayout` (gets `NextReadStrip` automatically, but no Related-guides block):
- frailty-management-hub, sarcopenia-muscle-loss, preventative-msk-health, bone-density-osteoporosis, fall-prevention-older-adults, musculoskeletal-health, disability-support, newly-diagnosed

Standalone guide pages with NO Header/Footer/NextRead/Related blocks:
- uk-arthritis, health-services, diet, exercise, arthritis-pain-relief, can-exercise-make-osteoarthritis-worse, benefits-pip, knee-replacement-surgery, steroids-for-arthritis, azathioprine-for-arthritis, febuxostat-for-gout, painkillers-and-nsaids

Stubs (insurance-coverage, work-with-arthritis, travel-with-arthritis): include in same layout pass.

## Approach

### 1. New component `src/components/guides/RelatedGuidesBlock.tsx`
Takes `currentPath` and renders a 3-card grid of peer guides drawn from a typed registry. Cards: title, 1-line description, eyebrow cluster label, arrow CTA. Uses existing design tokens (white bg, black text, red accent), `aria-label`, semantic `<nav>`.

### 2. New registry `src/lib/guideRegistry.ts`
Single source of truth for all 23 guides:
```ts
{ path, title, description, cluster: 'medication'|'msk'|'lifestyle'|'support'|'surgery' }
```
`getRelatedGuides(currentPath, limit=3)` returns peers in the same cluster, falling back to cross-cluster top picks if fewer than 3.

### 3. Extend `GuideLayout`
Render `<RelatedGuidesBlock currentPath={...} />` directly above the existing `<NextReadStrip />`. Order on page: article content → Related guides → Next read → Footer. This gives two distinct onward CTAs (peer pillars vs. mixed content).

### 4. Route the 12+ standalone guides through `GuideLayout`
Wrap them in `App.tsx` exactly like the 8 already converted, so they inherit Header, Footer, Related guides and Next read in one move. Remove the now-duplicate Header/Footer JSX from each standalone guide page body to avoid double chrome.

### 5. QA
- Visit 3 representative guides in Playwright (medication, lifestyle, support) → screenshot to confirm both blocks render and links resolve.
- Verify no duplicated Header/Footer.
- Spot-check no console errors and that lazy chunks still load.

## Out of scope
- Visual redesign of guide bodies.
- New content writing — registry uses each guide's existing title/description.
- Condition / blog / exercise pages (separate templates already have related links).

## Expected impact
Two onward links per page lift pages/session from ~1.15 toward 1.6–2.0 on guide entries, and reduce single-page exits on the highest-intent pillar URLs.
