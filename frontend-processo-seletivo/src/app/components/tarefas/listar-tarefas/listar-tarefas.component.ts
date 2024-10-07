import { Component, OnInit } from '@angular/core'; // Importa os módulos necessários do Angular
import { ApiService } from '../../../services/api.service'; // Importa o serviço de API
import { CommonModule } from '@angular/common'; // Importa o módulo comum do Angular
import { Tarefa } from '../../../models/tarefa.model'; // Importa o modelo Tarefa

@Component({
  selector: 'app-listar-tarefas', // Seletor do componente
  standalone: true, // Define que o componente é autônomo
  imports: [CommonModule], // Importa os módulos necessários para este componente
  templateUrl: './listar-tarefas.component.html', // Caminho para o arquivo HTML do componente
  styleUrl: './listar-tarefas.component.css', // Caminho para o arquivo CSS do componente
})
export class ListarTarefasComponent implements OnInit {
  tarefas: Tarefa[] = []; // Array para armazenar a lista de tarefas

  // Construtor com injeção de dependência do serviço ApiService
  constructor(private apiService: ApiService) {}

  // Método do ciclo de vida que é chamado ao inicializar o componente
  ngOnInit() {
    this.listarTarefas(); // Chama o método para listar tarefas quando o componente é inicializado
  }

  // Método para obter a lista de tarefas
  listarTarefas() {
    this.apiService.getTarefas().subscribe(
      (response) => {
        console.log('Tarefas retornadas:', response);  // Exibe as tarefas retornadas no console
        // Mapeia a resposta da API para um array de tarefas
        this.tarefas = response.map((tarefa) => ({
          id: tarefa.id,
          nome: tarefa.nome,
          descricao: tarefa.descricao,
          concluida: tarefa.concluida,
          projetoId: tarefa.projetoId,
          status: tarefa.status || 'Não iniciada',  // Define um status padrão caso não esteja presente
        }));

        // Ordena as tarefas pelo ID
        this.tarefas.sort((a, b) => a.id - b.id);
      },
      (error) => {
        console.error('Erro ao listar tarefas', error); // Loga o erro no console se houver falha na requisição
      }
    );
  }
}
