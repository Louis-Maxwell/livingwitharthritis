## Audit result

`SeoHead` already emits a full OG + Twitter set (title, description, type, url, site_name, locale, image + dimensions + alt; twitter:card, title, description, image) on every route that uses it. Coverage gaps:

### 1. Five routes use raw `<Helmet>` with no OG/Twitter tags
| Route | File | Visible to share crawlers? |
|---|---|---|
| `/buddy` | `src/pages/Buddy.tsx` | ✅ should preview |
| `/buddy/match` | `src/pages/BuddyMatch.tsx` | ✅ should preview |
| `/self-assessment` | `src/pages/SelfAssessment.tsx` | ✅ should preview |
| `/donation-result` | `src/pages/DonationSuccess.tsx` | ❌ post-action, noindex |
| `/newsletter/confirm` | `src/pages/NewsletterConfirm.tsx` | ❌ post-action, noindex |

When these pages are shared on Facebook/LinkedIn/X/iMessage/Slack today, the crawler reads only `index.html` (Helmet hydrates client-side, social crawlers don't run JS) and falls back to the homepage OG title/description/image — wrong preview for every one of these pages.

### 2. Stale `og:image` / `twitter:image` in `index.html`
Lines 123 and 130 point to a Lovable preview screenshot on the R2 dev bucket:
```
https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/.../id-preview-...lovable.app-...png
```
That URL is unstable (dev preview, can disappear) and doesn't match `SeoHead`'s default of `https://livingwitharthritis.org.uk/images/hero-community.jpg`. Static-only crawlers see the dev URL; JS crawlers see the org.uk one — inconsistent and fragile.

### 3. Static fallback missing `og:image:width` / `og:image:height`
SeoHead emits both (1200×630). The static block in `index.html` doesn't, which makes some crawlers (LinkedIn especially) refuse to render large card previews on first scrape.

## Plan

### Fix 1 — Convert the 5 raw-Helmet pages to `SeoHead`
Replace the inline `<Helmet>` in each with `<SeoHead title="…" description="…" path="…" [noindex] />`. Use existing copy from each page's current `<title>` and `<meta name="description">`. Add `noindex` on `/donation-result` and `/newsletter/confirm`.

### Fix 2 — Repoint static `og:image` / `twitter:image`
Change both URLs in `index.html` to the canonical hero image already used by `SeoHead`:
```
https://livingwitharthritis.org.uk/images/hero-community.jpg
```

### Fix 3 — Add `og:image:width` / `og:image:height` to `index.html`
Add `1200` / `630` next to the static `og:image` tag so social crawlers know the dimensions without fetching the file.

### Verify
- Re-run `node scripts/check-canonicals.mjs` (already added) to confirm no regression — all 5 converted pages still have canonicals via SeoHead.
- Add a tiny `scripts/check-social-meta.mjs` mirroring the canonical script: every page must reach SeoHead/ConditionPageTemplate or contain `og:title` literally. Fails on regression.
- Manually paste `/buddy`, `/self-assessment`, `/buddy/match` into LinkedIn Post Inspector and Twitter card validator after deploy (out of scope for this turn — flagged for user).

## Out of scope
- No new social-share image generation (the existing hero JPG is reused).
- No SSR / pre-rendering — JS-executing crawlers (Googlebot, Twitter) get per-route OG; non-JS crawlers (LinkedIn, Slack, iMessage) get the homepage fallback. That's a known limit of the stack and a separate workstream.
- No changes to the in-body OG title/description on lines 336–339 of `index.html` (those work as the static fallback).

## Files touched
- **Edit:** `src/pages/Buddy.tsx`, `src/pages/BuddyMatch.tsx`, `src/pages/SelfAssessment.tsx`, `src/pages/DonationSuccess.tsx`, `src/pages/NewsletterConfirm.tsx`
- **Edit:** `index.html` (image URLs + width/height tags)
- **New:** `scripts/check-social-meta.mjs`
