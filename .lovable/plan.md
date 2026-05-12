## Goal
Replace existing donation amount presets with **£50, £150, £200, £500** across the site.

## Changes

1. **`src/pages/Donate.tsx`** — `DONATION_OPTIONS` array
   - £10 → £50: "Funds a personalised exercise plan and virtual physio session"
   - £25 → £150: "Supports our AI health assistant for a month"
   - £50 → £200: "Keeps the platform free for 1,000 users for a month"
   - £100 → £500: "Powers a full quarter of patient guidance content"
   - (Impact copy above is a suggested rewrite — happy to adjust wording.)

2. **`src/components/DonationQuickBar.tsx`** — `PRESETS` constant
   - `[25, 50, 100, 250]` → `[50, 150, 200, 500]`

## Out of scope
- `DonationNotification.tsx` ticker (shows fictitious past donations of varied amounts — leaving as-is for realism).
- Gift Aid example copy ("£100 becomes £125") — leave unless you'd like it updated to a £200 example.

Confirm and I'll implement.
