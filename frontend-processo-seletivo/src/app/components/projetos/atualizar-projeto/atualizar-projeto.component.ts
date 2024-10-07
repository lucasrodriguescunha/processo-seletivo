import { Component, OnInit } from '@angular/core'; // Decorador e interface para criar e inicializar um componente Angular
import { ApiService } from '../../../services/api.service'; // Serviço para interações com a API
import { ActivatedRoute, Router } from '@angular/router'; // Serviços para navegação de rotas e recuperação de parâmetros da rota
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Módulos para trabalhar com formulários reativos e template-driven no Angular
import { CommonModule } from '@angular/common'; // Módulo com funcionalidades comuns do Angular
import { Projeto } from '../../../models/projeto.model'; // Modelo do projeto que define a estrutura dos dados

@Component({
  selector: 'app-atualizar-projeto', // Seletor do componente
  standalone: true, // Indica que o componente é autônomo
  imports: [CommonModule, ReactiveFormsModule, FormsModule], // Módulos importados para uso no componente
  templateUrl: './atualizar-projeto.component.html', // Caminho do arquivo HTML do template do componente
  styleUrl: './atualizar-projeto.component.css', // Caminho do arquivo CSS para os estilos do componente
})
export class AtualizarProjetoComponent implements OnInit {
  // Inicialização do objeto 'projeto' com valores padrão
  projeto: Projeto = { id: 0, nome: '', descricao: '', status: 'Não iniciado' };

  // Construtor que injeta os serviços ApiService, ActivatedRoute e Router
  constructor(
    private apiService: ApiService, // Serviço para fazer requisições à API
    private route: ActivatedRoute, // Permite acessar os parâmetros da rota
    private router: Router // Serviço de navegação para redirecionamento
  ) {}

  // Método que é chamado automaticamente quando o componente é inicializado
  ngOnInit(): void {
    this.carregarProjeto(); // Chama o método para carregar os dados do projeto
  }

  // Método para carregar o projeto com base no ID fornecido na URL
  carregarProjeto(): void {
    const id = +this.route.snapshot.paramMap.get('id')!; // Obtém o ID da rota e converte para número
    if (id) {
      // Verifica se o ID é válido
      this.apiService.getProjeto(id).subscribe(
        (data) => {
          this.projeto = data; // Atribui os dados do projeto retornados pela API ao objeto 'projeto'
        },
        (error) => {
          console.error('Erro ao carregar projeto', error); // Exibe erro no console caso falhe
        }
      );
    }
  }

  // Método para atualizar o projeto com os dados alterados
  atualizarProjeto(): void {
    if (this.projeto.id) {
      // Verifica se o ID do projeto é válido
      this.apiService.updateProjeto(this.projeto).subscribe(
        () => {
          // Se a requisição for bem-sucedida
          alert('Projeto atualizado com sucesso!'); // Exibe uma mensagem de sucesso
          this.router.navigate(['/listar-projetos']); // Redireciona o usuário para a página de listagem de projetos
        },
        (error) => {
          console.error('Erro ao atualizar projeto', error); // Exibe erro no console caso a atualização falhe
          alert('Falha ao atualizar o projeto. Tente novamente.'); // Mensagem de erro amigável ao usuário
        }
      );
    } else {
      alert('ID do projeto não fornecido.'); // Exibe uma mensagem se o ID do projeto estiver ausente
    }
  }
}
