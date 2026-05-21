# Landing Page Refresh — Arthritis Charity Focus

## Goal
Replace the current hero portrait on the homepage with an original, warm image of a **mixed-race group of elderly people**, and give the landing page a more emotive, charity-led feel that clearly reads as "arthritis charity for everyone in the UK".

## 1. New Hero Image
- Generate a new image at `src/assets/hero-oa-group.jpg` using the premium image model.
- Prompt direction: a candid, editorial photograph of a small group (4–5) of mixed-race elderly people — Black, South Asian, East Asian, and White — together in a bright, naturally-lit setting (community hall / garden / sunlit living room). Warm smiles, gentle interaction, one with a walking stick, one stretching a hand, conveying companionship and resilience. Soft documentary tone, shallow depth of field, no text, no logos, 16:9.
- Replace the import + `<img>` in `src/components/landing/OAHero.tsx` (keep `width`, `height`, `fetchPriority="high"`, `loading="eager"`, alt updated to describe the group).
- Update the alt text to reflect the new image (accessibility + SEO).

## 2. Hero Copy & Composition Tweaks
- Keep the existing layout (full-bleed image + left scrim) but:
  - Shift `objectPosition` so the group's faces sit in the right two-thirds.
  - Slightly soften the scrim on the right so faces stay visible on large screens.
- Add a small "charity chip" above the H1: `Registered UK arthritis charity · Free for everyone` (uses existing token colors, no new components).
- Keep the existing H1 and supporting paragraph (already on-brand: "small charity… clinically-reviewed help… free for everyone").
- Primary CTA stays **Start your gentle plan** → `/conditions/osteoarthritis`.
- Secondary CTA stays **Help us keep it free** → `/donate`.

## 3. Charity-Forward Trust Strip (new, small)
Add a thin, quiet trust band immediately under the hero — above `OAProblemBand` — inside `src/components/landing/`:
- New component `CharityTrustStrip.tsx` (presentational only).
- Content: 4 short items with Lucide icons (`HeartHandshake`, `Stethoscope`, `BookOpen`, `Users`):
  - "Clinically reviewed guidance"
  - "Plain English, UK-focused"
  - "Free for everyone living with arthritis"
  - "Powered by donations"
- Styling: muted background, single-row on desktop, 2×2 on mobile, no marketing badges, no fabricated stats — respects the political-neutrality and no-fake-numbers constraints in memory.
- Inserted in `src/pages/Index.tsx` between `<OAHero />` and `<OAProblemBand />`.

## 4. SEO / Metadata Touch-Up
- Update the homepage `<meta name="description">` and `og:description` in `Index.tsx` to mention "UK arthritis charity" explicitly (currently leads with "Open-source osteoarthritis plan"). New description (<160 chars):
  - `UK arthritis charity sharing clinically-reviewed, plain-English help on diet, movement and pain relief — free for everyone living with arthritis.`
- Update the JSON-LD `description` field to match.

## 5. Out of Scope
- No routing changes, no new pages, no backend/database changes.
- No changes to donations flow, auth, or edge functions.
- No changes to other landing sections (Problem Band, Plan Pillars, Mission, Quote, Donation Impact, Ethos, Blog, FAQ, Newsletter).

## Files Touched
- `src/assets/hero-oa-group.jpg` *(new, generated image)*
- `src/components/landing/OAHero.tsx` *(image swap, alt, chip, position tweak)*
- `src/components/landing/CharityTrustStrip.tsx` *(new)*
- `src/pages/Index.tsx` *(insert trust strip, update meta + JSON-LD description)*

## Technical Notes
- Image generated via `imagegen` premium model at 1600×1000 for crisp hero rendering, saved as `.jpg` (no transparency needed).
- All colors via existing semantic tokens (`text-foreground`, `bg-muted`, `text-primary`) — no hardcoded hex.
- Component uses Tailwind + Lucide only; no new dependencies.
- Hero remains LCP-optimised (`fetchPriority="high"`, explicit dimensions, eager load).
