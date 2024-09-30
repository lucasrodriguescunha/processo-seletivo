import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alterar-status-projeto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './alterar-status-projeto.component.html',
  styleUrl: './alterar-status-projeto.component.css',
})
export class AlterarStatusProjetoComponent {
  projeto = {
    id: null,
    status: '',
  };

  constructor(private http: HttpClient, private router: Router) {}

  atualizarProjetoStatus() {
    if (this.projeto.id && this.projeto.status) {
      const url = `http://localhost:8080/api/projetos/${this.projeto.id}/status`;
      this.http.put(url, { status: this.projeto.status }).subscribe({
        next: (response) => {
          console.log('Status atualizado com sucesso', response);
          alert('Status do projeto atualizado com sucesso!');
          this.router.navigate(['/listar-projetos']);
        },
        error: (error) => {
          console.error('Erro ao atualizar o status do projeto', error);
        },
      });
    }
  }
}
