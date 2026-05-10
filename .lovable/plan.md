## Goal
Enforce a strict 2-colour palette across the entire site: **red** (accent/primary) and **black** (text/structure) on a **white** background. Remove all other hues (greens, blues, ambers, purples, greys-with-tint, gradients to other colours).

## Approach

The site is fully token-driven via `src/index.css` and `tailwind.config.ts`. Locking the palette at the token layer cascades to every component without touching individual files.

### 1. Rewrite design tokens (`src/index.css`)
Reduce the HSL token set to three values only:
- `--background: 0 0% 100%` (white)
- `--foreground: 0 0% 0%` (black)
- `--primary: 0 85% 45%` (crimson red — keep current Aevolve red)

Map every other semantic token to one of those three (or a pure neutral derived from black with opacity):
- `--secondary`, `--muted`, `--accent`, `--card`, `--popover` → white bg / black fg
- `--border`, `--input` → black at low opacity (e.g. `0 0% 0% / 0.12`)
- `--destructive` → red
- `--ring` → red
- Sidebar tokens → same mapping
- Dark mode block: invert (black bg, white fg, same red) — or remove dark mode if not used

### 2. Strip multi-colour gradients
Search for and neutralise:
- `--gradient-*` custom properties → red→black or solid red
- Tailwind classes like `from-emerald-*`, `to-blue-*`, `bg-amber-*`, `text-green-*`, `via-purple-*` used directly in components
- Hard-coded hex/rgb values in component files

### 3. Audit hard-coded colour classes
Run `rg` for non-token colour usage:
- `(bg|text|border|from|to|via)-(red|blue|green|amber|emerald|purple|pink|orange|yellow|indigo|teal|cyan|rose|lime|sky|violet|fuchsia)-[0-9]`
- Hex literals `#[0-9a-f]{3,8}` in `src/**/*.{tsx,ts,css}`
- Replace with semantic tokens (`text-primary`, `text-foreground`, `bg-background`, `border-border`)

### 4. Charts, badges, status indicators
Components like triage results, buddy compatibility, admin dashboards may use green=good / amber=warn / red=bad. Convert to:
- Black for neutral/good
- Red for emphasis/bad
- Use weight, opacity, or icons to convey state instead of hue

### 5. Images
Photos remain full-colour (out of scope — covering UI chrome only). Confirm with you if you also want duotone treatment on hero imagery.

### 6. Verify
- Visual sweep of: Home, Articles, Donate, Self-Assessment, Buddy, Admin, Footer
- Check dark-mode toggle (if active) still readable
- Confirm no Tailwind `*-500` colour classes remain outside the red family

## Out of scope
- Photographic content (kept as-is)
- Logo artwork
- Third-party embeds (Stripe, GA)

## Question before I build
Do you want **status colours** (success/warning/error in forms, toasts, admin tables) to also collapse to red+black? Strict reading = yes; usability reading = keep a green tick for "saved". I'll default to **strict red+black** unless you say otherwise.
