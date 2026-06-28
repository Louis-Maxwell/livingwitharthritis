## Goal
Verify the MAP design system (cream `#F8F2EA` bg, MAP red `#EE2737`, Anton uppercase headlines, sharp CTAs, MAP type scale) is applied consistently on every page and template — no leftover blue/indigo accents, no `Inter`/`Poppins` headlines, no rounded-pill primary buttons.

## Audit Method

### 1. Static codebase sweep (`rg`)
Catch hardcoded values that bypass the design tokens:
- Color leaks: `bg-(blue|indigo|purple|emerald|sky|violet|teal)-`, `text-(blue|indigo|...)-`, raw hex like `#[0-9a-f]{6}` outside `index.css`, `bg-white` / `text-black` literals.
- Typography leaks: `font-sans` applied to headings, `font-(serif|mono)` on display copy, hardcoded `Inter`/`Poppins`/`Playfair` references, `text-5xl|6xl|7xl` on non-heading elements that fight the global h1/h2 clamp.
- CTA leaks: `rounded-full` / `rounded-2xl` on `<Button>` or `<a class*="btn-">`, ad-hoc `bg-primary` buttons missing uppercase/tracking.
- Token bypasses: inline `style={{ color: ... }}`, `!important` color overrides.

Output a categorized list of offending files + line numbers.

### 2. Tailwind/CSS token verification
- Re-read `src/index.css` to confirm `--background`, `--primary`, `--foreground`, `--secondary` resolve to MAP values in both `:root` and `.dark`.
- Confirm `tailwind.config.ts` `font-display` → Anton, `font-anton` token present.
- Confirm global `h1`/`h2`/`h3` rules + `.eyebrow`, `.clip-octagon`, `.clip-octagon-soft`, `.band-red`, `.btn-map` are intact.

### 3. Rendered Playwright pass
Boot the running dev server and screenshot a representative slice at 1280×1800:
- `/` (landing)
- `/conditions/osteoarthritis` (condition template)
- `/guides/frailty-management-hub` (guide template)
- `/blog/knee-osteoarthritis-exercises` (blog template)
- `/diet/foods-to-avoid-with-arthritis` (diet template)
- `/exercises` (hub)
- `/about/ai-transparency` (about template)
- `/ai` (AiHub)
- `/donate` and `/contact` (conversion)
- 404 page

For each screenshot, sample computed styles via `page.evaluate`:
- `body` background color → expect `rgb(248, 242, 234)` cream
- First `h1` `font-family` → expect Anton; `text-transform` → uppercase; `font-size` within clamp range
- First primary `button` → `border-radius: 0px`, `text-transform: uppercase`, `background-color: rgb(238, 39, 55)`
- Any element whose color is in the forbidden indigo/blue range — flag

### 4. Report
Produce `docs/MAP-STYLE-AUDIT.md` with:
- Pass/fail per page (color, type, CTA shape, eyebrow usage, octagon imagery)
- Ranked list of files that still need cleanup, grouped by issue class
- Concrete next-edit suggestions (e.g. "replace `rounded-full` on `src/components/X.tsx:42`")

## Out of Scope
- No fixes in this pass — audit only. A follow-up plan will batch the remediations once the offender list is known.
- No content, routing, SEO, or backend changes.

## Verification of the audit itself
- `rg` results captured to file under `/tmp/audit/`.
- All Playwright screenshots saved under `/tmp/browser/map-audit/screenshots/` and referenced in the report.
- Computed-style assertions logged as JSON next to each screenshot.

## Technical Notes
- Pure read-only audit: `rg`, `code--view`, Playwright in headless Chromium.
- Use the running dev server on `localhost:8080`; do not restart.
- Report lives in `docs/` so it's reviewable in the repo and can drive the next remediation plan.
