## Heading hierarchy audit & auto-fix

Add an automated audit for heading order across every route, then fix all violations it surfaces.

### Rules enforced
- Exactly one `<h1>` per page (route-level component).
- First heading on the page is `<h1>`.
- No level skips going down (h1 → h3 is a violation; h3 → h2 is fine).
- Empty headings are violations.
- Applies to static `<h1>`–`<h6>` JSX in route/page components and their child components on that route.

### Deliverables

**1. Static audit script — `scripts/audit-headings.ts`**
- Walks `src/pages/**/*.tsx` and follows imported local components (`@/components/**`, relative imports) one level deep to build the effective heading sequence for each route file.
- Parses JSX with the TypeScript compiler API; records heading level, file, line, and text.
- Skips: `.stories.tsx`, `.test.tsx`, files under `src/components/ui/` (shadcn primitives — headings there are slots), and elements marked `aria-hidden`.
- Reports violations: `no-h1`, `multiple-h1`, `first-heading-not-h1`, `level-skip`, `empty-heading`.
- Writes `audit-headings-report.json` and exits non-zero on any violation.
- Wire up:
  - `package.json` → `"seo:headings": "bun scripts/audit-headings.ts"`
  - `scripts/seo-audit.ts` → run as a required step alongside `seo:images` and `seo:meta-lengths`.

**2. Playwright spot-check (optional, run once locally)**
- Render ~10 representative routes (`/`, `/conditions/osteoarthritis`, a pillar guide, `/exercise-hub`, an exercise page, `/blog`, a blog article, `/site-index`, `/chat`, donation) headless, extract the DOM heading sequence, and cross-check against the static report. Used only to validate the static checker's coverage; not part of CI.

**3. Fixes**
For every violation the static audit reports:
- **multiple-h1** on a page → keep the semantic page title as `<h1>`, downgrade the rest to `<h2>` (preserving Tailwind classes so visual design is unchanged).
- **first-heading-not-h1 / no-h1** → promote the top intro heading to `<h1>` (usually already styled `text-4xl`+), or add a visually-styled `<h1>` matching existing type scale where a page truly lacks one.
- **level-skip** (e.g. `<h2>` → `<h4>`) → relevel the deeper heading to the next valid level, cascading downward siblings so relative structure is preserved.
- **empty-heading** → remove the element or move its wrapper role to a `<div>`.

Design language stays intact: only the heading **tag** changes; className/text/layout are preserved.

### Out of scope
- No copy rewrites beyond removing empty headings.
- No changes to shadcn `ui/` primitives or Radix-rendered headings inside dialogs/sheets.
- No new sections or restructuring of page content.

### Verification
- `bun run seo:headings` → 0 violations.
- `bunx tsgo --noEmit` → green.
- `bun run seo:audit` orchestrator passes end-to-end.

### Technical notes
- Follow-imports depth is capped at 1 to keep the walker fast and deterministic; a route's own file plus its direct local children cover the real heading tree for this codebase (Header/Footer are excluded from the walk since they contain no headings).
- Dynamic headings built via `.map()` are counted once at their source location (matches how `audit-images.ts` already handles dedup).
- Report format mirrors `audit-images-report.json` so tooling stays consistent.
