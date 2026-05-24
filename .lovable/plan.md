## Context

Your site is already fully HTTPS:
- `https://livingwitharthritis.org.uk/` returns `200`
- `http://livingwitharthritis.org.uk/` returns `301 → https://...`

So the Semrush warning is not about your hosting — it's a stale/false-positive trigger. The only `http://` strings left in the codebase are 9 Creative Commons license URLs in `src/data/openverseImages.ts` (e.g. `http://creativecommons.org/publicdomain/zero/1.0/deed.en`). These are external attribution links, but Semrush's crawler can still log them as "insecure links on page" which is what feeds the HTTPS card.

## Plan

1. **Rewrite CC license URLs to HTTPS** in `src/data/openverseImages.ts` (9 occurrences). `creativecommons.org` supports HTTPS and 301s `http://` → `https://`, so attribution remains valid.

2. **Re-trigger the Semrush audit** after deploy so the card re-evaluates and clears.

3. **No other changes needed.** Confirmed:
   - No mixed-content asset URLs (`<img src="http://...">` etc.)
   - Canonicals, og:url, sitemap.xml, robots.txt all use `https://livingwitharthritis.org.uk`
   - HTTP → HTTPS 301 redirect is already in place at the edge

## Files touched

- `src/data/openverseImages.ts` — 9 string replacements

## Out of scope

Nothing else — no design, copy, routing, or backend changes.
