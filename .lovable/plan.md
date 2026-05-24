# Plan: Force black on all headings + subheadings (site-wide)

Headings (h1–h6) are already locked to black via `src/index.css`. This plan extends the rule so every form of subheading — across landing pages, content pages, and admin — also reads as pure black.

## Change

Single edit in `src/index.css`, base layer. Expand the black-text selector to cover all common subheading patterns used in this codebase and shadcn primitives:

- `h1, h2, h3, h4, h5, h6` (already)
- `[data-eyebrow], .section-label, .eyebrow, .subheading, .subhead` (already)
- **Add:**
  - `[role="heading"]`
  - `.lead` (lead paragraph under a heading)
  - `[class*="DialogTitle"], [class*="CardTitle"], [class*="SheetTitle"], [class*="AlertTitle"], [class*="DrawerTitle"]` (shadcn primitives)
  - `.card-title, .dialog-title, .alert-title, .sheet-title, .drawer-title, .popover-title`
  - `dt` (definition list terms used as mini-headings)
  - `legend` (fieldset legends in admin forms)
  - `label[data-heading], .form-section-title`

All forced with `color: #000 !important;` so no component-level Tailwind class (`text-primary`, `text-foreground`, `text-white`) can override.

## Out of scope

- Body text, links, icons, buttons stay red.
- No component edits.
- No layout/typography size changes.

## Files

- `src/index.css` (single base-layer rule expansion)
