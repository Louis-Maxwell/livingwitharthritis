## Goal

Add the static social-preview tags you pasted into `index.html` so non-JS social crawlers (Facebook, LinkedIn, Slack, WhatsApp) get a proper homepage preview instead of falling back to the page title alone.

## Changes to `index.html`

In the existing OG block (currently lines 123–139), add the four properties that were intentionally omitted earlier:

- `<meta property="og:title" content="Free Osteoarthritis Management Plan | Living With Arthritis UK" />`
- `<meta property="og:description" content="Get free, clinically-reviewed OA management resources from a UK registered charity. Evidence-based care for 8.75M people living with osteoarthritis." />`
- `<meta property="og:url" content="https://livingwitharthritis.org.uk/" />`
- `<meta name="twitter:title" content="Free Osteoarthritis Management Plan | Living With Arthritis UK" />`
- `<meta name="twitter:description" content="Get free, clinically-reviewed OA management resources from a UK registered charity. Evidence-based care for 8.75M people living with osteoarthritis." />`

Keep the existing `og:type`, `og:locale`, `og:site_name`, `og:image` (already at `/images/hero-community.jpg`, 1200×630), `twitter:card`, and `twitter:image`.

Update the explanatory comment above the block to reflect that the homepage OG title/description/url are now static fallbacks, and per-route `SeoHead` (react-helmet-async) overrides them for JS-executing crawlers (Googlebot, Twitterbot).

## Important tradeoff to confirm

The earlier code comment removed these tags on purpose. The reason: non-JS social crawlers don't run React, so whatever sits statically in `index.html` becomes the preview for **every** shared URL on those platforms — including `/blog/...`, `/conditions/...`, etc. Every shared subpage will preview with the homepage title and description on Facebook/LinkedIn/Slack/WhatsApp.

Googlebot, Twitter/X, and any JS-executing crawler will still get the correct per-page preview because `SeoHead` overrides these on route mount.

If you want subpage-accurate previews on Facebook/LinkedIn, the only fix is SSR/prerender — not a static head edit.

## Image path

Your snippet referenced `/og-image-1200x630.jpg`, which doesn't exist in the project. I'll keep the existing `/images/hero-community.jpg` (already 1200×630). If you'd like me to generate a dedicated OG image at that path instead, say the word.

## Out of scope

- No changes to per-route `SeoHead` components.
- No SSR/prerender work.
- No other meta tags touched.