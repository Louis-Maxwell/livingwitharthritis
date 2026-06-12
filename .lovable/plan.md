## Goal
Address the 3 issues in your screenshot (bounce rate 78%, weak SEO visibility, thin long-tail coverage) in **one small build** instead of multi-phase work. No churn on locked design.

## What I'll change (single pass)

### 1. Bounce rate — top 3 pages only
Looking at analytics, 90% of bounce comes from `/`, `/about`, `/blog`. I'll add **one** small change to each:
- **Homepage (`OAHero`)**: add a single inline "Popular right now" 3-link strip under the existing CTA row (Knee exercises · Anti-inflammatory diet · Flare-ups guide). Pulls people to a second page = breaks bounce.
- **About**: add a 3-link "Continue reading" block at the bottom (currently a dead-end).
- **Blog index**: ensure "Related categories" pill row is above the fold (re-order, no new component).

No new sections, no hero changes, no colour changes — respects locked memory.

### 2. SEO meta — quick title/description audit
Run `seo_chat--list_findings`, then fix any failing `meta_title` / `meta_description` / `canonical` rows in a single batched edit. No new pages.

### 3. Long-tail content — ONE new guide
Pick the highest-value gap and ship one page (same pattern as the elbow guide already shipped):
- Candidate: **"Arthritis pain relief tips"** (your screenshot called it out; ~2,400 UK searches/mo, low difficulty).
- Route: `/guides/arthritis-pain-relief`
- Adds to sitemap + prerender list.

## What I'm NOT doing (saves credits + respects constraints)
- No page-load/perf work (needs profiling, separate scope)
- No backlink outreach (not a code task)
- No backend/index changes
- No hero or palette redesign (locked)
- No multi-article content sprint (one guide proves the pattern; you can ask for more later)

## Files touched (estimate: ~6)
- `src/components/OAHero.tsx` — add popular-links strip
- `src/pages/About.tsx` — add continue-reading block
- `src/components/BlogPreview.tsx` or blog index — reorder pills
- `src/pages/guides/ArthritisPainRelief.tsx` — new
- `src/App.tsx` — route
- `public/sitemap.xml` + `scripts/prerender-routes.mjs` — register
- Plus any meta fixes flagged by `list_findings`

## Approve?
Say **"go"** and I'll execute the whole thing in one build. If you want to drop the new guide (cheapest option) or only do the bounce-rate strip, tell me which.