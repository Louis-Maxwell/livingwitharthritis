## Goal
Adopt MAP's (map.org.uk) visual identity — bold red/cream palette, heavy condensed display typography, and confident hover/scroll motion — across Living With Arthritis, and replace any remaining AI-generated imagery with real 1080px photographs.

---

## Part 1 — Visual Identity Transfer from MAP

### A. Colour palette (update `src/index.css` tokens)
| Token | New value | Use |
|---|---|---|
| `--background` | Cream `#F8F2EA` (HSL ~35 50% 95%) | Default page bg |
| `--primary` | MAP Red `#EE2737` (HSL 354 85% 54%) | Hero bands, CTAs, accents |
| `--primary-foreground` | Pure white | Text on red |
| `--foreground` | Near-black `#0E0E0E` | Body/headings |
| `--accent` | Black `#000000` | Secondary buttons (MAP uses black "ABOUT US" pills) |
| Hero band | Full-bleed `--primary` sections | Mirrors MAP hero |

Existing `#EF4444` is kept as the legacy alias but the new `#EE2737` becomes canonical. All other shadcn tokens (`--card`, `--muted`, `--border`) re-derived to sit cleanly on the cream base.

### B. Typography
- **Display/Headings**: `Anton` (free, Google Fonts) — closest match to MAP's "Druk Wide / Founders Grotesk Cond Bold" condensed heavy display. Used for H1/H2/hero copy, uppercase tracking on CTAs.
- **Body**: `Inter` stays (MAP uses a humanist sans for body — Inter is the closest already-loaded match, keeping bundle size down).
- **Scale bump**: Hero `clamp(2.75rem, 6vw, 5.5rem)`, H2 `clamp(2rem, 4vw, 3.25rem)`, body `1.0625rem / 1.65` to match MAP's generous reading rhythm.
- Buttons: uppercase, letter-spacing `0.05em`, no rounding on primary CTAs (MAP uses sharp rectangles).

### C. Animation register
- **Octagon/clip-path image frames** on hero & feature blocks (MAP's signature shape) — pure CSS `clip-path: polygon(...)`.
- **Reveal on scroll**: fade + 16px translate-up, 600ms ease-out, staggered 80ms, via a tiny IntersectionObserver hook (`src/hooks/useReveal.ts`). No Framer Motion dependency added.
- **CTA hover**: 150ms background swap (red ↔ black), no scale.
- **Image hover**: subtle 1.03 scale + 400ms ease, contained by clip-path.

All applied via new utility classes in `index.css` (`.reveal`, `.clip-octagon`, `.btn-map`) so component churn stays minimal.

### D. Components touched
- `src/components/Header.tsx` — cream bg, red MAP-style logo lockup retained, donate button restyled.
- `src/components/landing/OAHero.tsx` — full-bleed red band, octagon image frame, Anton headline.
- `src/components/Footer.tsx` — cream/black inversion to match MAP footer rhythm.
- `src/components/ui/button.tsx` — new `map` variant (sharp, uppercase).

---

## Part 2 — Replace AI Images with Real 1080px Photos

### Audit scope
Grep the codebase for:
1. Any `imagegen` / `generated` filenames in `src/assets/`.
2. Unsplash URLs lacking `&w=1080` or using AI-style illustrations.
3. References in `src/data/*.ts`, `src/config/heroImages.ts`, blog/article data.

### Replacement source
Use **real editorial Unsplash photographs** at exactly `?auto=format&fit=crop&w=1080&q=80` for every hero, card, and blog thumbnail. Topics already mapped in `mem://tech/infra/image-management`:
- Hands/joints, older adults exercising, Mediterranean food, physiotherapy, yoga, walking — all real photography, no illustrations.

### Deliverable
- Updated `src/config/heroImages.ts` (and any per-page image maps) with 1080px Unsplash URLs.
- Removed any `*.asset.json` pointers tied to AI-generated assets, plus the underlying CDN asset via `lovable-assets delete`.
- `alt` text preserved/improved for accessibility.

---

## Verification
1. `tsgo --noEmit` — clean.
2. `bun run build` — clean.
3. Playwright screenshot of `/` at 1280×1800 to confirm the red hero band, octagon image frame, Anton headline, and cream sections render as intended.
4. Visual diff vs current preview — confirm no AI imagery remains on homepage, exercises hub, diet hub, and a sample blog post.

---

## Out of scope
- No content/copy rewrites.
- No routing or backend changes.
- No new dependencies beyond the Anton Google Font link.

## Open question
MAP's red is a vivid `#EE2737`. Your current brand red is `#EF4444` (memory rule). **Should I overwrite the brand red with MAP's exact `#EE2737`, or keep `#EF4444` and only borrow MAP's layout/typography/motion?** I'll proceed with `#EE2737` unless you say otherwise.
