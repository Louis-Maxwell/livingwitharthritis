
# Fix: Publishing Build Failure — `Cannot read properties of undefined`

## Root Cause

The error persists despite previous fixes because of a second problematic `framer-motion` usage in `src/components/Header.tsx`.

The file uses `motion.header` — a semantic HTML element. In framer-motion v12 (currently on v12.26.2), the internal element registry for semantic HTML elements (`header`, `main`, `footer`, `nav`, `section`, `article`, etc.) underwent breaking changes. During production builds, Vite/Rollup's tree-shaking and minification can strip internal initialisation code that `motion.header` depends on, causing "Cannot read properties of undefined" at bundle time.

The exact same class of error was fixed previously when `motion.picture` was replaced with `motion.div`. The same fix must now be applied to `motion.header`.

## Evidence

In `src/components/Header.tsx` at line 43:
```
<motion.header
  initial={{ y: -80 }}
  animate={{ y: 0 }}
  ...
>
```

This is the only remaining `motion.[semantic-html]` element that is **eagerly loaded** (not lazy). The `motion.button` usages are not known to trigger this issue as `button` is a standard form element, but `header` is a structural/sectioning element that the framer-motion v12 registry handles differently.

## Fix (1 file change)

**`src/components/Header.tsx`** — Replace `motion.header` with a `motion.div` that carries a `role="banner"` attribute, which preserves accessibility semantics while removing the problematic element type:

```tsx
// BEFORE
<motion.header
  initial={{ y: -80 }}
  animate={{ y: 0 }}
  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
  className={`sticky top-0 z-50 ...`}
  role="banner"
>

// AFTER
<motion.div
  initial={{ y: -80 }}
  animate={{ y: 0 }}
  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
  className={`sticky top-0 z-50 ...`}
  role="banner"
>
```

The closing `</motion.header>` tag becomes `</motion.div>` to match.

## Why This Is Safe

- `role="banner"` on a `<div>` is semantically equivalent to an `<header>` element at the top level, preserving screen-reader and accessibility behaviour.
- All other framer-motion usages in the codebase are `motion.div` (safe) or `motion.button` (safe form element), so no other files need changing.
- No dependencies, pages, routes, or backend functions are affected.

## Technical Notes

- framer-motion v12 moved from an object-based to a Map-based internal element registry. Semantic HTML5 sectioning elements (`header`, `footer`, `main`, `nav`, `section`, `article`, `aside`) are populated lazily in development but the lazy population can be tree-shaken away in production Rollup builds, leaving an undefined Map entry.
- This is the same class of bug as the previously fixed `motion.picture` issue.
- The fix is the same pattern used throughout the rest of the codebase — wrapping with `motion.div`.
