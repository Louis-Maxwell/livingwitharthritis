# Finish "Give monthly" fix + sitemap/links + founder story a11y

## Accessibility validation result (moved founder story on /about)

Checked `FounderStoryBand` in its new home on the About page:

- **Headings: pass.** About has exactly one `<h1>` (via `PageHero`), and the
  story section uses an `<h2>` with a matching `aria-labelledby`
  (`founder-story-heading`). Heading order is intact.
- **Link targets: pass.** "Meet the team" (`#team`) matches
  `id="team"` on the Team section; "Read our clinical policy" points to the
  existing `/editorial-standards` route.
- **Focus states: pass.** Global `:focus-visible` outlines in `index.css`
  cover links and buttons; both CTAs have visible accessible names and
  `aria-hidden` icons.
- **Two minor issues found (will fix):**
  1. `FounderStoryBand.tsx` contains two corrupted em dashes (`â€"`) from a
     bad encoding — replace with proper `—`.
  2. The `#team` anchor jump scrolls but doesn't move keyboard focus — add
     `tabIndex={-1}` and `scroll-mt-24` to the Team section so keyboard and
     screen-reader users land on it properly.

## Remaining items from the approved plan

1. **"Give monthly" recurring wiring (state edits already applied):**
   - `src/pages/ZakatAppeal.tsx`: forward the giving-card id —
     `onGive={(amount, source) => handleGive(amount, source)}` — and pass
     `recurring={isRecurring}` to `StripeDonationModal` (reset on close).
2. **Sitemap:** run `bun scripts/generate-sitemap.ts` to regenerate
   `public/sitemap.xml` from current routes (auto-discovers `/about`; no
   founder-specific entries exist).
3. **Dead homepage anchors:** add missing ids so `/#conditions`, `/#donate`,
   and `/#involved` links resolve:
   - `ConditionPillBand.tsx` section → `id="conditions"`
   - `DonationImpactSection.tsx` section → `id="donate"`
   - `HowYouCanHelp.tsx` section → `id="involved"`

## Technical details

- Files: `src/pages/ZakatAppeal.tsx`, `src/pages/AboutUs.tsx` (team section
  attributes), `src/components/landing/FounderStoryBand.tsx` (encoding fix),
  `src/components/landing/{ConditionPillBand,DonationImpactSection,HowYouCanHelp}.tsx`,
  regenerated `public/sitemap.xml`.
- Verification: production build + typecheck, then resolve monitoring finding
  `ee654c07-cd40-58d7-9668-89e498b9e978` as fixed.
