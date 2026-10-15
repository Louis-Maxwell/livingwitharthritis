# Blog never-break plan

**Date:** 12 September 2026
**Site:** livingwitharthritis.org.uk
**Repo:** Louis-Maxwell/livingwitharthritis
**Honest limit:** no system can promise a page will never fail. This plan is the engineering bar so a broken blog cannot ship, cannot stay hidden, and cannot come back as the same class of bug.

> **Update (25 Sep 2026):** the two catalogs described below are gone. All 505
> guides now live in `src/content/blog/posts/<slug>.json` (one file each),
> validated by `src/lib/blog/schema.ts` and `src/lib/__tests__/blog-catalog-integrity.test.ts`.
> Listings read a metadata-only index; bodies lazy-load per slug. See
> `docs/ADDING-A-BLOG-GUIDE.md`. The counts below are kept as history.

---

## What I actually counted (12 Sep 2026)

| Source | Count |
| --- | --- |
| `src/data/contentStats.generated.json` `blogArticleCount` | **505** |
| `src/data/blog-slugs.generated.json` | **505** |
| `src/data/blog-cover-map.generated.json` | **505** |
| `scripts/blog-head-data.json` `/blog/*` entries | **505** |
| `src/content/blog/frailty-batch.json` | 250 |
| `src/content/blog/phase2-batch.json` | 17 |
| Those two batches, published, unique slugs, no empty title/content/date | **267** |
| `src/data/blogArticles.json` / `blogList.json` | **238** |
| `contentStats.wordCounts` keys | **238** (the older set only) |
| `scripts/prerender-routes.mjs` `/blog/:slug` list (from `blog-slugs.generated.json`) | **505** |
| `src/data/prerender-routes.generated.json` `/blog` hubs + categories | **10** (not article slugs) |
| Surfaces that still read `blogList.json` only | search, footer most-read, homepage preview (**238**) |

505 = 267 (JSON batches used by `staticBlogCatalog.ts`) + 238 (legacy `staticBlog.ts` / `blogArticles.json`).

A live `/blog/:slug` page tries the 267-file catalog first, then the 238-file snapshot. Both must stay in step with slugs, covers, and head-data.

In the 267-file batches today: **0** empty titles, **0** empty bodies, **0** missing dates, **0** duplicate slugs.

---

## How blogs have already broken (do not re-open)

These are real incidents on this site, not theory.

1. **React hook order on `/blog/:slug`** — `useBlogViews` ran after the loading/404 return. Client navigation then threw “Rendered more hooks than during the previous render” and the article went blank. Fixed by always calling the hook.
2. **`relatedClusters.ts` array hole** (`},,`) — `new Map(...)` threw at module load and took down any page that imported the cluster map, including `/exercises` via the footer.
3. **Second React copy in a lazy demo** — `/exercises` crashed. Same class of “one bad chunk kills a route”.
4. **Share preview = “Page not found”** — Facebook/WhatsApp crawlers do not run the SPA. Most blog URLs were not prerendered, so the crawler got 404 HTML.
5. **Share image = red stick-figure** — missing or wrong `og:image`.
6. **Escaped HTML in article bodies** — `<pre><code>` leftovers from `marked`.
7. **DietHub / import syntax** — one broken import blocked Lovable publish for the whole site, including blogs.
8. **Dead Supabase calls after the package was removed** — leftover script imports would have failed any job that still ran them.

---

## What can still break a blog tomorrow

Ranked by what actually hurts a reader or a share.

1. **`blogList.json` is still 238.** Search (`siteSearchCatalog.ts`), footer most-read, and the homepage blog preview only read that list. The other **267** posts open if you have the URL, but they do not show in those surfaces.
2. **Two catalogs.** A new post added to only one of `frailty-batch.json`, `phase2-batch.json`, `blogArticles.json`, `blogList.json`, slugs, covers, or head-data will 404, list without opening, or share with the wrong title/image.
3. **The prerender *list* has all 505 slugs. A default `npm run build` does not write `/blog/*/index.html`.** `PRERENDER=1` / `build:prerender` does; `inject-canonicals.mjs` can still stamp head-data after a normal build. This workspace `dist/` currently has **0** blog HTML files. If Lovable ships the SPA shell, group shares look like 404s again.
4. **`wordCounts` is 238, public count is 505.** Any page that treats word-count keys as “all posts” will skip the frailty set.
5. **CI does not fail the site on a broken blog e2e.** `lint-and-test.yml` runs Playwright with `continue-on-error: true`. Vitest on `tests.yml` does run unit guards, but a live blank article can still ship.
6. **`tests.yml` still boots a Supabase `functions serve` job** after Supabase was removed. That job can go red for a reason that has nothing to do with blogs — or hide a real fail in noise.
7. **Article HTML is `dangerouslySetInnerHTML`.** One bad batch row (unclosed tag, `undefined` in a Map, hook after a return) crashes the route for that slug or every slug that shares the chunk.
8. **Lovable publish lag.** GitHub `main` is not the live hostname until publish. A “fixed on GitHub” blog can still be broken on livingwitharthritis.org.uk.
9. **No single smoke that opens every slug.** Guards check covers and head-data. They do not render 505 articles through `BlogPost`.

