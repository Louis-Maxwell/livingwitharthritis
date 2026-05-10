## Gap analysis vs the uploaded spec

I diffed the spec against what's already live on the Lovable Cloud backend.

| Spec feature | Status here | Action |
|---|---|---|
| JWT auth (register/login/refresh) | ✅ Built (Supabase Auth + `Auth.tsx`) | Skip |
| Articles + 5 seeded posts | ✅ Built (`blog_articles` table, hub, post pages) | Skip |
| Donations (Stripe + Gift Aid) | ✅ Built (`donations` + `create-donation-checkout` edge fn) | Skip |
| Contact / fundraising inquiries | ✅ Built | Skip |
| Security headers, rate limiting, validation | ✅ Built (`_shared/rate-limiter.ts`, RLS) | Skip |
| **Triage / Arthritis assessment** | ❌ Missing | **Add** |
| **Buddy mentor/mentee matching** | ❌ Missing | **Add** |
| **Newsletter double opt-in + frequency/category prefs** | ⚠️ Basic (single-step subscribe only) | **Upgrade** |
| Extended user profile fields (arthritis type, pain, mobility, location) | ⚠️ `profiles` has only display_name/bio/condition | **Extend** |

Everything Mongo/Express/Docker/SendGrid in the spec is a stack mismatch and gets ignored — the equivalents already exist on Supabase + Resend.

## What I'll build

### 1. Triage / Self-Assessment
- New table `triage_assessments` (user_id, arthritis_type, pain_level 0-10, affected_areas[], limitations[], goals[], triage_score, recommendations jsonb, valid_until, timestamps) with RLS (users CRUD their own; admins read all).
- New edge function `submit-triage` — validates input with Zod, computes `triageScore` (weighted: pain 40%, areas count 20%, limitations 30%, mobility 10%), generates personalised recommendations (physio frequency, focus areas, exercise links, resource links to existing pages like `/exercise-hub`, `/diet`, `/conditions/...`), inserts row, returns score + recommendations.
- New page `/self-assessment` — multi-step React Hook Form (arthritis type → pain slider → affected joints checklist → daily limitations → goals), submits to edge fn, shows results card with CTAs into existing pillar pages. History list at `/self-assessment/history`.

### 2. Buddy Matching
- New tables:
  - `buddy_profiles` (user_id, role 'mentor'|'mentee', arthritis_type, location_region, mobility_level, age_band, bio, available bool, max_mentees int).
  - `buddy_matches` (mentor_id, mentee_id, status 'pending'|'active'|'completed'|'cancelled', compatibility_score, compatibility_breakdown jsonb, message_count, last_check_in, feedback jsonb, timestamps).
  - RLS: users see/edit their own profile + matches they're part of; admins manage all.
- New edge function `request-buddy-match` — pulls candidate mentors from `buddy_profiles` where available, scores each (arthritis type 40 + region 25 + mobility similarity 20 + age proximity 15), picks top match, creates pending `buddy_matches` row, queues a notification email to the mentor via existing transactional email pipeline.
- New pages `/buddy` (sign-up form for mentor or mentee) and `/buddy/match` (current match status + check-in / feedback). Admin view in existing `AdminDashboard`.

### 3. Newsletter upgrade (double opt-in + preferences)
- Extend `newsletter_subscriptions`: add `confirmed_at` (timestamptz null), `confirmation_token` (text unique), `frequency` ('weekly'|'biweekly'|'monthly', default 'monthly'), `categories` (text[] default '{}'), `unsubscribe_token` (text unique).
- New edge function `confirm-newsletter` — accepts token, sets `confirmed_at`.
- Update existing subscribe flow (footer + dedicated form): insert as unconfirmed, queue confirmation email via `send-transactional-email` with link to `/newsletter/confirm?token=...`.
- New page `/newsletter/confirm` and update `/Unsubscribe` to use `unsubscribe_token`.
- Add a "Manage preferences" page for confirmed subscribers (frequency + categories: research, exercise, nutrition, mental-health, treatments).

### 4. Profile extension
- Migrate `profiles` to add `arthritis_type` (text), `pain_level` (smallint 0-10), `mobility_level` ('high'|'moderate'|'low'), `location_region` (text). Pre-populate from triage on first submit. Add a `/profile` edit page (logged-in only) so users can update without re-doing triage.

## Technical notes

- All new edge functions: Deno, CORS via `corsHeaders`, JWT validated in code (verify_jwt left at default), Zod input validation, structured error responses, rate-limited via existing `_shared/rate-limiter.ts`.
- Triage scoring lives in `supabase/functions/submit-triage/scoring.ts` (pure function, unit-testable).
- Buddy compatibility lives in `supabase/functions/request-buddy-match/compatibility.ts`.
- All new routes registered in `App.tsx` and added to `public/sitemap.xml`.
- New pages follow existing design tokens (Crimson/White Aevolve palette, Playfair Display headings, py-24/32 rhythm, no Framer Motion routing transitions).
- New admin sub-pages added to `AdminDashboard` for triage history and buddy match oversight.
- The 4 spec markdown files (`IMPLEMENTATION_SUMMARY`, `BACKEND_README`, `API_INTEGRATION_GUIDE`, `DEPLOYMENT_GUIDE`) will be saved to `docs/spec/` for reference, with a top README noting which parts were ported and which were skipped (and why).

## Out of scope (intentionally skipped)

- Mongo/Express/Docker/Kubernetes/SendGrid — replaced by Supabase + Resend equivalents already in production.
- Article seeding from spec — current `blog_articles` already has richer, UK-specific content.
- Stripe webhook scaffolding — already implemented.

## Suggested order of work

1. Migration: triage + buddy + newsletter columns + profile extension (single migration, with RLS).
2. Edge functions: `submit-triage`, `request-buddy-match`, `confirm-newsletter`, plus update `submit-newsletter` flow.
3. Frontend pages: `/self-assessment`, `/buddy`, `/buddy/match`, `/newsletter/confirm`, `/newsletter/preferences`, `/profile`.
4. Admin: triage + buddy panels in `AdminDashboard`.
5. Docs drop in `docs/spec/`.
6. Sitemap + nav links updated.
