## Goal
Bring the Pedometer page up to WCAG 2.1 AA: full keyboard navigation, complete ARIA labelling, and contrast that respects the site's light/dark/high-contrast tokens. Behaviour stays identical.

## Scope
Frontend-only changes to:
- `src/components/pedometer/PedometerApp.tsx` (main work)
- `src/pages/Pedometer.tsx` (small landmark / skip-link tweaks)

No backend, no data, no business-logic changes.

---

## 1. Keyboard navigation

- **Tabs (`Today / History / Awards`)** — convert the row of `<button>`s into a proper WAI-ARIA tablist:
  - Container: `role="tablist"`, `aria-label="Pedometer views"`.
  - Each tab: `role="tab"`, `aria-selected`, `aria-controls="panel-<id>"`, `id="tab-<id>"`, `tabIndex={selected ? 0 : -1}`.
  - Arrow-Left / Arrow-Right / Home / End move focus and activate the tab (roving tabindex).
  - Each panel: `role="tabpanel"`, `aria-labelledby`, `tabIndex={0}` so it is reachable.
- **History sub-toggle (`Week / Month`)** — same tablist pattern, scoped.
- **Settings dialog**:
  - Trap focus inside while open; restore focus to the gear button on close.
  - `Escape` closes it.
  - First focusable element (close button) receives focus on open.
  - Backdrop click still closes, but is no longer the only path.
- **Step-goal preset chips & unit toggle**: already buttons; add `aria-pressed` for the selected state so keyboard/SR users get feedback.
- **Range slider**: keep native `<input type="range">` (already keyboard-accessible) and add `aria-valuetext` like "10,000 steps".
- **Start / Stop tracking button**: add `aria-pressed={isTracking}` and update `aria-label` dynamically.
- All interactive elements get visible focus rings using the existing `focus-visible:ring-2 ring-ring ring-offset-2` tokens (currently inline-styled buttons have no focus outline).

## 2. ARIA & semantics

- Replace the outermost `<div>` with `<section aria-label="Step tracker">`.
- StepRing SVG: wrap in a group with `role="img"` and `aria-label="{steps} steps today, {pct}% of {goal} goal"`. Hide decorative `<text>` from AT via `aria-hidden`.
- BarChart: add `role="img"` + `aria-label` summary ("Weekly steps: Mon 7,200; Tue 9,000; ..."). Tooltip becomes `role="tooltip"` with `aria-describedby` wiring on focus, and bars become focusable (`tabIndex=0`) so keyboard users can read each day's value.
- MetricCard: wrap value+label in a single accessible name (`aria-label="Distance: 4.2 kilometres"`); hide emoji icons with `aria-hidden`.
- Achievement grid: `role="list"` + `role="listitem"`; each badge `aria-label="{title}: {desc}. {Unlocked|Locked}"`.
- Achievement summary progress: replace the custom div bar with `role="progressbar"` + `aria-valuemin/max/now/valuetext`.
- Decorative emoji throughout (`🔥`, `📍`, `🏆`, etc.) get `aria-hidden="true"` so SR users don't hear "fire emoji".
- Settings dialog: add `aria-labelledby` pointing to the heading, ensure it's portalled / on top of `<main>` with `aria-hidden` applied to background content while open.
- `Pedometer.tsx`: ensure `<main id="main-content">` is the only `<main>`, and that the global skip-link target works (it already does; just verify).

## 3. Color contrast & theming

The component currently hard-codes a dark palette (`#0d0f1e`, `#ffffff60`, `#FF6B35`) inline. This:
- ignores the site's light theme,
- breaks the high-contrast toggle in `AccessibilityToolbar`,
- produces sub-AA contrast for muted text (`#ffffff60` on `#1e2340` ≈ 3.4:1).

Fix:
- Migrate inline styles to Tailwind classes using semantic tokens (`bg-card`, `bg-muted`, `text-foreground`, `text-muted-foreground`, `border-border`, `ring-ring`).
- Keep the brand orange→pink ring/CTA, but expose them as new tokens so they respond to high-contrast:
  - Add to `src/index.css`: `--pedo-accent`, `--pedo-accent-2`, `--pedo-gold` (HSL) for default and `.high-contrast` overrides (saturated, AA-compliant against both backgrounds).
  - Add Tailwind aliases in `tailwind.config.ts` (`pedo-accent`, `pedo-accent-2`, `pedo-gold`).
- Replace `#ffffff60` / `#ffffff70` muted greys with `text-muted-foreground` (which is already AA in both themes).
- Replace dim borders (`#ffffff0a`, `#ffffff15`) with `border-border` / `border-border/50`.
- Audit the result with the high-contrast class on `<html>`; ensure all text reaches ≥ 4.5:1 (≥ 3:1 for large/UI elements).
- StepRing & BarChart SVGs: read accent colors from CSS custom properties via `currentColor` / `var(--pedo-accent)` rather than hard-coded hex, so they recolor in high-contrast mode.

## 4. Reduced motion

Wrap the ring fill animation, bar grow-in, and card fade-in in a `prefers-reduced-motion: reduce` check — instantly snap to final state instead of animating. Honors OS-level setting and the existing project preference.

## 5. Verification

- Keyboard walkthrough: Tab through page, switch tabs with arrow keys, open/close settings with keyboard only, change goal via slider + Enter.
- Screen-reader sanity check via VoiceOver/NVDA labels (read out the description, no "button button" duplication, no "fire emoji").
- Run automated check with `axe-core` via the browser tool on `/pedometer`.
- Visual QA in light, dark, and high-contrast themes (toggle via the existing AccessibilityToolbar).
- `bun run build` / typecheck clean.

---

## Out of scope
- Real device pedometer / Web Sensor API.
- Storing prefs server-side.
- Restyling other pages.
- Changing the simulated step generator.
