# Visual audit — Phase 1

Sweep of 26 top routes at mobile (375px) and desktop (1440px), 52 screenshots total. No pageerrors on any route.

## P0 — Broken layouts (fix this batch)

### 1. Related-guides card grid collapsed on every stub page ✅ FIXED

**Where:** `src/components/StubPage.tsx` — affects every stub route:
`/guides/newly-diagnosed`, `/guides/arthritis-pain-relief`, `/guides/work-with-arthritis`, `/guides/travel-with-arthritis`, `/guides/insurance-coverage`, `/treatments/drug-guide`, `/treatments/surgery-options`, `/treatments/complementary-therapies`, `/tools/find-specialist`, `/community/connect-groups`, `/events`, and 2 more.

**Symptom:** Cards rendered at ~150px wide with a "shadow notch" behind each, arrows hidden, labels clipped. Rows overlapped vertically.

**Root cause:** A global CSS rule in `src/index.css:192` — `:where(p, li) a:not([class*="btn-"]):not(.no-underline)` — forced `display: inline` on every anchor inside any `<li>` sitewide. That made card anchors ignore their `flex`/`w-full` utilities, so the anchor became narrower than its grid cell and its parent `<li>` failed to size around it. Any anchor-in-list card grid on the site was affected.

**Fix (shipped this turn):**
- Scoped the prose-link underline rule to `.prose` only, and excluded anchors that carry `flex`/`grid`/`block` utility classes. `src/index.css:191–204`.
- Rewrote the Related-guides list in `StubPage.tsx:182–194` to use `role="list"`, `list-none`, `<li className="flex list-none">`, and `<Link className="flex flex-1 …">` so the anchor stretches to its grid cell at every viewport.

## P0 — Suspected but not yet fixed

### 2. Global underline rule may have affected other card grids

The same aggressive selector was almost certainly styling anchors on:
- Blog cards (`/blog`), story cards (`/stories`), pet cards (`/pets`), glossary tiles (`/glossary`)
- Any nav-list or footer link that uses a utility layout

Now that the rule is scoped to `.prose`, these should render correctly by default. **Needs a follow-up spot-check** at mobile/desktop before we close it out.

## P1 — Visual inconsistency (found, not fixed)

### 3. Mobile home: donation quick-bar consumes ~200px above the fold

`/` at 375px shows the donation quick-bar (One-time / Monthly / GBP / £50…£500 / Amount / Arthritis Research / Donate / Zakat Appeal) wrapping across 4 rows and swallowing the top of the viewport before the hero.

**Suggested fix:** Collapse the quick-bar to a single "Donate £X" pill + overflow menu on `<640px`, expand to full pill bar from `sm:` up.

### 4. Home desktop: hero right column is empty

`/` at 1440px — the hero has a two-column grid but only the left column (headline + CTAs) is populated. Right half is a large empty red band. Reads as a broken slot.

**Suggested fix:** Either drop to single column at desktop, or fill the right column with the "clinically aligned" trust badge + a portrait image (the memory says this is the intended pattern).

### 5. Dark-mode toggle visible in header despite "no dark theme" project rule

`/` at 1440px — the sun/moon icon toggle sits next to the language switcher. Project memory (`mem://style/visual-identity`) says the site is white-only, but the toggle implies otherwise.

**Suggested fix:** Remove the toggle from `Header.tsx` (keep the language switcher).

## P2 — Polish (found, not fixed)

- Get-started sticky footer ("Take the symptom quiz | Joint exercises") overlaps the bottom-nav on mobile (~/375px). Needs `bottom-16` instead of `bottom-0` when the mobile bottom-nav is present.
- `/guides/newly-diagnosed` mobile: the progress bar strip "1/5" sits directly above the H1 with no visual breathing room; suggest `mt-6`.
- Multiple pages still use `border-black/10` (project preference is `border-border` token per memory).

## What I need from you before Phase 2

**Fix scope for the next turn:** P0 item 2 (spot-check other card grids after the CSS scope change) is confirmable in ~5 minutes. P1 items 3, 4, 5 are all opinionated — pick which to do and I'll batch them:

- **Item 3** (mobile quick-bar collapse) — 10 min, medium risk
- **Item 4** (home hero right column) — 15 min, needs a design call
- **Item 5** (remove dark-mode toggle) — 2 min, safe

Screenshots for every route are in `/tmp/browser/audit/screenshots/`.
