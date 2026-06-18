## Objective
Make the charity registration number (1218461) clickable in both the footer and the floating badge above the donate card, linking to the Charity Commission search results.

## Scope
- `src/components/Footer.tsx` — the bottom copyright/registration line
- `src/components/landing/StickyDonateBar.tsx` — the mini pill/badge above the desktop donate card

## Implementation
1. In `Footer.tsx`, wrap the charity number portion of the text in an `<a>` element pointing to the Charity Commission search URL for 1218461:
   ```text
   https://register-of-charities.charitycommission.gov.uk/charity-search?search=1218461
   ```
   Apply `target="_blank"` and `rel="noopener noreferrer"` per project external-link rules.

2. In `StickyDonateBar.tsx`, wrap the `<span>No. 1218461</span>` inside the badge pill with the same `<a>` element and attributes.

3. Keep existing styling (text colour, font size, uppercase tracking) intact so the link blends visually with the surrounding text.