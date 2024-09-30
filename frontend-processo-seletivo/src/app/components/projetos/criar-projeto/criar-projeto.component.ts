import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-criar-projeto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './criar-projeto.component.html',
  styleUrl: './criar-projeto.component.css',
})
export class CriarProjetoComponent {
  projetoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.projetoForm = this.fb.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      status: ['Não iniciado'], // Adiciona o status padrão aqui
    });
  }

  onSubmit() {
    if (this.projetoForm.valid) {
      console.log('Dados enviados:', this.projetoForm.value);
      this.http
        .post('http://localhost:8080/api/projetos', this.projetoForm.value)
        .subscribe({
          next: (response) => {
            console.log('Projeto criado com sucesso!', response);
            alert('Projeto criado com sucesso!');
            this.router.navigate(['/listar-projetos']);
          },
          error: (error: HttpErrorResponse) => {
            console.error('Erro ao criar projeto', error);
          },
        });
    }
  }
}
