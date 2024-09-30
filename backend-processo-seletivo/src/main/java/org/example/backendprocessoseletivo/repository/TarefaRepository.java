package org.example.backendprocessoseletivo.repository;

import org.example.backendprocessoseletivo.model.Tarefa;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

// Interface de repositório para a entidade Tarefa
// Extende JpaRepository para operações CRUD e consultas personalizadas
public interface TarefaRepository extends JpaRepository<Tarefa, Long> {

    // Carrega o projeto associado a cada tarefa
    @EntityGraph(attributePaths = "projeto")
    List<Tarefa> findAll();

    // Método para encontrar tarefas associadas a um projeto específico
    List<Tarefa> findByProjetoId(Long projetoId);

    // Método para encontrar tarefas pelo status
    List<Tarefa> findByStatus(String status);

    // Método para encontrar tarefas pelo status e ID do projeto
    List<Tarefa> findByStatusAndProjetoId(String status, Long projetoId);
}
