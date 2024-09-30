import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Tarefa } from '../../../models/tarefa.model';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-filtrar-tarefas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filtrar-tarefas.component.html',
  styleUrl: './filtrar-tarefas.component.css',
})
export class FiltrarTarefasComponent {
  projetoId: number | undefined;
  tarefasFiltradas: Tarefa[] = [];

  constructor(private apiService: ApiService) {}

  // Método para filtrar tarefas
  onFiltrarTarefas() {
    if (this.projetoId) {
      this.apiService.filtrarTarefasPorProjeto(this.projetoId).subscribe(
        (tarefas) => {
          this.tarefasFiltradas = tarefas;
        },
        (error) => {
          console.error('Erro ao filtrar tarefas:', error);
        }
      );
    }
  }
}
