## Rewrite open-source framing, fix broken links, and resolve production DB errors

### 1. Rewrite OpenSourceEthosBand copy
The landing-page section `OpenSourceEthosBand` currently says "Free, open, for everyone" and "Written openly. Belonging to no one — and to all of us." It also uses `Github` and `GitCommit` icons. This gives off a strong open-source vibe that does not match the institutional charity tone. Keep the section layout (stats + changelog), but:
- Rephrase the heading and body to a warmer, mission-focused tone (e.g. "Built for everyone, always" / "Clinically checked. Free to use.")
- Swap the `Github` icon for `Calendar` or `Clock`, and `GitCommit` for `CheckCircle2` or `PenLine`
- Update the `aria-labelledby` and `displayName` to match the new tone (e.g. `MissionEthosBand`)

### 2. Fix broken internal link
`src/components/landing/InspiredHeroBand.tsx:182` links to `/privacy-policy`, but the route is `/privacy`. This causes a 404. Change the `href` to `/privacy`.

### 3. Fix production DB pgmq queue errors
The `process-email-queue` cron job polls every 5 seconds for `pgmq.q_auth_emails` and `pgmq.q_transactional_emails`, which do not exist in production. This generates `ERROR: relation does not exist` thousands of times per day. The dev environment has these queues properly set up.
- Create the missing pgmq queues via a database migration

### 4. Add missing canonical to DebugSchema.tsx
`src/pages/DebugSchema.tsx` has no canonical URL. Add a `<link rel="canonical">` inside its `<Helmet>` block.

### 5. Fix RegionHub redirect
`src/pages/regions/RegionHub.tsx:119` redirects to `/404`, which is not a defined route. Change to `<Navigate to="/" replace />` so it falls back to the homepage instead of another 404.

### Files to touch
- `src/components/landing/OpenSourceEthosBand.tsx` — copy + icon rewrite
- `src/components/landing/InspiredHeroBand.tsx` — fix privacy-policy link
- `src/pages/DebugSchema.tsx` — add canonical
- `src/pages/regions/RegionHub.tsx` — fix redirect
- Database migration — create missing pgmq queues