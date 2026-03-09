# 🔒 Relatório de Segurança - Smart Waitlist / Apex7AI Lynx

**Data da Análise:** Março 2024  
**Projeto:** smart-waitlist  
**Domínio:** lynxlist.apex7ai.com  
**Responsável:** Apex7AI Development Team

---

## 📊 Resumo Executivo

| Categoria | Status | Nível de Risco |
|-----------|--------|----------------|
| **RLS (Row Level Security)** | ⚠️ Parcial | **MÉDIO** |
| **Autenticação** | ✅ Bom | **BAIXO** |
| **Variáveis de Ambiente** | ⚠️ Atenção | **MÉDIO-ALTO** |
| **Controle de Acesso** | ✅ Bom | **BAIXO** |
| **Proteção de Dados** | ⚠️ Parcial | **MÉDIO** |
| **Configuração Docker** | ✅ Bom | **BAIXO** |

---

## 🎯 Análise Detalhada

### 1. 🔐 RLS - Row Level Security (SUPABASE)

#### ✅ **O que está CORRETO:**

```sql
-- Policy de INSERT pública para waitlist (correto para signup)
CREATE POLICY "Anyone can join waitlist"
  ON public.waitlist_leads
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Policy de DELETE restrita (apenas admins)
CREATE POLICY "Only admins can delete profiles"
ON public.profiles
FOR DELETE
USING (is_admin());

-- Função is_admin() com SECURITY DEFINER (correto)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = 'public'
```

#### ⚠️ **PROBLEMAS CRÍTICOS IDENTIFICADOS:**

##### **Problema #1: Policy de SELECT excessivamente restritiva**

**Arquivo:** `20250908042910_538049e2-26ac-4bfe-8c43-1cbd5dcf8ffa.sql`

```sql
-- ❌ PROBLEMA: Esta policy bloqueia TODAS as leituras
CREATE POLICY "No public read access to protect privacy"
  ON public.waitlist_leads
  FOR SELECT
  TO authenticated
  USING (false);  -- ← SEMPRE retorna false, bloqueando tudo
```

**Impacto:**
- Dashboard não consegue ler dados mesmo para admins
- Usuários autenticados não conseguem ver nenhum dado
- Sistema depende de outra policy para funcionar

**Solução Aplicada (parcial):**
```sql
-- Migration posterior criou esta policy (melhor, mas ainda problemática)
CREATE POLICY "Authenticated users can view waitlist data"
  ON public.waitlist_leads
  FOR SELECT
  TO authenticated
  USING (true);
```

**Problema desta solução:**
- ✅ Funciona para dashboard
- ❌ **MUITO PERMISSIVA**: QUALQUER usuário autenticado pode ver TODOS os leads
- ❌ Dados sensíveis (nome, email, empresa, orçamento) expostos para todos

**Recomendação CRÍTICA:**
```sql
-- ✅ Policy IDEAL: Apenas admins podem ler
DROP POLICY IF EXISTS "Authenticated users can view waitlist data" ON public.waitlist_leads;

CREATE POLICY "Only admins can view waitlist data"
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
```

---

##### **Problema #2: Tabela `profiles` sem RLS explícito**

**Status:** Não encontramos policy de SELECT para `profiles`

**Risco:**
- Se RLS estiver habilitado sem policies, NENHUM dado é acessível
- Se RLS não estiver habilitado, TODOS os dados são públicos

**Verificação Necessária:**
```sql
-- Executar no Supabase Dashboard para verificar
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' AND tablename = 'profiles';
```

**Recomendação:**
```sql
-- Habilitar RLS se não estiver
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policy para usuários verem seu próprio perfil
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Policy para admins verem todos os perfis
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

-- Policy para INSERT (usuário cria seu perfil ao se registrar)
CREATE POLICY "Users can insert own profile"
  ON public.profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Policy para UPDATE (usuário atualiza seu próprio perfil)
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);
```

---

### 2. 🔑 Autenticação (Supabase Auth)

#### ✅ **Pontos FORTES:**

