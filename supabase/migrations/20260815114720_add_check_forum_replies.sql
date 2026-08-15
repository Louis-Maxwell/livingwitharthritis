-- Add CHECK constraint for forum_replies status enum

ALTER TABLE public.forum_replies
  ADD CONSTRAINT check_forum_replies_status
    CHECK (status IN ('published'));
