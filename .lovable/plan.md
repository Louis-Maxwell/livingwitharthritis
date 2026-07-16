## Fix stale sitemap

The generator (`scripts/generate-sitemap.ts`) is correct and wired to `predev`/`prebuild`, but `public/sitemap.xml` was last written on 2026-07-16 against an older route set, and two legacy artifacts still sit in the repo competing with it.

### Steps

1. **Regenerate the canonical sitemap.** Run `bun scripts/generate-sitemap.ts` so `public/sitemap.xml` picks up:
   - all 31 comparison guides in `src/data/comparison-routes.generated.ts`
   - the 110 glossary routes in `src/data/glossary-routes.generated.ts`
   - current `blog_articles` rows (published, minus redirect slugs)
   - condition subpages, exercise×joint, city×service, pets, authors/reviewers
   - refreshed `<lastmod>` values

2. **Remove the stale duplicate `public/sitemap-generated.xml`** (1,473 lines, from the July 3 audit — no code references it, and `public/sitemap-index.xml` points only at `sitemap.xml` plus the four language variants). Keeping two sitemaps invites Search Console mismatches.

3. **Remove the legacy `scripts/generate-sitemap.mjs`.** It's the pre-TS generator; only `scripts/generate-sitemap.ts` is referenced from `package.json` (`predev`, `prebuild`, `sitemap`). Leaving both around is what caused earlier "which one is canonical" confusion in the audits.

4. **Also refresh `src/data/blog-slugs.generated.json`** — the same generator run writes it, so the prerender pipeline stays in sync.

5. **Verify**: `head -5 public/sitemap.xml` shows today's `<lastmod>`, `grep -c "<url>" public/sitemap.xml` returns a sensible count (~900±), and `bunx tsgo --noEmit` still passes.

Not touching: `supabase/functions/generate-sitemap/index.ts` (separate edge-function path, unrelated to the static file), the four language sitemaps, `robots.txt`, or `sitemap-index.xml`.