```typescript
// AuthContext.tsx - Implementação correta
const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: localStorage,      // ← Persistência adequada
    persistSession: true,       // ← Sessão persistente
    autoRefreshToken: true,     // ← Refresh automático
  }
});
```

**O que está bom:**
- ✅ Uso correto do `@supabase/supabase-js`
- ✅ Persistência de sessão com localStorage
- ✅ Auto-refresh de tokens
- ✅ Contexto React bem estruturado
- ✅ Proteção de rotas no Dashboard

#### ⚠️ **Pontos de ATENÇÃO:**

##### **Problema #3: Chaves HARDCODED no client.ts**

**Arquivo:** `src/integrations/supabase/client.ts`

```typescript
// ⚠️ PERIGOSO: Chaves expostas no código
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://elqprazrouxiizubcmzc.supabase.co";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR...";
```

**Risco:**
- Se `.env` não existir ou falhar, usa chaves hardcoded
- Chave anon é pública por natureza, mas não deveria estar no código
- Qualquer um com acesso ao repositório vê as chaves

**Status Atual:**
- ✅ `.env` está no `.gitignore` (verificado)
- ⚠️ Chaves hardcoded como fallback são perigosas

**Recomendação:**
```typescript
// ✅ REMOVER fallbacks hardcoded
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validar presença das variáveis
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase environment variables');
}
```

---

### 3. 🛡️ Controle de Acesso (Admin)

#### ✅ **Pontos FORTES:**

```typescript
// Dashboard.tsx - Verificação correta de admin
if (!isAdmin) {
  toast({
    title: "Acesso negado",
    description: "Você não tem permissão para acessar esta página.",
    variant: "destructive",
  });
  navigate('/');
  return;
}
```

**O que está bom:**
- ✅ Verificação de `isAdmin` antes de carregar dados
- ✅ Redirecionamento para não-autorizados
- ✅ Feedback visual (toast) de erro
- ✅ Múltiplas camadas de proteção (RLS + frontend)

#### ⚠️ **Pontos de ATENÇÃO:**

##### **Problema #4: Dependência excessiva do frontend para segurança**

**Código atual:**
```typescript
// Dashboard.tsx
const { data, error } = await supabase
  .from('waitlist_leads')
  .select('*')  // ← Seleciona TUDO
  .order('created_at', { ascending: false });
```

**Risco:**
- Se RLS falhar, frontend é única barreira
- Dados sensíveis podem vazar se policy estiver errada

**Recomendação:**
- ✅ Manter RLS restritivo no banco
- ✅ Manter validação no frontend (já existe)
- ⚠️ Adicionar log de auditoria para acessos

---

### 4. 📦 Variáveis de Ambiente

#### ⚠️ **Status ATUAL:**

**Arquivo:** `.env` (4 variáveis)
```env
VITE_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
VITE_SUPABASE_PROJECT_ID="elqprazrouxiizubcmzc"
VITE_SUPABASE_PUBLISHABLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
VITE_SUPABASE_URL="https://elqprazrouxiizubcmzc.supabase.co"
```

**Verificações:**
- ✅ `.env` está no `.gitignore`
- ⚠️ Chaves são visíveis no client-side (inevitável para VITE_*)
- ⚠️ `VITE_SUPABASE_PUBLISHABLE_KEY` duplicada (mesma valor que ANON_KEY)

**Recomendações:**

1. **Remover variável duplicada:**
```env
# Remover esta linha (desnecessária)
VITE_SUPABASE_PUBLISHABLE_KEY="..."
```

2. **No código, usar apenas uma:**
```typescript
// client.ts
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
```

