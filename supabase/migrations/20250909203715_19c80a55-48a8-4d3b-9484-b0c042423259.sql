-- Primeiro, vamos corrigir as políticas RLS para proteger os dados
-- Remover a política insegura atual
DROP POLICY IF EXISTS "Authenticated users can view waitlist data" ON public.waitlist_leads;

-- Criar uma política mais restritiva - apenas usuários admin podem ver os dados
CREATE POLICY "Only admins can view waitlist data" 
ON public.waitlist_leads 
FOR SELECT 
USING (false); -- Nenhum usuário pode ver por enquanto, até implementarmos roles

-- Política para UPDATE e DELETE também restrita
CREATE POLICY "Only admins can update waitlist data" 
ON public.waitlist_leads 
FOR UPDATE 
USING (false);

CREATE POLICY "Only admins can delete waitlist data" 
ON public.waitlist_leads 
FOR DELETE 
USING (false);

-- Criar tabela de perfis de usuários
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  full_name text,
  role text DEFAULT 'user',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  PRIMARY KEY (id)
);

-- Habilitar RLS na tabela profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Política para que usuários possam ver apenas seu próprio perfil
CREATE POLICY "Users can view own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);

-- Política para que usuários possam atualizar apenas seu próprio perfil
CREATE POLICY "Users can update own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id);

-- Política para inserir perfil próprio
CREATE POLICY "Users can insert own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Função para criar perfil automaticamente quando usuário se registra
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', new.email)
  );
  RETURN new;
END;
$$;

-- Trigger para criar perfil automaticamente
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Função para verificar se o usuário é admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

-- Atualizar políticas do waitlist para usar a função is_admin
DROP POLICY IF EXISTS "Only admins can view waitlist data" ON public.waitlist_leads;
CREATE POLICY "Only admins can view waitlist data" 
ON public.waitlist_leads 
FOR SELECT 
USING (public.is_admin());

DROP POLICY IF EXISTS "Only admins can update waitlist data" ON public.waitlist_leads;
CREATE POLICY "Only admins can update waitlist data" 
ON public.waitlist_leads 
FOR UPDATE 
USING (public.is_admin());

DROP POLICY IF EXISTS "Only admins can delete waitlist data" ON public.waitlist_leads;
CREATE POLICY "Only admins can delete waitlist data" 
ON public.waitlist_leads 
FOR DELETE 
USING (public.is_admin());

-- Trigger para atualizar updated_at em profiles
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();