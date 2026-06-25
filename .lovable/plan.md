# Whole-site improvement plan

Three phases. Each is independently shippable. Brand stays: white background, black text, crimson red accents, Playfair display + sans body, editorial arthritis.org-inspired.

---

## Phase 1 — Landing page refresh (visual only)

Goal: tighter rhythm, fewer competing sections, stronger LCP, clearer donation path. No content cuts beyond consolidation.

**Hero (`OAHero.tsx`)**
- Lock LCP image to preloaded AVIF/WebP via `vite-imagetools`; add `fetchpriority="high"`.
- Tighten headline scale (`clamp(2.5rem, 5vw, 4.5rem)`), shorten subhead to 1 line, single primary CTA + ghost secondary.
- Add a thin clinically-reviewed micro-badge under H1 (Maxwell, HCPC) — replaces the standalone trust strip below.

**Section consolidation (`Index.tsx`)**
Current 21 lazy sections → 12 curated bands:
1. Hero
2. StartHereBand (journey chooser)
3. JointSelector
4. OAProblemBand + HeroStatsStrip merged into one "Why we exist" band
5. OAPlanPillarsSection (4 pillars)
6. FacesStrip (real stories)
7. BlogPreview (featured guides)
8. ConditionPillBand + AboutArthritisCards merged
9. ImpactProgressBand (fundraising)
10. QuoteSection
11. FAQSection
12. FinalDonateBand → Newsletter → Footer

Removed/deferred: `InspiredHeroBand`, `MissionEthosBand`, `HowWeAreFundedSection`, `SEOTeaserSection`, `TestimonialCollector`, `MissionStatementBand`, `ImpactFactBand`, `NewsletterHeroBanner` (kept only one newsletter band at the bottom). Files stay in repo for reuse.

**Motion & polish**
- Reuse existing `reveal-stagger` + `hero-stagger` CSS classes — no Framer additions.
- Standardise section vertical rhythm to `py-24 lg:py-32`.
- Add subtle 1px hairline dividers between dark/light bands.

---

## Phase 2 — Frontend polish sitewide

**Design tokens (`src/index.css`)**
- Audit any remaining hardcoded colors → semantic tokens.
- Add `--shadow-editorial`, `--radius-card`, `--space-section` tokens; apply to PageHero, cards, blog templates.

**Shared components**
- `PageHero`: add optional `kicker` slot + breadcrumb prop; used across all guide/condition/blog pages for consistency.
- `RelatedArticles`: unify card heights, lazy-load images, add cluster chip.
- `MedicalReviewBadge`: single canonical variant (compact + full) — remove any drift.

**Accessibility & UX**
- Ensure all interactive targets ≥44px.
- Add `prefers-reduced-motion` guards to remaining animated sections.
- Verify focus ring uses `--ring` token on every button/link.
- Skip-to-content link audit.

**Routing**
- Verify CSS-only page transitions everywhere (no AnimatePresence regressions).
- Prefetch hover/intent for top nav links via existing `useLinkPrefetch`.

---

## Phase 3 — Backend & performance

**Database (Lovable Cloud)**
- Run `supabase--linter` and `supabase--slow_queries`; add indexes for any seq-scan offenders (likely `newsletter_subscriptions.email`, `blog_views.slug`, `appointments.user_id`).
- Audit RLS policies on every public table; ensure each policy uses `auth.uid()` directly (no recursive subqueries). Add `service_role` grants where missing.
- Confirm GRANT block exists on every public table (per project convention).

**Edge functions**
- `chat`, `submit-contact`, `book-appointment`, `create-donation-checkout`: confirm Zod validation, CORS headers on all responses (including errors), rate-limiting via `_shared/rate-limiter.ts`.
- Add structured logging (request id + duration) to top 5 functions to feed future analytics.
- Remove any unused/legacy functions from `supabase/functions/` after confirming no callers.

**Performance**
- Convert hero + above-the-fold imagery to AVIF/WebP via `vite-imagetools` (already installed-or-add).
- Add `<link rel="preload">` for LCP image + primary font in `index.html`.
- Code-split heaviest routes (`Exercises`, `BlogPost`, `Conditions/*`) — verify route chunks <150kb gz.
- Add `Cache-Control: public, max-age=31536000, immutable` to `/assets/*` via `public/_headers` (verify current state first).
- Lazy-mount `CookieBanner`, `StickyDonateBar`, `MobileBottomCTA` after `requestIdleCallback`.

**SEO/infra**
- Regenerate `sitemap.xml` via `scripts/generate-sitemap.ts` and wire to a daily edge cron (`daily-seo-refresh` already exists — confirm trigger).
- Validate JSON-LD across top 20 routes via `scripts/validate-jsonld.mjs`.

---

## Execution order & credits (rough)

| Phase | Scope | Est. credits |
|---|---|---|
| 1 | Landing refresh + section consolidation | 0.6 |
| 2 | Sitewide tokens, PageHero, a11y | 0.7 |
| 3 | DB audit, edge hardening, image/format perf | 0.9 |

Phases ship in order. After Phase 1 you can review the live landing page before Phase 2 kicks off.

---

## Out of scope (unless you say otherwise)

- No new pages, no copy rewrites, no new brand colors.
- Donation flow code paths untouched (Stripe redirect stays as-is).
- No Framer Motion reintroduction.
- No address re-add (waiting on you).

Approve and I'll start Phase 1.
