## PageSpeed Insights remediation plan

Working through the five PSI findings on the published site (mobile audit of `/`).

### 1. ARIA input fields without accessible names (a11y, blocking)
**Finding**: `<span role="slider" aria-valuemin="5" aria-valuemax="150">` has no accessible name.
**Source**: `src/components/landing/DonationImpactSection.tsx` — `<Slider>` (Radix) wrapped in a custom label that isn't associated.
**Fix**: pass `aria-label="Monthly donation amount in pounds"` (and `aria-valuetext={`£${amount}`}`) to the `Slider`. Audit the other two sliders for the same gap:
- `src/pages/SelfAssessment.tsx` (pain level slider) → `aria-label="Current pain level (0–10)"`
- `src/components/tools/InflammationCalculator.tsx` → descriptive `aria-label`

### 2. Render-blocking requests (~50 ms)
**Findings**: `/assets/index-*.css` (24.8 KiB), an extra `/assets/Index-*.css` (1.6 KiB), and the Google Fonts stylesheet.

**Fixes**:
- **Google Fonts already uses `preload` + onload swap** — keep, no change needed.
- **Eliminate the duplicate `Index-*.css` chunk.** That's CSS emitted from `src/pages/Index.tsx`'s lazy chunk being preloaded synchronously. Inspect `src/App.tsx` route imports — if `Index` is statically imported, leave it; the duplicate is from a stray module-level `import "./...css"` inside a non-lazy module. Trace and inline/remove.
- **Trim critical CSS**: confirm `index.css` doesn't `@import` extra stylesheets at top-level and that no page imports a `.css` sibling that should be a Tailwind utility. Net target: single CSS request.

### 3. Forced reflow (~150 ms)
**Findings**: `vendor` chunk (React DOM), plus `ui-extra` and `ui-core` (Radix Tabs/Accordion/Dialog/Tooltip), plus `[unattributed]` 56 ms.
**Root cause**: the `[unattributed]` reflow is almost always our own code measuring layout during mount. Suspects:
- `src/lib/heroLayoutMonitor.ts` — reads `getBoundingClientRect()` in a `ResizeObserver`/scroll handler. Wrap reads in `requestAnimationFrame` and batch DOM writes after reads.
- `src/hooks/useRevealOnScroll.ts` — if it queries `offsetTop`/`getBoundingClientRect` on scroll, switch to `IntersectionObserver` (likely already is — verify and remove any fallback measurements).
- `useVisitorTracker`, `useLinkPrefetch` — confirm no synchronous layout reads on mount.

**Fix**: audit these three files; convert any direct `getBoundingClientRect`/`offsetWidth` reads into rAF-batched reads, or replace with `IntersectionObserver`. The Radix-driven reflow is unavoidable (it sizes overlays), but eliminating our own 56 ms unattributed read removes the worst offender.

### 4. Reduce unused JavaScript (~239 KiB)
**Findings**:
- Google Tag Manager loaded twice (`gtag/js?id=…` requested twice → 307 KiB, est. saving 169 KiB).
- App bundle: `index-*.js` (74.8 KiB, est. 34.9 KiB unused) and `client-*.js` (42.8 KiB, est. 34.4 KiB unused) — that's the Supabase client shipping on first paint.

**Fixes**:
- **De-duplicate GA**: `index.html` injects gtag once; the second request is GTM auto-loading a measurement script. Confirm by reading the live HTML. The duplicate comes from the inline `gtag('config', ...)` running **before** the script is appended on interaction — when GA finally loads, it re-fetches because the config was queued under a different state. Move `gtag('config', ...)` into the `loadGA()` callback so it runs once, after the script attaches. Expected saving: ~150 KiB.
- **Lazy-load `@supabase/supabase-js`**: currently `src/integrations/supabase/client.ts` is imported at module scope by hooks that run on the homepage (e.g. `useVisitorTracker`, `useCmsContent`). Add to `vite.config.ts` `manualChunks`: pull `@supabase/supabase-js` and `@supabase/postgrest-js` into a dedicated `supabase` chunk so it's only fetched when a route actually needs it. Defer `useVisitorTracker` and any homepage telemetry to `requestIdleCallback` so the chunk loads off the critical path.

### 5. Network dependency tree depth
**Finding**: critical path latency 5,287 ms — many sequential chunks chained off the entry.
**Fix**: same as #4 — reducing the homepage's transitively-imported chunks (Supabase, helmet, forms) cuts the chain. Verify by re-auditing after #4 ships. Add `<link rel="modulepreload">` only for the chunks the homepage truly needs (vendor, router, helmet) — currently Vite emits them automatically; no manual hints required.

### Files I'll touch
- `index.html` — move `gtag('config')` inside `loadGA()`.
- `vite.config.ts` — add `supabase` manual chunk.
- `src/components/landing/DonationImpactSection.tsx` — add `aria-label`/`aria-valuetext`.
- `src/pages/SelfAssessment.tsx` — add `aria-label`.
- `src/components/tools/InflammationCalculator.tsx` — add `aria-label`.
- `src/lib/heroLayoutMonitor.ts` — rAF-batch layout reads.
- `src/hooks/useRevealOnScroll.ts`, `src/hooks/useVisitorTracker.ts` — verify and defer.

### Verification
After the build, re-run PSI on `https://www.livingwitharthritis.org.uk/`. Expected:
- A11y row resolved (slider has accessible name).
- Unused JS drops by ~150 KiB (single GA request) + ~30–60 KiB (Supabase off critical path).
- Forced reflow `[unattributed]` row removed.
- Render-blocking CSS reduced to a single file.

### Out of scope
- True SSR / static prerendering for non-JS social previews (separate, larger effort).
- Image CDN switch — current Unsplash CDN already serves WebP.
