package org.example.backendprocessoseletivo.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "tarefas")  // Define que esta classe representa a tabela 'tarefas' no banco de dados
@Data
public class Tarefa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Gera o ID automaticamente usando a estratégia de auto incremento
    private Long id;

    private String nome;  // Nome da tarefa
    private String descricao;  // Descrição detalhada da tarefa
    private boolean concluida;  // Indica se a tarefa foi concluída
    private String status;  // Status da tarefa (em andamento, concluída, etc.)

    @ManyToOne  // Define a relação Many-to-One (muitas tarefas para um projeto)
    @JsonBackReference  // Evita loop infinito na serialização JSON
    @JoinColumn(name = "projeto_id")  // Especifica a coluna de chave estrangeira 'projeto_id' na tabela 'tarefas'
    private Projeto projeto;  // Relacionamento com a entidade Projeto
}
