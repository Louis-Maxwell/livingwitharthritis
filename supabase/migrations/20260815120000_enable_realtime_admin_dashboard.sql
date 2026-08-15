-- Enable Realtime for blog_comments and donations so the admin dashboard's
-- postgres_changes subscriptions (src/pages/AdminDashboard.tsx, channels
-- 'admin-comments' and 'admin-donations') actually receive events. Without
-- being added to the supabase_realtime publication, Supabase never emits
-- change events for a table regardless of client-side subscription code —
-- these live admin notifications have never fired.
ALTER PUBLICATION supabase_realtime ADD TABLE public.blog_comments;
ALTER PUBLICATION supabase_realtime ADD TABLE public.donations;
