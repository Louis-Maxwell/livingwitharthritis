
-- Create nutrition_sections table for CMS-managed nutrition content
CREATE TABLE public.nutrition_sections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  content TEXT NOT NULL,
  foods TEXT[] NOT NULL DEFAULT '{}',
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.nutrition_sections ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Anyone can view nutrition_sections"
ON public.nutrition_sections FOR SELECT USING (true);

-- Admin management
CREATE POLICY "Admins can manage nutrition_sections"
ON public.nutrition_sections FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- Timestamp trigger
CREATE TRIGGER update_nutrition_sections_updated_at
BEFORE UPDATE ON public.nutrition_sections
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed data
INSERT INTO public.nutrition_sections (title, icon_name, content, foods, display_order) VALUES
(
  'Autoimmune and Inflammatory Arthritis',
  'Fish',
  'Rheumatoid arthritis has been the primary focus of nutritional research on autoimmune inflammatory arthritides. Diets abundant in omega-3 fatty acids, antioxidants, and phytochemicals—found in fruits, vegetables, fish, olive oil, whole grains, nuts, seeds, and legumes—have been associated with reduced RA symptoms.

The Mediterranean diet, which emphasizes these foods while limiting red meats, processed items, and saturated fats, has shown promise. A 2020 meta-analysis in Nutrition Reviews reported improvements in pain, morning stiffness, physical function, and inflammatory markers. Cold-water fish (e.g., salmon, sardines, mackerel) provide omega-3s with potent anti-inflammatory effects. Extra-virgin olive oil''s compound oleocanthal inhibits pro-inflammatory enzymes similarly to ibuprofen, potentially reducing cartilage damage.

Patient surveys identify blueberries, fish, strawberries, and spinach as symptom-relieving foods, while sugary desserts and sodas exacerbate them. Green tea''s EGCG compound may block RA-related inflammation. Vegetarian, vegan, or fasting-followed-by-vegetarian approaches have demonstrated benefits in older trials. High-fiber diets lower C-reactive protein (CRP), a key inflammation marker.',
  ARRAY['Salmon & Sardines', 'Olive Oil', 'Blueberries', 'Green Tea', 'Spinach', 'Strawberries', 'Whole Grains'],
  1
),
(
  'Osteoarthritis',
  'Leaf',
  'Maintaining a healthy weight is crucial for OA, as excess pounds increase joint stress—each additional pound adds four pounds of pressure on weight-bearing joints like knees and hips. Adipose tissue also promotes systemic inflammation. Combining diet with physical activity supports weight management and symptom relief.

Vitamins D and K deficiencies correlate with greater cartilage and bone damage. Sources include fatty fish and fortified foods for vitamin D, and leafy greens for vitamin K. Higher dietary fiber intake is linked to reduced knee OA symptoms.

Saturated fats (e.g., in red meats) may accelerate OA progression, while monounsaturated and polyunsaturated fats (e.g., in fish oil and olive oil) offer protection. Polyphenol-rich fruits like blueberries, strawberries, and pomegranates exhibit antioxidant and anti-inflammatory effects. Cruciferous vegetables (e.g., broccoli) contain sulforaphane, which may inhibit inflammation and slow progression. Some evidence suggests milk, garlic, onions, and leeks associate with lesser OA advancement.

Overall, anti-inflammatory diets like Mediterranean or DASH—rich in produce and low in processed foods—appear protective against OA worsening.',
  ARRAY['Broccoli', 'Leafy Greens', 'Fatty Fish', 'Pomegranates', 'Garlic', 'Blueberries', 'Olive Oil'],
  2
),
(
  'Gout',
  'Cherry',
  'Gout has the clearest dietary ties among arthritides. Purines, broken down into uric acid, accumulate in those with impaired excretion, forming painful joint crystals.

Limiting high-purine foods is essential: red meats (beef, pork, lamb, organ meats), most seafood, meat-based gravies, fructose-sweetened drinks, and alcohol (especially beer).

Mediterranean and DASH diets lower uric acid levels and gout risk. A 2020 Arthritis & Rheumatology study found DASH particularly effective in hyperuricemic individuals. Plant-based protein emphasis further reduces uric acid.

Cherries (sweet or tart) provide anthocyanins and quercetin with antioxidant and anti-inflammatory properties, reducing flare frequency per multiple studies. Vitamin C-rich foods (citrus, peppers, broccoli) may lower uric acid. Coffee (not tea) and low-fat dairy also associate with reduced levels.',
  ARRAY['Cherries', 'Low-fat Dairy', 'Citrus Fruits', 'Coffee', 'Vitamin C Foods', 'Bell Peppers'],
  3
),
(
  'Osteoporosis',
  'Milk',
  'Nutrition supports bone density and fracture prevention. Calcium-rich foods—dairy (milk, yogurt), leafy greens, shellfish, soy products, nuts/seeds (almonds, chia)—are foundational, alongside vitamin D from fatty fish, egg yolks, mushrooms, and fortified items.

Emerging research highlights fruits, vegetables, and phytochemicals for bone rebuilding and reducing oxidative stress. Prunes stand out for vitamins K, boron, and potassium. Vitamins A, B, C, and E contribute per Framingham Osteoporosis Study data.

Diets high in fruits, vegetables, and seafood link to better bone mineral density and lower fracture risk, while excess processed fats harm bones. Mediterranean adherence—emphasizing produce, grains, seafood, and moderate wine—supports bone health.',
  ARRAY['Dairy Products', 'Prunes', 'Almonds', 'Chia Seeds', 'Egg Yolks', 'Mushrooms', 'Leafy Greens'],
  4
);
