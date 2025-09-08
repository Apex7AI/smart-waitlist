-- Create waitlist leads table
CREATE TABLE public.waitlist_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  company TEXT,
  role TEXT,
  use_cases TEXT[] DEFAULT '{}',
  custom_use_case TEXT,
  urgency TEXT NOT NULL,
  budget TEXT NOT NULL,
  lead_score INTEGER NOT NULL DEFAULT 0,
  priority_level TEXT GENERATED ALWAYS AS (
    CASE 
      WHEN lead_score >= 8 THEN 'alta'
      WHEN lead_score >= 5 THEN 'media'
      ELSE 'baixa'
    END
  ) STORED,
  status TEXT DEFAULT 'pendente' CHECK (status IN ('pendente', 'convidado', 'ativo')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for better performance
CREATE INDEX idx_waitlist_leads_email ON public.waitlist_leads(email);
CREATE INDEX idx_waitlist_leads_score ON public.waitlist_leads(lead_score DESC);
CREATE INDEX idx_waitlist_leads_priority ON public.waitlist_leads(priority_level);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_waitlist_leads_updated_at
  BEFORE UPDATE ON public.waitlist_leads
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();