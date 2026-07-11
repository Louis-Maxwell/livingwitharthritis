## Goal

Place the uploaded photo of the two smiling women in the hero area of the landing page (`/`), inside the existing octagon frame on the right of `OAHero`.

## Steps

1. Upload the image to Lovable Assets CDN using the sandbox CLI:
   ```
   lovable-assets create --file /mnt/user-uploads/wjgomes-angolans-509593.jpg \
     --filename hero-community.jpg > src/assets/hero-community.jpg.asset.json
   ```
2. Edit `src/components/landing/OAHero.tsx` (lines 87–103):
   - Import the new asset pointer.
   - Replace the `<picture>` with a single `<img>` pointing at the CDN URL (assets are already served with aggressive caching; we lose the AVIF/WebP variants that live in `/public/hero/` but gain the uploaded photo).
   - Update `alt` to a descriptive, on-brand line, e.g. *"Two young women smiling together outdoors — the community we support."*
   - Keep the octagon clip, `width/height`, `fetchpriority="high"`, `loading="eager"`, and `decoding="async"` so the LCP still performs well.
3. Leave the existing `/public/hero/oa.{avif,webp,jpg}` files in place (used elsewhere / preview fallback) — no deletion needed.

## Note before you approve

The current hero image was chosen to signal *arthritis / older-adult audience* (an older couple stretching). The uploaded photo shows two young women — visually strong, but it moves the hero away from the site's core arthritis audience signal. Happy to proceed as asked; just flagging so you can confirm this is the intent (rather than, say, adding it to a "community" band lower down the page).

## Technical details

- File touched: `src/components/landing/OAHero.tsx`
- File added: `src/assets/hero-community.jpg.asset.json` (pointer only, no binary in repo)
- No routing, schema, or SEO changes.
- LCP: single JPG from CDN with eager loading and `fetchpriority="high"` — acceptable, though slightly heavier than the current AVIF-first `<picture>`.
