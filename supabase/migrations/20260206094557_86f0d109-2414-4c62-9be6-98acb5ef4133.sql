
-- Create healthy_living_resources table
CREATE TABLE public.healthy_living_resources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'general',
  external_url TEXT,
  image_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.healthy_living_resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view healthy_living_resources"
ON public.healthy_living_resources FOR SELECT USING (true);

CREATE POLICY "Admins can manage healthy_living_resources"
ON public.healthy_living_resources FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_healthy_living_resources_updated_at
BEFORE UPDATE ON public.healthy_living_resources
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed with Arthritis Foundation healthy living resources
INSERT INTO public.healthy_living_resources (title, description, category, external_url, display_order) VALUES
('The Ultimate Arthritis Diet', 'Learn which foods from the Mediterranean diet can help fight inflammation caused by arthritis.', 'Nutrition', 'https://www.arthritis.org/health-wellness/healthy-living/nutrition/anti-inflammatory/the-ultimate-arthritis-diet', 1),
('Fitness Solutions: Balance, Flexibility & Therapeutic Exercises', 'Learn how to incorporate therapeutic exercises and other mindful movements like yoga and tai chi for better flexibility and balance.', 'Physical Activity', 'https://www.arthritis.org/health-wellness/healthy-living/physical-activity/yoga/fitness-solutions-balance-flexibility-and-therapy', 2),
('Your Exercise Solution', 'A resource to help you create a physical activity routine — based on your ability level — with modifications developed and approved by physical therapists.', 'Physical Activity', 'https://www.arthritis.org/health-wellness/healthy-living/physical-activity/getting-started/your-exercise-solution', 3),
('Causes of Fatigue in Arthritis', 'Learn how inflammatory disease and other factors work together to cause your extreme tiredness.', 'Managing Pain', 'https://www.arthritis.org/health-wellness/healthy-living/managing-pain/fatigue-sleep/causes-of-fatigue-in-arthritis', 4),
('Eat Right for Your Type of Arthritis', 'Get details on diets that may help ease inflammation and provide the nutrients you need for your type of arthritis.', 'Nutrition', 'https://www.arthritis.org/health-wellness/healthy-living/nutrition/healthy-eating/eat-right-for-your-type-of-arthritis', 5),
('16 Joint-Protection Tips', 'Protect your joints with these 16 self-care tips for daily living.', 'Daily Living', 'https://www.arthritis.org/health-wellness/healthy-living/managing-pain/joint-protection/16-joint-protection-tips', 6),
('Arthritis and Mental Health', 'Learn about the connection between arthritis, depression and anxiety and how these conditions can make your arthritis worse.', 'Emotional Well-Being', 'https://www.arthritis.org/health-wellness/healthy-living/emotional-well-being/anxiety-depression/arthritis-and-mental-health', 7),
('Adapting Your House When You Have Arthritis', 'Adapt your home to make it easier on your joints and arthritis-friendly.', 'Daily Living', 'https://www.arthritis.org/health-wellness/healthy-living/daily-living/life-hacks-tips/adapting-your-house', 8),
('How to Tell People You Have Arthritis', 'Use these tips to easily tell friends and family about your arthritis.', 'Family & Relationships', 'https://www.arthritis.org/health-wellness/healthy-living/family-relationships/relationships/how-to-tell-people-you-have-arthritis', 9),
('The Emotion Pain Connection', 'Learn to break the cycle of chronic pain and negative emotions.', 'Emotional Well-Being', 'https://www.arthritis.org/health-wellness/healthy-living/emotional-well-being/emotional-self-care/the-emotion-pain-connection', 10),
('Sleep & Fatigue Strategies for Arthritis', 'Sleep and pain management experts share proven strategies to help combat fatigue and poor sleep quality with arthritis.', 'Managing Pain', 'https://www.arthritis.org/health-wellness/healthy-living/managing-pain/fatigue-sleep/webinar-sleep-and-fatigue-strategies-for-arthritis', 11),
('Walk With Ease', 'The Arthritis Foundation''s Walk With Ease program has been proven to reduce arthritis pain and other symptoms.', 'Physical Activity', 'https://www.arthritis.org/health-wellness/healthy-living/physical-activity/walking/walk-with-ease', 12),
('11 Tips for Eating Right to Support Your Joints', 'Small changes to your eating habits can make a huge impact on your health and well-being. Use these simple tips to make healthy eating choices.', 'Nutrition', 'https://www.arthritis.org/health-wellness/healthy-living/managing-pain/joint-protection/11-tips-for-eating-right-to-support-your-joints', 13);
