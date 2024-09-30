package org.example.backendprocessoseletivo.controller;

import jakarta.validation.Valid;
import org.example.backendprocessoseletivo.model.Tarefa;
import org.example.backendprocessoseletivo.repository.TarefaRepository;
import org.example.backendprocessoseletivo.model.Projeto;
import org.example.backendprocessoseletivo.repository.ProjetoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tarefas")
public class TarefaController {

    @Autowired
    private TarefaRepository tarefaRepository;

    @Autowired
    private ProjetoRepository projetoRepository;

    @GetMapping
    public List<TarefaResponse> getAllTarefas() {
        return tarefaRepository.findAll().stream()
                .map(TarefaResponse::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TarefaResponse> getTarefaById(@PathVariable Long id) {
        return tarefaRepository.findById(id)
                .map(tarefa -> ResponseEntity.ok(new TarefaResponse(tarefa)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/filtro")
    public List<Tarefa> filtrarTarefas(@RequestParam(required = false) Long projetoId) {
        if (projetoId != null) {
            return tarefaRepository.findByProjetoId(projetoId);
        }
        return tarefaRepository.findAll();
    }

    @PutMapping("/{id}")
    public ResponseEntity<TarefaResponse> updateTarefa(@PathVariable Long id, @RequestBody TarefaRequest tarefaRequest) {
        return tarefaRepository.findById(id)
                .map(tarefa -> {
                    tarefa.setDescricao(tarefaRequest.getDescricao());
                    tarefa.setNome(tarefaRequest.getNome());
                    tarefa.setConcluida(tarefaRequest.isConcluida());
                    Tarefa updatedTarefa = tarefaRepository.save(tarefa);
                    return ResponseEntity.ok(new TarefaResponse(updatedTarefa));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Tarefa> updateTarefaStatus(@PathVariable Long id, @RequestBody Map<String, String> request) {
        return tarefaRepository.findById(id)
                .map(tarefa -> {
                    String novoStatus = request.get("status");
                    tarefa.setStatus(novoStatus); // Atualiza o status da tarefa
                    Tarefa updatedTarefa = tarefaRepository.save(tarefa);
                    return ResponseEntity.ok(updatedTarefa);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createTarefa(@RequestBody @Valid TarefaRequest tarefaRequest) {
        try {
            Projeto projeto = projetoRepository.findById(tarefaRequest.getProjetoId())
                    .orElseThrow(() -> new RuntimeException("Projeto não encontrado"));

            Tarefa novaTarefa = new Tarefa();
            novaTarefa.setNome(tarefaRequest.getNome());
            novaTarefa.setDescricao(tarefaRequest.getDescricao());
            novaTarefa.setConcluida(tarefaRequest.isConcluida());
            novaTarefa.setProjeto(projeto);

            // Define o status inicial da tarefa como "não iniciada"
            novaTarefa.setStatus("Não iniciada");

            Tarefa savedTarefa = tarefaRepository.save(novaTarefa);
            return ResponseEntity.ok(new TarefaResponse(savedTarefa));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao criar tarefa: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTarefa(@PathVariable Long id) {
        return tarefaRepository.findById(id)
                .map(tarefa -> {
                    tarefaRepository.delete(tarefa);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Classe interna para receber dados da requisição
    public static class TarefaRequest {
        private String nome;
        private String descricao;
        private boolean concluida;
        private Long projetoId;

        // Getters e setters
        public String getNome() {
            return nome;
        }

        public void setNome(String nome) {
            this.nome = nome;
        }

        public String getDescricao() {
            return descricao;
        }

        public void setDescricao(String descricao) {
            this.descricao = descricao;
        }

        public boolean isConcluida() {
            return concluida;
        }

        public void setConcluida(boolean concluida) {
            this.concluida = concluida;
        }

        public Long getProjetoId() {
            return projetoId;
        }

        public void setProjetoId(Long projetoId) {
            this.projetoId = projetoId;
        }
    }

    // Classe interna para a resposta da Tarefa
    public static class TarefaResponse {
        private final Long id;
        private final String nome;
        private final String descricao;
        // Remover o campo concluida
        private final Long projetoId;
        private final String status;

        public TarefaResponse(Tarefa tarefa) {
            this.id = tarefa.getId();
            this.nome = tarefa.getNome();
            this.descricao = tarefa.getDescricao();
            // Remover a atribuição do campo concluida
            this.projetoId = (tarefa.getProjeto() != null) ? tarefa.getProjeto().getId() : null;
            this.status = tarefa.getStatus();
        }

        // Getters
        public Long getId() {
            return id;
        }

        public String getNome() {
            return nome;
        }

        public String getDescricao() {
            return descricao;
        }

        // Remover o getter para concluida
        public Long getProjetoId() {
            return projetoId;
        }

        public String getStatus() {
            return status;
        }
    }
}