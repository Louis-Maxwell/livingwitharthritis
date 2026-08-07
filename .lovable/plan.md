# Fix stale favicons with proper cache and content-type headers

The three icon files (`favicon.svg`, `favicon.png`, `apple-touch-icon.png`) sit
at unhashed paths and currently fall into the catch-all `/*` rule in
`public/_headers`. Browsers are aggressive about caching icons, so a redesign
can keep showing the old mark for days.

## Changes

### 1. `public/_headers` — explicit rules per icon file

Add rules above the `/*` catch-all:

```text
/favicon.svg
  Content-Type: image/svg+xml
  Cache-Control: public, max-age=3600, must-revalidate

/favicon.png
  Content-Type: image/png
  Cache-Control: public, max-age=3600, must-revalidate

/apple-touch-icon.png
  Content-Type: image/png
  Cache-Control: public, max-age=3600, must-revalidate

/favicon.ico
  Content-Type: image/x-icon
  Cache-Control: public, max-age=3600, must-revalidate
```

One hour with revalidation is the right trade-off: no repeated downloads
within a session, but a new icon reaches everyone within an hour instead of
being pinned for a year. Long `immutable` caching is wrong here because the
filenames carry no content hash.

### 2. `index.html` — version query on the icon links

Add a `?v=2` suffix to the three `<link rel="icon">` / `apple-touch-icon`
hrefs so already-cached copies are busted immediately on the next deploy,
without waiting for the one-hour window. Bump this value whenever the icon
artwork changes.

## Notes

- No visual or component changes; only head tags and the headers file.
- `favicon.ico` no longer exists in `public/`, but the rule is harmless and
  covers the browser's automatic `/favicon.ico` request if one is ever added.
- Verification: run the production build and confirm `_headers` is copied into
  `dist/` unchanged and the icon links render with the version query.
