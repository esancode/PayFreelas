# 07 - Integração Mercado Pago

# Introdução

Este documento descreve a integração do Payment Progress com o Mercado Pago para processamento de pagamentos via cartão de crédito.

O Mercado Pago será utilizado exclusivamente como provedor externo de pagamento.

O sistema:

- NÃO processa cartões;
- NÃO armazena dados de cartão;
- NÃO recebe número de cartão;
- NÃO recebe CVV;
- NÃO realiza cobrança própria.

Toda transação financeira acontecerá dentro do ambiente oficial do Mercado Pago.

O objetivo da integração é permitir que o cliente escolha qualquer valor para pagamento parcial de um projeto e realize o pagamento através de cartão de crédito.

---

# Objetivo

Permitir que o cliente:

- escolha cartão de crédito como forma de pagamento;
- informe quanto deseja pagar;
- seja direcionado para um checkout seguro do Mercado Pago;
- escolha a quantidade de parcelas;
- finalize o pagamento externamente.

O sistema continuará sendo apenas uma plataforma de acompanhamento financeiro.

---

# Fluxo Geral

Fluxo de pagamento:

Cliente acessa projeto.

↓

Visualiza saldo restante.

↓

Seleciona:

"Cartão de Crédito"

↓

Sistema solicita:

"Quanto deseja pagar?"

↓

Cliente informa o valor.

↓

Backend valida o valor informado.

↓

Sistema cria uma preferência de pagamento no Mercado Pago.

↓

Cliente é redirecionado para checkout oficial.

↓

Cliente informa:

- dados do cartão;
- quantidade de parcelas;
- informações solicitadas pelo Mercado Pago.

↓

Mercado Pago processa o pagamento.

↓

Resultado retorna ao sistema.

↓

Pagamento poderá ser confirmado automaticamente futuramente através de Webhooks.

---

# Regra Principal

O cliente não é obrigado a pagar o valor total do projeto.

O pagamento deve ser flexível.

Exemplo:

Projeto:

R$ 1.000

Saldo restante:

R$ 1.000

Cliente deseja pagar:

R$ 200

O sistema deverá criar um pagamento de:

R$ 200

Não de:

R$ 1.000

---

# Escolha do Valor

Antes de criar qualquer pagamento no Mercado Pago, o sistema deverá solicitar o valor desejado.

Exemplo de interface:


Quanto deseja pagar?

R$ [________]

Saldo restante: R$ 800


---

# Validação do Valor

A validação deverá acontecer obrigatoriamente no backend.

Nunca confiar apenas no frontend.

## Regras

O valor informado deverá ser:

- maior que zero;
- menor ou igual ao saldo restante;
- um valor numérico válido.

---

## Exemplos

Projeto:

R$ 1.000

Pago:

R$ 550

Saldo:

R$ 450


Permitido:

- R$ 50
- R$ 100
- R$ 450


Bloqueado:

- R$ 0
- R$ 451
- R$ 600
- R$ 1.000

---

# Criação do Pagamento

Quando o cliente confirmar o valor, o backend deverá criar uma preferência de pagamento no Mercado Pago.

Dados enviados:

- valor do pagamento;
- identificação do projeto;
- identificação interna da transação;
- descrição do pagamento.

---

# Dados Internos

Cada pagamento deverá possuir uma referência interna.

Exemplo:


payment_progress_project_id

payment_transaction_id

mercado_pago_preference_id


Objetivo:

Permitir relacionar:

Projeto

↓

Pagamento interno

↓

Pagamento Mercado Pago

---

# Checkout Externo

O pagamento deverá acontecer completamente dentro do checkout do Mercado Pago.

O cliente poderá escolher:

- cartão de crédito;
- número de parcelas;
- dados necessários para pagamento.

O sistema nunca deverá criar uma tela própria para inserir cartão.

---

# Retorno do Mercado Pago

Após finalizar o pagamento, o Mercado Pago poderá retornar estados como:

