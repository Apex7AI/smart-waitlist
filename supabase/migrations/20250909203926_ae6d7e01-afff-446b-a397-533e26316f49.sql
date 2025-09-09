-- Criar um usuário admin inicial (você pode alterar o email)
-- IMPORTANTE: Após executar esta migração, você precisa criar um usuário com este email via interface de auth
-- e depois executar o SQL abaixo para torná-lo admin

-- Esta é uma função para promover um usuário a admin
CREATE OR REPLACE FUNCTION public.promote_user_to_admin(user_email text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.profiles 
  SET role = 'admin' 
  WHERE email = user_email;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'User with email % not found', user_email;
  END IF;
END;
$$;

-- Exemplo de como usar (descomente e altere o email quando necessário):
-- SELECT public.promote_user_to_admin('seu-email@exemplo.com');