# Plan: Per-page bounce-rate measurement in GA4

Goal: in GA4, see bounce rate **broken out by page** for the six landing pages (`/`, `/about`, `/diet`, `/exercises`, `/arthritis-flare-ups`, `/guides/exercise`) — currently EngagementTracker fires events but they aren't easily groupable, and `page_view` isn't being sent on SPA route changes (only on initial load via `send_page_view: true`), so GA4 sees a single pageview per session and overstates bounce.

## What's already in place
- `EngagementTracker` fires `engagement_30s`, `scroll_depth`, `first_click` with `path` as a param.
- Initial `gtag('config', 'G-X8GTW05JJS', { send_page_view: true })` runs once on load.
- `trackEvent()` helper in `src/lib/analytics.ts`.

## What's broken / missing
1. **No SPA pageview**: react-router navigations don't re-fire `page_view`, so GA4 reports 1 pageview per session even when the user reads 3 pages. Inflates bounce by ~40pp.
2. **`path` is a custom event param, not a registered dimension**, so you can't pivot bounce rate by URL in GA4 Explore without registering it.
3. **No landing-page tag**: the six target pages aren't flagged, so you can't filter to "is_landing_page = true".
4. **No engaged-session signal at the GA4 standard threshold (10 s)** — GA4's built-in bounce metric needs either a `user_engagement` event or `engagement_time_msec`.

## Changes

### 1. `src/components/EngagementTracker.tsx`
- On every route change, fire `page_view` with `page_path`, `page_location`, `page_title`, and a custom `is_landing_page` boolean (true for the six target paths).
- Add a `landing_page_view` event (only on the six target pages) for clean GA4 segmentation.
- Add an early `engaged_session` event at **10 seconds** of active time (matches GA4's built-in engagement threshold) in addition to the existing `engagement_30s`.
- Include `engagement_time_msec` param on `engaged_session` so GA4's built-in bounce metric drops correctly.
- Send `page_path` as a param on every event (already done) plus `landing_page` constant.

### 2. `index.html`
- Change the initial `gtag('config', …)` to `{ send_page_view: false }` so the SPA `page_view` from EngagementTracker is the single source of truth (prevents the first pageview being counted twice).
- Register `page_path` and `is_landing_page` as **event-scoped custom definitions** via a one-time `gtag('config', …, { custom_map: …})` — gives the pivot dimension in GA4 reports without a manual dashboard step.

### 3. `src/lib/analytics.ts`
- Export a `LANDING_PAGES` constant (`['/', '/about', '/diet', '/exercises', '/arthritis-flare-ups', '/guides/exercise']`) used by EngagementTracker for the `is_landing_page` flag. Single source of truth so future additions are one-line.
- Add an `isLandingPage(path)` helper.

### 4. Verification
- Add a dev-only `console.debug('[ga4]', name, params)` mirror inside `trackEvent` when `import.meta.env.DEV` so we can see events fire in the preview console while testing each of the six routes.
- After deploying, open GA4 → Realtime → events: navigate each of the six landing pages, confirm one `page_view` + one `landing_page_view` per visit, then `engaged_session` at 10 s.

## What you'll see in GA4 (1–2 days after deploy)

- **Reports → Engagement → Pages and screens**: bounce rate column populated per URL.
- **Explore → free-form**, dimension `page_path`, metric `Bounce rate`: per-page bounce for any path, including the six landing pages.
- **Explore** with filter `is_landing_page = true`: bounce rate for the six landing pages only.

## Files touched
```
src/lib/analytics.ts            (add LANDING_PAGES + isLandingPage + DEV debug)
src/components/EngagementTracker.tsx  (page_view on route change, landing_page_view, engaged_session @10s)
index.html                      (send_page_view: false + custom_map)
```

No DB changes, no new deps. Won't change any visible UI.
