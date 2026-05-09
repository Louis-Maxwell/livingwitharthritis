## Goal
Instrument the Pedometer with GA4 events using the existing `trackEvent` helper (`src/lib/analytics.ts`).

## Events to add

| Event name | When fired | Params |
|---|---|---|
| `pedometer_view` | On Pedometer page mount | `path: '/pedometer'` |
| `pedometer_start` | User taps Start (sensor activates) | `goal`, `sensor_status` |
| `pedometer_stop` | User taps Stop | `goal`, `session_steps`, `duration_s` |
| `pedometer_goal_reached` | First time today's total crosses the daily goal | `goal`, `steps`, `streak` |
| `pedometer_goal_changed` | User saves a new goal in Settings | `goal`, `previous_goal` |

Goal-reached fires **once per day** — guarded with a ref keyed by today's date so re-renders don't double-fire.

## Files to change

1. **`src/pages/Pedometer.tsx`** — add `trackEvent('pedometer_view', ...)` inside the existing `useEffect`.

2. **`src/components/pedometer/PedometerApp.tsx`**
   - Import `trackEvent` from `@/lib/analytics`.
   - In `usePedometer`:
     - Track session start time + session steps in refs.
     - Wrap `start()` / `stop()` to emit `pedometer_start` / `pedometer_stop`.
     - Add an effect watching `todayTotal` vs `goal` with a `firedForDateRef` guard to emit `pedometer_goal_reached` once per calendar day.
   - In `SettingsPanel` Save handler: emit `pedometer_goal_changed` with old + new goal.

## Non-goals
- No new dependencies, no UI changes, no business-logic changes beyond the tracking hooks.
- No backend/Supabase changes — events flow through existing GA4 pipeline.
