## Goal
Completely remove the Finances page from the site.

## Changes

1. **Delete** `src/pages/Finances.tsx`.

2. **`src/App.tsx`** — remove the lazy import (line 109) and the `<Route path="/finances" ...>` (line 381).

3. **`src/components/Footer.tsx`** — remove the "Our Finances" nav link (line 46).

4. **`scripts/prerender-routes.mjs`** — remove `"/finances"` from the prerender list so build doesn't try to render it.

5. **`public/sitemap.xml`** — remove the `/finances` `<url>` entry.

6. **`public/llms.txt`** — remove any `/finances` line.

7. **Internal links pointing to `/finances`** — replace with a sensible neighbour (`/trust` for trust/governance context) or remove entirely, in:
   - `src/pages/AboutUs.tsx`
   - `src/pages/Governance.tsx`
   - `src/pages/ImpactStories.tsx`
   - `src/pages/TermsConditions.tsx`
   - `src/pages/Sitemap.tsx`
   - `src/pages/TrustCredibility.NEW.tsx`
   - `src/components/AboutSection.tsx`
   - `src/components/landing/BlogPreview.tsx`
   - `src/components/landing/HowWeAreFundedSection.tsx`
   - `scripts/audit-word-count.ts` (drop the route from any list)

## Verification
- `rg "/finances"` returns no matches after changes.
- Build succeeds; footer no longer shows "Our Finances"; visiting `/finances` shows the site's NotFound page.

## Question
For the ~9 internal links currently pointing to `/finances`, do you want me to (a) repoint them to `/trust` (governance/transparency lives there), or (b) simply remove those link items? I'll default to **(a) repoint to `/trust`** unless you say otherwise.