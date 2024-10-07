import { CommonModule } from '@angular/common'; // Módulo com funcionalidades comuns do Angular
import { HttpClient, HttpErrorResponse } from '@angular/common/http'; // Serviço para realizar requisições HTTP e classe para tratamento de erros
import { Component } from '@angular/core'; // Decorador para definir um componente Angular
import {
  FormGroup, // Classe que representa o formulário reativo como um grupo de controles
  FormBuilder, // Serviço que facilita a criação de formulários reativos
  Validators, // Validações de formulário, como campos obrigatórios
  ReactiveFormsModule, // Módulo para trabalhar com formulários reativos
} from '@angular/forms';
import { Router } from '@angular/router'; // Serviço de navegação entre rotas

@Component({
  selector: 'app-criar-projeto', // Nome do seletor do componente
  standalone: true, // Indica que o componente é autônomo
  imports: [CommonModule, ReactiveFormsModule], // Módulos necessários para o componente
  templateUrl: './criar-projeto.component.html', // Caminho do arquivo HTML do template
  styleUrl: './criar-projeto.component.css', // Caminho do arquivo de estilos CSS
})
export class CriarProjetoComponent {
  projetoForm: FormGroup; // Definição do formulário como um FormGroup

  // Construtor para injetar os serviços FormBuilder, HttpClient e Router
  constructor(
    private fb: FormBuilder, // Serviço para construir o formulário
    private http: HttpClient, // Serviço para realizar requisições HTTP
    private router: Router // Serviço de navegação para redirecionamento
  ) {
    // Inicialização do formulário com três campos: nome, descricao e status
    this.projetoForm = this.fb.group({
      nome: ['', Validators.required], // Campo 'nome' obrigatório
      descricao: ['', Validators.required], // Campo 'descricao' obrigatório
      status: ['Não iniciado'], // Campo 'status' com valor padrão 'Não iniciado'
    });
  }

  // Método que é chamado quando o formulário é submetido
  onSubmit() {
    // Verifica se o formulário é válido antes de enviar
    if (this.projetoForm.valid) {
      console.log('Dados enviados:', this.projetoForm.value); // Exibe os dados no console para depuração

      // Faz uma requisição POST para a API com os dados do formulário
      this.http
        .post('http://localhost:8080/api/projetos', this.projetoForm.value)
        .subscribe({
          // Executado em caso de sucesso na requisição
          next: (response) => {
            console.log('Projeto criado com sucesso!', response); // Exibe o sucesso no console
            alert('Projeto criado com sucesso!'); // Exibe uma mensagem de sucesso ao usuário
            this.router.navigate(['/listar-projetos']); // Redireciona o usuário para a página de listagem de projetos
          },
          // Executado em caso de erro na requisição
          error: (error: HttpErrorResponse) => {
            console.error('Erro ao criar projeto', error); // Exibe o erro no console para depuração
          },
        });
    }
  }
}
