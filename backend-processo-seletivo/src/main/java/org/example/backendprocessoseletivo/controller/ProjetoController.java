package org.example.backendprocessoseletivo.controller;

import jakarta.validation.Valid;
import org.example.backendprocessoseletivo.model.Projeto;
import org.example.backendprocessoseletivo.repository.ProjetoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/projetos")
@CrossOrigin(origins = "http://localhost:4200") // Permite requisições do front-end hospedado no Angular
public class ProjetoController {

    @Autowired
    private ProjetoRepository projetoRepository;

    @GetMapping
    public List<Projeto> getAllProjetos() {
        return projetoRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Projeto> getProjetoById(@PathVariable Long id) {
        return projetoRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createProjeto(@RequestBody @Valid Projeto projeto) {
        try {
            projeto.setDataCriacao(LocalDateTime.now());
            projeto.setStatus("Não iniciado"); // Definir o status inicial
            Projeto savedProjeto = projetoRepository.save(projeto);
            return ResponseEntity.ok(savedProjeto);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao criar projeto: " + e.getMessage());
        }
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Object> updateProjetoStatus(@PathVariable Long id, @RequestBody Projeto projetoDetails) {
        return projetoRepository.findById(id)
                .map(projeto -> {
                    projeto.setStatus(projetoDetails.getStatus());  // Atualiza o status
                    projetoRepository.save(projeto);
                    return ResponseEntity.noContent().build(); // Retorna 204 No Content
                })
                .orElseGet(() -> ResponseEntity.notFound().build()); // Retorna 404 Not Found se o projeto não existir
    }

    @PutMapping("/{id}")
    public ResponseEntity<Projeto> updateProjeto(@PathVariable Long id, @RequestBody Projeto projetoDetails) {
        return projetoRepository.findById(id)
                .map(projeto -> {
                    projeto.setNome(projetoDetails.getNome());
                    projeto.setDescricao(projetoDetails.getDescricao());
                    projeto.setStatus(projetoDetails.getStatus()); // Atualize se necessário
                    projeto.setDataCriacao(projeto.getDataCriacao()); // Mantém a data de criação
                    projetoRepository.save(projeto);
                    return ResponseEntity.ok(projeto); // Retorna o projeto atualizado
                })
                .orElseGet(() -> ResponseEntity.notFound().build()); // Retorna 404 Not Found se o projeto não existir
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProjeto(@PathVariable Long id) {
        return projetoRepository.findById(id)
                .map(projeto -> {
                    projetoRepository.delete(projeto);
                    return ResponseEntity.ok().body(Map.of("message", "Projeto excluído com sucesso."));
                })
                .orElseGet(() -> ResponseEntity.status(404).body(Map.of("message", "Projeto não encontrado.")));
    }
}
