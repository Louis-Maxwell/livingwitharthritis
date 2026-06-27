# Step 3: Mid-article cross-links + unvisited-aware "People also read"

Goal: catch readers earlier in the scroll and route them onward to articles they haven't seen yet, lifting pages/session and total dwell.

## What ships

### 1. Mid-article inline related strip
- New component `src/components/article/InlineRelatedStrip.tsx` — compact 2-card horizontal strip ("Keep reading on this topic") styled lighter than the end-of-article `RelatedArticles` so it doesn't feel like the article has ended.
- Injected into `src/pages/BlogPost.tsx` after the **first `<h2>`** in the rendered article HTML. Implementation: split the sanitized HTML on the first `</h2>`, render part A, mount the strip, render part B. Falls back to no-op if the article has no `<h2>`.
- Pulls 2 candidates from `useRelatedArticles` (already cluster-scored), excluding any slugs about to appear in the end-of-article block.
- Fires GA4 `inline_related_click` with `{ position: "mid_article", target_slug }`.

### 2. Unvisited-aware "People also read"
- New helper `src/lib/visitedArticles.ts`:
  - `markVisited(slug)` — writes to `localStorage` key `lwa.visited.v1` (capped at last 200 slugs, FIFO).
  - `getVisited(): Set<string>` — safe read with try/catch.
  - `filterUnvisited(items, currentSlug)` — drops current + already-visited.
- `src/pages/BlogPost.tsx` calls `markVisited(slug)` on mount (after 5s dwell to avoid bounces inflating the set).
- Extend `src/components/RelatedArticles.tsx`:
  - New optional prop `preferUnvisited?: boolean` (default `true` when used on `BlogPost`).
  - When true, partition candidates into unvisited vs visited; render unvisited first, then top up from visited only if fewer than 4 remain. Never hides the section entirely.
  - Eyebrow chip on unvisited cards switches to "New to you" (subtle, same colour token).
- Fires GA4 `related_click` with `{ unvisited: true|false }`.

### 3. Analytics
- Add the two events to `src/lib/analytics.ts` event taxonomy comment (no schema file exists).
- Document in `docs/BOUNCE-RATE-AUDIT.md`: new metric "unvisited CTR" = clicks on unvisited cards ÷ impressions, target ≥ 8%.

## Files touched

- New: `src/components/article/InlineRelatedStrip.tsx`, `src/lib/visitedArticles.ts`
- Edited: `src/pages/BlogPost.tsx`, `src/components/RelatedArticles.tsx`, `src/lib/analytics.ts`, `docs/BOUNCE-RATE-AUDIT.md`

## Out of scope (saved for step 4+)

- Pagination experiment, interactive widgets, audio playback, exit-intent — those are later steps in `.lovable/plan.md`.
- No changes to `useRelatedArticles` scoring; reuse as-is.
- No backend/Supabase work; `visitedArticles` is local-only and privacy-safe (no PII, no sync).

## Risk / guardrails

- HTML split on first `</h2>` runs after `sanitize()` so it can't introduce XSS.
- Inline strip lazy-loaded via existing `DeferredMount` to protect LCP.
- `localStorage` writes wrapped in try/catch (Safari private mode, quota errors).
- Strip is hidden when fewer than 2 related candidates exist — never shows a half-empty row.

Expected lift: +20–40s median dwell on articles with a mid-article strip, +0.2–0.4 pages/session from unvisited bias.
