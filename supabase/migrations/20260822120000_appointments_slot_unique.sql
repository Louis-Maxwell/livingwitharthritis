-- Enforce one active booking per slot at the database level.
--
-- book-appointment checked for an existing booking and then inserted, so two
-- concurrent requests for the same slot could both pass the check and both
-- insert, double-booking a single clinic appointment. Cancelled bookings are
-- excluded so a released slot can be rebooked.
--
-- Any pre-existing duplicates must be resolved before this index can be
-- created; the DO block reports them instead of failing silently.
DO $$
DECLARE
  duplicate_count integer;
BEGIN
  SELECT count(*) INTO duplicate_count
  FROM (
    SELECT preferred_date, preferred_time
    FROM public.appointments
    WHERE status <> 'cancelled'
    GROUP BY preferred_date, preferred_time
    HAVING count(*) > 1
  ) AS duplicates;

  IF duplicate_count > 0 THEN
    RAISE EXCEPTION
      'Cannot add appointment slot uniqueness: % slot(s) already have multiple active bookings. Cancel the surplus bookings first.',
      duplicate_count;
  END IF;
END
$$;

CREATE UNIQUE INDEX IF NOT EXISTS uq_appointments_active_slot
  ON public.appointments (preferred_date, preferred_time)
  WHERE status <> 'cancelled';
