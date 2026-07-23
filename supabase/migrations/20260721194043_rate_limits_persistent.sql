-- Persistent rate limiting store, replacing the previous in-memory Map
-- implementation (which didn't survive edge-function isolate restarts,
-- so limits could silently reset under normal serverless recycling).
--
-- Supports:
--   - Combined per-IP AND per-account limiting (two independent keys
--     checked per request: "ip:<ip>:<tier>" and "account:<id>:<tier>")
--   - Exponential backoff: repeat offenders get a growing block window
--     (base_backoff_ms * 2^consecutive_violations, capped) instead of a
--     flat hard lockout that resets identically every time.
--   - Only the service role (edge functions) can read/write this table.

create table if not exists public.rate_limits (
  key text primary key,
  window_start timestamptz not null default now(),
  count int not null default 1,
  consecutive_violations int not null default 0,
  blocked_until timestamptz,
  updated_at timestamptz not null default now()
);

alter table public.rate_limits enable row level security;

-- No public policies at all — this table is only ever touched by edge
-- functions using the service-role client, which bypasses RLS. Belt and
-- braces: explicitly deny all access to anon/authenticated roles.
drop policy if exists "no public access" on public.rate_limits;
create policy "no public access" on public.rate_limits
  for all
  using (false);

-- Index to make the periodic cleanup (delete old/expired rows) cheap.
create index if not exists rate_limits_updated_at_idx
  on public.rate_limits (updated_at);
