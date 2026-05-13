## Goal

Ship a long-tail myth-busting article: **"Do Knuckle or Toe Cracking Cause Arthritis?"** — UK-targeted, evidence-led, follows the existing `MediterraneanDietForArthritis.tsx` pattern.

## Route + URL

`/myths/does-cracking-knuckles-cause-arthritis`

- New top-level `myths/` namespace — sets up the pattern for future myth pages (nightshades, weather, cracking joints, exercise wears joints out, etc.).
- Slug uses the highest-volume question phrasing UK users actually search.

## File

**Create:** `src/pages/myths/DoesCrackingKnucklesCauseArthritis.tsx`

Mirrors the structure of `MediterraneanDietForArthritis.tsx`:
- `SeoHead` with title (≤60), meta description (≤160), canonical
- `useEffect`-injected JSON-LD: `MedicalWebPage` + `FAQPage` + `BreadcrumbList`
- `PageBreadcrumb` (Home › Myths › this page)
- `PageHero` with hero image
- `MedicallyReviewed` reviewer chip
- Sections (H2 outline below)
- Internal links to existing pages: Osteoarthritis, Hand exercises section of Exercise Hub, Self-Help Tool, Flare-ups page

## Content outline (H2s)

1. **The short answer** — TL;DR card, plain English: no, cracking your knuckles or toes does not cause arthritis. The "pop" is gas bubbles in synovial fluid, not damage.
2. **What's actually happening when a joint cracks** — synovial fluid + tribonucleation; the 2015 real-time MRI study (Kawchuk et al., *PLOS ONE*).
3. **Knuckle cracking and arthritis: what the evidence says** — Castellanos & Axelrod 1990 (300 people, no link); Deweber 2011 (215 people, no link); 2017 Harvard cohort. Plain-English summary table.
4. **Toe cracking specifically** — less studied than knuckles; same mechanism; no evidence of arthritis link; flag when toe cracking *plus* pain/stiffness can hint at hallux rigidus or bunion-related joint changes (different cause, not from the cracking).
5. **What can it cause?** — possible (mild) link to reduced grip strength + soft-tissue swelling in chronic crackers (Castellanos); not arthritis.
6. **When cracking is a red flag** — pain, swelling, locking, loss of motion, morning stiffness >30 min → see a GP. Link to Osteoarthritis and Flare-ups pages.
7. **What actually causes arthritis** — quick myth-vs-reality block: age, genetics, prior injury, repetitive occupational load, obesity, autoimmune drivers. Link to `/conditions/osteoarthritis`.
8. **What to do instead if you crack out of habit** — fidget alternatives, hand mobility routine, stress decompression. Link to Exercise Hub hand section + Self-Help Tool.
9. **FAQ** (FAQPage schema): "Does cracking knuckles give you big knuckles?", "Why do my joints crack more as I get older?", "Is it bad to crack your back or neck?", "Can children safely crack their knuckles?", "Does cracking toes cause bunions?"
10. **Sources** — linked citations to the studies above (external `<a target="_blank">` per project rules).

## SEO targeting

- **Primary keyword:** "does cracking your knuckles cause arthritis" (and variants)
- **Title (≤60):** `Does Cracking Knuckles Cause Arthritis? UK Evidence Guide`
- **Meta description (≤160):** plain-English answer + reviewer credibility cue
- **Canonical:** absolute `https://www.livingwitharthritis.org.uk/myths/...`
- **JSON-LD:** `MedicalWebPage` (about: knuckle cracking myth), `FAQPage`, `BreadcrumbList`

Volume validation step (run during build, not now): quick `semrush--keyword_compare` on `"does cracking your knuckles cause arthritis"`, `"is cracking your knuckles bad"`, `"does cracking toes cause arthritis"` — confirms slug + H1 wording. If "is cracking your knuckles bad" is materially larger, fold it into H1 + first paragraph rather than changing the slug.

## Wiring

**Edit:**
- `src/App.tsx` — register route `/myths/does-cracking-knuckles-cause-arthritis`
- `public/sitemap.xml` — add `<url>` entry, `priority=0.7`, `changefreq=monthly`, today's `lastmod`
- `src/pages/Index.tsx` *(optional, low priority)* — surface in any "Myths & facts" or related-content area if one exists; otherwise skip
- Add an internal link to the new page from `src/pages/conditions/Osteoarthritis.tsx` in a "Common myths" callout (if file structure permits — verify on first read in build mode)

## Editorial voice

- Direct UK plain English (per project memory)
- "MedicallyReviewed" component at top
- Use bold/italic emphasis for studies and key numbers
- No alarm; the goal is reassurance + next steps
- Strict neutrality: cite peer-reviewed sources only, no opinion-based blogs

## Out of scope

- No new `/myths` index/hub page yet (we'll add when there are 3+ myth articles)
- No new images generated — reuse an existing hand/joint Unsplash photo from the centralised list
- No blog post; this is a long-tail SEO landing page, not a `/blog/...` entry

## Files

**Create**
- `src/pages/myths/DoesCrackingKnucklesCauseArthritis.tsx`

**Edit**
- `src/App.tsx`
- `public/sitemap.xml`
- `src/pages/conditions/Osteoarthritis.tsx` *(small "Common myths" link, if file allows)*
