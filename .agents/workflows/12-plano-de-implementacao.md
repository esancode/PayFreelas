# 12 - Plano de Implementação

# Introdução

Este documento descreve o plano de implementação do sistema **Payment Progress**.

O objetivo é definir uma sequência organizada de desenvolvimento, priorizando o MVP e garantindo que cada etapa seja construída de forma simples, segura e escalável.

O sistema deverá seguir a filosofia:

- código limpo;
- arquitetura simples;
- baixo custo;
- foco na experiência do usuário;
- evolução gradual.

O projeto não será construído como um sistema financeiro completo.

Ele será uma plataforma de acompanhamento financeiro de projetos, integrada com serviços externos de pagamento.

---

# Estratégia de Desenvolvimento

A implementação será dividida em fases.

Cada fase deverá entregar uma parte funcional do sistema.

Ordem:

1. Configuração inicial.
2. Estrutura do banco de dados.
3. Autenticação administrativa.
4. Backend e APIs.
5. Painel administrativo.
6. Página pública do cliente.
7. Integrações de pagamento.
8. Segurança.
9. Testes.
10. Deploy.

---

# Fase 01 - Configuração Inicial

## Objetivo

Preparar o ambiente de desenvolvimento.

## Tarefas

Criar projeto Next.js.

Configurar:

- TypeScript;
- TailwindCSS;
- ESLint;
- estrutura de pastas;
- variáveis de ambiente.

## Estrutura inicial esperada


src/
├── app/
├── components/
├── lib/
├── services/
├── types/
└── utils/


## Resultado esperado

Projeto executando localmente com ambiente preparado.

---

# Fase 02 - Configuração do Supabase

## Objetivo

Preparar banco de dados e serviços necessários.

## Tarefas

Criar projeto no Supabase.

Configurar:

- PostgreSQL;
- autenticação administrativa;
- políticas de acesso;
- conexão com aplicação.

## Serviços utilizados

Banco:

PostgreSQL através do Supabase.

Autenticação:

Supabase Auth.

---

# Fase 03 - Implementação do Banco de Dados

## Objetivo

Criar estrutura responsável pelo armazenamento das informações.

## Entidades principais

## Administradores

Responsável pelo acesso ao painel.

Dados:

- id;
- email;
- senha gerenciada pelo Supabase Auth.

---

## Projetos

Armazena informações dos projetos.

Campos esperados:

- id;
- nome;
- nome_cliente;
- valor_total;
- identificador_publico;
- criado_em.

---

## Pagamentos

Armazena o histórico financeiro.

Campos esperados:

- id;
- projeto_id;
- valor;
- metodo;
- data;
- observacao;
- criado_em.

---

# Regras Importantes

O histórico financeiro nunca deverá ser apagado silenciosamente.

Correções deverão gerar novos registros.

O sistema deverá manter rastreabilidade completa.

---

# Fase 04 - Autenticação Administrativa

## Objetivo

Criar área protegida para gerenciamento.

## Implementação

Utilizar:

- Supabase Auth;
- middleware de proteção;
- controle de sessão.

## Permissões

Administrador poderá:

- criar projetos;
- visualizar projetos;
- registrar pagamentos;
- excluir projetos.

Cliente:

- sem conta;
- sem login;
- sem permissões administrativas.

---

# Fase 05 - Desenvolvimento da API

## Objetivo

Criar camada responsável pela comunicação entre frontend e banco.

## Endpoints principais

---

## Projetos

### Criar projeto


POST /api/projects


Responsável por:

- validar dados;
- criar projeto;
- gerar identificador público.

---

### Buscar projeto público


GET /api/projects/:id


Retorna:

- nome;
- valor total;
- pagamentos;
- progresso;
- saldo restante.

---

### Excluir projeto


DELETE /api/projects/:id


Somente administrador.

---

## Pagamentos

### Registrar pagamento


POST /api/payments


Dados:

- valor;
- método;
- observação.

---

### Listar pagamentos


GET /api/payments/:projectId


---

# Regras de Backend

Toda validação financeira deverá acontecer no servidor.

Nunca confiar apenas no frontend.

Exemplos:

- valor máximo permitido;
- permissões;
- criação de pagamentos;
- alterações financeiras.

---

# Fase 06 - Painel Administrativo

## Objetivo

Criar interface para gerenciamento dos projetos.

## Funcionalidades

Administrador deverá conseguir:

- visualizar projetos;
- criar projeto;
- copiar link público;
- registrar pagamentos;
- visualizar progresso;
- excluir projeto.

---

# Componentes principais

- Dashboard;
- Cards de projetos;
- Modal de criação;
- Formulário de pagamento;
- Histórico financeiro.

---

# Fase 07 - Página Pública do Cliente

## Objetivo

Criar experiência simples para acompanhamento.

## Características

Acesso:

Sem login.

Apenas através do link público.

---

## Informações exibidas

