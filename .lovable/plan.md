## Goal

Build a small UK-focused tai chi for arthritis content cluster targeting the niche identified in keyword research: **"tai chi for arthritis"** (110/mo, KDI 38), plus joint-specific and seated variants where competition is near zero.

## What already exists

- `src/pages/exercises/TaiChiForBalance.tsx` — single deep-dive page on tai chi for balance.
- `src/pages/ExerciseJointPage.tsx` — auto-generates `/exercises/{type}-for-{joint}-arthritis` routes from `src/data/exerciseJointMatrix.ts`. So `/exercises/tai-chi-for-knee-arthritis`, `/exercises/tai-chi-for-hip-arthritis` etc. **already exist** but use a generic shared template — no UK-specific framing, no meta tailored per page.
- No hub page for "tai chi for arthritis" overall, and no seated tai chi page.

## What to add

### 1. Hub page — `/exercises/tai-chi-for-arthritis`
New page, primary target keyword **"tai chi for arthritis"** (110/mo, KDI 38).

- H1: "Tai Chi for Arthritis: A UK Guide"
- Sections: what it is · NHS-aligned evidence (Versus Arthritis / NICE refs) · benefits per joint · how to start in the UK (free YouTube, council classes, Tai Chi for Health Institute UK chapter) · 6 video clips already in `src/assets/tc-*.mp4`
- Internal links out to the 6 joint-specific matrix pages + new seated page + existing `/exercises/tai-chi-for-balance`
- Answers the question keywords as on-page FAQ (`is tai chi good for arthritis`, `is tai chi good for rheumatoid arthritis`, `is yoga or tai chi better for arthritis`) → FAQPage JSON-LD via `useEffect` (per project memory)
- Meta title <60 chars, description <160 chars, en-GB

### 2. Seated tai chi page — `/exercises/seated-tai-chi-for-arthritis`
New page targeting the long-tail "seated tai chi for arthritis" cluster (low volume but zero competition, high accessibility value for the audience).

- H1: "Seated Tai Chi for Arthritis"
- Chair-based version of the 5 existing tai chi forms, evidence on accessibility, who it's for (severe knee/hip OA, post-surgery, frailty)
- Reuses existing tc-*.mp4 clips with seated variation copy
- Internal links to hub + joint pages

### 3. UK-focused enrichment for existing matrix pages
The auto-generated `/exercises/tai-chi-for-{knee,hip,hand,shoulder,back,ankle}-arthritis` pages share one generic template. Add per-page UK overrides without breaking the generator:

- Extend `src/data/exerciseJointMatrix.ts` with optional `seoMeta` and `ukIntro` fields per (exercise, joint) pair
- Update `ExerciseJointPage.tsx` to use those when present (fallback to current copy otherwise)
- Populate UK-specific overrides only for the 6 tai chi × joint combinations in this pass

### 4. Wire-up

- Add 2 new lazy routes in `src/App.tsx`
- Add the 2 new URLs to `public/sitemap.xml` (priority 0.75, weekly)
- Link the hub from `ExerciseHub.tsx` and `TaiChiForBalance.tsx`
- Add a small "Tai Chi" callout block on the existing matrix template

## Out of scope

- No new video assets (reuse existing `tc-*.mp4`)
- No changes to other exercise types (yoga, swimming, etc.)
- No edits to global navigation
- No changes to `ExerciseJointPage` data shape beyond optional fields
- No marketing CTAs beyond existing donation/contact patterns

## Files to touch

- **New:** `src/pages/exercises/TaiChiForArthritis.tsx`
- **New:** `src/pages/exercises/SeatedTaiChiForArthritis.tsx`
- **Edit:** `src/App.tsx` (2 routes)
- **Edit:** `src/data/exerciseJointMatrix.ts` (optional UK override fields)
- **Edit:** `src/pages/ExerciseJointPage.tsx` (consume overrides)
- **Edit:** `src/pages/ExerciseHub.tsx` (link hub)
- **Edit:** `public/sitemap.xml` (2 entries)
