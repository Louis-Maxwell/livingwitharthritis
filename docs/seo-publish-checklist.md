# SEO Publish Checklist

Walk through this before hitting **Publish** so SEO changes ship cleanly. Domain: `https://livingwitharthritis.org.uk`.

---

## 1. `public/robots.txt`

- [ ] `User-agent: *` block present and does **not** contain `Disallow: /`
- [ ] Private routes disallowed:
  - `/admin/`
  - `/auth`
  - `/debug/`
  - `/donation-result`
  - `/unsubscribe`
  - `/newsletter/confirm`
  - `/dashboard`
  - `/checkout`
  - `/callback`
- [ ] `Sitemap: https://livingwitharthritis.org.uk/sitemap.xml` directive present
- [ ] No accidental `Disallow: /` at the top of any block

Quick check:
```bash
grep -E "^(User-agent|Disallow|Allow|Sitemap):" public/robots.txt
```

---

## 2. `public/sitemap.xml`

- [ ] All `<loc>` values use `https://livingwitharthritis.org.uk` (no preview or `.lovable.app` URLs)
- [ ] New guide `/guides/hip-exercises-for-osteoarthritis` is present
- [ ] `<lastmod>` updated for changed URLs (ISO date, e.g. `2026-07-02`)
- [ ] No private/admin/debug paths listed
- [ ] Valid XML

Quick checks:
```bash
grep -c "<url>" public/sitemap.xml                       # entry count
grep "hip-exercises-for-osteoarthritis" public/sitemap.xml
xmllint --noout public/sitemap.xml && echo "XML OK"
```

---

## 3. Per-route metadata (Helmet / `SeoHead`)

For every page you touched:

- [ ] `<title>` — unique, ≤ 60 chars, not `"Lovable App"`
- [ ] `<meta name="description">` — unique, ≤ 160 chars, not `"Lovable Generated Project"`
- [ ] `<link rel="canonical">` — absolute URL on `https://livingwitharthritis.org.uk`, self-referencing the route
- [ ] `og:title`, `og:description`, `og:url`, `og:type` set (`article` for guides, `website` otherwise)
- [ ] `og:image` set to an absolute `https://` URL (1200×630) — or intentionally omitted so hosting injects a fallback
- [ ] `twitter:card = summary_large_image`, `twitter:title`, `twitter:description`
- [ ] Exactly one `<h1>` per page, aligned with `<title>` intent

---

## 4. Structured data (JSON-LD)

- [ ] Injected via `useEffect` (not inline in Helmet) to avoid Helmet crashes — per project memory
- [ ] `BreadcrumbList` on nested pages (Guides, Conditions)
- [ ] `MedicalWebPage` on guide pages
- [ ] `FAQPage` where the page has a real Q&A section
- [ ] Validate one URL: <https://search.google.com/test/rich-results>

---

## 5. Static `index.html` head (fallback for non-JS crawlers)

Social crawlers (LinkedIn, Slack, Facebook) don't run JS — they only see `index.html`.

- [ ] `<title>` is a real app-level title, not `"Lovable App"`
- [ ] `<meta name="description">` is real, not `"Lovable Generated Project"`
- [ ] Sitewide `og:title`, `og:description`, `og:type`, `og:url`
- [ ] `twitter:card`, `twitter:title`, `twitter:description`
- [ ] Organization / WebSite JSON-LD present
- [ ] No `<link rel="canonical">` here (each route owns its canonical via Helmet)

---

## 6. Pre-publish verification

```bash
# TypeScript
bunx tsgo --noEmit

# Sitemap XML validity
xmllint --noout public/sitemap.xml && echo "sitemap OK"

# Sanity-check that new routes are wired
grep -n "hip-exercises-for-osteoarthritis" src/App.tsx src/lib/guideRegistry.ts public/sitemap.xml
```

Then check the **Security** panel — resolve any unresolved critical findings before publishing (e.g. the `/debug/schema` open-iframe warning currently flagged).

---

## 7. Post-publish (after hitting Update)

```bash
# Confirm files served from the live domain
curl -sI https://livingwitharthritis.org.uk/robots.txt   | head -1
curl -sI https://livingwitharthritis.org.uk/sitemap.xml  | head -1
curl -s  https://livingwitharthritis.org.uk/robots.txt   | head -20
```

- [ ] Google Search Console → **Sitemaps** → resubmit `sitemap.xml`
- [ ] Google Search Console → **URL Inspection** on the new guide → *Request indexing*
- [ ] Rich Results Test: <https://search.google.com/test/rich-results?url=https%3A%2F%2Flivingwitharthritis.org.uk%2Fguides%2Fhip-exercises-for-osteoarthritis>
- [ ] LinkedIn Post Inspector: <https://www.linkedin.com/post-inspector/>
- [ ] Facebook Sharing Debugger: <https://developers.facebook.com/tools/debug/>
- [ ] Trigger a rescan in the **SEO & AI search** panel and clear any new findings

---

## Notes

- Frontend changes (metadata, robots, sitemap) go live only after clicking **Update** in the Publish dialog.
- Social crawlers cache previews — a changed `og:image` may take days to refresh unless forced via the debuggers above.
- The `og:image` on `index.html` is intentionally left to hosting unless you set an explicit absolute `https://` URL.
