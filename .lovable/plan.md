# Make charts colourful, restrict red to two donation-bar matches

## Context
Charts live in three pages:
- `src/pages/Finances.tsx` — 2 pie charts + 1 income/expenditure bar chart (public page)
- `src/pages/AdminDashboard.tsx` — PSI bar chart (admin only)
- `src/pages/AdminPsiDashboard.tsx` — 2 line charts (admin only)

The donation bar (`DonationBanner.tsx`, `StickyDonateBar.tsx`, `DonationImpactSection.tsx`) uses `bg-primary` = `hsl(350 85% 42%)` — our crimson red. Today several chart slices/bars also use red or near-red, plus muted greys and black, which looks flat.

## Goal
- Brighten every chart with a coordinated multi-hue palette (teal, indigo, amber, emerald, plum, slate).
- Allow the primary red **exactly twice across the whole app's charts**, on the most "donation-relevant" series so the link to the Donate CTA reads visually.

## Where the two reds go
1. **Finances → Income vs Expenditure bar chart**: the **Income** bar becomes primary red (it represents money coming in from donors — same colour as the Donate button).
2. **Finances → Income Sources pie chart**: the **Individual Donations** slice stays primary red (largest donor-driven slice; ties directly to the donation bar).

Every other slice, bar, and line gets a non-red colour from the new palette. The Fund Allocation pie loses its current red slice entirely.

## New shared palette (added as constants in `Finances.tsx`)
```
DONOR_RED   hsl(350 85% 42%)   ← matches --primary / donation bar
TEAL        hsl(187 72% 38%)
INDIGO      hsl(231 55% 42%)
AMBER       hsl(38  92% 52%)
EMERALD     hsl(158 64% 38%)
PLUM        hsl(280 45% 42%)
SLATE       hsl(215 25% 32%)
```

## Changes by file

### `src/pages/Finances.tsx`
- Replace `fundAllocation` colours: Patient Support → TEAL, Research → INDIGO, Community → AMBER, Operations → SLATE. (No red here.)
- Replace `incomeSources` colours: Individual Donations → **DONOR_RED**, Corporate → INDIGO, Grants → AMBER, Gift Aid → EMERALD, Other → PLUM.
- Income vs Expenditure bar chart:
  - `income` bar fill → **DONOR_RED** (was black)
  - `expenditure` bar fill → SLATE (was primary red)
  - Update the two legend swatches below to match.

### `src/pages/AdminDashboard.tsx` (PSI bar chart, line ~500)
- `Navigation` bar → TEAL (was `hsl(var(--primary))` red)
- `Speed` bar → AMBER (was black)

### `src/pages/AdminPsiDashboard.tsx` (`lineColors` map, lines 121-124)
- `published-mobile`  → TEAL
- `published-desktop` → INDIGO
- `production-mobile` → AMBER  (was red `hsl(0 72% 51%)`)
- `production-desktop`→ EMERALD

After these edits the only red anywhere in any chart is the two Finances series called out above, and both visually match the donation bar.

## Out of scope
- No changes to chart structure, data, tooltips, or layout.
- No changes to design tokens in `index.css` / `tailwind.config.ts` — palette is local chart constants so the rest of the site (text stays black, buttons/icons stay red) is unaffected.
- No changes to the donation bar itself.

## Verification
- Visually check `/finances` (pies + bar chart) — exactly two red elements, both donor-related.
- Open `/admin` PSI card and `/admin/psi` lines — zero red.
