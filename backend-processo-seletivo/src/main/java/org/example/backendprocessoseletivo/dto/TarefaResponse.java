package org.example.backendprocessoseletivo.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.example.backendprocessoseletivo.models.Tarefa;

@Getter
@RequiredArgsConstructor
public class TarefaResponse {
    private final Long id; // ID da tarefa
    private final String nome; // Nome da tarefa
    private final String descricao; // Descrição da tarefa
    private final Long projetoId; // ID do projeto associado à tarefa
    private final String status; // Status da tarefa

    // Construtor que mapeia a tarefa para a resposta
    public TarefaResponse(Tarefa tarefa) {
        this.id = tarefa.getId();
        this.nome = tarefa.getNome();
        this.descricao = tarefa.getDescricao();
        this.projetoId = (tarefa.getProjeto() != null) ? tarefa.getProjeto().getId() : null; // Evita NullPointerException
        this.status = tarefa.getStatus();  // Inclui o status da tarefa na resposta
    }
}