- nome do projeto;
- valor total;
- valor pago;
- valor restante;
- percentual concluído;
- histórico;
- formas de pagamento;
- botão WhatsApp.

---

# Experiência esperada

O cliente deve entender rapidamente:

Quanto custa.

Quanto já pagou.

Quanto falta.

---

# Fase 08 - Implementação dos Pagamentos

## Objetivo

Adicionar suporte aos métodos de pagamento.

---

# Pix

## Fluxo

Cliente visualiza instruções.

↓

Realiza pagamento.

↓

Administrador confirma.

↓

Administrador registra pagamento.

O pagamento via Pix deverá cair no banco Inter do administrador. :contentReference[oaicite:0]{index=0}

---

# Depósito

## Fluxo

Cliente visualiza dados bancários.

↓

Realiza depósito.

↓

Administrador confirma.

↓

Administrador registra pagamento.

Depósitos deverão utilizar o Banco do Brasil do administrador. :contentReference[oaicite:1]{index=1}

---

# Cartão de Crédito

## Fluxo

Cliente seleciona:

Cartão de Crédito.

↓

Sistema pergunta:

"Quanto deseja pagar?"

↓

Cliente informa valor.

↓

Backend valida saldo restante.

↓

Sistema cria checkout Mercado Pago.

↓

Cliente realiza pagamento no ambiente externo.

O cartão deverá ser processado pelo Mercado Pago, sem armazenamento de dados sensíveis pelo sistema. :contentReference[oaicite:2]{index=2}

Os pagamentos via cartão deverão cair no Mercado Pago do administrador. :contentReference[oaicite:3]{index=3}

---

# Fase 09 - Segurança

## Objetivo

Garantir proteção das informações.

## Implementações

- variáveis privadas protegidas;
- validação no backend;
- IDs públicos seguros;
- autenticação administrativa;
- políticas do Supabase;
- proteção contra acesso indevido.

---

# Dados que nunca serão armazenados

- número do cartão;
- CVV;
- senha bancária;
- dados sensíveis.

---

# Fase 10 - Testes

## Objetivo

Validar funcionamento do sistema.

## Testes obrigatórios

---

## Projetos

Testar:

- criação;
- geração de link;
- visualização pública.

---

## Pagamentos

Testar:

- registro manual;
- cálculo do saldo;
- atualização do progresso;
- histórico.

---

## Cartão

Testar:

- escolha de valor;
- bloqueio acima do saldo;
- criação do checkout.

---

## Segurança

Testar:

- acesso sem permissão;
- URLs inválidas;
- manipulação pelo frontend.

---

# Fase 11 - Deploy

## Objetivo

Publicar sistema em ambiente real.

## Serviços

Hospedagem:

Vercel.

Banco:

Supabase.

---

# Checklist de Produção

Antes da publicação:

✅ Variáveis de ambiente configuradas.

✅ Banco configurado.

✅ Autenticação funcionando.

✅ APIs protegidas.

✅ Links públicos funcionando.

✅ Cálculos financeiros validados.

✅ Interface responsiva.

---

# Fase 12 - Pós MVP

Após o lançamento inicial, novas funcionalidades poderão ser avaliadas.

Possíveis evoluções:

- Webhooks Mercado Pago;
- confirmação automática de pagamentos;
- notificações;
- anexos;
- etapas do projeto;
- contratos;
- múltiplos administradores;
- múltiplas empresas;
- versão SaaS.

---

# Ordem Prioritária do MVP

A ordem de prioridade deve ser:

## Alta prioridade

1. Criar projeto.
2. Gerar link público.
3. Visualizar projeto.
4. Registrar pagamentos.
5. Calcular progresso.
6. Histórico financeiro.

---

## Média prioridade

7. Integração Mercado Pago.
8. Melhorias no painel administrativo.
9. Melhorias visuais.

---

## Baixa prioridade

10. Recursos avançados.
11. Automatizações.
12. Funcionalidades SaaS.

---

# Critério de Conclusão

O MVP será considerado concluído quando:

✅ Administrador conseguir criar projetos.

✅ Sistema gerar links públicos seguros.

✅ Cliente conseguir acompanhar pagamentos sem cadastro.

✅ Administrador conseguir registrar pagamentos.

✅ Progresso financeiro atualizar corretamente.

✅ Histórico permanecer confiável.

✅ Pagamento via Mercado Pago funcionar através de checkout externo.

✅ Interface transmitir simplicidade e profissionalismo.

---

# Resultado Esperado

Ao final da implementação, o Payment Progress deverá ser uma plataforma simples onde freelancers conseguem compartilhar um único link com seus clientes e eliminar dúvidas sobre pagamentos.

O cliente deverá abrir o link e entender imediatamente:

- valor total;
- quanto já pagou;
- quanto falta;
- como realizar o próximo pagamento.

Sem burocracia.

Sem contas.

Sem complexidade.