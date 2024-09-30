import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';
import { Tarefa } from '../../../models/tarefa.model';

@Component({
  selector: 'app-listar-tarefas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listar-tarefas.component.html',
  styleUrl: './listar-tarefas.component.css',
})
export class ListarTarefasComponent implements OnInit {
  tarefas: Tarefa[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.listarTarefas();
  }

  listarTarefas() {
    this.apiService.getTarefas().subscribe(
      (response) => {
        console.log('Tarefas retornadas:', response);  // Verifique o status aqui
        this.tarefas = response.map((tarefa) => ({
          id: tarefa.id,
          nome: tarefa.nome,
          descricao: tarefa.descricao,
          concluida: tarefa.concluida,
          projetoId: tarefa.projetoId,
          status: tarefa.status || 'Não iniciada',  // Certifique-se de que o status está presente
        }));

        this.tarefas.sort((a, b) => a.id - b.id);
      },
      (error) => {
        console.error('Erro ao listar tarefas', error);
      }
    );
  }

}
