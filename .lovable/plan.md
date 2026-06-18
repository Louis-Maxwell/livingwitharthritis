## Goal
Display the registered charity number (1218461) in two places:
1. A small standalone badge floating just above the desktop sticky donate card (bottom-right).
2. The footer bottom bar, updated from "Registered in England & Wales" to "Registered Charity in England & Wales No. 1218461".

## Implementation
1. **StickyDonateBar** (`src/components/landing/StickyDonateBar.tsx`)
   - Insert a compact pill/badge (e.g., "Registered Charity 1218461") immediately above the fixed desktop donate card.
   - Style it with a white/light card, subtle border, and small typography so it reads as a trust signal without competing with the donation CTA.

2. **Footer** (`src/components/Footer.tsx`)
   - Update the bottom copyright/registration line from:
     `…Registered in England & Wales`
     to:
     `…Registered Charity in England & Wales No. 1218461`

No other pages or components will be changed. Charity number is already confirmed as 1218461.