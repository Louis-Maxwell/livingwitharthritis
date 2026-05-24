# Plan: All text in black

Override the current red body-text rule. Everything readable on the site (headings, paragraphs, links, lists, labels, tables, form text, admin) becomes pure black `#000`. Red stays only for **non-text** elements: button fills, icons, borders/divider strokes, hover states.

## Change

Single edit in `src/index.css`:

1. Flip `--foreground` token from red → `0 0% 0%` (black). This recolours body, cards, popovers, muted-foreground, sidebar text, etc., everywhere.
2. Add a belt-and-braces base rule: `body, p, span, li, a, td, th, label, input, textarea, select, button, blockquote, figcaption, cite, em, strong { color: #000 !important; }`.
3. Keep CTA buttons readable: `.btn-primary-cta, .btn-secondary-cta, [class*="bg-primary"], [class*="bg-secondary"] { color: #fff !important; }` so white text stays on red fills.
4. Links underlined in black; hover state stays red.

## Out of scope

- No layout, font-size, or component changes.
- Backgrounds remain white, borders remain transparent, icons/buttons remain red.

## Memory

Update `mem://style/visual-identity` + Core index line: text is **black**, red is reserved for buttons, icons, and accents (not text).

## Files

- `src/index.css`
- `mem://index.md`, `mem://style/visual-identity`
