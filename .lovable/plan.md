# Fix: Visitors see no articles on livingwitharthritis.org.uk/blog

## Root cause (confirmed, not a code bug)

The live site at `https://livingwitharthritis.org.uk` is talking to an **old, empty backend**.

- Live bundle calls: `https://zrvcejlncpndjfyuvcrd.supabase.co` → returns `[]`
- Current backend (where all 203 published articles actually live): `https://nfijkdoifihbgomcnbnb.supabase.co`
- Project `.env` already points at the correct backend
- `BlogIndex.tsx`, the data hooks, and the RLS policy ("Anyone can view published blog articles") are all correct
- A database check confirms 203 published / 204 total articles exist and are readable with the project's anon key

So the code, data, and permissions are all fine. The **published JavaScript bundle is stale** — it was built before the backend switch and has the old Supabase URL/key baked in. Until we rebuild and republish, every visitor's browser will keep asking the wrong server and seeing zero articles.

## The fix

**Republish the site.** That is the entire fix. Republishing rebuilds the production bundle against the current `.env`, so the new bundle will hit `nfijkdoifihbgomcnbnb` and the 203 articles will render immediately for every visitor.

No code changes. No database changes. No content changes. No RLS changes.

## Steps

1. Switch to build mode and click **Publish → Update** (I will trigger this via the publish tool).
2. Wait ~1 minute for the deploy to roll out.
3. Hard-refresh `https://livingwitharthritis.org.uk/blog` (Ctrl/Cmd+Shift+R) to bypass any cached old bundle.
4. Verify:
   - Article cards render and the count badge shows "203 Articles".
   - Browser Network tab shows requests going to `nfijkdoifihbgomcnbnb.supabase.co` (not `zrvcejlncpndjfyuvcrd`).
   - Open one post (e.g. `/blog/foods-to-avoid-with-arthritis`) to confirm individual articles load.

## Fallback (only if step 4 still shows the old URL)

If for some reason the new bundle still embeds the old Supabase URL after republish:

- Make a trivial edit to `src/pages/BlogIndex.tsx` (e.g. add a comment) to force Vite to produce a fresh chunk hash, then republish again.
- If that still fails, reconnect Lovable Cloud (Connectors → Lovable Cloud) to regenerate `.env`, then republish.

## What this plan deliberately does NOT do

- Does **not** add 700 articles, 5 pillar pages, or any of the 5,000-keyword expansion work. That is a separate, much larger workstream and is unrelated to why visitors currently see nothing. Adding more content to an unpublished/stale bundle would not appear to visitors either — fixing the publish pipeline must come first.
- Does **not** touch RLS, schema, edge functions, or the Supabase client file.

## Approve to proceed

Approve this plan and I will switch to build mode and trigger the republish immediately.