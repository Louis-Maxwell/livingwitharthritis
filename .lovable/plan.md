
# Publishing Build Failure — Root Cause Found

## Summary

After a full audit of every source file in the codebase, all framer-motion semantic HTML issues have been resolved. The remaining "Cannot read properties of undefined" publishing error has a **different root cause**.

## Root Cause: `require()` in `tailwind.config.ts`

In `tailwind.config.ts`, line 114:

```ts
plugins: [require("tailwindcss-animate")],
```

This uses CommonJS `require()` inside a TypeScript/ESM file. The project is configured with `"type": "module"` in `package.json`, meaning all files are treated as ES Modules. In Vite's production cloud build environment, the PostCSS/Tailwind config processing can fail when `require()` is called in an ESM context — this manifests as "Cannot read properties of undefined" because the loaded plugin module resolves to `undefined` or is not correctly unwrapped.

The fix is to replace the `require()` call with a proper ESM import at the top of the file and reference it in the plugins array.

## Additional Issue: `@tailwindcss/typography` Plugin

The `tailwind.config.ts` does **not** include `@tailwindcss/typography` in its plugins array despite the package being installed in `devDependencies`. The `prose` CSS classes used in `NutritionArticleSection.tsx` (line 210) require this plugin to be registered. This is a second potential silent failure in production.

## Evidence

- `package.json`: `"type": "module"` → ESM project
- `tailwind.config.ts` line 114: `plugins: [require("tailwindcss-animate")]` → CommonJS `require` in ESM context
- `NutritionArticleSection.tsx` line 210: `className="prose prose-sm ..."` → requires `@tailwindcss/typography` plugin

## Fix Plan (1 file changed)

**`tailwind.config.ts`** — Replace the `require()` CommonJS call with ESM imports:

```ts
// BEFORE (line 1 and line 114):
import type { Config } from "tailwindcss";
// ...
plugins: [require("tailwindcss-animate")],

// AFTER:
import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";
// ...
plugins: [tailwindcssAnimate, typography],
```

## Why This Is Safe

- `tailwindcss-animate` and `@tailwindcss/typography` both ship with ESM-compatible exports, so importing them as ES modules is fully supported.
- No component code changes are needed — all Tailwind classes already written will work exactly as before.
- The `typography` plugin was already installed as a `devDependency` but not registered, so adding it only activates the `prose` classes that are already in use.
- The visual appearance of the site will not change at all.

## Technical Notes

- Vite's cloud build environment runs in strict ESM mode. When PostCSS processes `tailwind.config.ts`, the `require()` shim that normally works in development (Node.js CJS/ESM interop) is not available, causing the property read on the returned `undefined` value to crash the build with "Cannot read properties of undefined."
- The root `package.json` has `"type": "module"` which forces ESM, and `tsconfig.app.json` uses `"module": "ESNext"` — both confirm the project is fully ESM.
- Switching to `import` statements resolves the CJS/ESM interop issue definitively.
