package org.example.backendprocessoseletivo.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "tarefas")  // Define que esta classe representa a tabela 'tarefas' no banco de dados
public class Tarefa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Gera o ID automaticamente usando a estratégia de auto incremento
    private Long id;

    private String nome;  // Nome da tarefa
    private String descricao;  // Descrição detalhada da tarefa
    private boolean concluida;  // Indica se a tarefa foi concluída
    private String status;  // Status da tarefa (em andamento, concluída, etc.)

    @ManyToOne  // Define a relação Many-to-One (muitas tarefas para um projeto)
    @JsonBackReference  // Evita loop infinito na serialização JSON
    @JoinColumn(name = "projeto_id")  // Especifica a coluna de chave estrangeira 'projeto_id' na tabela 'tarefas'
    private Projeto projeto;  // Relacionamento com a entidade Projeto

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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
