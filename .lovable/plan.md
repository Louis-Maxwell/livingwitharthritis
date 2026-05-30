## Problem

The Ahrefs export (`livingwitharthritis_30-may-2026_multiple-meta_...csv`) flags **all 395 indexable pages** with `No. of meta descriptions = 2`. Every URL has two `<meta name="description">` tags in the rendered HTML.

## Root cause

`index.html` ships a sitewide static `<meta name="description">` (line 80). Every route also renders `<SeoHead>` which uses `react-helmet-async` to inject its own `<meta name="description">`. `react-helmet-async` only deduplicates tags it manages itself — it does not remove pre-existing static tags from `index.html`. Result: both tags ship in the DOM, Ahrefs/Google see two descriptions per page.

The same duplication pattern almost certainly applies to other tags `SeoHead` re-emits that also live in `index.html`:
- `og:title`, `og:description`, `og:url`, `og:type`, `og:image`
- `twitter:title`, `twitter:description`, `twitter:image`, `twitter:card`
- `theme-color`, `referrer`, `geo.region`

(The Ahrefs report only audits `description`, but fixing one without the others leaves the same issue for crawlers checking OG/Twitter.)

## Fix

Edit **`index.html`** only. Remove the per-page tags from the static head so `SeoHead` (Helmet) is the sole source on every route. Keep tags that are truly sitewide and static (charset, viewport, CSP, robots, author, keywords, geo.*, theme-color, JSON-LD, GA loader, font preloads).

Tags to **remove** from `index.html`:
1. `<meta name="description" ...>` (line 80) — primary fix for the Ahrefs report.
2. `<meta property="og:title">`, `<meta property="og:description">`, `<meta property="og:url">`, `<meta property="og:type">`, `<meta property="og:locale">`, `<meta property="og:image">` and related (`og:image:width/height/alt`).
3. `<meta name="twitter:card">`, `<meta name="twitter:title">`, `<meta name="twitter:description">`, `<meta name="twitter:image">`.
4. `<link rel="canonical">` if present — Helmet emits per-route canonicals; two canonicals is an SEO error.
5. Duplicate `<meta name="referrer">` (lines 43 & one inside SeoHead) — keep in Helmet, drop from index.html.
6. Duplicate `<meta name="theme-color">` (line 91 & SeoHead light/dark variants) — keep Helmet's pair, drop the single static one.

Tags to **keep** in `index.html` (truly sitewide):
- charset, viewport, CSP, X-Frame-Options, X-Content-Type-Options
- `author`, `publisher`, `robots`, `googlebot`, `bingbot`, `keywords`
- `geo.*`, `ICBM`, `content-language`, `rating`, `distribution`, `coverage`, `target`, `HandheldFriendly`
- JSON-LD Organization schema
- GA loader, font preloads
- Title fallback ("Living With Arthritis…") — Helmet overrides per route

## Trade-off (called out honestly)

Social-preview crawlers (LinkedIn, Slack, Facebook) don't execute JS — they only ever see `index.html`. After this change they'll show:
- No description preview
- No og:image preview
- The static `<title>` fallback

Googlebot/Bingbot/Ahrefs/Twitter all execute JS and will continue to see the per-page Helmet values. This is the standard Vite-SPA trade-off documented in our head-meta guide; true SSR is the only way to fix social previews and is out of scope here.

If you want to preserve social previews, the alternative is to keep one set of static OG tags in `index.html` as a fallback and accept the duplicate-OG warning (but the **description** duplicate must go — that's the actual Ahrefs finding).

## Files I'll touch

- `index.html` — remove the tags listed above. No code changes elsewhere; `SeoHead` already emits everything we need per route.

## Verification

1. Build, open a couple of routes (`/`, `/about`, `/conditions/osteoarthritis`), view source → only the static `index.html` head; then check `document.head` in DevTools → exactly one `<meta name="description">` per page (the Helmet one).
2. Re-run the Ahrefs crawl (or our scanner). `No. of meta descriptions` should be `1` across the board.

## Out of scope

- SSR / prerendering for non-JS social previews.
- Rewriting `SeoHead` — it's already correct; the bug is purely the static duplicates in `index.html`.
