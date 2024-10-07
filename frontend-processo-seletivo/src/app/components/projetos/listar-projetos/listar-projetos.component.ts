import { CommonModule } from '@angular/common'; // Módulo comum do Angular
import { Component, OnInit } from '@angular/core'; // Decorador para definir um componente e a interface OnInit
import { ApiService } from '../../../services/api.service'; // Serviço personalizado para comunicação com a API
import { Projeto } from '../../../models/projeto.model'; // Modelo que define a estrutura de um projeto

@Component({
  selector: 'app-listar-projetos', // Nome do seletor do componente
  standalone: true, // Componente autônomo, sem necessidade de estar em um módulo pai
  imports: [CommonModule], // Importação de módulos necessários
  templateUrl: './listar-projetos.component.html', // Caminho para o template HTML do componente
  styleUrl: './listar-projetos.component.css', // Caminho para o arquivo de estilos CSS do componente
})
export class ListarProjetosComponent implements OnInit {
  // Implementa a interface OnInit para executar lógica ao iniciar o componente
  projetos: Projeto[] = []; // Array para armazenar a lista de projetos

  // Construtor para injetar o ApiService (para buscar dados) no componente
  constructor(private apiService: ApiService) {}

  // Método que é chamado automaticamente quando o componente é inicializado
  ngOnInit(): void {
    this.carregarProjetos(); // Chama o método para carregar os projetos
  }

  // Método para carregar os projetos usando o serviço de API
  carregarProjetos(): void {
    // Faz uma requisição à API para obter todos os projetos
    this.apiService.getProjetos().subscribe(
      (data: Projeto[]) => {
        console.log('Projetos carregados:', data); // Exibe no console a lista de projetos carregados (para depuração)
        this.projetos = data; // Armazena os projetos obtidos na variável 'projetos'

        // Ordena os projetos pelo ID em ordem crescente
        this.projetos.sort((a, b) => a.id - b.id); // Ordenação baseada no campo 'id' dos projetos
      },
      (error: any) => {
        console.error('Erro ao carregar projetos', error); // Exibe no console caso ocorra algum erro ao carregar os projetos
      }
    );
  }
}
