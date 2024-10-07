import { Component, OnInit } from '@angular/core'; // Importa o decorador Component e a interface OnInit do Angular
import { ActivatedRoute, Router } from '@angular/router'; // Importa os serviços ActivatedRoute e Router para navegação e manipulação de rotas
import { ApiService } from '../../../services/api.service'; // Serviço personalizado para comunicação com a API
import { FormsModule } from '@angular/forms'; // Módulo para trabalhar com formulários
import { Tarefa } from '../../../models/tarefa.model'; // Importa o modelo de dados Tarefa

@Component({
  selector: 'app-atualizar-tarefa', // Seletor do componente
  standalone: true, // Define que este é um componente autônomo, não precisa de um módulo pai
  imports: [FormsModule], // Importação do FormsModule para lidar com formulários
  templateUrl: './atualizar-tarefa.component.html', // Caminho para o template HTML do componente
  styleUrl: './atualizar-tarefa.component.css', // Caminho para o arquivo de estilo CSS do componente
})
export class AtualizarTarefaComponent implements OnInit {
  tarefaId: string = ''; // Armazena o ID da tarefa, inicialmente vazio
  tarefa: Tarefa = {
    id: 0,
    nome: '',
    descricao: '',
    concluida: false,
    projetoId: null,
  }; // Inicializa a tarefa com um objeto vazio com valores padrão

  // Construtor com injeção de dependências para os serviços ApiService (comunicação com API), Router (navegação) e ActivatedRoute (manipulação de rotas)
  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // O método ngOnInit é executado assim que o componente é inicializado
  ngOnInit() {
    // Obtém os parâmetros da rota e extrai o ID da tarefa
    this.route.params.subscribe((params) => {
      this.tarefaId = params['id'];
      this.buscarTarefa(); // Chama a função para buscar os dados da tarefa
    });
  }

  // Método para buscar a tarefa pelo ID
  buscarTarefa() {
    if (this.tarefaId) {
      // Chama a API para buscar a tarefa pelo ID
      this.apiService.getTarefaById(Number(this.tarefaId)).subscribe(
        (response) => {
          this.tarefa = response; // Atualiza o objeto tarefa com os dados recebidos da API
        },
        (error) => {
          // Em caso de erro, exibe uma mensagem e redefine a tarefa para o estado inicial
          console.error('Erro ao buscar a tarefa', error);
          alert('Tarefa não encontrada!');
          this.tarefa = {
            id: 0,
            nome: '',
            descricao: '',
            concluida: false,
            projetoId: null,
          }; // Limpa os campos do formulário
        }
      );
    }
  }

  // Método para atualizar a tarefa
  atualizarTarefa() {
    // Verifica se o ID da tarefa foi fornecido
    if (!this.tarefaId) {
      alert('Por favor, insira o ID da tarefa.'); // Exibe uma mensagem se o ID não estiver presente
      return;
    }

    // Chama a API para atualizar a tarefa
    this.apiService.updateTarefa(Number(this.tarefaId), this.tarefa).subscribe(
      () => {
        // Em caso de sucesso, exibe uma mensagem de sucesso e redireciona para a lista de tarefas
        alert('Tarefa atualizada com sucesso!');
        this.router.navigate(['/listar-tarefas']);
      },
      (error) => {
        // Em caso de erro, exibe uma mensagem de erro
        console.error('Erro ao atualizar a tarefa', error);
        alert('Erro ao atualizar a tarefa. Tente novamente.');
      }
    );
  }
}
