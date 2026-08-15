-- Add CHECK constraints for forum_topics table enums

ALTER TABLE public.forum_topics
  ADD CONSTRAINT check_forum_topics_status
    CHECK (status IN ('published'));

ALTER TABLE public.forum_topics
  ADD CONSTRAINT check_forum_topics_category
    CHECK (category IN ('General', 'Exercise', 'Nutrition', 'Medication', 'Emotional Support', 'Newly Diagnosed', 'Flare-Ups'));
