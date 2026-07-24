# 01 - Requisitos Funcionais

# Introdução

Este documento descreve os requisitos funcionais do sistema Payment Progress.

Os requisitos definem as funcionalidades que o sistema deverá disponibilizar para administradores e clientes.

O sistema tem como objetivo permitir o acompanhamento transparente do progresso financeiro de projetos, sem realizar processamento próprio de pagamentos.

---

# Atores do Sistema

## Administrador

Usuário responsável pelo gerenciamento dos projetos.

Responsável por:

- criar projetos;
- registrar pagamentos;
- acompanhar progresso financeiro;
- compartilhar links;
- gerenciar informações.

---

## Cliente

Usuário final que acompanha um projeto através de um link público.

Responsável apenas por:

- visualizar informações;
- escolher uma forma de pagamento;
- realizar pagamentos através de serviços externos.

O cliente não possui conta, login ou permissões administrativas.

---

# Requisitos Funcionais

---

# RF001 - Criar Projeto

## Descrição

O sistema deverá permitir que o administrador crie um novo projeto financeiro.

## Dados obrigatórios

O administrador deverá informar:

- nome do projeto;
- valor total do projeto;
- nome do cliente.

## Resultado esperado

Após a criação:

- o projeto deverá ser armazenado;
- deverá possuir um identificador único;
- deverá ser gerado um link público de acompanhamento.

Exemplo:


https://app.com/p/8f81d2f2e


---

# RF002 - Gerar Link Público

## Descrição

O sistema deverá gerar automaticamente um link único para cada projeto.

## Regras

- O link deverá permitir acesso sem login.
- O cliente não poderá acessar informações administrativas.
- O identificador do projeto não poderá ser previsível.

## Objetivo

Permitir que o administrador envie apenas um link para o cliente acompanhar o projeto.

---

# RF003 - Visualizar Projeto Público

## Descrição

O cliente deverá conseguir visualizar as informações financeiras do projeto através do link público.

## Informações exibidas

A página deverá apresentar:

- nome do projeto;
- valor total;
- valor pago;
- valor restante;
- progresso financeiro;
- histórico de pagamentos;
- formas de pagamento disponíveis.

---

# RF004 - Exibir Progresso Financeiro

## Descrição

O sistema deverá calcular e apresentar visualmente o progresso do pagamento.

## Cálculo


(valor pago / valor total) × 100


## Exemplo

Projeto:

R$ 1.000

Pago:

R$ 400

Resultado:

40% concluído.

---

# RF005 - Registrar Pagamento Manualmente

## Descrição

O administrador deverá conseguir registrar pagamentos recebidos manualmente.

## Formas aceitas

- Pix;
- depósito;
- cartão de crédito.

## Dados do pagamento

O registro deverá possuir:

- valor;
- método de pagamento;
- data;
- observação opcional.

---

# RF006 - Atualizar Progresso Automaticamente

## Descrição

Após um novo pagamento ser registrado, o sistema deverá atualizar automaticamente:

- valor pago;
- valor restante;
- porcentagem concluída;
- histórico.

---

# RF007 - Manter Histórico de Pagamentos

## Descrição

O sistema deverá manter um histórico completo de todos os pagamentos realizados.

## Regras

- pagamentos nunca deverão ser apagados silenciosamente;
- alterações financeiras deverão gerar novos registros;
- o histórico deverá permanecer confiável.

---

# RF008 - Permitir Pagamento Parcial

## Descrição

O sistema deverá permitir que o cliente realize pagamentos parciais até completar o valor total do projeto.

## Exemplo

Projeto:

R$ 1.000

Pagamentos:

- R$ 200;
- R$ 150;
- R$ 300;
- R$ 350.

Total:

R$ 1.000.

---

# RF009 - Escolher Valor do Pagamento

## Descrição

Quando o cliente escolher cartão de crédito, o sistema deverá permitir que ele informe quanto deseja pagar.

## Fluxo

Cliente seleciona:


Cartão de Crédito


↓

Sistema pergunta:


Quanto deseja pagar?


