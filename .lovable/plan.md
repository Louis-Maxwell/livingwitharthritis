
# Full-site improvement plan

You picked all four scopes at depth **5 (aggressive)** with no off-limits areas. This is a large project — 50+ pages, ~50 tables, ~30 edge functions — so trying to redo everything in a single pass would break donations, auth, or SEO ranking. I'll sequence it into four phases, each independently shippable, each ending with a working site.

## Phase 1 — Visual refresh (design system + key pages)

Anchor the look before touching everything else, so later phases inherit it.

1. Capture the current homepage, a condition page, and the blog index in Playwright.
2. Ask you to pick a **palette**, **type pair**, and **layout** (three visual-choice questions).
3. Generate three rendered design directions locked to those picks; you choose one.
4. Roll the chosen tokens into `src/index.css` + `tailwind.config.ts` and rebuild:
   - Home hero, Header, Footer
   - Condition page template (5 arthritis pages share it)
   - Blog article template
   - Connect, Trust, About, Donate
5. Keep semantic tokens only — no hardcoded colours in components. Respect existing memory: white bg, black text, red HSL 350 85% 42% accent, no AI branding, no framer-motion route transitions.

## Phase 2 — Performance & code quality

1. **Route-level code splitting** in `src/App.tsx` — the router currently imports every page eagerly. Convert non-critical routes to `React.lazy` + `Suspense`.
2. **Image pipeline** — add `vite-imagetools`, convert bundled images to AVIF/WebP, preload only the LCP image.
3. **Split monoliths** — `Index.tsx` and the largest condition pages into sub-components (already flagged in `.lovable/memory/tech/development/technical-debt.md`).
4. **Dead code** — remove unused `data/keywords-30k`, orphan scripts, and any component with zero imports (verified with ripgrep).
5. **Bundle audit** — run `vite build` with `--report`, cut anything above 300 KB gz that isn't on the critical path.
6. Add a `React.memo` + `useMemo` pass on the heavy list pages (city-services, glossary, blog index).

## Phase 3 — Backend hardening

1. Run `supabase--linter` and `security--run_security_scan`; fix every high/critical finding.
2. Review RLS on the 50 public tables — flag any without policies or with permissive `USING (true)`.
3. Confirm every public table has explicit `GRANT` statements (some older migrations may be missing them).
4. Add indexes for the slow queries surfaced by `supabase--slow_queries` (blog_views by slug, pain_journal_entries by user_id+entry_date, appointments by user_id+status).
5. Audit the 30 edge functions for: CORS on every response, Zod input validation, no `execute_sql`, no service-role leakage. Fix in place.
6. Tighten the MCP OAuth flow already in place — verify the `/auth?next=` redirect is applied on password, signup, and Google paths (per `app-mcp-server-authoring` guidance).
7. Enable HIBP leaked-password check via `supabase--configure_auth`.

## Phase 4 — Content & SEO polish

1. Trigger `seo_chat--trigger_scan`, then fix every failing finding.
2. Audit `<title>` / meta descriptions across every route via `scripts/audit-meta-lengths.ts` — bring all under the length caps.
3. Verify canonical + og:url self-reference on every page (script already exists: `scripts/check-canonicals.mjs`).
4. Regenerate `public/sitemap.xml` from `scripts/generate-sitemap.ts` after route changes in Phase 2.
5. Add missing JSON-LD (MedicalWebPage on condition subpages, Article on any blog post missing it).
6. Internal linking: ensure every condition page links to its symptoms/diet/exercises/treatment subpages and vice-versa.

## Deliverables per phase

Each phase ends with:
- Build passing (`bun run build`)
- Playwright smoke on Home, Blog, one Condition page, Donate, Connect
- Short changelog in chat

## What I will NOT touch without asking

- Trustee names, financial figures, or charity registration data (per earlier instructions)
- Donation Stripe flow logic (visual only)
- Auto-generated files (`supabase/functions/mcp/index.ts`, `integrations/supabase/client.ts`, `types.ts`)
- Auth email templates unless a finding requires it

## Order of execution

I'll start Phase 1 (design directions) as soon as you approve, because the visual tokens shape everything after it. Phases 2–4 are largely independent and can be shipped in that order without blocking each other.

## Open question before I start

Phase 1's design step needs your taste input (palette / type pair / layout). Approve this plan and I'll ask those three visual questions as the first build-mode step.
