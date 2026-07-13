# Performance Optimization Sweep

Incremental work with a typecheck/build gate after each meaningful change. No functional, layout, or design changes.

## Scope & phases

### Phase 1 — Recon (read-only)
- Enumerate `<img>` usage across `src/**` and `public/**` to build the image inventory (source, alt text, current loading/fetchpriority attrs, above/below fold classification).
- List route definitions in `src/App.tsx` and classify which routes are already lazy-loaded vs. eagerly imported. Identify heavy non-critical routes (admin dashboards, tools, hubs) that are still eager.
- Build a dependency-size baseline: run `bun run build`, capture the current output sizes, and note top 5 largest chunks / any single chunk >250 KB gzipped.
- Query Supabase `slow_queries` and read `hooks/*` + `supabase/functions/*` for obvious over-fetches (`select *`, unfiltered lists, N+1 patterns inside `.map`).
- Deliverable: short inventory posted back in-chat before any edits.

### Phase 2 — Image pipeline
- All below-the-fold `<img>` gain `loading="lazy"` + `decoding="async"`. Hero image stays eager + `fetchpriority="high"`.
- Where a component uses an `.asset.json` CDN pointer for a photo and there is no reason it must be JPEG (illustrations/photos rendered <1600px), replace with a re-encoded WebP variant via `lovable-assets create`. Keep the original pointer file as a fallback only if we introduce a `<picture>` element — otherwise a direct swap keeps the diff surface small.
- Add explicit `width`/`height` on any `<img>` missing them to remove CLS.
- Where an `<img>` is genuinely responsive (hero, cards inside a fluid grid), add `srcset` + `sizes` using the CDN pointer's URL plus any new WebP variant.
- Skip: `.svg` icons, avatars <100 KB, exercise videos (already externalized).

### Phase 3 — Bundle / code-splitting
- Convert any still-eager route in `App.tsx` that is not the landing route or a shared shell (Header/Footer) to `React.lazy(() => import(...))`, wrapped in the existing `<Suspense>` fallback.
- Prime target list (confirmed after Phase 1): admin routes, tools (`WaitingTimeCalculator`, `KeywordStrategy*`), Pets hub, Press/Media, Trust/Credibility, blog post detail.
- In `vite.config.ts`, add `build.rollupOptions.output.manualChunks` for large stable deps (`react`, `react-dom`, `react-router-dom`, `@supabase/supabase-js`, `recharts`/`chart.js` if used, icon library) so they cache independently of app code.
- Remove any dependency imported once and only from a low-traffic route from the eager path (via lazy of that route).
- Do NOT prune `package.json` in this pass — dependency removal is a separate risk profile.

### Phase 4 — Caching headers
- `public/_headers` already sets `immutable` for `/assets/*`, `/og/*`, `*.woff2`, `/hero/*`; extend to cover `/__l5e/assets-v1/*` (Lovable CDN already sets its own long-cache headers, so this is a no-op belt-and-braces; skip if it conflicts). Verify HTML stays `must-revalidate`.
- Add `Cache-Control: public, max-age=86400` for `sitemap*.xml`, `robots.txt`, `llms*.txt` so crawlers still see fresh copies within a day.

### Phase 5 — Backend / DB
- Read `slow_queries` output; for each query >100 ms mean, inspect the source hook/edge function.
- Fix low-risk items only in this pass: replace `select("*")` with column lists where a hook only reads a few columns; add `.limit()` where a list is rendered paginated; consolidate obvious N+1s (e.g. per-row fetches inside a map) into a single `.in()` query.
- If an index is clearly missing (seq scan on a filter column in a hot query), add a `CREATE INDEX` migration. Skip anything that requires schema shape changes.
- Do NOT touch RLS policies, security-definer functions, or auth flows.

### Phase 6 — Verify & publish
- Final `bun run build` — must exit 0. Capture before/after chunk sizes for the report.
- `tsgo --noEmit` clean.
- Publish.
- Trigger SEO/Lighthouse rescan and report the new scores plus LCP + contrast status side-by-side with the previous run.

## Guardrails

- After each phase: `bun run build` + `npx tsgo --noEmit`. Any regression → revert that phase's edits, surface the error, do not proceed.
- No visual changes: no color/spacing/typography edits, no component restructuring beyond adding `loading`/`decoding`/`width`/`height`/`srcset` attributes and swapping asset URLs.
- No dependency removals in this pass.
- Reversibility: everything is a code edit — user can revert this commit range from chat history.

## Out of scope

- Font subsetting / self-hosting (fonts already use `display=swap` via non-blocking preload).
- SSR migration.
- Removing GA / third-party scripts.
- Changing the Supabase compute tier.
- Refactoring the 5k-keyword generated data (already migrated to JSON import last turn).

## Reporting

Final message will contain: image count re-encoded + bytes saved, route count lazified + build size before/after, cache-header diff, DB queries touched (with mean-ms before/after when available), and the fresh Lighthouse scores.
