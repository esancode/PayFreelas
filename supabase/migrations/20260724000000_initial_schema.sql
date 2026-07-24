-- Criação da tabela administradores
CREATE TABLE administradores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    criado_em TIMESTAMP DEFAULT NOW()
);

-- Criação da tabela projetos
CREATE TABLE projetos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    administrador_id UUID NOT NULL,
    token_publico VARCHAR(255) UNIQUE NOT NULL,
    nome VARCHAR(255) NOT NULL,
    cliente_nome VARCHAR(255) NOT NULL,
    valor_total DECIMAL(10,2) NOT NULL,
    criado_em TIMESTAMP DEFAULT NOW(),
    atualizado_em TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (administrador_id) REFERENCES administradores(id) ON DELETE CASCADE
);

-- Criação do tipo enumerado para os métodos de pagamento
CREATE TYPE metodo_pagamento AS ENUM (
    'PIX',
    'DEPOSITO',
    'CARTAO_CREDITO'
);

-- Criação da tabela pagamentos
CREATE TABLE pagamentos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    projeto_id UUID NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    metodo metodo_pagamento NOT NULL,
    observacao TEXT,
    criado_em TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (projeto_id) REFERENCES projetos(id) ON DELETE CASCADE
);

-- Criação da tabela config_pagamentos
CREATE TABLE config_pagamentos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    administrador_id UUID NOT NULL,
    chave_pix TEXT,
    banco_deposito VARCHAR(100),
    dados_deposito TEXT,
    whatsapp VARCHAR(30),
    FOREIGN KEY(administrador_id) REFERENCES administradores(id) ON DELETE CASCADE
);

-- Criação de índices para performance
CREATE INDEX idx_projetos_token ON projetos(token_publico);
CREATE INDEX idx_pagamentos_projeto ON pagamentos(projeto_id);
CREATE INDEX idx_projetos_admin ON projetos(administrador_id);

-- Configurações de RLS (Row Level Security)
ALTER TABLE administradores ENABLE ROW LEVEL SECURITY;
ALTER TABLE projetos ENABLE ROW LEVEL SECURITY;
ALTER TABLE pagamentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE config_pagamentos ENABLE ROW LEVEL SECURITY;

-- Políticas para administradores
-- (Simplificado: assumindo que o acesso backend usará service_role bypass ou validação no servidor)
-- A política final de segurança será complementada conforme a autenticação.
