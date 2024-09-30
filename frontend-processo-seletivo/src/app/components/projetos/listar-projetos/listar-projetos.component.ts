import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Projeto } from '../../../models/projeto.model';

@Component({
  selector: 'app-listar-projetos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listar-projetos.component.html',
  styleUrl: './listar-projetos.component.css',
})
export class ListarProjetosComponent implements OnInit {
  // Implementa OnInit
  projetos: Projeto[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.carregarProjetos();
  }

  carregarProjetos(): void {
    this.apiService.getProjetos().subscribe(
      (data: Projeto[]) => {
        console.log('Projetos carregados:', data); // Adicione esta linha para depuração
        this.projetos = data;

        // Ordena os projetos em ordem crescente pelo ID
        this.projetos.sort((a, b) => a.id - b.id);
      },
      (error: any) => {
        console.error('Erro ao carregar projetos', error);
      }
    );
  }
}
