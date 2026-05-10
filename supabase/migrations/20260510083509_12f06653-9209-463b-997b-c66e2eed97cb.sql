
-- =============================================================
-- 1. TRIAGE ASSESSMENTS
-- =============================================================
CREATE TABLE public.triage_assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  arthritis_type text NOT NULL,
  pain_level smallint NOT NULL CHECK (pain_level BETWEEN 0 AND 10),
  affected_areas text[] NOT NULL DEFAULT '{}',
  limitations text[] NOT NULL DEFAULT '{}',
  goals text[] NOT NULL DEFAULT '{}',
  mobility_level text NOT NULL CHECK (mobility_level IN ('high','moderate','low')),
  triage_score smallint NOT NULL CHECK (triage_score BETWEEN 0 AND 100),
  recommendations jsonb NOT NULL DEFAULT '{}'::jsonb,
  valid_until timestamptz NOT NULL DEFAULT (now() + interval '90 days'),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.triage_assessments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own triage" ON public.triage_assessments
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own triage" ON public.triage_assessments
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own triage" ON public.triage_assessments
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own triage" ON public.triage_assessments
  FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all triage" ON public.triage_assessments
  FOR SELECT TO authenticated USING (is_admin());

CREATE INDEX idx_triage_user ON public.triage_assessments(user_id, created_at DESC);

CREATE TRIGGER triage_set_updated
  BEFORE UPDATE ON public.triage_assessments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =============================================================
-- 2. BUDDY PROFILES
-- =============================================================
CREATE TABLE public.buddy_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  role text NOT NULL CHECK (role IN ('mentor','mentee')),
  arthritis_type text NOT NULL,
  location_region text NOT NULL,
  mobility_level text NOT NULL CHECK (mobility_level IN ('high','moderate','low')),
  age_band text NOT NULL CHECK (age_band IN ('18-29','30-44','45-59','60-74','75+')),
  bio text,
  available boolean NOT NULL DEFAULT true,
  max_mentees smallint NOT NULL DEFAULT 2 CHECK (max_mentees BETWEEN 1 AND 5),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.buddy_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone signed in can view available mentor profiles"
  ON public.buddy_profiles FOR SELECT TO authenticated
  USING (available = true AND role = 'mentor');
CREATE POLICY "Users can view own buddy profile"
  ON public.buddy_profiles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own buddy profile"
  ON public.buddy_profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own buddy profile"
  ON public.buddy_profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own buddy profile"
  ON public.buddy_profiles FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins manage buddy profiles"
  ON public.buddy_profiles FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

CREATE TRIGGER buddy_profile_set_updated
  BEFORE UPDATE ON public.buddy_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =============================================================
-- 3. BUDDY MATCHES
-- =============================================================
CREATE TABLE public.buddy_matches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mentor_id uuid NOT NULL,
  mentee_id uuid NOT NULL,
  status text NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending','active','completed','cancelled')),
  compatibility_score smallint NOT NULL CHECK (compatibility_score BETWEEN 0 AND 100),
  compatibility_breakdown jsonb NOT NULL DEFAULT '{}'::jsonb,
  message_count integer NOT NULL DEFAULT 0,
  last_check_in timestamptz,
  feedback jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (mentor_id, mentee_id)
);

ALTER TABLE public.buddy_matches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Participants can view their matches"
  ON public.buddy_matches FOR SELECT TO authenticated
  USING (auth.uid() = mentor_id OR auth.uid() = mentee_id);
CREATE POLICY "Mentees can request matches"
  ON public.buddy_matches FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = mentee_id AND status = 'pending');
CREATE POLICY "Participants can update their matches"
  ON public.buddy_matches FOR UPDATE TO authenticated
  USING (auth.uid() = mentor_id OR auth.uid() = mentee_id);
CREATE POLICY "Admins manage all matches"
  ON public.buddy_matches FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

CREATE INDEX idx_buddy_matches_mentor ON public.buddy_matches(mentor_id, status);
CREATE INDEX idx_buddy_matches_mentee ON public.buddy_matches(mentee_id, status);

CREATE TRIGGER buddy_match_set_updated
  BEFORE UPDATE ON public.buddy_matches
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =============================================================
-- 4. NEWSLETTER UPGRADE
-- =============================================================
ALTER TABLE public.newsletter_subscriptions
  ADD COLUMN IF NOT EXISTS confirmed_at timestamptz,
  ADD COLUMN IF NOT EXISTS confirmation_token text UNIQUE,
  ADD COLUMN IF NOT EXISTS unsubscribe_token text UNIQUE,
  ADD COLUMN IF NOT EXISTS frequency text NOT NULL DEFAULT 'monthly'
    CHECK (frequency IN ('weekly','biweekly','monthly')),
  ADD COLUMN IF NOT EXISTS categories text[] NOT NULL DEFAULT '{}';

-- Allow lookups by token (read by service role only — already covered by SELECT admin policy)
CREATE POLICY "Anyone can confirm or manage with token"
  ON public.newsletter_subscriptions FOR UPDATE TO anon, authenticated
  USING (confirmation_token IS NOT NULL OR unsubscribe_token IS NOT NULL)
  WITH CHECK (true);

-- =============================================================
-- 5. PROFILE EXTENSION
-- =============================================================
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS arthritis_type text,
  ADD COLUMN IF NOT EXISTS pain_level smallint CHECK (pain_level IS NULL OR pain_level BETWEEN 0 AND 10),
  ADD COLUMN IF NOT EXISTS mobility_level text
    CHECK (mobility_level IS NULL OR mobility_level IN ('high','moderate','low')),
  ADD COLUMN IF NOT EXISTS location_region text;
