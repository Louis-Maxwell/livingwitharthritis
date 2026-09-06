# How to Write SEO Content (Living With Arthritis UK)

Louis Maxwell's 8-step framework for every new guide, hub page, and blog post.

**Formula:** Great SEO content = search intent + clarity + helpful value.

**Framework image (public):** `/og/seo-content-framework.png`
**On-disk / workspace copy:** `/workspace/seo-content-framework.png` (same asset)  
**Reader-facing pages:** [/editorial-standards#seo-content-framework](https://livingwitharthritis.org.uk/editorial-standards#seo-content-framework) and [/seo-content-framework](https://livingwitharthritis.org.uk/seo-content-framework)

---

## The 8 steps

| # | Step | What agents / authors must do |
|---|-----|---------------------------|
| 1 | **Search intent** | State the reader's job-to-be-done in one sentence (informational, navigational, or transactional). Match UK patient language — no keyword stuffing. |
| 2 | **Keyword** | Pick one primary phrase + 2-4 related terms. Put the primary in title, H1, first paragraph, and one H2 where natural. |
| 3 | **Strong title** | Clear, benefit-led, <= ~60 chars where possible. Prefer UK spelling and place ("UK", "PIP", "NHS") when relevant. |
| 4 | **Clear H2/H3 outline** | Draft the outline before the body. One H1 only. H2s answer sub-intents; H3s support. TOC/outline must match real headings. |
| 5 | **Helpful content** | Empathy-led, short paragraphs, practical steps. No fake stats, invented clinicians, or miracle claims. Cite NICE / GOV.UK / peer review when making clinical claims. |
| 6 | **On-page SEO** | Unique meta title + description (intent + keyword), canonical, OG/Twitter, breadcrumb, Organization consistency, `en-FB` / `geo.region=GB`. |
| 7 | **Internal links** | Link to the closest hub (`/exercises`, `/diet`, `/guides`, `/benefits-pip`, `/blog`) plus 2-4 related guides. Use descriptive anchors. |
| 8 | **Readability** | Plain English, scannable lists, key takeaways + FAQ when Q&A exists. Prefer AEO blocks: direct answer, takeaways, speakable selectors. |

---

## Template mapping (do not rewrite all blog bodies)

- **BlogPost template** — AnswerBox (direct answer), Key takeaways, TSC, FAQ block + FAQPage schema, speakable selectors, meta helpers, InternalLinks.
- **Hub pages** (`/blog`, `/guides`, `/diet`, `/exercises`, `/benefits-pip`, `/search`) — intent-led intros, GEO signals, stronger related-link blocks.
- **EditorialStandards / SeoContentFramework page** — human-readable version of this framework + image.
- **Worker `/api/search`** — ranks title/intent matches above weak excerpt hits.

---

## Charity & brand invariants (never drop)

- Charity number **1218461**, based in **Oswestry**, independent of Arthritis UK
- HCPC **PH128483** (Louis Maxwell)
- `foundingDate` **2026-06-15**
- Tagline / movement line: **Motion is Lotion**
- `robots.txt`: **Bytespider Disallow** remains
- Preserve **seo:blog-guards** (cover/OG/share regression suite)
- No Supabase/Vercel reintroduction; no Lovable send_message; no cloud agents for content edits

---

## Publishing new SEO pages (IndexNow)

After shipping a new public URL (hub, guide, or blog):

1. Ensure the URL is in the sitemap generation path (`scripts/generate-sitemap.ts` / prebuild).

2. Optionally ping IndexNow: `npm run indexnow` (or `INDEXNOW=1 node scripts/indexnow-ping.mjs`). Requires `INDEXNOW_KEY` — do not invent secrets.

3. Prefer the existing postbuild IndexNow hook; no wrangler deploy is required for frontend-only SEO page adds.

See also: `docs/seo-publish-checklist.md`, `docs/CLOUDFLARE-API.md`.

---

## Agent checklist for **new** content

- [ ] Intent stated; primary keyword chosen
- [ ] Strong title + matching H1
- [ ] H2/H3 outline written first
- [ ] Helpful body (UK English, no fake stats/clinicians)
- [ ] Meta title/description via `enforceTitle` / `enforceDescription` patterns
- [ ] Internal links to hubs + related posts
- [ ] Key takeaways and/or FAQ when the article answers questions
- [ ] Cover/OG pipeline untouched; `npm run seo:blog-guards` still passes
- [ ] IndexNow note considered if the URL is newly public
