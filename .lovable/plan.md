# Interactive Landing Page + Backend Enhancements

You picked "frontend + backend overhaul" with scroll storytelling, an interactive body/joint picker, animated counters, and a self-assessment quiz — keeping the British Red Cross palette already in `index.css`.

## ⚠️ Important guardrail on "backend overhaul"

The live backend powers donations (Stripe), email (Resend), 50+ tables, vector search, forum, buddy matching, appointments, triage, and content embeddings. **Rewriting it would lose donation history, break live payments, and wipe content.** I will NOT do that.

Instead, "backend" work here means **additive, non-destructive** changes that power the new interactive landing page:
- 1 new table to store quiz submissions (anonymous, RLS-locked)
- 1 new edge function to score the quiz and return a personalised plan
- No changes to existing tables, RLS, edge functions, donations, email, or auth

If you want a literal teardown-and-rebuild of the backend, say so explicitly and I'll come back with a migration/export plan — but I strongly recommend against it.

## Frontend — new interactive landing page

Rebuild `src/pages/Index.tsx` as a scroll-driven editorial experience. All existing pages, routes, header, footer, and CMS remain untouched.

### New components (under `src/components/landing/interactive/`)

1. **`HeroParallax.tsx`** — Full-bleed hero with scroll-pinned headline, parallax photo band, BRC-red accent underline animation, and a primary "Take the 60-second check" CTA.
2. **`BodyJointPicker.tsx`** — Front/back human silhouette SVG with clickable hotspots (neck, shoulder, elbow, wrist, hand, hip, knee, ankle, spine). Hover = red glow + label tooltip. Click = smooth-scroll to a contextual card row pulling from existing `exerciseJointMatrix` and `arthritisConditions` data, then deep-link to the matching condition/exercise page.
3. **`ScrollStoryStrip.tsx`** — 4-panel scroll-pinned story (Problem → Plan → Proof → Pledge) using `useRevealOnScroll` + sticky positioning. No new motion library; CSS + IntersectionObserver only (per project memory: no Framer Motion AnimatePresence for routing, but Motion is allowed for component-level animation).
4. **`AnimatedImpactCounters.tsx`** — Counters for "8.75M living with arthritis", "1 in 6 adults", "£10bn annual cost", "£X raised this month" (last value fetched from existing `donations` table via a lightweight server endpoint). Numbers count up on scroll into view with `requestAnimationFrame`.
5. **`QuickAssessmentQuiz.tsx`** — 5-question modal quiz (joint, pain level 1–10, stiffness duration, activity goal, age band). On submit: POST to new `score-arthritis-check` edge function, render a personalised 3-card plan (Move / Eat / Rest) with deep links to existing exercise + diet pages. Includes a "Save my plan" action that emails the result (uses existing `send-transactional-email` infra).
6. **`ProgressThermometer.tsx`** — Animated donation progress bar (current month vs goal), reads from a new lightweight `donation-totals` edge function (sum query only; no PII).

### Index.tsx composition (new order)

```text
01 HeroParallax
02 BodyJointPicker          ← interactive
03 ScrollStoryStrip         ← scroll-pinned
04 AnimatedImpactCounters   ← counts up
05 QuickAssessmentQuiz CTA band
06 OAPlanPillarsSection     (existing, kept)
07 ProgressThermometer
08 FacesStrip               (existing, kept)
09 BlogPreview              (existing, kept)
10 FAQSection               (existing, kept)
11 NewsletterSection        (existing, kept)
12 FinalDonateBand          (existing, kept)
```

Lazy-loaded via `Suspense`. Hero stays eager for LCP. Respects `prefers-reduced-motion`.

### Visual system

Keep BRC palette already in `src/index.css` (red `2 86% 54%`, white, charcoal). No font change. Add 3 new tokens for the interactive surfaces:
- `--hotspot-glow` (red @ 0.35 opacity for joint picker)
- `--story-rail` (charcoal @ 0.06 for sticky story panels)
- `--counter-accent` (red gradient for counters)

## Backend — minimal additive changes

### New table: `quiz_submissions`
Anonymous quiz answers + computed plan. RLS: insert open to `anon`, select restricted to `service_role` only (no read-back from client). Includes GRANTs per project rules.

### New edge function: `score-arthritis-check`
- Input: `{ joint, painLevel, stiffnessMinutes, activityGoal, ageBand, email? }`
- Validates with Zod, rate-limited via existing `_shared/rate-limiter.ts`
- Inserts into `quiz_submissions`
- Returns `{ planId, pillars: [{title, summary, href}] }` built from rules (no AI call needed)
- Optional email via existing `send-transactional-email`

### New edge function: `donation-totals`
- `GET` returns `{ monthToDate, goal, donorCount }` — aggregate only, no PII
- Cached 60s in-memory
- Used by `ProgressThermometer` and `AnimatedImpactCounters`

## Out of scope (explicitly NOT changing)

- Existing tables, RLS policies, triggers, functions
- Stripe integration, donation flow, email templates, auth
- Header, Footer, all non-Index pages
- Sitemap, robots, JSON-LD, GA4, security headers
- `src/integrations/supabase/client.ts` and `types.ts` (auto-generated)

## Files

**New**
- `src/components/landing/interactive/HeroParallax.tsx`
- `src/components/landing/interactive/BodyJointPicker.tsx`
- `src/components/landing/interactive/ScrollStoryStrip.tsx`
- `src/components/landing/interactive/AnimatedImpactCounters.tsx`
- `src/components/landing/interactive/QuickAssessmentQuiz.tsx`
- `src/components/landing/interactive/ProgressThermometer.tsx`
- `supabase/functions/score-arthritis-check/index.ts`
- `supabase/functions/donation-totals/index.ts`
- 1 migration: create `quiz_submissions` + GRANTs + RLS

**Edited**
- `src/pages/Index.tsx` (recomposed)
- `src/index.css` (3 new tokens appended)

## Confirm before I build

Please confirm:
1. You're OK that "backend overhaul" is scoped to **additive** changes (no destructive rebuild).
2. Quiz email-the-result feature should use your existing Resend setup (yes/no).
3. The donation thermometer goal — what's the monthly target? (default: £5,000 if unspecified)
