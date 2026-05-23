# Fix Backlinko "crawler couldn't access webpage"

## Root cause

`public/robots.txt` explicitly blocks the very crawler running the audit:

```
User-agent: SemrushBot
Disallow: /
```

Backlinko is a Semrush product — its site audit uses `SemrushBot` / `SemrushBot-SA` (Site Audit) / `SemrushBot-BA` (Backlink Audit). The `Disallow: /` directive is exactly why it reports the page as inaccessible. The same applies to AhrefsBot if the user ever runs an Ahrefs audit on their own site.

The "5-second response time" line in the Backlinko explanation is generic — in this case it's the explicit block, not latency.

## Change

Edit `public/robots.txt`: remove (or allow) the user's own audit crawlers so they can scan their site. Keep the unhelpful / abusive scrapers blocked.

- **Allow** (so the owner can audit): `SemrushBot`, `SemrushBot-SA`, `SemrushBot-BA`, `AhrefsBot`, `AhrefsSiteAudit`
- **Keep blocked**: `MJ12bot`, `DotBot`, `BLEXBot`, `DataForSeoBot`, `PetalBot`, Sogou/Baidu/Yisou/360/HaoSou (no UK SEO value, distort analytics)

Replace the four lines:
```
User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /
```
with:
```
# Owner-run SEO audits (Semrush / Backlinko / Ahrefs) — allowed so the
# charity can crawl its own site. Standard Disallow: /admin still applies
# via the wildcard block below.
User-agent: SemrushBot
Allow: /

User-agent: SemrushBot-SA
Allow: /

User-agent: SemrushBot-BA
Allow: /

User-agent: AhrefsBot
Allow: /

User-agent: AhrefsSiteAudit
Allow: /
```

Also update the inline bot-exclusion analytics script in `index.html` (the JS block around line 53) to remove `semrushbot|ahrefsbot` from the `block` regex, so these audits don't also have their analytics stubbed (they don't fire GA anyway, but for consistency).

## Files touched
- `public/robots.txt`
- `index.html` (one regex line)

## Verification
1. `curl -A "SemrushBot-SA" https://livingwitharthritis.org.uk/robots.txt` → confirm `Allow: /` for SemrushBot-SA.
2. Re-run the Backlinko audit → the HTTP Status / Crawlability issue clears.
