# Make the Help & Support chat give accurate, site-grounded answers

## What's actually wrong

The chat backend is built for retrieval-augmented answers: before calling the model it embeds the visitor's question and looks up matching passages from your site via the `match_content` search, then tells the model to prefer those facts.

That lookup currently returns nothing, because the content table it searches (`content_embeddings`) is **empty — 0 rows**. Every answer today is the model's general knowledge with no connection to your 255 blog articles, 238 condition/guide pages, or your UK care-pathway content. That is why replies can be vague, generic, or wrong about what your site says.

Two supporting causes:
- The only way to fill that table is an admin-only "ingest" endpoint that has never been run, and its built-in corpus is just 24 hand-written paragraphs — nowhere near the real site.
- Nothing re-indexes content when articles are added or edited, so even after a one-off fill it would drift out of date.

## The fix

### 1. Build the content index (the main fix)
Add a repeatable indexing script that gathers the site's real content and embeds it into `content_embeddings`:
- All published blog articles from the database (title, summary, body — split into passages).
- The condition/guide/glossary/city pages already described in `scripts/ai-head-data.json` (the same reviewed data used for `llms-full.txt`), including their Q&A pairs.
- The existing 24 curated clinical paragraphs.

Each passage stores its title, real site URL and a checksum, so re-runs only re-embed changed content and cost nothing for unchanged pages.

### 2. Keep it fresh
Wire the indexer into the existing daily content refresh job so new and edited articles are picked up automatically, and make it runnable on demand.

### 3. Improve retrieval quality in the chat function
- Retrieve more candidate passages (5 → 8), drop weak matches below a similarity floor, and de-duplicate repeated pages.
- Add a keyword fallback: if the vector search finds nothing, do a plain text search across published articles so the chat still cites something real.
- Include the last user turn plus a little conversation context in the search query, so follow-up questions ("what about the knee one?") retrieve correctly.

### 4. Tighten the answer rules
- Instruct the model to answer **from the retrieved passages first**, and to say plainly when the site doesn't cover something rather than improvising.
- Keep all existing safety behaviour (red flags, no diagnosis, no dosing, UK signposting) untouched.
- Move the chat onto a current-generation model; the one in use is a prior generation.

### 5. Verify with real questions
After the index is built, run a set of test questions through the live function and check each answer cites correct, existing pages — for example: "what does NICE recommend for knee osteoarthritis?", "is collagen or glucosamine better?", "which exercises help hand arthritis?", "how do I claim PIP with arthritis?". I'll report the answers and the pages they cite.

## Technical notes

- New `scripts/index-site-content.mjs`, run with the service role key, batching passages to the existing `index-content` edge function (checksum skip logic already implemented there).
- `supabase/functions/chat/index.ts`: `match_count` 5 → 8, similarity threshold + URL de-dup in `retrieveContext`, keyword fallback via `blog_articles` text search, richer query string for `embedQuery`, grounding-first wording added to `BASE_SYSTEM_PROMPT`, model id updated.
- Embeddings stay on `openai/text-embedding-3-small` to match the existing `vector(1536)` column — no schema change needed.
- No frontend changes; the chat UI, streaming and resource cards keep working as-is.
