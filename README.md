# Payment Progress (PayFreelas)

Payment Progress é um painel minimalista e moderno, projetado para autônomos e freelancers enviarem um link de acompanhamento financeiro de projetos aos seus clientes, integrando barra de progresso, histórico de pagamentos e checkout transparente.

## Principais Funcionalidades

- **Painel Administrativo (`/admin`)**: Gerencie seus projetos, visualize o saldo, adicione novos pagamentos recebidos por fora ou crie novos projetos.
- **Página Pública do Cliente (`/p/[id]`)**: Link seguro, sem necessidade de login, que você envia para o cliente. Contém barra de progresso, saldo restante e integração para pagamento.
- **Integração Mercado Pago**: Cliente escolhe quanto deseja pagar da dívida e é redirecionado para o ambiente seguro do Mercado Pago.
- **Dados Bancários e Pix**: Área estática para transferência bancária direta configurada de forma simples.

## Stack Tecnológica

- **Next.js 15+ (App Router)**
- **TailwindCSS** e **Lucide React** (Ícones)
- **Supabase** (PostgreSQL, Auth e Storage)
- **Mercado Pago Node SDK**

## Variáveis de Ambiente (`.env.local`)

Certifique-se de configurar as seguintes variáveis no seu ambiente de deploy:

```env
# Banco de Dados e Autenticação (Pegue no seu painel do Supabase)
NEXT_PUBLIC_SUPABASE_URL=https://seuid.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key

# API de Pagamentos (Pegue no seu painel do Mercado Pago)
MERCADOPAGO_ACCESS_TOKEN=APP_USR-seu-token

# URL do seu site em Produção (Importante para o redirecionamento do pagamento)
NEXT_PUBLIC_SITE_URL=https://meusite.com.br
```

## Instruções de Deploy (Vercel)

Recomendamos o **Vercel** para deploy desta aplicação.

1. Faça o commit do seu projeto para um repositório no **GitHub**.
2. Acesse [vercel.com](https://vercel.com) e conecte o repositório.
3. Na área de "Environment Variables", cole TODAS as chaves informadas acima (incluindo o `NEXT_PUBLIC_SITE_URL` com a URL real que a Vercel vai gerar, ou configure isso logo após o deploy).
4. Clique em **Deploy**. O Vercel fará automaticamente o `npm run build` e publicará o site.
5. (Opcional) Vá no painel do Supabase -> Authentication -> URL Configuration e adicione o domínio gerado pela Vercel nos "Site URLs" permitidos.

## Rodando Localmente

```bash
npm install
npm run dev
```
Acesse `http://localhost:3000/admin`.
