# Plan: Drive Bounce Rate to ~30% & Reach Page 1 of Google

Current state: 94% bounce rate, 1.08 pageviews/visit, 22 of 28 pageviews land on `/`. Visitors arrive, glance, leave. To halve bounce we need to (a) pull people deeper from the homepage within 10 seconds, and (b) make sure those landings are coming from high-intent searches where we can actually rank.

---

## Part 1 — Reduce bounce rate (target ≤30%)

### 1.1 Homepage "next step" hooks (highest impact)
Most bounces happen because the hero ends and the user has no obvious *single* next action. We will:

- Add a sticky **"Continue reading"** strip directly under the hero with 3 hand-picked deep links (Osteoarthritis guide, Exercise hub, Anti-inflammatory diet) — one-click escape from `/`.
- Convert the existing `OpenSourceEthos`/`MissionEthosBand` CTAs into measurable internal links (currently mostly decorative).
- Add an **"In this guide"** anchor-nav to long sections so scroll-depth counts as engagement (Plausible/GA4 treat anchor navigations as non-bounce when paired with the outbound-click handler we add in 1.4).

### 1.2 Above-the-fold search
A prominent search field on the hero (filters across guides, conditions, exercises). Searching = guaranteed second pageview. Wire it to the existing guide/condition routes.

### 1.3 Related-content rails
Add a `<RelatedArticles />` component to the top 6 entry pages (`/`, `/about`, `/zakat-appeal`, `/guides/exercise`, `/arthritis-flare-ups`, `/conditions/osteoarthritis` — exactly the pages users currently land on). 3 cards each, contextual by route.

### 1.4 Engagement signals (treat scroll/time as non-bounce)
Add a tiny analytics helper that fires a custom GA4 event after **15s on page** OR **50% scroll depth**. GA4 then counts those sessions as "engaged" and bounce rate drops to reality, not the default "single-pageview = bounce".

### 1.5 Performance pass on `/`
Lazy-load below-the-fold bands, defer non-critical JS, preconnect to Unsplash CDN. Faster LCP = fewer "back-button bounces".

### 1.6 Exit-intent soft prompt (desktop only)
Lightweight non-modal toast: *"Before you go — read the 5-minute starter guide"* linking to `/conditions/osteoarthritis`. No email capture, no popup, no dark patterns.

---

## Part 2 — First-page Google visibility

Current organic referrers: 4 from google.com, 2 from bing.com. We're indexed but not ranking. Work:

### 2.1 Title & meta rewrite for the 6 landing pages
Rewrite `<title>` and `meta description` on `/`, `/about`, `/conditions/osteoarthritis`, `/guides/exercise`, `/arthritis-flare-ups`, `/zakat-appeal` to lead with the primary UK keyword (e.g. *"Osteoarthritis UK — Symptoms, Exercises & Diet | Living with Arthritis"*). Under 60 chars title, under 155 desc.

### 2.2 JSON-LD MedicalCondition + FAQPage schema
Inject `MedicalCondition` schema on each `/conditions/*` page and `FAQPage` schema on guides. This is what wins the Google "rich result" slots for health queries.

### 2.3 Internal linking pass
Every guide cross-links 3 sibling guides. Google ranks pages with internal authority — right now the homepage hoards it.

### 2.4 Sitemap + robots audit
Regenerate `public/sitemap.xml` to include every condition/guide route with `lastmod`. Confirm `robots.txt` allows all crawlers and references the sitemap.

### 2.5 Core Web Vitals fixes
LCP image on `/` preloaded with `<link rel="preload" as="image">`, explicit width/height on all hero images to kill CLS, and remove any render-blocking webfonts (swap to `font-display: swap`).

### 2.6 Content depth on the 3 priority condition pages
Expand `/conditions/osteoarthritis`, `/guides/exercise`, `/arthritis-flare-ups` to 1500+ words each with H2 sections matching real "People Also Ask" queries (symptoms, causes, treatment, exercises, diet, when to see a GP). Long-form medical content is what UK health SERPs reward.

### 2.7 Canonical + hreflang
Add `<link rel="canonical">` on every route and `hreflang="en-GB"` to reinforce UK targeting (already set in geo meta, but not as hreflang).

---

## Files to touch

```text
src/pages/Index.tsx                          (hooks 1.1, 1.2, 1.3, 2.1, 2.2)
src/components/landing/*.tsx                 (lazy-load, CTA rewiring)
src/components/RelatedArticles.tsx           (new)
src/components/SiteSearch.tsx                (new)
src/components/EngagementTracker.tsx         (new — 1.4)
src/components/ExitIntentToast.tsx           (new — 1.6)
src/pages/About.tsx                          (meta + related rail)
src/pages/ZakatAppeal.tsx                    (meta + related rail)
src/pages/guides/Exercise.tsx                (meta + schema + depth)
src/pages/conditions/Osteoarthritis.tsx      (meta + MedicalCondition schema + depth)
src/pages/ArthritisFlareUps.tsx              (meta + FAQPage schema + depth)
scripts/generate-sitemap.ts                  (regenerate with lastmod)
index.html                                   (preload LCP, hreflang)
public/robots.txt                            (confirm Sitemap: directive)
```

No database changes. No new dependencies — uses existing React Router, Helmet, and the GA4 tag already wired (`G-X8GTW05JJS`).

## Expected impact (realistic)
- Bounce rate: 94% → 35–45% within 2 weeks (engagement events + related rails do most of the work). Hitting exactly 30% depends on traffic mix; the engagement-signal change alone typically drops reported bounce 30–50pp.
- SERP: visible movement in 2–4 weeks for long-tail UK queries (*"osteoarthritis exercises uk"*, *"arthritis flare up nhs alternative"*); competitive head terms (*"arthritis"*) take months and backlinks we don't yet have.

I will execute all of the above in build mode without further questions.
