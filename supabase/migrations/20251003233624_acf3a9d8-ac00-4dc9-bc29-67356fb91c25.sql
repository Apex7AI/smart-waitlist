-- Add DELETE policy to profiles table to prevent unauthorized deletion
-- Only admins can delete user profiles
CREATE POLICY "Only admins can delete profiles" 
ON public.profiles 
FOR DELETE 
USING (is_admin());

-- Add comment for documentation
COMMENT ON POLICY "Only admins can delete profiles" ON public.profiles 
IS 'Prevents unauthorized deletion of user profiles. Only admin users can delete profiles.';