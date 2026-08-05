# Automated alerts for risky CSS utility changes

Goal: catch two classes of regression automatically — Tailwind utilities that are ambiguous (like the `duration-[1200ms]` warnings just fixed) or otherwise unsafe, and layout breakage caused by styling edits.

## 1. Tailwind warning guard (fast, runs everywhere)

New script `scripts/check-css-utilities.mjs`:

- Runs the Tailwind CLI once over the project content and captures stderr. Any line containing `ambiguous`, `does not exist`, or `Unnecessary` fails the check with the file and class named.
- Adds a static scan of `src/**/*.{ts,tsx,css}` for known-risky patterns, each with a clear message:
  - `duration-[...]`, `delay-[...]`, `ease-[...]` bare arbitrary values (ambiguous between transition and animation) — require `[transition-duration:...]` / `[animation-duration:...]` form.
  - Hardcoded colour utilities (`text-white`, `bg-black`, `bg-[#...]`, `text-[#...]`) which bypass the design tokens.
- Exit code 1 with a grouped, file:line report; `--json` flag writes `.preflight-reports/css-utilities-<timestamp>.json` for CI artifacts.

Wired up as `npm run css:check`.

## 2. Layout regression alerts (screenshot diffs)

Extend the existing `tests/visual/` Playwright suite with `tests/visual/layout-snapshots.spec.ts`:

- Captures element screenshots at mobile (390px) and desktop (1280px) for the sections most exposed to utility edits: header, hero, faces strip, impact progress band, featured story band, footer.
- Uses `toHaveScreenshot` with a small pixel tolerance so genuine breakage fails but font antialiasing does not.
- Adds a lightweight assertion pass: no horizontal overflow (`scrollWidth <= clientWidth` on `body`) and no element wider than the viewport at 390px — this catches the common "layout broke" case even without baseline images.
- Baselines committed under `tests/visual/layout-snapshots.spec.ts-snapshots/`.

## 3. Where the alerts fire

- **CI (`.github/workflows/ci.yml`)** — new "CSS utility check" step after Typecheck, before Build. Fails the PR.
- **CI (`.github/workflows/tests.yml`)** — the layout snapshot spec runs inside the existing Playwright job; the report artifact already uploads diff images on failure.
- **Local pre-push (`lefthook.yml`)** — add a `css-utilities` command alongside the Supabase lint so problems surface before a push.
- **Pre-publish (`scripts/prepublish-smoke.mjs`)** — insert the CSS utility check as a new stage 1.5 (before the production build), recorded in the existing JSON report so a publish is gated on it too.

## Technical notes

- Tailwind v3 has no `transition-duration-[...]` prefix; the guard enforces the arbitrary-property form `[transition-duration:1200ms]` that the codebase now uses.
- The static scan is regex-based over source files, so it runs in well under a second and needs no build.
- Colour-token violations start as **warnings** (non-failing) for one pass so existing occurrences can be triaged, then flip to failing; the flag lives at the top of the script.

## Verification

- Run `npm run css:check` on the current tree: expect a pass (the ambiguous durations were fixed).
- Temporarily reintroduce `duration-[1200ms]` in one component and confirm the script fails with that file and line, then revert.
- Run the Playwright visual config locally to generate and confirm baselines, and confirm the overflow assertions pass at 390px and 1280px.
- Run `npm run smoke:prepublish` and confirm the new stage appears and passes.
