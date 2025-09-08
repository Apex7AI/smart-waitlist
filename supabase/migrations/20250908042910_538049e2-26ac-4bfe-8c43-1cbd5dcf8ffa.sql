-- Update RLS policy to allow reading waitlist data for dashboard
-- This replaces the overly restrictive policy that blocked all reads
DROP POLICY IF EXISTS "No public read access to protect privacy" ON public.waitlist_leads;

-- Create a more practical policy for dashboard access
-- For now, allowing authenticated users to read (later can be restricted to admin roles)
CREATE POLICY "Authenticated users can view waitlist data"
  ON public.waitlist_leads
  FOR SELECT
  TO authenticated
  USING (true);