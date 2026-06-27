# Plan: Retain visitors 3–4 minutes via blog reading & interaction

**Goal:** Raise median session duration from ~50–70s to 180–240s. Measured via GA4 `engaged_session` (already fires at 10s) plus new `engagement_180s` and `engagement_240s` events.

---

## 1. Reading experience upgrades (`src/pages/BlogPost.tsx`)

Goal: keep readers *on the article* longer.

- **Reading time + progress** — show "8 min read" pill in the article header (already have `ScrollProgress`; expose the % to the header too).
- **Sticky in-article TOC** (desktop right rail, collapsible on mobile) generated from `<h2>`/`<h3>` headings. Anchors scroll-smooth, highlight active section. Drives users to scroll instead of bouncing.
- **"Key takeaways" AnswerBox at top** — 3-bullet TL;DR. Counter-intuitively *raises* dwell time because users commit to reading once they see the payoff.
- **Pull-quotes every 3–4 paragraphs** — visual breaks reduce wall-of-text bounce.
- **Inline "Did this help?" mini-poll** (👍 / 👎 + optional one-line text) at ~60% scroll. Fires `article_feedback` GA4 event. Adds 5–15s of interaction.

## 2. Interactive widgets inside articles

Insert by article category, not on every post.

- **Symptom severity slider** on condition pages — outputs a personalised "what to try first" card (reuses existing `JointSelector` patterns).
- **"Find an exercise for your joint" inline picker** on movement articles → deep-links to `/exercises/[joint]`.
- **Anti-inflammatory food checker** on diet articles — type a food, get inflammatory/neutral/anti-inflammatory verdict from `src/data` (small JSON, no backend).
- **Calculators**: BMI-and-joint-load, daily protein target, omega-3 intake. Each ~30–60s of engaged time.

## 3. Multi-step content (forces 2nd & 3rd interactions)

- Convert 3 top-traffic posts into **paginated "chapters"** (Part 1 of 4, with Next button). GA4 already counts SPA navigations as new `page_view` and resets engagement timers — pagination lifts pages/session.
- Add **"Continue reading" inline cards** after every H2 of long articles, linking to a related sub-topic in the same cluster.

## 4. Smart cross-linking (use what we already have)

- Move `RelatedArticles` from end-of-article to **after the first H2** as well — caught earlier in the scroll.
- New `NextReadStrip` variant: **3-card "Build your plan" sequence** ordered as Eat → Move → Rest, so users walk a deliberate path.
- "People also read" panel powered by `src/lib/relatedClusters.ts` filtered to *not-yet-visited* slugs (track in `localStorage`).

## 5. Soft re-engagement (no popups during reading)

- **Exit-intent prompt** (desktop only, mouse leaves viewport top) offering "Save these 3 articles for later" → emails or downloads PDF. Already have `src/lib/exitIntentVariants.ts`.
- **Scroll-stall nudge**: if user is idle >20s at <40% scroll, surface a small "Skip to the diet section ↓" chip. Re-anchors instead of losing them.
- **Audio "Listen to this article"** button (Web Speech API, no backend, no cost). Heavy dwell-time driver for accessibility users.

## 6. Measurement & guardrails

- Add GA4 events: `engagement_60s`, `engagement_180s`, `engagement_240s`, `article_toc_click`, `article_feedback`, `inline_widget_interact`, `audio_play`.
- Extend `EngagementTracker` thresholds; keep existing `engaged_session` at 10s.
- Dashboard query (documented in `docs/BOUNCE-RATE-AUDIT.md`): % of sessions reaching 180s, segmented by landing page.
- Guardrail: monitor LCP — none of the above should ship without lazy-loading (TOC, widgets, audio button all behind `DeferredMount`).

## 7. Out of scope (intentionally)

- Forced email-wall, autoplay video, interstitials, gamified streaks, and account sign-up — all increase bounce on a YMYL medical site.
- No new third-party scripts (preserve performance budget).
- No changes to backend / Supabase.

---

## Suggested build order (one PR per step)

1. Reading-time + TOC + Key Takeaways on `BlogPost.tsx` (biggest single lift).
2. Inline "Did this help?" + new GA4 thresholds + dashboard doc.
3. Mid-article `RelatedArticles` placement + unvisited-aware "People also read".
4. One interactive widget per category (food checker, severity slider, joint picker).
5. Audio playback button + exit-intent save-for-later.
6. Pagination experiment on 3 top posts (A/B via URL param).

## Technical notes

- Files most affected: `src/pages/BlogPost.tsx`, `src/components/EngagementTracker.tsx`, `src/components/RelatedArticles.tsx`, `src/lib/analytics.ts`, plus new `src/components/article/{TableOfContents,KeyTakeaways,FeedbackPoll,ListenToArticle,FoodChecker}.tsx`.
- All widgets lazy-loaded via existing `DeferredMount` pattern.
- No new dependencies required (Web Speech API is native).
- Respects existing memories: white bg / black text / red accents, no AI branding ("Listen to this article", not "AI reader").

**Expected impact (rough):** +60–120s median session duration within 4 weeks of full rollout, with TOC + Key Takeaways + mid-article related links delivering ~60% of the gain.

Want me to start with step 1 (TOC + Key Takeaways + reading time on `BlogPost.tsx`), or ship steps 1–3 in one go?