---

## The bar: a blog cannot ship if any of these fail

### Gate A — one catalog

- One published list. No second `blogArticles.json` / `blogList.json` fork.
- Every published slug exists in: catalog, `blog-slugs.generated.json`, `blog-cover-map.generated.json`, `blog-head-data.json`, sitemap.
- `contentStats.blogArticleCount` === unique published slugs === wordCount keys.
- CI fails if any count drifts by even one.

### Gate B — article body is real

For every published slug:

- `title`, `slug`, `date`, `excerpt`, `content` present
- content length above a floor (today’s 267 all exceed 200 characters)
- `is_published` true only when the row is openable
- no duplicate slugs
- no `PH123456` / invented reviewer leftovers
- markdown/HTML passes the existing unwrap + sanitize path

### Gate C — the page renders

- `BlogPost` hooks always run before any return (already true; add a lint/test that forbids hooks after `if (isLoading)` / `if (!article)`).
- `CONTENT_CLUSTERS` builds a Map with no holes (filter `Boolean` already; add a test that the array has no empty slots).
- A smoke test loads a fixture article through `BlogPost` (already have share-button / voiceover tests — extend to “no throw, has `h1`, has share URLs”).
- Nightly or CI sample: open 10 live slugs including a frailty slug, a legacy slug, a redirect slug, and `/blog`.

### Gate D — shares never show 404 or the red icon

- Every `/blog/:slug` is on the prerender list (already true). Every production build must write that HTML (title, description, `og:image` 1200×630, canonical) via inject or Puppeteer. Fail CI if the file is missing.
- `blog-head-social-meta` and `blog-share-guards` stay red-fail, not warnings.
- After every Lovable publish: Facebook Sharing Debugger rescrape is a named step, not optional folklore.
- Copy-for-groups / WhatsApp keep the real URL `https://livingwitharthritis.org.uk/blog/{slug}`.

### Gate E — publish is one path

- Code and catalog changes go to GitHub `main` only. No Lovable agent edits (credits + split brain).
- Live = Lovable publish of that commit. If it is not published, say “not live” — never “fixed”.
- Do not use Cursor cloud agents on this repo unless Louis asks.

### Gate F — honesty

- No invented view counts, named patient stories, or fake testimonials in article chrome.
- `useBlogViews` stays `null` unless a verified counter exists.

---

## Work order (do this, in this order)

### Week 1 — stop the split-brain

1. Merge the 238 + 267 into one catalog module. `useBlogArticle` reads one map.
2. Regenerate slugs, covers, head-data, sitemap, `contentStats` (including wordCounts for all 505) from that module.
3. Add `src/lib/__tests__/blog-catalog-integrity.test.ts`: counts must match; every slug openable; no empty body.
4. Make every production build write head + first HTML for all **505** slugs (`inject-canonicals` or `build:prerender`). Fail CI if `dist/blog/<slug>/index.html` is missing or still has the homepage title.
5. Remove or skip the dead Supabase job in `tests.yml` so CI means “site health”.
6. Turn Playwright blog smoke **on** (fail the workflow). First slice: `/blog` + 5 known slugs, including `vitamin-d-arthritis-uk`.

### Week 2 — render and share

7. Cluster-map hole test + hook-order test on `BlogPost.tsx`.
8. Sample-render 505 articles in Node (title in, HTML out, no throw). Fail CI on first exception.
9. Confirm live OG on 10 URLs after the next Lovable publish (curl the HTML, not the SPA).
10. Document the publish checklist in this file (below) as the only way a blog goes live.

### Standing

11. GitHub `ci-failed` on `main` wakes GTM. If the fail is catalog / prerender / BlogPost / share meta, Louis gets a short note the same day.
12. Weekday sample of live blog URLs (not a full 505 crawl). Stay quiet if all sampled pages return 200 with the article title in the HTML.
13. New article rule: never hand-edit only one of the generated files. Run the generate scripts, then commit the catalog + generated outputs together.
14. **CI break alerts:** **Grok Bot** watches red CI on `main` (including `Keep green (integrity)` and blog-related required checks). Do **not** create or restore Dependabot for this. See `docs/CI-KEEP-GREEN.md`. Honest limit: keep-green cannot guarantee never-break.

---

## Publish checklist (every blog change)

1. Catalog + generated files committed together.
2. `vitest` green locally (`blog-catalog-integrity`, share guards, BlogPost tests).
3. Push `main`.
4. Lovable publish of **that** commit.
5. Open the live slug in a browser. Confirm `h1` and share bar.
6. `curl -sL` the live URL and check `<meta property="og:title">` is the article, not “Page not found”.
7. Only then share the link in groups.

---

## What this plan does not do

- It does not invent traffic numbers.
- It does not restore Supabase, Vercel, or Cloudflare.
- It does not put the Oswestry registered address on any blog.
- It does not make Lovable publish itself. That step stays a named human/GTM action until GitHub is the deploy source.

---

## First measurement after Week 1

A blog is “safe to share” only when all of these are true for that slug:

- It is in the single catalog and opens on `/blog/:slug`
- Live HTML (no JS) contains the article title and a real `og:image`
- CI would have gone red if any of those were missing
