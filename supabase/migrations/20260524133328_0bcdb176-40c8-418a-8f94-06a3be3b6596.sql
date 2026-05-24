CREATE OR REPLACE FUNCTION public.buddy_matches_guard_participant_updates()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  IF public.is_admin() THEN
    RETURN NEW;
  END IF;

  IF NEW.mentor_id IS DISTINCT FROM OLD.mentor_id
     OR NEW.mentee_id IS DISTINCT FROM OLD.mentee_id
     OR NEW.compatibility_score IS DISTINCT FROM OLD.compatibility_score
     OR NEW.compatibility_breakdown IS DISTINCT FROM OLD.compatibility_breakdown
     OR NEW.created_at IS DISTINCT FROM OLD.created_at THEN
    RAISE EXCEPTION 'Participants cannot modify protected match fields';
  END IF;

  IF NEW.status IS DISTINCT FROM OLD.status THEN
    -- Only admins can activate from pending or mark completed
    IF NEW.status = 'active' AND OLD.status = 'pending' THEN
      RAISE EXCEPTION 'Only admins may activate a pending match';
    END IF;
    IF NEW.status = 'completed' THEN
      RAISE EXCEPTION 'Only admins may mark a match completed';
    END IF;

    -- Role-restricted transitions
    IF auth.uid() = OLD.mentor_id THEN
      -- Mentor: accept (pending->active is admin-only above), decline pending, end active
      IF NOT (
        (OLD.status = 'pending' AND NEW.status = 'declined')
        OR (OLD.status = 'active'  AND NEW.status = 'ended')
        OR (OLD.status = 'active'  AND NEW.status = 'declined')
      ) THEN
        RAISE EXCEPTION 'Invalid status transition for mentor: % -> %', OLD.status, NEW.status;
      END IF;
    ELSIF auth.uid() = OLD.mentee_id THEN
      -- Mentee: can decline pending or end an active match
      IF NOT (
        (OLD.status = 'pending' AND NEW.status = 'declined')
        OR (OLD.status = 'active'  AND NEW.status = 'ended')
      ) THEN
        RAISE EXCEPTION 'Invalid status transition for mentee: % -> %', OLD.status, NEW.status;
      END IF;
    ELSE
      RAISE EXCEPTION 'Not a participant of this match';
    END IF;
  END IF;

  RETURN NEW;
END;
$function$;