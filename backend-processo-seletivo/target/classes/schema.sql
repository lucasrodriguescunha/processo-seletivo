CREATE TABLE projetos (
                         id SERIAL PRIMARY KEY,
                         nome VARCHAR(255) NOT NULL,
                         descricao TEXT NOT NULL,
                         status VARCHAR(50) DEFAULT NULL, -- Permite que o status seja NULL
                         data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tarefas (
                        id SERIAL PRIMARY KEY,
                        nome VARCHAR(255) NOT NULL,
                        descricao TEXT NOT NULL,
                        concluida BOOLEAN DEFAULT FALSE,
                        status VARCHAR(50) DEFAULT NULL, -- Permite que o status seja NULL
                        projeto_id BIGINT,
                        FOREIGN KEY (projeto_id) REFERENCES projetos(id) ON DELETE CASCADE
);
