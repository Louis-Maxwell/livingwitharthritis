# Deep refinement plan — frontend, performance, backend, DB

A codebase this size (218 blog posts, ~50 tables, ~30 edge functions, huge `src/pages` + `src/components` trees) can't be safely "deep refactored" in one pass. I'll do it in four sequential stages, each self-contained, each verifiable, each reversible. After each stage I'll report what changed and pause so you can eyeball the preview before I move on.

Nothing in stages 1–2 changes behavior. Stages 3–4 touch runtime code and DB — I'll flag every behavior change explicitly.

---

## Stage 1 — Frontend polish (no behavior change)

Goal: consistency, dead-code removal, token discipline.

- **Design-token sweep.** Grep all `text-white`, `bg-black`, `text-gray-*`, `bg-[#…]`, `text-*-foreground/40|50` hardcodes across `src/`. Replace with semantic tokens (`text-foreground`, `text-muted-foreground`, `bg-background`, `bg-primary`, etc.) per the project's white/black/red rule in memory. Skip decorative `aria-hidden` icons already flagged as intentional.
- **Dead code.** Remove unused Lucide imports, stale `// TODO` blocks, orphan files (there are several `*-report.md`, `*-report.json` at repo root that aren't referenced — I'll list them, not delete, and let you confirm).
- **Duplicate components.** Verify the `ContactSection` / `GetInTouchSection` dedupe from `.lovable/memory/tech/development/technical-debt.md` is complete; catch any remaining duplicates (e.g. multiple hero variants, footer variants).
- **Large-file split.** Any `src/pages/*.tsx` over ~600 lines gets its inline subcomponents extracted to `src/components/<page>/` — same pattern already applied to `Index.tsx`. Candidates I'll check: `BlogPost.tsx`, `Exercises.tsx`, admin dashboards.
- **A11y quick wins.** `aria-label` on icon-only `<Button size="icon">`; single `<main>` per route; `id` uniqueness in list-rendered inputs (per a11y knowledge).
- **SEO tags.** Confirm each route sets a real `<title>` / `<meta description>` via Helmet; fix any that fall back to defaults.

Verify: `bunx tsgo --noEmit`, spot-check landing + a blog post + `/exercises` in Playwright.

## Stage 2 — Frontend performance

Goal: smaller critical JS, faster LCP, fewer wasted renders.

- **Route-level `React.lazy`** for heavy leaf routes (admin, glossary, comparison, city pages) that aren't already split. Confirm `App.tsx` suspense boundaries are correct.
- **Manual-chunks audit** in `vite.config.ts`. Current chunks look sensible; I'll run `ANALYZE=1 bun run build`, inspect `dist/stats.html`, and only rebalance if a route pulls a heavy lib synchronously.
- **Image discipline.** Anything imported from `src/assets/` that's still `.jpg`/`.png` used above-the-fold gets a `?format=webp` variant via `vite-imagetools` (add plugin if missing). LCP image keeps `fetchpriority="high"` + `<link rel="preload">` (already done for hero).
- **Query hygiene.** Audit `useQuery` calls for missing `staleTime`; wrap expensive derived data in `useMemo` where profiler shows re-renders.
- **Prefetch tuning.** `useLinkPrefetch` — cap concurrent prefetches, gate on `navigator.connection.saveData`.

Verify: build succeeds, bundle report before/after, Playwright PSI-lite check on landing (LCP element, TBT).

## Stage 3 — Backend / edge functions

Goal: consistent auth, validation, error shape, rate-limiting; no functional regressions.

- **Shared helpers.** `supabase/functions/_shared/` already has `http.ts`, `validation.ts`, `rate-limiter.ts`, `ai-safety.ts`. Migrate any function still hand-rolling CORS, JSON parsing, or Zod error responses onto these helpers. Target list is any `supabase/functions/*/index.ts` that imports `corsHeaders` locally or duplicates the `errJson` / `preflight` pattern.
- **JWT validation.** Every function that reads user data must call `supabase.auth.getClaims(token)` (per the edge-function knowledge) — audit `book-appointment`, `submit-contact`, `submit-fundraising`, `submit-triage`, `request-buddy-match`, `send-patient-email`, `notify-patient-status`, `process-donation`. Public webhooks (`create-donation-checkout` return, email hooks) stay public but keep signature/secret checks.
- **Zod input schemas** on every function that accepts a body. Reject with 400 + field errors, no stack traces to the client.
- **Rate-limit coverage.** Apply the shared `createRateLimiter` to any user-facing POST that doesn't have one (contact, fundraising, triage, buddy).
- **Structured logs.** Every function logs `[${requestId}]` prefix on both success + error paths; drop `console.log` of PII.
- **Deno lockfile check.** Confirm no stale `deno.lock` blocking deploys.

Verify: `bunx deno test` on functions that have tests; `supabase--test_edge_functions` where applicable; smoke a couple with `supabase--curl_edge_functions`.

## Stage 4 — Database / RLS hardening

Goal: no exposed data, indexes on real hotspots, functions pinned.

- **Run `supabase--linter` + `security--run_security_scan`.** Fix every finding: missing RLS, permissive `USING (true)` on writable tables, functions without `SET search_path`.
- **GRANT audit.** For each of the ~50 public tables, confirm the GRANT matches the intended reader (drop `anon` on tables that only serve authenticated users; add `service_role` where edge functions read).
- **Roles.** Verify roles live in `user_roles` (confirmed via `has_role` + `is_admin` functions — memory says this is already correct); check no policy still reads a role column off `profiles`.
- **Slow-query pass.** `supabase--slow_queries` → `EXPLAIN ANALYZE` the top 3–5 → add targeted `CREATE INDEX` migrations. Likely candidates given the schema: `blog_views(slug)`, `content_embeddings(source_type)`, `appointments(user_id, status)`, `pain_journal_entries(user_id, created_at DESC)`.
- **`updated_at` triggers.** Any table with an `updated_at` column but no trigger gets one (`update_updated_at_column`).

Every DB change goes through the migration tool one at a time, with a plain-English description, so you approve each SQL block individually.

Verify: re-run linter + security scan, spot-check the RLS-scoped hooks (`useAdmin`, `useAppointment`, `useBlogArticles`) still work in Playwright as an authed user.

---

## What I won't touch

- `src/integrations/supabase/client.ts`, `types.ts`, `.env`, `supabase/config.toml` project-level settings.
- The 218 blog article content files under `src/data/`.
- Anything under `mem://` unless a memory becomes stale as a result of a change (in which case I update it in the same turn).
- Publish / deploy — I only publish when you explicitly ask.

## Order of operations & stop points

1. Stage 1 → report → **stop for review**
2. Stage 2 → report → **stop for review**
3. Stage 3 → report → **stop for review**
4. Stage 4 (per-migration approval built in) → final report

If you'd rather I collapse the stop points and run 1→4 continuously, say so and I'll only pause for the DB migration approvals (which are mandatory).