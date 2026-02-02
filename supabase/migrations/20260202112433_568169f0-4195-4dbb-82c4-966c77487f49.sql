-- Phase 1: Fix Critical RLS Policy Issues

-- 1. Fix appointments SELECT policy - remove public NULL exposure
DROP POLICY IF EXISTS "Users can view their own appointments" ON appointments;
CREATE POLICY "Users can view their own appointments" ON appointments
  FOR SELECT USING (auth.uid() = user_id);

-- Add admin management for appointments
CREATE POLICY "Admins can manage appointments" ON appointments
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- 2. Fix donations SELECT policy - remove public NULL exposure
DROP POLICY IF EXISTS "Users can view their own donations" ON donations;
CREATE POLICY "Users can view their own donations" ON donations
  FOR SELECT USING (auth.uid() = user_id);

-- Add admin UPDATE policy for donations (for webhooks/status updates)
CREATE POLICY "Admins can update donations" ON donations
  FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));

-- 3. Add admin access to contact_inquiries
CREATE POLICY "Admins can view contact inquiries" ON contact_inquiries
  FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update contact inquiries" ON contact_inquiries
  FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));

-- 4. Add admin access to fundraising_inquiries
CREATE POLICY "Admins can view fundraising inquiries" ON fundraising_inquiries
  FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update fundraising inquiries" ON fundraising_inquiries
  FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));