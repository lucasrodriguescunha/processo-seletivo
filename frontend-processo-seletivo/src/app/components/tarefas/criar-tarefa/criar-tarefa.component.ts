import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import { Tarefa } from '../../../models/tarefa.model';

@Component({
  selector: 'app-criar-tarefa',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './criar-tarefa.component.html',
  styleUrl: './criar-tarefa.component.css',
})
export class CriarTarefaComponent {
  nome: string = '';
  descricao: string = '';
  projetoId: number | null = null;

  constructor(private apiService: ApiService, private router: Router) {}

  criarTarefa() {
    const payload: Tarefa = {
      id: 0, // ou outro valor padrão
      nome: this.nome,
      descricao: this.descricao,
      concluida: false, // Tarefa começa como não concluída
      projetoId: this.projetoId,
      status: 'não iniciada', // Definindo o status como "não iniciada"
    };

    this.apiService.createTarefa(payload).subscribe(
      () => {
        alert('Tarefa criada com sucesso!');
        this.router.navigate(['/listar-tarefas']);
      },
      (error) => {
        console.error('Erro ao criar tarefa', error);
      }
    );
  }
}