## Aprovado

Pagamento confirmado.

## Pendente

Pagamento aguardando confirmação.

## Recusado

Pagamento não aprovado.

---

# Estados do Pagamento

O sistema deverá possuir controle interno dos estados.

Exemplo:


pending

approved

rejected

cancelled


---

# Pagamento Aprovado

Quando um pagamento for aprovado:

O sistema deverá:

- registrar a transação;
- atualizar o valor pago;
- atualizar o saldo restante;
- atualizar o histórico.

---

# Pagamento Pendente

Quando estiver pendente:

O sistema deverá:

- manter como aguardando confirmação;
- não adicionar ao valor pago;
- aguardar atualização futura.

---

# Pagamento Recusado

Quando recusado:

O sistema deverá:

- manter o projeto sem alteração financeira;
- informar que o pagamento não foi concluído.

---

# Webhooks

A confirmação automática dos pagamentos será realizada futuramente através de Webhooks.

O webhook será responsável por:

- receber notificações do Mercado Pago;
- validar o evento;
- consultar o pagamento;
- atualizar o status interno.

Documento relacionado:


08-webhooks.md


---

# Segurança

A integração deverá seguir as seguintes regras:

Nunca armazenar:

- número do cartão;
- validade do cartão;
- CVV;
- senha;
- dados bancários.

Nunca confiar:

- valor enviado pelo frontend;
- status informado pelo cliente;
- parâmetros manipuláveis.

Todas as validações financeiras deverão acontecer no backend.

---

# Variáveis Sensíveis

As credenciais do Mercado Pago deverão permanecer protegidas.

Exemplo:


MERCADO_PAGO_ACCESS_TOKEN


Regras:

- armazenar somente no ambiente seguro;
- nunca enviar para o frontend;
- nunca publicar no repositório.

---

# Banco de Dados

A tabela de pagamentos deverá armazenar informações necessárias para rastreamento.

Exemplo:

| Campo | Descrição |
|-|-|
| id | Identificador interno |
| projeto_id | Projeto relacionado |
| valor | Valor pago |
| metodo | Cartão |
| status | Estado do pagamento |
| mercado_pago_id | ID externo |
| criado_em | Data criação |

---

# Conta de Recebimento

Pagamentos realizados via cartão deverão cair diretamente na conta Mercado Pago do administrador.

O sistema apenas cria e acompanha a transação.

---

# Limitações do MVP

A integração inicial NÃO deverá possuir:

- confirmação automática obrigatória;
- assinatura recorrente;
- cobrança automática;
- parcelamentos internos;
- armazenamento de cartões;
- gerenciamento financeiro completo.

---

# Futuras Melhorias

Possíveis evoluções:

- confirmação automática via Webhooks;
- notificações de pagamento;
- recibos automáticos;
- múltiplas contas Mercado Pago;
- relatórios financeiros;
- histórico detalhado das transações.

---

# Critérios de Sucesso

A integração será considerada concluída quando:

✅ Cliente conseguir escolher cartão de crédito.

✅ Cliente conseguir informar qualquer valor válido.

✅ Sistema impedir valores acima do saldo restante.

✅ Sistema criar checkout Mercado Pago.

✅ Cliente conseguir pagar no ambiente oficial.

✅ Sistema conseguir identificar a transação.

✅ Nenhum dado sensível de cartão for armazenado.

---

# Resumo

A integração com Mercado Pago permite que o Payment Progress ofereça pagamentos flexíveis através de cartão de crédito.

O sistema não substitui o Mercado Pago.

Ele apenas conecta o acompanhamento financeiro do projeto com um serviço externo especializado em pagamentos.

A responsabilidade do Payment Progress é:

- mostrar o valor;
- criar a intenção de pagamento;
- acompanhar o resultado.

A responsabilidade do Mercado Pago é:

- processar o cartão;
- validar a transação;
- proteger os dados financeiros.