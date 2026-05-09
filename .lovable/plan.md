## Goal Streak Widget

Add a dedicated streak widget to the Today tab on the Pedometer page that highlights:
- Current daily-goal streak (consecutive days the goal was met)
- Last date the goal was reached (formatted in en-GB, with relative label like "Today" / "Yesterday" / "3 days ago")
- A best/longest streak achieved
- Subtle motivational copy that adapts to streak length

The widget sits between the Start/Stop button area and the existing 2×2 metric grid, so it is the first thing users see after the step ring. It replaces no existing content — the existing small "Streak" tile in the metric grid stays for parity.

### What to build

1. **Derive new values inside `usePedometer`** (`src/components/pedometer/PedometerApp.tsx`):
   - `lastGoalDate: string | null` — most recent `dateKey` in `history` (or today via `todayTotal`) where steps ≥ goal.
   - `bestStreak: number` — longest consecutive run of goal-met days across the stored history.
   - Expose both alongside the existing `streak` from the hook return.

2. **New presentational component `StreakWidget`** in the same file (keeps file colocated like `StepRing`, `BarChart`, `MetricCard`):
   - Props: `streak`, `bestStreak`, `lastGoalDate`, `goalMetToday`.
   - Layout: rounded card matching existing `MetricCard` styling (`rounded-2xl border bg-card`), crimson/gold accent consistent with current palette (no new tokens).
   - Left: large streak number with "day streak" label and a flame/spark glyph (text emoji `✦` or `🔥`, matching existing icon style).
   - Right: stacked small rows for "Best streak" and "Last goal reached" (shows "Today", "Yesterday", `dd MMM yyyy`, or "Not yet — start today" when null).
   - Reduced-motion aware; uses `aria-label` summarising the streak status for screen readers.

3. **Render `StreakWidget`** inside `TodayTab` immediately above the existing `grid grid-cols-2 gap-3` metric grid.

### Technical notes

- Date formatting via `Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })` — no new deps.
- "Today/Yesterday/N days ago" computed from `dateKey` diff against today's key.
- `bestStreak` computed with a single sorted pass over `Object.keys(history)` plus today's status; memoised with `useMemo`.
- Pure UI/derivation change — no analytics, storage, or business-logic changes. Existing `pedometer_goal_reached` event already fires on the streak trigger.
- Strict design-token usage (`text-primary`, `text-muted-foreground`, `bg-card`, `border-border`); no hard-coded colours.

### Out of scope

- No new GA events.
- No changes to `Pedometer.tsx`, settings, achievements, or charts.
- No persistence schema changes — derived from existing `history` localStorage.
