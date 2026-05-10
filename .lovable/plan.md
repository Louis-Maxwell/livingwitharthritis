## Diagnosis

`https://livingwitharthritis.org.uk/sitemap.xml` is correctly served as `text/xml` with valid XML — no problem there.

The SEO tool flagging the warning is almost certainly hitting `/sitemap` (no extension), which is a common fallback URL that crawlers and audit tools probe. On this site that path falls through to the React SPA and returns `index.html` with `content-type: text/html` — exactly the symptom in the warning.

Verified:
- `curl /sitemap.xml` → `200 text/xml` + valid `<urlset>` ✅
- `curl /sitemap` → `200 text/html` + SPA shell ❌ (this is what the tool sees)

`robots.txt` correctly points to `/sitemap.xml`, so Google itself is fine; the warning comes from the alternate path.

## Fix

Add a `public/_redirects` file (Lovable hosting honours Netlify/Cloudflare Pages-style redirects) with 301s for the common alternate sitemap paths so any crawler or audit tool requesting them lands on the real XML:

```
/sitemap          /sitemap.xml  301
/sitemap/         /sitemap.xml  301
/sitemap_index.xml /sitemap.xml 301
```

That's the entire change — one new file, three lines of redirect rules. No code, no UX, no SEO content touched.

## After publish

Re-run the SEO audit. Both `/sitemap` and `/sitemap.xml` will then resolve to the valid XML document, and the warning will clear.
