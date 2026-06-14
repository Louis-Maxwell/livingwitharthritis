
# New Landing Page — Charity-Grade Editorial

Inspired by **arthritis.org**, **arthritisaction.org.uk**, **redcross.org.uk** and **savethechildren.org.uk**: a calm, institutional, mission-led layout with big editorial photography, a clear "I need help / I want to help" split, and a persistent donate rail.

Locked brand (no changes): white background, black text, red `hsl(350 85% 42%)` reserved for buttons/icons/accents, Playfair Display for h1/h2, Inter for body. No purple, no gradients, no AI branding, no political content. Only verified figures: **8.75M**, **1 in 6**, **£10bn**, **£5,000 / £50,000**, **100% free**.

## Page structure (top → bottom)

```text
01  Sticky utility bar          Donate · Get help · Volunteer (red right rail)
02  Editorial hero              Full-bleed photo, serif headline, dual CTA
                                "I have arthritis" / "I want to help"
03  StartHereBand               (existing) 3 beginner journey cards
04  Where does it hurt?         (existing JointPicker, restyled tighter)
05  Search guides               (existing SearchBar promoted)
06  Mission band                Red full-bleed pull quote from Clinical Board
07  4 Pillars                   Move · Eat · Rest · Connect — image cards
08  Featured guides grid        6 cards from /data/articles (newest)
09  Stats strip                 8.75M · 1 in 6 · £10bn (existing HeroStatsStrip)
10  Real stories                Testimonial carousel (existing data)
11  Impact / fundraising band   Animated £5k of £50k progress bar
12  Newsletter                  (existing NewsletterHeroBanner, restyled)
13  Final donate band           Black panel, dual CTA "Give once / Monthly"
14  Footer                      (existing 5-col footer untouched)
```

## Interactivity

- Sticky compressed header with red Donate pill (already exists).
- Scroll-reveal fade-up on each section (reuse `RevealOnScroll`).
- `CountUp` on stats and on the £5,000 figure in the impact band.
- Joint chips: red ring halo + magnetic lift on hover.
- Progress bar fills from 0 → 10% when impact band enters viewport.
- Featured guide cards: image zoom + red underline reveal on hover.
- Mobile sticky bottom CTA (existing `MobileBottomCTA`) kept.

## Files

**New:**
- `src/components/landing/EditorialHero.tsx` — replaces current `OAHero` slot on `/` only.
- `src/components/landing/MissionQuoteBand.tsx` — red full-bleed pull quote.
- `src/components/landing/FourPillars.tsx` — Move/Eat/Rest/Connect image cards.
- `src/components/landing/FeaturedGuidesGrid.tsx` — 6 article cards from `src/data/articles.ts`.
- `src/components/landing/ImpactProgressBand.tsx` — animated £5k/£50k bar with CountUp.
- `src/components/landing/FinalDonateBand.tsx` — black closing panel.

**Edited:**
- `src/pages/Index.tsx` — reorder sections per layout above; lazy-load new components.
- `src/components/landing/JointPicker.tsx` — tighten spacing only (no logic change).

**Untouched:** Header, Footer, routing, data layer, all other pages.

## Technical notes

- All new components are presentational; no data fetching beyond reading `src/data/articles.ts`.
- Reuse existing primitives: `RevealOnScroll`, `CountUp`, `Button`, `Progress`, `ga-events.ts`.
- Add GA4 events for: `hero_primary_cta`, `hero_secondary_cta`, `pillar_click`, `featured_guide_click`, `impact_donate_click`, `final_donate_click`.
- CSS-only animations (project rule — no Framer Motion for routing/large layouts).
- Images from existing `src/data/images.ts` Unsplash CDN set — no new uploads.
- Tailwind only; no new dependencies.

## Out of scope

- Brand colours, fonts, footer, header, routes, copy on other pages.
- No new backend tables, no Supabase changes.
- No partner logos / sponsorship lists (project rule).
