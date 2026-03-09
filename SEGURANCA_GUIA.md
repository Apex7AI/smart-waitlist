# 🔒 Guia de Segurança - Supabase RLS

**Projeto:** Apex7AI Lynx / Smart Waitlist  
**Domínio:** lynxlist.apex7ai.com  
**Data:** Março 2024

---

## 📋 Resumo Rápido

| O que fazer | Prioridade | Tempo | Risco |
|-------------|------------|-------|-------|
| Verificar RLS atual | Alta | 5 min | Nenhum |
| Corrigir policy waitlist_leads | **CRÍTICA** | 10 min | Baixo |
| Corrigir policy profiles | Média | 10 min | Baixo |
| Testar tudo | Alta | 15 min | Nenhum |

---

## 🎯 O Que é RLS (Row Level Security)

**RLS é como um "filtro"** que controla **quem pode ver/quem pode editar** cada dado no banco.

### **Exemplo Prático:**

```
Sem RLS:          Com RLS:
┌─────────┐       ┌─────────┐
│ Todos   │       │  Admin  │ → Vê todos os leads
│ vêem    │       ├─────────┤
│ tudo    │       │ Usuário │ → Vê apenas seu perfil
└─────────┘       └─────────┘
```

---

## ⚠️ Problema Atual (CRÍTICO)

**Situação:** A policy do `waitlist_leads` pode estar permitindo que **QUALQUER usuário logado** veja **TODOS os leads** (nome, email, empresa, orçamento).

**Risco:** Se alguém criar uma conta no seu sistema, pode acessar dados de todos os 16+ leads cadastrados.

**Solução:** Restringir visualização apenas para **admins**.

---

## 🛠️ Passo a Passo - Aplicar Correções

### **FASE 1: Verificar Status Atual** (5 minutos)

1. Acesse: https://supabase.com/dashboard/project/elqprazrouxiizubcmzc
2. Vá em **SQL Editor** (menu lateral esquerdo)
3. Cole e execute:

```sql
-- Verificar RLS das tabelas
SELECT 
  tablename,
  rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN ('profiles', 'waitlist_leads');

-- Verificar policies existentes
SELECT 
  tablename,
  policyname,
  cmd,
  roles
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename IN ('profiles', 'waitlist_leads')
ORDER BY tablename, policyname;
```

4. **Tire um print** ou copie o resultado

---

### **FASE 2: Aplicar Correções** (10 minutos)

#### **Correção #1: waitlist_leads (CRÍTICO)**

No SQL Editor, execute **nesta ordem**:

```sql
-- 1. Criar NOVA policy de admin (NÃO remova a antiga ainda!)
CREATE POLICY "Admins can view waitlist data"
  ON public.waitlist_leads
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- 2. Garantir que INSERT continua público (formulário funcionar)
DROP POLICY IF EXISTS "Anyone can join waitlist" ON public.waitlist_leads;
CREATE POLICY "Anyone can join waitlist"
  ON public.waitlist_leads
  FOR INSERT
  TO public
  WITH CHECK (true);

-- 3. Garantir UPDATE/DELETE apenas para admins
DROP POLICY IF EXISTS "Only admins can update waitlist" ON public.waitlist_leads;
CREATE POLICY "Only admins can update waitlist"
  ON public.waitlist_leads
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Only admins can delete waitlist" ON public.waitlist_leads;
CREATE POLICY "Only admins can delete waitlist"
  ON public.waitlist_leads
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );
```

---

#### **Correção #2: profiles (MÉDIA PRIORIDADE)**

```sql
-- Habilitar RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Usuários vêem seu próprio perfil
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Admins vêem todos os perfis
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
CREATE POLICY "Admins can view all profiles"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

-- Usuários criam seu próprio perfil (signup)
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile"
  ON public.profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Usuários atualizam seu próprio perfil
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Apenas admins deletam perfis
DROP POLICY IF EXISTS "Only admins can delete profiles" ON public.profiles;
CREATE POLICY "Only admins can delete profiles"
  ON public.profiles
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );
```

---

### **FASE 3: Testar** (15 minutos)

#### **Teste 1: Dashboard Admin**

1. **Localmente:**
```bash
cd /home/levy/projetos/smart-waitlist
npm run dev
```

