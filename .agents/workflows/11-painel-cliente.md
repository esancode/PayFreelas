# 11 - Painel Cliente

# Introdução

O Painel Cliente é a área pública onde o cliente acompanha o progresso financeiro de um projeto.

O acesso acontece através de um link único enviado pelo administrador.

Exemplo:

https://app.com/p/8f81d2f2e

O cliente não precisa:

- criar conta;
- criar senha;
- realizar login;
- instalar aplicativo.

A experiência deve ser extremamente simples, permitindo que o cliente entenda rapidamente:

- quanto custa o projeto;
- quanto já foi pago;
- quanto ainda falta pagar;
- como realizar novos pagamentos.

---

# Objetivo

O objetivo do painel cliente é fornecer transparência e confiança durante o processo de pagamento.

A página deve substituir perguntas frequentes como:

"Quanto ainda falta pagar?"

"Você recebeu meu pagamento?"

"Qual valor do projeto?"

Todas as informações financeiras devem estar disponíveis em um único local.

---

# Princípios da Interface

O painel cliente deve seguir os princípios:

## Simplicidade

Mostrar apenas informações necessárias.

Nenhuma informação administrativa deve aparecer.

---

## Clareza

O cliente deve identificar rapidamente:

- valor total;
- valor pago;
- saldo restante;
- progresso.

---

## Confiança

O histórico financeiro deve transmitir segurança.

Nenhum pagamento deve desaparecer.

As informações exibidas representam apenas valores confirmados pelo administrador.

---

## Profissionalismo

A interface deve parecer um produto SaaS premium.

Referências:

Apple:

- minimalismo;
- tipografia limpa;
- espaço negativo;
- componentes consistentes.

Mercado Pago:

- cartões informativos;
- hierarquia visual;
- foco na informação.

---

# Acesso

## Link Público

Cada projeto possui um endereço único.

Exemplo:

https://app.com/p/{codigo-seguro}

---

## Regras

O cliente:

- não precisa autenticar;
- não possui conta;
- não possui permissões administrativas;
- apenas visualiza informações.

O identificador público deve ser seguro e não previsível.

---

# Estrutura da Página

A página deverá conter os seguintes blocos:

---

# 1. Cabeçalho

Responsável por apresentar o projeto.

Informações:

- nome do projeto;
- nome do cliente (opcional).

Exemplo:

Projeto:

"Desenvolvimento do Website"

Cliente:

"João Silva"

---

# 2. Resumo Financeiro

Área principal da página.

Deve apresentar:

## Valor Total

Valor completo do projeto.

Exemplo:

R$ 2.000

---

## Valor Pago

Soma de todos os pagamentos confirmados.

Exemplo:

R$ 800

---

## Valor Restante

Diferença entre valor total e valor pago.

Exemplo:

R$ 1.200

---

# 3. Progresso Financeiro

Mostrar visualmente quanto do projeto já foi pago.

Cálculo:

(valor pago / valor total) × 100

Exemplo:

Projeto:

R$ 1.000

Pago:

R$ 400

Resultado:

40% concluído.

---

## Elementos visuais

Deve possuir:

- barra de progresso;
- porcentagem concluída;
- valores destacados.

---

# 4. Histórico de Pagamentos

Exibir todos os pagamentos registrados.

Cada item deve apresentar:

- valor;
- método;
- data;
- observação (quando existir).

Exemplo:

Pagamento

R$ 200

Pix

24/07/2026

---

## Regras

O histórico:

- nunca deve ser apagado silenciosamente;
- deve permanecer confiável;
- representa somente pagamentos confirmados.

---

# 5. Formas de Pagamento

O cliente deverá visualizar as opções disponíveis.

Métodos:

- Pix;
- Depósito;
- Cartão de Crédito.

---

# Pagamento via Pix

O cliente deverá visualizar as instruções necessárias.

Exibir:

- chave Pix;
- informações adicionais configuradas pelo administrador.

Fluxo:

Cliente realiza pagamento.

↓

