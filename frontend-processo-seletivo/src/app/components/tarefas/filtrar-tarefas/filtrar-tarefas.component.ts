import { CommonModule } from '@angular/common'; // Importa o módulo comum do Angular
import { Component } from '@angular/core'; // Importa o decorador Component do Angular
import { FormsModule } from '@angular/forms'; // Importa o módulo de formulários do Angular
import { Tarefa } from '../../../models/tarefa.model'; // Importa o modelo Tarefa
import { ApiService } from '../../../services/api.service'; // Importa o serviço de API

@Component({
  selector: 'app-filtrar-tarefas', // Seletor do componente
  standalone: true, // Define que o componente é autônomo
  imports: [CommonModule, FormsModule], // Importa os módulos necessários para este componente
  templateUrl: './filtrar-tarefas.component.html', // Caminho para o arquivo HTML do componente
  styleUrl: './filtrar-tarefas.component.css', // Caminho para o arquivo CSS do componente
})
export class FiltrarTarefasComponent {
  projetoId: number | undefined; // ID do projeto a ser filtrado
  tarefasFiltradas: Tarefa[] = []; // Lista de tarefas filtradas

  // Construtor com injeção de dependência do serviço ApiService
  constructor(private apiService: ApiService) {}

  // Método para filtrar tarefas com base no ID do projeto
  onFiltrarTarefas() {
    // Verifica se o ID do projeto foi informado
    if (this.projetoId) {
      // Chama o serviço de API para filtrar as tarefas pelo ID do projeto
      this.apiService.filtrarTarefasPorProjeto(this.projetoId).subscribe(
        (tarefas) => {
          this.tarefasFiltradas = tarefas; // Atualiza a lista de tarefas filtradas com a resposta da API
        },
        (error) => {
          console.error('Erro ao filtrar tarefas:', error); // Loga o erro no console
        }
      );
    }
  }
}
