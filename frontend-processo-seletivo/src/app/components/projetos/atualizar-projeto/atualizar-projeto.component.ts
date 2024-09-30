import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Projeto } from '../../../models/projeto.model';

@Component({
  selector: 'app-atualizar-projeto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './atualizar-projeto.component.html',
  styleUrl: './atualizar-projeto.component.css',
})
export class AtualizarProjetoComponent implements OnInit {
  projeto: Projeto = { id: 0, nome: '', descricao: '', status: 'Não iniciado' }; // Adicione a propriedade 'status'

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarProjeto();
  }

  carregarProjeto(): void {
    const id = +this.route.snapshot.paramMap.get('id')!; // Obtém o ID da rota
    if (id) {
      this.apiService.getProjeto(id).subscribe(
        (data) => {
          this.projeto = data; // Carrega os dados do projeto no formulário
        },
        (error) => {
          console.error('Erro ao carregar projeto', error);
        }
      );
    }
  }

  atualizarProjeto(): void {
    if (this.projeto.id) {
      this.apiService.updateProjeto(this.projeto).subscribe(
        () => {
          alert('Projeto atualizado com sucesso!');
          this.router.navigate(['/listar-projetos']); // Redireciona após atualização
        },
        (error) => {
          console.error('Erro ao atualizar projeto', error);
          alert('Falha ao atualizar o projeto. Tente novamente.'); // Mensagem de erro amigável
        }
      );
    } else {
      alert('ID do projeto não fornecido.'); // Mensagem de erro amigável
    }
  }
}
