# Fix the blank screen (dev server is crashing)

## What's happening

The preview is blank because the dev server isn't running — it crashes on startup
during dependency pre-bundling. The log shows 2095 identical errors, e.g.:

```text
Transforming destructuring to the configured target environment
("chrome87", "edge88", "es2020", "firefox78", "safari14" + 2 overrides)
is not supported yet
  node_modules/@floating-ui/core/dist/floating-ui.core.mjs
...
Error: Build failed with 2095 errors
error: script "dev" exited with code 1
```

Right after that, `http://localhost:8080` refuses connections, so the browser
gets nothing to render.

## Root cause

`package.json` forces `esbuild` to `^0.28.2` in devDependencies, `overrides`,
and `resolutions` (installed version: 0.28.2). Vite 6.4.3 expects the 0.25.x
line. The newer esbuild changes how targets/lowering are handled, so Vite's
standard target list is rejected and every dependency fails to pre-bundle.

## Fix

1. Pin `esbuild` to the version range Vite 6.4.3 supports (`^0.25.12`, which is
   past the esbuild dev-server CVE fix) in all three places in `package.json`:
   devDependencies, `overrides`, `resolutions`.
2. Reinstall so the lockfile and `node_modules` match.
3. Clear the stale `node_modules/.vite` dep-optimizer cache (the log also shows
   missing pre-bundled files there).
4. Restart the dev server and confirm it stays up.

## Verification

- Dev server starts with no esbuild errors in the log.
- Load the homepage in a headless browser: `#root` renders content, no console
  errors, screenshot shows the real page.
- Run a production build to confirm nothing else regressed.
