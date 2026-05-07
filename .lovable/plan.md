## Add Pedometer++ to the website

Integrate the uploaded `PedometerApp.jsx` as a new interactive health tool, themed and integrated with the site's existing design system, navigation, and SEO patterns.

### Where it lives

- New route: `/pedometer` (standalone page, like `/health-tools` and `/tools/waiting-time-calculator`)
- Linked from:
  - `HealthTools.tsx` (add a 4th tool card / cross-link)
  - `ExerciseHub.tsx` (CTA card — fits the `/exercises` context the user is currently on)
  - Sitemap (`public/sitemap.xml`) and `Sitemap.tsx`

### Files to create

1. `src/pages/Pedometer.tsx` — page shell using `Header`, `Footer`, `PageHero`, `PageBreadcrumb`, Helmet SEO + JSON-LD (matching `HealthTools.tsx` pattern).
2. `src/components/pedometer/PedometerApp.tsx` — converted from the uploaded JSX:
   - Convert to TypeScript (`.tsx`), add types for state, history, achievements.
   - Replace all hardcoded Tailwind colours (e.g. `bg-white`, `text-black`, `bg-indigo-500`) with semantic tokens (`bg-card`, `text-foreground`, `bg-primary`, `text-primary-foreground`, `border-border`, `bg-muted`, etc.) per the design system rule.
   - Replace inline SVG ring colours with `hsl(var(--primary))` / `hsl(var(--accent))`.
   - Use `Card`, `Button`, `Tabs`, `Badge`, `Progress`, `Dialog` from `@/components/ui` where the original used raw divs/buttons.
   - Use `lucide-react` icons (Footprints, Flame, MapPin, Target, Trophy, Settings) instead of emojis.
3. `src/components/pedometer/` sub-components if the file is large: `StepRing.tsx`, `WeeklyChart.tsx`, `MetricCard.tsx`, `AchievementBadge.tsx`, `SettingsPanel.tsx`, plus `usePedometer.ts` and `useStorage.ts` hooks in `src/hooks/`.

### Files to edit

- `src/App.tsx` — add lazy route for `/pedometer`.
- `src/pages/HealthTools.tsx` — add a link / card pointing to `/pedometer` (kept outside Tabs since this is a richer standalone tool).
- `src/pages/ExerciseHub.tsx` — add a CTA card linking to the pedometer.
- `public/sitemap.xml` + `src/pages/Sitemap.tsx` — add the new URL.

### Behaviour

- Pure frontend, no backend changes. Step data persists to `localStorage` via the existing `useStorage` hook in the upload.
- Keep the simulated sensor (the `📱 TODO` real-device markers stay as comments for future native integration).
- Goal, units (km/mi), and stride length configurable via a Settings dialog.
- Mobile-first responsive layout; bottom nav (`MobileBottomNav`) untouched.

### SEO

- Title: `Free Step Counter & Pedometer | Living With Arthritis UK` (<60 chars)
- Meta description focused on low-impact walking for joint health (<160 chars)
- JSON-LD `MedicalWebPage` + `SoftwareApplication` schema
- Canonical: `https://livingwitharthritis.org.uk/pedometer`

### Out of scope

- No real device pedometer / Capacitor / native sensor wiring (left as TODO comments).
- No backend persistence (no Supabase tables) — local only, matches a step counter's expected behaviour.
- No changes to existing health tools' logic.
