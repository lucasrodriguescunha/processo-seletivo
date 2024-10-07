import { CommonModule } from '@angular/common'; // Módulo com funcionalidades comuns do Angular
import { HttpClient } from '@angular/common/http'; // Serviço para realizar requisições HTTP
import { Component } from '@angular/core'; // Decorador para definir um componente Angular
import { FormsModule } from '@angular/forms'; // Módulo para trabalhar com formulários no Angular
import { Router } from '@angular/router'; // Serviço de navegação entre rotas

@Component({
  selector: 'app-alterar-status-projeto', // Nome do seletor do componente
  standalone: true, // Indica que o componente é autônomo
  imports: [CommonModule, FormsModule], // Importação dos módulos necessários para o componente
  templateUrl: './alterar-status-projeto.component.html', // Caminho do arquivo HTML do template
  styleUrl: './alterar-status-projeto.component.css', // Caminho do arquivo de estilos CSS
})
export class AlterarStatusProjetoComponent {
  // Definição inicial do objeto 'projeto', com dois atributos: 'id' e 'status'
  projeto = {
    id: null, // Armazena o ID do projeto (nulo inicialmente)
    status: '', // Armazena o status do projeto (vazio inicialmente)
  };

  // Injeção dos serviços HttpClient e Router no construtor para uso no componente
  constructor(private http: HttpClient, private router: Router) {}

  // Função para atualizar o status do projeto
  atualizarProjetoStatus() {
    // Verifica se o ID do projeto e o status estão preenchidos
    if (this.projeto.id && this.projeto.status) {
      // Monta a URL da API para atualizar o status do projeto
      const url = `http://localhost:8080/api/projetos/${this.projeto.id}/status`;

      // Faz uma requisição PUT para a URL com o novo status do projeto
      this.http.put(url, { status: this.projeto.status }).subscribe({
        // Executado se a requisição for bem-sucedida
        next: (response) => {
          console.log('Status atualizado com sucesso', response); // Log no console para depuração
          alert('Status do projeto atualizado com sucesso!'); // Exibe uma mensagem de sucesso para o usuário
          this.router.navigate(['/listar-projetos']); // Redireciona o usuário para a página de listagem de projetos
        },
        // Executado se houver erro na requisição
        error: (error) => {
          console.error('Erro ao atualizar o status do projeto', error); // Log do erro no console para depuração
        },
      });
    }
  }
}
