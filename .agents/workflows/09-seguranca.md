# 09 - Segurança

# Introdução

Este documento descreve as medidas de segurança do sistema Payment Progress.

O objetivo é garantir que as informações dos projetos, pagamentos e usuários administrativos sejam protegidas, mantendo a integridade financeira e a confiança do sistema.

O sistema **não é um sistema de pagamento**.

O sistema:

- não processa cartões;
- não armazena cartões;
- não armazena CVV;
- não recebe dados bancários sensíveis;
- não substitui Mercado Pago ou instituições financeiras.

Ele funciona apenas como uma plataforma de acompanhamento financeiro integrada com serviços externos. :contentReference[oaicite:0]{index=0}

---

# Princípios de Segurança

O sistema seguirá os seguintes princípios:

## 1. Nunca confiar no cliente

Nenhuma informação enviada pelo navegador deverá ser considerada verdadeira sem validação no backend.

Exemplos:

- valores de pagamento;
- permissões;
- identificadores;
- alterações financeiras.

Toda regra crítica deverá ser executada no servidor.

---

## 2. Mínimo acesso necessário

Cada usuário deverá possuir apenas as permissões necessárias.

Administrador:

- gerencia projetos;
- registra pagamentos;
- acessa informações administrativas.

Cliente:

- apenas visualiza projetos;
- escolhe formas de pagamento;
- realiza pagamentos através de serviços externos.

O cliente nunca possuirá acesso administrativo. :contentReference[oaicite:1]{index=1}

---

## 3. Proteção das informações financeiras

O sistema deverá preservar a confidencialidade e integridade das informações financeiras.

O sistema nunca deverá armazenar:

- número do cartão;
- CVV;
- senha bancária;
- dados sensíveis de pagamento.

Pagamentos via cartão deverão ocorrer exclusivamente no ambiente oficial do Mercado Pago. :contentReference[oaicite:2]{index=2}

---

# Autenticação

## Área Administrativa

A área administrativa deverá possuir autenticação obrigatória.

Somente administradores autenticados poderão:

- criar projetos;
- registrar pagamentos;
- excluir projetos;
- visualizar dados administrativos.

A autenticação deverá utilizar o sistema definido na arquitetura:

- Supabase Auth.

---

## Cliente

O cliente não deverá possuir:

- conta;
- senha;
- login;
- cadastro.

O acesso acontecerá somente através do link público do projeto. :contentReference[oaicite:3]{index=3}

---

# Segurança dos Links Públicos

Cada projeto possuirá um link público único.

Exemplo:


https://app.com/p/8f81d2f2e


## Regras

O identificador público deverá:

- ser único;
- não ser sequencial;
- não permitir descoberta fácil de outros projetos.

Nunca utilizar:


/projeto/1
/projeto/2
/projeto/3


pois isso permite tentativa de acesso a projetos de terceiros.

Utilizar identificadores aleatórios e seguros.

---

# Proteção contra Manipulação

## Frontend nunca é confiável

O frontend poderá ser alterado pelo usuário.

Portanto, validações críticas deverão acontecer no backend.

Exemplos:

## Valor do pagamento

O sistema deverá validar:

- valor maior que zero;
- valor menor ou igual ao saldo restante.

Exemplo:

Projeto:

R$ 1.000

Pago:

R$ 600

Saldo:

R$ 400

Permitido:


R$ 100
R$ 200
R$ 400


Bloqueado:


R$ 401
R$ 500
R$ 1000


---

## Permissões

O backend deverá verificar:

- se o usuário está autenticado;
- se possui permissão administrativa;
- se pode executar determinada ação.

Nunca confiar apenas em esconder botões no frontend.

---

# Segurança Financeira

## Registro de pagamentos

Pagamentos devem possuir rastreabilidade.

O sistema deverá armazenar:

- valor;
- método de pagamento;
- data;
- observação opcional.

:contentReference[oaicite:4]{index=4}

---

## Histórico imutável

Pagamentos não devem ser apagados silenciosamente.

Caso exista algum erro:

