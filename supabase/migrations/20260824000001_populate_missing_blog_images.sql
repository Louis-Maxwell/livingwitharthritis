-- Populate missing blog article images
-- Assigns image URLs based on article condition/topic/slug patterns
-- This backfills ~123 articles with null image_url since May 2026

-- Image URL mapping by condition/topic
-- Using Unsplash URLs with consistent dimensions (1200x630 OG size)

UPDATE public.blog_articles
SET
  image_url = CASE
    -- Osteoarthritis articles
    WHEN slug ILIKE '%osteo%' OR slug ILIKE '%knee%' OR slug ILIKE '%hip%' OR slug ILIKE '%hand%'
    THEN 'https://images.unsplash.com/photo-1576091160399-1122a727ff0f?w=1200&h=630&fit=crop'

    -- Rheumatoid Arthritis
    WHEN slug ILIKE '%rheumatoid%' OR slug ILIKE '%inflammatory%'
    THEN 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=630&fit=crop'

    -- Exercise & Physiotherapy
    WHEN slug ILIKE '%exercise%' OR slug ILIKE '%physio%' OR slug ILIKE '%movement%' OR slug ILIKE '%yoga%'
    THEN 'https://images.unsplash.com/photo-1552821081-6de9ad11ac67?w=1200&h=630&fit=crop'

    -- Diet & Nutrition
    WHEN slug ILIKE '%diet%' OR slug ILIKE '%food%' OR slug ILIKE '%nutrition%' OR slug ILIKE '%mediterranean%' OR slug ILIKE '%anti-inflammatory%'
    THEN 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&h=630&fit=crop'

    -- Pain Management
    WHEN slug ILIKE '%pain%' OR slug ILIKE '%relief%' OR slug ILIKE '%management%'
    THEN 'https://images.unsplash.com/photo-1631217588745-cb048b13e64f?w=1200&h=630&fit=crop'

    -- Medications & Treatments
    WHEN slug ILIKE '%medication%' OR slug ILIKE '%drug%' OR slug ILIKE '%treatment%' OR slug ILIKE '%steroid%' OR slug ILIKE '%dmard%'
    THEN 'https://images.unsplash.com/photo-1550355291-bbee04a57e38?w=1200&h=630&fit=crop'

    -- Gout
    WHEN slug ILIKE '%gout%'
    THEN 'https://images.unsplash.com/photo-1536064482df-5e66e72a2e98?w=1200&h=630&fit=crop'

    -- Fibromyalgia
    WHEN slug ILIKE '%fibromyalgia%'
    THEN 'https://images.unsplash.com/photo-1526226613575-f3f5c442d8d2?w=1200&h=630&fit=crop'

    -- Lupus & Autoimmune
    WHEN slug ILIKE '%lupus%' OR slug ILIKE '%autoimmune%'
    THEN 'https://images.unsplash.com/photo-1517021923965-0b14c5a9a0f7?w=1200&h=630&fit=crop'

    -- Mental Health & Wellbeing
    WHEN slug ILIKE '%mental%' OR slug ILIKE '%wellbeing%' OR slug ILIKE '%mood%' OR slug ILIKE '%sleep%'
    THEN 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&h=630&fit=crop'

    -- Work & Employment
    WHEN slug ILIKE '%work%' OR slug ILIKE '%employment%' OR slug ILIKE '%disability%'
    THEN 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=630&fit=crop'

    -- Support & Community
    WHEN slug ILIKE '%support%' OR slug ILIKE '%community%' OR slug ILIKE '%help%'
    THEN 'https://images.unsplash.com/photo-1517457373614-b7152f800fd1?w=1200&h=630&fit=crop'

    -- Benefits & Financial Support
    WHEN slug ILIKE '%benefit%' OR slug ILIKE '%pip%' OR slug ILIKE '%financial%' OR slug ILIKE '%insurance%'
    THEN 'https://images.unsplash.com/photo-1552821081-6de9ad11ac67?w=1200&h=630&fit=crop'

    -- Newly Diagnosed / Getting Started
    WHEN slug ILIKE '%newly%' OR slug ILIKE '%diagnosed%' OR slug ILIKE '%getting%started%' OR slug ILIKE '%beginner%'
    THEN 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1200&h=630&fit=crop'

    -- Default fallback: general arthritis hero image
    ELSE 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=630&fit=crop'
  END,
  updated_at = now()
WHERE
  image_url IS NULL
  AND is_published = true
  AND slug IS NOT NULL;

-- Log the update
DO $$
DECLARE
  v_count INT;
BEGIN
  SELECT COUNT(*) INTO v_count
  FROM public.blog_articles
  WHERE image_url IS NOT NULL
    AND updated_at > NOW() - INTERVAL '1 minute';

  RAISE NOTICE 'Updated % blog articles with missing images', v_count;
END $$;
