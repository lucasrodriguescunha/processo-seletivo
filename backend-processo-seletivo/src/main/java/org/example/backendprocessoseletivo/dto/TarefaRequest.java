package org.example.backendprocessoseletivo.dto;

import lombok.Data;

@Data
public class TarefaRequest {
    private String nome; // Nome da tarefa
    private String descricao; // Descrição da tarefa
    private boolean concluida; // Indica se a tarefa foi concluída
    private Long projetoId; // ID do projeto associado à tarefa
}