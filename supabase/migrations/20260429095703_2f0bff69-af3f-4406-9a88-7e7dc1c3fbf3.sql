insert into storage.buckets (id, name, public)
values ('lighthouse-reports', 'lighthouse-reports', true)
on conflict (id) do nothing;

create policy "Public read lighthouse reports"
on storage.objects for select
using (bucket_id = 'lighthouse-reports');

create policy "Service role write lighthouse reports"
on storage.objects for insert
to service_role
with check (bucket_id = 'lighthouse-reports');