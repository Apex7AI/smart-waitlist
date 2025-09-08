-- Enable Row Level Security on waitlist_leads table
ALTER TABLE public.waitlist_leads ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert new waitlist entries (public signup)
CREATE POLICY "Anyone can join waitlist"
  ON public.waitlist_leads
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Only allow viewing/updating by system (no public read access to protect user data)
-- This ensures user privacy while allowing the system to manage leads
CREATE POLICY "No public read access to protect privacy"
  ON public.waitlist_leads
  FOR SELECT
  TO authenticated
  USING (false);