3. **Adicionar .env.example:**
```env
# Copie para .env e preencha com suas chaves
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

---

### 5. 🔒 Proteção de Dados Sensíveis

#### ⚠️ **Dados Coletados (waitlist_leads):**

| Campo | Sensibilidade | Exposição Atual |
|-------|---------------|-----------------|
| `name` | Baixa | ✅ Admins |
| `email` | **ALTA** | ⚠️ Todos auth (problema!) |
| `company` | Média | ⚠️ Todos auth (problema!) |
| `role` | Baixa | ⚠️ Todos auth (problema!) |
| `use_cases` | Média | ⚠️ Todos auth (problema!) |
| `urgency` | Baixa | ⚠️ Todos auth (problema!) |
| `budget` | **ALTA** | ⚠️ Todos auth (problema!) |
| `lead_score` | Média | ⚠️ Todos auth (problema!) |

#### **Recomendações:**

1. **Restringir acesso via RLS:**
```sql
-- Apenas admins podem ver dados completos
CREATE POLICY "Admins can view all waitlist data"
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
```

2. **Adicionar política de retenção:**
```sql
-- Exemplo: Deletar leads antigos automaticamente
-- (apenas se necessário por LGPD/GDPR)
```

---

### 6. 🐳 Configuração Docker

#### ✅ **Pontos FORTES:**

**Arquivo:** `Dockerfile`
```dockerfile
# Multi-stage build (correto)
FROM node:18-alpine AS build
# ...
FROM caddy:2.8.4-alpine
```

**O que está bom:**
- ✅ Build em múltiplos estágios (menor imagem final)
- ✅ Uso de Caddy (servidor seguro e moderno)
- ✅ Sem exposição de variáveis sensíveis
- ✅ Configuração adequada de portas

**Arquivo:** `Caddyfile`
```caddy
:{$PORT:8080} {
  root * /app/dist
  file_server
  try_files {path} /index.html
}
```

**O que está bom:**
- ✅ Uso de variável de ambiente para porta
- ✅ Configuração SPA correta (try_files)
- ✅ Sem exposição de diretórios sensíveis

---

### 7. 🌐 Segurança Frontend

#### ✅ **Pontos FORTES:**

1. **Proteção de Rotas:**
```typescript
// Dashboard.tsx
if (!user) {
  navigate('/auth');
  return;
}
```

2. **Tratamento de Erros:**
```typescript
try {
  const { error } = await supabase.from('waitlist_leads').insert({...});
  if (error) throw error;
} catch (error: any) {
  // Tratamento adequado
}
```

#### ⚠️ **Pontos de ATENÇÃO:**

##### **Problema #5: Ausência de rate limiting**

**Risco:**
- Formulário de waitlist pode ser abusado
- Possível spam de leads falsos

**Recomendação:**
```typescript
// Adicionar no WaitlistForm.tsx
const [isSubmitting, setIsSubmitting] = useState(false);
const [submitCount, setSubmitCount] = useState(0);

const handleSubmit = async () => {
  // Rate limiting simples
  if (submitCount > 3) {
    toast({
      title: "Muitas tentativas",
      description: "Aguarde alguns minutos antes de tentar novamente.",
      variant: "destructive",
    });
    return;
  }
  
  setIsSubmitting(true);
  // ... lógica existente
};
```

**Recomendação Avançada (Supabase Edge Function):**
```typescript
// Rate limiting no backend (mais seguro)
// Usar Supabase Edge Functions com limitador de requisições
```

---

### 8. 📋 LGPD / GDPR Compliance

#### ⚠️ **Pontos de ATENÇÃO:**

**Dados coletados:**
- ✅ Nome, email, empresa (dados pessoais)
- ⚠️ Sem política de privacidade visível
- ⚠️ Sem checkbox de consentimento explícito
- ⚠️ Sem opção de deletar dados

**Recomendações:**

1. **Adicionar checkbox de consentimento:**
```typescript
// WaitlistForm.tsx - Step 1
<div className="flex items-center space-x-2">
  <Checkbox id="consent" required />
  <Label htmlFor="consent">
    Concordo com a coleta e processamento dos meus dados conforme 
    <a href="/privacy" className="text-primary underline">Política de Privacidade</a>
  </Label>
</div>
```

2. **Adicionar política de privacidade:**
- Criar página `/privacy` explicando uso dos dados
- Incluir informações de contato do DPO (Data Protection Officer)

3. **Adicionar opção de exclusão:**
```typescript
// Dashboard.tsx - Admin pode deletar
const deleteLead = async (leadId: string) => {
  await supabase.from('waitlist_leads').delete().eq('id', leadId);
};
```

---

## 🎯 Plano de Ação Prioritário

### 🔴 **CRÍTICO (Resolver em 24-48h)**

1. **Corrigir RLS da tabela `waitlist_leads`:**
```sql
-- Executar no Supabase Dashboard SQL Editor
DROP POLICY IF EXISTS "Authenticated users can view waitlist data" ON public.waitlist_leads;

