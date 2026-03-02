
-- Add image_url column to conditions table
ALTER TABLE public.conditions ADD COLUMN image_url text;

-- Populate with condition data
INSERT INTO public.conditions (title, description, category, color, display_order, image_url) VALUES
('Osteoarthritis', 'The most common form of arthritis — a degenerative joint disease where protective cartilage wears down, causing pain, stiffness, and reduced mobility in knees, hips, hands and spine.', 'Degenerative', 'bg-emerald-600', 1, '/images/condition-osteoarthritis.jpg'),
('Rheumatoid Arthritis', 'A chronic autoimmune condition where the immune system attacks joint linings, causing symmetrical inflammation, prolonged morning stiffness, fatigue, and potential organ involvement.', 'Autoimmune', 'bg-blue-600', 2, '/images/condition-rheumatoid.jpg'),
('Psoriatic Arthritis', 'An inflammatory condition combining joint pain with psoriasis skin symptoms — including dactylitis, enthesitis, and nail changes — affecting up to 30% of psoriasis patients.', 'Inflammatory', 'bg-purple-600', 3, '/images/condition-psoriatic.jpg'),
('Gout', 'A form of inflammatory arthritis caused by uric acid crystal deposits in joints, leading to sudden, severe episodes of pain, swelling and redness — most commonly in the big toe.', 'Crystal', 'bg-red-600', 4, NULL),
('Ankylosing Spondylitis', 'A chronic inflammatory condition primarily affecting the spine and sacroiliac joints, causing pain, stiffness, and potentially fusion of vertebrae over time.', 'Inflammatory', 'bg-amber-600', 5, NULL),
('Fibromyalgia', 'A chronic condition characterised by widespread musculoskeletal pain, fatigue, sleep disturbances, and cognitive difficulties — often co-occurring with arthritis.', 'Chronic Pain', 'bg-pink-600', 6, NULL);
