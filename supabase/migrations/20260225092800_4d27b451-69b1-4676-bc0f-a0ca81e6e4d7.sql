-- 1. Fix donations INSERT policy: restrict user_id to authenticated user
DROP POLICY IF EXISTS "Authenticated users can create donations" ON public.donations;
CREATE POLICY "Authenticated users can create own donations"
ON public.donations
FOR INSERT
WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- 2. Add composite index for chat_messages RLS performance
CREATE INDEX IF NOT EXISTS idx_chat_conversations_user_id_id
ON public.chat_conversations(user_id, id);

-- 3. Add index for appointments date lookups (double-booking prevention)
CREATE INDEX IF NOT EXISTS idx_appointments_date_time_status
ON public.appointments(preferred_date, preferred_time, status);