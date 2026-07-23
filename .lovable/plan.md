## Skill: enforce-blog-min-wordcount

Create a reusable skill at `.agents/skills/enforce-blog-min-wordcount/` that a future agent instance can invoke to ensure every blog article in the `blog_articles` table has at least **1,400 words** of body content.

### What the skill will contain

**SKILL.md** (frontmatter + instructions):
- `name`: enforce-blog-min-wordcount
- `description`: "Audit and expand every published blog article in the Lovable Cloud `blog_articles` table to a minimum of 1,400 words. Trigger when the user asks to lengthen, expand, standardize, or hit a word-count floor on blog posts."
- Body sections:
  1. **Preflight** — read the article schema from `src/hooks/useBlogArticles.ts`; confirm `content`, `slug`, `title`, `is_published` columns.
  2. **Audit step** — run the bundled `audit.ts` script (via `supabase--read_query`) that returns every published slug with `word_count < 1400`, sorted ascending.
  3. **Expansion rules** (strict, verbatim in SKILL.md):
     - Preserve existing headings, callouts, FAQ, UK English, medical accuracy, and the Quick Answer / Key Takeaways / FAQ structure already used in `BlogPost.tsx`.
     - Only add net-new material: extended explanations, UK NHS pathways, evidence citations, expanded FAQ entries, practical examples. Never repeat sentences to pad.
     - Target 1,400–1,700 words. Never trim content that is already long enough.
     - Keep `meta_description` ≤160 chars; do not rewrite `title` or `slug`.
  4. **Batched execution** — process in batches of 10 slugs, one AI call per slug via the Lovable AI gateway (`openai/gpt-5.4-mini`, reasoning_effort not applicable), then bulk `UPDATE blog_articles SET content = ... WHERE slug = ...` via migration. Stage rewrites under `/tmp/blog-expansion/<slug>.md` for review before writing back.
  5. **Verification** — re-run the audit query; confirm zero rows returned. Report before/after counts.

**scripts/audit.sql** — the read-only word-count audit query.
**scripts/expand-one.ts** — template for a single-slug expansion call (system prompt, user prompt, length validator).
**references/style-rules.md** — the exact voice/structure rules extracted from the earlier rewrite work (Quick Answer, Key Takeaways, Callouts, FAQ, UK English, medical review line).

### What this plan does NOT do

- Does **not** run the expansion now. This turn only creates and applies the skill so a future turn (or you, next message) can invoke it.
- Does **not** touch any blog content, database rows, or components.

### After approval

I will write the skill files under `.agents/skills/enforce-blog-min-wordcount/`, then call `skills--apply_draft` to activate it. Next message you can say "run the blog word-count skill" and I'll execute the audit + expansion.

### Note on the request itself

If you'd rather I **just do the expansion right now** on the current set of short articles (no skill, one-off), say so and I'll replace this with an execution plan instead. A skill only pays off if you expect to re-run this workflow repeatedly.