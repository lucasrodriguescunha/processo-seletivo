package org.example.backendprocessoseletivo.service;

import org.example.backendprocessoseletivo.model.Tarefa;
import org.example.backendprocessoseletivo.repository.TarefaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

// Serviço para manipulação das tarefas
@Service
public class TarefaService {

    @Autowired
    private TarefaRepository tarefaRepository;

    // Método para filtrar tarefas com base no status e ID do projeto
    public List<Tarefa> filtrarTarefas(String status, Long projetoId) {
        if (status != null && projetoId != null) {
            // Busca por status e ID do projeto
            return tarefaRepository.findByStatusAndProjetoId(status, projetoId);
        } else if (status != null) {
            // Busca apenas por status
            return tarefaRepository.findByStatus(status);
        } else if (projetoId != null) {
            // Busca apenas por ID do projeto
            return tarefaRepository.findByProjetoId(projetoId);
        } else {
            // Retorna todas as tarefas se nenhum filtro for aplicado
            return tarefaRepository.findAll();
        }
    }
}
