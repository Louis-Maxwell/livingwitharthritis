# Plan: Alt-text & image dimension/CLS audit

## Goal
Every `<img>`, `<Image>`, and background-image-critical asset across the site has:
- A **meaningful `alt`** attribute (or `alt=""` when the image is truly decorative)
- Explicit `width` and `height` (or a Tailwind `aspect-*` wrapper) so the layout doesn't shift when the image loads
- Correct `loading` hint (eager only for above-the-fold hero, lazy for the rest)

Fix every violation the audit surfaces.

## Approach

### 1. Static audit script — `scripts/audit-images.ts` (new)
Scans all `.tsx` under `src/` and reports per-file findings:

- **Missing alt** — `<img …>` with no `alt=` prop.
- **Non-meaningful alt** — alt equals `""`, `"image"`, `"photo"`, `"picture"`, `"img"`, `"icon"`, `"logo"` (unless it *is* a decorative image marked `role="presentation"` / `aria-hidden`), filename-only, or purely numeric.
- **Missing dimensions** — `<img …>` with no `width`/`height` and no `aspect-*` class on the img or its immediate wrapper.
- **Missing loading hint** — no `loading=` on non-hero images (informational; fixed only where obvious).
- **Duplicate `alt` from a mapped array** where the alt string is a hardcoded generic (e.g. `alt="Image"` in a `.map`).

Skip: `<img>` inside `.stories.tsx`, `node_modules`, generated `.asset.json` (not tsx), and any element with `aria-hidden="true"` or `role="presentation"` (treated as decorative → `alt=""` OK).

Emit a pass/fail summary and a machine-readable list. Non-zero exit on any critical finding (missing alt, missing dimensions on a non-wrapped `<img>`).

Wire it into `package.json` as `seo:images` and add it as a required step in `scripts/seo-audit.ts` so CI enforces it going forward.

### 2. Fix findings, batched by category
Once the audit runs, group findings and fix them file-by-file:

- **Meaningful alt text**: replace generic/empty alt with content-derived text — the surrounding heading, article title, exercise name, condition name, or city/service label — respecting the existing UK-English voice.
- **Decorative images**: keep `alt=""` but add `aria-hidden="true"` for clarity, so the scanner and screen readers agree.
- **Dimensions / CLS**: for raw `<img>`, add `width={W} height={H}` when the file's intrinsic size is known (or a reasonable ratio), otherwise wrap in `<div className="aspect-[ratio]">` + `className="size-full object-cover"` on the img. Prefer the aspect wrapper for responsive hero/card images so the ratio is preserved on all breakpoints.
- **Loading hints**: leave hero images `loading="eager"` + `fetchpriority="high"`; add `loading="lazy"` + `decoding="async"` to any below-the-fold image lacking one. Do not disturb existing intentional eager-load images.

Likely surfaces (based on repo shape): blog article covers, exercise cards, city/service programmatic pages, gallery, Faces of Arthritis, Openverse image list, hero splits, partner/logo strips.

### 3. Runtime spot-check via Playwright
Run a headless pass over ~8 representative routes (home, /conditions/osteoarthritis, /exercise, /blog, /gallery, /diet, /uk/london/physiotherapy, /site-index). For each:
- Enumerate `<img>` elements; assert every one has non-empty `alt` OR `aria-hidden="true"`.
- Assert every image has non-zero `naturalWidth`/`naturalHeight` (loads correctly).
- Capture layout-shift by comparing `getBoundingClientRect()` before and after `img.decode()` — flag any element whose top shifts more than 4px.

Report the sample results in the final summary; fix any runtime-only findings the static pass missed.

### 4. Verification
- `bun scripts/audit-images.ts` exits 0.
- `bun scripts/audit-meta-lengths.ts` still passes.
- `bunx tsgo --noEmit` green.
- Playwright spot-check clean.
- Final summary lists every file changed and a per-severity count.

## Out of scope
- No new imagery — only alt text, dimensions, loading hints on existing images.
- No design/layout changes beyond adding aspect wrappers where needed to prevent CLS.
- No changes to the Lovable Assets pipeline or `.asset.json` pointers.

## Deliverables
- `scripts/audit-images.ts` (new) + `seo:images` npm script + wired into `seo:audit`.
- All `.tsx` files with alt/dimension fixes.
- Final report of findings + count of fixes.