# 13 - Testes Manuais

# Introdução

Este documento descreve os testes manuais necessários para validar o funcionamento do sistema Payment Progress.

O objetivo é garantir que as principais funcionalidades do MVP funcionem corretamente antes da publicação.

Os testes devem validar:

- criação de projetos;
- acesso público;
- cálculos financeiros;
- registro de pagamentos;
- permissões;
- integração com pagamentos externos;
- segurança;
- experiência do usuário.

O sistema não processa pagamentos diretamente.

Ele apenas acompanha informações financeiras e direciona pagamentos para serviços externos.

---

# Ambiente de Testes

## Requisitos

Para executar os testes:

- navegador atualizado;
- conexão com internet;
- usuário administrador criado;
- projeto cadastrado;
- acesso ao ambiente de desenvolvimento.

---

# Testes Administrativos

---

# TC001 - Login Administrativo

## Objetivo

Validar acesso à área administrativa.

## Passos

1. Acessar a página administrativa.
2. Informar usuário e senha válidos.
3. Realizar login.

## Resultado esperado

- Usuário autenticado.
- Acesso ao painel administrativo permitido.

---

# TC002 - Bloquear Acesso Administrativo Não Autorizado

## Objetivo

Garantir que clientes não consigam acessar funções administrativas.

## Passos

1. Acessar uma rota administrativa sem autenticação.
2. Tentar visualizar o painel.

## Resultado esperado

- Acesso bloqueado.
- Usuário redirecionado para autenticação.

---

# TC003 - Criar Projeto

## Objetivo

Validar criação de um novo projeto.

## Passos

1. Acessar painel administrativo.
2. Clicar em "Criar Projeto".
3. Informar:

- nome do projeto;
- nome do cliente;
- valor total.

4. Confirmar criação.

## Resultado esperado

- Projeto criado com sucesso.
- Projeto possui identificador único.
- Link público gerado.

---

# TC004 - Validar Campos Obrigatórios

## Objetivo

Garantir que dados essenciais sejam preenchidos.

## Passos

1. Criar projeto.
2. Deixar campos obrigatórios vazios.
3. Confirmar.

## Resultado esperado

- Sistema impede criação.
- Mensagens de validação exibidas.

---

# TC005 - Copiar Link Público

## Objetivo

Validar compartilhamento do projeto.

## Passos

1. Criar projeto.
2. Clicar em copiar link.

## Resultado esperado

- Link copiado corretamente.
- Link permite acesso público.

---

# Testes Página Pública

---

# TC006 - Abrir Projeto Sem Login

## Objetivo

Validar acesso do cliente sem cadastro.

## Passos

1. Abrir link público em navegador anônimo.

## Resultado esperado

Cliente consegue visualizar o projeto sem:

- conta;
- senha;
- login.

---

# TC007 - Exibir Informações Financeiras

## Objetivo

Validar informações exibidas ao cliente.

## Passos

1. Abrir página pública.

## Resultado esperado

Exibir:

- nome do projeto;
- valor total;
- valor pago;
- valor restante;
- progresso;
- histórico;
- formas de pagamento.

---

# TC008 - Calcular Progresso Financeiro

## Objetivo

Validar cálculo da barra de progresso.

## Cenário

Projeto:

R$ 1.000

Pagamento:

R$ 400

## Resultado esperado

Sistema exibe:

40% concluído.

Fórmula:

(valor pago / valor total) × 100

---

# Testes de Pagamentos

---

# TC009 - Registrar Pagamento Manual

## Objetivo

Validar registro administrativo.

## Passos

1. Abrir projeto.
2. Adicionar pagamento.
3. Informar:

- valor;
- método;
- data;
- observação opcional.

## Resultado esperado

Pagamento registrado.

---

# TC010 - Registrar Pagamento Pix

## Objetivo

Validar pagamentos via Pix.

## Passos

1. Registrar pagamento como Pix.

## Resultado esperado

- Método salvo como Pix.
- Histórico atualizado.

O pagamento Pix deverá utilizar o banco Inter configurado para recebimento. 

---

# TC011 - Registrar Pagamento Depósito

## Objetivo

Validar pagamentos via depósito.

## Passos

1. Registrar pagamento como depósito.

## Resultado esperado

- Método salvo como depósito.
- Histórico atualizado.

Depósitos deverão utilizar o Banco do Brasil configurado para recebimento.

