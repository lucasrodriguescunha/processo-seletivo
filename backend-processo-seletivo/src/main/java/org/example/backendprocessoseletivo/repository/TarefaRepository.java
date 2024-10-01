package org.example.backendprocessoseletivo.repository;

import org.example.backendprocessoseletivo.model.Tarefa;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

// Repositório para a entidade Tarefa, responsável por acessar e manipular dados
// Estende JpaRepository para herdar operações CRUD e facilitar consultas JPA
public interface TarefaRepository extends JpaRepository<Tarefa, Long> {

    // Utiliza EntityGraph para carregar a entidade 'projeto' associada a cada tarefa
    @EntityGraph(attributePaths = "projeto")
    List<Tarefa> findAll();  // Sobrescreve findAll para incluir o carregamento do projeto

    // Retorna uma lista de tarefas associadas a um projeto específico via ID
    List<Tarefa> findByProjetoId(Long projetoId);

    // Retorna uma lista de tarefas com base no status fornecido
    List<Tarefa> findByStatus(String status);

    // Retorna uma lista de tarefas filtradas pelo status e pelo ID do projeto
    List<Tarefa> findByStatusAndProjetoId(String status, Long projetoId);
}
