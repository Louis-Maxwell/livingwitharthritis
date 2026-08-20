create extension if not exists pg_cron with schema extensions;
create extension if not exists pg_net with schema extensions;

select cron.unschedule('reindex-chat-content-daily')
where exists (select 1 from cron.job where jobname = 'reindex-chat-content-daily');

select cron.schedule(
  'reindex-chat-content-daily',
  '20 3 * * *',
  $$
  select net.http_post(
    url := 'https://zrvcejlncpndjfyuvcrd.supabase.co/functions/v1/reindex-content',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-reindex-token', 'dBsC3Ukysj4xpL2gP6KUzl78IC8xJ10ryPXAuI0'
    ),
    body := jsonb_build_object('source', 'recent', 'offset', 0, 'limit', 60)
  );
  $$
);