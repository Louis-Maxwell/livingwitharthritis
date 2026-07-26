## Goal
Verify the project compiles cleanly end-to-end after the recent fixes (stray `tailwind.config.js` removal, `next/link` → `react-router-dom` swaps in `ArticleCard.tsx` and `MainNav.tsx`).

## Steps
1. **Typecheck** — run `tsgo` across the project (`tsconfig.app.json`) to catch any remaining TS2307/TS2590-style errors, especially other files that may still import Next.js-only modules.
2. **Grep sweep** — search `src/` for `next/link`, `next/image`, `next/router`, `next/head` to confirm no further Next.js imports remain before spending a full build cycle.
3. **Production build** — run the real production build (Vite, prerender off) and read the full output, not a tail.
4. **Triage** — if anything fails, fix in place (import paths, missing deps, Tailwind plugin config) and re-run the build until clean.
5. **Report** — confirm build status, bundle warnings worth noting (chunk sizes, unresolved imports), and anything left unresolved.

## Technical notes
- Build is run with `PRERENDER` unset so headless Chromium isn't required.
- No source behaviour changes are planned; only fixes strictly needed to make the build pass.
