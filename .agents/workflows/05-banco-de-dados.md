05 - Banco de Dados
Introdução

Este documento descreve a estrutura de banco de dados do sistema Payment Progress.

O banco será responsável por armazenar:

administradores;
projetos;
pagamentos;
informações de configuração de pagamento;
histórico financeiro.

O sistema utiliza PostgreSQL através do Supabase.

O banco não armazenará dados sensíveis de pagamento, como:

número de cartão;
CVV;
senhas bancárias;
dados de cartões.

O sistema apenas acompanha pagamentos realizados através de serviços externos.

Modelo Conceitual

A estrutura principal será:

Administrador
      |
      |
      N
   Projetos
      |
      |
      N
 Pagamentos

Relacionamentos:

Um administrador pode possuir vários projetos.
Um projeto pertence a um administrador.
Um projeto pode possuir vários pagamentos.
Cada pagamento pertence a apenas um projeto.
Entidades
1. Administradores

Responsável pelo acesso ao painel administrativo.

Responsabilidades:

criar projetos;
registrar pagamentos;
visualizar gerenciamento;
excluir projetos.

Somente usuários autenticados possuem acesso administrativo.

Tabela: administradores
Campo	Tipo	Descrição
id	UUID	Identificador único
nome	VARCHAR	Nome do administrador
email	VARCHAR	Email de acesso
criado_em	TIMESTAMP	Data de criação
SQL
CREATE TABLE administradores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    criado_em TIMESTAMP DEFAULT NOW()
);
2. Projetos

Representa cada projeto financeiro criado pelo administrador.

Um projeto possui:

nome;
cliente;
valor total;
link público único;
progresso financeiro.

O projeto deverá possuir um identificador seguro e não previsível para acesso público.

Tabela: projetos
Campo	Tipo	Descrição
id	UUID	Identificador interno
administrador_id	UUID	Dono do projeto
token_publico	VARCHAR	Código público seguro
nome	VARCHAR	Nome do projeto
cliente_nome	VARCHAR	Nome do cliente
valor_total	DECIMAL	Valor total contratado
criado_em	TIMESTAMP	Data de criação
atualizado_em	TIMESTAMP	Última atualização
SQL
CREATE TABLE projetos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    administrador_id UUID NOT NULL,

    token_publico VARCHAR(255) UNIQUE NOT NULL,

    nome VARCHAR(255) NOT NULL,

    cliente_nome VARCHAR(255) NOT NULL,

    valor_total DECIMAL(10,2) NOT NULL,

    criado_em TIMESTAMP DEFAULT NOW(),

    atualizado_em TIMESTAMP DEFAULT NOW(),

    FOREIGN KEY (administrador_id)
    REFERENCES administradores(id)
);
3. Pagamentos

Representa todos os pagamentos registrados no sistema.

O histórico financeiro deve permanecer confiável e rastreável.

Pagamentos não devem ser apagados silenciosamente. Caso exista correção, deve existir um novo registro.

Tabela: pagamentos
Campo	Tipo	Descrição
id	UUID	Identificador
projeto_id	UUID	Projeto relacionado
valor	DECIMAL	Valor pago
metodo	ENUM	Forma de pagamento
observacao	TEXT	Informação adicional
criado_em	TIMESTAMP	Data do registro
Métodos aceitos
PIX
DEPOSITO
CARTAO_CREDITO

Os métodos correspondem às formas disponíveis no sistema.

SQL
CREATE TYPE metodo_pagamento AS ENUM (
    'PIX',
    'DEPOSITO',
    'CARTAO_CREDITO'
);


CREATE TABLE pagamentos (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    projeto_id UUID NOT NULL,

    valor DECIMAL(10,2) NOT NULL,

    metodo metodo_pagamento NOT NULL,

    observacao TEXT,

    criado_em TIMESTAMP DEFAULT NOW(),

    FOREIGN KEY (projeto_id)
    REFERENCES projetos(id)

);
4. Configurações de Pagamento

Armazena informações exibidas ao cliente para realizar pagamentos.

O sistema possui três destinos:

Pix

Pagamento via Pix deve cair no banco Inter do administrador.

Cartão

Pagamento via cartão utiliza Mercado Pago.

Depósito

Depósito deve utilizar Banco do Brasil.

Tabela: config_pagamentos
Campo	Tipo	Descrição
id	UUID	Identificador
administrador_id	UUID	Proprietário
chave_pix	TEXT	Informação Pix
banco_deposito	VARCHAR	Banco para depósito
dados_deposito	TEXT	Dados bancários
whatsapp	VARCHAR	Contato
SQL
CREATE TABLE config_pagamentos (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    administrador_id UUID NOT NULL,

    chave_pix TEXT,

    banco_deposito VARCHAR(100),

    dados_deposito TEXT,

    whatsapp VARCHAR(30),

    FOREIGN KEY(administrador_id)
    REFERENCES administradores(id)

);
Cálculos Financeiros

O banco não armazenará:

valor pago total;
valor restante;
porcentagem concluída.

Esses valores serão calculados dinamicamente.

Valor Pago
SELECT SUM(valor)
FROM pagamentos
WHERE projeto_id = ?
Valor Restante
valor_total - valor_pago
Progresso
(valor_pago / valor_total) * 100

Regra definida pelo requisito RF004.

Índices

Para melhorar consultas:

CREATE INDEX idx_projetos_token
ON projetos(token_publico);


CREATE INDEX idx_pagamentos_projeto
ON pagamentos(projeto_id);


CREATE INDEX idx_projetos_admin
ON projetos(administrador_id);
Segurança
Row Level Security (Supabase)

O banco deverá utilizar políticas de acesso.

Regras:

Administrador:

pode visualizar seus projetos;
pode criar pagamentos;
pode gerenciar seus dados.

Cliente:

somente leitura através do token público.

Cliente nunca poderá:

criar pagamentos;
editar valores;
acessar painel administrativo.
Fluxo de Dados
Criar Projeto
Administrador
      |
      |
Painel Admin
      |
      |
Tabela projetos
Registrar Pagamento
Administrador
      |
      |
Novo pagamento
      |
      |
Tabela pagamentos
      |
      |
Atualização automática dos cálculos
Cliente Visualizando
Cliente acessa:

/p/token_publico

        |

Busca projeto

        |

Busca pagamentos

        |

Calcula progresso
Diagrama Simplificado
+----------------+
| administradores|
+----------------+
        |
        | 1:N
        |
+----------------+
|   projetos     |
+----------------+
        |
        | 1:N
        |
+----------------+
|  pagamentos    |
+----------------+


+----------------------+
| config_pagamentos    |
+----------------------+
        |
        |
        |
administrador
Futuras Evoluções

A estrutura permite futuras funcionalidades:

múltiplos administradores;
múltiplas empresas;
confirmação automática via Webhooks;
integração completa Mercado Pago;
notificações;
contratos;
anexos.

Essas funcionalidades não fazem parte do MVP atual.

Resumo das Tabelas
Tabela	Objetivo
administradores	Usuários do painel
projetos	Projetos financeiros
pagamentos	Histórico financeiro
config_pagamentos	Dados para recebimento
Banco Final MVP
administradores

    |
    |

projetos

    |
    |

pagamentos


administradores

    |
    |

config_pagamentos

Esta estrutura atende aos requisitos funcionais e não funcionais definidos para o Payment Progress.