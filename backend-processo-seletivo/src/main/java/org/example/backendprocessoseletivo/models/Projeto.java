package org.example.backendprocessoseletivo.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "projetos")  // Define que esta classe representa a tabela 'projetos' no banco de dados
public class Projeto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Gera o ID automaticamente usando a estratégia de auto incremento
    private Long id;

    private String nome;  // Nome do projeto
    private String descricao;  // Descrição do projeto
    private String status;  // Status do projeto (ativo, finalizado, etc.)

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss.SSSSSS")
    private LocalDateTime dataCriacao;  // Data de criação do projeto, formatada para JSON

    @OneToMany(mappedBy = "projeto", cascade = CascadeType.ALL)  // Define o relacionamento One-to-Many com Tarefa, mapeado por 'projeto' na classe Tarefa
    @JsonManagedReference  // Resolve referência cíclica com a entidade Tarefa durante a serialização JSON
    private List<Tarefa> tarefas = new ArrayList<>();  // Lista de tarefas associadas ao projeto

    // Getters e Setters para os campos da entidade

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(LocalDateTime dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public List<Tarefa> getTarefas() {
        return tarefas;
    }

    public void setTarefas(List<Tarefa> tarefas) {
        this.tarefas = tarefas;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
