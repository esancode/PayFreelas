# 08 - Webhooks

# Introdução

Este documento descreve o funcionamento dos Webhooks utilizados pelo sistema **Payment Progress** para receber notificações automáticas de serviços externos, principalmente do **Mercado Pago**.

Os Webhooks permitem que o sistema seja informado automaticamente quando um pagamento realizado através do checkout externo sofrer alguma alteração de status.

O objetivo é substituir futuramente a confirmação manual feita pelo administrador por uma confirmação automática e confiável.

---

# Objetivo

Permitir que o sistema receba eventos externos de pagamento e atualize automaticamente o progresso financeiro do projeto.

Exemplo:

Cliente realiza pagamento no Mercado Pago.

↓

Mercado Pago processa pagamento.

↓

Mercado Pago envia uma notificação para o sistema.

↓

Sistema valida o evento.

↓

Pagamento é registrado automaticamente.

↓

Progresso financeiro é atualizado.

---

# Escopo

Os Webhooks serão utilizados apenas para pagamentos realizados através do:

* Mercado Pago.

O sistema não utilizará Webhooks para:

* Pix manual;
* depósito bancário;
* pagamentos registrados manualmente.

Esses métodos continuam dependendo da confirmação do administrador.

---

# Arquitetura

Fluxo geral:

```
Cliente

↓

Checkout Mercado Pago

↓

Mercado Pago

↓

Webhook API

↓

Backend Payment Progress

↓

Banco de Dados

↓

Atualização do Projeto
```

---

# Endpoint do Webhook

O sistema deverá possuir um endpoint público responsável por receber notificações.

Exemplo:

```
POST

/api/webhooks/mercado-pago
```

Esse endpoint deverá:

* receber eventos enviados pelo Mercado Pago;
* validar autenticidade;
* identificar o pagamento;
* atualizar o registro financeiro.

---

# Eventos Recebidos

O sistema deverá trabalhar principalmente com eventos relacionados a pagamentos.

Exemplo:

```json
{
  "type": "payment",
  "data": {
    "id": "123456789"
  }
}
```

O identificador recebido será utilizado para consultar os detalhes do pagamento na API do Mercado Pago.

---

# Fluxo de Processamento

## 1. Receber Evento

O Mercado Pago envia uma notificação para o endpoint.

Exemplo:

```
Pagamento atualizado
```

---

## 2. Validar Evento

O backend deverá verificar:

* origem da requisição;
* assinatura do webhook;
* dados recebidos;
* existência do pagamento.

O sistema nunca deverá confiar apenas nos dados enviados pelo cliente ou frontend.

---

## 3. Consultar Mercado Pago

Após receber o ID do pagamento, o backend deverá consultar a API oficial do Mercado Pago para obter os dados reais.

Informações utilizadas:

* status;
* valor;
* data;
* identificador externo.

---

## 4. Identificar Projeto

O pagamento deverá possuir uma referência ao projeto relacionado.

Exemplo:

```
payment_id

↓

external_reference

↓

project_id
```

Essa referência permitirá saber qual projeto deve ser atualizado.

---

## 5. Registrar Pagamento

Caso o pagamento esteja confirmado, o sistema deverá criar um registro financeiro.

Dados:

* projeto;
* valor;
* método;
* data;
* identificador Mercado Pago;
* origem automática.

---

## 6. Atualizar Progresso

Após registrar o pagamento:

Atualizar:

* valor pago;
* valor restante;
* percentual concluído;
* histórico.

---

# Status de Pagamento

O sistema deverá considerar apenas pagamentos aprovados como pagamentos concluídos.

Exemplo:

| Status Mercado Pago | Ação                 |
| ------------------- | -------------------- |
| approved            | Registrar pagamento  |
| pending             | Aguardar confirmação |
| in_process          | Aguardar confirmação |
| rejected            | Não registrar        |
| cancelled           | Não registrar        |

---

# Prevenção de Duplicidade

O sistema deverá impedir que o mesmo pagamento seja registrado duas vezes.

Regra:

Cada pagamento do Mercado Pago deverá possuir um identificador único.

Exemplo:

```
mercado_pago_payment_id
```

Antes de criar um novo registro:

Consultar se o pagamento já existe.

Caso exista:

* ignorar novo evento;
* manter registro atual.

---

# Histórico Financeiro

Pagamentos automáticos deverão seguir as mesmas regras dos pagamentos manuais.

O histórico deverá armazenar:

* valor;
* método;
* data;
* origem;
* identificação externa.

Exemplo:

```
Pagamento recebido

Valor:
R$ 200

Método:
Cartão de Crédito

Origem:
Mercado Pago

ID:
123456789
```

---

# Segurança

O Webhook deverá seguir os requisitos de segurança do sistema.

## Nunca armazenar:

* número do cartão;
* CVV;
* senha;
* dados bancários do cliente.

---

## Validações obrigatórias

O backend deverá validar:

* assinatura do Mercado Pago;
* existência do projeto;
* valor recebido;
* status do pagamento;
* duplicidade.

---

# Falhas e Reprocessamento

O sistema deverá considerar que notificações podem falhar.

Possíveis situações:

* servidor indisponível;
* timeout;
* erro interno;
* evento recebido fora de ordem.

---

## Estratégia

Caso ocorra erro:

* retornar código adequado;
* permitir reenvio pelo Mercado Pago;
* registrar logs do evento.

---

# Logs

O sistema deverá registrar eventos recebidos.

Informações:

* data;
* tipo do evento;
* ID recebido;
* resultado do processamento;
* erro ocorrido.

Objetivo:

Facilitar:

* depuração;
* auditoria;
* manutenção.

---

# Integração com Checkout

Quando o sistema criar um checkout Mercado Pago, deverá enviar uma referência do projeto.

Exemplo:

```
external_reference:

project_8f81d2f2e
```

Essa informação será retornada pelo webhook para vincular automaticamente o pagamento.

---

# Regras de Negócio

## RNW001 - Somente pagamentos aprovados atualizam saldo

Pagamentos pendentes não alteram o progresso.

---

## RNW002 - Valores devem ser validados

O valor recebido não poderá ultrapassar o saldo restante do projeto.

Caso aconteça:

* registrar ocorrência;
* não atualizar automaticamente.

---

## RNW003 - Histórico nunca deve ser apagado

Pagamentos automáticos seguem a mesma regra de histórico imutável.

---

## RNW004 - Webhook não substitui segurança

O sistema sempre deverá confirmar informações através da API do Mercado Pago.

---

# MVP

No MVP:

* Webhook pode existir preparado para integração futura;
* confirmação manual continua sendo aceita;
* pagamentos via cartão podem ser conferidos pelo administrador.

---

# Futuro

Evoluções possíveis:

* confirmação automática completa;
* notificações ao cliente;
* atualização em tempo real;
* reconciliação automática;
* relatórios financeiros.

---

# Conclusão

Os Webhooks permitem que o Payment Progress evolua de um sistema de acompanhamento manual para uma plataforma integrada com pagamentos externos.

A responsabilidade do sistema continua sendo apenas acompanhar o progresso financeiro.

O processamento do pagamento permanece sob responsabilidade do Mercado Pago.