---

# TC012 - Registrar Pagamento Cartão

## Objetivo

Validar registro de pagamentos via cartão.

## Passos

1. Registrar pagamento como cartão.

## Resultado esperado

- Método salvo como cartão.
- Histórico atualizado.

Pagamentos via cartão deverão utilizar Mercado Pago.

---

# TC013 - Pagamento Parcial

## Objetivo

Validar múltiplos pagamentos até completar o projeto.

## Cenário

Projeto:

R$ 1.000

Pagamentos:

- R$ 200;
- R$ 150;
- R$ 300;
- R$ 350.

## Resultado esperado

Saldo final:

R$ 0.

Progresso:

100%.

---

# TC014 - Validar Valor Superior ao Saldo

## Objetivo

Impedir pagamentos acima do permitido.

## Cenário

Saldo restante:

R$ 450.

Cliente informa:

R$ 500.

## Resultado esperado

Sistema rejeita o valor.

---

# TC015 - Validar Valor Zero

## Objetivo

Impedir pagamentos inválidos.

## Passos

Informar:

R$ 0.

## Resultado esperado

Pagamento bloqueado.

---

# Testes Mercado Pago

---

# TC016 - Escolher Valor no Cartão

## Objetivo

Validar pagamento personalizado.

## Passos

1. Cliente seleciona cartão.
2. Sistema solicita valor.
3. Cliente informa valor parcial.

Exemplo:

Projeto:

R$ 1.000

Pagamento:

R$ 200.

## Resultado esperado

Sistema cria checkout externo no valor informado.

---

# TC017 - Não Armazenar Dados do Cartão

## Objetivo

Garantir segurança.

## Resultado esperado

Sistema nunca salva:

- número do cartão;
- CVV;
- senha;
- dados sensíveis.

---

# Testes de Histórico

---

# TC018 - Atualização do Histórico

## Objetivo

Garantir rastreabilidade.

## Passos

1. Registrar pagamento.
2. Visualizar histórico.

## Resultado esperado

Novo registro aparece corretamente.

---

# TC019 - Histórico Não Pode Ser Apagado Silenciosamente

## Objetivo

Garantir integridade financeira.

## Resultado esperado

Correções devem gerar novos registros.

---

# Testes de Responsividade

---

# TC020 - Acesso Mobile

## Objetivo

Validar experiência em smartphones.

## Dispositivos

- Android;
- iPhone.

## Resultado esperado

Interface adaptada corretamente.

---

# TC021 - Acesso Desktop

## Objetivo

Validar versão para computadores.

## Resultado esperado

Layout organizado e funcional.

---

# Testes de Segurança

---

# TC022 - Link Público Seguro

## Objetivo

Validar segurança dos links.

## Resultado esperado

IDs:

- não sequenciais;
- não previsíveis.

---

# TC023 - Cliente Não Pode Alterar Valores

## Objetivo

Garantir proteção financeira.

## Resultado esperado

Cliente apenas visualiza informações.

---

# TC024 - Validação no Backend

## Objetivo

Garantir que regras críticas não dependam do frontend.

## Validar:

- valores;
- permissões;
- registros financeiros.

---

# Testes de Experiência

---

# TC025 - Entendimento do Cliente

## Objetivo

Validar clareza da página.

## Resultado esperado

Cliente consegue identificar rapidamente:

- quanto custa;
- quanto pagou;
- quanto falta.

---

# Critérios de Aprovação

O sistema será considerado aprovado quando:

✅ Todos os testes críticos forem concluídos.

✅ Criação de projetos funcionar.

✅ Links públicos funcionarem.

✅ Cálculos financeiros estiverem corretos.

✅ Pagamentos forem registrados corretamente.

✅ Histórico permanecer confiável.

✅ Permissões estiverem protegidas.

✅ Interface funcionar em dispositivos diferentes.

---

# Testes Críticos do MVP

Prioridade alta:

- TC003 - Criar Projeto.
- TC006 - Abrir Projeto Sem Login.
- TC008 - Calcular Progresso.
- TC009 - Registrar Pagamento.
- TC013 - Pagamento Parcial.
- TC014 - Validar Saldo.
- TC016 - Checkout Mercado Pago.
- TC023 - Cliente Não Pode Alterar Valores.

Esses testes garantem o funcionamento principal do Payment Progress.