# Guia de Deploy e Modificações - Smart Waitlist no EasyPanel

Este documento serve como um registro técnico de todas as alterações realizadas no projeto `smart-waitlist` para habilitar o deploy seguro e funcional em um ambiente de produção utilizando EasyPanel.

## Resumo das Alterações

Foram realizadas duas modificações principais no projeto:

1.  **Criação de Arquivos de Configuração de Deploy (`Caddyfile` e `nixpacks.toml`):** Para resolver erros 404 em rotas de páginas e automatizar o processo de build no servidor.
2.  **Externalização de Chaves de API (`.env`):** Para remover dados sensíveis (credenciais do Supabase) do código-fonte, aumentando drasticamente a segurança da aplicação.

---

## Modificação 1: Correção do Erro 404 e Automação do Build

### O Problema (Antes)

-   A aplicação, por ser uma SPA (Single Page Application) com React Router, retornava `Erro 404` ao tentar acessar qualquer rota diretamente (ex: `seudominio.com/dashboard`).
-   O processo de build no EasyPanel dependia de comandos inseridos manualmente no painel, o que é propenso a erros e inconsistências.

### A Solução (Depois)

Foram criados dois arquivos na raiz do projeto para instruir o ambiente de deploy (Nixpacks/EasyPanel) a construir e servir a aplicação corretamente.

#### 1. `nixpacks.toml`
Este arquivo define os comandos exatos que o servidor deve executar.

```toml
# Define o comando para iniciar o servidor web
[phases.start]
cmd = "caddy run --config /app/Caddyfile --adapter caddyfile"

# Define o comando para construir a aplicação para produção
[phases.build]
cmds = ["npm run build"]

# Define o comando para instalar as dependências
[phases.install]
cmds = ["npm install"]
```

#### 2. `Caddyfile`
Este é o arquivo de configuração para o servidor web Caddy.

```caddy
# Inicia o servidor na porta definida pelo ambiente
:{$PORT:8080} {
  # Define a pasta "dist" (resultado do build) como a raiz do site
  root * /app/dist
  # Habilita o servidor de arquivos estáticos
  file_server
  # LINHA MAIS IMPORTANTE: Resolve o erro 404
  # Tenta encontrar o arquivo da rota, se não encontrar, serve o index.html
  try_files {path} /index.html
}
```

**Como Reverter:** Para voltar ao estado anterior, basta deletar os arquivos `nixpacks.toml` e `Caddyfile` do repositório.

---

## Modificação 2: Segurança com Variáveis de Ambiente

### O Problema (Antes)

As credenciais de acesso ao Supabase estavam escritas diretamente no código-fonte, no arquivo `src/integrations/supabase/client.ts`.

```typescript
// ANTES - Inseguro
const SUPABASE_URL = "https://url-do-seu-projeto.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sua-chave-publica-longa-aqui";
```

Isso representa um **risco de segurança grave**, pois qualquer pessoa com acesso ao repositório no GitHub poderia ver e utilizar suas credenciais.

### A Solução (Depois)

O código foi modificado para ler as credenciais de Variáveis de Ambiente, que são configuradas de forma segura diretamente no painel do EasyPanel e nunca são salvas no repositório.

**Arquivo `src/integrations/supabase/client.ts`:**
```typescript
// DEPOIS - Seguro
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
```

**Como Reverter:** Para voltar ao estado anterior, edite o arquivo `src/integrations/supabase/client.ts` e substitua as linhas com `import.meta.env` pelas linhas originais contendo a URL e a chave do Supabase.