Administrador confirma recebimento.

↓

Administrador registra pagamento.

O pagamento via Pix deverá cair no banco Inter do administrador. :contentReference[oaicite:2]{index=2}

---

# Pagamento via Depósito

O cliente deverá visualizar os dados bancários.

Fluxo:

Cliente realiza depósito.

↓

Administrador confirma recebimento.

↓

Administrador registra pagamento.

Os depósitos deverão utilizar o Banco do Brasil do administrador. :contentReference[oaicite:3]{index=3}

---

# Pagamento via Cartão de Crédito

O cartão utiliza checkout externo do Mercado Pago.

O sistema:

- não processa cartões;
- não armazena cartões;
- não recebe dados sensíveis.

Fluxo:

Cliente seleciona:

"Cartão de Crédito"

↓

Sistema pergunta:

"Quanto deseja pagar?"

↓

Cliente informa um valor.

↓

Sistema cria checkout Mercado Pago.

↓

Cliente escolhe:

- cartão;
- quantidade de parcelas;
- dados do pagamento.

Todo processamento acontece no ambiente do Mercado Pago.

O pagamento via cartão deverá cair no Mercado Pago do administrador. :contentReference[oaicite:4]{index=4}

---

# Escolha de Valor

O cliente poderá pagar qualquer valor até completar o projeto.

Exemplo:

Projeto:

R$ 1.000

Cliente pode pagar:

- R$ 200;
- R$ 150;
- R$ 300;
- R$ 350.

---

# Validação

O cliente nunca poderá pagar acima do saldo restante.

Exemplo:

Saldo:

R$ 450

Permitido:

- R$ 50;
- R$ 100;
- R$ 450.

Bloqueado:

- R$ 451;
- R$ 600;
- R$ 1.000.

---

# 6. Botão WhatsApp

A página deverá permitir contato direto com o administrador.

Objetivo:

Facilitar dúvidas ou negociações.

Exemplo:

"Precisa de ajuda?"

↓

Abrir WhatsApp.

---

# Responsividade

O painel deverá funcionar em:

- smartphones;
- tablets;
- notebooks;
- computadores.

A prioridade deve ser dispositivos móveis.

---

# Estados da Página

## Projeto em andamento

Mostrar:

- progresso;
- saldo restante;
- formas de pagamento.

---

## Projeto concluído

Quando:

valor pago >= valor total

Mostrar:

- projeto pago;
- progresso 100%;
- histórico completo.

---

# Informações que NÃO devem aparecer

O cliente nunca deverá visualizar:

- painel administrativo;
- configurações internas;
- dados de outros projetos;
- informações do banco do administrador além das instruções de pagamento;
- dados sensíveis.

---

# Segurança

O painel cliente deve seguir:

- acesso somente através do link público;
- identificadores não previsíveis;
- nenhuma alteração financeira pelo cliente;
- nenhuma confiança em dados enviados pelo frontend.

---

# Experiência Esperada

Ao abrir o link, o cliente deve pensar:

"Agora sei exatamente quanto falta pagar."

A página deve eliminar:

- dúvidas;
- mensagens desnecessárias;
- pedidos de atualização.

---

# Critérios de Aceitação

O painel cliente será considerado concluído quando:

✅ Cliente acessar projeto sem login.

✅ Cliente visualizar valor total.

✅ Cliente visualizar valor pago.

✅ Cliente visualizar saldo restante.

✅ Cliente visualizar progresso.

✅ Cliente visualizar histórico.

✅ Cliente visualizar formas de pagamento.

✅ Cliente conseguir iniciar pagamento via Mercado Pago.

✅ Cliente conseguir entrar em contato via WhatsApp.

✅ Nenhuma informação administrativa for exposta.

---

# Fora do Escopo

Não fazem parte do MVP:

- conta para clientes;
- aplicativo mobile;
- chat interno;
- cobrança automática;
- edição de pagamentos pelo cliente;
- armazenamento de cartões;
- emissão de boletos;
- área administrativa.