↓

Cliente informa um valor.

↓

Sistema cria um checkout externo.

---

# RF010 - Validar Valor Informado

## Descrição

O sistema deverá impedir pagamentos superiores ao saldo restante.

## Regras

Permitido:

Saldo restante:

R$ 450

Valores:

- R$ 50;
- R$ 100;
- R$ 450.

Não permitido:

- R$ 451;
- R$ 600;
- R$ 1.000.

---

# RF011 - Integrar Pagamento com Mercado Pago

## Descrição

O sistema deverá criar pagamentos via Mercado Pago utilizando checkout externo.

## Regras

O sistema:

- não processa cartões;
- não armazena cartões;
- não recebe dados sensíveis.

O pagamento deverá ocorrer dentro do ambiente oficial do Mercado Pago.

---

# RF012 - Exibir Informações de Pagamento

## Descrição

O cliente deverá visualizar instruções para pagamento.

## Pix

Exibir informações necessárias para pagamento via Pix.

Após receber o valor, o administrador registra manualmente.

O pagamento via Pix deverá cair no banco Inter do administrador. :contentReference[oaicite:2]{index=2}

---

## Depósito

Exibir dados bancários para depósito.

Após confirmação do recebimento, o administrador registra manualmente.

Depósitos deverão utilizar o Banco do Brasil do administrador. :contentReference[oaicite:3]{index=3}

---

## Cartão

Redirecionar para checkout Mercado Pago.

Pagamentos via cartão deverão cair no Mercado Pago do administrador. :contentReference[oaicite:4]{index=4}

---

# RF013 - Copiar Link do Projeto

## Descrição

O administrador deverá conseguir copiar facilmente o link público do projeto.

## Objetivo

Facilitar o envio para clientes através de aplicativos como WhatsApp.

---

# RF014 - Excluir Projeto

## Descrição

O administrador deverá conseguir excluir projetos.

## Regras

- somente administradores podem excluir;
- clientes nunca possuem essa permissão.

---

# RF015 - Acesso Administrativo

## Descrição

O sistema deverá possuir uma área administrativa protegida.

## Permissões

Somente administradores autenticados poderão:

- criar projetos;
- registrar pagamentos;
- excluir projetos;
- visualizar gerenciamento.

---

# RF016 - Acesso do Cliente Sem Cadastro

## Descrição

O cliente deverá acessar o projeto sem criar conta.

## Regras

O cliente não deverá precisar:

- criar usuário;
- criar senha;
- instalar aplicativo;
- realizar login.

---

# RF017 - Contato via WhatsApp

## Descrição

O sistema deverá permitir que o cliente entre em contato com o administrador através do WhatsApp.

## Objetivo

Facilitar comunicação caso existam dúvidas.

---

# RF018 - Atualização Consistente das Informações

## Descrição

Toda alteração financeira deverá refletir imediatamente nos dados exibidos.

## Informações afetadas:

- progresso;
- valor pago;
- saldo restante;
- histórico.

---

# Fora do Escopo

As funcionalidades abaixo NÃO fazem parte do MVP:

- processamento próprio de cartão;
- armazenamento de cartões;
- cobrança automática;
- emissão de boletos;
- conciliação bancária;
- ERP;
- CRM;
- sistema bancário.

---

# Resumo dos Requisitos

| Código | Funcionalidade |
|-|-|
| RF001 | Criar projeto |
| RF002 | Gerar link público |
| RF003 | Visualizar projeto |
| RF004 | Mostrar progresso |
| RF005 | Registrar pagamentos |
| RF006 | Atualizar progresso |
| RF007 | Histórico financeiro |
| RF008 | Pagamentos parciais |
| RF009 | Escolher valor no cartão |
| RF010 | Validar saldo |
| RF011 | Mercado Pago |
| RF012 | Informações de pagamento |
| RF013 | Copiar link |
| RF014 | Excluir projeto |
| RF015 | Área administrativa |
| RF016 | Acesso sem cadastro |
| RF017 | WhatsApp |
| RF018 | Consistência financeira |