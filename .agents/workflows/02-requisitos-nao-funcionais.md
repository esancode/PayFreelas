# 02 - Requisitos Não Funcionais

# Introdução

Este documento descreve os requisitos não funcionais do sistema Payment Progress.

Os requisitos definem características de qualidade, segurança, desempenho, manutenção e confiabilidade que o sistema deverá possuir.

O objetivo é garantir que o sistema seja simples para o usuário, seguro para as informações financeiras e fácil de evoluir.

O sistema NÃO é responsável por processar pagamentos.

O sistema NÃO armazena dados sensíveis de pagamento.

Ele funciona apenas como uma plataforma de acompanhamento financeiro integrada com serviços externos.

---

# RNF001 - Usabilidade

## Descrição

O sistema deverá possuir uma interface simples e intuitiva para administradores e clientes.

## Regras

A experiência deverá seguir os princípios:

- poucos elementos visuais;
- informações claras;
- navegação simples;
- ausência de complexidade desnecessária.

O cliente deverá conseguir entender:

- valor total;
- valor pago;
- valor restante;
- progresso do pagamento.

Sem precisar de explicações adicionais.

---

# RNF002 - Tempo de Aprendizado

## Descrição

O sistema deverá exigir o mínimo de aprendizado para utilização.

## Regras

O cliente:

- não deverá criar conta;
- não deverá realizar login;
- não deverá instalar aplicativo;
- não deverá aprender um novo fluxo.

O acesso deverá acontecer apenas através do link público enviado pelo administrador.

---

# RNF003 - Responsividade

## Descrição

O sistema deverá funcionar corretamente em diferentes dispositivos.

## Dispositivos suportados

- computadores;
- notebooks;
- tablets;
- smartphones.

A interface deverá adaptar-se automaticamente ao tamanho da tela.

---

# RNF004 - Desempenho

## Descrição

O sistema deverá apresentar carregamento rápido das páginas.

## Objetivos

A página pública do cliente deverá carregar rapidamente mesmo em conexões comuns.

## Regras

O sistema deverá:

- evitar carregamentos desnecessários;
- utilizar otimização de imagens;
- utilizar componentes eficientes;
- minimizar dependências.

---

# RNF005 - Disponibilidade

## Descrição

O sistema deverá permanecer disponível para consulta dos projetos.

## Regras

Clientes deverão conseguir acessar seus links públicos sempre que o serviço estiver funcionando.

A indisponibilidade deverá ser minimizada através da utilização de infraestrutura confiável.

---

# RNF006 - Segurança de Dados

## Descrição

O sistema deverá proteger todas as informações armazenadas.

## Regras

O sistema nunca deverá armazenar:

- número de cartão;
- CVV;
- senha bancária;
- dados sensíveis do cliente.

Toda informação financeira deverá ser tratada com segurança.

---

# RNF007 - Segurança de Autenticação

## Descrição

A área administrativa deverá possuir autenticação segura.

## Regras

Somente administradores autenticados poderão:

- criar projetos;
- registrar pagamentos;
- excluir projetos;
- acessar informações administrativas.

Clientes nunca deverão possuir acesso administrativo.

---

# RNF008 - Proteção Contra Manipulação

## Descrição

O sistema não deverá confiar em informações enviadas pelo frontend.

## Regras

Toda validação importante deverá acontecer no backend.

Exemplos:

- valores de pagamento;
- permissões;
- alterações financeiras;
- criação de registros.

---

# RNF009 - Segurança dos Links Públicos

## Descrição

Os links públicos dos projetos deverão possuir identificadores seguros.

## Regras

O identificador:

- não poderá ser previsível;
- não poderá utilizar IDs sequenciais;
- não deverá permitir descoberta fácil de outros projetos.

---

# RNF010 - Integridade Financeira

## Descrição

As informações financeiras deverão permanecer consistentes.

## Regras

O sistema deverá garantir:

- nenhum pagamento duplicado acidentalmente;
- cálculo correto do saldo restante;
- cálculo correto do progresso;
- histórico confiável.

---

# RNF011 - Histórico Imutável

