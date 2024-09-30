package org.example.backendprocessoseletivo.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "tarefas")
public class Tarefa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome; // Campo adicionado para o nome da TarefaService
    private String descricao;
    private boolean concluida;
    private String status;

    @ManyToOne // Associa várias tarefas a um projeto
    @JsonBackReference
    @JoinColumn(name = "projeto_id") // Nome da coluna no banco de dados
    private Projeto projeto;

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() { // Getter para o nome da TarefaService
        return nome;
    }

    public void setNome(String nome) { // Setter para o nome da TarefaService
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

    public Projeto getProjeto() {
        return projeto;
    }

    public void setProjeto(Projeto projeto) {
        this.projeto = projeto;
    }

    // Novo campo status
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
