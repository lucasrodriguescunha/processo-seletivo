import { Component } from '@angular/core'; // Importa o decorador Component do Angular
import {
  FormBuilder, // Serviço utilizado para criar formulários reativos
  FormGroup, // Classe que define o formulário como um grupo de controles
  FormsModule, // Módulo de formulários simples
  ReactiveFormsModule, // Módulo de formulários reativos
} from '@angular/forms';
import { ApiService } from '../../../services/api.service'; // Serviço para comunicação com a API
import { Router } from '@angular/router'; // Serviço para navegação entre rotas

@Component({
  selector: 'app-excluir-tarefa', // Seletor do componente
  standalone: true, // Define que o componente é autônomo
  imports: [FormsModule, ReactiveFormsModule], // Importa os módulos necessários para formulários
  templateUrl: './excluir-tarefa.component.html', // Caminho para o arquivo HTML do componente
  styleUrl: './excluir-tarefa.component.css', // Caminho para o arquivo CSS do componente
})
export class ExcluirTarefaComponent {
  excluirTarefaForm: FormGroup; // Define o formulário como um grupo de controles

  // Construtor com injeção de dependências: ApiService (para comunicação com a API),
  // FormBuilder (para construção de formulários) e Router (para navegação)
  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private router: Router
  ) {
    // Inicializa o formulário com um controle chamado 'taskId'
    this.excluirTarefaForm = this.fb.group({
      taskId: [''], // Inicializa o campo com uma string vazia
    });
  }

  // Método acionado ao submeter o formulário
  onSubmit(): void {
    // Obtém o valor do campo 'taskId' do formulário
    const id = this.excluirTarefaForm.value.taskId;

    // Verifica se um ID foi informado
    if (id) {
      // Chama o serviço de API para excluir a tarefa com o ID fornecido
      this.apiService.deleteTarefa(id).subscribe({
        // Caso a exclusão seja bem-sucedida
        next: () => {
          alert('Tarefa excluída com sucesso!'); // Exibe uma mensagem de sucesso
          this.router.navigate(['/listar-tarefas']); // Redireciona para a página de listagem de tarefas
        },
        // Em caso de erro na exclusão
        error: (err) => {
          console.error('Erro ao excluir a tarefa:', err); // Exibe o erro no console
          alert('Erro ao excluir a tarefa.'); // Mostra um alerta de erro
        },
      });
    } else {
      console.warn('ID da tarefa não informado'); // Exibe um aviso se o ID não for informado
    }
  }
}
