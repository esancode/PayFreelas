# 04 - Arquitetura

# Introdução

Este documento descreve a arquitetura técnica do sistema Payment Progress.

A arquitetura foi projetada para manter o sistema:

- simples;
- seguro;
- escalável;
- de baixo custo;
- fácil de manter.

O sistema funciona como uma plataforma de acompanhamento financeiro de projetos.

Ele NÃO processa pagamentos diretamente.

Ele NÃO armazena dados de cartão.

Ele NÃO substitui serviços financeiros externos.

Toda movimentação financeira sensível permanece sob responsabilidade de serviços especializados.

---

# Visão Geral da Arquitetura

O sistema será construído utilizando uma arquitetura web moderna baseada em:

- Frontend e Backend integrados através do Next.js;
- Banco de dados PostgreSQL utilizando Supabase;
- Autenticação administrativa utilizando Supabase Auth;
- Armazenamento seguro de informações;
- Integração externa com Mercado Pago para pagamentos via cartão.

Arquitetura geral:

             Cliente
                |
                |
          Link Público
                |
                |
          Next.js App
                |
    ------------------------
    |                      |
    |                      |

Página Pública Área Administrativa
| |
| |
-------- Backend -------
|
------------------------
| |
Supabase Mercado Pago
| |
PostgreSQL Checkout Externo


---

# Stack Tecnológica

## Frontend

Tecnologias:

- Next.js
- TypeScript
- TailwindCSS

Responsabilidades:

- renderização das páginas;
- componentes visuais;
- interação do usuário;
- validações básicas;
- comunicação com API.

---

## Backend

Tecnologia:

- Next.js API Routes

Responsabilidades:

- regras de negócio;
- autenticação;
- criação de projetos;
- registro de pagamentos;
- validações financeiras;
- integração com serviços externos.

---

## Banco de Dados

Tecnologia:

- PostgreSQL através do Supabase.

Responsabilidades:

- armazenar projetos;
- armazenar clientes;
- armazenar pagamentos;
- manter histórico financeiro;
- controlar usuários administrativos.

---

## Autenticação

Tecnologia:

- Supabase Auth.

Responsabilidade:

Controlar acesso ao painel administrativo.

Somente administradores autenticados poderão:

- criar projetos;
- registrar pagamentos;
- excluir projetos;
- visualizar dados internos.

Clientes não possuem conta.

---

# Estrutura de Aplicação

A aplicação será organizada seguindo separação de responsabilidades.

Estrutura sugerida:


src/

├── app/
│
│ ├── admin/
│ │ ├── projetos/
│ │ └── login/
│ │
│ ├── p/
│ │ └── [codigo-publico]/
│ │
│ └── api/
│ ├── projetos/
│ ├── pagamentos/
│ └── mercado-pago/
│
├── components/
│
├── services/
│
├── lib/
│
├── types/
│
└── utils/


---

# Camadas do Sistema

## Camada de Interface

Responsável pela experiência visual.

Componentes:

- páginas;
- cards;
- botões;
- formulários;
- barras de progresso;
- histórico financeiro.

Não deve possuir regras financeiras críticas.

---

## Camada de API

Responsável pela comunicação entre frontend e banco.

Responsabilidades:

- receber solicitações;
- validar dados;
- executar regras;
- retornar respostas.

Exemplo:


Frontend

↓

API Route

↓

Banco de Dados


---

## Camada de Serviços

Contém regras específicas do sistema.

Exemplos:

- cálculo de progresso;
- validação de saldo;
- geração de links;
- criação de checkout Mercado Pago.

Exemplo:


paymentService

calcularSaldo()
calcularProgresso()
validarPagamento()

---

## Camada de Dados

Responsável pelo acesso ao banco.

Responsabilidades:

- consultas;
- inserções;
- atualizações;
- relacionamentos.

---

# Fluxo de Criação de Projeto

Fluxo:


Administrador

↓

Preenche dados do projeto

↓

Frontend envia dados

↓

API valida informações

↓

Banco cria projeto

↓

Sistema gera código público

↓

Link retornado ao administrador

↓

Administrador envia ao cliente


Exemplo:


https://app.com/p/a83k92jd


---

# Fluxo de Visualização do Cliente

Fluxo:


Cliente acessa link público

↓

Sistema identifica projeto

↓

API busca informações

↓

Banco retorna dados

↓

Página exibe:

nome;
valor total;
valor pago;
saldo restante;
progresso;
histórico;
pagamentos disponíveis

O cliente não possui acesso ao painel administrativo.

---

# Fluxo de Registro Manual de Pagamento

