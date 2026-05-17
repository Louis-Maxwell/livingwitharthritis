## What's actually wrong

Your real XML sitemap is fine. I fetched it live and it returns:

```
GET https://livingwitharthritis.org.uk/sitemap.xml
content-type: text/xml; charset=utf-8
<?xml version="1.0" encoding="UTF-8"?> <urlset …>
```

The Google Search Console error comes from a second URL: `/sitemap` (no `.xml`). That route is a React page (`src/pages/Sitemap.tsx`, registered at line 197 of `src/App.tsx`) that renders a human-readable list of pages as HTML. If `/sitemap` was ever submitted to GSC — or Google discovered it on its own — that's the "appears to be an HTML page" warning.

## Fix

1. **Rename the human-readable page** from `/sitemap` to `/site-index` in `src/App.tsx` so no crawler can mistake it for the XML sitemap.
2. **Add a `noindex, nofollow` meta** to `src/pages/Sitemap.tsx` (via Helmet) so even if Google has the old URL cached, it stops indexing it.
3. **Keep `/sitemap.xml`** exactly as it is — that's the supported format and it's already served correctly.
4. **In Google Search Console** (you, not me — I can't reach GSC): remove the bad submission and re-submit `https://livingwitharthritis.org.uk/sitemap.xml`.

No changes needed to `public/sitemap.xml`, `public/robots.txt`, or the generator script — those are already correct.

## Files touched

- `src/App.tsx` — change `path="/sitemap"` to `path="/site-index"`
- `src/pages/Sitemap.tsx` — add `<meta name="robots" content="noindex, nofollow">` inside its Helmet block
