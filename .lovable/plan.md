# Finish the remaining audit items

Most of the earlier audit list is already done (direct_answer 191/218, ProfilePage/MedicalWebPage schema, sitemap additions, question-form H2s, alt tag, canonical dedupe, /ai footer link). This plan closes out what's left, in batches small enough not to time out.

## What's left

**Meta titles (blog_articles, 218 published):**
- 28 posts with NULL/empty `meta_title`
- 41 posts with `meta_title` > 60 chars
- 4 posts with `meta_title` < 40 chars (the audit's "23 too-short" figure appears to have counted across other page types too — see Question 1)

**Orphans:**
- `/ai` — already fixed via Footer link last turn
- 4 locale-root pages still have zero inbound internal links

**Content quality (separate from SEO):**
- 27 remaining blog posts without direct_answer are template filler (~2,500 chars, identical 5-section skeleton). Nothing to summarise faithfully until content is rewritten.

## Proposed work, in order

### 1. Fix blog meta_titles (69 posts, done in 3 batches of ~25)

For each affected post, generate a `meta_title`:
- Faithful to the post's existing `title` and body content — no invented claims, same guardrail as direct_answer
- Length 45–60 chars, single H1-equivalent phrasing
- Include the primary keyword when it's already the post's topic; append " | Living with Arthritis" only if it fits under 60 chars
- Skip any post where the title itself is generic filler (same boilerplate cluster) — list skipped slugs

Batches:
- Batch A: 28 missing meta_titles
- Batch B: 25 of 41 over-length meta_titles (trim, keep meaning)
- Batch C: remaining 16 over-length + the 4 short ones

Write via `UPDATE public.blog_articles` (migration tool, same pattern used successfully for direct_answer batches).

### 2. Fix the 4 orphaned locale-root pages

Add contextual internal links from a natural parent surface (likely the Footer's existing "Locations" or a new "Regions" column, or from the main City hub page). Confirm target list first (see Question 2).

### 3. Content-quality decision on the 27 boilerplate posts

Not a code task — needs a call from you. Options:
- (a) Queue into `content_refresh_queue` for a proper rewrite pass (recommended — thin duplicate-pattern content is a Google quality risk beyond just AEO)
- (b) Unpublish them until rewritten
- (c) Leave as-is and accept the missing AnswerBoxes

## Out of scope for this plan

- No changes to templates, routes, or components beyond adding internal links for the 4 orphans
- No new schema wrappers (already done)
- No sitemap changes (already regenerated at 1,165 entries)
- No content rewriting of the 27 boilerplate posts — that's a separate content project

## Technical notes

- Meta title generation uses the same Lovable AI Gateway script (`/tmp/lovable_ai.py`, `openai/gpt-5.5`) that produced the direct_answers, with a stricter system prompt clamping output to a single line under 60 chars.
- Updates land via `supabase--migration` UPDATE statements per batch (the earlier PATCH-via-anon-key approach silently no-ops under RLS; migrations are the reliable path).
- Verification after each batch: `SELECT count(*) ... WHERE meta_title IS NULL OR length(meta_title) > 60` should trend to 0.

## Questions before I start

1. The audit summary said "23 posts with too-short meta titles" but the DB shows only 4 blog posts under 40 chars. Was that count including glossary/city/comparison pages? If so, do you want me to include those in the meta_title pass, or keep it blog-only?
2. For the 4 orphaned locale-root pages — can you confirm which pages these are (URLs), or should I run a fresh orphan check to identify them before adding links?
3. On the 27 boilerplate posts — do you want me to at least queue them into `content_refresh_queue` now, or leave that decision for later?