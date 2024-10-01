package org.example.backendprocessoseletivo.controller;

// Importando as bibliotecas necessárias
import jakarta.validation.Valid; // Importa a validação de objetos
import org.example.backendprocessoseletivo.model.Projeto; // Importa o modelo de Projeto
import org.example.backendprocessoseletivo.repository.ProjetoRepository; // Importa o repositório de Projeto
import org.springframework.beans.factory.annotation.Autowired; // Importa a anotação para injeção de dependência
import org.springframework.http.ResponseEntity; // Importa a classe ResponseEntity para manipulação de respostas HTTP
import org.springframework.web.bind.annotation.*; // Importa as anotações do Spring para mapeamento de requisições

import java.time.LocalDateTime; // Importa a classe para manipulação de data e hora
import java.util.List; // Importa a lista para retorno de múltiplos objetos
import java.util.Map; // Importa o Map para estrutura de dados em formato chave-valor

@RestController // Indica que esta classe é um controlador REST
@RequestMapping("/api/projetos") // Mapeia as requisições para a URL base "/api/projetos"
@CrossOrigin(origins = "http://localhost:4200") // Permite requisições do front-end hospedado no Angular
public class ProjetoController {

    @Autowired // Injeção de dependência para o repositório de Projetos
    private ProjetoRepository projetoRepository;

    // Endpoint para obter todos os projetos
    @GetMapping
    public List<Projeto> getAllProjetos() {
        return projetoRepository.findAll(); // Retorna todos os projetos armazenados no repositório
    }

    // Endpoint para obter um projeto específico pelo ID
    @GetMapping("/{id}") // Mapeia a requisição GET para "/api/projetos/{id}"
    public ResponseEntity<Projeto> getProjetoById(@PathVariable Long id) {
        return projetoRepository.findById(id) // Tenta encontrar o projeto pelo ID
                .map(ResponseEntity::ok) // Se encontrado, retorna 200 OK com o projeto
                .orElseGet(() -> ResponseEntity.notFound().build()); // Se não encontrado, retorna 404 Not Found
    }

    // Endpoint para criar um novo projeto
    @PostMapping // Mapeia a requisição POST para "/api/projetos"
    public ResponseEntity<?> createProjeto(@RequestBody @Valid Projeto projeto) {
        try {
            projeto.setDataCriacao(LocalDateTime.now()); // Define a data de criação como a data atual
            projeto.setStatus("Não iniciado"); // Define o status inicial do projeto
            Projeto savedProjeto = projetoRepository.save(projeto); // Salva o projeto no repositório
            return ResponseEntity.ok(savedProjeto); // Retorna 200 OK com o projeto salvo
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao criar projeto: " + e.getMessage()); // Retorna 400 Bad Request em caso de erro
        }
    }

    // Endpoint para atualizar o status de um projeto existente
    @PutMapping("/{id}/status") // Mapeia a requisição PUT para "/api/projetos/{id}/status"
    public ResponseEntity<Object> updateProjetoStatus(@PathVariable Long id, @RequestBody Projeto projetoDetails) {
        return projetoRepository.findById(id) // Tenta encontrar o projeto pelo ID
                .map(projeto -> {
                    projeto.setStatus(projetoDetails.getStatus());  // Atualiza o status do projeto
                    projetoRepository.save(projeto); // Salva as alterações
                    return ResponseEntity.noContent().build(); // Retorna 204 No Content
                })
                .orElseGet(() -> ResponseEntity.notFound().build()); // Se não encontrado, retorna 404 Not Found
    }

    // Endpoint para atualizar um projeto existente
    @PutMapping("/{id}") // Mapeia a requisição PUT para "/api/projetos/{id}"
    public ResponseEntity<Projeto> updateProjeto(@PathVariable Long id, @RequestBody Projeto projetoDetails) {
        return projetoRepository.findById(id) // Tenta encontrar o projeto pelo ID
                .map(projeto -> {
                    projeto.setNome(projetoDetails.getNome()); // Atualiza o nome do projeto
                    projeto.setDescricao(projetoDetails.getDescricao()); // Atualiza a descrição do projeto
                    projeto.setStatus(projetoDetails.getStatus()); // Atualiza o status se necessário
                    projeto.setDataCriacao(projeto.getDataCriacao()); // Mantém a data de criação original
                    projetoRepository.save(projeto); // Salva as alterações
                    return ResponseEntity.ok(projeto); // Retorna 200 OK com o projeto atualizado
                })
                .orElseGet(() -> ResponseEntity.notFound().build()); // Se não encontrado, retorna 404 Not Found
    }

    // Endpoint para excluir um projeto
    @DeleteMapping("/{id}") // Mapeia a requisição DELETE para "/api/projetos/{id}"
    public ResponseEntity<?> deleteProjeto(@PathVariable Long id) {
        return projetoRepository.findById(id) // Tenta encontrar o projeto pelo ID
                .map(projeto -> {
                    projetoRepository.delete(projeto); // Exclui o projeto do repositório
                    return ResponseEntity.ok().body(Map.of("message", "Projeto excluído com sucesso.")); // Retorna 200 OK com mensagem de sucesso
                })
                .orElseGet(() -> ResponseEntity.status(404).body(Map.of("message", "Projeto não encontrado."))); // Se não encontrado, retorna 404 Not Found
    }
}
