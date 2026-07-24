# 10 - Painel Admin

# Payment Progress

> Área administrativa responsável pelo gerenciamento completo dos projetos, pagamentos e informações financeiras.

---

# Objetivo

O painel administrativo permite que o freelancer tenha controle sobre seus projetos e acompanhe todos os pagamentos realizados pelos clientes.

A área administrativa é o centro de gerenciamento do sistema.

Através dela o administrador poderá:

- criar projetos;
- visualizar projetos existentes;
- registrar pagamentos;
- acompanhar progresso financeiro;
- copiar links públicos;
- excluir projetos.

O painel deve ser simples, rápido e profissional.

---

# Acesso Administrativo

O painel administrativo deverá ser protegido por autenticação.

Somente usuários administradores autenticados poderão acessar.

O cliente:

- não possui conta;
- não possui login;
- não possui acesso ao painel;
- não pode alterar informações.

O acesso administrativo deverá utilizar autenticação segura através do sistema definido na arquitetura.

---

# Objetivo da Experiência

O administrador deve conseguir gerenciar um projeto em poucos segundos.

Fluxo esperado:

Criar projeto

↓

Copiar link

↓

Enviar para cliente

↓

Registrar pagamentos recebidos

↓

Acompanhar progresso

---

# Estrutura do Painel

O painel deverá possuir as seguintes áreas:


Dashboard
│
├── Projetos
│
├── Criar Projeto
│
├── Detalhes do Projeto
│
└── Configurações


---

# Dashboard

## Objetivo

Apresentar uma visão geral dos projetos cadastrados.

---

## Informações exibidas

O dashboard deverá apresentar:

- quantidade de projetos;
- valor total dos projetos;
- valor recebido;
- valor pendente.

Exemplo:


Projetos

12

Valor total

R$ 25.000

Recebido

R$ 18.500

Pendente

R$ 6.500


---

# Lista de Projetos

## Objetivo

Permitir que o administrador encontre rapidamente seus projetos.

---

## Informações exibidas

Cada projeto deverá apresentar:

- nome do projeto;
- nome do cliente;
- valor total;
- valor recebido;
- valor restante;
- percentual concluído;
- status.

---

## Exemplo de Card


Website Empresa X

Cliente:
João Silva

Valor:

R$ 3.000

Pago:

R$ 1.500

Progresso:

50%

[Ver Projeto]


---

# Status do Projeto

O sistema poderá utilizar estados visuais:

## Em andamento

Quando:


valor pago < valor total


---

## Pago

Quando:


valor pago = valor total


---

# Criar Projeto

## Objetivo

Permitir que o administrador cadastre um novo projeto financeiro.

---

## Campos obrigatórios

O administrador deverá informar:

- nome do projeto;
- nome do cliente;
- valor total.

---

## Após criação

O sistema deverá:

- salvar o projeto;
- gerar identificador único;
- criar link público;
- disponibilizar gerenciamento.

Exemplo:


https://app.com/p/8f81d2f2e


---

# Detalhes do Projeto

## Objetivo

Permitir gerenciamento individual de cada projeto.

---

## Informações principais

A tela deverá apresentar:

- nome do projeto;
- cliente;
- valor total;
- valor pago;
- valor restante;
- progresso financeiro;
- link público.

---

# Barra de Progresso

O painel deverá apresentar visualmente o avanço financeiro.

Cálculo:


(valor pago / valor total) × 100


Exemplo:

Projeto:

R$ 1.000

Pago:

R$ 400

Resultado:

40%

---

# Histórico de Pagamentos

## Objetivo

Permitir acompanhamento completo dos pagamentos registrados.

---

## Informações exibidas

Cada pagamento deverá mostrar:

- valor;
- método;
- data;
- observação.

Exemplo:


Pagamento #001

Valor:

R$ 200

Método:

Pix

Data:

24/07/2026

Observação:

Entrada inicial


---

# Registrar Pagamento

## Objetivo

