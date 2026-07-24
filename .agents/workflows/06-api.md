# 06 - API

# Introdução

Este documento descreve a API do sistema Payment Progress.

A API será responsável por controlar toda a lógica de negócio do sistema, incluindo:

- criação de projetos;
- gerenciamento de pagamentos;
- cálculo financeiro;
- geração de links públicos;
- integração com serviços externos.

A API será construída utilizando:

- Next.js API Routes;
- TypeScript;
- Supabase;
- PostgreSQL.

A API NÃO processa pagamentos diretamente.

A API NÃO armazena dados de cartão.

A API apenas cria integrações externas quando necessário.

---

# Princípios da API

A API deverá seguir os seguintes princípios:

## Segurança

Toda regra financeira deverá existir no backend.

O frontend nunca deverá ser considerado confiável.

Exemplos:

- valores enviados pelo cliente;
- permissões;
- criação de pagamentos;
- alterações financeiras.

---

## Simplicidade

A API deverá possuir poucos endpoints.

O MVP deve evitar complexidade desnecessária.

---

## Consistência

Todas as informações financeiras devem ser calculadas pelo servidor.

Nunca confiar em valores calculados pelo frontend.

---

# Base URL

Exemplo:


https://api.app.com


Durante desenvolvimento:


http://localhost:3000/api


---

# Autenticação

## Administrador

Rotas administrativas exigem autenticação.

Método:

Supabase Auth.

O administrador autenticado poderá:

- criar projetos;
- registrar pagamentos;
- visualizar gerenciamento;
- excluir projetos.

---

## Cliente

O cliente NÃO possui autenticação.

O acesso acontece através do link público:


/p/{public_id}


O identificador público deverá ser seguro e não previsível.

---

# Estrutura de Resposta

Todas as respostas deverão seguir o padrão:

## Sucesso

```json
{
  "success": true,
  "data": {}
}
Erro
{
  "success": false,
  "error": {
    "message": "Mensagem do erro"
  }
}
Projetos
POST /api/projects
Criar Projeto

Cria um novo projeto financeiro.

Permissão

Administrador autenticado.

Request
{
  "nome": "Website Cliente X",
  "cliente": "João Silva",
  "valor_total": 1000
}
Validações

O backend deverá validar:

nome obrigatório;
cliente obrigatório;
valor maior que zero.
Response
{
  "success": true,
  "data": {
    "id": "uuid",
    "public_id": "8f81d2f2e",
    "link": "/p/8f81d2f2e"
  }
}
GET /api/projects/:id
Buscar Projeto Administrativo

Retorna informações completas do projeto.

Permissão

Administrador autenticado.

Response
{
  "id": "uuid",
  "nome": "Projeto X",
  "cliente": "João",
  "valor_total": 1000,
  "valor_pago": 400,
  "saldo_restante": 600
}
GET /api/public/projects/:public_id
Buscar Projeto Público

Retorna informações que o cliente pode visualizar.

Permissão

Público.

Sem login.

Dados retornados
nome do projeto;
valor total;
valor pago;
saldo restante;
progresso;
histórico;
formas de pagamento.
Não retornar

Nunca enviar:

dados administrativos;
informações internas;
credenciais;
configurações.
DELETE /api/projects/:id
Excluir Projeto

Remove um projeto.

Permissão

Administrador autenticado.

Regras

Somente administrador pode executar.

Clientes nunca possuem permissão.

Pagamentos
POST /api/projects/:id/payments
Registrar Pagamento

Registra um pagamento recebido.

Permissão

Administrador autenticado.

Request
{
  "valor": 200,
  "metodo": "pix",
  "observacao": "Pagamento inicial"
}
Métodos aceitos
pix
deposito
cartao
Validações

O backend deverá verificar:

valor maior que zero;
valor não ultrapassa saldo restante;
projeto existente.
Response
{
  "success": true,
  "payment": {
    "id": "uuid",
    "valor": 200
  }
}
GET /api/projects/:id/payments
Histórico de Pagamentos

Retorna todos os pagamentos registrados.

Regras

O histórico deve permanecer confiável.

Pagamentos não devem desaparecer silenciosamente.

Mercado Pago
POST /api/payment/create-checkout
Criar Checkout Mercado Pago

Cria um pagamento externo.

Permissão

Cliente através do projeto público.

Fluxo

Cliente:

Seleciona cartão.

↓

Informa valor.

↓

API valida saldo.

↓

API cria checkout Mercado Pago.

↓

Cliente é enviado para ambiente externo.

Request
{
  "public_id": "8f81d2f2e",
  "valor": 200
}
Validações

O backend deverá garantir:

Valor informado <= saldo restante.

Exemplo:

Saldo:

R$ 450

Permitido:

R$ 200

Não permitido:

R$ 500

Response
{
  "success": true,
  "checkout_url": "https://mercadopago.com/checkout"
}
Cálculos Financeiros

Todos os cálculos deverão ser realizados no backend.

Valor Pago
SUM(pagamentos.valor)
Saldo Restante
valor_total - valor_pago
Progresso
(valor_pago / valor_total) * 100
Informações de Pagamento

A API deverá disponibilizar informações conforme método escolhido.

Pix

Retornar instruções cadastradas.

O pagamento será recebido no banco Inter do administrador.

Após confirmação:

Administrador registra pagamento manualmente.

Depósito

Retornar dados bancários.

Após confirmação:

Administrador registra pagamento manualmente.

Depósitos utilizarão Banco do Brasil.

Cartão

A API deverá retornar checkout externo Mercado Pago.

O pagamento será processado pelo Mercado Pago.

O sistema nunca recebe dados do cartão.

O valor deverá cair no Mercado Pago do administrador.

Códigos de Erro
Código	Descrição
400	Dados inválidos
401	Não autenticado
403	Sem permissão
404	Recurso não encontrado
409	Conflito financeiro
500	Erro interno
Segurança

A API deverá:

validar todas as entradas;
proteger rotas administrativas;
utilizar variáveis privadas no servidor;
nunca expor chaves secretas;
nunca armazenar cartão;
nunca confiar no frontend.
Futuras Extensões

A arquitetura deverá permitir futuramente:

Webhooks Mercado Pago;
confirmação automática;
notificações;
múltiplos administradores;
múltiplas empresas;
integrações adicionais.
Resumo dos Endpoints
Método	Endpoint	Função
POST	/projects	Criar projeto
GET	/projects/:id	Buscar projeto
GET	/public/projects/:id	Projeto público
DELETE	/projects/:id	Excluir projeto
POST	/projects/:id/payments	Registrar pagamento
GET	/projects/:id/payments	Histórico
POST	/payment/create-checkout	Criar checkout Mercado Pago