---
name: enforce-blog-min-wordcount
description: Audit and expand every published blog article in the Lovable Cloud `blog_articles` table to a minimum of 1,400 words. Trigger when the user asks to lengthen, expand, standardize, hit a word-count floor, or ensure a minimum length on blog posts on the Living With Arthritis UK site.
---

# Enforce ≥1,400 words on every blog article

Ensure every row in the `blog_articles` table (Lovable Cloud) where `is_published = true` has body `content` of at least **1,400 words**. Never trim posts already at or above the floor. Never touch `title` or `slug`.

## Preflight

1. Confirm the schema: `slug (text, pk)`, `title`, `content`, `excerpt`, `meta_description`, `is_published`, `category`, `updated_at`. Reference: `src/hooks/useBlogArticles.ts`.
2. Read `references/style-rules.md` for the mandatory Quick Answer / Key Takeaways / Callouts / FAQ / UK-English voice.

## Step 1 — Audit (read-only)

Run the query in `scripts/audit.sql` via `supabase--read_query`. It returns `(slug, title, word_count)` for every published article under 1,400 words, ascending.

```sql
SELECT slug, title,
       array_length(regexp_split_to_array(trim(content), '\s+'), 1) AS word_count
FROM public.blog_articles
WHERE is_published = true
  AND array_length(regexp_split_to_array(trim(content), '\s+'), 1) < 1400
ORDER BY word_count ASC;
```

Report the count and the top 10 shortest slugs before proceeding.

## Step 2 — Expand (batched, one AI call per slug)

For each slug in the audit result:

1. Fetch full row (`content`, `title`, `category`, `meta_description`).
2. Expand the article **in Cursor** using `scripts/expand-one.md`. Do **not** call the Lovable AI gateway or `/tmp/lovable_ai.py` (those burn Lovable credits). Use a small-capable model; one article per call.
3. Validate the returned markdown: word count must be **1,400–1,700**. If short, re-prompt once asking to extend to 1,500 words. If still short, skip and log to `/tmp/blog-expansion/_failed.txt`.
4. Stage each rewrite as `/tmp/blog-expansion/<slug>.md`.

Process in batches of 10 to bound blast radius. Never run more than 25 concurrent AI calls.

## Step 3 — Persist

For each validated file, `UPDATE public.blog_articles SET content = $1, updated_at = now() WHERE slug = $2` via the `supabase--insert` tool. Do the writes in one batch per 10 slugs; commit between batches so a mid-run failure leaves earlier batches saved.

## Step 4 — Verify

Re-run the audit query. Report:
- Before / after count of sub-1,400 articles
- List of slugs skipped (if any) with reason
- Total AI calls used

## Rules — do not violate

- **Preserve structure**: keep existing H2/H3s, Quick Answer, Key Takeaways, Callouts (`> [!NOTE]` / `> [!TIP]` / `> [!WARNING]`), FAQ, and closing CTA if present. Add material inside these sections; do not restructure.
- **UK English only** (colour, oesophagus, paracetamol, GP, NHS pathways).
- **No padding, no repetition, no filler** ("In conclusion, as we discussed…"). Add substantive content: mechanism explanations, UK NHS pathways, NICE guidance, patient examples, expanded FAQ entries, evidence citations.
- **Medical accuracy**: never invent statistics or citations. If a claim cannot be sourced, leave it out.
- **Do not rewrite** `title`, `slug`, `excerpt`, `meta_description`, or any front-matter/JSON fields.
- **Never widen scope**: skill covers `blog_articles` only, not condition pages, comparison guides, or city pages.
