## Plan: Add SEO publish checklist doc

Create a single markdown checklist at `docs/seo-publish-checklist.md` that you can walk through before hitting Publish. No app code changes — pure reference document.

### Contents

1. **robots.txt** (`public/robots.txt`)
   - Confirm `User-agent: *` block exists and doesn't `Disallow: /`
   - Private routes disallowed: `/admin/`, `/auth`, `/debug/`, `/donation-result`, `/unsubscribe`, `/newsletter/confirm`, `/dashboard`, `/checkout`, `/callback`
   - `Sitemap: https://livingwitharthritis.org.uk/sitemap.xml` present

2. **sitemap.xml** (`public/sitemap.xml`)
   - `BASE_URL` = `https://livingwitharthritis.org.uk`
   - New route `/guides/hip-exercises-for-osteoarthritis` included
   - `<lastmod>` updated on changed URLs
   - No private/admin/debug paths listed
   - Validates as XML (quick `xmllint --noout` command included)

3. **Per-page metadata** (via `<Helmet>` / `SeoHead`)
   - `<title>` unique, ≤60 chars, not "Lovable App"
   - `<meta name="description">` unique, ≤160 chars, not "Lovable Generated Project"
   - `<link rel="canonical">` absolute URL on the production domain
   - `og:title`, `og:description`, `og:url`, `og:type`, `og:image` set
   - `twitter:card = summary_large_image`, `twitter:title`, `twitter:description`
   - Single `<h1>` per page, matches title intent

4. **Structured data**
   - JSON-LD injected via `useEffect` (Helmet-safe)
   - BreadcrumbList on nested pages, FAQPage where applicable, MedicalWebPage on guides
   - Validate one URL in Google Rich Results Test (link included)

5. **index.html static head**
   - Title + description are real (not template defaults)
   - `og:*` and `twitter:*` present as fallback for non-JS crawlers (LinkedIn, Slack, Facebook)

6. **Pre-publish verification commands**
   - `bunx tsgo --noEmit` — typecheck passes
   - `curl -s https://livingwitharthritis.org.uk/robots.txt | head` — live check after publish
   - `curl -s https://livingwitharthritis.org.uk/sitemap.xml | head` — live check after publish
   - Google Search Console → Submit sitemap
   - Google Rich Results Test for one guide URL
   - LinkedIn Post Inspector for OG preview

7. **Post-publish**
   - Trigger SEO rescan in the SEO & AI search panel
   - Request re-index of key URLs in Search Console

### Files created
- `docs/seo-publish-checklist.md`

No changes to app source, routes, or existing SEO files.
