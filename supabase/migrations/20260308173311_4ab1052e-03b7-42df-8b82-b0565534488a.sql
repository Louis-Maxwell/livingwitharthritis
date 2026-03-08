
-- Update services with richer, Arthritis Foundation-inspired descriptions
UPDATE public.services SET 
  title = 'Virtual Physiotherapy',
  description = 'Access NHS-aligned physiotherapy from home. Our HCPC-registered programmes target joint pain, stiffness and mobility — personalised to your condition and delivered through guided exercises you can do at your own pace.'
WHERE icon_name = 'Users' OR title ILIKE '%physio%' OR display_order = 0;

UPDATE public.services SET 
  title = 'AI Health Assistant',
  description = 'Get instant, evidence-based answers to your arthritis questions 24/7. Our AI assistant draws from clinical guidelines, NICE pathways and peer-reviewed research to help you understand your condition and manage symptoms.'
WHERE icon_name = 'MessageCircle' OR title ILIKE '%chat%' OR title ILIKE '%AI%';

UPDATE public.services SET 
  title = 'Nutrition & Diet Plans',
  description = 'Discover how the Mediterranean diet can reduce inflammation and ease joint pain. Access weekly meal plans, anti-inflammatory recipes and expert guidance on omega-3s, turmeric and foods that fight arthritis.'
WHERE icon_name = 'BookOpen' OR title ILIKE '%nutrition%' OR title ILIKE '%diet%';

UPDATE public.services SET 
  title = 'Clinical Guidance',
  description = 'Navigate your arthritis journey with confidence. From understanding your diagnosis to exploring treatment options, we provide clear, NHS-aligned information reviewed by rheumatology specialists.'
WHERE icon_name = 'Stethoscope' OR title ILIKE '%clinical%' OR title ILIKE '%guidance%';

UPDATE public.services SET 
  title = 'Appointment Booking',
  description = 'Book a free virtual consultation with our clinical team. Whether you need exercise guidance, dietary advice or help understanding your diagnosis, we are here to support you — no referral needed.'
WHERE icon_name = 'Calendar' OR title ILIKE '%appointment%' OR title ILIKE '%booking%';

UPDATE public.services SET 
  title = 'Community & Support',
  description = 'You are not alone. Connect with thousands of people across the UK who understand what living with arthritis really means. Share experiences, find encouragement and build lasting connections.'
WHERE icon_name = 'HeartHandshake' OR title ILIKE '%community%' OR title ILIKE '%support%';

-- Update about_us_sections with empowering, AF-inspired content
UPDATE public.about_us_sections SET 
  content = 'Arthritis is the UK''s leading cause of pain and disability, affecting over 10 million people — yet it remains widely misunderstood. Living With Arthritis was founded to change that. We believe every person living with joint pain deserves world-class support, clear information and a community that truly understands. Our story began with a simple question: why should expert arthritis care be limited by geography, income or waiting lists?'
WHERE title = 'Our Story';

UPDATE public.about_us_sections SET 
  content = 'Arthritis isn''t a single condition — it''s a complex family of over 100 distinct types, from osteoarthritis and rheumatoid arthritis to gout, psoriatic arthritis and fibromyalgia. Together, these conditions affect more than 30 million people globally. In the UK alone, one in six adults lives with some form of arthritis, and rates are rising. The scale demands bold action — and that''s exactly what we deliver.'
WHERE title = 'The Scale of Arthritis';

UPDATE public.about_us_sections SET 
  content = 'We exist to transform how arthritis is understood, managed and treated. Through evidence-based virtual physiotherapy, personalised nutrition science, AI-powered health guidance and unwavering community support, we empower people to take control of their condition. Our mission is clear: make expert arthritis care accessible to everyone, everywhere — completely free.'
WHERE title = 'Our Mission';

UPDATE public.about_us_sections SET 
  content = 'Every piece of content on this platform is clinically reviewed by HCPC-registered physiotherapists, aligned with NICE guidelines and grounded in peer-reviewed research. We never compromise on accuracy. Our commitment to evidence-based care means you can trust every exercise programme, dietary recommendation and health resource we provide — the same standard of care you''d expect from the NHS.'
WHERE title = 'Our Commitment';

UPDATE public.about_us_sections SET 
  content = 'We have built a comprehensive digital health platform that combines virtual physiotherapy, anti-inflammatory nutrition programmes, an AI health assistant, joint-specific exercise libraries and the UK''s most complete arthritis resource directory. With over 40 expert blog articles, interactive self-help tools and a supportive community, we are creating the arthritis support system the UK has always needed.'
WHERE title ILIKE '%built%';

UPDATE public.about_us_sections SET 
  content = 'We are just getting started. Our roadmap includes expanded condition-specific programmes, partnerships with NHS trusts, a mobile companion app, multilingual support and pioneering research collaborations. With your support — whether through donations, volunteering or simply sharing our resources — we can reach every person in the UK who needs us. Together, we are champions of living well with arthritis.'
WHERE title ILIKE '%ahead%' OR title ILIKE '%future%';

-- Update statistics with more impactful numbers
UPDATE public.statistics SET number_value = '10M+', label = 'People with arthritis in the UK' WHERE display_order = 0;
UPDATE public.statistics SET number_value = '100+', label = 'Types of arthritis covered' WHERE display_order = 1;
UPDATE public.statistics SET number_value = '15,000+', label = 'Lives improved so far' WHERE display_order = 2;
UPDATE public.statistics SET number_value = '40+', label = 'Expert articles published' WHERE display_order = 3;
