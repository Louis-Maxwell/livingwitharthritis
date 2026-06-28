## Goal
Make the community benefits bars (and other accent-coloured UI) visibly colourful again.

## Root cause
In `src/index.css`, the accent tokens used by charts, icon circles, and benefit bars were all collapsed to the MAP red during the brand refresh:
```
--amber:   354 85% 54%;
--emerald: 354 85% 54%;
--sky:     354 85% 54%;
--violet:  354 85% 54%;
```
So every bar/donut segment renders the same red, even though `CommunityHub.tsx` already passes `--emerald / --sky / --violet / --amber` per item.

## Fix
Restore distinct, MAP-palette-friendly hues for the accent tokens (kept warm so they sit on the cream background and beside the red primary without clashing):

- `--emerald` → `158 64% 40%` (deep green)
- `--sky`     → `199 78% 46%` (clear blue)
- `--violet`  → `262 60% 55%` (royal violet)
- `--amber`   → `38 92% 50%` (warm amber)

Apply the same values in both `:root` and any dark overrides. Leave `--primary` (MAP red) untouched so headings, CTAs, and red accents are unaffected.

## Files
- `src/index.css` — update the four accent token values (lines ~42, 60–62).

## Verification
- Reload `/community`: the four bars and the donut chart show green / blue / violet / amber.
- `tsgo --noEmit` + `bun run build` clean.
- Spot-check other pages using `btn-emerald`, `icon-circle-sky`, etc. to confirm they pick up the new hues.
