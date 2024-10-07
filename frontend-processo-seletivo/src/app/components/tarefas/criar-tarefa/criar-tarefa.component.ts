import { Component } from '@angular/core'; // Importa o decorador Component do Angular
import { FormsModule } from '@angular/forms'; // Importa o FormsModule para lidar com formulários
import { ApiService } from '../../../services/api.service'; // Serviço personalizado para comunicação com a API
import { Router } from '@angular/router'; // Serviço de navegação para redirecionar rotas
import { Tarefa } from '../../../models/tarefa.model'; // Modelo de dados Tarefa

@Component({
  selector: 'app-criar-tarefa', // Seletor do componente
  standalone: true, // Define que este é um componente autônomo, sem necessidade de módulo pai
  imports: [FormsModule], // Importa o FormsModule para lidar com os formulários
  templateUrl: './criar-tarefa.component.html', // Caminho para o template HTML
  styleUrl: './criar-tarefa.component.css', // Caminho para o arquivo de estilo CSS
})
export class CriarTarefaComponent {
  nome: string = ''; // Propriedade para armazenar o nome da tarefa, inicialmente vazio
  descricao: string = ''; // Propriedade para armazenar a descrição da tarefa, inicialmente vazio
  projetoId: number | null = null; // Propriedade para armazenar o ID do projeto ao qual a tarefa pertence

  // Construtor com injeção de dependências: ApiService (para comunicação com a API) e Router (para navegação)
  constructor(private apiService: ApiService, private router: Router) {}

  // Método para criar a tarefa
  criarTarefa() {
    // Cria o payload (dados da tarefa) com base nas propriedades
    const payload: Tarefa = {
      id: 0, // Define um valor padrão para o ID (pode ser alterado posteriormente pela API)
      nome: this.nome, // Nome da tarefa inserido pelo usuário
      descricao: this.descricao, // Descrição da tarefa inserida pelo usuário
      concluida: false, // Define a tarefa como não concluída ao criá-la
      projetoId: this.projetoId, // ID do projeto associado à tarefa
      status: 'não iniciada', // Define o status inicial da tarefa como "não iniciada"
    };

    // Faz uma chamada à API para criar a tarefa
    this.apiService.createTarefa(payload).subscribe(
      () => {
        // Em caso de sucesso, exibe uma mensagem de sucesso e redireciona para a página de listagem de tarefas
        alert('Tarefa criada com sucesso!');
        this.router.navigate(['/listar-tarefas']);
      },
      (error) => {
        // Em caso de erro, exibe uma mensagem no console
        console.error('Erro ao criar tarefa', error);
      }
    );
  }
}
