# Plan: Typography Scale + White Surfaces + Borderless Cards

Three coordinated token-level changes, applied globally so every page and component picks them up automatically.

## 1. Typography scale (arthritis.org-inspired)

Match the reference screenshot's editorial rhythm. Add base font sizes globally in `src/index.css`:

- **Body / paragraphs:** 16px, line-height 1.65
- **Small / captions:** 13px
- **H1 (hero):** clamp(40px, 5vw, 64px), weight 700, line-height 1.05
- **H2 (section):** clamp(28px, 3vw, 40px), weight 700
- **H3 (card/group):** 22px, weight 700
- **H4:** 18px, weight 700
- **H5:** 15px, weight 600
- **H6 / eyebrow:** 11px uppercase, tracking 0.25em
- **Lead paragraph:** 18px, line-height 1.55

Applied via `h1–h6`, `p`, `.lead`, `.eyebrow` rules in the global layer so no per-component edits needed.

## 2. White background everywhere (frontend + admin)

Already enforced in `:root` and `.dark`. Add a belt-and-braces safety net:

- `html, body, #root { background: #fff !important; }`
- Force `--background`, `--card`, `--popover`, `--muted`, `--accent`, `--secondary`, `--sidebar-background` all to `0 0% 100%` (already are — re-verify)
- Neutralise any leftover `bg-gradient-*`, `bg-primary`, `bg-secondary` section utilities that could paint a coloured band: override `.bg-primary, .bg-secondary, .bg-accent, .bg-muted, .bg-gradient-medical { background: #fff !important; }` only at the *section/page* level via `section, main, article, aside, header, footer { background-color: #fff !important; }`. Buttons keep their red via `.btn-*` rules unaffected.

## 3. Remove red borders from boxes

Strip the red border ring globally:

- Change `--border` from red to `0 0% 100% / 0` (transparent / white)
- Remove the global `* { @apply border-border }` red effect by re-aliasing border to transparent
- Override `.card, .premium-card, .glass-card, .feature-pill, .trust-badge, [class*="border"]` to `border-color: transparent !important` at the base layer
- Keep button outlines intact (red fills, white text — no border needed)

## Out of Scope

- No layout, copy, or component-structure changes
- No backend logic changes (admin gets the same CSS, that's all)
- No image swaps

## Files touched

- `src/index.css` (single file — all changes are token + global rules)
- `mem://style/visual-identity` updated with the new type scale and "no borders" rule
