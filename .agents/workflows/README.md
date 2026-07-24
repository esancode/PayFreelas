# Payment Progress

> Portal minimalista para freelancers acompanharem projetos e pagamentos de forma profissional.

## Sobre o Projeto

O **Payment Progress** é uma plataforma criada para facilitar o acompanhamento financeiro de projetos entre freelancers e clientes.

O sistema permite que um freelancer crie um projeto, acompanhe pagamentos recebidos e compartilhe um link público para que o cliente visualize:

* valor total do projeto;
* valor já pago;
* valor restante;
* progresso financeiro;
* histórico de pagamentos;
* formas disponíveis de pagamento.

O objetivo é substituir o controle manual feito por mensagens, planilhas e anotações, oferecendo uma experiência simples, transparente e profissional.

---

# Principais Características

## Para Administradores

* Criar projetos;
* Definir valor total;
* Associar cliente ao projeto;
* Gerar link público;
* Registrar pagamentos manualmente;
* Acompanhar progresso financeiro;
* Visualizar histórico;
* Excluir projetos.

---

## Para Clientes

O cliente não precisa criar conta ou realizar login.

Através de um único link público poderá:

* visualizar o projeto;
* acompanhar o progresso;
* consultar valores;
* visualizar histórico;
* escolher uma forma de pagamento;
* entrar em contato com o administrador.

---

# Pagamentos

O sistema funciona como uma plataforma de acompanhamento financeiro.

Ele **não processa pagamentos diretamente** e **não armazena dados sensíveis**.

## Pix

O cliente recebe as informações para pagamento via Pix.

Após o recebimento, o administrador registra o pagamento manualmente.

O valor recebido via Pix deverá cair no banco Inter do administrador.

---

## Depósito

O cliente recebe os dados bancários para realizar depósito.

Após confirmação do recebimento, o administrador registra manualmente.

Depósitos deverão utilizar o Banco do Brasil do administrador.

---

## Cartão de Crédito

Os pagamentos via cartão utilizam integração com o Mercado Pago.

Fluxo:

1. Cliente seleciona cartão de crédito;
2. Sistema pergunta quanto deseja pagar;
3. Cliente informa o valor;
4. Sistema cria um checkout externo;
5. Cliente escolhe parcelamento e realiza pagamento no Mercado Pago.

O sistema nunca:

* armazena cartão;
* recebe número do cartão;
* processa pagamento internamente.

Os valores pagos via cartão deverão cair no Mercado Pago do administrador.

---

# Pagamentos Parciais

O cliente possui liberdade para pagar qualquer valor até completar o projeto.

Exemplo:

Projeto:

R$ 1.000

Pagamentos:

* R$ 200;
* R$ 150;
* R$ 300;
* R$ 350.

Total:

R$ 1.000.

O sistema não trabalha com parcelas fixas.

---

# Stack Utilizada

## Frontend

* Next.js
* TypeScript
* TailwindCSS

## Backend

* Next.js API Routes

## Banco de Dados

* PostgreSQL
* Supabase

## Autenticação

* Supabase Auth

## Hospedagem

* Vercel

---

# Estrutura da Documentação

```
docs/

├── 00-visao-geral.md
├── 01-requisitos-funcionais.md
├── 02-requisitos-nao-funcionais.md
├── 03-layout-ui.md
├── 04-arquitetura.md
├── 05-banco-de-dados.md
├── 06-api.md
├── 07-integracao-mercado-pago.md
├── 08-webhooks.md
├── 09-seguranca.md
├── 10-painel-admin.md
├── 11-painel-cliente.md
├── 12-plano-de-implementacao.md
├── 13-testes-manuais.md
├── 14-futuras-features.md
└── README.md
```

---

# Objetivo do MVP

O MVP será considerado concluído quando:

✅ Administrador conseguir criar projetos.

✅ Sistema gerar links públicos únicos.

✅ Cliente conseguir acessar sem cadastro.

✅ Administrador conseguir registrar pagamentos.

✅ Progresso financeiro atualizar automaticamente.

✅ Histórico permanecer consistente.

✅ Interface transmitir profissionalismo.

---

# Segurança

O sistema segue princípios de segurança:

Nunca armazenar:

* dados de cartão;
* CVV;
* senhas bancárias;
* informações sensíveis.

Todas as validações financeiras devem ocorrer no backend.

Links públicos devem utilizar identificadores seguros e não previsíveis.

O histórico financeiro deve permanecer rastreável, sem exclusões silenciosas.

---

# Princípios do Projeto

## Simplicidade

Mostrar apenas o que o usuário precisa saber.

## Clareza

Sempre informar:

* quanto custa;
* quanto foi pago;
* quanto falta.

## Confiança

O histórico financeiro deve ser transparente e confiável.

## Profissionalismo

A interface deve transmitir uma experiência SaaS premium.

## Baixa Complexidade

O MVP deve ser simples, rápido e fácil de manter.

---

# Identidade Visual

A interface segue inspiração em:

## Apple

* minimalismo;
* tipografia limpa;
* bastante espaço negativo;
* componentes consistentes.

## Mercado Pago

* cartões informativos;
* hierarquia visual forte;
* foco na informação.

A experiência deve ser:

* moderna;
* limpa;
* responsiva;
* profissional.

---

# Futuras Evoluções

Possíveis melhorias futuras:

* confirmação automática de pagamentos;
* webhooks Mercado Pago;
* notificações;
* anexos;
* cronograma de projetos;
* contratos;
* emissão de notas;
* múltiplos administradores;
* múltiplas empresas;
* SaaS multi-tenant.

Essas funcionalidades não fazem parte do MVP inicial.

---

# Licença

Projeto privado.

Todos os direitos reservados.
