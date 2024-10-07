import { Component } from '@angular/core'; // Decorador para definir um componente Angular
import { ApiService } from '../../../services/api.service'; // Serviço personalizado para comunicação com a API
import { Router } from '@angular/router'; // Serviço de navegação entre rotas
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Módulos para trabalhar com formulários

@Component({
  selector: 'app-excluir-projeto', // Nome do seletor do componente
  standalone: true, // Indica que o componente é autônomo
  imports: [ReactiveFormsModule, FormsModule], // Módulos necessários para o componente
  templateUrl: './excluir-projeto.component.html', // Caminho do template HTML
  styleUrl: './excluir-projeto.component.css', // Caminho do arquivo de estilos CSS
})
export class ExcluirProjetoComponent {
  projectId: number | null = null; // Variável que armazena o ID do projeto a ser excluído, inicializada como null

  // Construtor para injetar os serviços ApiService e Router
  constructor(private apiService: ApiService, private router: Router) {}

  // Método chamado quando o usuário clica para excluir um projeto
  onExcluirProjeto() {
    // Verifica se o ID do projeto foi fornecido (não é nulo)
    if (this.projectId !== null) {
      // Chama o serviço para excluir o projeto passando o ID
      this.apiService.excluirProjeto(this.projectId).subscribe({
        // Executado quando a exclusão é bem-sucedida
        next: (response) => {
          console.log(
            `Projeto com ID ${this.projectId} foi excluído.`,
            response
          ); // Exibe no console que o projeto foi excluído
          alert('Projeto excluído com sucesso!'); // Exibe uma mensagem de sucesso ao usuário
          this.router.navigate(['/listar-projetos']); // Redireciona o usuário para a página de listagem de projetos
        },
        // Executado em caso de erro na exclusão
        error: (error) => {
          console.error('Erro ao excluir projeto:', error); // Exibe o erro no console para depuração
          console.error('Detalhes do erro:', error.error); // Exibe detalhes adicionais do erro

          // Verifica se o erro é um 404 (projeto não encontrado)
          if (error.status === 404) {
            alert('Projeto não encontrado. Verifique o ID e tente novamente.'); // Exibe uma mensagem informando que o projeto não foi encontrado
          } else {
            alert('Erro ao excluir o projeto. Tente novamente.'); // Exibe uma mensagem de erro genérica
          }
        },
      });
    }
  }
}
