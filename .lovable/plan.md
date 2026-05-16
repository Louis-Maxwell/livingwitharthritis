## Prerender JSON-LD into static HTML

### Goal
Bake every static route's JSON-LD (and `<title>` / meta) into the HTML files served by the CDN, so Google's Rich Results Test, LinkedIn/Slack/Facebook crawlers, and any HTTP-only extractor can read the schema without executing JavaScript. SPA behaviour is unchanged for end users — React still hydrates on top.

### Approach: `vite-plugin-prerender-spa` style build-time prerender via `vite-plugin-ssr-pages` is heavy. Use the lighter, well-supported route — **`vite-plugin-prerender`** (Puppeteer-based) wired into the existing Vite build.

It works like this:
1. `vite build` produces the normal SPA bundle in `dist/`.
2. The plugin spins up a headless Chromium against `dist/`, navigates each configured route, waits for `useEffect`-injected JSON-LD to land, and writes `dist/<route>/index.html` with the fully rendered `<head>` and `<body>` snapshot.
3. The CDN serves those static HTML files; React mounts on top and the user sees a normal SPA.

### Files to change

1. **`package.json`**
   - Add devDependency: `vite-plugin-prerender` (or fork: `@prerenderer/rollup-plugin` — newer, maintained, same author).
   - New scripts:
     - `"build": "vite build"` (unchanged)
     - `"build:prerender": "vite build --mode production"` — same command, prerender runs as a Rollup plugin during the build
     - `"preview:prerender": "vite preview"` — sanity check the static output

2. **`vite.config.ts`**
   - Import `Prerender` from `@prerenderer/rollup-plugin` and `PuppeteerRenderer`.
   - Read the route list from `scripts/generate-sitemap.ts` (which already enumerates routes for the sitemap) so prerender + sitemap stay in sync — single source of truth, no drift.
   - Configure:
     ```ts
     Prerender({
       routes: ROUTES, // imported from a new shared module
       renderer: new PuppeteerRenderer({
         renderAfterDocumentEvent: "prerender-ready",
         maxConcurrentRoutes: 4,
         headless: "new",
       }),
       postProcess(ctx) {
         // strip dev-only nodes, ensure JSON-LD scripts retained verbatim
         return ctx;
       },
     })
     ```
   - Only enabled for production builds via the existing `mode === "development"` check pattern.

3. **`src/main.tsx`**
   - After the React tree mounts and the first idle frame, dispatch `document.dispatchEvent(new Event("prerender-ready"))`. This is what tells the headless renderer the JSON-LD `useEffect`s have run.
   - Use `requestIdleCallback` (with `setTimeout` fallback) inside a `useEffect` in `App.tsx` to fire the event after the initial paint of the matched route — guarantees `MedicalWebPage` / `FAQPage` / `BreadcrumbList` injectors have appended their scripts.

4. **`scripts/extract-routes.ts`** (new — small helper)
   - Exports the same hardcoded route list `generate-sitemap.ts` already uses.
   - Refactor `generate-sitemap.ts` to import from this helper instead of duplicating the list.
   - Excludes dynamic routes that need data (`/blog/:slug`, `/admin/*`, `/donation-result`, `/auth`, `/unsubscribe`). Dynamic content routes are listed explicitly with their known slugs (blog posts already enumerated in the sitemap script).

5. **`index.html`** — no change.

### Why not alternatives
- **SSR (Vite SSR / Remix / Next.js migration)** — out of scope; the project is a Vite SPA, hosting on Lovable/CDN, full SSR would require a Node origin server. Prerender gives ~95% of the SEO benefit with zero infra change.
- **`react-snap`** — unmaintained, breaks on modern React 18 hydration.
- **Manual HTML generation per route** — fragile; would duplicate the JSON-LD building logic that lives in `useEffect` blocks today.

### Verification steps (post-build)
1. `npm run build` → confirm `dist/index.html`, `dist/about/index.html`, `dist/conditions/osteoarthritis/index.html`, etc. exist.
2. `cat dist/conditions/osteoarthritis/index.html | grep -c application/ld+json` → expect ≥ 3 (sitewide WebSite + Organization + page-specific blocks).
3. `cat dist/index.html | grep -c "What is the best diet for osteoarthritis"` → expect 1 (homepage FAQ).
4. `cat dist/about/index.html | grep -c "What is the best diet for osteoarthritis"` → expect 0 (homepage FAQ does not leak).
5. Manual: paste live URL into Google's Rich Results Test after publish — schemas should now appear without "JavaScript rendered" warnings.

### Risks / trade-offs
- **Build time** rises by ~30–90 s depending on route count (~70 routes). Acceptable for a charity site that publishes a few times a day.
- **Lovable hosting** must serve `/about/index.html` for `/about` requests. Lovable's static hosting already does this for SPA fallback; the prerendered files will be picked up automatically because the file path matches.
- **Dynamic blog posts** — only those listed in `generate-sitemap.ts` get prerendered. New posts not in that list still work as SPA routes (no prerender), so the homepage FAQ won't leak there because subpages own their own JSON-LD anyway.

### Out of scope
- No copy/content changes.
- No JSON-LD logic changes — schemas are emitted by exactly the same React `useEffect` code today; we're just snapshotting the output at build time.
- No CI changes.