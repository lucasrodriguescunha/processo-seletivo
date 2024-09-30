import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-alterar-status-tarefa',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './alterar-status-tarefa.component.html',
  styleUrl: './alterar-status-tarefa.component.css',
})
export class AlterarStatusTarefaComponent {
  tarefaId: number | null = null;
  novoStatus: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  alterarStatus() {
    if (this.tarefaId && this.novoStatus) {
      this.apiService
        .updateTarefaStatus(this.tarefaId, this.novoStatus)
        .subscribe(
          () => {
            alert('Status da tarefa atualizado com sucesso!');
            this.router.navigate(['/listar-tarefas']);
          },
          (error) => {
            console.error('Erro ao atualizar o status da tarefa', error);
          }
        );
    }
  }
}
