
-- Create a table for nutrition food gallery images (the visual anti-inflammatory food cards)
CREATE TABLE public.nutrition_food_gallery (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.nutrition_food_gallery ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Anyone can view nutrition_food_gallery"
ON public.nutrition_food_gallery
FOR SELECT
USING (true);

-- Admin management
CREATE POLICY "Admins can manage nutrition_food_gallery"
ON public.nutrition_food_gallery
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Timestamp trigger
CREATE TRIGGER update_nutrition_food_gallery_updated_at
BEFORE UPDATE ON public.nutrition_food_gallery
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert the 5 food gallery items from the PDF
INSERT INTO public.nutrition_food_gallery (title, description, image_url, display_order) VALUES
('Cast-Iron Salmon & Baby Kale Salad', 'Omega-3 rich fatty fish paired with antioxidant-packed baby kale greens to help ease joint inflammation. A perfect example of anti-inflammatory eating.', '/images/nutrition-salmon-kale.jpg', 1),
('Grilled Mackerel — The Small Guys', 'Small oily fish like mackerel are packed with anti-inflammatory omega-3 fatty acids. Aim for 2–3 servings of oily fish per week for optimal joint support.', '/images/nutrition-grilled-mackerel.jpg', 2),
('Mediterranean-Style Food Assortment', 'Salmon, olive oil, fruits, vegetables, nuts and more — perfectly illustrating the gold-standard anti-inflammatory eating pattern recommended for arthritis.', '/images/nutrition-mediterranean.jpg', 3),
('Mixed Berries Bowl', 'Blueberries, raspberries, and blackberries provide powerful antioxidants (anthocyanins) that combat oxidative stress linked to osteoarthritis symptoms.', '/images/nutrition-berries.jpg', 4),
('Nuts & Seeds for Joint Health', 'Walnuts, almonds, chia seeds, flaxseeds, and pistachios offer healthy fats and plant-based omega-3s that help reduce systemic inflammation.', '/images/nutrition-nuts-seeds.jpg', 5);
