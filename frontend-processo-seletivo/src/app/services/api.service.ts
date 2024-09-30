import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http'; // Importa o HttpClient para realizar requisições HTTP
import { Injectable } from '@angular/core'; // Importa o Injectable para permitir que a classe seja injetável
import { catchError, Observable, of } from 'rxjs'; // Importa Observable para lidar com programação reativa
import { Projeto } from '../models/projeto.model'; // Importa o modelo de Projeto; ajuste o caminho conforme necessário
import { Tarefa } from '../models/tarefa.model';

@Injectable({
  providedIn: 'root', // Define que o serviço será um singleton disponível em toda a aplicação
})
export class ApiService {
  private apiUrlProjetos = 'http://localhost:8080/api/projetos';
  private apiUrlTarefas = 'http://localhost:8080/api/tarefas';

  constructor(private http: HttpClient) {}

  // Métodos para Projetos
  getProjetos(): Observable<Projeto[]> {
    return this.http.get<Projeto[]>(this.apiUrlProjetos);
  }

  getProjeto(id: number): Observable<Projeto> {
    return this.http.get<Projeto>(`${this.apiUrlProjetos}/${id}`);
  }

  updateProjeto(projeto: Projeto): Observable<Projeto> {
    return this.http.put<Projeto>(
      `${this.apiUrlProjetos}/${projeto.id}`,
      projeto
    );
  }

  createProjeto(projeto: Projeto): Observable<Projeto> {
    return this.http.post<Projeto>(this.apiUrlProjetos, projeto);
  }

  excluirProjeto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrlProjetos}/${id}`);
  }

  // Métodos para Tarefas
  createTarefa(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.post<Tarefa>(this.apiUrlTarefas, tarefa);
  }

  getTarefas(): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(this.apiUrlTarefas);
  }

  getTarefaById(id: number): Observable<Tarefa> {
    return this.http.get<Tarefa>(`${this.apiUrlTarefas}/${id}`);
  }

  updateTarefa(id: number, tarefa: Tarefa): Observable<Tarefa | null> {
    return this.http.put<Tarefa>(`${this.apiUrlTarefas}/${id}`, tarefa).pipe(
      catchError((error) => {
        console.error('Erro ao atualizar a tarefa', error);
        return of(null);
      })
    );
  }

  deleteTarefa(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrlTarefas}/${id}`);
  }

  // Método para filtrar tarefas por status e ID do projeto
  filtrarTarefasPorProjeto(projetoId: number): Observable<Tarefa[]> {
    let params = new HttpParams().set('projetoId', projetoId.toString());

    return this.http
      .get<Tarefa[]>(`${this.apiUrlTarefas}/filtro`, { params })
      .pipe(
        catchError((error) => {
          console.error('Erro ao filtrar tarefas:', error);
          return of([]); // Retorna array vazio em caso de erro
        })
      );
  }

  updateTarefaStatus(
    id: number,
    novoStatus: string
  ): Observable<Tarefa | null> {
    const payload = { status: novoStatus }; // Envia apenas o status atualizado
    return this.http
      .put<Tarefa>(`${this.apiUrlTarefas}/${id}/status`, payload)
      .pipe(
        catchError((error) => {
          console.error('Erro ao atualizar o status da tarefa', error);
          return of(null); // Retorna null em caso de erro
        })
      );
  }
}
