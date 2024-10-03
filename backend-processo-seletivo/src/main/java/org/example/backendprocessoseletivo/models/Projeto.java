package org.example.backendprocessoseletivo.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "projetos")  // Define que esta classe representa a tabela 'projetos' no banco de dados
@Data
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
}
