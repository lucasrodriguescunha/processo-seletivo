package org.example.backendprocessoseletivo.controller;

import jakarta.validation.Valid; // Importa a anotação de validação para garantir que os dados recebidos estão corretos
import org.example.backendprocessoseletivo.model.Tarefa; // Importa a entidade Tarefa
import org.example.backendprocessoseletivo.repository.TarefaRepository; // Importa o repositório para a entidade Tarefa
import org.example.backendprocessoseletivo.model.Projeto; // Importa a entidade Projeto
import org.example.backendprocessoseletivo.repository.ProjetoRepository; // Importa o repositório para a entidade Projeto
import org.springframework.beans.factory.annotation.Autowired; // Importa a anotação para injeção de dependência
import org.springframework.http.ResponseEntity; // Importa a classe para construir respostas HTTP
import org.springframework.web.bind.annotation.*; // Importa as anotações para construção de controladores REST

import java.util.List; // Importa a interface List para manipulação de listas
import java.util.Map; // Importa a interface Map para manipulação de pares chave-valor
import java.util.stream.Collectors; // Importa a classe Collectors para facilitar operações com streams

@RestController // Indica que esta classe é um controlador REST
@RequestMapping("/api/tarefas")  // Define o endpoint base para as requisições relacionadas a Tarefas
public class TarefaController {

    @Autowired
    private TarefaRepository tarefaRepository;  // Injeção de dependência do repositório de Tarefas

    @Autowired
    private ProjetoRepository projetoRepository;  // Injeção de dependência do repositório de Projetos

    // Endpoint para obter todas as tarefas
    @GetMapping
    public List<TarefaResponse> getAllTarefas() {
        return tarefaRepository.findAll().stream() // Recupera todas as tarefas do repositório
                .map(TarefaResponse::new)  // Mapeia as tarefas para a classe de resposta
                .collect(Collectors.toList()); // Coleta os resultados em uma lista
    }

    // Endpoint para obter uma tarefa específica pelo ID
    @GetMapping("/{id}")
    public ResponseEntity<TarefaResponse> getTarefaById(@PathVariable Long id) {
        return tarefaRepository.findById(id) // Tenta encontrar a tarefa pelo ID
                .map(tarefa -> ResponseEntity.ok(new TarefaResponse(tarefa)))  // Retorna a tarefa mapeada se encontrada
                .orElse(ResponseEntity.notFound().build());  // Retorna 404 se a tarefa não for encontrada
    }

    // Endpoint para filtrar tarefas com base no ID do projeto
    @GetMapping("/filtro")
    public List<Tarefa> filtrarTarefas(@RequestParam(required = false) Long projetoId) {
        if (projetoId != null) { // Verifica se o ID do projeto foi fornecido
            return tarefaRepository.findByProjetoId(projetoId);  // Filtra tarefas pelo ID do projeto
        }
        return tarefaRepository.findAll();  // Retorna todas as tarefas se o projetoId não for fornecido
    }

    // Endpoint para atualizar uma tarefa existente
    @PutMapping("/{id}")
    public ResponseEntity<TarefaResponse> updateTarefa(@PathVariable Long id, @RequestBody TarefaRequest tarefaRequest) {
        return tarefaRepository.findById(id) // Tenta encontrar a tarefa pelo ID
                .map(tarefa -> {
                    // Atualiza os campos da tarefa com os dados da requisição
                    tarefa.setDescricao(tarefaRequest.getDescricao());
                    tarefa.setNome(tarefaRequest.getNome());
                    tarefa.setConcluida(tarefaRequest.isConcluida());
                    Tarefa updatedTarefa = tarefaRepository.save(tarefa);  // Salva a tarefa atualizada
                    return ResponseEntity.ok(new TarefaResponse(updatedTarefa));  // Retorna a tarefa atualizada
                })
                .orElse(ResponseEntity.notFound().build());  // Retorna 404 se a tarefa não for encontrada
    }

    // Endpoint para atualizar o status de uma tarefa existente
    @PutMapping("/{id}/status")
    public ResponseEntity<Tarefa> updateTarefaStatus(@PathVariable Long id, @RequestBody Map<String, String> request) {
        return tarefaRepository.findById(id) // Tenta encontrar a tarefa pelo ID
                .map(tarefa -> {
                    String novoStatus = request.get("status"); // Obtém o novo status do corpo da requisição
                    tarefa.setStatus(novoStatus);  // Atualiza o status da tarefa
                    Tarefa updatedTarefa = tarefaRepository.save(tarefa);  // Salva a tarefa com o novo status
                    return ResponseEntity.ok(updatedTarefa);  // Retorna a tarefa atualizada
                })
                .orElseGet(() -> ResponseEntity.notFound().build());  // Retorna 404 se a tarefa não for encontrada
    }

    // Endpoint para criar uma nova tarefa
    @PostMapping
    public ResponseEntity<?> createTarefa(@RequestBody @Valid TarefaRequest tarefaRequest) {
        try {
            // Verifica se o projeto associado existe
            Projeto projeto = projetoRepository.findById(tarefaRequest.getProjetoId())
                    .orElseThrow(() -> new RuntimeException("Projeto não encontrado"));  // Lança uma exceção se não encontrado

            // Cria uma nova tarefa com os dados fornecidos
            Tarefa novaTarefa = new Tarefa();
            novaTarefa.setNome(tarefaRequest.getNome());
            novaTarefa.setDescricao(tarefaRequest.getDescricao());
            novaTarefa.setConcluida(tarefaRequest.isConcluida());
            novaTarefa.setProjeto(projeto); // Associa a tarefa ao projeto

            novaTarefa.setStatus("Não iniciada");  // Define o status inicial da tarefa

            Tarefa savedTarefa = tarefaRepository.save(novaTarefa);  // Salva a nova tarefa no repositório
            return ResponseEntity.ok(new TarefaResponse(savedTarefa));  // Retorna a tarefa salva
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao criar tarefa: " + e.getMessage());  // Retorna erro caso ocorra
        }
    }

    // Endpoint para deletar uma tarefa existente
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTarefa(@PathVariable Long id) {
        return tarefaRepository.findById(id) // Tenta encontrar a tarefa pelo ID
                .map(tarefa -> {
                    tarefaRepository.delete(tarefa);  // Deleta a tarefa encontrada
                    return ResponseEntity.noContent().<Void>build();  // Retorna resposta sem conteúdo (204)
                })
                .orElse(ResponseEntity.notFound().build());  // Retorna 404 se a tarefa não for encontrada
    }

    // Classe interna para receber dados da requisição para criação ou atualização de tarefas
    public static class TarefaRequest {
        private String nome; // Nome da tarefa
        private String descricao; // Descrição da tarefa
        private boolean concluida; // Indica se a tarefa foi concluída
        private Long projetoId; // ID do projeto associado à tarefa

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

    // Classe interna para representar a resposta de uma tarefa
    public static class TarefaResponse {
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

        // Getters para acesso aos atributos
        public Long getId() {
            return id;
        }

        public String getNome() {
            return nome;
        }

        public String getDescricao() {
            return descricao;
        }

        public Long getProjetoId() {
            return projetoId;
        }

        public String getStatus() {
            return status;
        }
    }
}
