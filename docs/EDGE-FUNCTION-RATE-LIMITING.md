# Rate limiting for Supabase edge functions — ready-to-paste pattern

## Honest status
I could not read your deployed edge function code from this workspace
(paginated file listing didn't reach supabase/functions/ within token
budget), so rate limiting on your chat / donation / email endpoints is
UNVERIFIED, not confirmed-missing. What IS confirmed from the Lovable
security agent's earlier scan: chat_feedback INSERT has DB-level length
caps, and its scan reported "Remaining: 0 issues".

## The pattern to apply to every edge function
Supabase edge functions (Deno) — a simple fixed-window limiter using a
Postgres table. No external service needed.

### 1. One-time SQL (run in Supabase SQL editor)
```sql
create table if not exists public.rate_limits (
  key text primary key,          -- e.g. 'chat:203.0.113.7'
  window_start timestamptz not null default now(),
  count int not null default 1
);
alter table public.rate_limits enable row level security;
-- No public policies: only the service role (edge functions) touches it.
```

### 2. Helper for the edge function (paste near the top)
```ts
// rateLimit.ts — fixed window: max N requests per windowSeconds per key
export async function rateLimit(
  supabaseAdmin: any, key: string, max = 20, windowSeconds = 60
): Promise<boolean> {
  const { data } = await supabaseAdmin
    .from("rate_limits").select("window_start,count").eq("key", key).maybeSingle();
  const now = Date.now();
  if (!data || now - new Date(data.window_start).getTime() > windowSeconds * 1000) {
    await supabaseAdmin.from("rate_limits")
      .upsert({ key, window_start: new Date().toISOString(), count: 1 });
    return true;
  }
  if (data.count >= max) return false;
  await supabaseAdmin.from("rate_limits")
    .update({ count: data.count + 1 }).eq("key", key);
  return true;
}
```

### 3. Use it at the top of each function handler
```ts
const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
const ok = await rateLimit(supabaseAdmin, `chat:${ip}`, 20, 60); // 20 req/min
if (!ok) {
  return new Response(JSON.stringify({ error: "Too many requests. Please slow down." }),
    { status: 429, headers: { "Content-Type": "application/json", "Retry-After": "60" } });
}
```

Suggested limits: chat 20/min, email signup 5/min, feedback 10/min,
donation-adjacent endpoints 10/min (Stripe has its own fraud controls).

### How to apply without Lovable credits
Edge functions live in `supabase/functions/<name>/index.ts` in the synced
GitHub repo — edit them via GitHub web editor, commit, and Lovable syncs.
Verify each function name in the Supabase dashboard → Edge Functions.