Utilizado para:

- Pix;
- depósito;
- cartão confirmado manualmente.

Fluxo:


Administrador

↓

Seleciona projeto

↓

Registra pagamento

↓

API valida valor

↓

Pagamento salvo no banco

↓

Sistema recalcula:

total pago;
saldo restante;
percentual;
histórico

---

# Fluxo de Pagamento via Cartão

O sistema utiliza checkout externo do Mercado Pago.

Fluxo:


Cliente

↓

Seleciona Cartão

↓

Informa valor desejado

↓

Backend valida:

valor > 0

valor <= saldo restante

↓

Backend cria checkout Mercado Pago

↓

Cliente realiza pagamento no Mercado Pago

↓

Mercado Pago processa pagamento

↓

Retorno para sistema

↓

Pagamento poderá ser confirmado manualmente

(futuramente via Webhook)


O sistema nunca recebe:

- número do cartão;
- CVV;
- senha;
- dados sensíveis.

---

# Integrações Externas

## Mercado Pago

Responsabilidade:

- processamento do cartão;
- parcelamento;
- segurança do pagamento.

O sistema apenas:

- cria checkout;
- recebe retorno;
- registra confirmação.

---

## Bancos

O sistema apenas exibe instruções de pagamento.

Configuração:

### Pix

Destino:

Banco Inter

:contentReference[oaicite:0]{index=0}

---

### Depósito

Destino:

Banco do Brasil

:contentReference[oaicite:1]{index=1}

---

### Cartão

Destino:

Mercado Pago

:contentReference[oaicite:2]{index=2}

---

# Segurança Arquitetural

A arquitetura deverá seguir os seguintes princípios:

## Backend como fonte de verdade

Nunca confiar no frontend.

Exemplo:

Errado:


Frontend envia:

Pagamento = R$500


Backend aceita diretamente.

---

Correto:


Frontend envia solicitação

↓

Backend valida:

projeto existe;
valor permitido;
usuário autorizado;

↓

Salva informação


---

# Controle de Acesso

## Administrador

Pode:

- criar projetos;
- visualizar projetos;
- registrar pagamentos;
- excluir projetos.

---

## Cliente

Pode:

- visualizar projeto;
- escolher pagamento;
- acessar informações públicas.

Não pode:

- alterar valores;
- registrar pagamentos;
- acessar dados administrativos.

---

# Geração de Links Públicos

Os links deverão utilizar identificadores seguros.

Exemplo:


/p/a83k92jd92k


Não utilizar:


/p/1
/p/2
/p/3


Objetivo:

Evitar descoberta de projetos.

---

# Modelo de Dados Simplificado

Relacionamentos:


Administrador

  |
  |
  N

Projetos

  |
  |
  N

Pagamentos


Um projeto possui:

- um cliente;
- um valor total;
- vários pagamentos.

---

# Princípios Arquiteturais

## Simplicidade

Evitar tecnologias desnecessárias.

---

## Baixo custo

Priorizar:

- serviços gratuitos;
- infraestrutura simples;
- poucas dependências.

---

## Escalabilidade

A arquitetura deve permitir futuramente:

- múltiplos administradores;
- empresas;
- notificações;
- webhooks;
- integrações financeiras.

---

## Manutenibilidade

O código deverá possuir:

- componentes reutilizáveis;
- serviços separados;
- documentação;
- padrões consistentes.

---

# Decisões Técnicas

## Escolha do Next.js

Motivos:

- frontend e backend no mesmo projeto;
- excelente desempenho;
- fácil hospedagem na Vercel;
- grande comunidade.

---

## Escolha do Supabase

Motivos:

- PostgreSQL;
- autenticação integrada;
- baixo custo;
- fácil desenvolvimento.

---

## Escolha do Mercado Pago

Motivos:

- processamento seguro;
- checkout externo;
- suporte a cartão;
- não exige armazenamento de dados sensíveis.

---

# Resumo da Arquitetura

| Camada | Tecnologia | Responsabilidade |
|-|-|-|
| Interface | Next.js + Tailwind | Experiência do usuário |
| Backend | API Routes | Regras e validações |
| Banco | Supabase PostgreSQL | Dados do sistema |
| Auth | Supabase Auth | Controle administrativo |
| Pagamentos | Mercado Pago | Processamento externo |
| Hospedagem | Vercel | Deploy da aplicação |

---

# Resultado Esperado

A arquitetura deverá permitir que o Payment Progress seja:

- simples para clientes;
- profissional para freelancers;
- seguro financeiramente;
- barato para operar;
- preparado para futuras evoluções.