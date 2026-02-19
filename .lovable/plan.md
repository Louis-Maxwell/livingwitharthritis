
# Fix: Remaining Publishing Error — `motion.h1` and `motion.p` in Auth.tsx

## Root Cause

The "Cannot read properties of undefined" build error is caused by two remaining framer-motion semantic element usages in `src/pages/Auth.tsx`:

- `motion.h1` (line 56)
- `motion.p` (line 64)

These are the same class of bug that has been fixed previously with `motion.header` and `motion.picture`. In framer-motion v12, the internal element registry for semantic HTML elements can be tree-shaken away during Vite/Rollup production builds, leaving an undefined Map entry — which crashes the build with "Cannot read properties of undefined".

All other framer-motion usages across the entire codebase are confirmed safe:
- `motion.div` — used throughout (safe)
- `motion.button` — used in Header.tsx (safe)

The `tailwind.config.ts` fix (replacing `require()` with ESM imports) has already been applied correctly.

## Evidence

Full codebase search confirms `motion.h1` and `motion.p` appear **only** in `src/pages/Auth.tsx`:

```tsx
// Lines 56–71 of src/pages/Auth.tsx
<motion.h1
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2 }}
  className="font-display text-3xl font-bold text-foreground mb-2"
>
  Welcome Back
</motion.h1>
<motion.p
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.3 }}
  className="text-muted-foreground"
>
  Sign in to access the virtual physiotherapy assistant
</motion.p>
```

## Fix (1 file changed)

**`src/pages/Auth.tsx`** — Wrap both elements in `motion.div` wrappers instead of using the semantic element variants directly:

```tsx
// BEFORE
<motion.h1 initial={...} animate={...} transition={...} className="...">
  Welcome Back
</motion.h1>
<motion.p initial={...} animate={...} transition={...} className="...">
  Sign in to access...
</motion.p>

// AFTER
<motion.div initial={...} animate={...} transition={...}>
  <h1 className="...">Welcome Back</h1>
</motion.div>
<motion.div initial={...} animate={...} transition={...}>
  <p className="...">Sign in to access...</p>
</motion.div>
```

The animation and visual result are identical — the `motion.div` wrapper still carries the fade/slide animation, while the inner `h1` and `p` tags preserve correct semantic HTML structure.

## Why This Is The Last Remaining Issue

- `tailwind.config.ts`: Fixed (ESM imports now used)
- `motion.header` in Header.tsx: Fixed (replaced with `motion.div role="banner"`)
- `motion.picture` in HeroSection.tsx: Fixed (picture element removed entirely)
- `motion.h1` and `motion.p` in Auth.tsx: **This fix**
- All other files: Only use `motion.div` or `motion.button` — both confirmed safe

## Why This Is Safe

- Wrapping `h1` and `p` in `motion.div` does not change accessibility — screen readers still read the inner `h1` and `p` tags correctly.
- The animations (opacity fade, y-axis slide) remain identical.
- No routing, backend, database, or other components are affected.

## Technical Notes

framer-motion v12 moved to a Map-based internal element registry. Semantic HTML elements (`h1`–`h6`, `p`, `header`, `footer`, `nav`, `section`, etc.) are registered lazily in development but the lazy registration code can be removed by Rollup's tree-shaker in production builds, leaving `undefined` for those element types. Using `motion.div` bypasses this entirely as `div` is always in the core registry.
