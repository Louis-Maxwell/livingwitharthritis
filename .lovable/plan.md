## Goal
Ensure the landing page never goes blank when a lazy-loaded section fails to load or is slow. Every lazy section will get a skeleton fallback while loading and an inline error state if loading fails.

## Approach

### 1. Create a reusable `LazySection` wrapper
New file: `src/components/landing/LazySection.tsx`

- Wraps children in a per-section `ErrorBoundary` plus `Suspense`.
- Props: `fallback?` (defaults to `<SkeletonSection />`), `name` (for error message + retry telemetry), `children`.
- Error fallback: a compact, on-brand panel ("This section couldn't load — Retry") with a button that resets the boundary (forces re-render / re-import).
- Allows passing `fallback={null}` for non-visual sections (e.g. `BackToTopButton`, `CookieBanner`).

### 2. Extend `ErrorBoundary` (if needed)
Confirm `src/components/ErrorBoundary.tsx` supports a `resetKeys` or exposes a `reset()` method. If not, the new LazySection will manage its own boundary internally with a small inline class component so retry actually re-mounts the lazy import.

### 3. Update `src/pages/Index.tsx`
Replace each `<Suspense fallback={...}>...</Suspense>` block around lazy sections with `<LazySection>...</LazySection>`:
- `AggregatedSocialProof`, `MissionStatementBand`, `EditorialIndex`, `FeaturedStoryBand`, `PortraitGrid`, `HowItWorksSection`, `Footer`
- Keep `fallback={null}` for `BackToTopButton` and `CookieBanner` (no visible skeleton needed).
- Footer keeps its existing tall placeholder fallback.

### 4. Verify
- Build passes.
- Preview loads without blank screen.
- Temporarily throw inside one lazy section to confirm inline error UI renders without crashing the whole page (revert after verification).

## Files touched
- New: `src/components/landing/LazySection.tsx`
- Edit: `src/pages/Index.tsx`
- Possibly edit: `src/components/ErrorBoundary.tsx` (only if it lacks reset support)

## Out of scope
- Refactoring the lazy imports themselves.
- Changing section content or styling beyond the new error panel.
