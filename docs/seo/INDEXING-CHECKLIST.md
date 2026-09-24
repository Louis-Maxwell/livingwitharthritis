# Indexing checklist (Louis + publish)

Customer-first, charity **1218461**. No invented traffic claims. No Oswestry street address.

## Already in the codebase

- `public/robots.txt` + generated sitemaps under `public/sitemap*.xml`
- Google Search Console meta in `index.html` (`google-site-verification`) — **do not invent a new token**
- Consent-gated GA4 `G-ZLLSD3PXZ9` (SPA pageviews from `App.tsx`; no duplicate `gtag` config)

## Louis steps after each Lovable publish

1. **Submit sitemap** in Google Search Console:  
   `https://livingwitharthritis.org.uk/sitemap.xml` (and any additional `sitemap-*.xml` listed in robots if GSC asks).
2. **Request indexing** (URL Inspection) on newly gold-passed or soft-404-fixed URLs after Lovable has published GitHub `main`.
3. **www → apex 301** — confirm host/Cloudflare sends `https://www.livingwitharthritis.org.uk/*` → `https://livingwitharthritis.org.uk/*` (301). Repo cannot finish this alone.
4. **True HTTP 404** — SPA hosts often soft-404; keep Hostinger/Cloudflare custom 404 / status rules on Louis’s backlog (document only here).

## Bing Webmaster (optional, empty-safe)

1. Create/claim the property in Bing Webmaster Tools.
2. Copy the `msvalidate.01` content value.
3. Set `VITE_BING_SITE_VERIFICATION=<code>` in the Lovable / host env (see `.env.example`).
4. Redeploy. `SeoDefaults` emits the meta only when the env is a non-placeholder string.
5. **Do not** invent `BingSiteAuth.xml` contents or commit a fake verification file.

## Google Business Profile map

1. Verify GBP for Living With Arthritis UK (area served **GB** only; no fake street address).
2. Copy the Maps **embed** URL (`https://www.google.com/maps/embed?...`).
3. Set `VITE_GBP_MAPS_EMBED_URL` and redeploy. Contact shows the iframe only when set; otherwise the placeholder: “Map goes live once Google Business Profile is verified”.

## City hubs — not a growth lever

Existing `CityArthritisPage` stays for URLs already live. **Do not create or expand thin city doorway pages.** National visitor-job hubs (pain, PIP, Access to Work, exercise, diet, falls, foot/ankle, etc.) beat thin geo shells.

## Backups (not WordPress)

- **Source of truth:** GitHub (`Louis-Maxwell/livingwitharthritis`) + Lovable publish history.
- Hostinger / Cloudflare backups are Louis-owned.
- This is a Vite/React SPA — **no WordPress backup plugin / Wordfence**.

## Security headers (SPA, not Wordfence)

Repo `public/_headers` is the source of truth for:

- `Strict-Transport-Security` (HSTS)
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy`
- `Content-Security-Policy` including `frame-ancestors 'none'`

Cloudflare / Lovable may already send a subset live; align the host dashboard with `_headers` when possible. Do **not** install Wordfence — the site is not WordPress.

## Speed

Lighthouse CI is **non-blocking**. Prefer width/height (or aspect-ratio) on embeds/images where easy — Contact map iframe already declares `width`/`height` + `aspect-ratio`.
