# Fix Backlinko SEO findings

Backlinko (and similar non-JS crawlers) only read raw `index.html` + `robots.txt`. They never execute React/Helmet, so anything we emit per-route via `SeoHead` is invisible to them. Most findings come from that gap, plus a few robots.txt syntax quirks.

## 1. Open Graph missing: title, description
Add **static** `og:title` and `og:description` in `index.html` (alongside the existing `og:type`, `og:image`, `og:site_name`). Helmet's per-route values will still override these for JS-aware crawlers (Google, LinkedIn), but Backlinko/Facebook fallback will now see them. Remove the misleading comment that says "do not duplicate them statically".

## 2. Twitter/X Card missing: title, description
Same fix — add static `twitter:title` and `twitter:description` next to the existing `twitter:card` + `twitter:image`.

## 3. Robots.txt invalid syntax
Three small issues Backlinko's parser dislikes:
- `User-agent: Sogou web spider` — UA token with a space. Remove that line (the `Sogou` line above already covers it).
- Stray double blank lines after the DuckDuckBot and default blocks. Collapse to single blank line separators.
- Move the `Sitemap: https://livingwitharthritis.org.uk/sitemap.xml` directive to the **top** of the file (before any `User-agent` block) so simple parsers find it.

## 4. XML Sitemap not found
Caused by (3) — Backlinko couldn't parse robots.txt so never saw the `Sitemap:` line. Fixing (3) resolves this. `public/sitemap.xml` already exists and returns 200; no change needed there.

## 5. H1–H6 structure
Static `<h1>`/`<h2>` already exist inside `#root`, but some auditors skip elements they think will be JS-replaced. Move the static SEO fallback `<main>` to live **outside** `#root` (as a sibling, hidden with `hidden` attribute once JS hydrates via a tiny inline script). This guarantees Backlinko sees a top-level `<h1>` not nested in the React mount point.

## 6. PageSpeed Mobile 60 / Desktop 87
Lower-impact tweaks we can ship now:
- Add `loading="lazy"` + explicit `width`/`height` to any non-LCP `<img>` still missing them on the landing page (cuts CLS).
- Add `<link rel="preconnect">` for `images.unsplash.com` (already dns-prefetched — upgrade to preconnect for the hero CDN).
- Defer the Stripe.js and any other non-critical third-party `<script>` tags.
- Confirm GA loader stays behind the existing idle/interaction gate (already done).
A full Lighthouse rebuild (route-splitting, image format swap to AVIF) is a separate larger task — flag but don't undertake in this pass.

## Files to edit
- `index.html` — add static og:title/og:description + twitter:title/twitter:description; move SEO fallback outside `#root`; preconnect tweak.
- `public/robots.txt` — move `Sitemap:` to top, drop `Sogou web spider` line, tidy blank lines.

## Verification
- `curl -s https://livingwitharthritis.org.uk/index.html | grep -E "og:title|og:description|twitter:title|twitter:description"` returns matches.
- `curl -s https://livingwitharthritis.org.uk/robots.txt | head -3` shows `Sitemap:` first.
- Re-run Backlinko on `livingwitharthritis.org.uk`; the 5 hard-fail rows above should flip to pass; PageSpeed numbers should nudge up but won't hit 90+ without the larger perf pass.

No business-logic, routing or backend changes.
