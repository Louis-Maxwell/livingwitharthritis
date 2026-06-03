## Batch 1: Global CSS polish (on-system)

Surgical edits to `src/index.css` only. No new colours, no gradients on hero, no textures, no card shadow lifts beyond what's already permitted. White bg / black text / red accent stays.

### What changes

**1. Typography rhythm**
- Body `line-height` 1.65 → 1.7; `p` matches.
- H1 scale: `clamp(40px, 5vw, 64px)` → `clamp(44px, 5.5vw, 72px)`, letter-spacing −0.02em → −0.025em.
- H2 letter-spacing −0.02em → −0.022em.
- H3 22px → 24px for cleaner hierarchy gap.
- `.lead` line-height 1.55 → 1.6.

**2. Spacing tokens (additive)**
- Add `--space-section: clamp(4rem, 8vw, 8rem)` and `--space-section-tight: clamp(3rem, 6vw, 6rem)` for use in future page passes (no component edits this batch).

**3. Buttons — keep red, tighten interactions**
- `.btn-primary-cta:hover`: drop `scale(1.01)`, keep `translateY(-2px)`; shorten transition 0.5s → 0.25s for snappier feel.
- `.btn-ghost-premium:hover`: same transition shortening; border tint stays red at 0.25.
- Add global `button:focus-visible` + `a:focus-visible` outline: `2px solid hsl(var(--primary))`, `offset: 3px`, no glow.

**4. Links**
- Global `a` (in prose contexts only — scoped via `:where(p, li) a:not(.btn-primary-cta):not(.btn-ghost-premium)`) gets the existing `.story-link` underline-grow animation by default. Keeps black text, red on hover (already set).

**5. Cards — on-system flat refinement**
- `.premium-card:hover`: remove the `translateY(-6px)` lift → keep `translateY(-2px)` + border tint to red 0.12. Aligns with "borders stripped / flat institutional" rule (subtle, not floaty).
- `.card-hover:hover`: `translateY(-4px)` → `translateY(-2px)`, `shadow-xl` → `shadow-medium`.
- Tighten `--radius` 0.75rem → 0.625rem for a more institutional corner.

**6. Selection + focus consistency**
- Already red-tinted; no change needed.

### What is NOT changing
- No new CSS variables for accent colours (no teal, no gold beyond legacy aliases that already point to red).
- No gradient backgrounds added.
- No textures/patterns.
- Zero changes to `tailwind.config.ts`.
- Zero changes to any component file.
- No memory updates needed — every change respects existing Core rules.

### Files touched
- `src/index.css` (one file, ~10 small edits)

### Verification
- Reload `/` and `/blog` in preview; confirm hover/focus feel snappier and headings have stronger hierarchy.
- No runtime errors expected (CSS-only).

Ready to switch to build mode and apply.