---
description: 
---

# 00 - Visão Geral

# Payment Progress

> Um portal minimalista para freelancers acompanharem projetos e pagamentos de forma profissional.

---

# Objetivo

O objetivo deste projeto é fornecer uma forma extremamente simples para que um freelancer possa acompanhar o progresso financeiro de qualquer projeto e compartilhar essas informações com o cliente através de um único link.

O sistema NÃO é um sistema bancário.

O sistema NÃO processa pagamentos.

O sistema NÃO armazena cartões.

O sistema NÃO realiza cobranças.

Ele é apenas um painel de acompanhamento financeiro integrado com meios de pagamento externos.

A filosofia do projeto é:

> Mostrar para o cliente exatamente quanto falta pagar de maneira bonita, simples e profissional.

---

# Problema

Hoje um freelancer normalmente trabalha da seguinte maneira:

- conversa pelo WhatsApp;
- recebe Pix;
- recebe cartão por link;
- recebe depósitos;
- anota pagamentos manualmente;
- precisa responder constantemente:

"Quanto ainda falta pagar?"

"Quanto já paguei?"

"Você recebeu?"

Isso gera retrabalho.

Também transmite pouca profissionalização.

---

# Solução

Cada projeto possuirá uma página exclusiva.

Exemplo:

https://app.com/p/8f81d2f2e

Essa página será enviada ao cliente.

Nela existirão apenas as informações realmente importantes.

- nome do projeto;
- progresso financeiro;
- valor total;
- valor pago;
- valor restante;
- histórico completo;
- informações para pagamento.

Nenhuma informação técnica.

Nenhuma informação desnecessária.

A experiência deve durar menos de 20 segundos.

---

# Filosofia

Este sistema segue cinco princípios.

## 1. Simplicidade

Toda tela deve responder:

"O que o cliente precisa saber?"

Nada além disso.

---

## 2. Clareza

Nunca esconder informações.

O cliente sempre deverá enxergar:

Quanto custa.

Quanto pagou.

Quanto falta.

---

## 3. Confiança

Todas as informações devem transmitir transparência.

O histórico nunca poderá ser apagado.

Caso exista algum erro, novos registros devem ser adicionados.

Nunca editar pagamentos silenciosamente.

---

## 4. Profissionalismo

O sistema deve transmitir a sensação de uma plataforma profissional.

Mesmo sendo extremamente simples.

---

## 5. Zero Complexidade

O cliente nunca precisará:

- criar conta;
- criar senha;
- fazer login;
- instalar aplicativo.

Apenas abrir um link.

---

# Público alvo

Inicialmente:

- Desenvolvedores
- Designers
- Social Media
- Gestores de Tráfego
- Copywriters
- Editores
- Motion Designers
- Freelancers

No futuro:

Pequenas agências.

---

# Escopo do MVP

O MVP deverá possuir apenas o essencial.

## Administrador

Criar projeto.

Registrar pagamentos manualmente.

Visualizar progresso.

Copiar link.

Excluir projeto.

Nada além disso.

---

## Cliente

Visualizar projeto.

Visualizar progresso.

Visualizar histórico.

Visualizar informações de pagamento.

Entrar em contato pelo WhatsApp.

Nenhuma ação administrativa.

---

# O sistema NÃO fará

Não processará cartões.

Não armazenará cartões.

Não receberá Pix automaticamente.

Não fará conciliação bancária.

Não emitirá boletos.

Não será ERP.

Não será CRM.

Não substituirá Mercado Pago.

Não substituirá Inter.

---

# Fluxo

Administrador cria projeto.

↓

Sistema gera link.

↓

Administrador envia ao cliente.

↓

Cliente acompanha pagamentos.

↓

Administrador registra novos pagamentos manualmente.

↓

Sistema atualiza automaticamente a barra de progresso.

---

# Pagamentos

O sistema deverá oferecer flexibilidade para que o cliente pague qualquer valor, a qualquer momento, até quitar completamente o projeto.

O valor total do projeto nunca obriga o cliente a pagar tudo de uma única vez.

Exemplo:

Projeto

R$ 1.000

O cliente poderá realizar pagamentos como:

- R$ 200 hoje
- R$ 150 amanhã
- R$ 300 na próxima semana
- R$ 350 quando desejar

Até completar o valor total.

---

## Formas de pagamento

O sistema oferecerá as seguintes opções.

### Pix

O cliente visualizará as instruções para pagamento via Pix.

Após o recebimento do valor, o administrador registrará manualmente o pagamento.

---

### Depósito

O cliente visualizará os dados bancários para depósito.

Após confirmar que o dinheiro entrou na conta, o administrador registrará manualmente o pagamento.


---

### Cartão de Crédito

O cartão utilizará integração com o Mercado Pago.

O sistema NÃO processará cartões.

O sistema NÃO armazenará cartões.

Todo o pagamento acontecerá no checkout oficial do Mercado Pago.

