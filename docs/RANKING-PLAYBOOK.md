# Ranking Playbook — Living With Arthritis UK

**Legitimate SEO only.** No black-hat, cloaking, fake traffic, link schemes, or fabricated stats.
Nobody can force Google/Bing/DuckDuckGo rankings; this playbook improves crawlability, relevance, and trustworthy signals so engines *can* rank the site when content and links earn it.

Domain: `https://livingwitharthritis.org.uk`
Charity: Living With Arthritis (England & Wales **1218461**) — independent of Arthritis UK.

---

## What was done in code (2026-09-06)

### Technical SEO health (verified)

| Check | Status |
|-------|--------|
| `public/robots.txt` — Bytespider `Disallow: /` retained | Pass |
| Sitemap present (`sitemap.xml` + `sitemap-index.xml`) | Pass — **943** URLs total, **513** `/blog/...` posts |
| `llms.txt` / `ai.txt` charity identity + preferred citation URLs | Pass |
| Hub pages not accidentally `noindex` (home, diet, exercises, benefits-pip, blog, search, guides) | Pass — noindex only on private/utility/404/city-doorway stubs |
| `docs/STATIC-HOSTING.md` Lovable-first stubs + `_redirects` / `vercel.json` | Pass — CF Worker 404-page path removed |

### Ranking signals strengthened (safe / high-ROI)

1. Homepage — new Start here band linking to diet, exercises, conditions/OA, benefits-pip, blog.
2. Blog index — topic hub chips point at money hubs.
3. Search page — richer intro copy plus conditions and blog links.
4. Organization plus WebSite schema — MedicalOrganization kept; root WebSite and SearchAction added.
5. IndexNow URL list expanded with hubs and sample high-value blogs.

## Louis checklist
### Publish
1. Merge main in Lovable or deploy from this repo.
2. Full prerender build so hub HTML exists under dist (docs/STATIC-HOSTING.md).
3. Confirm live robots, sitemap, key file, hub 200s, junk 404s.

### Google Search Console
1. Verify the site property.
2. Submit sitemap.xml and sitemap-index.xml.
3. Request indexing for money hubs after publish.
4. Fix soft-404 and thin pages honestly.
### Bing Webmaster
1. Verify site and submit sitemaps.
2. After publish, run the package indexnow script (see scripts/indexnow-ping.mjs).
3. DuckDuckGo often benefits from Bing plus sitemap discovery.

### Citations and partnerships
- Keep Charity Commission and sameAs profiles accurate.
- Local: Google Business Profile if appropriate; genuine partner pages only.
- Earn editorial mentions; no purchased link schemes.

### Content cadence
- Refresh top GSC or Semrush URLs; link new posts to money hubs.
- Keep authors, reviewers, editorial standards, charity number visible.

## Engines map
Google: sitemap and GSC. Bing: sitemap and package indexnow script. DuckDuckGo: often Bing-influenced plus sitemap.

## Realistic timeline
0-2 weeks: crawl or index of updated hubs; IndexNow ack is not a ranking guarantee.
4-8 weeks: possible long-tail movement if content and internal links are solid.
3-6 months: competitive head terms only if authority and citations grow.

**Cannot force rankings.** Code and docs improve eligibility. Authority, relevance, and links decide visibility.

## Notify engines
- After publish run the package indexnow script.
- See scripts/indexnow-ping.mjs (HTTP IndexNow ping; Worker API removed).
- Keep seo:blog-guards green before merge.

## Related docs
- docs/STATIC-HOSTING.md, docs/archive/CLOUDFLARE-API-REMOVED.md, docs/seo-publish-checklist.md
- public/llms.txt and public/ai.txt
