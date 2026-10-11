# Remove two points from "Why you can trust this site"

## What changes
Two points come out of the trust section on the homepage:
- "Free to use — no paywall, no app download"
- "Independent of Arthritis UK. Educational information — not a diagnosis"

These two stay:
- The charity number and the September 2025 application line
- "Reviewed by Louis Maxwell"

The "How we write and check our guides" and "About us" links stay as well. Once only two points are left, they'll sit side by side, so there won't be empty gaps.

## What stays untouched
Every article still has its own "Educational information — not a diagnosis" notice, so visitors still see that safety message. Nothing else on the homepage changes.

## Technical details
- In `src/components/landing/HomeTrustStrip.tsx`, delete the two `<li>` items. Remove the now-unused `HandCoins` and `Scale` imports, and change the grid from `lg:grid-cols-4` to `sm:grid-cols-2`.
- Check the build log, then take a screenshot of the homepage section.
