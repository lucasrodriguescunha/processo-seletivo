import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-excluir-projeto',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './excluir-projeto.component.html',
  styleUrl: './excluir-projeto.component.css',
})
export class ExcluirProjetoComponent {
  projectId: number | null = null;

  constructor(private apiService: ApiService, private router: Router) {}

  onExcluirProjeto() {
    if (this.projectId !== null) {
      this.apiService.excluirProjeto(this.projectId).subscribe({
        next: (response) => {
          console.log(
            `Projeto com ID ${this.projectId} foi excluído.`,
            response
          );
          alert('Projeto excluído com sucesso!');
          this.router.navigate(['/listar-projetos']);
        },
        error: (error) => {
          console.error('Erro ao excluir projeto:', error);
          console.error('Detalhes do erro:', error.error);
          if (error.status === 404) {
            alert('Projeto não encontrado. Verifique o ID e tente novamente.');
          } else {
            alert('Erro ao excluir o projeto. Tente novamente.');
          }
        },
      });
    }
  }
}
