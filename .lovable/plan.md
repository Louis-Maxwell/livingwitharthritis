# Fix missing words & force all text black sitewide

## Problem
Some pages show "missing" words. Cause: many components use Tailwind classes that resolve to **white text** (e.g. `text-white`, `text-primary-foreground`, `text-card-foreground`, `text-muted-foreground`) on top of the now-white background — so the words render but are invisible.

The previous black-text rule only targeted generic tags (`p`, `span`, `div`…). It does not override Tailwind utilities like `text-white` because those have higher specificity via the class selector and matching `!important` in some places.

## Fix (single file: `src/index.css`)

1. **Flip remaining red foreground tokens to black** so any Tailwind utility built on them resolves to black:
   - `--card-foreground`, `--popover-foreground`, `--muted-foreground`, `--accent-foreground`, `--sidebar-foreground`, `--sidebar-accent-foreground` → `0 0% 0%`
   - Same for the `.dark` block.

2. **Add an aggressive override** that forces every text-colour utility to black, regardless of which element it sits on:
   ```css
   [class*="text-white"],
   [class*="text-primary-foreground"],
   [class*="text-secondary-foreground"],
   [class*="text-muted-foreground"],
   [class*="text-card-foreground"],
   [class*="text-popover-foreground"],
   [class*="text-accent-foreground"],
   [class*="text-destructive-foreground"],
   [class*="text-sidebar-foreground"],
   [style*="color:"] {
     color: #000 !important;
   }
   ```

3. **Preserve legibility on red fills only** — keep the existing rule that forces white text inside `bg-primary / bg-secondary / bg-destructive` containers and on `.btn-primary-cta / .btn-secondary-cta / .btn-premium / .btn-gold`. This rule comes *after* the override so red buttons still show white labels.

4. **Inline styles**: nothing in the codebase needs changing — the `[style*="color:"]` selector + `!important` neutralises any inline white text.

## Out of scope
- No layout, spacing, font-size, or component changes.
- Backgrounds stay white, borders stay stripped, icons/buttons stay red.
- No edits to any `.tsx` file.

## Memory update
- `mem://style/visual-identity`: note that ALL text (including utilities like `text-white`, `text-*-foreground`) renders black except inside red button fills.
