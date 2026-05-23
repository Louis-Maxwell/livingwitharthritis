## Findings from the image

1. **Title** — 49 chars, Semrush wants 50–60.
2. **Canonical** — missing in static HTML (Helmet adds it client-side, but Semrush's crawler doesn't execute JS).
3. **Robots.txt** — flagged missing.
4. **XML sitemap** — flagged missing.
5. **PageSpeed Mobile** — Lighthouse `FAILED_DOCUMENT_REQUEST` / `ERR_TIMED_OUT`.
6. **PageSpeed Desktop** — 82/100, LCP 1.4s, TBT 160ms, Speed Index 4.4s.

## Fixes

### 1. Lengthen `<title>` (index.html line 75)
Change from 49 → ~58 chars, keeping primary keywords:
```html
<title>Arthritis Help UK | Free Physio, Diet & AI Joint Support</title>
```

### 2. Add static canonical fallback (index.html, in `<head>`)
The current comment forbids it for Helmet reasons, but Semrush/Backlinko-class crawlers need a non-JS canonical. Add a root-only canonical tag (Helmet's per-route canonical still wins for JS-aware crawlers via meta-dedup, and we'll keep canonical as the only `<link rel="canonical">` shipped statically):
```html
<link rel="canonical" href="https://livingwitharthritis.org.uk/" />
```
Update the surrounding comment to explain it's a homepage fallback and Helmet replaces it per-route.

### 3. Robots.txt & sitemap — already present, verify delivery
`public/robots.txt` and `public/sitemap.xml` both exist and `robots.txt` ends with `Sitemap: https://livingwitharthritis.org.uk/sitemap.xml`. Semrush flagged them because the scan ran against a URL where the latest deploy isn't live yet (or against the preview subdomain). No code change needed — after the next publish, request a Semrush rescan against `https://livingwitharthritis.org.uk`.

### 4. PageSpeed Mobile timeout
`FAILED_DOCUMENT_REQUEST` is a Lighthouse fetch timeout, not a site bug — usually a cold-start on the Lovable preview or a flaky PSI run. Re-run against the custom domain after publish; if it persists we'd need to investigate TTFB separately (out of scope here).

### 5. Desktop perf (82, Speed Index 4.4s)
Not flagged as a hard fail; would need a dedicated perf pass (image-format conversion via `vite-imagetools`, preload LCP image, defer non-critical JS). Recommend handling in a separate task — call it out but don't bundle into this fix.

## Files changed
- `index.html` — title + static canonical (2 small edits)

## After implementation
Republish, then trigger a Semrush rescan against `https://livingwitharthritis.org.uk`.
