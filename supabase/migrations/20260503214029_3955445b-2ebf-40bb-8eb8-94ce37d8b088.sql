insert into storage.buckets (id, name, public) values ('exercise-videos', 'exercise-videos', true) on conflict (id) do update set public = true;
do $$ begin
  if not exists (select 1 from pg_policies where schemaname='storage' and tablename='objects' and policyname='Public read exercise videos') then
    create policy "Public read exercise videos" on storage.objects for select using (bucket_id = 'exercise-videos');
  end if;
end $$;