# Publish the new favicon and add a proper web app manifest

The redesigned icon is in place (`src/assets/icons/favicon.svg`, `favicon.png`, `apple-touch-icon.png`, with copies in `public/`), but the site has **no web app manifest at all** — nothing in `public/` and no `<link rel="manifest">` in `index.html`. So Android/Chrome installs and homescreen icons currently fall back to a scaled favicon, and there are no maskable icons.

## Changes

### 1. Generate the full icon set from the new SVG
Render from `src/assets/icons/favicon.svg` into `public/icons/`:
- `icon-192.png`, `icon-512.png` (standard, `purpose: any`)
- `icon-192-maskable.png`, `icon-512-maskable.png` — same mark re-rendered with ~10% safe-zone padding on a solid red background so Android's circular/squircle crop never clips the figure
- Keep the existing `favicon.png` (64) and `apple-touch-icon.png` (180)

### 2. Add `public/site.webmanifest`
Name "Living With Arthritis", short name "LWA", `start_url: "/"`, `display: "standalone"`, `background_color` and `theme_color` set to the brand red, `lang: "en-GB"`, plus the four icon entries above with correct `sizes`, `type`, and `purpose`.

### 3. Wire it into `index.html`
- Add `<link rel="manifest" href="/site.webmanifest">`
- Add `<meta name="theme-color">` matching the manifest
- Point the icon links at the stable `/favicon.svg`, `/favicon.png`, `/apple-touch-icon.png` paths instead of the current `./src/assets/icons/...` hrefs, which are dev-source paths

### 4. `public/_headers`
Add a short-lived cache rule for `/site.webmanifest` and `/icons/*` alongside the existing favicon rules.

### 5. Verify, then publish
- Production build, then confirm `dist/` contains the manifest and all icon files
- Validate the manifest JSON parses and every referenced icon path exists
- Publish so the icon and manifest reach the live site

## Notes
No layout, colour, or navigation changes — icons, manifest, and head tags only.
