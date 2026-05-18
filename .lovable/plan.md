## Goal

Replace the current split hero with a **full-bleed cinematic hero** where the elderly couple portrait fills the entire viewport (~85vh, ~80% of the landing screen on load), with copy overlaid via a white-to-transparent gradient. Keep the rest of the landing page sections unchanged in structure — only the hero changes.

## Scope

- **Only `src/components/landing/OAHero.tsx`** is rewritten.
- All other landing sections (FacesStrip, mission, conditions, etc.) untouched.
- Brand tone locked: crimson `#DC143C`, Playfair Display headline (italic accent on "management"), Inter body, HCPC/CSP/NICE trust row, 8.75M / £0 / 100% stat trio, eyebrow "Open-Source Osteoarthritis Plan · v2026.1".
- Image asset locked: existing `src/assets/hero-oa-portrait.jpg` (already imported).

## New hero structure

```text
┌────────────────────────────────────────────────────┐
│  [ Full-bleed portrait — object-cover, 85vh ]      │
│  ╲ white→transparent gradient (left→right)         │
│                                                    │
│   ● Open-Source Osteoarthritis Plan · v2026.1      │
│                                                    │
│   We're open-sourcing the                          │
│   *management plan* for osteoarthritis.            │
│                                                    │
│   [ Fund the Mission ]  [ Read the Open Plan → ]   │
│                                                    │
│   ── Standards & Validation ──────                 │
│   HCPC   CSP   NICE                                │
│                                                    │
│                            ┌──────────────┐        │
│                            │ 8.75M  OA UK │        │
│                            │ £0  for all  │        │
│                            │ 100% open    │        │
│                            └──────────────┘        │
└────────────────────────────────────────────────────┘
```

## Implementation notes (technical)

1. **Container**: `<section>` with `relative h-[85vh] min-h-[640px] w-full overflow-hidden`.
2. **Image layer**: `<img src={heroPortrait}>` absolute-positioned `inset-0 w-full h-full object-cover` with `object-position: center 30%` so couple's faces stay framed. `loading="eager"`, `fetchPriority="high"`.
3. **Gradient scrim**: absolute overlay `bg-gradient-to-r from-background via-background/70 to-transparent` (uses semantic token, not hardcoded white) so headline stays legible on left half.
4. **Content layer**: `relative z-10` container with `max-w-7xl mx-auto px-6 lg:px-16`, content aligned bottom-left on mobile, vertical-center on lg.
5. **Eyebrow**: keep existing pill with crimson dot + pulse animation.
6. **Headline**: `font-display` (Playfair) at `text-5xl lg:text-7xl xl:text-8xl`, italic crimson "management plan".
7. **CTAs**: unchanged routing — `/donate` and `/conditions/osteoarthritis`. Keep existing `btn-primary-cta` class for crimson button; outline button uses semantic tokens.
8. **Trust row**: thin top border, "Standards & Validation" eyebrow, HCPC/CSP/NICE text marks.
9. **Floating stats card**: absolute `right-8 top-1/2 -translate-y-1/2`, `hidden xl:block`, white/90 backdrop-blur, three stacked cells. Below xl, stats render inline under trust row.
10. **Semantic tokens only** — no raw `bg-white`/`text-white`. Use `bg-background`, `text-foreground`, `text-primary` (crimson is already mapped to `--primary` in index.css). Inline hex `#DC143C` from prototype gets translated to `text-primary` / `bg-primary`.
11. **Accessibility**: keep `aria-labelledby="oa-hero"`, descriptive alt text, 44px+ tap targets on CTAs.
12. **Responsive**: mobile stacks content at bottom over gradient; tablet keeps single-column overlay; desktop reveals floating stats card.

## Out of scope

- No changes to FacesStrip, navbar, footer, or any section below the hero.
- No new image generation — reuse `src/assets/hero-oa-portrait.jpg`.
- No route, data, or business-logic changes.

## Verification

After build: load `/`, screenshot the viewport, confirm portrait fills ~85% of fold, headline legible over gradient, CTAs clickable, stats card visible on desktop.
