-- Add CHECK constraints for appointments table enums

ALTER TABLE public.appointments
  ADD CONSTRAINT check_appointment_status
    CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed'));

ALTER TABLE public.appointments
  ADD CONSTRAINT check_appointment_type
    CHECK (appointment_type IN ('consultation', 'physiotherapy', 'follow-up', 'assessment', 'treatment'));
