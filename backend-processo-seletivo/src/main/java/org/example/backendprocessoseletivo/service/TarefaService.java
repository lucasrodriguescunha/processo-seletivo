package org.example.backendprocessoseletivo.service;

import org.example.backendprocessoseletivo.model.Tarefa;
import org.example.backendprocessoseletivo.repository.TarefaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

// Serviço responsável por manipular as regras de negócio das tarefas
@Service
public class TarefaService {

    @Autowired
    private TarefaRepository tarefaRepository;  // Injeta o repositório de tarefas para acesso aos dados

    // Filtra tarefas com base no status e ID do projeto
    public List<Tarefa> filtrarTarefas(String status, Long projetoId) {
        if (status != null && projetoId != null) {
            // Se ambos status e ID do projeto forem fornecidos, busca por ambos os critérios
            return tarefaRepository.findByStatusAndProjetoId(status, projetoId);
        } else if (status != null) {
            // Se apenas o status for fornecido, busca por status
            return tarefaRepository.findByStatus(status);
        } else if (projetoId != null) {
            // Se apenas o ID do projeto for fornecido, busca por ID do projeto
            return tarefaRepository.findByProjetoId(projetoId);
        } else {
            // Se nenhum filtro for fornecido, retorna todas as tarefas
            return tarefaRepository.findAll();
        }
    }
}
