-- Add CHECK constraint for blog_comments status enum

ALTER TABLE public.blog_comments
  ADD CONSTRAINT check_blog_comments_status
    CHECK (status IN ('pending', 'approved', 'rejected'));
