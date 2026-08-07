# Content-hashed favicon URLs

Today the three icons sit at fixed public paths (`/favicon.svg`, `/favicon.png`,
`/apple-touch-icon.png`) with a hand-maintained `?v=2` query. Anyone who changes
the artwork has to remember to bump that number. Vite can do it automatically if
the icons are treated as build inputs rather than static passthrough files.

## Changes

### 1. Move the icon sources into the bundle

Copy the three files to `src/assets/icons/`:

```text
src/assets/icons/favicon.svg
src/assets/icons/favicon.png
src/assets/icons/apple-touch-icon.png
```

### 2. Reference them relatively from `index.html`

Vite rewrites relative asset URLs in `index.html` at build time and emits them
with a content hash (`/assets/favicon-a1b2c3d4.png`). Change the head links to:

```html
<link rel="icon" type="image/svg+xml" href="./src/assets/icons/favicon.svg">
<link rel="icon" type="image/png" sizes="64x64" href="./src/assets/icons/favicon.png">
<link rel="apple-touch-icon" href="./src/assets/icons/apple-touch-icon.png">
```

In dev these resolve straight from source; in production they become hashed
`/assets/*` URLs. No `?v=` query needed — a new icon means a new filename, so
browsers can never serve a stale one.

### 3. Keep the unhashed copies in `public/` as fallbacks

Do not delete `public/favicon.svg`, `public/favicon.png` or
`public/apple-touch-icon.png`. Two things still need the fixed paths:

- Browsers and crawlers request `/favicon.ico` and `/apple-touch-icon.png`
  blindly, without reading the HTML.
- The JSON-LD blocks in `index.html` (Organization at line 246, LocalBusiness at
  line 256) use the absolute URL `https://livingwitharthritis.org.uk/favicon.png`
  as the logo/image. A hashed URL there would rot on every redeploy.

So the flow becomes: HTML-declared icons are hashed and always fresh; the
well-known paths remain as short-lived-cache fallbacks.

### 4. `public/_headers` adjustments

- Leave the `/favicon.*` and `/apple-touch-icon.png` rules at
  `max-age=3600, must-revalidate` — they now only serve the fallback copies.
- The existing `/assets/*` rule already gives the hashed icons
  `max-age=31536000, immutable`, which is correct for content-addressed files.

### 5. Document the workflow

Add a short comment in `public/_headers` noting that the canonical icon sources
live in `src/assets/icons/` and the `public/` copies are fallbacks that should be
updated in the same change.

## Technical notes

- Only `index.html` head tags, a file copy, and a comment change. No component,
  route, or backend changes.
- Verification: run the production build and confirm `dist/index.html` contains
  hashed `/assets/favicon-*.svg|png` hrefs and that `dist/favicon.png` still
  exists for the fallback path.
