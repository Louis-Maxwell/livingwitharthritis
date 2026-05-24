# Plan: Arthritis Foundation-Inspired Re-Skin

Apply a strict three-colour system across the entire site (frontend + admin), inspired by arthritis.org structure and treatment of green → mapped to red.

## Colour System (locked)

- **Background:** pure white (`#FFFFFF`) everywhere — no off-whites, no grey panels, no dark sections.
- **Headings & subheadings (h1–h6, eyebrow labels):** black (`#000000`).
- **Body text, links, accents, buttons, icons, dividers, badges:** red (Arthritis Foundation–style crimson, `#E4002B`).
- **Hover/active red:** slightly darker (`#B8001F`).
- **No greens, no purples, no greys for surfaces, no dark mode panels.**

This **overrides** the prior "red text on white, white text on red — no black at all" rule. The new invariant is **white bg / black headings / red everything else**. Memory will be updated.

## Inspiration Mapping (arthritis.org → this site)

| arthritis.org element | Our treatment |
|---|---|
| Green primary CTA | Red CTA (`#E4002B`) with white text |
| Green section dividers / icon accents | Red |
| Green stat numbers / highlights | Red |
| White card backgrounds on light grey page | White cards on white page, separated by red 1px borders or red rule lines |
| Black serif/sans headings | Keep current Playfair Display, recolour to black |
| Hero photo bands | Keep imagery, overlay white panel with black headline + red CTA |

## Scope

### 1. Design tokens (`src/index.css`, `tailwind.config.ts`)
- Rewrite `--background` → white in both light and dark blocks (kill dark mode entirely or alias dark → light).
- `--foreground` → black for headings via component utilities; body text → red.
- `--primary` → red `#E4002B` (HSL).
- `--card`, `--popover`, `--muted`, `--secondary`, `--accent` → all white surfaces with red borders.
- `--border` → red at low opacity.
- Remove gradient tokens that introduce other colours.

### 2. Global component sweep
Force the palette in every place currently using greens, greys, gradients, or dark surfaces:
- Header, Footer, Hero, all landing sections (`src/components/landing/*`)
- All page templates (`src/pages/**`) including conditions, diet, exercise, blog, donate, admin
- UI primitives (`button`, `card`, `badge`, `alert`, `dialog`, `sheet`, `toast`, `tabs`, `input`, `table`) — variants normalised to white-bg / black-heading / red-accent
- Admin dashboards — same palette (no dark admin theme)
- Chat/Support widget, modals, banners

### 3. Headings
Add a global rule: `h1, h2, h3, h4, h5, h6, [data-eyebrow] { color: #000; }`. All other text inherits red.

### 4. Imagery
Keep existing photos. Where overlays previously used dark gradients, switch to white-to-transparent gradients so text panels stay white.

### 5. Memory update
Replace the strict no-black rule with the new white/black-headings/red rule in `mem://style/visual-identity` and update `mem://index.md` Core line.

## Out of Scope
- No backend logic, RLS, or data model changes.
- No new pages, no copy rewrites, no new features.
- No layout restructuring beyond colour/surface adjustments.

## Technical Notes
- All colours defined as HSL in `index.css`; Tailwind classes use semantic tokens only.
- Dark mode class kept as alias to light to avoid breaking `ThemeProvider` consumers.
- Estimated touched files: ~70 (tokens + components + pages already on the red list, plus admin pages and remaining greens).
