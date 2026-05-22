
## Goal

Borrow the warm, photography-led rhythm of the reference (Arthritis Foundation homepage) and apply it to our landing page — without breaking the existing Aevolve Crimson/White institutional identity locked in project memory.

What we keep: Playfair Display headings, Crimson `#9B2C2C` accents, white/cream surfaces, tight editorial spacing, en-GB voice, MedicallyReviewed badge, JSON-LD pattern.

What we borrow from the reference:
- Bold left-aligned headline + 3-up stats bar at the top
- "About Arthritis" 3-card row with **real human photography** (not icons)
- "Resources for You" — alternating image/text rows with rounded photos
- Condition pill grid on a coloured band (we use crimson, not blue)
- Magazine-style 3-column News & Stories card grid (already exists as BlogPreview — restyle with stronger photos)

## Section-by-section plan for `src/pages/Index.tsx`

Final composition (top → bottom):

```text
Header
OAHero                          ← restyle: add 3-stat strip beneath headline
OAProblemBand                   ← keep
AboutArthritisCards (NEW)       ← 3 photo cards: Connection · Advocacy · Science
FacesStrip                      ← keep
OAPlanPillarsSection            ← keep
ResourcesForYouSection (NEW)    ← 4 alternating image/text rows
ConditionPillBand (NEW)         ← crimson band, condition pills linking to /conditions/*
InspiredHeroBand                ← keep
MissionStatementBand            ← keep
QuoteSection                    ← keep
DonationImpactSection           ← keep
OpenSourceEthosBand             ← keep
SEOTeaserSection                ← keep
BlogPreview                     ← restyle cards: larger photos, category eyebrow
FAQSection
NewsletterSection               ← restyle: crimson band with inline form (mirrors AF green band)
Footer
```

## New components to create

1. **`src/components/landing/HeroStatsStrip.tsx`** — small inline stats row injected into `OAHero` (or rendered just below). Three figures from existing copy: `8.75M UK adults`, `1 in 6`, `£10bn cost to NHS`. Crimson numerals in Playfair, muted-foreground labels in body font.

2. **`src/components/landing/AboutArthritisCards.tsx`** — 3-card grid. Each card = photo on top, eyebrow, title, 2-line description, "Learn more →" link.
   - Card 1: *Connection & Community* → `/community`
   - Card 2: *Plain-English Guidance* → `/blog-hub`
   - Card 3: *Evidence & Research* → `/about` (or `/trust`)

3. **`src/components/landing/ResourcesForYouSection.tsx`** — section title "Resources for You", then 4 rows alternating photo-left / photo-right.
   - Row 1: *Talk to someone* → `/contact` (helpline photo)
   - Row 2: *Pain relief that works* → `/arthritis-flare-ups`
   - Row 3: *Osteoarthritis explained* → `/conditions/osteoarthritis`
   - Row 4: *Answers to your questions* → `/faq`
   Each row: rounded-2xl image, eyebrow, h3 in Playfair, 3-line description, ghost button "Read more".

4. **`src/components/landing/ConditionPillBand.tsx`** — full-bleed crimson band. Heading "Understanding Arthritis", subhead, then a 3×2 (collapses 1-col mobile) grid of pill-style outlined buttons linking to existing `/conditions/*` slugs. Pulls from `src/data/arthritisConditions.ts`. "See all arthritis types →" anchor at the bottom right.

## Imagery sourcing

Per the **Image Management** memory, all photos must be added to `src/data/images.ts` as Unsplash CDN URLs with `srcSet`. Theme: warm, candid, multi-generational, UK-relatable. New keys to add:

- `aboutConnection` — group of older adults talking
- `aboutGuidance` — person reading on tablet at home
- `aboutResearch` — clinician with patient
- `resourceHelpline` — older man on phone, warm light
- `resourcePainRelief` — therapist with patient (clinic)
- `resourceOAExplained` — middle-aged woman on sofa
- `resourceAnswers` — small group consulting tablet

All photos load with `loading="lazy"`, explicit `width`/`height`, and a `bg-muted` placeholder to prevent CLS.

## Style adjustments

- `OAHero`: add `<HeroStatsStrip />` directly under the CTA row, separated by a hairline `border-t border-border/40`. Keep Playfair headline, crimson eyebrow chip.
- Cards (`AboutArthritisCards`, `ResourcesForYouSection`): `rounded-2xl bg-card overflow-hidden`, `aspect-[4/3]` images, `hover:-translate-y-1 hover:shadow-lg transition`.
- `ConditionPillBand`: `bg-primary text-primary-foreground py-24`, pills `border border-primary-foreground/30 hover:bg-primary-foreground hover:text-primary`.
- `NewsletterSection`: wrap existing form in a `bg-primary text-primary-foreground` full-bleed band with Playfair "Stay in the Know. Live in the Yes." heading.

## Technical details

- No new dependencies.
- All new components are pure presentational and lazy-imported via `React.lazy` where they sit below the fold (mirrors existing `BlogPreview`, `QuoteSection` pattern).
- Routing: only existing routes used — no new pages, no broken links.
- A11y: every image gets meaningful `alt`; pill grid uses `<Link>` with focus-visible ring; stats use `aria-label` on the numeric span.
- SEO: no schema changes; the existing `NGO` JSON-LD stays. Section h2s remain unique.
- Memory: no contradictions — palette, type, voice all preserved.

## Out of scope (will not touch)

- Header / Footer / sticky donate bar
- Routing in `src/App.tsx`
- Donations, Stripe, Supabase
- Any condition/diet/exercise subpage
- Brand colours, fonts, or memory entries

## Acceptance

- Homepage renders with the new section order, no console errors.
- All new images load (visible in the preview at 1046×642 and mobile widths).
- Existing CTAs (Donate, Newsletter, Helpline) keep their destinations.
- `bunx tsc --noEmit` passes (handled by harness).
