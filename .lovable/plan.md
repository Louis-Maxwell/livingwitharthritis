# Use the uploaded photo as the landing page hero image

Replace the current octagon hero photo (older couple) on the homepage with the
uploaded photo of two smiling young women.

## What changes

- Upload the image to the CDN as a Lovable asset, and generate optimised WebP
  variants at 400w and 800w so mobile keeps downloading a small file (the hero
  is the LCP element, so byte size matters).
- Point `src/components/landing/OAHero.tsx` at the new image: update the
  `src`, `srcSet`, intrinsic `width`/`height`, and the `alt` text to describe
  the new photo.
- Update the hero `<link rel="preload">` in `index.html` so the preloaded file
  matches the new image (otherwise the browser downloads both).

Nothing else on the homepage changes — same octagon crop, same layout, same
copy.

## Technical notes

Files touched: `src/components/landing/OAHero.tsx`, `index.html`, plus the new
WebP files under `public/openverse/`. The old hero WebPs stay in place only if
still referenced elsewhere; otherwise they are removed.

Verification: production build plus a check that the hero renders and the
preload URL matches the served image.