## Descrição

O histórico financeiro deverá preservar a rastreabilidade das alterações.

## Regras

Pagamentos não deverão ser apagados silenciosamente.

Caso exista correção:

- deverá ser criado um novo registro;
- a alteração deverá permanecer rastreável.

---

# RNF012 - Manutenibilidade

## Descrição

O código deverá ser organizado para facilitar manutenção futura.

## Regras

O projeto deverá possuir:

- código limpo;
- componentes reutilizáveis;
- separação de responsabilidades;
- documentação atualizada.

---

# RNF013 - Escalabilidade

## Descrição

A arquitetura deverá permitir evolução futura do sistema.

## Possíveis evoluções

O sistema deverá permitir futuramente:

- múltiplos administradores;
- múltiplas empresas;
- notificações;
- integrações adicionais;
- confirmação automática de pagamentos.

Sem necessidade de reconstrução completa.

---

# RNF014 - Compatibilidade Tecnológica

## Descrição

O sistema deverá utilizar tecnologias modernas e amplamente utilizadas.

## Stack definida

Frontend:

- Next.js;
- TypeScript;
- TailwindCSS.

Backend:

- Next.js API Routes.

Banco:

- PostgreSQL através do Supabase.

Hospedagem:

- Vercel.

---

# RNF015 - Baixo Custo Operacional

## Descrição

O sistema deverá ser desenvolvido considerando baixo custo de operação.

## Regras

Priorizar:

- serviços com planos gratuitos ou acessíveis;
- poucas dependências;
- infraestrutura simples;
- fácil manutenção.

---

# RNF016 - Privacidade

## Descrição

O sistema deverá expor somente informações necessárias ao cliente.

## Regras

A página pública deverá mostrar apenas:

- informações do projeto;
- progresso financeiro;
- histórico de pagamentos;
- formas de pagamento.

Nunca deverá mostrar:

- informações administrativas;
- dados internos;
- configurações do sistema.

---

# RNF017 - Experiência Visual

## Descrição

A interface deverá transmitir profissionalismo.

## Referências

A identidade visual deverá seguir:

## Apple

- minimalismo;
- tipografia limpa;
- bastante espaço negativo;
- componentes consistentes.

## Mercado Pago

- cartões informativos;
- hierarquia visual forte;
- foco na informação;
- simplicidade.

---

# RNF018 - Arquitetura Simples

## Descrição

O sistema deverá evitar complexidade desnecessária.

## Regras

O MVP deverá priorizar:

- poucas funcionalidades;
- código simples;
- fácil entendimento;
- rápida evolução.

---

# RNF019 - Testabilidade

## Descrição

O sistema deverá permitir testes das principais funcionalidades.

## Áreas críticas

Deverão ser testados:

- criação de projetos;
- geração de links;
- cálculo financeiro;
- registro de pagamentos;
- validação de valores;
- permissões administrativas.

---

# RNF020 - Confiabilidade

## Descrição

O sistema deverá apresentar comportamento previsível.

## Regras

As informações exibidas ao cliente deverão sempre refletir os dados confirmados pelo administrador.

O sistema deverá priorizar:

- transparência;
- consistência;
- confiança.

---

# Resumo dos Requisitos

| Código | Requisito |
|-|-|
| RNF001 | Usabilidade |
| RNF002 | Fácil aprendizado |
| RNF003 | Responsividade |
| RNF004 | Desempenho |
| RNF005 | Disponibilidade |
| RNF006 | Segurança de dados |
| RNF007 | Autenticação segura |
| RNF008 | Proteção contra manipulação |
| RNF009 | Segurança dos links |
| RNF010 | Integridade financeira |
| RNF011 | Histórico imutável |
| RNF012 | Manutenibilidade |
| RNF013 | Escalabilidade |
| RNF014 | Compatibilidade tecnológica |
| RNF015 | Baixo custo |
| RNF016 | Privacidade |
| RNF017 | Experiência visual |
| RNF018 | Arquitetura simples |
| RNF019 | Testabilidade |
| RNF020 | Confiabilidade |