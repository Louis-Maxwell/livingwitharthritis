## Findings

**Important caveat:** `browser--performance_profile` measures the **Vite dev preview**, not the production bundle. Dev shows 55 individual unbundled scripts (~720 KB) and ~5.9 s FCP because each module is fetched separately. Production bundles + minifies these, so real LCP is much lower. The fixes below target genuine optimisations that improve **production** LCP — I'll re-run the dev profile only to sanity-check that nothing regressed.

### Critical-rendering-path issues

1. **Hero LCP preload runs in `useEffect`, not from HTML.**
   `src/components/HeroSection.tsx` lines 54–77 build the `<link rel="preload" imagesrcset>` inside `useEffect`. That fires *after* React hydrates, so the preload arrives *after* the browser has already started fetching the `<img>` itself — no LCP benefit. The static `index.html` head should own this preload so it's discovered during the initial HTML parse.

2. **Mobile gets no hero preload at all.**
   The same `useEffect` short-circuits when `(min-width: 1024px)` doesn't match. Mobile is the Lighthouse Mobile target, and on mobile the hero `<img>` background *is* the LCP element.

3. **Hero image is decoded twice on desktop.**
   `HeroSection.tsx` renders the same image as a full-bleed `<picture>` background (lines 87–104) AND as a right-column figure (lines 196–214). Both have `loading="eager"` and `fetchPriority="high"`. On desktop both decode and paint, doubling the LCP work and competing for paint budget. The background should be hidden on `lg+` where the figure is the visible LCP element.

4. **Osteoarthritis page eagerly imports 4 below-fold sections.**
   `src/components/conditions/ConditionPageTemplate.tsx` lines 18–22 statically import:
   - `InternalLinks`
   - `CrossLinkBanner`
   - `ContextualLinks`
   - `ConditionBlogStrip` (this one fetches blog data on mount)

   None render above the fold on `/conditions/osteoarthritis`. They inflate the route's initial chunk and delay hydration of the H1 + intro paragraph that *is* the LCP element.

## Fix plan

### 1. Move hero preload into `index.html`
Add a `<link rel="preload" as="image">` to `index.html`'s `<head>` for both desktop and mobile hero variants, using `media` queries so the browser picks one. Reference the **built** asset paths via Vite's `import.meta.glob`-style hashing — but since `index.html` is static, the simplest correct approach is to point at the WebP that ships in `src/assets` via Vite's `?url` import isn't possible from HTML. Two options:

- **Option A (chosen):** copy the three WebP variants from `src/assets/hero-walking-group-*.webp` into `public/images/` (where they get served as-is with stable filenames) and reference those in `index.html`. Update the `<picture>` in `HeroSection.tsx` to reference the same `public/` paths so preload + render stay aligned.
- Option B: keep using bundled assets and inline a `<script>` in `<head>` that synchronously creates the link before React loads. Rejected — dynamic preload can't beat static markup discovery and fights against the spec.

Then **remove** the `useEffect` preload block in `HeroSection.tsx` (lines 54–77).

### 2. Stop decoding the hero image twice on desktop
In `HeroSection.tsx`, change the full-bleed background `<picture>` wrapper to `lg:hidden`. Mobile + tablet keep the background image (their LCP). Desktop keeps the right-column figure (its LCP). Each viewport decodes one image, not two.

### 3. Lazy-load below-fold sections in `ConditionPageTemplate.tsx`
Convert the four eager imports to `React.lazy`:
```tsx
const InternalLinks = lazy(() => import("@/components/InternalLinks"));
const CrossLinkBanner = lazy(() => import("@/components/CrossLinkBanner"));
const ContextualLinks = lazy(() => import("@/components/ContextualLinks"));
const ConditionBlogStrip = lazy(() => import("@/components/ConditionBlogStrip"));
```
Wrap each render site in `<Suspense fallback={null}>` (no skeleton needed — they're below the fold and the user won't see the swap).

### 4. Verify
- Re-run `browser--performance_profile` on `/` and `/conditions/osteoarthritis` and compare FCP / DOM-Interactive vs. the baseline above. Even in dev mode, fewer eager imports and a static preload should show measurable improvement.
- Inspect the rendered `<head>` in the preview and confirm the hero `<link rel="preload">` is present *before* `<script type="module">`.
- Open DevTools network panel mentally / via `browser--list_network_requests` to confirm the hero WebP starts loading in the first wave alongside JS, not after `App.tsx` parses.

## Out of scope
- Production-build measurement requires a deployed Lighthouse run (the user said they'll re-run Lighthouse mobile themselves after publish).
- No icon-library refactor — `lucide-react` is tree-shaken in production; the dev figure (157 KB) is misleading.
- No changes to `framer-motion` usage — already gated to desktop in `Hero3DBackground`.
- No Sonner / ChatBot / CookieConsent changes — already lazy in `App.tsx`.

## Files touched
- **Edit:** `index.html` (add 3 preload `<link>` tags)
- **Edit:** `src/components/HeroSection.tsx` (drop useEffect preload, mark background `<picture>` `lg:hidden`, point `<img>` `src`/`srcSet` at `/images/...`)
- **Edit:** `src/components/conditions/ConditionPageTemplate.tsx` (lazy + Suspense for 4 below-fold sections)
- **New:** `public/images/hero-walking-group-{800,1200,1600}.webp` (copy from `src/assets/`)
