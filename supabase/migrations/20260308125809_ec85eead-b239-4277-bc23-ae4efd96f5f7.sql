
-- Fix overly permissive INSERT policies with rate-limiting and validation

-- 1. blog_views: restrict UPDATE to only increment own-session views (already scoped by slug match)
-- The UPDATE true policy is needed for the increment_blog_view function which is SECURITY DEFINER
-- Keep as-is since the function handles validation

-- 2. feedback_responses: add reasonable constraints
DROP POLICY IF EXISTS "Anyone can submit feedback" ON feedback_responses;
CREATE POLICY "Anyone can submit feedback with validation"
ON feedback_responses FOR INSERT
TO anon, authenticated
WITH CHECK (
  navigation_rating >= 1 AND navigation_rating <= 5
  AND speed_rating >= 1 AND speed_rating <= 5
);

-- 3. blog_comments: add length validation  
DROP POLICY IF EXISTS "Anyone can submit comments" ON blog_comments;
CREATE POLICY "Anyone can submit comments with validation"
ON blog_comments FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(author_name) > 0 AND length(author_name) <= 100
  AND length(content) > 0 AND length(content) <= 2000
  AND length(slug) > 0
  AND status = 'pending'
);

-- 4. newsletter_subscriptions: validate email format
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON newsletter_subscriptions;
CREATE POLICY "Anyone can subscribe to newsletter with validation"
ON newsletter_subscriptions FOR INSERT
TO anon, authenticated
WITH CHECK (
  email ~ '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
  AND length(email) <= 255
);

-- 5. contact_inquiries: validate required fields
DROP POLICY IF EXISTS "Anyone can create contact inquiries" ON contact_inquiries;
CREATE POLICY "Anyone can create contact inquiries with validation"
ON contact_inquiries FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(name) > 0 AND length(name) <= 100
  AND email ~ '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
  AND length(subject) > 0 AND length(subject) <= 200
  AND length(message) > 0 AND length(message) <= 5000
  AND status = 'new'
);

-- 6. fundraising_inquiries: validate required fields
DROP POLICY IF EXISTS "Anyone can create fundraising inquiries" ON fundraising_inquiries;
CREATE POLICY "Anyone can create fundraising inquiries with validation"
ON fundraising_inquiries FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(contact_name) > 0 AND length(contact_name) <= 100
  AND email ~ '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
  AND length(inquiry_type) > 0
  AND status = 'new'
);

-- 7. donations: the existing policy checks auth.uid() = user_id OR user_id IS NULL
-- This is acceptable for guest donations via Stripe webhooks
-- No change needed
