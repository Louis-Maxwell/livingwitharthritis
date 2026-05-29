# Plan: SEO Fixes + Landing Page Refresh + Blog Imagery

## Part 1 — Fix the 4 failing SEO findings

**1.1 Page loads slowly (LCP)** — `src/pages/Index.tsx` / hero component
- Identify the hero image (largest above-the-fold) and set explicit `width`/`height`, remove `loading="lazy"`, add `fetchpriority="high"` and `decoding="async"`.
- Add `<link rel="preload" as="image" href="<hero>" fetchpriority="high">` to `index.html`.
- Ensure `font-display: swap` on `@font-face` in `src/index.css` (Playfair Display, body font).

**1.2 Accessibility contrast** — sweep components for `text-muted-foreground/50`, `text-gray-300/400`, low-opacity text on white backgrounds; replace with `text-foreground` or full-opacity `text-muted-foreground`. Focus areas: landing page subcopy, footer, hero badges.

**1.3 Condition page titles too long** — shorten `<title>` via `SeoHead`:
- Osteoarthritis page: current 68 chars → under 60 (e.g. "Osteoarthritis Guide UK | Living With Arthritis").
- Rheumatoid Arthritis page: current 75 chars → under 60 (e.g. "Rheumatoid Arthritis Guide UK | Living With Arthritis").
- Audit all `src/pages/conditions/*` titles.

**1.4 Sitemap missing routes** — `/chat`, `/auth`, `/admin*` are intentionally private. Update `scripts/generate-sitemap.ts` `STATIC_EXCLUDE` documentation comment so the scanner sees them as deliberately excluded, then mark finding fixed. No new entries added.

## Part 2 — Recreate landing page with 4K elderly imagery

Refresh `src/pages/Index.tsx` and landing components (`src/components/landing/*`) with a cohesive editorial flow. Use real, free 4K photography from Unsplash CDN of elderly people (active seniors, hands, gentle exercise, community moments) — all British/UK-relatable, warm, dignified, not stocky.

Approx 6–8 new Unsplash 4K image URLs (with srcset for 400/800/1200/1920w, `?q=80&auto=format`) wired into:
- Hero (split-screen, single LCP image, preloaded)
- "Real people" community band
- Exercise / movement section
- Nutrition section
- Closing CTA band

Keep existing structure (12-section editorial flow per memory), tighten copy, preserve white/black/red palette, no AI branding, no political content.

## Part 3 — Add images to every blog post

- Audit `blog_articles` table via `supabase--read_query` to list posts with `image_url IS NULL` or pointing to placeholders.
- Assign a topical Unsplash 4K image per post (mapped by category: exercise → movement photos, diet → food photos, conditions → people/hands, etc.) via a single migration `UPDATE` statement.
- Add per-post `srcset` rendering in `BlogPost.tsx` and `BlogIndex.tsx` where missing (BlogPreview already does this).
- Ensure all images have meaningful `alt` text (not `alt=""`) on blog list/detail pages.

## Technical notes

- All image URLs centralized in `src/data/images.ts` per memory rule.
- Mark all 4 SEO findings fixed via `update_findings` after code lands; surface publish dialog since findings score the last-published build.
- No backend schema changes beyond one `UPDATE` migration for blog `image_url`.
- No new dependencies.

## Out of scope

- The "40–50M visitors / 40% bounce rate" growth plan from earlier — that's a strategy doc, not a code change. Can revisit separately.
- SSR/prerender for per-route social previews.
- New blog content / copywriting beyond image alt text.