2. Acesse: `http://localhost:8080/dashboard`
3. **Deve funcionar** (se você é admin)
4. Se aparecer erro de permissão, algo está errado

#### **Teste 2: Waitlist (Formulário)**

1. Acesse: `http://localhost:8080/waitlist-form`
2. Preencha com dados de teste
3. Envie
4. **Verifique no Supabase:**
   - Table Editor → `waitlist_leads`
   - Deve ter um lead novo

#### **Teste 3: Produção**

1. Acesse: `https://lynxlist.apex7ai.com/dashboard`
2. Deve funcionar para você (admin)
3. Peça para alguém não-admin tentar acessar (deve negar)

---

## 🔄 Como Reverter (Se Algo Der Errado)

### **Reverter waitlist_leads:**

```sql
-- Remover policy de admin
DROP POLICY IF EXISTS "Admins can view waitlist data" ON public.waitlist_leads;

-- Recriar policy antiga (aberta)
CREATE POLICY "Authenticated users can view waitlist data"
  ON public.waitlist_leads
  FOR SELECT
  TO authenticated
  USING (true);
```

### **Reverter profiles:**

```sql
-- Desabilitar RLS (volta ao estado original)
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

-- OU manter RLS mas remover policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Only admins can delete profiles" ON public.profiles;
```

---

## 📊 O Que Cada Policy Faz

### **waitlist_leads:**

| Policy | O Que Faz | Impacto |
|--------|-----------|---------|
| `Anyone can join waitlist` (INSERT) | Permite formulário funcionar | ✅ Necessária |
| `Admins can view waitlist data` (SELECT) | Apenas admin vê leads | ✅ Segurança |
| `Only admins can update waitlist` (UPDATE) | Apenas admin edita leads | ✅ Segurança |
| `Only admins can delete waitlist` (DELETE) | Apenas admin deleta leads | ✅ Segurança |

### **profiles:**

| Policy | O Que Faz | Impacto |
|--------|-----------|---------|
| `Users can view own profile` | Usuário vê seu perfil | ✅ Privacidade |
| `Admins can view all profiles` | Admin vê todos perfis | ✅ Gestão |
| `Users can insert own profile` | Usuário cria perfil (signup) | ✅ Necessária |
| `Users can update own profile` | Usuário edita seu perfil | ✅ UX |
| `Only admins can delete profiles` | Apenas admin deleta | ✅ Segurança |

---

## 🎯 Checklist de Validação

Após aplicar correções:

```
[ ] Dashboard admin funciona (localhost)
[ ] Dashboard admin funciona (produção)
[ ] Waitlist formulário salva dados
[ ] Leads existentes ainda aparecem (16+)
[ ] Usuário não-admin não acessa dashboard
[ ] Usuário vê apenas seu próprio perfil
```

---

## ⚠️ O Que NÃO Afecta

**RLS NÃO faz:**
- ❌ Deletar dados
- ❌ Alterar estrutura das tabelas
- ❌ Quebrar o app (se testado antes)
- ❌ Afetar leads existentes (16+)

**RLS faz:**
- ✅ Controlar quem pode ler
- ✅ Controlar quem pode escrever
- ✅ Proteger dados sensíveis
- ✅ Pode ser desfeito

---

## 📞 Em Caso de Dúvidas

**Comandos úteis para diagnóstico:**

```sql
-- Verificar quantos leads tem
SELECT count(*) FROM waitlist_leads;

-- Verificar se você é admin
SELECT email, role FROM profiles WHERE email = 'seu-email@exemplo.com';

-- Verificar todas policies
SELECT * FROM pg_policies WHERE schemaname = 'public';

-- Verificar se RLS está ativo
SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public';
```

---

## 🚀 Próximos Passos (Sua Agenda)

1. ✅ **Subir anúncios** (prioridade agora)
2. ⏳ **Verificar RLS** (quando puder)
3. ⏳ **Aplicar correções** (testar local primeiro)
4. ⏳ **Validar produção** (após teste local)

---

**Importante:** Este guia não altera nada até você executar os SQLs.  
**Sempre teste localmente antes de produção.**  
**Em caso de dúvida, reverta usando as instruções acima.**

---

**Última atualização:** Março 2024  
**Responsável:** Apex7AI Development Team
