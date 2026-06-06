## Root cause (confirmed)

Visitors on `https://livingwitharthritis.org.uk/blog` see no articles because the **published site is talking to the wrong backend**.

Network trace from the live site:
```
GET https://zrvcejlncpndjfyuvcrd.supabase.co/rest/v1/blog_articles?... → 200 (empty)
```

But the project's current Lovable Cloud backend — where all 203 published blog articles actually live — is:
```
https://nfijkdoifihbgomcnbnb.supabase.co
```

Verification:
- DB query against current backend: **203 published / 204 total** blog_articles.
- Direct REST call against current backend with the project anon key returns articles correctly.
- The live HTML/JS bundle was built against the previous backend URL and key (`zrvcejlncpndjfyuvcrd`), so React Query receives empty arrays and the page renders "0 articles".
- Code (`BlogIndex.tsx`, `useBlogArticlesList`, RLS policy "Anyone can view published blog articles") is all correct — no code bug.

This is a stale-build problem, not a code, RLS, or data problem.

## Fix

Single action: **republish the site** so the production bundle is rebuilt with the current `.env` (`VITE_SUPABASE_URL=https://nfijkdoifihbgomcnbnb.supabase.co` and the matching publishable key already present in the project).

No code, schema, or data changes are needed. After republish, the live `/blog` page will hit the correct backend and the 203 articles will render immediately.

## Steps

1. Verify `.env` in the project still points to `nfijkdoifihbgomcnbnb` (it does — confirmed in context).
2. Trigger a republish via the Publish dialog → Update.
3. Hard-refresh `https://livingwitharthritis.org.uk/blog` and confirm:
   - Network tab shows requests to `nfijkdoifihbgomcnbnb.supabase.co` (not `zrvcejlncpndjfyuvcrd`).
   - Article cards render, count badge shows "203 Articles".
4. Spot-check `/blog/foods-to-avoid-with-arthritis` to confirm individual posts load.

## If republish alone doesn't update the bundle

Fallback path (only if step 3 still shows the old URL):
- Make any trivial edit to `src/pages/BlogIndex.tsx` (e.g. a comment) to force a fresh build, then republish again.
- If the bundle still embeds `zrvcejlncpndjfyuvcrd`, reconnect Lovable Cloud (Connectors → Lovable Cloud) to force `.env` regeneration, then republish.

## What this plan does NOT change

- No SQL migrations
- No RLS policy changes
- No edits to `BlogIndex.tsx`, the data hooks, or the Supabase client
- No content changes to any blog post
