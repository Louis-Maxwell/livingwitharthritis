-- Remove fabricated/placeholder person names from blog_articles author and
-- reviewed_by columns. "Sarah Jennings, HCPC Registered Physiotherapist" and
-- "Dr. Amina Patel" are not real people (the latter is explicitly marked as
-- a placeholder in src/data/medical-authors.json awaiting real client-
-- provided credentials). Replace with the same generic role-based labels
-- already used elsewhere in this table for articles with no named reviewer.

UPDATE public.blog_articles
SET author = 'Living With Arthritis UK Editorial Team'
WHERE author = 'Sarah Jennings, HCPC Registered Physiotherapist';

UPDATE public.blog_articles
SET reviewed_by = 'Chartered Physiotherapist'
WHERE reviewed_by = 'Sarah Jennings, HCPC Registered Physiotherapist';

UPDATE public.blog_articles
SET reviewed_by = 'Clinical Review Board'
WHERE reviewed_by = 'Dr. Amina Patel';
