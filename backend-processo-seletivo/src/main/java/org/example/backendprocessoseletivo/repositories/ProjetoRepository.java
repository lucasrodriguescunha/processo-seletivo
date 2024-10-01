package org.example.backendprocessoseletivo.repositories;

import org.example.backendprocessoseletivo.models.Projeto;
import org.springframework.data.jpa.repository.JpaRepository;

// Repositório para a entidade Projeto, responsável por acessar e manipular dados do projeto
// Extende JpaRepository, fornecendo operações CRUD como save(), findAll(), findById(), deleteById(), etc.
public interface ProjetoRepository extends JpaRepository<Projeto, Long> {
    // JpaRepository já oferece métodos padrão para CRUD, portanto, não há necessidade de implementações adicionais aqui
}
