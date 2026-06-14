## Goal
Address the audit screenshots in one tight pass, reusing existing components. No fabricated numbers, no new pages, no heavy net-new features — keeping credit cost low.

## What I'll skip (and why)
- **"Join 50,000+ members", "2.3M people helped", "£500 = 1 video", monthly raised totals** — project memory forbids fabricated/unsourced numbers. Will only use already-confirmed figures (8.75M UK arthritis, £5k/£50k research goal, 2.3M visitors already approved).
- **Welsh translation** — large scope, separate project. Note only.
- **TikTok / Instagram / Podcast / Mobile app** — out of scope for a website fix pass.
- **Referral "£5 to member's choice", corporate partnerships, sponsor-a-video** — needs charity governance sign-off; can't ship as live offers.
- **Testimonial video carousel** — no real videos exist yet; would require fabricated content. TestimonialCollector form (already shipped) is the honest path.

## What I'll fix (single batch, ~1 credit)

### 1. Homepage flow — reorder to audit's suggested sequence
`src/pages/Index.tsx` — move sections so order is:
Hero → CTA strip (search + newsletter, already present) → Quick wins (3 top guides via existing `ResourcesForYouSection`) → Social proof (`FacesStrip` + `TestimonialCollector`) → Stats (`HeroStatsStrip`) → Plan pillars → Donation ask.
No new components; just reordering `<Suspense>` blocks.

### 2. Beginner journey — "Start Here" entry point
New lightweight component `src/components/landing/StartHereBand.tsx` placed directly under the hero. Three large tap targets (≥44px), no quiz/state:
- "I was recently diagnosed" → `/about-arthritis`
- "My [joint] hurts most" → scrolls to existing `JointPicker`
- "I want exercises / diet / support" → `/exercise-hub`, `/diet-hub`, `/self-help-tool`
Pure presentational, uses design tokens. GA event on click via existing `ga-events.ts`.

### 3. Visual hierarchy — break up text density
- Hero already has imagery. Add one editorial pull-quote band between `OAProblemBand` and `OAPlanPillarsSection` using existing `QuoteSection` pattern (already imported, just repositioned — no new file).
- Convert the long pillar intro paragraph to a 3-up icon row (edit inside `OAPlanPillarsSection.tsx` only if it's currently a paragraph block).

### 4. Mobile journey clarity
- `MobileBottomCTA` (already shipped) — add a third compact link: "Find support near me" → `/local-support`. Keep 44px targets.
- Verify `Header` mobile menu surfaces the three audit paths (local support, exercise programme, buddy matching). Add missing links only.

### 5. Search prominence
Already shipped (`SearchBar`). One tweak: move it above `HeroStatsStrip` (covered by step 1 reorder) and increase input height on mobile to `h-14` minimum (already set — verify only).

### 6. Quick win: "Impact this year" box
Replace fabricated "£X this month" with a factual band using only confirmed numbers:
"8.75M people in the UK live with arthritis · £5,000 raised of £50,000 research goal · 100% of guides free."
New small component `src/components/landing/ImpactFactBand.tsx`, placed before the donation ask.

### 7. WhatsApp community link
Already in `src/config/contact.ts`. Surface it in `MobileBottomCTA` overflow and in `Footer` "Get in touch" column if not already present (read-only check first).

## Files touched (estimate)
- Edit: `src/pages/Index.tsx`, `src/components/landing/MobileBottomCTA.tsx`, possibly `Header.tsx`, `OAPlanPillarsSection.tsx`, `Footer.tsx`
- Create: `StartHereBand.tsx`, `ImpactFactBand.tsx` (small, presentational)

## Out of scope (flagged for later, not built now)
Welsh translation · video testimonials · referral/loyalty programme · corporate partner outreach pages · TikTok/Instagram/podcast integrations · mobile-app build · GP referral programme.

## Verification
Build runs automatically. I'll then check the homepage in preview for layout, mobile CTA stack, and that no fabricated stats appear.

---
Approve and I'll execute as a single batch.