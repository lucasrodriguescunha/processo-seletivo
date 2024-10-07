import {
  HttpClient, // Importa o HttpClient para realizar requisições HTTP
  HttpParams, // Importa HttpParams para construir parâmetros de URL
  HttpErrorResponse, // Importa HttpErrorResponse para lidar com erros de requisições
} from '@angular/common/http';
import { Injectable } from '@angular/core'; // Importa o Injectable para permitir que a classe seja injetável
import { catchError, Observable, of } from 'rxjs'; // Importa funcionalidades do RxJS para programação reativa
import { Projeto } from '../models/projeto.model'; // Importa o modelo de Projeto
import { Tarefa } from '../models/tarefa.model'; // Importa o modelo de Tarefa

@Injectable({
  providedIn: 'root', // Define que o serviço será um singleton disponível em toda a aplicação
})
export class ApiService {
  private apiUrlProjetos = 'http://localhost:8080/api/projetos'; // URL base para projetos
  private apiUrlTarefas = 'http://localhost:8080/api/tarefas'; // URL base para tarefas

  constructor(private http: HttpClient) {} // Injeção de dependência do HttpClient

  // Métodos para Projetos
  getProjetos(): Observable<Projeto[]> { // Método para obter todos os projetos
    return this.http.get<Projeto[]>(this.apiUrlProjetos); // Retorna um observable de projetos
  }

  getProjeto(id: number): Observable<Projeto> { // Método para obter um projeto específico
    return this.http.get<Projeto>(`${this.apiUrlProjetos}/${id}`); // Retorna um observable do projeto
  }

  updateProjeto(projeto: Projeto): Observable<Projeto> { // Método para atualizar um projeto
    return this.http.put<Projeto>(
      `${this.apiUrlProjetos}/${projeto.id}`, // URL do projeto a ser atualizado
      projeto // Objeto do projeto atualizado
    );
  }

  createProjeto(projeto: Projeto): Observable<Projeto> { // Método para criar um novo projeto
    return this.http.post<Projeto>(this.apiUrlProjetos, projeto); // Retorna o novo projeto criado
  }

  excluirProjeto(id: number): Observable<void> { // Método para excluir um projeto
    return this.http.delete<void>(`${this.apiUrlProjetos}/${id}`); // Retorna void após exclusão
  }

  // Métodos para Tarefas
  createTarefa(tarefa: Tarefa): Observable<Tarefa> { // Método para criar uma nova tarefa
    return this.http.post<Tarefa>(this.apiUrlTarefas, tarefa); // Retorna a nova tarefa criada
  }

  getTarefas(): Observable<Tarefa[]> { // Método para obter todas as tarefas
    return this.http.get<Tarefa[]>(this.apiUrlTarefas); // Retorna um observable de tarefas
  }

  getTarefaById(id: number): Observable<Tarefa> { // Método para obter uma tarefa específica
    return this.http.get<Tarefa>(`${this.apiUrlTarefas}/${id}`); // Retorna a tarefa
  }

  updateTarefa(id: number, tarefa: Tarefa): Observable<Tarefa | null> { // Método para atualizar uma tarefa
    return this.http.put<Tarefa>(`${this.apiUrlTarefas}/${id}`, tarefa).pipe(
      catchError((error) => { // Tratamento de erro
        console.error('Erro ao atualizar a tarefa', error); // Log do erro
        return of(null); // Retorna null em caso de erro
      })
    );
  }

  deleteTarefa(id: number): Observable<void> { // Método para excluir uma tarefa
    return this.http.delete<void>(`${this.apiUrlTarefas}/${id}`); // Retorna void após exclusão
  }

  // Método para filtrar tarefas por status e ID do projeto
  filtrarTarefasPorProjeto(projetoId: number): Observable<Tarefa[]> {
    let params = new HttpParams().set('projetoId', projetoId.toString()); // Cria parâmetros de consulta

    return this.http
      .get<Tarefa[]>(`${this.apiUrlTarefas}/filtro`, { params }) // Chama o endpoint de filtro
      .pipe(
        catchError((error) => { // Tratamento de erro
          console.error('Erro ao filtrar tarefas:', error); // Log do erro
          return of([]); // Retorna array vazio em caso de erro
        })
      );
  }

  updateTarefaStatus(
    id: number,
    novoStatus: string
  ): Observable<Tarefa | null> { // Método para atualizar o status de uma tarefa
    const payload = { status: novoStatus }; // Envia apenas o status atualizado
    return this.http
      .put<Tarefa>(`${this.apiUrlTarefas}/${id}/status`, payload) // Chama o endpoint para atualizar o status
      .pipe(
        catchError((error) => { // Tratamento de erro
          console.error('Erro ao atualizar o status da tarefa', error); // Log do erro
          return of(null); // Retorna null em caso de erro
        })
      );
  }
}
