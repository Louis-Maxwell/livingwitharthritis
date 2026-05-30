## What you're seeing

The "thing that pops up for 1–2 seconds" is the **PageLoader** in `src/App.tsx` (lines 122–132) — a centred spinner with "Loading…" text. It's shown via React `Suspense` while the lazy-loaded home page chunk downloads. On a slow network it can flash for up to 2 seconds before the real homepage replaces it.

## Plan

### 1. Remove the splash/spinner flash
- In `src/App.tsx`, change the outer `<Suspense fallback={<PageLoader />}>` (line 301) to `<Suspense fallback={null}>`. This eliminates the visible loader entirely — the previous page (or blank background) stays visible until the new one is ready, which feels instant and removes the flash.
- Delete the now-unused `PageLoader` component.

### 2. Make the homepage load faster (eager, not lazy)
- The home route `/` is the most-visited page (113 of 317 pageviews this week). Keeping it `lazy()` forces a second network round-trip on first visit. Convert `Index` to a static `import` so it ships in the main bundle and renders on first paint — no Suspense wait at all for `/`.
- Keep every other page lazy (they're rarely the entry point).

### 3. Trim first-paint JS
- Remove `RouteProgressBar` from the always-mounted tree (or defer it inside `DeferredMount`). It pulls in `framer-motion` on first paint just to animate a 450 ms top bar — disproportionate cost. Replace with a tiny CSS-only bar, or drop it entirely.
- Move `EngagementTracker` into the existing `DeferredMount timeout={1200}` block so analytics setup doesn't compete with the LCP.

### 4. Prefetch likely next pages on idle
- After the home page mounts, use `requestIdleCallback` to warm the chunks for `/about`, `/diet`, `/exercises`, `/arthritis-flare-ups` (the top destinations in your analytics). The existing `useLinkPrefetch` hook already does hover-based prefetch; we extend it with an idle pre-warm for the four hottest routes so the second click feels instant.

### 5. Verify
- Open the preview, hard-reload `/`, and confirm no spinner appears between the blank page and the real homepage.
- Check the Network tab: the main JS request should now contain the Index page code (no separate `Index-[hash].js` chunk for the homepage).

## Files touched
- `src/App.tsx` — remove `PageLoader`, switch fallback to `null`, make `Index` a static import, move `EngagementTracker` into the deferred block, drop or replace `RouteProgressBar`.
- `src/hooks/useLinkPrefetch.ts` — add an idle pre-warm for the four hottest routes.

No backend, schema, or content changes. Pure frontend perf + UX.
