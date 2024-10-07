import { Component } from '@angular/core'; // Importa o decorador Component do Angular
import { ApiService } from '../../../services/api.service'; // Serviço personalizado para comunicação com a API
import { Router } from '@angular/router'; // Importa o serviço de navegação do Angular Router
import { FormsModule } from '@angular/forms'; // Módulo para trabalhar com formulários no Angular

@Component({
  selector: 'app-alterar-status-tarefa', // Seletor do componente
  standalone: true, // Componente autônomo, não depende de um módulo pai
  imports: [FormsModule], // Importação do FormsModule para lidar com formulários
  templateUrl: './alterar-status-tarefa.component.html', // Caminho para o template HTML do componente
  styleUrl: './alterar-status-tarefa.component.css', // Caminho para o arquivo de estilo CSS
})
export class AlterarStatusTarefaComponent {
  // Define as propriedades do componente
  tarefaId: number | null = null; // Armazena o ID da tarefa, inicialmente null
  novoStatus: string = ''; // Armazena o novo status da tarefa, inicialmente vazio

  // Construtor com injeção de dependências para o ApiService (comunicação com API) e Router (navegação)
  constructor(private apiService: ApiService, private router: Router) {}

  // Método responsável por alterar o status da tarefa
  alterarStatus() {
    // Verifica se o ID da tarefa e o novo status foram preenchidos
    if (this.tarefaId && this.novoStatus) {
      // Chama o serviço para atualizar o status da tarefa via API
      this.apiService
        .updateTarefaStatus(this.tarefaId, this.novoStatus)
        .subscribe(
          () => {
            // Em caso de sucesso, exibe uma mensagem de sucesso
            alert('Status da tarefa atualizado com sucesso!');
            // Redireciona o usuário para a lista de tarefas
            this.router.navigate(['/listar-tarefas']);
          },
          (error) => {
            // Em caso de erro, exibe uma mensagem no console
            console.error('Erro ao atualizar o status da tarefa', error);
          }
        );
    }
  }
}
