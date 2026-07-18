## Goal

Rewrite the `content` (and backfill `direct_answer`) of all 218 published rows in `blog_articles` so each post renders in the new layout wired into `BlogPost.tsx`: a Quick Answer, a structured body with the four callout prefixes (💡 / ✅ / ⚠️ / 📝), question-form H2/H3 headings that feed the visible FAQ + FAQPage JSON-LD, and the closing CTA block.

The template renderer already ships these sections automatically — the missing piece is that only **1 of 218** posts currently uses callouts, and **27** are missing `direct_answer`. This plan produces the content changes.

## Current state (verified this turn)

- 218 published posts, avg 4,817 chars of markdown
- 191/218 have `direct_answer`; 27 do not
- 1/218 has any callout prefix in `content`
- Schema columns available for the rewrite: `content`, `direct_answer`, `excerpt`, `meta_description`, `updated_at`

## Approach: LLM-driven rewrite in DB, batched

You said "full rewrite" + "automated script pass" + "DB rows". A pure regex transform can't produce a genuine rewrite — it can add callout tags to sentences containing "tip:" but it can't restructure prose. So the script uses the **Lovable AI Gateway** (`google/gemini-2.5-flash`, no key needed) with a strict system prompt per row.

### Pipeline

1. **Snapshot every row first** into a new `blog_articles_backup_20260718` table (full copy, one migration). Non-negotiable — if any rewrite goes off the rails we restore in one SQL statement.
2. **Fetch** id, slug, title, category, existing `content`, `direct_answer`, `excerpt` for all 218 rows.
3. **For each row**, call the LLM with a locked-down prompt that:
   - Takes the existing content as the single source of truth for facts, stats, dosages, and named products. **No new claims, no new numbers.**
   - Returns JSON: `{ direct_answer, content }`.
   - Rewrites `content` as markdown with:
     - A short intro paragraph
     - Section H2s in question form where sensible ("How do I…", "What causes…")
     - At least 2 callouts using the exact prefixes the renderer looks for: `💡 Helpful tip:`, `✅ Try this gently:`, `⚠️ When to get help:`, `📝 Remember:`
     - A 4–6 item FAQ near the end as `## Q?` / answer pairs (the renderer extracts these and hides the H2s in the prose to avoid duplication)
   - Keeps `direct_answer` at 40–70 words, plain prose, no markdown, answers the post's title question directly.
4. **Validate** each response before writing: JSON parses; `content` length within 60–150% of original; at least 2 callout prefix matches; at least 3 Q?-form H2s; no obvious hallucinated numeric claim (regex check that any digit-bearing sentence in the new content also appears in the original — if not, skip the row and log it).
5. **Write back** with `UPDATE blog_articles SET content=…, direct_answer=…, updated_at=now() WHERE id=…` in batches of 20 via `supabase--insert`. Each batch surfaces for user approval.
6. **Report** at the end: how many succeeded, how many were skipped by the safety validator, and a list of skipped slugs for manual review.

### Script location

`scripts/rewrite-blog-posts.ts` (new). Uses `LOVABLE_API_KEY` from env, `@supabase/supabase-js` with service role for reads, and writes SQL to `/tmp/rewrite-batch-N.sql` for review before I apply each batch. Not wired into CI — it's a one-off.

## Safety guardrails

- **Full DB backup table** before any write — allows one-line restore.
- **No new facts.** Numeric-claim validator rejects any sentence with a number that isn't in the source.
- **Batch approval.** 218 rows split into ~11 batches of 20; you approve each `supabase--insert` before it runs.
- **Reversible.** If a batch reads badly you say "revert" and I run `UPDATE blog_articles SET content = b.content, direct_answer = b.direct_answer FROM blog_articles_backup_20260718 b WHERE blog_articles.id = b.id` for that batch's ids.
- **No schema changes** except the one-shot backup table.

## What I'm NOT doing (unless you say otherwise)

- Not touching `meta_title`, `meta_description`, `excerpt`, `keywords`, or `citations` — separate concerns.
- Not rewriting `.tsx` guide pages (BoneDensity, PreventativeMSK, etc.) — those aren't in `blog_articles`.
- Not changing the `BlogPost.tsx` renderer or the three new components — they already work.
- Not regenerating `og:image` per post.

## Deliverables at the end

- 218 rows updated (minus any the validator skipped)
- `blog_articles_backup_20260718` table retained for 30 days as rollback
- Skipped-slugs report so you can decide whether to hand-write them

## Cost / time

~218 Gemini Flash calls at roughly 6–8k tokens each. Runs in about 15–25 minutes of tool time across the batched turns.

## Open question before I start

**Do you want me to include batches inline in one long turn (fast, less review time per batch) or one batch per turn (slower, you sanity-check 20 posts before the next 20)?** Default = one batch per turn.
