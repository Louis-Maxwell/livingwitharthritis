## Goal

Rebuild the visual system of the entire site so every word is visible in black, the design feels like a £50M-funded UK arthritis charity, and the look is inspired by Versus Arthritis and the Arthritis Foundation — anchored on a British Red Cross palette, Montserrat headings + Open Sans body, and an editorial full-width stacked rhythm.

## Design direction (locked from your answers)

- **Palette** — British Red Cross inspired:
  - Background: pure white `#FFFFFF`
  - Text (all headings, body, links, labels): black `#0A0A0A`
  - Primary accent (CTAs, icons, hover, key strokes): British Red Cross red `#EE2A24` (HSL 2 86% 54%)
  - Surface tints for section bands: very light warm grey `#F7F5F4` and soft red wash `#FDECEB`
  - One supporting deep tone for footer/contrast band: near-black `#111111`
- **Type** — Montserrat (700/800) for headings, Open Sans (400/600) for body, loaded from Google Fonts.
- **Layout** — Editorial full-width stacked sections with generous whitespace and clear hierarchy.

## What goes wrong today

The recent fixes layered `!important` rules across every text utility and forced gradients/tokens to black + white only. That fixes contrast but flattens the whole site (no card surfaces, no section bands, no accent areas), which is why pages look "empty" and unstyled. The fix is to rebuild visibility through proper tokens, not blanket overrides.

## Plan

### 1. Reset and rebuild the design tokens (`src/index.css`, `tailwind.config.ts`)

- Remove the blanket `!important` text-colour overrides and the collapsed "everything red or white" token block.
- Define a clean semantic token set in HSL:
  - `--background` white, `--foreground` near-black
  - `--card` white, `--card-foreground` near-black
  - `--muted` light warm grey, `--muted-foreground` near-black (not grey — keeps wording fully visible)
  - `--primary` Red Cross red, `--primary-foreground` white
  - `--accent` soft red wash, `--accent-foreground` near-black
  - `--border` subtle warm grey `#E7E2E0` (restored, very low contrast — section structure returns without visual noise)
  - `--ring` Red Cross red
- Add safety rule: any element with `text-transparent` / `bg-clip-text` falls back to near-black so gradient text never disappears.
- Keep the existing "buttons stay readable" rule: white text on red primary surfaces.

### 2. Wire up Montserrat + Open Sans

- Add Google Fonts preconnect + stylesheet for Montserrat 600/700/800 and Open Sans 400/600/700 in `index.html`.
- Map Tailwind `font-sans` → Open Sans, `font-display` / `font-heading` → Montserrat in `tailwind.config.ts`.
- Apply `font-heading` to all `h1`–`h4` via `@layer base` in `index.css`.
- Replace previous display-font usages (Playfair Display, etc.) with the new heading token.

### 3. Section rhythm (editorial stacked)

Establish three reusable section surfaces so the home page and inner pages get visual variety without losing legibility:

- `.section-white` — white bg, near-black text
- `.section-tint` — `#F7F5F4` warm-grey bg, near-black text
- `.section-accent` — `#FDECEB` soft-red wash, near-black text, red rule above title
- `.section-contrast` — near-black bg, white text (used sparingly for a single mid-page band and the footer)

Apply alternating surfaces down the home page so each band has a clear identity.

### 4. Home page (`src/pages/Index.tsx` + landing components)

Re-curate to a clean editorial stack inspired by Versus Arthritis / Arthritis Foundation, all using the new tokens:

1. Hero — bold Montserrat headline, supporting Open Sans paragraph, two CTAs (primary red "Get Support", outline "Donate")
2. Trust strip — credentials (HCPC, CSP, NICE alignment) on tint band
3. "How we help" pillars — 3-up cards: Self-help, Exercise, Diet
4. Featured story / lived experience band
5. Conditions covered — pill band linking to condition pages
6. Resources for you — articles + library teaser
7. Donation impact band on `.section-accent`
8. Newsletter + contact on `.section-contrast`
9. Footer (existing 5-column, retuned to new tokens)

### 5. Cross-page audit

Walk every page route and confirm text is visible by token (not by `!important`). For each page:

- Replace any hard-coded `text-white`, `bg-black`, `text-gray-*` with semantic tokens.
- Replace any custom gradient text with solid `text-foreground` + optional red underline accent.
- Ensure card surfaces use `bg-card` / `border-border`, not stripped backgrounds.

Pages covered: `Index`, `AboutUs`, `Donate`, `ExerciseHub`, `DietHub`, `SelfHelpTool`, `BlogHub`, `BlogPost`, `Contact`, `Governance`, `Finances`, `Safeguarding`, `Accessibility`, `FAQ`, `Library`, `CommunityHub`, condition/city pages, plus the shared `Header`, `Footer`, `StickyDonateBar`, `DonationNotification`, and `CookieBanner`.

### 6. Verify

- Visual sweep of `/`, `/donate`, `/exercise-hub`, `/diet-hub`, `/about-us`, `/contact`, a blog post, and a condition page.
- Confirm: every wording black and legible, red used only for CTAs/icons/accents, no missing/invisible text, sections have clear surfaces, fonts are Montserrat + Open Sans throughout.

## Out of scope

- No backend, routing, donation logic, or content-copy rewrites beyond what's needed to remove dead/AI-flavoured phrases already on the cut list.
- No new pages or features.

## Technical notes

- Tokens stay HSL in `index.css` and `tailwind.config.ts` per project rules.
- Existing memory entries on red accent and "all text black" remain valid; the palette memory will be updated to record the British Red Cross red value `#EE2A24` (HSL 2 86% 54%) and the Montserrat/Open Sans pairing after implementation.
- No `dangerouslySetInnerHTML`, no Framer Motion route transitions, JSON-LD remains via `useEffect`.
