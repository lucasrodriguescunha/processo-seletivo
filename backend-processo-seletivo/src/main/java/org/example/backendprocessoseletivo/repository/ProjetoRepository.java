package org.example.backendprocessoseletivo.repository;

import org.example.backendprocessoseletivo.model.Projeto;
import org.springframework.data.jpa.repository.JpaRepository;

// Interface de repositório para a entidade Projeto
// Extende JpaRepository para fornecer operações CRUD e métodos adicionais
public interface ProjetoRepository extends JpaRepository<Projeto, Long> {
    // JpaRepository já oferece métodos como save(), findAll(), findById(), deleteById(), etc.
}
