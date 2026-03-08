-- Fix display_order for about_us_sections so they flow logically
UPDATE public.about_us_sections SET display_order = 0 WHERE title = 'Our Story';
UPDATE public.about_us_sections SET display_order = 1 WHERE title = 'The Scale of Arthritis';
UPDATE public.about_us_sections SET display_order = 2 WHERE title = 'Our Mission';
UPDATE public.about_us_sections SET display_order = 3 WHERE title = 'Our Commitment';
UPDATE public.about_us_sections SET display_order = 4 WHERE title = 'What We''ve Built';
UPDATE public.about_us_sections SET display_order = 5 WHERE title = 'Looking Ahead';