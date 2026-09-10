# Blog section enhancement (September 2026)

Living With Arthritis UK — registered charity **1218461**. Clinical reviewer: Maxwell, HCPC **PH128483**. Motto: **Motion is Lotion**. Independent of Arthritis UK. GitHub-only delivery.

## Weaknesses found

1. **Fake / empty engagement UI** — BlogIndex rendered a “Trending Now” block and per-card view counts driven by `useBlogViewCounts`, which intentionally returns an empty map (no live counter). The UI implied popularity metrics we do not have.
2. **No honest sort controls** — Listing order was mostly snapshot/`display_order` without a clear Newest / Recently updated / A–Z control for readers.
3. **Card consistency** — Featured strip and grid duplicated markup; hierarchy and meta (author, reading time, date) were uneven; type size was tight for a 40+ UK health audience.
4. **Discovery gaps** — No “Recently updated” strip and no explicit “Editor journeys” into `topicClusters` pillars on `/blog`.
5. **Soft CTAs** — Newsletter (`EmailSignupForm`) and `/donate` were not woven into the blog listing or post closing path in a non-intrusive way.
6. **Post tooling** — Breadcrumbs and share (Web Share + copy) existed; bookmark-for-later did not. Sticky desktop TOC was in-flow only. View counts still surfaced on posts when non-null.
7. **Tags** — Posts have no `tags` field on list/snapshot data; any tag UI must degrade gracefully.

## What changed

### Listing (`BlogIndex.tsx` + `BlogCard`)

- Extracted reusable **`BlogCard`** (`src/components/blog/BlogCard.tsx`): cover with `aspect-[16/9]` + width/height (CLS-safe), lazy images (eager/priority on first featured), category badge, title, excerpt, author when present, reading-time estimate, date, hover lift/shadow, focus rings, Listen link.
- **Sort**: Newest | Recently updated | A–Z — clearly labelled. **No Popular / Most viewed.**
- **Search** polished (larger input, clear button, author/category match).
- **Category chips** retained with counts and `aria-pressed`.
- **Tag filter**: implemented only when posts expose `tags`; currently none do, so the control is omitted.
- **Sections**: Editor’s Picks (existing priority + featured), **Recently updated** (by `updated_at`/`date`), **Editor journeys** linking to `TOPIC_CLUSTERS` pillars, topic hubs, category browse.
- **Pagination** kept (preferred over infinite scroll for a11y/SEO).
- **Newsletter + soft donate** via `BlogSoftCTAs` (uses `EmailSignupForm` + `/donate`).
- Skeleton loading, empty state, dark-mode-friendly tokens (`bg-card`, `border-border`, `text-muted-foreground`, `primary`).
- Removed trending / Eye / view-count UI from the listing.

### Post (`BlogPost.tsx`)

- Breadcrumbs kept and labelled (`aria-label="Breadcrumb"`).
- **Reading progress** bar (`ScrollProgress`) improved with `aria-valuenow` / min / max.
- **TOC**: inline on mobile; **sticky sidebar** on `lg+` (`TableOfContents` `variant="sticky"`).
- **Social share** retained (`SocialShareButtons` — Web Share API + copy link). No share counts.
- **Bookmark** via `localStorage` key `lwa.bookmarks.v1`, keyed by slug (`ArticleBookmarkButton`).
- **ClusterRelatedLinks** — pillar, supporting paths, and tool from `topicClusters`.
- Soft CTAs: newsletter + donate; closing CTA also links exercises / diet / donate.
- Article / MedicalWebPage schema: `image`, `dateModified`, Person author when Maxwell (HCPC PH128483) or Louis Maxwell.
- Single H1 retained; focus rings and aria labels tightened; view-count display removed.

### Shared / types

- List items now include `author` and `updated_at` (and optional `tags`) in `staticBlog`, `staticBlogCatalog`, and `useBlogArticles`.
- New helpers: `bookmarkedArticles.ts`, `BlogSoftCTAs`, `ClusterRelatedLinks`.

## Deferred (intentionally)

| Idea | Why deferred |
|------|----------------|
| **Popular / Most viewed / visitor counts** | No honest live counter; we refuse fabricated engagement metrics. |
| **Infinite scroll** | Pagination preferred for keyboard a11y, SEO crawl clarity, and predictable “page N” URLs. |
| **Tag taxonomy UI as primary filter** | Posts do not currently carry `tags` on the published list snapshot. |
| **Cloudflare restore / Lovable send_message** | Out of scope — GitHub-only. |
| **Oswestry address** | Not used anywhere in this work. |

## Performance notes

- Covers use `aspect-[16/9]`, width/height attributes, lazy loading below the fold; first featured card can use priority/eager for LCP.
- Sticky TOC is CSS `position: sticky` only — no layout thrash from measuring.

## Charity / clinical reminders

- Charity number **1218461**
- HCPC **PH128483**
- Motion is Lotion
- Independent of Arthritis UK
