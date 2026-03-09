
-- Create pain journal entries table
CREATE TABLE public.pain_journal_entries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  entry_date DATE NOT NULL DEFAULT CURRENT_DATE,
  pain_level INTEGER NOT NULL CHECK (pain_level >= 0 AND pain_level <= 10),
  joints_affected TEXT[] NOT NULL DEFAULT '{}',
  stiffness_duration INTEGER DEFAULT 0,
  mood TEXT DEFAULT 'neutral',
  activities TEXT DEFAULT '',
  medications TEXT DEFAULT '',
  triggers TEXT DEFAULT '',
  notes TEXT DEFAULT '',
  sleep_quality INTEGER CHECK (sleep_quality IS NULL OR (sleep_quality >= 1 AND sleep_quality <= 5)),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.pain_journal_entries ENABLE ROW LEVEL SECURITY;

-- Users can only CRUD their own entries
CREATE POLICY "Users can view own journal entries"
  ON public.pain_journal_entries FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own journal entries"
  ON public.pain_journal_entries FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own journal entries"
  ON public.pain_journal_entries FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own journal entries"
  ON public.pain_journal_entries FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Updated_at trigger
CREATE TRIGGER update_pain_journal_updated_at
  BEFORE UPDATE ON public.pain_journal_entries
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
