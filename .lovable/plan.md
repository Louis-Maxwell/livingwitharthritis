
# Root Cause: `@tailwindcss/typography` Is in devDependencies — Missing in Cloud Build

## The Problem

After a full audit of all 21 files using framer-motion, every file only uses `motion.div` or `motion.button` — these are safe. The `tailwind.config.ts` ESM imports are correct. So why does the build still fail?

The answer is in `package.json`:

```json
"devDependencies": {
  "@tailwindcss/typography": "^0.5.19",
  ...
}
```

The `tailwind.config.ts` file imports it:

```ts
import typography from "@tailwindcss/typography";
```

Vite's cloud/production build environment installs **only `dependencies`**, not `devDependencies`. This means when the build runs `tailwind.config.ts`, it tries to `import "@tailwindcss/typography"` — but the package doesn't exist — causing "Cannot read properties of undefined" as the import resolves to `undefined` and Tailwind tries to use it as a plugin.

`tailwindcss-animate` has the same risk — it is also in `dependencies` but only because it was there originally. If it were moved to `devDependencies`, the same crash would occur.

## Evidence

- `package.json` line 72: `"@tailwindcss/typography": "^0.5.19"` is under `devDependencies`
- `tailwind.config.ts` line 3: `import typography from "@tailwindcss/typography";`
- `tailwind.config.ts` line 116: `plugins: [tailwindcssAnimate, typography]` — if `typography` is `undefined`, this crashes with "Cannot read properties of undefined"
- `tailwindcss-animate` line 66 in dependencies: currently safe as it is in `dependencies`

## The Fix

Move `@tailwindcss/typography` from `devDependencies` into `dependencies` in `package.json`. This ensures the cloud build environment installs it and the import resolves correctly.

```json
// BEFORE (package.json devDependencies):
"@tailwindcss/typography": "^0.5.19"

// AFTER (package.json dependencies):
"@tailwindcss/typography": "^0.5.19"
```

## Why This Is The Definitive Fix

- All framer-motion semantic elements have been resolved (confirmed: only `motion.div` / `motion.button` remain)
- The `tailwind.config.ts` ESM imports are correct
- The only remaining issue is the missing package in the production build environment
- Moving it to `dependencies` makes it available at build time in cloud/production

## What Will NOT Change

- No visual changes to the site
- No component code changes needed
- No Tailwind class changes needed — all classes already written will work

## Files Changed

Only 1 file: `package.json` — move `@tailwindcss/typography` from `devDependencies` to `dependencies`.