Fluxo:

Cliente seleciona:

"Cartão de Crédito"

↓

O sistema pergunta:

"Quanto deseja pagar?"

↓

O cliente informa qualquer valor, desde que seja maior que zero e menor ou igual ao saldo restante.

Exemplo:

Saldo restante:

R$ 1.000

Cliente informa:

R$ 200

↓

O sistema cria automaticamente um checkout do Mercado Pago no valor de R$ 200.

↓

O cliente escolhe:

- cartão
- número de parcelas
- dados do cartão

Tudo dentro do ambiente do Mercado Pago.

Após o pagamento, o administrador poderá confirmar manualmente o recebimento ou, futuramente, essa confirmação poderá ser automatizada através de Webhooks.

---

## Regras

O cliente nunca poderá informar um valor superior ao saldo restante.

Exemplo:

Saldo restante

R$ 450

Permitido:

R$ 50

R$ 100

R$ 200

R$ 450

Não permitido:

R$ 451

R$ 600

R$ 1.000

---

## Objetivo

Dar total liberdade para que o cliente escolha:

- quanto deseja pagar;
- quando deseja pagar;
- quantas vezes deseja pagar;
- se prefere Pix ou Cartão.

O sistema deve adaptar-se à realidade financeira do cliente, e não obrigar pagamentos fixos.

---

# Inspiração

Toda a identidade visual deverá seguir estes princípios.

## Mercado Pago

- cartões quadrados
- bastante espaço em branco
- hierarquia visual forte
- poucos elementos
- foco na informação

## Apple

- minimalismo
- tipografia limpa
- poucas cores
- componentes consistentes
- muito espaço negativo

A combinação das duas referências define a identidade do sistema.

---

# Design

Tema claro.

Layout responsivo.

Cartões.

Bordas suaves.

Poucas cores.

Nenhum elemento desnecessário.

Ícones discretos.

Sombras leves.

Tipografia moderna.

A tela deve parecer um produto SaaS premium.

---

# Segurança

Mesmo não sendo um sistema de pagamento, segurança é prioridade.

Nunca armazenar:

- cartão
- CVV
- senha bancária
- chave Pix do cliente

Nunca confiar no frontend.

Nunca expor variáveis privadas.

Nunca utilizar IDs previsíveis.

Toda lógica financeira deverá acontecer no backend.

---

# Modelo de confiança

O sistema considera verdadeiro apenas aquilo que foi confirmado pelo administrador.

O cliente nunca altera valores.

O cliente nunca registra pagamentos.

O cliente nunca modifica informações.

Toda alteração financeira parte do painel administrativo.

---

# Principal Diferencial

Diferentemente da maioria dos sistemas de cobrança, este projeto NÃO trabalha com parcelas fixas.

O cliente possui liberdade total para pagar qualquer valor, no momento em que desejar, até quitar completamente o projeto.

Exemplo:

Projeto

R$ 2.000

O cliente pode pagar:

R$ 150

↓

R$ 320

↓

R$ 80

↓

R$ 700

↓

R$ 750

Até atingir R$ 2.000.

Essa flexibilidade elimina a necessidade de criar cobranças diferentes manualmente e torna o pagamento muito mais confortável para o cliente.

Esse é o principal diferencial do sistema.

# Objetivo da Experiência

Quando um cliente abrir o link deverá pensar:

"Agora entendi exatamente quanto falta pagar."

Sem precisar perguntar.

Sem precisar enviar mensagens.

Sem precisar pedir comprovantes.

---

# Objetivo Técnico

Construir um projeto simples.

Código limpo.

Arquitetura escalável.

Fácil manutenção.

Baixo custo.

Poucas dependências.

Documentação completa.

---

# Stack

Frontend

- Next.js
- TypeScript
- TailwindCSS

Backend

- Next.js API Routes

Banco

- Supabase

Autenticação

- Supabase Auth (Administrador)

Hospedagem

- Vercel

Banco

- PostgreSQL (Supabase)

---

# Definição de sucesso

O MVP será considerado concluído quando:

✅ Um administrador conseguir criar um projeto.

✅ O sistema gerar um link público.

✅ O cliente conseguir acompanhar o projeto.

✅ O administrador conseguir registrar pagamentos manualmente.

✅ A barra de progresso atualizar corretamente.

✅ O histórico permanecer consistente.

✅ A interface transmitir profissionalismo.

---

# Visão de longo prazo

Este projeto poderá evoluir para um portal completo para freelancers.

Futuras possibilidades:

- integração com Mercado Pago
- confirmação automática
- anexos
- cronograma
- etapas do projeto
- notificações
- contratos
- emissão de notas
- múltiplos administradores
- múltiplas empresas
- SaaS multi-tenant

Entretanto, nenhuma dessas funcionalidades faz parte do MVP.

O foco atual é construir a forma mais simples, bonita e confiável de acompanhar pagamentos de projetos através de um único link público.