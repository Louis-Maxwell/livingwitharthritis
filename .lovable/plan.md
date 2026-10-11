# Add "charity application started September 2025" to the landing page

## What you'll see
The "Why you can trust this site" strip sits just under the top banner on the homepage. Its first point will now read:

> Living With Arthritis (charity 1218461) — registered in England and Wales. Our charity application began in September 2025.

The other trust points, the layout and the rest of the homepage stay the same.

## What stays untouched
- The official registration date (15 June 2026) and charity number stay as they are.
- The founding date Google reads behind the scenes doesn't change. September 2025 is when the application started, not when the charity was registered.

## Technical details
- Add `applicationStarted: '2025-09'` to `src/config/charity.ts` so the date has one source.
- Render it in the first `<li>` of `src/components/landing/HomeTrustStrip.tsx` as "Our charity application began in September 2025."
- Save the date to project memory as a charity fact.
- Check the build log and take a screenshot of the homepage to confirm.
