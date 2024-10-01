CREATE TABLE projetos (
                          id SERIAL PRIMARY KEY,  -- Identificador único e autoincrementável para cada projeto
                          nome VARCHAR(255) NOT NULL,  -- Nome do projeto é obrigatório e limitado a 255 caracteres
                          descricao TEXT NOT NULL,  -- Descrição detalhada do projeto, campo obrigatório
                          status VARCHAR(50) DEFAULT NULL,  -- Status do projeto opcional, permite valores nulos
                          data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Define a data de criação com valor padrão sendo o momento da inserção
);

CREATE TABLE tarefas (
                         id SERIAL PRIMARY KEY,  -- Identificador único e autoincrementável para cada tarefa
                         nome VARCHAR(255) NOT NULL,  -- Nome da tarefa é obrigatório e limitado a 255 caracteres
                         descricao TEXT NOT NULL,  -- Descrição detalhada da tarefa, campo obrigatório
                         concluida BOOLEAN DEFAULT FALSE,  -- Indica se a tarefa foi concluída ou não, com valor padrão sendo falso
                         status VARCHAR(50) DEFAULT NULL,  -- Status da tarefa opcional, permite valores nulos
                         projeto_id BIGINT,  -- Relaciona a tarefa a um projeto específico
                         FOREIGN KEY (projeto_id) REFERENCES projetos(id) ON DELETE CASCADE  -- Chave estrangeira ligando à tabela projetos; ao excluir um projeto, as tarefas associadas também serão excluídas
);
