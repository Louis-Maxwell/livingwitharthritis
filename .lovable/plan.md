## Status: already in place — no changes needed

`public/robots.txt` already exists, ships in production, and is correctly configured. Verification:

- **Live at** `https://livingwitharthritis.org.uk/robots.txt` (HTTP 200).
- **Sitemap referenced**: `Sitemap: https://livingwitharthritis.org.uk/sitemap.xml` (last line; also live at HTTP 200).
- **Main pages crawlable**: default `User-agent: *` block is `Allow: /` with only `/admin` and `/auth` disallowed. Same allowlist applied to `Googlebot`, `Bingbot`, `DuckDuckBot`, `Applebot`, `Twitterbot`, `facebookexternalhit`, `LinkedInBot`.
- **Aggressive AI scrapers blocked**: `GPTBot`, `ChatGPT-User`, `CCBot`, `anthropic-ai`, `Claude-Web`, `Google-Extended`, `PerplexityBot`, `Bytespider`, `Omgilibot`, `Diffbot`, `FacebookBot`, `ImagesiftBot`.
- **SEO/scraper bots blocked**: `AhrefsBot`, `SemrushBot`, `MJ12bot`, `DotBot`, `BLEXBot`, `PetalBot`, `DataForSeoBot`, `SeekportBot`, `serpstatbot`, `ZoominfoBot`.
- **Analytics-distorting regional bots blocked**: `Baiduspider`, `Sogou`, `YisouSpider`, `360Spider`, `HaoSouSpider`.

## Recommended action

None. The file already meets every requirement in the request:
1. Exists at `public/robots.txt`.
2. Allows main pages for all major search engines.
3. References the sitemap URL.

If you'd like, I can:
- **(A)** Loosen the AI-scraper blocks (e.g. allow `Google-Extended` so Gemini/AI Overviews can summarise the site) — currently fully blocked.
- **(B)** Tighten further — add `Disallow: /api`, `/donation-success`, `/newsletter-confirm`, etc.
- **(C)** Add a second `Sitemap:` line if you plan to split sitemaps (e.g. blog vs. core).

Otherwise this task is complete with zero file changes.
