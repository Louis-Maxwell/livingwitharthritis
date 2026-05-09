## Goal Progress Bar (under Streak Widget)

Add a slim progress indicator directly beneath the `StreakWidget` in `TodayTab` showing how close the user is to today's goal — and what that means for their streak.

### What to build

1. **New `GoalProgressBar` component** in `src/components/pedometer/PedometerApp.tsx` (colocated with `StreakWidget`):
   - Props: `todayTotal`, `goal`, `pct`, `streak`, `goalMetToday`.
   - A `rounded-2xl border bg-card` card matching `StreakWidget` styling.
   - Top row: "Today's goal progress" label + `{Math.round(pct * 100)}%` value (right-aligned, `text-primary` when `goalMetToday`).
   - Middle: a 100%-width track (`h-2 rounded-full bg-muted`) with a `bg-primary` fill at `width: pct * 100%`, `transition-all duration-500`. Reduced-motion aware (no transition when `prefers-reduced-motion`).
   - Bottom row (small `text-muted-foreground`): contextual streak message:
     - If `goalMetToday` → "Goal reached — streak extended to {streak} day{plural}"
     - Else if `streak > 0` → "{stepsRemaining} steps to keep your {streak}-day streak alive"
     - Else → "{stepsRemaining} steps to start a new streak today"
   - `role="progressbar"` with `aria-valuenow`, `aria-valuemin={0}`, `aria-valuemax={100}`, and an `aria-label` summarising progress.

2. **Render in `TodayTab`** immediately after `<StreakWidget … />` (line ~932) and before the existing 2×2 metric grid. Pass `todayTotal`, `goal`, `pct`, `streak`, `goalMetToday={pct >= 1}` from the existing destructured `ped` values.

### Technical notes

- All values already exist on the hook return — no new derivations or storage changes.
- Strict design tokens only (`bg-card`, `bg-muted`, `bg-primary`, `text-primary`, `text-muted-foreground`, `border-border`). No hard-coded colours.
- Pure presentation — no analytics, no state, no business logic changes. The existing `pedometer_goal_reached` event continues to fire from the existing `useEffect`.

### Out of scope

- No changes to `Pedometer.tsx`, settings, achievements, charts, or storage schema.
- No new GA events.
- No changes to `StreakWidget` itself.