Permitir que o administrador registre pagamentos recebidos.

---

## Métodos disponíveis

- Pix;
- depósito;
- cartão de crédito.

---

## Dados necessários

O administrador deverá informar:

- valor;
- método de pagamento;
- observação opcional.

A data poderá ser registrada automaticamente pelo sistema.

---

# Regras Financeiras

## Nunca permitir inconsistência

O sistema deverá garantir:

- pagamento não pode ultrapassar valor restante;
- progresso nunca pode passar de 100%;
- saldo restante nunca pode ficar negativo.

---

## Histórico Imutável

Pagamentos não deverão ser apagados silenciosamente.

Caso exista erro:

O administrador deverá criar um novo registro de correção.

O histórico deve permanecer confiável.

---

# Link Público

## Objetivo

Facilitar o compartilhamento do projeto com o cliente.

---

## Funções

O administrador deverá conseguir:

- visualizar link;
- copiar link;
- compartilhar via WhatsApp.

---

## Exemplo


[ Copiar Link ]

https://app.com/p/8f81d2f2e


---

# Exclusão de Projeto

## Objetivo

Permitir remoção de projetos antigos.

---

## Regras

Somente administradores podem excluir.

Clientes nunca possuem essa permissão.

Antes da exclusão deverá existir confirmação.

Exemplo:


Deseja realmente excluir este projeto?

[Cancelar]

[Excluir]


---

# Informações de Pagamento

O painel deverá permitir visualizar as configurações utilizadas para recebimento.

---

# Pix

Pagamentos via Pix deverão utilizar o banco Inter do administrador.

Após o recebimento:

Administrador registra manualmente o pagamento.

---

# Depósito

Pagamentos via depósito deverão utilizar os dados do Banco do Brasil do administrador.

Após confirmação:

Administrador registra manualmente.

---

# Cartão de Crédito

Pagamentos via cartão deverão utilizar integração externa com Mercado Pago.

O painel não deverá receber dados de cartão.

O painel apenas acompanha o pagamento.

---

# Segurança

O painel administrativo deverá seguir as seguintes regras:

Nunca confiar no frontend.

Toda validação deverá ocorrer no backend.

Proteger:

- dados financeiros;
- projetos;
- pagamentos;
- permissões administrativas.

---

# Responsividade

O painel deverá funcionar em:

- computadores;
- notebooks;
- tablets;
- smartphones.

---

# Interface

A identidade visual deverá seguir:

## Apple

- minimalismo;
- tipografia limpa;
- espaço negativo;
- componentes consistentes.

## Mercado Pago

- cartões informativos;
- hierarquia visual;
- foco na informação.

---

# Componentes Principais

O painel deverá possuir:

- Sidebar;
- Header;
- Cards de métricas;
- Cards de projetos;
- Tabelas;
- Modais;
- Formulários;
- Botões;
- Badges de status.

---

# Fora do Escopo

O painel administrativo NÃO deverá possuir:

- emissão de cobranças automáticas;
- conciliação bancária;
- ERP;
- CRM;
- gerenciamento de clientes completo;
- armazenamento de cartão.

---

# Critérios de Conclusão

O painel será considerado pronto quando:

✅ Administrador conseguir acessar com segurança.

✅ Administrador conseguir criar projetos.

✅ Sistema gerar links públicos.

✅ Administrador conseguir registrar pagamentos.

✅ Valores atualizarem automaticamente.

✅ Histórico permanecer confiável.

✅ Projetos puderem ser gerenciados facilmente.

✅ Interface transmitir profissionalismo.

---

# Objetivo Final

O painel administrativo deve transformar o controle financeiro de projetos em uma experiência simples.

O administrador deve conseguir responder rapidamente:

"Quais projetos tenho?"

"Quanto já recebi?"

"Quanto falta receber?"

"Quais pagamentos foram realizados?"

Sem planilhas.

Sem controles manuais externos.

Com uma visão clara e profissional.