# 14 - Treinamento Antigravity

# Objetivo

Este documento define como o Antigravity deverá atuar durante o desenvolvimento do projeto Payment Progress.

O Antigravity deve funcionar como um agente de implementação guiada, seguindo o plano de implementação definido no arquivo:

`12-plano-de-implementacao.md`

Ele NÃO deve tentar desenvolver todo o sistema de uma vez.

A implementação deve acontecer em etapas controladas.

---

# Regra Principal

O Antigravity sempre deverá seguir esta ordem:

1. Ler documentação existente.
2. Identificar a etapa atual do plano de implementação.
3. Executar somente a etapa atual.
4. Validar o resultado.
5. Solicitar aprovação antes de avançar.
6. Parar sempre que depender de uma ação manual do usuário.

---

# Nunca Fazer

O Antigravity nunca deve:

- pular etapas do plano;
- criar funcionalidades fora do escopo;
- alterar arquitetura sem autorização;
- instalar serviços externos sem solicitar;
- criar integrações sem possuir as chaves necessárias;
- assumir valores de configuração;
- continuar após uma dependência manual pendente.

---

# Fonte da Verdade

A documentação do projeto sempre possui prioridade.

A ordem de consulta deve ser:

1. `00-visao-geral.md`
2. `01-requisitos-funcionais.md`
3. `02-requisitos-nao-funcionais.md`
4. `03-layout-ui.md`
5. `04-arquitetura.md`
6. `05-banco-de-dados.md`
7. `06-api.md`
8. `07-integracao-mercado-pago.md`
9. `08-webhooks.md`
10. `09-seguranca.md`
11. `10-painel-admin.md`
12. `11-painel-cliente.md`
13. `12-plano-de-implementacao.md`
14. `13-testes-manuais.md`

---

# Modo de Execução

O Antigravity deve trabalhar em modo:

## Implementação Incremental Controlada

Cada etapa deve possuir:

- objetivo;
- arquivos envolvidos;
- alterações necessárias;
- implementação;
- validação;
- resultado esperado.

Após concluir:

O Antigravity deve parar.

Exemplo:


Etapa 01 concluída.

Foram realizados:

criação do projeto Next.js;
configuração TypeScript;
configuração TailwindCSS.

Próxima etapa depende de:

[ação manual necessária]

Aguardando confirmação.


---

# Sistema de Pausa Obrigatória

O Antigravity deve interromper imediatamente quando precisar de qualquer ação externa.

Exemplos:

- criar conta;
- fornecer API Key;
- fornecer token;
- configurar domínio;
- configurar banco;
- configurar Mercado Pago;
- configurar Supabase;
- realizar login;
- aprovar alteração;
- testar manualmente.

---

# Formato da Solicitação Manual

Quando precisar de uma ação do usuário, nunca apenas diga:

"Preciso da chave".

Deve explicar:

## O que é necessário

Exemplo:


Preciso da chave privada do Mercado Pago para criar pagamentos via checkout externo.


## Por que é necessário


Essa chave permite que o backend crie pagamentos no ambiente oficial do Mercado Pago.


## Onde encontrar

Exemplo:

Acesse o painel do Mercado Pago.
Entre em Desenvolvedores.
Abra Aplicações.
Selecione a aplicação criada.
Copie a Access Token de produção.

## Onde colocar

Exemplo:


A chave deverá ser enviada para configurar:

.env.local

MERCADO_PAGO_ACCESS_TOKEN=


## O que acontecerá depois

Exemplo:


Após receber a chave, continuarei a implementação da integração.


---

# Nunca Solicitar Dados Sensíveis

O Antigravity nunca deve solicitar:

- senha;
- cartão;
- CVV;
- senha bancária;
- código de autenticação pessoal;
- chave privada pessoal não relacionada ao sistema.

---

# Integrações Externas

Toda integração externa deve seguir:

Preparação:

↓

Solicitar credenciais

↓

Aguardar usuário

↓

Configurar ambiente

↓

Testar

↓

Continuar implementação

---

# Mercado Pago

Regras específicas:

O sistema utiliza Mercado Pago apenas para checkout externo.

O Antigravity nunca deve:

- armazenar cartão;
- receber número de cartão;
- receber CVV;
- criar sistema próprio de pagamento.

Fluxo esperado:

Cliente escolhe cartão.

↓

Sistema pergunta:

"Quanto deseja pagar?"

↓

Cliente informa valor.

↓

Backend cria checkout Mercado Pago.

↓

Cliente paga dentro do Mercado Pago.

---

# Supabase

Quando precisar configurar Supabase:

O Antigravity deve solicitar:

- URL do projeto Supabase;
- chave pública quando necessária;
- chave privada quando necessária.

Sempre explicar:

- onde encontrar;
- onde inserir;
- qual arquivo será alterado.

---

# Banco de Dados

Antes de criar tabelas:

O Antigravity deve:

1. Ler `05-banco-de-dados.md`.
2. Confirmar estrutura.
3. Criar migrations.
4. Validar relacionamentos.

Nunca criar tabelas improvisadas.

---

# Desenvolvimento

Durante implementação:

Sempre informar:


Executando:

Plano:

Etapa X

Objetivo:

Descrição

Arquivos alterados:

Lista

Status:

Em andamento


---

# Antes de Alterações Grandes

Antes de:

- mudar arquitetura;
- trocar biblioteca;
- alterar banco;
- modificar fluxo financeiro;

O Antigravity deve parar e perguntar.

Formato:


Foi identificado um possível impacto arquitetural.

Alteração proposta:

...

Motivo:

...

Impactos:

...

Deseja continuar?


---

# Testes

Após cada etapa:

Executar testes previstos.

Caso seja necessário teste manual:

Parar.

Exemplo:


A implementação foi concluída.

Agora preciso que você realize um teste manual:

Abra:
http://localhost:3000
Clique em:

Criar projeto

Informe:

Nome:
Teste

Valor:
1000

Confirme o resultado esperado:

Projeto criado e link público gerado.

Quando concluir, informe o resultado.


---

# Erros

Quando encontrar erro:

Não esconder.

Informar:

- erro encontrado;
- causa provável;
- tentativa realizada;
- próxima ação.

Exemplo:


Erro encontrado:

Supabase retornou erro de autenticação.

Tentativa:

validação da URL;
revisão das variáveis de ambiente.

Necessário:

Confirmar configuração das chaves.


---

# Controle de Escopo

O Antigravity deve lembrar:

Este é um MVP.

Não implementar:

- CRM;
- ERP;
- cobrança automática;
- boletos;
- conciliação bancária;
- aplicativo mobile;
- funcionalidades futuras.

Somente implementar o definido na documentação.

---

# Critério Para Avançar

Uma etapa só pode ser considerada concluída quando:

✅ Código implementado.

✅ Código funcionando.

✅ Teste realizado.

✅ Documentação atualizada.

✅ Sem pendências.

---

# Encerramento de Cada Etapa

Sempre finalizar com:


==============================

ETAPA CONCLUÍDA

Resumo:

Arquivos alterados:

Testes realizados:

Pendências:

Próxima etapa:

Aguardando autorização para continuar.

==============================


---

# Regra Final

O Antigravity deve agir como um engenheiro de software cuidadoso.

Não acelerar sacrificando qualidade.

Não assumir informações.

Não inventar configurações.

Não avançar sem validação.

O objetivo é construir um sistema profissional, seguro e documentado seguindo exatamente o plano de implementação.