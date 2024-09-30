import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { FormsModule } from '@angular/forms';
import { Tarefa } from '../../../models/tarefa.model';

@Component({
  selector: 'app-atualizar-tarefa',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './atualizar-tarefa.component.html',
  styleUrl: './atualizar-tarefa.component.css',
})
export class AtualizarTarefaComponent implements OnInit {
  tarefaId: string = '';
  tarefa: Tarefa = {
    id: 0,
    nome: '',
    descricao: '',
    concluida: false,
    projetoId: null,
  };

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.tarefaId = params['id'];
      this.buscarTarefa();
    });
  }

  buscarTarefa() {
    if (this.tarefaId) {
      this.apiService.getTarefaById(Number(this.tarefaId)).subscribe(
        (response) => {
          this.tarefa = response;
        },
        (error) => {
          console.error('Erro ao buscar a tarefa', error);
          alert('Tarefa não encontrada!');
          this.tarefa = {
            id: 0,
            nome: '',
            descricao: '',
            concluida: false,
            projetoId: null,
          }; // Limpa os campos
        }
      );
    }
  }

  atualizarTarefa() {
    if (!this.tarefaId) {
      alert('Por favor, insira o ID da tarefa.');
      return;
    }

    this.apiService.updateTarefa(Number(this.tarefaId), this.tarefa).subscribe(
      () => {
        alert('Tarefa atualizada com sucesso!');

        this.router.navigate(['/listar-tarefas']);
      },
      (error) => {
        console.error('Erro ao atualizar a tarefa', error);
        alert('Erro ao atualizar a tarefa. Tente novamente.');
      }
    );
  }
}
