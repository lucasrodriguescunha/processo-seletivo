import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-excluir-tarefa',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './excluir-tarefa.component.html',
  styleUrl: './excluir-tarefa.component.css',
})
export class ExcluirTarefaComponent {
  excluirTarefaForm: FormGroup; // Definir o formulário

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private router: Router
  ) {
    // Inicializando o formulário com FormBuilder
    this.excluirTarefaForm = this.fb.group({
      taskId: [''],
    });
  }

  // Método chamado ao submeter o formulário
  onSubmit(): void {
    const id = this.excluirTarefaForm.value.taskId;
    if (id) {
      this.apiService.deleteTarefa(id).subscribe({
        next: () => {
          alert('Tarefa excluída com sucesso!'); // Alerta de sucesso
          this.router.navigate(['/listar-tarefas']); // Redireciona para a página de listagem
        },
        error: (err) => {
          console.error('Erro ao excluir a tarefa:', err);
          alert('Erro ao excluir a tarefa.'); // Alerta de erro
        },
      });
    } else {
      console.warn('ID da tarefa não informado');
    }
  }
}
