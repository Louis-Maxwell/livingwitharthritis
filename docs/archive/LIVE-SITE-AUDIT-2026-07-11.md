# LIVE Site Audit — first real fetch of production (11 Jul 2026)
### Fetched livingwitharthritis.org.uk directly via web-fetch (Claude credits only)

## Why this changes things
Until today every session worked from a 238-route offline dataset. Today I
fetched the LIVE homepage and /sitemap route. Findings below are from the
real deployed site, not assumptions.

## Verified findings
1. **Legal pages live at /privacy-policy and /terms-conditions** (plus
   /cookies-policy) — my bundle's sitemap and drafts assumed /privacy and
   /terms. FIXED: generator paths corrected. Note: the live site already
   HAS a Terms page — my TermsOfService.NEW.tsx is therefore a duplicate
   draft; compare before using, don't blindly add a second terms page.
2. **A real clinical reviewer exists on live meta**: "Maxwell, First
   Contact Practitioner, HCPC PH128483" — so SchemaBlocks' reviewedBy can
   be populated with a real name. Also /governance, /trust-credibility and
   /finances pages exist live — my repeated "trustee TODOs unfilled" flag
   was stale; verify those pages' content, but the structure is there.
3. **Likely root cause of Semrush's "54 duplicate titles"**: /sitemap
   returned byte-identical homepage meta — unmatched routes appear to fall
   back to the homepage shell. FIXED (data side): added 28 ai-head entries
   for live routes that had none (about-us, governance, finances, regions,
   diet-hub, community, blog, faq, contact, zakat, etc.), with titles/
   descriptions derived from the site's own live section copy — not
   invented. These flow into inject-canonicals on next build.
4. **og:image is hosted on a gpt-engineer GCS bucket** — a fragile
   third-party dependency for your brand's share image. Recommend
   uploading /og-default.jpg to your own domain (SEOHead.NEW.tsx already
   points there).
5. **Meta claim "Trusted by 10,000+ monthly UK visitors"** — currently
   unverifiable (no GA4 baseline shared yet). If GA4 shows fewer, this
   claim should change; a charity can't afford an inflatable-looking stat.
6. **Homepage claims "native dark mode"** — an earlier Lovable session
   concluded the project had no dark theme. One of these is wrong; toggle
   the site's theme switch to check, and fix whichever is stale.
7. Live site is FAR larger than my dataset: /regions/*, /diet/*, /blog,
   /community, /health-tools, /exercises/* etc. My sitemap-generated.xml
   is a verified SUBSET (271 routes) — still merge, don't replace.

## Updated in bundle (commit to apply)
- scripts/ai-head-data.json: 238 → 266 routes
- scripts/generate-sitemap.mjs: correct legal paths
- public/sitemap-generated.xml: 271 routes
