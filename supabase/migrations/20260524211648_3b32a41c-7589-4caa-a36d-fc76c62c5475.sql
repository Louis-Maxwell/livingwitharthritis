-- Tighten buddy_matches participant UPDATE: restrict status to declined/ended only.
-- Admins retain full control via "Admins manage all matches" policy.
DROP POLICY IF EXISTS "Participants can update their matches" ON public.buddy_matches;

CREATE POLICY "Participants can update their matches"
ON public.buddy_matches
FOR UPDATE
TO authenticated
USING ((auth.uid() = mentor_id) OR (auth.uid() = mentee_id))
WITH CHECK (
  ((auth.uid() = mentor_id) OR (auth.uid() = mentee_id))
  AND status = ANY (ARRAY['declined'::text, 'ended'::text])
);

-- Defense in depth: attach the existing transition-guard trigger.
DROP TRIGGER IF EXISTS buddy_matches_guard_participant_updates_trg ON public.buddy_matches;
CREATE TRIGGER buddy_matches_guard_participant_updates_trg
BEFORE UPDATE ON public.buddy_matches
FOR EACH ROW
EXECUTE FUNCTION public.buddy_matches_guard_participant_updates();