- criar novo registro;
- manter histórico da alteração;
- preservar rastreabilidade.

O histórico financeiro deve permanecer confiável. :contentReference[oaicite:5]{index=5}

---

# Integração Mercado Pago

O sistema utilizará o Mercado Pago para pagamentos via cartão.

Fluxo seguro:


Cliente escolhe cartão

↓

Sistema recebe apenas o valor desejado

↓

Backend cria checkout Mercado Pago

↓

Cliente informa dados do cartão no Mercado Pago

↓

Mercado Pago processa pagamento


O sistema nunca terá acesso a:

- número do cartão;
- validade;
- código de segurança;
- dados completos do pagamento.

---

# Segurança de API

As APIs deverão seguir:

## Validação de entrada

Todos os dados recebidos deverão ser validados.

Exemplos:

- strings;
- números;
- UUIDs;
- valores monetários.

---

## Tratamento de erros

Erros internos nunca deverão expor:

- stack traces;
- informações do banco;
- variáveis privadas;
- tokens.

Exemplo incorreto:


Erro SQL:
senha do banco inválida...


Exemplo correto:


Não foi possível completar a operação.


---

# Proteção de Variáveis Sensíveis

Nunca expor no frontend:

- chaves privadas;
- tokens;
- credenciais do banco;
- segredos da API.

Variáveis sensíveis deverão permanecer apenas no ambiente backend.

---

# Banco de Dados

O banco deverá possuir:

- controle de acesso;
- validações;
- políticas de segurança;
- proteção contra consultas indevidas.

Informações administrativas nunca devem ser expostas através da página pública.

---

# Privacidade

A página pública deverá exibir somente informações necessárias.

Permitido:

- nome do projeto;
- valor total;
- valor pago;
- valor restante;
- progresso;
- histórico;
- formas de pagamento.

Nunca exibir:

- dados administrativos;
- configurações internas;
- informações privadas do administrador.

:contentReference[oaicite:6]{index=6}

---

# Proteção Contra Ataques Comuns

## SQL Injection

Prevenir utilizando:

- queries parametrizadas;
- ORM ou biblioteca segura;
- validação de entrada.

---

## XSS

Prevenir:

- escapar conteúdo exibido;
- evitar HTML não confiável;
- validar entradas do usuário.

---

## CSRF

Proteger ações administrativas através de:

- autenticação;
- validação de sessão;
- tokens quando necessário.

---

## Brute Force

Proteger autenticação com:

- limitação de tentativas;
- mecanismos do provedor de autenticação;
- monitoramento.

---

# Logs e Monitoramento

O sistema deverá registrar eventos importantes:

- login administrativo;
- criação de projetos;
- registro de pagamentos;
- alterações financeiras;
- erros críticos.

Nunca registrar:

- senha;
- cartão;
- CVV;
- dados sensíveis.

---

# Backup e Recuperação

O banco deverá possuir mecanismos de:

- backup;
- recuperação de dados;
- preservação histórica.

O objetivo é evitar perda de:

- projetos;
- pagamentos;
- informações financeiras.

---

# Checklist de Segurança

## Autenticação

✅ Área administrativa protegida.

✅ Cliente sem acesso administrativo.

✅ Sessões seguras.

---

## Pagamentos

✅ Nenhum cartão armazenado.

✅ Nenhum CVV armazenado.

✅ Mercado Pago responsável pelo checkout.

---

## Dados

✅ Variáveis privadas protegidas.

✅ Dados públicos limitados.

✅ Histórico financeiro preservado.

---

## Backend

✅ Validações no servidor.

✅ Permissões verificadas.

✅ Entrada de dados validada.

---

# Resumo

O Payment Progress deve ser construído seguindo uma arquitetura segura, porém simples.

O sistema não deve tentar substituir plataformas financeiras.

Sua responsabilidade é:

- organizar informações;
- acompanhar pagamentos;
- transmitir confiança;
- proteger dados administrativos;
- manter histórico financeiro confiável.

A segurança principal do projeto está em **não armazenar informações sensíveis e nunca permitir que o cliente manipule dados financeiros diretamente**.