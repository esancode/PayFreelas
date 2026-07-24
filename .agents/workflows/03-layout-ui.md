# 03 - Layout UI

# Objetivo

Este documento define a estrutura visual e experiência de interface do sistema Payment Progress.

A interface deve transmitir:

- simplicidade;
- transparência;
- profissionalismo;
- confiança.

O objetivo principal é que o cliente consiga entender a situação financeira do projeto em poucos segundos.

A experiência ideal:

> "Agora entendi exatamente quanto falta pagar."

Sem precisar perguntar.

Sem precisar solicitar informações.

---

# Princípios de Design

O design seguirá cinco princípios principais.

---

# 1. Minimalismo

A interface deve apresentar apenas informações essenciais.

Evitar:

- excesso de textos;
- menus desnecessários;
- elementos decorativos;
- informações técnicas.

Cada elemento deve possuir uma função clara.

---

# 2. Clareza Financeira

Os valores devem possuir destaque visual.

O cliente sempre deve identificar rapidamente:

- valor total;
- valor pago;
- valor restante;
- progresso atual.

---

# 3. Sensação Premium

A interface deve parecer um produto SaaS profissional.

Referências:

## Apple

- bastante espaço negativo;
- tipografia limpa;
- poucos elementos;
- componentes consistentes;
- aparência sofisticada.

## Mercado Pago

- cartões organizados;
- hierarquia visual forte;
- foco na informação;
- experiência simples.

---

# Identidade Visual

## Tema

Tema principal:

- claro;
- limpo;
- moderno.

---

# Cores

## Primária

Utilizar uma cor escura profissional para elementos principais.

Exemplo:

- textos importantes;
- botões;
- destaques.

---

## Neutros

Grande utilização de:

- branco;
- cinza claro;
- cinza médio;
- preto suave.

Objetivo:

Criar contraste sem poluir a interface.

---

# Tipografia

Características:

- moderna;
- legível;
- espaçada.

Preferência:

- fontes sem serifa;
- pesos variados;
- títulos com destaque.

Exemplo de hierarquia:

Título do projeto:

Grande

Valor restante:

Muito grande

Informações auxiliares:

Menores e discretas.

---

# Componentes Globais

---

# Card

Componente principal da aplicação.

Características:

- fundo branco;
- bordas arredondadas;
- sombra leve;
- espaçamento interno confortável.

Uso:

- informações financeiras;
- histórico;
- formas de pagamento.

---

# Botões

Características:

- altura confortável;
- cantos arredondados;
- texto claro;
- feedback visual.

Tipos:

## Primário

Ações principais.

Exemplo:

"Copiar link"

"Continuar pagamento"

---

## Secundário

Ações alternativas.

Exemplo:

"Voltar"

"Cancelar"

---

# Badge

Utilizado para indicar estados.

Exemplos:

- Pago;
- Pendente;
- Disponível.

---

# Ícones

Características:

- discretos;
- simples;
- sem excesso visual.

Usados apenas quando melhorarem compreensão.

---

# Página Pública do Cliente

URL exemplo:

https://app.com/p/8f81d2f2e

---

# Estrutura

A página deverá possuir:


Logo / Nome do sistema

Nome do Projeto

Cliente

CARD PRINCIPAL

Valor restante

R$ 600

Progresso

████████░░ 40%

Total

R$ 1.000

Pago

R$ 400

Histórico de pagamentos

Pagamento 01
R$ 200
Pix
10/07/2026

Pagamento 02
R$ 200
Cartão
15/07/2026

Formas de pagamento

[ Pix ]

[ Depósito ]

[ Cartão de Crédito ]

Contato WhatsApp


---

# Card Principal Financeiro

Elemento mais importante da página.

Deve apresentar:

## Valor restante

Maior destaque visual.

Exemplo:


Ainda falta

R$ 600


---

## Barra de Progresso

Representação visual do pagamento.

Cálculo:

(valor pago / valor total) × 100

Exemplo:

Projeto:

R$ 1.000

Pago:

R$ 400

Resultado:

40%.

---

## Resumo Financeiro

Exibir:


Valor total

R$ 1.000

Pago

R$ 400

Restante

R$ 600


---

# Histórico de Pagamentos

Objetivo:

Transmitir confiança e transparência.

Cada registro deve mostrar:

- valor;
- método;
- data;
- observação opcional.

Exemplo:


R$ 200

Pix

12/07/2026

Pagamento inicial


---

# Formas de Pagamento

Área onde o cliente escolhe como pagar.

---

# Pix

Card contendo:

- título;
- instruções;
- dados Pix.

O pagamento será confirmado manualmente pelo administrador.

O Pix deverá cair no banco Inter do administrador. 

---

# Depósito

Card contendo:

- banco;
- agência;
- conta;
- instruções.

O depósito deverá utilizar o Banco do Brasil do administrador.

---

# Cartão de Crédito

Fluxo visual:


Cartão de Crédito

↓

Quanto deseja pagar?

[R$ ______]

↓

Continuar

↓

Checkout Mercado Pago


O sistema nunca deverá solicitar:

- número do cartão;
- validade;
- CVV.

Esses dados pertencem exclusivamente ao Mercado Pago.

---

# Página Administrativa

Área protegida para administradores.

---

# Dashboard

Objetivo:

Permitir gerenciamento rápido dos projetos.

Estrutura:


Projetos

[ Novo Projeto ]

Projeto A

Cliente

R$ 1.000

40% pago

[ Abrir ]

[ Copiar Link ]

[ Excluir ]


---

# Criar Projeto

Tela simples.

Campos:

- Nome do projeto;
- Nome do cliente;
- Valor total.

Botão:

"Criar projeto"

Após criação:

- salvar projeto;
- gerar link público;
- disponibilizar botão copiar.

---

# Detalhes do Projeto

Administrador visualiza:

- nome;
- cliente;
- valor total;
- valor pago;
- saldo restante;
- progresso;
- histórico.

Ações:

- registrar pagamento;
- copiar link;
- excluir projeto.

---

# Registrar Pagamento

Modal.

Campos:


Valor

[R$ ______]

Método

[ Pix ]

[ Depósito ]

[ Cartão ]

Data

//____

Observação


Botão:

"Registrar pagamento"

---

# Responsividade

O sistema deve funcionar em:

- desktop;
- tablet;
- celular.

---

# Mobile First

A experiência principal deve funcionar perfeitamente em telas pequenas.

Prioridades:

1. Valor restante.
2. Progresso.
3. Histórico.
4. Pagamento.
5. Contato.

---

# Estados da Interface

---

# Projeto Pago

Quando:

valor pago = valor total.

Exibir:


Projeto concluído

Pagamento realizado integralmente.


---

# Projeto Parcial

Exibir:


40% concluído

Ainda falta:

R$ 600


---

# Projeto Sem Pagamentos

Exibir:


Nenhum pagamento registrado.

Valor inicial:

R$ 1.000


---

# Projeto Inválido

Caso link não exista:


Projeto não encontrado.

Verifique o link informado.


---

# Experiência do Cliente

O cliente não deve:

- criar conta;
- fazer login;
- navegar por menus;
- configurar nada.

Fluxo:

Abrir link.

↓

Visualizar situação.

↓

Escolher pagamento.

↓

Pagar.

↓

Contato caso necessário.

---

# Componentes MVP

Obrigatórios:

- Header;
- Card;
- Button;
- Input;
- Modal;
- Badge;
- Progress Bar;
- Payment Card;
- Payment History;
- WhatsApp Button.

---

# Fora do Escopo Visual

Não criar:

- gráficos complexos;
- dashboards avançados;
- relatórios;
- calendário;
- CRM;
- sistema de tarefas.

---

# Resultado Esperado

A interface final deve parecer:

"Um painel financeiro simples, elegante e confiável para freelancers acompanharem pagamentos de projetos."

O cliente deve compreender toda a situação financeira sem precisar conversar com o administrador