CREATE POLICY "Only admins can view waitlist data"
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
```

2. **Verificar RLS da tabela `profiles`:**
```sql
-- Verificar status
SELECT tablename, rowsecurity FROM pg_tables WHERE tablename = 'profiles';

-- Se necessário, habilitar e criar policies (ver seção 1)
```

3. **Remover chaves hardcoded do client.ts:**
```typescript
// src/integrations/supabase/client.ts
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase environment variables');
}
```

---

### 🟠 **ALTA PRIORIDADE (Resolver em 1 semana)**

4. **Adicionar .env.example:**
```bash
# Criar arquivo .env.example
echo "VITE_SUPABASE_URL=" > .env.example
echo "VITE_SUPABASE_ANON_KEY=" >> .env.example
```

5. **Remover variável duplicada:**
```bash
# Editar .env e remover VITE_SUPABASE_PUBLISHABLE_KEY
```

6. **Adicionar política de privacidade:**
- Criar página `/privacy`
- Adicionar link no footer

---

### 🟡 **MÉDIA PRIORIDADE (Resolver em 2 semanas)**

7. **Adicionar consentimento no formulário:**
- Checkbox de LGPD
- Termo de aceite

8. **Implementar rate limiting:**
- Frontend (básico)
- Edge Function (avançado)

9. **Adicionar log de auditoria:**
```sql
-- Criar tabela de logs
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  action TEXT,
  table_name TEXT,
  timestamp TIMESTAMP DEFAULT now()
);
```

---

### 🟢 **BAIXA PRIORIDADE (Resolver em 1 mês)**

10. **Opção de exclusão de dados:**
- Admin pode deletar leads
- Usuário pode solicitar exclusão

11. **Política de retenção:**
- Definir tempo máximo de retenção
- Limpeza automática de dados antigos

12. **Revisão de segurança periódica:**
- Agendar revisões trimestrais
- Manter dependências atualizadas

---

## 📊 Score de Segurança Atual

| Categoria | Score | Notas |
|-----------|-------|-------|
| **RLS** | 5/10 | Policies existem mas precisam de ajuste |
| **Autenticação** | 8/10 | Bem implementada, sem falhas críticas |
| **Variáveis de Ambiente** | 6/10 | .env protegido, mas tem hardcoded |
| **Controle de Acesso** | 8/10 | Verificação de admin correta |
| **Proteção de Dados** | 5/10 | Dados expostos para auth users |
| **Docker** | 9/10 | Configuração segura |
| **LGPD** | 3/10 | Sem consentimento ou política |
| **TOTAL** | **6.3/10** | **MÉDIO** - Requer atenção |

---

## ✅ Checklist de Validação

Após aplicar as correções, execute:

```bash
# 1. Testar build
npm run build

# 2. Verificar se .env está no .gitignore
git check-ignore .env

# 3. Testar autenticação
# - Criar conta
# - Fazer login
# - Acessar /dashboard (deve funcionar para admin)

# 4. Testar RLS (Supabase Dashboard)
# - Tentar SELECT como usuário não-admin (deve falhar)
# - Tentar SELECT como admin (deve funcionar)

# 5. Testar formulário de waitlist
# - Preencher e enviar
# - Verificar se dados foram salvos

# 6. Verificar commit
git status
# .env NÃO deve aparecer
```

---

## 📞 Contatos Úteis

- **Supabase Security Docs:** https://supabase.com/docs/guides/auth/row-level-security
- **OWASP Top 10:** https://owasp.org/www-project-top-ten/
- **LGPD Guia:** https://www.gov.br/cidadania/pt-br/assuntos/lgpd

---

**Próxima revisão:** Junho 2024  
**Responsável pela correção:** Development Team  
**Aprovado por:** Security Team
